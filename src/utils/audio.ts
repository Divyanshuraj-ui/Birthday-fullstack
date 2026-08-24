// Web Audio API helper for cute kawaii sound effects & birthday melody

class SoundFX {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMelodyPlaying: boolean = false;
  private melodyTimeout: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isMelodyPlaying) {
      this.stopMelody();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio fallback silent
    }
  }

  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, index) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const now = ctx.currentTime;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
        } catch {
          // Ignore
        }
      }, index * 60);
    });
  }

  public playCuteBoing() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.28);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }

  public playSuccessFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const chords = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.5, d: 0.4 },  // C6
    ];

    chords.forEach((note, i) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const now = ctx.currentTime;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note.f, now);

          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + note.d);
        } catch {
          // Ignore
        }
      }, i * 120);
    });
  }

  public playHappyBirthdayMelody(onFinished?: () => void) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopMelody();
    this.isMelodyPlaying = true;

    // Happy Birthday note frequencies (C Major)
    // G4 G4 A4 G4 C5 B4
    // G4 G4 A4 G4 D5 C5
    // G4 G4 G5 E5 C5 B4 A4
    // F5 F5 E5 C5 D5 C5
    const melody: [number, number][] = [
      [392, 0.25], [392, 0.25], [440, 0.5], [392, 0.5], [523.25, 0.5], [493.88, 0.9],
      [392, 0.25], [392, 0.25], [440, 0.5], [392, 0.5], [587.33, 0.5], [523.25, 0.9],
      [392, 0.25], [392, 0.25], [783.99, 0.5], [659.25, 0.5], [523.25, 0.5], [493.88, 0.5], [440, 0.8],
      [698.46, 0.25], [698.46, 0.25], [659.25, 0.5], [523.25, 0.5], [587.33, 0.5], [523.25, 1.2],
    ];

    let totalTime = 0;
    melody.forEach(([freq, duration]) => {
      setTimeout(() => {
        if (!this.isMelodyPlaying || this.isMuted) return;
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const now = ctx.currentTime;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.005, now + duration * 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + duration * 0.95);
        } catch {
          // Ignore
        }
      }, totalTime * 1000);

      totalTime += duration * 0.7;
    });

    this.melodyTimeout = window.setTimeout(() => {
      this.isMelodyPlaying = false;
      if (onFinished) onFinished();
    }, totalTime * 1000);
  }

  public stopMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }

  public isMelodyActive(): boolean {
    return this.isMelodyPlaying;
  }
}

export const soundFX = new SoundFX();
