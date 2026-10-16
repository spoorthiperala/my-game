/**
 * Pink Planet: Tech Crush - Build Your PC Workshop Engine
 * Allows players to assemble their ultimate pink cyber PC and unlock passive gameplay perks!
 */

const PC_PARTS = [
  {
    id: "case",
    name: "Cyber-Pink Glass Case",
    reqLevel: 1,
    cost: 500,
    icon: "🖥️",
    desc: "+2 Extra Moves on all levels",
    perk: { extraMoves: 2 },
    color: "#ff2a85"
  },
  {
    id: "mobo",
    name: "Neon Cyber Motherboard",
    reqLevel: 3,
    cost: 1000,
    icon: "🔌",
    desc: "Start every level with 1 free CPU Burst!",
    perk: { startCpuBurst: 1 },
    color: "#00ff9d"
  },
  {
    id: "cpu_part",
    name: "Pink Core i9 Quantum CPU",
    reqLevel: 5,
    cost: 1800,
    icon: "🧠",
    desc: "+15% Score Bonus on all matches",
    perk: { scoreMultiplier: 1.15 },
    color: "#ff2a85"
  },
  {
    id: "cooler",
    name: "RGB Liquid Cooler 360mm",
    reqLevel: 7,
    cost: 2500,
    icon: "🌀",
    desc: "Explosive Fan special items do +50% damage",
    perk: { explosiveBonus: true },
    color: "#ff9900"
  },
  {
    id: "ram_part",
    name: "64GB DDR5 RGB RAM",
    reqLevel: 9,
    cost: 3500,
    icon: "⚡",
    desc: "+3 Extra Moves on all Virus Boss levels",
    perk: { bossExtraMoves: 3 },
    color: "#00f0ff"
  },
  {
    id: "gpu_part",
    name: "RTX Pink Power GPU",
    reqLevel: 11,
    cost: 5000,
    icon: "🎮",
    desc: "Start every level with 1 free GPU Laser Bomb!",
    perk: { startGpuLaser: 1 },
    color: "#bd00ff"
  },
  {
    id: "ssd_part",
    name: "2TB NVMe M.2 SSD",
    reqLevel: 13,
    cost: 7000,
    icon: "💾",
    desc: "Cleanses 2 Virus corruption tiles at match start",
    perk: { startCleanseVirus: 2 },
    color: "#ffea00"
  },
  {
    id: "psu",
    name: "1200W Titanium RGB PSU",
    reqLevel: 15,
    cost: 10000,
    icon: "⚡",
    desc: "PC Rig Complete! +30% Tech Coins earned from games",
    perk: { coinMultiplier: 1.30 },
    color: "#ff00ff"
  }
];

class PcBuilderEngine {
  constructor() {
    this.ownedParts = this.loadOwnedParts();
    this.coins = this.loadCoins();
  }

  loadOwnedParts() {
    try {
      const saved = localStorage.getItem('pink_planet_pc_parts');
      return saved ? JSON.parse(saved) : [];
    } catch(e) {
      return [];
    }
  }

  saveOwnedParts() {
    try {
      localStorage.setItem('pink_planet_pc_parts', JSON.stringify(this.ownedParts));
    } catch(e) {}
  }

  loadCoins() {
    try {
      const saved = localStorage.getItem('pink_planet_coins');
      return saved ? parseInt(saved, 10) : 500; // 500 starter coins
    } catch(e) {
      return 500;
    }
  }

  saveCoins() {
    try {
      localStorage.setItem('pink_planet_coins', this.coins.toString());
    } catch(e) {}
  }

  addCoins(amount) {
    const perks = this.getActivePerks();
    const finalAmount = Math.round(amount * (perks.coinMultiplier || 1.0));
    this.coins += finalAmount;
    this.saveCoins();
    return finalAmount;
  }

  buyPart(partId, highestUnlockedLevel = 1) {
    const part = PC_PARTS.find(p => p.id === partId);
    if (!part) return { success: false, msg: "Part not found!" };

    if (this.ownedParts.includes(partId)) {
      return { success: false, msg: "Part already installed in your PC!" };
    }

    if (highestUnlockedLevel < part.reqLevel) {
      return { success: false, msg: `Unlock Level ${part.reqLevel} to build this part!` };
    }

    if (this.coins < part.cost) {
      return { success: false, msg: `Not enough Tech Coins! Need 🪙${part.cost}` };
    }

    this.coins -= part.cost;
    this.ownedParts.push(partId);
    this.saveCoins();
    this.saveOwnedParts();
    return { success: true, msg: `Successfully installed ${part.name}! Perk active!` };
  }

  getActivePerks() {
    const active = {
      extraMoves: 0,
      startCpuBurst: 0,
      startGpuLaser: 0,
      scoreMultiplier: 1.0,
      bossExtraMoves: 0,
      explosiveBonus: false,
      startCleanseVirus: 0,
      coinMultiplier: 1.0
    };

    this.ownedParts.forEach(id => {
      const part = PC_PARTS.find(p => p.id === id);
      if (part && part.perk) {
        if (part.perk.extraMoves) active.extraMoves += part.perk.extraMoves;
        if (part.perk.startCpuBurst) active.startCpuBurst += part.perk.startCpuBurst;
        if (part.perk.startGpuLaser) active.startGpuLaser += part.perk.startGpuLaser;
        if (part.perk.scoreMultiplier) active.scoreMultiplier *= part.perk.scoreMultiplier;
        if (part.perk.bossExtraMoves) active.bossExtraMoves += part.perk.bossExtraMoves;
        if (part.perk.explosiveBonus) active.explosiveBonus = true;
        if (part.perk.startCleanseVirus) active.startCleanseVirus += part.perk.startCleanseVirus;
        if (part.perk.coinMultiplier) active.coinMultiplier *= part.perk.coinMultiplier;
      }
    });

    return active;
  }
}

const pcBuilder = new PcBuilderEngine();
