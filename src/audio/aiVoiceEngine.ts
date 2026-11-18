// -------------------------------------------------------------
// VISTAS ACM — AI Voice Synthesis Engine (JARVIS Tactical Voice)
// -------------------------------------------------------------

export interface SectionAiBriefing {
  id: string;
  code: string;
  title: string;
  voiceLine: string;
  subtitle: string;
  badge: string;
  themeColor: string;
  iconType: 'rocket' | 'shield' | 'compass' | 'galaxy' | 'flame' | 'cpu' | 'key' | 'users' | 'camera' | 'radio';
  coordinates: string;
}

export const SECTION_AI_BRIEFINGS: Record<string, SectionAiBriefing> = {
  mission: {
    id: 'mission',
    code: 'NAV-01 // ROOT',
    title: 'MISSION CONTROL',
    voiceLine: 'Initialising Mission Control. Welcome to VISTAS ACM headquarters.',
    subtitle: 'Connecting orbital telemetry. All systems nominal.',
    badge: 'SYSTEMS ONLINE',
    themeColor: '#38BDF8',
    iconType: 'rocket',
    coordinates: 'ORBITAL DECK // LAT 12.9692° N · LON 80.1444° E'
  },
  profile: {
    id: 'profile',
    code: 'NAV-02 // PROFILE',
    title: 'CHAPTER PROFILE',
    voiceLine: 'Accessing chapter profile. Affirming our foundation and ACM Chapter Group ID 199704.',
    subtitle: 'Guided by faculty, driven by students. Department of Computer Science and Engineering.',
    badge: 'CHARTER VERIFIED',
    themeColor: '#38BDF8',
    iconType: 'shield',
    coordinates: 'CHAPTER ARCHIVES // GROUP ID: 199704 · CSE VISTAS'
  },
  vision: {
    id: 'vision',
    code: 'NAV-03 // HORIZON',
    title: 'STRATEGIC VISION',
    voiceLine: 'Aligning strategic horizon. Reviewing chapter vision and mission directives.',
    subtitle: 'Make learning active. Make ideas matter. Build, Lead, Create.',
    badge: 'DIRECTIVES LOADED',
    themeColor: '#F59E0B',
    iconType: 'compass',
    coordinates: 'CADENCE 2026–2027 // STRATEGIC HORIZON ALPHA'
  },
  domains: {
    id: 'domains',
    code: 'NAV-04 // GALAXY',
    title: 'GALAXY DOMAINS',
    voiceLine: 'Synchronizing Galaxy domains. Connecting five specialized technology divisions.',
    subtitle: 'AI and ML, Web and Apps, Cybersecurity, Data and Cloud, and Emerging Tech.',
    badge: '05 DIVISIONS ACTIVE',
    themeColor: '#A855F7',
    iconType: 'galaxy',
    coordinates: 'NEURAL CLUSTER // 5 COMPUTATIONAL DIVISIONS'
  },
  events: {
    id: 'events',
    code: 'NAV-05 // LAUNCH',
    title: 'LAUNCHES & EVENTS',
    voiceLine: 'Accessing launches console. Loading technical workshops, hackathons, and contests.',
    subtitle: 'Hack the Vel, Cipher Quest, Byte Brawl, Neural Nights, and Pixel Forge.',
    badge: 'PROGRAM ACTIVE',
    themeColor: '#FF3B9D',
    iconType: 'flame',
    coordinates: 'EVENT TELEMETRY // 6 HACKATHONS & SYMPOSIA'
  },
  projects: {
    id: 'projects',
    code: 'NAV-06 // PAYLOAD',
    title: 'BUILDS & PAYLOADS',
    voiceLine: 'Retrieving engineering payloads. Deploying student software architectures.',
    subtitle: 'Campus Companion, Exam Vault, and Rural Learn Kit ready.',
    badge: 'PAYLOADS SYNCED',
    themeColor: '#10B981',
    iconType: 'cpu',
    coordinates: 'HARDWARE & SOFTWARE PAYLOADS // GITHUB PRODUCTION'
  },
  governance: {
    id: 'governance',
    code: 'NAV-07 // CADENCE',
    title: 'GOVERNANCE & REVIEW',
    voiceLine: 'Authorizing governance protocols. Loading committee functions and quality review stages.',
    subtitle: 'Executive advisory, ten operational functions, and seven review stages.',
    badge: 'GOVERNANCE SECURE',
    themeColor: '#06B6D4',
    iconType: 'key',
    coordinates: 'AUDIT RIGOR // 7 STAGE EVALUATION FRAMEWORK'
  },
  team: {
    id: 'team',
    code: 'NAV-08 // CREW',
    title: 'CREW ROSTER',
    voiceLine: 'Accessing command crew roster. Loading faculty advisory and student leadership.',
    subtitle: 'Faculty Advisor Mr. N. Udayakumar and sixteen chapter office bearers.',
    badge: 'CREW MANIFEST LOADED',
    themeColor: '#EC4899',
    iconType: 'users',
    coordinates: 'BIOMETRIC ROSTER // 16 EXECUTIVE LEADERS ACTIVE'
  },
  gallery: {
    id: 'gallery',
    code: 'NAV-09 // ARCHIVE',
    title: 'VISUAL ARCHIVE',
    voiceLine: 'Opening visual archive. Loading chapter moments and community highlights.',
    subtitle: 'Preserving hackathons, code sprints, and collaborative milestones.',
    badge: 'ARCHIVE ACCESSED',
    themeColor: '#8B5CF6',
    iconType: 'camera',
    coordinates: 'PHOTONIC ARCHIVE // CHAPTER MILESTONES & MEDIA'
  },
  contact: {
    id: 'contact',
    code: 'NAV-10 // UPLINK',
    title: 'COMMUNICATION UPLINK',
    voiceLine: 'Opening transmission channel. Connect terminal ready for chapter registration.',
    subtitle: 'Direct uplink active. Connect with VISTAS ACM leadership.',
    badge: 'UPLINK ESTABLISHED',
    themeColor: '#FF1E56',
    iconType: 'radio',
    coordinates: 'COMM LINK // @VISTAS_ACM · CHENNAI TAMIL NADU'
  }
};

class AiVoiceEngine {
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Search for a crisp, futuristic English voice
    // Preferred order: Natural English voices
    const preferredNames = [
      'Daniel',
      'Google US English',
      'Microsoft David',
      'Microsoft Mark',
      'Microsoft George',
      'Samantha',
      'Alex',
      'Karen'
    ];

    let found: SpeechSynthesisVoice | null = null;
    for (const name of preferredNames) {
      const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'));
      if (match) {
        found = match;
        break;
      }
    }

    if (!found) {
      found = voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
    }

    this.selectedVoice = found;
    this.voicesLoaded = true;
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.currentUtterance = null;
  }

  public speak(
    text: string,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options?.onEnd?.();
      return;
    }

    // Cancel any ongoing transmission first
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);

      if (!this.voicesLoaded) {
        this.initVoices();
      }

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      // Sci-fi / JARVIS cadence parameters
      utterance.pitch = 1.08;
      utterance.rate = 1.05;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('AI Voice synthesis notice:', e);
        this.currentUtterance = null;
        options?.onError?.();
        options?.onEnd?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      options?.onEnd?.();
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }

  public getBriefing(sectionId: string): SectionAiBriefing {
    const key = sectionId.toLowerCase();
    return SECTION_AI_BRIEFINGS[key] || {
      id: key,
      code: `NAV // ${key.toUpperCase()}`,
      title: key.toUpperCase(),
      voiceLine: `Routing to ${key} command section. Systems synchronized.`,
      subtitle: `Navigating to ${key} console.`,
      badge: 'COMMAND ROUTED',
      themeColor: '#38BDF8',
      iconType: 'rocket',
      coordinates: 'COORDINATES // DYNAMIC TRANSMISSION'
    };
  }
}

export const aiVoiceEngine = new AiVoiceEngine();
