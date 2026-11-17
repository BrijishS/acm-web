import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { CommandCenter3D } from '../3d/CommandCenter3D';
import { Terminal, Shield, ArrowDown, Sparkles, Cpu, Layers } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden">
      {/* 3D Interactive WebGL Headquarters Environment */}
      <CommandCenter3D />

      {/* Cybernetic HUD Overlay Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Chapter Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-jet-surface/80 border border-cerulean/40 shadow-hologram-blue backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cerulean animate-ping" />
          <span className="font-mono text-[11px] text-cerulean tracking-widest uppercase font-medium">
            OFFICIAL ACM STUDENT CHAPTER · CHARTERED 2025
          </span>
          <span className="text-chrome/40">|</span>
          <span className="font-mono text-[11px] text-rose font-semibold tracking-wider">
            VISTAS CHENNAI
          </span>
        </motion.div>

        {/* Primary Command Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-white uppercase leading-[0.92] max-w-4xl"
        >
          ENGINEERING THE <span className="text-cerulean glow-blue">FUTURE.</span>
          <br />
          <span className="bg-gradient-to-r from-white via-chrome to-rose bg-clip-text text-transparent">
            INNOVATING TOGETHER.
          </span>
        </motion.h1>

        {/* Master Supporting Abstract */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans text-base sm:text-lg md:text-xl text-chrome max-w-2xl mt-6 leading-relaxed font-normal"
        >
          Explore technology, build solutions, collaborate with innovators and shape the future through{' '}
          <strong className="text-white font-semibold">VISTAS ACM</strong> — the premier computing innovation chapter at Vels Institute of Science, Technology and Advanced Studies.
        </motion.p>

        {/* Dual Command Action Triggers */}
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
            <Cpu className="w-4 h-4 text-rose" />
            <span>EXPLORE CHAPTER DOMAINS</span>
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
            <span>JOIN THE COMMUNITY</span>
          </button>
        </motion.div>

        {/* Telemetry Stats Dock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-14 w-full max-w-3xl"
        >
          {[
            { label: 'ACM CHARTER', value: 'MAY 19, 2025', desc: 'Global Affiliation' },
            { label: 'TECH DIVISIONS', value: '08 DOMAINS', desc: 'AI to Robotics' },
            { label: 'COMMUNITY', value: '250+ MEMBERS', desc: 'Curious Minds' },
            { label: 'HEADQUARTERS', value: 'VISTAS CAMPUS', desc: 'Chennai, India' },
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
        <div className="mt-12 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] text-chrome tracking-widest uppercase">
            SCROLL TO ENGAGE
          </span>
          <ArrowDown className="w-4 h-4 text-cerulean animate-bounce" />
        </div>
      </div>
    </section>
  );
};
