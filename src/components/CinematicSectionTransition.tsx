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
  Radio
} from 'lucide-react';

interface CinematicSectionTransitionProps {
  transmission: SectionAiBriefing | null;
}

export const CinematicSectionTransition: React.FC<CinematicSectionTransitionProps> = ({ transmission }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (transmission) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [transmission]);

  if (!transmission) return null;

  const renderIcon = () => {
    const props = { className: 'w-10 h-10', style: { color: transmission.themeColor } };
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
      {isVisible && (
        <motion.div
          key={transmission.id + '-cinematic-warp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Cybernetic Tint & Scanlines */}
          <div className="absolute inset-0 bg-[#030611]/30 backdrop-blur-[2px]" />

          {/* High-Velocity Vertical Laser Scanline Sweep */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 h-28 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${transmission.themeColor}33, ${transmission.themeColor}cc, transparent)`
            }}
          />

          {/* Top-Left Corner HUD Reticle ┌ */}
          <motion.div
            initial={{ x: -30, y: -30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-6 sm:left-12 flex flex-col gap-1 text-[10px] font-mono"
            style={{ color: transmission.themeColor }}
          >
            <div className="w-8 h-8 border-t-2 border-l-2" style={{ borderColor: transmission.themeColor }} />
            <span className="tracking-widest uppercase">LOCK: {transmission.code}</span>
          </motion.div>

          {/* Top-Right Corner HUD Reticle ┐ */}
          <motion.div
            initial={{ x: 30, y: -30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 right-6 sm:right-12 flex flex-col items-end gap-1 text-[10px] font-mono"
            style={{ color: transmission.themeColor }}
          >
            <div className="w-8 h-8 border-t-2 border-r-2" style={{ borderColor: transmission.themeColor }} />
            <span className="tracking-widest uppercase">{transmission.badge}</span>
          </motion.div>

          {/* Bottom-Left Corner HUD Reticle └ */}
          <motion.div
            initial={{ x: -30, y: 30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-12 left-6 sm:left-12 flex flex-col gap-1 text-[10px] font-mono"
            style={{ color: transmission.themeColor }}
          >
            <span className="tracking-widest uppercase">{transmission.coordinates}</span>
            <div className="w-8 h-8 border-b-2 border-l-2" style={{ borderColor: transmission.themeColor }} />
          </motion.div>

          {/* Bottom-Right Corner HUD Reticle ┘ */}
          <motion.div
            initial={{ x: 30, y: 30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-12 right-6 sm:right-12 flex flex-col items-end gap-1 text-[10px] font-mono"
            style={{ color: transmission.themeColor }}
          >
            <span className="tracking-widest uppercase">AI SYNTH // ROUTE ENGAGED</span>
            <div className="w-8 h-8 border-b-2 border-r-2" style={{ borderColor: transmission.themeColor }} />
          </motion.div>

          {/* Center Cinematic Warp Aperture & Holographic Emblem */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: [0.4, 1.15, 1], opacity: [0, 1, 0.95], rotate: 0 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#030611]/85 border backdrop-blur-xl shadow-2xl"
            style={{
              borderColor: `${transmission.themeColor}88`,
              boxShadow: `0 0 60px ${transmission.themeColor}44, inset 0 0 30px ${transmission.themeColor}22`
            }}
          >
            {/* Spinning Radar Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed opacity-50"
              style={{ borderColor: transmission.themeColor }}
            />

            {/* Icon Vessel */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 border shadow-lg"
              style={{
                backgroundColor: `${transmission.themeColor}15`,
                borderColor: `${transmission.themeColor}66`,
                boxShadow: `0 0 25px ${transmission.themeColor}55`
              }}
            >
              {renderIcon()}
            </div>

            {/* Target Title */}
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/70">
              TARGET LOCKED
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mt-0.5">
              {transmission.title}
            </h2>

            {/* Frequency Telemetry */}
            <div
              className="mt-2 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest border"
              style={{
                backgroundColor: `${transmission.themeColor}22`,
                borderColor: `${transmission.themeColor}88`,
                color: transmission.themeColor
              }}
            >
              {transmission.badge}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CinematicSectionTransition;
