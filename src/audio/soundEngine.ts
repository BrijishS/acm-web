class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.35;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;
  private soundtrackTimer: ReturnType<typeof setInterval> | null = null;
  private isSoundtrackPlaying: boolean = false;
  private soundtrackGain: GainNode | null = null;
  private chargeOsc: OscillatorNode | null = null;
  private chargeGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : this.volume * 0.08, this.ctx ? this.ctx.currentTime : 0);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    if (!this.isMuted) {
      this.playHologramActivate();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && !this.isMuted && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.volume * 0.08, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Micro hover chirp
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // AudioContext could be blocked by browser policy until gesture
    }
  }

  // Holographic button click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.07);

      gain.gain.setValueAtTime(this.volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {}
  }

  // JARVIS activation two-tone chime
  public playJarvisChirp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [
        { freq: 1100, start: 0, dur: 0.08 },
        { freq: 1760, start: 0.06, dur: 0.14 }
      ].forEach(tone => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(tone.freq, now + tone.start);

        gain.gain.setValueAtTime(this.volume * 0.16, now + tone.start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + tone.start + tone.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + tone.start);
        osc.stop(now + tone.start + tone.dur);
      });
    } catch {}
  }

  // Mechanical servo motor movement sound
  public playRoboticServo() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.28);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(this.volume * 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.29);
    } catch {}
  }

  // Hologram activation chord
  public playHologramActivate() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [587.33, 880, 1174.66, 1760]; // D minor / cyber chord
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.03);

        gain.gain.setValueAtTime(this.volume * 0.12, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.03);
        osc.stop(now + 0.36);
      });
    } catch {}
  }

  // Laser scanner sweep
  public playScanner() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.18);

      gain.gain.setValueAtTime(this.volume * 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.19);
    } catch {}
  }

  public playLaserSweep() {
    this.playScanner();
  }

  public playTelemetryBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);
      osc.frequency.setValueAtTime(1920, now + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  // Ambient headquarters reactor hum
  public startAmbientHum() {
    if (this.isAmbientPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(58, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);

      gain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.07, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      this.ambientOsc = osc;
      this.ambientGain = gain;
      this.isAmbientPlaying = true;
    } catch {}
  }

  public stopAmbientHum() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch {}
      this.ambientOsc = null;
    }
    this.isAmbientPlaying = false;
  }

  // Chapter navigation whoosh
  public playChapterWhoosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.14, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  // Interactive portal charging hum (called continuously during Touch & Hold)
  public startPortalCharging() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (!this.chargeOsc) {
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.12, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        this.chargeOsc = osc;
        this.chargeGain = gain;
      } catch {}
    }
  }

  public updatePortalChargePitch(ratio: number) {
    if (this.chargeOsc && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        const targetFreq = 120 + ratio * 800; // pitch climbs from 120Hz to 920Hz
        this.chargeOsc.frequency.setTargetAtTime(targetFreq, now, 0.05);
      } catch {}
    }
  }

  public stopPortalCharging() {
    if (this.chargeOsc) {
      try {
        this.chargeOsc.stop();
        this.chargeOsc.disconnect();
      } catch {}
      this.chargeOsc = null;
      this.chargeGain = null;
    }
  }

  // Explosive portal warp burst sound
  public playPortalBurst() {
    this.stopPortalCharging();
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Sub-bass detonation impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(260, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

      subGain.gain.setValueAtTime(this.volume * 0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.66);

      // Resonant energy shimmer
      const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C major cyber chord
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.8);

        gain.gain.setValueAtTime(this.volume * 0.1, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + 0.92);
      });
    } catch {}
  }

  // Continuous ambient cyberpunk soundtrack generator
  public startSoundtrack() {
    if (this.isSoundtrackPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.isSoundtrackPlaying = true;
    const chords = [
      [146.83, 220.00, 261.63, 329.63], // Dm9
      [130.81, 196.00, 246.94, 293.66], // Cmaj9
      [116.54, 174.61, 220.00, 261.63], // Bbmaj7
      [110.00, 164.81, 220.00, 277.18], // A7
    ];
    let step = 0;

    const playChordStep = () => {
      if (!this.isSoundtrackPlaying || !this.ctx) return;
      if (this.isMuted) return;

      try {
        const now = this.ctx.currentTime;
        const currentChord = chords[step % chords.length];
        step++;

        currentChord.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = i === 0 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(f, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450 + i * 80, now);
          filter.Q.setValueAtTime(2, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(this.volume * 0.035, now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 3.3);
        });
      } catch {}
    };

    playChordStep();
    this.soundtrackTimer = setInterval(playChordStep, 3200);
  }

  public stopSoundtrack() {
    if (this.soundtrackTimer) {
      clearInterval(this.soundtrackTimer);
      this.soundtrackTimer = null;
    }
    this.isSoundtrackPlaying = false;
  }

  public toggleSoundtrack(): boolean {
    if (this.isSoundtrackPlaying) {
      this.stopSoundtrack();
      return false;
    } else {
      this.startSoundtrack();
      return true;
    }
  }

  public isSoundtrackActive(): boolean {
    return this.isSoundtrackPlaying;
  }
}

export const soundEngine = new SoundEngine();
