import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AriaSettings } from '../../types/aria';
import { ariaVoiceSystem } from '../../audio/ariaVoiceSystem';
import { soundEngine } from '../../audio/soundEngine';
import { X, Volume2, Mic, Eye, Trash2, Check, Settings2, Sliders } from 'lucide-react';

interface AriaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AriaSettings;
  onUpdateSettings: (newSettings: Partial<AriaSettings>) => void;
  onClearConversation: () => void;
}

export const AriaSettingsModal: React.FC<AriaSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onClearConversation
}) => {
  if (!isOpen) return null;

  const voices = ariaVoiceSystem.getAvailableVoices();
  const micState = ariaVoiceSystem.getMicState();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg hud-card p-6 rounded-2xl border-cerulean/40 shadow-2xl bg-[#071322]/95 space-y-6 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-cerulean/20">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-cerulean animate-spin" style={{ animationDuration: '15s' }} />
              <div>
                <h3 className="font-heading text-lg font-bold tracking-wider uppercase text-white">
                  A.R.I.A. CONFIGURATION
                </h3>
                <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase">
                  SYSTEM PARAMETERS & PREFERENCES
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg border border-cerulean/20 hover:border-rose/50 hover:text-rose transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {/* 1. Voice Output Toggle & Voice Selector */}
            <div className="p-3 rounded-xl bg-black/40 border border-cerulean/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white uppercase flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cerulean" />
                  Voice Responses (Text-to-Speech)
                </span>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onUpdateSettings({ voiceEnabled: !settings.voiceEnabled });
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    settings.voiceEnabled ? 'bg-cerulean' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                      settings.voiceEnabled ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {settings.voiceEnabled && (
                <>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-chrome/60 uppercase block">
                      Select Synthetic Voice:
                    </label>
                    <select
                      value={settings.selectedVoiceURI || ''}
                      onChange={(e) => {
                        const uri = e.target.value;
                        onUpdateSettings({ selectedVoiceURI: uri });
                        ariaVoiceSystem.setVoiceByURI(uri);
                      }}
                      className="w-full bg-[#030814] border border-cerulean/30 rounded-lg p-2 font-mono text-xs text-white focus:outline-none focus:border-cerulean"
                    >
                      {voices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-chrome/60 uppercase">
                      <span>Speaking Cadence</span>
                      <span className="text-cerulean">{settings.speechRate.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.3"
                      step="0.05"
                      value={settings.speechRate}
                      onChange={(e) => onUpdateSettings({ speechRate: parseFloat(e.target.value) })}
                      className="w-full accent-cerulean cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>

            {/* 2. Microphone & Permissions */}
            <div className="p-3 rounded-xl bg-black/40 border border-cerulean/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white uppercase flex items-center gap-2">
                  <Mic className="w-4 h-4 text-rose" />
                  Voice Input Status
                </span>
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded uppercase ${
                  micState === 'listening' ? 'bg-cerulean/20 text-cerulean border border-cerulean/40 animate-pulse' :
                  micState === 'denied' ? 'bg-rose/20 text-rose border border-rose/40' :
                  micState === 'unsupported' ? 'bg-white/10 text-chrome' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {micState}
                </span>
              </div>
              <p className="font-sans text-[11px] text-chrome/70">
                Click the microphone button in the console to speak or use the wake phrase "Hey A.R.I.A." when active.
              </p>
            </div>

            {/* 3. Visuals & Motion */}
            <div className="p-3 rounded-xl bg-black/40 border border-cerulean/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white uppercase flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  Reduced Motion Mode
                </span>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onUpdateSettings({ reducedMotion: !settings.reducedMotion });
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    settings.reducedMotion ? 'bg-cerulean' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                      settings.reducedMotion ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white uppercase flex items-center gap-2">
                  Tactile Audio Effects
                </span>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onUpdateSettings({ soundEffects: !settings.soundEffects });
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    settings.soundEffects ? 'bg-cerulean' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                      settings.soundEffects ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 4. Memory & Privacy */}
            <div className="p-3 rounded-xl bg-black/40 border border-cerulean/20 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-white uppercase block">Clear Memory</span>
                <span className="font-sans text-[10px] text-chrome/60">Purge local transcript and active context</span>
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClearConversation();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg border border-rose/40 text-rose hover:bg-rose/10 font-mono text-xs uppercase flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>PURGE</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-cerulean/20 flex justify-end">
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="cyber-btn-blue text-xs px-5 py-2 rounded-lg"
            >
              SAVE & RETURN
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
