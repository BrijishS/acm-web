import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { CommandCenter3D } from '../3d/CommandCenter3D';
import { Terminal, ArrowDown, Compass, Calendar, Sparkles } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (sectionId: string) => void;
}

const TELEMETRY_PHRASES = [
  "INITIALISING MISSION CONTROL 2.0...",
  "CONNECTING ORBITAL TELEMETRY...",
  "5 GALAXY DOMAINS SYNCHRONIZED...",
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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-transparent">
      {/* Target anchor */}
      <div id="mission" className="absolute top-0 pointer-events-none" />

      {/* Subtle Atmospheric Vignette & Depth Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,123,255,0.06)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.015)_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />

      {/* Top Left HUD Corner Reticle & Telemetry */}
      <div className="absolute top-20 left-4 sm:left-8 z-20 flex items-start gap-2 text-cerulean pointer-events-none select-none">
        <div className="w-6 h-6 border-t-2 border-l-2 border-cerulean flex-shrink-0" />
        <div className="font-mono text-xs sm:text-sm text-cerulean tracking-widest uppercase animate-pulse">
          {TELEMETRY_PHRASES[telemetryIdx]}
        </div>
      </div>

      {/* Three.js Interactive 3D Cinematic AI Command Environment */}
      <CommandCenter3D />

      {/* Center Main Typographic Statement */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* High-Contrast Obsidian Scrim */}
        <div className="absolute inset-0 -top-12 -bottom-12 max-w-4xl mx-auto bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.96)_0%,rgba(5,5,5,0.85)_50%,transparent_90%)] pointer-events-none -z-10" />

        {/* Chapter Header Chip */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#050505]/95 border border-cerulean/40 shadow-hologram-blue backdrop-blur-md mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-cerulean animate-ping" />
          <span className="font-mono text-xs md:text-sm text-cerulean font-bold tracking-[0.2em] uppercase">
            ACM CHAPTER GROUP ID: {CHAPTER_INFO.groupId}
          </span>
          <span className="text-[#A5ADBA]/40">|</span>
          <span className="font-mono text-[11px] text-rose font-bold tracking-wider">
            AY {CHAPTER_INFO.academicYear}
          </span>
        </motion.div>

        {/* Association Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-xs sm:text-sm text-cerulean tracking-[0.3em] uppercase font-bold mb-2"
        >
          ASSOCIATION FOR COMPUTING MACHINERY
        </motion.div>

        {/* Main Heading: VISTAS ACM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-center leading-tight select-none mb-3 py-1"
        >
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase drop-shadow-[0_8px_35px_rgba(0,0,0,1)]">
            VISTAS <span className="text-cerulean glow-blue">ACM</span>
          </h1>
          <span className="font-heading text-lg sm:text-2xl md:text-3xl font-extrabold text-[#C0C0C0] tracking-[0.3em] uppercase mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Mission Control 2.0
          </span>
        </motion.div>

        {/* Tagline Badge: INNOVATE. CREATE. LEAD. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-4 z-20"
        >
          <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#050505]/95 border-2 border-rose shadow-[0_0_30px_rgba(255,46,136,0.5)] backdrop-blur-xl">
            <span className="font-heading text-lg sm:text-2xl font-black text-white uppercase tracking-[0.25em] drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {CHAPTER_INFO.tagline}
            </span>
          </div>
        </motion.div>

        {/* Supporting Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="p-6 sm:p-7 rounded-2xl bg-[#0B1018]/95 border border-cerulean/50 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.98)] max-w-3xl mx-auto z-20 text-center space-y-3"
        >
          <p className="font-sans text-base sm:text-lg text-white leading-relaxed font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            {CHAPTER_INFO.supportingMessage}
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed font-normal pt-2 border-t border-cerulean/20">
            {CHAPTER_INFO.intro} Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS).
          </p>
        </motion.div>

        {/* Action Triggers: Explore ACM & Explore Events */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-8 z-20"
        >
          {/* Explore ACM Button */}
          <button
            onClick={() => {
              soundEngine.playHologramActivate();
              onNavigate('about');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="cyber-btn-blue px-7 py-3.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-hologram-blue uppercase tracking-wider"
          >
            <Compass className="w-4 h-4 text-rose" />
            <span>Explore ACM</span>
          </button>

          {/* Explore Events Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onNavigate('events');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="hud-card px-7 py-3.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer border-cerulean/50 hover:border-cerulean text-white uppercase tracking-wider transition-colors"
          >
            <Calendar className="w-4 h-4 text-cerulean" />
            <span>Explore Events</span>
          </button>

          {/* Meet The Crew Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onNavigate('crew');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="hud-card px-6 py-3.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer border-white/20 hover:border-white text-[#C0C0C0] hover:text-white uppercase tracking-wider transition-colors"
          >
            <Sparkles className="w-4 h-4 text-rose" />
            <span>Our Crew</span>
          </button>

          {/* Join ACM Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onNavigate('join');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="cyber-btn-rose px-6 py-3.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-hologram-rose uppercase tracking-wider"
          >
            <Terminal className="w-4 h-4" />
            <span>Join ACM</span>
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
            { label: 'ACM GROUP ID', value: '199704', desc: 'Officially Chartered' },
            { label: 'ACADEMIC YEAR', value: '2026–2027', desc: 'Current Cadence' },
            { label: 'FACULTY ADVISOR', value: 'N. UDAYAKUMAR', desc: 'Asst. Professor, CSE' },
            { label: 'STATUS', value: 'GOOD STANDING', desc: 'Verified Active' },
          ].map((stat, i) => (
            <div
              key={i}
              className="hud-card p-3 rounded-xl text-center border-cerulean/25 hover:border-cerulean/60 transition-colors"
            >
              <div className="font-mono text-[9px] text-cerulean tracking-widest uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-heading text-lg md:text-xl font-bold text-white tracking-wider">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] text-[#A5ADBA] tracking-wider mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] text-[#A5ADBA] tracking-widest uppercase">
            SCROLL TO EXPLORE MISSION CONTROL
          </span>
          <ArrowDown className="w-4 h-4 text-cerulean animate-bounce" />
        </div>
      </div>
    </section>
  );
};
