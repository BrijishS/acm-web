import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionAiBriefing } from '../audio/aiVoiceEngine';
import {
  Rocket,
  ShieldCheck,
  Compass,
  Sparkles,
  Flame,
  Cpu,
  KeyRound,
  Users,
  Camera,
  Radio,
  Volume2,
  X,
  Activity
} from 'lucide-react';

interface AiTransmissionHudProps {
  transmission: SectionAiBriefing | null;
  isSpeaking: boolean;
  onDismiss: () => void;
  isMuted: boolean;
}

export const AiTransmissionHud: React.FC<AiTransmissionHudProps> = ({
  transmission,
  isSpeaking,
  onDismiss,
  isMuted
}) => {
  // 20-band audio waveform animation bars
  const [waveHeights, setWaveHeights] = useState<number[]>(() =>
    Array.from({ length: 20 }, () => 18)
  );
  // Real-time typewriter revealed text
  const [displayedText, setDisplayedText] = useState('');

  // Animate dynamic audio waveform equalizer while speaking
  useEffect(() => {
    if (!isSpeaking) {
      setWaveHeights((prev) => prev.map(() => 15));
      return;
    }

    const interval = setInterval(() => {
      setWaveHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * 80) + 20)
      );
    }, 85);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Synchronized typewriter reveal of spoken AI line
  useEffect(() => {
    if (!transmission) {
      setDisplayedText('');
      return;
    }

    const fullText = transmission.voiceLine;
    setDisplayedText('');
    let idx = 0;

    // Typewriter velocity based on text length
    const stepDuration = Math.max(16, Math.min(32, 2200 / fullText.length));

    const typewriter = setInterval(() => {
      idx++;
      if (idx <= fullText.length) {
        setDisplayedText(fullText.slice(0, idx));
      } else {
        clearInterval(typewriter);
      }
    }, stepDuration);

    return () => clearInterval(typewriter);
  }, [transmission]);

  if (!transmission) return null;

  const renderIcon = () => {
    const props = { className: 'w-6 h-6', style: { color: transmission.themeColor } };
    switch (transmission.iconType) {
      case 'rocket':
        return <Rocket {...props} />;
      case 'shield':
        return <ShieldCheck {...props} />;
      case 'compass':
        return <Compass {...props} />;
      case 'galaxy':
        return <Sparkles {...props} />;
      case 'flame':
        return <Flame {...props} />;
      case 'cpu':
        return <Cpu {...props} />;
      case 'key':
        return <KeyRound {...props} />;
      case 'users':
        return <Users {...props} />;
      case 'camera':
        return <Camera {...props} />;
      case 'radio':
        return <Radio {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={transmission.id + transmission.code}
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl pointer-events-auto"
      >
        {/* Holographic Glowing Border Container */}
        <div
          className="relative rounded-2xl bg-[#030714]/95 border p-4 sm:p-5 shadow-2xl backdrop-blur-2xl overflow-hidden"
          style={{
            borderColor: `${transmission.themeColor}88`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.95), 0 0 30px ${transmission.themeColor}33`
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-16 -left-16 w-44 h-44 rounded-full blur-[60px] pointer-events-none"
            style={{ backgroundColor: `${transmission.themeColor}33` }}
          />

          {/* Top Scanning Laser Sweep */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 h-[2px] w-1/3 pointer-events-none"
            style={{
              background: `linear-gradient(to right, transparent, ${transmission.themeColor}, transparent)`
            }}
          />

          <div className="flex items-start gap-3.5 sm:gap-4">
            {/* Left: AI Rotating Reactor Core Avatar with Thematic Icon */}
            <div className="relative flex-shrink-0 mt-0.5">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border p-1 flex items-center justify-center bg-[#071329] shadow-lg relative"
                style={{
                  borderColor: `${transmission.themeColor}aa`,
                  boxShadow: `0 0 20px ${transmission.themeColor}55`
                }}
              >
                {/* Rotating Concentric Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed opacity-70"
                  style={{ borderColor: transmission.themeColor }}
                />
                {/* Reverse Counter Gyro Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-1 rounded-full border border-white/20"
                />
                {/* Animated Section Icon */}
                {renderIcon()}
              </div>

              {/* Sonar Acoustic Pulse Ping */}
              {isSpeaking && (
                <span
                  className="absolute -inset-1 rounded-full animate-ping pointer-events-none"
                  style={{ backgroundColor: `${transmission.themeColor}44` }}
                />
              )}
            </div>

            {/* Center: Live Transmission Telemetry & Spoken Line */}
            <div className="flex-1 min-w-0">
              {/* Header Metadata Pill Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 font-mono text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border font-bold"
                    style={{
                      backgroundColor: `${transmission.themeColor}18`,
                      borderColor: `${transmission.themeColor}66`,
                      color: transmission.themeColor
                    }}
                  >
                    <Activity className="w-2.5 h-2.5 animate-pulse" />
                    <span>AI SYNTH TRANSMISSION</span>
                  </span>

                  <span className="text-[#94a3b8] font-semibold">
                    {transmission.code}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded border font-bold tracking-wider"
                    style={{
                      backgroundColor: `${transmission.themeColor}22`,
                      borderColor: `${transmission.themeColor}88`,
                      color: transmission.themeColor
                    }}
                  >
                    {transmission.badge}
                  </span>

                  <button
                    onClick={onDismiss}
                    className="p-1 rounded-full text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Dismiss transmission"
                    aria-label="Dismiss transmission"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Real-Time Typewriter Spoken Transcript */}
              <div className="relative min-h-[44px]">
                <p className="font-heading text-sm sm:text-base font-bold text-white tracking-wide leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  "{displayedText}"
                  {displayedText.length < transmission.voiceLine.length && (
                    <span
                      className="inline-block w-1.5 h-4 ml-1 translate-y-0.5 animate-pulse"
                      style={{ backgroundColor: transmission.themeColor }}
                    />
                  )}
                </p>
              </div>

              {/* Subtitle Telemetry Context */}
              <p className="font-mono text-[11px] sm:text-xs text-[#94a3b8] mt-1 truncate">
                {transmission.subtitle}
              </p>

              {/* Bottom Live Audio Equalizer Waveform & Frequency Telemetry */}
              <div className="flex items-center justify-between gap-3 mt-2.5 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1 sm:gap-1.5 h-5 flex-1">
                  {waveHeights.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.08, ease: 'easeInOut' }}
                      className="w-1 sm:w-1.5 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? transmission.themeColor : '#FFFFFF',
                        boxShadow: `0 0 8px ${transmission.themeColor}88`
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-chrome/60 flex-shrink-0">
                  <Volume2
                    className={`w-3 h-3 ${isSpeaking ? 'animate-pulse' : 'text-[#94a3b8]'}`}
                    style={{ color: isSpeaking ? transmission.themeColor : undefined }}
                  />
                  <span>
                    {isMuted
                      ? 'AUDIO MUTED (VISUAL SYNC ONLY)'
                      : isSpeaking
                      ? 'VOICE FREQ 44.1 kHz · SYNTH ACTIVE'
                      : 'TRANSMISSION COMPLETE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
