/**
 * Pink Planet: Tech Crush - Level Definitions & Campaign Progression
 */

const COMPONENT_TYPES = {
  CPU: { id: 'cpu', name: 'CPU Chip', color: '#ff2a85', icon: 'cpu' },
  RAM: { id: 'ram', name: 'RAM Stick', color: '#00f0ff', icon: 'ram' },
  GPU: { id: 'gpu', name: 'GPU Card', color: '#bd00ff', icon: 'gpu' },
  CIRCUIT: { id: 'circuit', name: 'Circuit Board', color: '#00ff9d', icon: 'circuit' },
  FAN: { id: 'fan', name: 'RGB Fan', color: '#ff9900', icon: 'fan' },
  SSD: { id: 'ssd', name: 'M.2 SSD', color: '#ffea00', icon: 'ssd' }
};

const GAME_LEVELS = [
  {
    id: 1,
    title: "Booting Up in Pink Orbit",
    world: "Neon Capital",
    type: "score",
    moves: 20,
    targetScore: 2500,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit'],
    stars: [2500, 4500, 7000],
    botMessage: "Welcome to Pink Planet, Cadet! Swap 3 identical tech components to make a match! Try matching 4 to get a CPU Burst!"
  },
  {
    id: 2,
    title: "Overclocked Silicon",
    world: "Neon Capital",
    type: "collect",
    moves: 22,
    targetScore: 3000,
    targets: { cpu: 12, ram: 12 },
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan'],
    stars: [3000, 5500, 8500],
    botMessage: "We need CPU Chips and RAM Sticks to power up our pink starships! Collect them before running out of moves!"
  },
  {
    id: 3,
    title: "GPU Rainbow Blast",
    world: "Neon Capital",
    type: "collect",
    moves: 20,
    targetScore: 4000,
    targets: { gpu: 15, fan: 10 },
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [4000, 7000, 10000],
    botMessage: "Match 5 components in a straight line to create a GPU Laser Bomb! Swapping it clears all tiles of that color!"
  },
  {
    id: 4,
    title: "First Glitch Alert!",
    world: "Cyber Nebula",
    type: "virus_clear",
    moves: 24,
    targetScore: 5000,
    virusTilesCount: 6,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan'],
    stars: [5000, 8000, 12000],
    botMessage: "Oh no! Virus corruption blocks are infecting the grid! Match components next to infected tiles to cleanse them!"
  },
  {
    id: 5,
    title: "BOSS: MegaByte Virus",
    world: "Cyber Nebula",
    type: "boss",
    bossHp: 100,
    bossName: "MegaByte Virus v1.0",
    moves: 25,
    targetScore: 6000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [6000, 10000, 15000],
    botMessage: "WARNING! MegaByte Virus detected! Match components to deal massive damage! Watch out, it spawns virus tiles!"
  },
  {
    id: 6,
    title: "Liquid Cooling Chamber",
    world: "Silicon Valley",
    type: "collect",
    moves: 22,
    targets: { fan: 18, ssd: 12 },
    targetScore: 7000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [7000, 11000, 16000],
    botMessage: "Match L or T shapes to create an RGB Fan Explosion! It blasts a 3x3 area around it!"
  },
  {
    id: 7,
    title: "SSD Hyper Speed",
    world: "Silicon Valley",
    type: "score",
    moves: 18,
    targetScore: 10000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [10000, 15000, 20000],
    botMessage: "Only 18 moves! Create big combo chain reactions to rack up thousands of bonus points!"
  },
  {
    id: 8,
    title: "System Corruption Sweep",
    world: "Silicon Valley",
    type: "virus_clear",
    moves: 25,
    virusTilesCount: 10,
    targetScore: 8000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [8000, 13000, 18000],
    botMessage: "Deep corruption! 10 virus nodes have taken root. Use special CPU Bursts and GPU Lasers to cleanse the board!"
  },
  {
    id: 9,
    title: "Core Matrix Breach",
    world: "Core Matrix",
    type: "collect",
    moves: 22,
    targets: { cpu: 20, gpu: 15, ssd: 15 },
    targetScore: 12000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [12000, 18000, 25000],
    botMessage: "High volume part collection! Build up your inventory to build the Ultimate Pink Dream PC!"
  },
  {
    id: 10,
    title: "BOSS: Ransomware Overlord",
    world: "Core Matrix",
    type: "boss",
    bossHp: 160,
    bossName: "Ransomware Overlord",
    moves: 26,
    targetScore: 15000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [15000, 22000, 30000],
    botMessage: "Ransomware Overlord is locking system memory! Target the boss with special combos for critical hits!"
  },
  {
    id: 11,
    title: "Quantum Processing",
    world: "Core Matrix",
    type: "score",
    moves: 20,
    targetScore: 18000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [18000, 26000, 35000],
    botMessage: "Quantum power! Special power-up combinations release massive hyper-beams!"
  },
  {
    id: 12,
    title: "Deep Virus Infestation",
    world: "Virus Wasteland",
    type: "virus_clear",
    moves: 24,
    virusTilesCount: 14,
    targetScore: 16000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [16000, 24000, 32000],
    botMessage: "14 Virus Nodes! You need to strategically set off explosive chain reactions to clear them all!"
  },
  {
    id: 13,
    title: "Neon Component Surge",
    world: "Virus Wasteland",
    type: "collect",
    moves: 24,
    targets: { ram: 25, circuit: 20, gpu: 15 },
    targetScore: 20000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [20000, 30000, 40000],
    botMessage: "We're nearing full assembly of our Pink Supercomputer! Collect all the hardware pieces!"
  },
  {
    id: 14,
    title: "Cyber Citadel Defense",
    world: "Virus Wasteland",
    type: "score",
    moves: 22,
    targetScore: 25000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [25000, 36000, 50000],
    botMessage: "The final gateway to the Virus Core! Show off your high-score combo mastery!"
  },
  {
    id: 15,
    title: "FINAL BOSS: Trojan Titan",
    world: "Virus Wasteland",
    type: "boss",
    bossHp: 250,
    bossName: "Trojan Titan 9000",
    moves: 30,
    targetScore: 30000,
    allowedComponents: ['cpu', 'ram', 'gpu', 'circuit', 'fan', 'ssd'],
    stars: [30000, 45000, 60000],
    botMessage: "THE FINAL SHOWDOWN! Defeat Trojan Titan 9000 to save Pink Planet once and for all!"
  }
];
