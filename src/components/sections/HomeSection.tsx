import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { CommandCenter3D } from '../3d/CommandCenter3D';
import { Terminal, ArrowDown, Compass, Laptop, Rocket, Hash, Crosshair, Sparkles } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (sectionId: string) => void;
}

const TELEMETRY_PHRASES = [
  "INITIALISING MISSION...",
  "CONNECTING ORBITAL TELEMETRY...",
  "GALAXY DOMAINS SYNCHRONIZED...",
  "SYSTEMS NOMINAL // CHAPTER ACTIVE"
];

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [telemetryIdx, setTelemetryIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryIdx((prev) => (prev + 1) % TELEMETRY_PHRASES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mission" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-[#030611]">
      {/* 1. Mission Control Blueprint Coordinate Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(14,35,71,0.6)_0%,rgba(3,6,17,0.98)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* 2. Visual Elements from Reference Photo */}

      {/* Top Left HUD Corner Reticle & "INITIALISING MISSION..." Telemetry */}
      <div className="absolute top-20 left-4 sm:left-8 z-20 flex items-start gap-2 text-cerulean pointer-events-none select-none">
        {/* Cyan HUD Corner Bracket ┌ */}
        <div className="w-6 h-6 border-t-2 border-l-2 border-[#38BDF8] flex-shrink-0" />
        <div className="font-mono text-xs sm:text-sm text-[#38BDF8] tracking-widest uppercase animate-pulse">
          {TELEMETRY_PHRASES[telemetryIdx]}
        </div>
      </div>

      {/* Glowing Celestial Sphere / White Moon on the Left */}
      <div className="absolute top-1/3 left-4 sm:left-12 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-[0_0_50px_rgba(255,255,255,0.9),0_0_100px_rgba(56,189,248,0.6)] animate-pulse" />
        {/* Radiating diagonal lens flares */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />
      </div>

      {/* Floating Laptop Icon in Orbit from Reference Photo */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[38%] pointer-events-none z-10 hidden md:flex items-center justify-center p-3 rounded-xl bg-jet-surface/80 border border-cerulean/30 shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-md"
      >
        <Laptop className="w-6 h-6 text-cerulean" />
      </motion.div>

      {/* Floating Code Hash # symbol from Reference Photo */}
      <motion.div
        animate={{ y: [0, 16, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-44 left-[46%] pointer-events-none z-10 hidden md:block font-mono text-2xl font-bold text-rose/70 drop-shadow-[0_0_10px_#FF3B9D]"
      >
        #
      </motion.div>

      {/* Domain Numeric Indicator: 01 in cyber blue font */}
      <div className="absolute top-24 right-1/4 pointer-events-none z-10 hidden md:block font-mono text-3xl font-extrabold text-[#38BDF8]/40 tracking-widest select-none">
        01
      </div>

      {/* Large Curved Blue Planetary Sphere on Bottom Right from Reference Photo */}
      <div className="absolute -bottom-24 -right-24 sm:-right-16 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#0284c7] via-[#0369a1] to-[#0c4a6e] opacity-80 blur-[0.5px] pointer-events-none z-0 shadow-[-20px_-20px_80px_rgba(56,189,248,0.3)]" />

      {/* Space Rocket launching upwards from Reference Photo */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-28 right-8 sm:right-16 pointer-events-none z-10 flex flex-col items-center"
      >
        <div className="p-2.5 rounded-full bg-jet-surface/90 border border-rose/50 shadow-[0_0_20px_rgba(255,59,157,0.4)]">
          <Rocket className="w-6 h-6 text-rose -rotate-45" />
        </div>
        <div className="w-1 h-8 bg-gradient-to-b from-rose via-amber-400 to-transparent blur-[1px] animate-pulse" />
      </motion.div>

      {/* Target Reticle Crosshair on Far Right Edge from Reference Photo */}
      <div className="absolute top-28 right-4 sm:right-6 pointer-events-none z-10 hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-cerulean/60">
        <Crosshair className="w-6 h-6 text-cerulean animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      {/* 3. Three.js Interactive WebGL Scene */}
      <CommandCenter3D />

      {/* 4. Center Main Typographic Statement with High-Contrast Dark Scrim */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Dark Scrim Backdrop to guarantee 100% text legibility over 3D animations */}
        <div className="absolute inset-0 -top-8 max-w-3xl mx-auto h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(3,6,17,0.94)_0%,rgba(3,6,17,0.8)_55%,transparent_85%)] pointer-events-none -z-10" />

        {/* Exact Kicker: VISTAS ACM · IDEAS INTO IMPACT */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#030611]/95 border border-[#38BDF8]/40 shadow-hologram-blue backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
          <span className="font-mono text-xs md:text-sm text-[#38BDF8] font-bold tracking-[0.25em] uppercase">
            VISTAS ACM · IDEAS INTO IMPACT
          </span>
          <span className="text-chrome/30">|</span>
          <span className="font-mono text-[11px] text-[#FF3B9D] font-bold tracking-wider">
            MISSION CONTROL
          </span>
        </motion.div>

        {/* Master Architectural Giant Heading: VISTAS / ACM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-center leading-none select-none mb-4"
        >
          <span className="font-heading text-7xl sm:text-9xl md:text-[13rem] font-black tracking-tight text-white uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            VISTAS
          </span>
          <span className="font-heading text-6xl sm:text-8xl md:text-[11rem] font-black tracking-tight text-[#38BDF8] glow-blue uppercase -mt-4 sm:-mt-8 md:-mt-12 drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            ACM
          </span>
        </motion.div>

        {/* Core Chapter Motto - High-Contrast Solid Plate */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#030611]/95 border-2 border-[#FF3B9D] shadow-[0_0_25px_rgba(255,59,157,0.45)] mb-4 backdrop-blur-xl z-20"
        >
          <span className="font-mono text-xs md:text-sm text-[#FF3B9D] uppercase tracking-[0.25em] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            ENGINEERING THE FUTURE · INNOVATING TOGETHER
          </span>
        </motion.div>

        {/* Master Supporting Abstract - High-Contrast Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="p-6 sm:p-7 rounded-2xl bg-[#030611]/95 border border-[#38BDF8]/60 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.98)] max-w-2xl mx-auto z-20"
        >
          <p className="font-sans text-base sm:text-lg md:text-xl text-white leading-relaxed font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            Explore technology, build solutions, collaborate with innovators and shape the future through{' '}
            <strong className="text-[#38BDF8] font-black underline decoration-[#FF3B9D] underline-offset-4 glow-blue">VISTAS ACM</strong> — the premier computing innovation chapter at Vels Institute of Science, Technology and Advanced Studies.
          </p>
        </motion.div>

        {/* Action Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <button
            onClick={() => {
              soundEngine.playHologramActivate();
              onNavigate('domains');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="cyber-btn-blue px-7 py-3.5 rounded text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-hologram-blue"
          >
            <Compass className="w-4 h-4 text-rose" />
            <span>EXPLORE GALAXY [DOMAINS]</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onNavigate('contact');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="cyber-btn-rose px-7 py-3.5 rounded text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-hologram-rose"
          >
            <Terminal className="w-4 h-4" />
            <span>JOIN THE MISSION</span>
          </button>
        </motion.div>

        {/* Real-time Telemetry Stats Dock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-12 w-full max-w-3xl"
        >
          {[
            { label: 'ACM CHARTER', value: 'MAY 19, 2025', desc: 'Global Chapter ID' },
            { label: 'GALAXY DOMAINS', value: '08 DIVISIONS', desc: 'AI to Robotics' },
            { label: 'COMMUNITY', value: '250+ MEMBERS', desc: 'Active Innovators' },
            { label: 'BASE STATION', value: 'VISTAS CAMPUS', desc: 'Chennai, India' },
          ].map((stat, i) => (
            <div
              key={i}
              className="hud-card p-3 rounded-lg text-center border-cerulean/25 hover:border-cerulean/60 transition-colors"
            >
              <div className="font-mono text-[9px] text-cerulean tracking-widest uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-heading text-lg md:text-xl font-bold text-white tracking-wider">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] text-chrome/50 tracking-wider mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] text-chrome tracking-widest uppercase">
            SCROLL TO EXPLORE MISSION CONTROL
          </span>
          <ArrowDown className="w-4 h-4 text-cerulean animate-bounce" />
        </div>
      </div>
    </section>
  );
};
