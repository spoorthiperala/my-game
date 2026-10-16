/**
 * Pink Planet: Tech Crush - Web Audio API Sound Synthesizer Engine
 * Zero external audio dependencies - 100% procedural synth sounds & music!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxMuted = false;
    this.bgmMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Basic tone helper
  playTone(freq, duration, type = 'sine', gainVal = 0.2, fade = true) {
    if (this.sfxMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      if (fade) {
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Sound FX: Tile Swap
  playSwap() {
    if (this.sfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(580, t + 0.1);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Sound FX: Tile Match (Pitch increases with combo count!)
  playMatch(combo = 1) {
    if (this.sfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const baseFreq = 440 * Math.pow(1.12, Math.min(combo - 1, 10)); // Pentatonic scale lift
    const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.18, 'triangle', 0.25, true);
      }, i * 45);
    });
  }

  // Sound FX: Special CPU Power Burst (Row/Column blast)
  playCpuBurst() {
    if (this.sfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Laser sweep up
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.3);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);

    // Noise burst effect
    this.playNoise(0.25, 0.3);
  }

  // Sound FX: GPU Rainbow Laser
  playGpuLaser() {
    if (this.sfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.linearRampToValueAtTime(250, t + 0.5);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);

    // Arpeggio chime overlay
    [600, 800, 1000, 1200, 1400, 1600].forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.12, 'sine', 0.15);
      }, idx * 40);
    });
  }

  // Sound FX: Virus Boss Hit
  playBossHit() {
    if (this.sfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Sound FX: Level Win Fanfare
  playWin() {
    if (this.sfxMuted) return;
    const melody = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    melody.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, idx === 3 ? 0.6 : 0.2, 'triangle', 0.3);
      }, idx * 140);
    });
  }

  // Sound FX: Level Defeat
  playLose() {
    if (this.sfxMuted) return;
    const melody = [400, 350, 300, 220];
    melody.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'sawtooth', 0.2);
      }, idx * 160);
    });
  }

  // Button Click FX
  playClick() {
    this.playTone(600, 0.05, 'sine', 0.15);
  }

  // Noise generator for explosions / bursts
  playNoise(duration, volume = 0.2) {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {
      console.warn("Noise error:", e);
    }
  }

  // Toggle Background Music
  toggleBGM() {
    this.bgmMuted = !this.bgmMuted;
    if (this.bgmMuted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return !this.bgmMuted;
  }

  toggleSFX() {
    this.sfxMuted = !this.sfxMuted;
    return !this.sfxMuted;
  }

  startBGM() {
    if (this.bgmPlaying || this.bgmMuted) return;
    this.bgmPlaying = true;

    // Cyber Synthwave loop schedule
    const bassline = [110, 110, 130.81, 110, 146.83, 130.81, 123.47, 98]; // A2 notes
    const arpeggio = [440, 523.25, 659.25, 783.99, 659.25, 523.25, 440, 392];

    const playStep = () => {
      if (!this.bgmPlaying || this.bgmMuted) return;
      this.init();
      if (this.ctx) {
        const step = this.bgmStep % 8;
        const bassFreq = bassline[step];
        const arpFreq = arpeggio[step];

        // Soft synth bass
        this.playTone(bassFreq, 0.18, 'sawtooth', 0.05, true);
        // Soft synth bell
        this.playTone(arpFreq, 0.12, 'sine', 0.04, true);

        this.bgmStep++;
      }
      this.bgmTimer = setTimeout(playStep, 240); // ~125 BPM
    };

    playStep();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

const soundManager = new SoundEngine();
