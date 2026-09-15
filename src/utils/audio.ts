// Procedural solemn ambient audio generator using Web Audio API
// No external assets required, 100% reliable and respectful

class SolemnAmbientAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private droneGains: GainNode[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Harmonious solemn chords: D2 (73.4Hz), A2 (110Hz), D3 (146.8Hz), F#3 (185Hz)
    const freqs = [73.42, 110.0, 146.83, 185.0];
    this.droneOscillators = [];
    this.droneGains = [];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle LFO-like flutter
      const baseVol = idx === 0 ? 0.05 : 0.025 / (idx + 1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(baseVol, now + 3);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);

      this.droneOscillators.push(osc);
      this.droneGains.push(gain);
    });
  }

  public stop() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;

    this.droneGains.forEach((gain) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
      } catch {
        // ignore
      }
    });

    setTimeout(() => {
      this.droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.droneOscillators = [];
      this.droneGains = [];
      this.isPlaying = false;
    }, 1300);
  }

  public triggerChime(freq = 587.33) {
    // D5 chime, delicate and peaceful bell
    if (!this.isPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.linearRampToValueAtTime(0.04, now + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientAudio = new SolemnAmbientAudio();
