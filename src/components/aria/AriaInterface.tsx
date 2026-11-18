// ============================================================================
// A.R.I.A. — Master Holographic Artificial Intelligence Interface
// Full-Screen Command Center + Minimized Holographic Dock
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AriaCoreState,
  AriaMessage,
  AriaSettings,
  AriaPanelType
} from '../../types/aria';
import { AriaCore3D } from './AriaCore3D';
import { AriaSettingsModal } from './AriaSettingsModal';
import { AriaEventPanel } from './panels/AriaEventPanel';
import { AriaCrewPanel } from './panels/AriaCrewPanel';
import { AriaProjectPanel } from './panels/AriaProjectPanel';
import { AriaAnalyticsPanel } from './panels/AriaAnalyticsPanel';
import { AriaSystemStatusPanel } from './panels/AriaSystemStatusPanel';
import { ariaVoiceSystem } from '../../audio/ariaVoiceSystem';
import { ariaIntelligence } from '../../services/ariaIntelligence';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import {
  Mic,
  MicOff,
  Send,
  X,
  Settings,
  Volume2,
  VolumeX,
  Square,
  RotateCcw,
  Sparkles,
  Shield,
  Activity,
  Terminal,
  Clock,
  Radio,
  Layers,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';

interface AriaInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminAuthenticated?: boolean;
}

const DEFAULT_SETTINGS: AriaSettings = {
  voiceEnabled: true,
  selectedVoiceURI: null,
  speechRate: 1.05,
  speechPitch: 1.04,
  soundEffects: true,
  wakeWordEnabled: true,
  visualIntensity: 'high',
  reducedMotion: false,
  autoScrollChat: true
};

export const AriaInterface: React.FC<AriaInterfaceProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenAdmin,
  isAdminAuthenticated = false
}) => {
  const [coreState, setCoreState] = useState<AriaCoreState>('standby');
  const [inputText, setInputText] = useState<string>('');
  const [waveform, setWaveform] = useState<number[]>(new Array(24).fill(0.05));
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<AriaSettings>(() => {
    try {
      const saved = localStorage.getItem('vistas_aria_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [messages, setMessages] = useState<AriaMessage[]>([
    {
      id: 'aria-welcome',
      sender: 'aria',
      text: "Good day. A.R.I.A. is online and synchronized with VISTAS ACM Mission Control. Your intelligence. Your interface. Your future. How may I assist your exploration or chapter operations today?",
      timestamp: 'ONLINE',
      suggestedPrompts: [
        'Show upcoming events',
        'Meet our 16-member crew',
        'Explore 5 technical domains',
        'Student payloads & projects',
        'Chapter standing & stats'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync settings
  const handleUpdateSettings = (updated: Partial<AriaSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('vistas_aria_settings', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Auto-scroll chat
  useEffect(() => {
    if (settings.autoScrollChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, settings.autoScrollChat]);

  // Voice Event Listeners
  useEffect(() => {
    const unsubWaveform = ariaVoiceSystem.onWaveform((data) => {
      setWaveform(data);
    });

    const unsubSpeaking = ariaVoiceSystem.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
      if (speaking) {
        setCoreState('speaking');
      } else {
        setCoreState('standby');
      }
    });

    const unsubTranscript = ariaVoiceSystem.onTranscript((transcript, isFinal) => {
      if (isFinal && transcript) {
        handleUserSubmit(transcript);
      } else {
        setInputText(transcript);
      }
    });

    const unsubWakeWord = ariaVoiceSystem.onWakeWord(() => {
      if (settings.wakeWordEnabled) {
        soundEngine.playJarvisChirp();
        ariaVoiceSystem.speak("A.R.I.A. active. I am listening.");
      }
    });

    return () => {
      unsubWaveform();
      unsubSpeaking();
      unsubTranscript();
      unsubWakeWord();
      ariaVoiceSystem.stopSpeaking();
      ariaVoiceSystem.stopListening();
    };
  }, [settings.wakeWordEnabled]);

  // Handle User Input Submission
  const handleUserSubmit = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    if (settings.soundEffects) soundEngine.playClick();

    const userMsg: AriaMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setCoreState('thinking');

    try {
      // Process query through A.R.I.A. Intelligence Engine
      const res = await ariaIntelligence.processQuery(query, isAdminAuthenticated);

      // Audio feedback
      if (settings.soundEffects) soundEngine.playHologramActivate();

      // Check for navigation action
      if (res.actionTaken?.type === 'NAVIGATE' && res.actionTaken.target) {
        onNavigateSection(res.actionTaken.target);
      } else if (res.actionTaken?.type === 'ADMIN_ACTION') {
        onOpenAdmin();
      }

      const ariaReplyMsg: AriaMessage = {
        id: `aria-${Date.now()}`,
        sender: 'aria',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        panelType: res.panelType as AriaPanelType,
        panelData: res.panelData,
        actionTaken: res.actionTaken,
        suggestedPrompts: res.suggestedPrompts
      };

      setMessages((prev) => [...prev, ariaReplyMsg]);

      // Speak response if voice is enabled
      if (settings.voiceEnabled) {
        setCoreState('speaking');
        ariaVoiceSystem.speak(res.reply, {
          rate: settings.speechRate,
          pitch: settings.speechPitch,
          onEnd: () => setCoreState('standby'),
          onError: () => setCoreState('standby')
        });
      } else {
        setCoreState('standby');
      }
    } catch {
      setCoreState('error');
      const errorMsg: AriaMessage = {
        id: `err-${Date.now()}`,
        sender: 'aria',
        text: "Diagnostic notice: Encountered an anomaly while evaluating telemetry. Fallback procedures engaged.",
        timestamp: 'ALERT',
        panelType: 'system'
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  // Toggle Microphone
  const handleToggleMic = () => {
    if (settings.soundEffects) soundEngine.playClick();
    if (coreState === 'listening') {
      ariaVoiceSystem.stopListening();
      setCoreState('standby');
    } else {
      const success = ariaVoiceSystem.startListening();
      if (success) {
        setCoreState('listening');
      }
    }
  };

  // Clear Conversation
  const handleClearConversation = () => {
    setMessages([
      {
        id: `aria-reset-${Date.now()}`,
        sender: 'aria',
        text: "Context cleared. Active telemetry buffer purged. Standing by for instructions.",
        timestamp: 'RESET',
        suggestedPrompts: ['Show upcoming events', '16-member crew', '5 technical domains']
      }
    ]);
  };

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // FULL-SCREEN HOLOGRAPHIC COMMAND CENTER
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-[#030611]/95 backdrop-blur-2xl text-white flex flex-col overflow-hidden font-sans select-none"
      >
        {/* Dynamic Scanline Overlay */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40 z-0" />

        {/* =========================================================
            TOP PANEL: Identity, Status, Controls
        ========================================================= */}
        <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-cerulean/20 bg-gradient-to-b from-[#050B14] to-transparent">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-cerulean/60 p-0.5 overflow-hidden bg-black flex-shrink-0">
              <img
                src={CHAPTER_INFO.logoUrl}
                alt="VISTAS ACM"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-black tracking-wider uppercase text-white">
                  A.R.I.A.
                </span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-cerulean/20 text-cerulean border border-cerulean/30">
                  SYSTEM ACTIVE
                </span>
                {isAdminAuthenticated && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    ADMIN MODE
                  </span>
                )}
              </div>
              <small className="font-mono text-[9px] text-chrome/60 tracking-widest block uppercase">
                ADVANCED RESPONSIVE INTELLIGENCE ASSISTANT · GROUP ID: 199704
              </small>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Audio Mute/Unmute */}
            <button
              onClick={() => {
                if (settings.soundEffects) soundEngine.playClick();
                handleUpdateSettings({ voiceEnabled: !settings.voiceEnabled });
                if (settings.voiceEnabled) ariaVoiceSystem.stopSpeaking();
              }}
              className="p-2 rounded-lg border border-cerulean/20 text-chrome hover:text-white hover:border-cerulean transition-colors"
              title={settings.voiceEnabled ? "Mute Voice" : "Enable Voice"}
            >
              {settings.voiceEnabled ? <Volume2 className="w-4 h-4 text-cerulean" /> : <VolumeX className="w-4 h-4 text-rose" />}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => {
                if (settings.soundEffects) soundEngine.playClick();
                setIsSettingsOpen(true);
              }}
              className="p-2 rounded-lg border border-cerulean/20 text-chrome hover:text-white hover:border-cerulean transition-colors"
              title="System Configuration"
            >
              <Settings className="w-4 h-4 text-cerulean" />
            </button>

            {/* Close */}
            <button
              onClick={() => {
                if (settings.soundEffects) soundEngine.playClick();
                ariaVoiceSystem.stopSpeaking();
                ariaVoiceSystem.stopListening();
                onClose();
              }}
              className="p-2 rounded-lg border border-rose/30 text-rose hover:bg-rose/20 transition-colors cursor-pointer"
              title="Close Holographic Interface"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* =========================================================
            MAIN WORKSPACE: 3-Column Responsive Grid
        ========================================================= */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6 overflow-hidden">
          {/* -------------------------------------------------------
              LEFT PANEL (Col 1-3): System Telemetry & Quick Commands
          ------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 overflow-y-auto pr-1">
            {/* System Status HUD */}
            <div className="hud-card p-4 rounded-xl border-cerulean/20 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-cerulean/15">
                <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-cerulean" />
                  SYSTEM TELEMETRY
                </span>
                <span className="font-mono text-[9px] text-emerald-400">NOMINAL</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-chrome/70">
                  <span>ACM CADENCE</span>
                  <span className="text-white">AY 2026–2027</span>
                </div>
                <div className="flex justify-between text-chrome/70">
                  <span>CHAPTER ID</span>
                  <span className="text-cerulean font-bold">199704</span>
                </div>
                <div className="flex justify-between text-chrome/70">
                  <span>FACULTY ADVISOR</span>
                  <span className="text-white text-[11px] truncate">Mr. N. Udayakumar</span>
                </div>
                <div className="flex justify-between text-chrome/70">
                  <span>STANDING</span>
                  <span className="text-emerald-400">GOOD STANDING</span>
                </div>
              </div>
            </div>

            {/* Quick Tactical Command Chips */}
            <div className="hud-card p-4 rounded-xl border-cerulean/20 space-y-3 flex-1 flex flex-col">
              <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase flex items-center gap-1.5 pb-2 border-b border-cerulean/15">
                <Terminal className="w-3.5 h-3.5 text-rose" />
                TACTICAL ROUTING
              </span>

              <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                {[
                  { label: 'Upcoming Events & Hackathons', query: 'Show upcoming events', target: 'events' },
                  { label: '16-Member Crew Dossier', query: 'Show our crew', target: 'crew' },
                  { label: '5 Technical Domains', query: 'Show technical domains', target: 'domains' },
                  { label: 'Student Payloads & Projects', query: 'Show student payloads', target: 'projects' },
                  { label: 'Membership Initiation', query: 'How to join ACM', target: 'join' },
                  { label: 'Chapter Analytics', query: 'Show chapter statistics', target: 'achievements' },
                  { label: 'System Diagnostics', query: 'Show system status', target: 'system' }
                ].map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleUserSubmit(cmd.query)}
                    className="w-full text-left p-2 rounded-lg bg-black/40 border border-cerulean/15 hover:border-cerulean hover:bg-cerulean/10 transition-all font-mono text-[11px] text-chrome/80 hover:text-white flex items-center justify-between group"
                  >
                    <span className="truncate">{cmd.label}</span>
                    <span className="text-cerulean opacity-0 group-hover:opacity-100 transition-opacity">▹</span>
                  </button>
                ))}
              </div>

              {/* Admin Button */}
              <button
                onClick={() => {
                  if (settings.soundEffects) soundEngine.playClick();
                  onOpenAdmin();
                }}
                className="w-full p-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all mt-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>MISSION CONTROL ADMIN</span>
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------
              CENTER (Col 4-7): 3D AI Core & Audio Waveform
          ------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[280px]">
            {/* 3D Holographic AI Core */}
            <div className="relative w-full h-full max-h-[460px] flex items-center justify-center">
              <AriaCore3D
                state={coreState}
                waveform={waveform}
                reducedMotion={settings.reducedMotion}
              />
            </div>

            {/* Core Status & Waveform Deck */}
            <div className="w-full max-w-xs space-y-2 text-center mt-2">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-black/50 border border-cerulean/30">
                <span
                  className={`w-2 h-2 rounded-full ${
                    coreState === 'listening' ? 'bg-[#00F0FF] animate-ping' :
                    coreState === 'thinking' ? 'bg-purple-400 animate-pulse' :
                    coreState === 'speaking' ? 'bg-[#FF2E88] animate-bounce' :
                    coreState === 'error' ? 'bg-rose' :
                    'bg-cerulean'
                  }`}
                />
                <span className="text-white font-bold">{coreState.toUpperCase()}</span>
                <span className="text-chrome/40">·</span>
                <span className="text-cerulean">{isSpeaking ? 'AUDIO ACTIVE' : 'IDLE'}</span>
              </div>

              {/* Real-time Simulated Audio Waveform Bars */}
              <div className="flex items-center justify-center gap-1 h-8 px-4">
                {waveform.map((bar, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.max(bar * 30, 4)}px`,
                      backgroundColor:
                        coreState === 'speaking' ? '#FF2E88' :
                        coreState === 'listening' ? '#00F0FF' :
                        '#38BDF8',
                      boxShadow: `0 0 6px ${coreState === 'speaking' ? '#FF2E88' : '#38BDF8'}`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------
              RIGHT PANEL (Col 8-12): Conversation & Holographic Cards
          ------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col h-full overflow-hidden hud-card rounded-2xl border-cerulean/30 bg-[#071322]/80 backdrop-blur-md">
            {/* Transcript Header */}
            <div className="px-4 py-2.5 border-b border-cerulean/20 flex items-center justify-between bg-black/30">
              <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose animate-pulse" />
                NEURAL CONVERSATION STREAM
              </span>
              <button
                onClick={handleClearConversation}
                className="font-mono text-[9px] text-chrome/50 hover:text-rose transition-colors"
                title="Clear current transcript"
              >
                CLEAR
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div className="flex items-center gap-2 font-mono text-[9px] text-chrome/40 px-1">
                    <span>{msg.sender === 'user' ? 'MISSION OPERATOR' : 'A.R.I.A. CORE'}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[92%] p-3.5 rounded-2xl font-sans text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cerulean/20 to-blue-600/30 border border-cerulean/40 text-white rounded-tr-none'
                        : 'bg-[#030914] border border-cerulean/30 text-[#C5CBD3] shadow-lg rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Action Confirmation Banner */}
                    {msg.actionTaken && (
                      <div className="mt-2.5 pt-2 border-t border-cerulean/15 flex items-center gap-2 font-mono text-[10px] text-cerulean">
                        <span className="w-1.5 h-1.5 rounded-full bg-cerulean animate-ping" />
                        <span>ACTION ROUTED: {msg.actionTaken.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Embedded Holographic Panels */}
                  {msg.panelType === 'events' && (
                    <div className="w-full mt-2">
                      <AriaEventPanel onNavigateSection={onNavigateSection} />
                    </div>
                  )}

                  {msg.panelType === 'crew' && (
                    <div className="w-full mt-2">
                      <AriaCrewPanel onNavigateSection={onNavigateSection} />
                    </div>
                  )}

                  {msg.panelType === 'projects' && (
                    <div className="w-full mt-2">
                      <AriaProjectPanel onNavigateSection={onNavigateSection} />
                    </div>
                  )}

                  {msg.panelType === 'analytics' && (
                    <div className="w-full mt-2">
                      <AriaAnalyticsPanel onNavigateSection={onNavigateSection} />
                    </div>
                  )}

                  {msg.panelType === 'system' && (
                    <div className="w-full mt-2">
                      <AriaSystemStatusPanel />
                    </div>
                  )}

                  {/* Suggested Follow-up Prompts */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedPrompts.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleUserSubmit(prompt)}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 hover:bg-cerulean/20 border border-cerulean/20 hover:border-cerulean text-chrome/80 hover:text-white transition-all text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM PANEL: Voice / Text Command Bar
        ========================================================= */}
        <footer className="relative z-20 px-4 sm:px-8 py-3 border-t border-cerulean/20 bg-gradient-to-t from-[#050B14] to-transparent">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSubmit();
            }}
            className="max-w-4xl mx-auto flex items-center gap-2"
          >
            {/* Push-to-Talk Mic Trigger */}
            <button
              type="button"
              onClick={handleToggleMic}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center relative ${
                coreState === 'listening'
                  ? 'bg-[#00F0FF] border-[#00F0FF] text-black shadow-[0_0_20px_#00F0FF] animate-pulse'
                  : 'bg-black/50 border-cerulean/30 text-cerulean hover:border-cerulean hover:bg-cerulean/10'
              }`}
              title={coreState === 'listening' ? "Stop Listening" : "Speak to A.R.I.A."}
            >
              {coreState === 'listening' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={coreState === 'listening' ? "A.R.I.A. is listening to your voice..." : "Direct A.R.I.A. via text or voice (e.g. 'Show upcoming hackathons')..."}
                className="w-full bg-[#030914] border border-cerulean/30 focus:border-cerulean rounded-xl py-3 px-4 font-mono text-xs sm:text-sm text-white placeholder:text-chrome/40 focus:outline-none shadow-inner"
              />
            </div>

            {/* Stop Speaking / Mute Button (if actively speaking) */}
            {isSpeaking && (
              <button
                type="button"
                onClick={() => ariaVoiceSystem.stopSpeaking()}
                className="p-3 rounded-xl border border-rose/40 bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
                title="Stop Speech Output"
              >
                <Square className="w-5 h-5" />
              </button>
            )}

            {/* Submit Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-xl cyber-btn-blue disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              title="Transmit Command"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </footer>

        {/* Configuration Modal */}
        <AriaSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClearConversation={handleClearConversation}
        />
      </motion.div>
    </AnimatePresence>
  );
};
