// ============================================================================
// A.R.I.A. — Advanced Responsive Intelligence Assistant
// Type Definitions & System Interfaces
// ============================================================================

export type AriaCoreState =
  | 'standby'     // Idling, gentle orbital motion, awaiting activation
  | 'listening'   // Active microphone, expanding cyan audio rings
  | 'thinking'    // Processing query, accelerated orbital rotation & scanning
  | 'speaking'    // Audio output active, waveform reactive pulsation
  | 'error'       // Controlled alert state with diagnostic code
  | 'loading'     // Initializing neural subsystem
  | 'admin';      // Elevated administrative protocol active

export type AriaMode = 'docked' | 'fullscreen' | 'closed';

export type AriaPanelType =
  | 'events'
  | 'crew'
  | 'projects'
  | 'analytics'
  | 'membership'
  | 'system'
  | 'none';

export interface AriaMessage {
  id: string;
  sender: 'aria' | 'user' | 'system';
  text: string;
  timestamp: string;
  status?: 'delivered' | 'processing' | 'error';
  panelType?: AriaPanelType;
  panelData?: unknown;
  actionTaken?: {
    type: 'NAVIGATE' | 'OPEN_PANEL' | 'ADMIN_ACTION' | 'AUDIO_CONTROL' | 'NONE';
    target?: string;
    label?: string;
  };
  suggestedPrompts?: string[];
}

export interface AriaSettings {
  voiceEnabled: boolean;
  selectedVoiceURI: string | null;
  speechRate: number;      // 0.8 - 1.4
  speechPitch: number;     // 0.8 - 1.2
  soundEffects: boolean;
  wakeWordEnabled: boolean;
  visualIntensity: 'high' | 'medium' | 'minimal';
  reducedMotion: boolean;
  autoScrollChat: boolean;
}

export interface AriaActionCommand {
  pattern: RegExp;
  intent: string;
  description: string;
  action: (query: string, matches: RegExpMatchArray) => AriaCommandResult;
}

export interface AriaCommandResult {
  reply: string;
  panelType?: AriaPanelType;
  panelData?: unknown;
  navigationTarget?: string;
  isAdminAction?: boolean;
  adminActionPayload?: {
    action: string;
    details: string;
    requiresConfirmation: boolean;
  };
  suggestedPrompts?: string[];
}

export interface AriaSystemMetrics {
  version: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  activeNodes: number;
  memoryLatencyMs: number;
  speechSynthesisSupported: boolean;
  speechRecognitionSupported: boolean;
  webGlSupported: boolean;
  activeSessionDurationSec: number;
}
