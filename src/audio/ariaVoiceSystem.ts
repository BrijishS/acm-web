// ============================================================================
// A.R.I.A. — Two-Way Voice Recognition & Speech Synthesis Engine
// Web Speech API + SpeechSynthesis + Audio Waveform Generator
// ============================================================================

export type MicState = 'idle' | 'listening' | 'processing' | 'denied' | 'unsupported';

// Browser SpeechRecognition definition
interface IWindowSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (ev: Event) => void;
  onresult: (ev: any) => void;
  onerror: (ev: any) => void;
  onend: (ev: Event) => void;
}

declare global {
  interface Window {
    SpeechRecognition?: { new (): IWindowSpeechRecognition };
    webkitSpeechRecognition?: { new (): IWindowSpeechRecognition };
  }
}

class AriaVoiceSystem {
  private recognition: IWindowSpeechRecognition | null = null;
  private isRecognitionActive: boolean = false;
  private micState: MicState = 'idle';
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private waveformData: number[] = new Array(24).fill(0.05);
  private waveformAnimId: number | null = null;

  // Event Listeners
  private onTranscriptCallbacks: ((transcript: string, isFinal: boolean) => void)[] = [];
  private onWakeWordCallbacks: (() => void)[] = [];
  private onMicStateChangeCallbacks: ((state: MicState) => void)[] = [];
  private onSpeakingChangeCallbacks: ((isSpeaking: boolean) => void)[] = [];
  private onWaveformCallbacks: ((waveform: number[]) => void)[] = [];

  constructor() {
    this.initSpeechSynthesis();
    this.initSpeechRecognition();
  }

  // -------------------------------------------------------------
  // Speech Recognition (Speech-to-Text)
  // -------------------------------------------------------------
  private initSpeechRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      this.setMicState('unsupported');
      return;
    }

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isRecognitionActive = true;
        this.setMicState('listening');
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const combined = (finalTranscript || interimTranscript).trim();

        // Check for wake word trigger
        const lower = combined.toLowerCase();
        if (lower.includes('hey aria') || lower.includes('hey a.r.i.a') || lower.includes('hello aria')) {
          this.triggerWakeWord();
        }

        if (finalTranscript) {
          this.notifyTranscript(finalTranscript.trim(), true);
        } else if (interimTranscript) {
          this.notifyTranscript(interimTranscript.trim(), false);
        }
      };

      this.recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          this.setMicState('denied');
        } else if (event.error === 'no-speech') {
          // Normal timeout when silence occurs
          this.setMicState('idle');
        } else {
          this.setMicState('idle');
        }
        this.isRecognitionActive = false;
      };

      this.recognition.onend = () => {
        this.isRecognitionActive = false;
        if (this.micState !== 'denied' && this.micState !== 'unsupported') {
          this.setMicState('idle');
        }
      };
    } catch {
      this.setMicState('unsupported');
    }
  }

  public startListening(): boolean {
    if (!this.recognition) {
      this.setMicState('unsupported');
      return false;
    }

    if (this.isRecognitionActive) {
      return true;
    }

    try {
      this.recognition.start();
      return true;
    } catch {
      return false;
    }
  }

  public stopListening() {
    if (!this.recognition || !this.isRecognitionActive) return;
    try {
      this.recognition.stop();
    } catch {
      // Ignore stop exceptions
    }
    this.isRecognitionActive = false;
    this.setMicState('idle');
  }

  public toggleListening(): boolean {
    if (this.micState === 'listening') {
      this.stopListening();
      return false;
    } else {
      return this.startListening();
    }
  }

  public getMicState(): MicState {
    return this.micState;
  }

  private setMicState(state: MicState) {
    this.micState = state;
    this.onMicStateChangeCallbacks.forEach((cb) => cb(state));
  }

  // -------------------------------------------------------------
  // Speech Synthesis (Text-to-Speech)
  // -------------------------------------------------------------
  private initSpeechSynthesis() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    this.loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices() || [];
    if (this.voices.length === 0) return;

    // Prioritize natural, crisp English voices
    const preferred = [
      'Daniel',
      'Google US English',
      'Microsoft David',
      'Microsoft Mark',
      'Samantha',
      'Alex',
      'Victoria',
      'Karen'
    ];

    for (const name of preferred) {
      const match = this.voices.find(
        (v) => v.name.toLowerCase().includes(name.toLowerCase()) && v.lang.startsWith('en')
      );
      if (match) {
        this.selectedVoice = match;
        break;
      }
    }

    if (!this.selectedVoice) {
      this.selectedVoice = this.voices.find((v) => v.lang.startsWith('en')) || this.voices[0] || null;
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public setVoiceByURI(uri: string) {
    const match = this.voices.find((v) => v.voiceURI === uri);
    if (match) {
      this.selectedVoice = match;
    }
  }

  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options?.onEnd?.();
      return;
    }

    this.stopSpeaking();

    // Clean markdown formatting before speaking
    const cleanText = text
      .replace(/[*#_`~[\]]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      options?.onEnd?.();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.rate = options?.rate ?? 1.05;
      utterance.pitch = options?.pitch ?? 1.04;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.startWaveformSimulation();
        this.notifySpeaking(true);
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.stopWaveformSimulation();
        this.notifySpeaking(false);
        this.currentUtterance = null;
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        this.stopWaveformSimulation();
        this.notifySpeaking(false);
        this.currentUtterance = null;
        options?.onError?.();
        options?.onEnd?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.stopWaveformSimulation();
      this.notifySpeaking(false);
      options?.onEnd?.();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore cancel errors
      }
    }
    this.currentUtterance = null;
    this.stopWaveformSimulation();
    this.notifySpeaking(false);
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }

  // -------------------------------------------------------------
  // Simulated Audio Waveform (for 3D Core & HUD Bars)
  // -------------------------------------------------------------
  private startWaveformSimulation() {
    if (this.waveformAnimId !== null) return;

    let step = 0;
    const updateWaveform = () => {
      step += 0.2;
      this.waveformData = this.waveformData.map((_, i) => {
        const val = 0.2 + 0.7 * Math.abs(Math.sin(step + i * 0.45)) * (0.6 + 0.4 * Math.cos(step * 0.7 + i));
        return Math.min(Math.max(val, 0.05), 1.0);
      });

      this.onWaveformCallbacks.forEach((cb) => cb(this.waveformData));
      this.waveformAnimId = requestAnimationFrame(updateWaveform);
    };

    updateWaveform();
  }

  private stopWaveformSimulation() {
    if (this.waveformAnimId !== null) {
      cancelAnimationFrame(this.waveformAnimId);
      this.waveformAnimId = null;
    }
    this.waveformData = new Array(24).fill(0.05);
    this.onWaveformCallbacks.forEach((cb) => cb(this.waveformData));
  }

  // -------------------------------------------------------------
  // Subscription / Observer Handlers
  // -------------------------------------------------------------
  public onTranscript(callback: (transcript: string, isFinal: boolean) => void) {
    this.onTranscriptCallbacks.push(callback);
    return () => {
      this.onTranscriptCallbacks = this.onTranscriptCallbacks.filter((c) => c !== callback);
    };
  }

  public onWakeWord(callback: () => void) {
    this.onWakeWordCallbacks.push(callback);
    return () => {
      this.onWakeWordCallbacks = this.onWakeWordCallbacks.filter((c) => c !== callback);
    };
  }

  public onMicStateChange(callback: (state: MicState) => void) {
    this.onMicStateChangeCallbacks.push(callback);
    return () => {
      this.onMicStateChangeCallbacks = this.onMicStateChangeCallbacks.filter((c) => c !== callback);
    };
  }

  public onSpeakingChange(callback: (isSpeaking: boolean) => void) {
    this.onSpeakingChangeCallbacks.push(callback);
    return () => {
      this.onSpeakingChangeCallbacks = this.onSpeakingChangeCallbacks.filter((c) => c !== callback);
    };
  }

  public onWaveform(callback: (waveform: number[]) => void) {
    this.onWaveformCallbacks.push(callback);
    return () => {
      this.onWaveformCallbacks = this.onWaveformCallbacks.filter((c) => c !== callback);
    };
  }

  private notifyTranscript(text: string, isFinal: boolean) {
    this.onTranscriptCallbacks.forEach((cb) => cb(text, isFinal));
  }

  private triggerWakeWord() {
    this.onWakeWordCallbacks.forEach((cb) => cb());
  }

  private notifySpeaking(speaking: boolean) {
    this.onSpeakingChangeCallbacks.forEach((cb) => cb(speaking));
  }
}

export const ariaVoiceSystem = new AriaVoiceSystem();
