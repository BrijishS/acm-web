import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { Shield, Lock, Radio, UserCheck, Users, Sparkles, Bell } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>06 // CREW COMMAND CONSOLE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              CREW <span className="text-cerulean glow-blue">ROSTER.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            The student architects, domain leads, and executive committee steering chapter innovation at VISTAS ACM.
          </p>
        </div>

        {/* Master Futuristic Holographic Placeholder Interface */}
        <div className="hud-card p-8 md:p-14 rounded-2xl border-cerulean/40 shadow-hologram-blue text-center relative overflow-hidden">
          {/* Animated Background Radar Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0,transparent_70%)] pointer-events-none" />

          {/* Central Rotating Biometric Lock Aperture */}
          <div className="relative mx-auto mb-8 w-28 h-28 md:w-36 md:h-36 rounded-full border border-cerulean/40 flex items-center justify-center animate-rotate-slow">
            <div className="w-20 h-20 md:w-26 md:h-26 rounded-full border border-dashed border-rose/50 flex items-center justify-center animate-rotate-reverse">
              <div className="w-12 h-12 rounded-full bg-cerulean/15 flex items-center justify-center text-cerulean">
                <Users className="w-6 h-6 text-cerulean" />
              </div>
            </div>
          </div>

          {/* Exact Required Placeholder Headline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose/15 border border-rose/30 font-mono text-xs text-rose font-bold tracking-widest uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>TRANSMISSION ENCRYPTED</span>
          </div>

          <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider mb-4">
            TEAM PROFILES // <span className="text-cerulean glow-blue">COMING SOON</span>
          </h3>

          {/* Exact Required Supporting Text */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-chrome max-w-2xl mx-auto leading-relaxed mb-10">
            An innovation-driven community. Meet the people behind the mission soon.
          </p>

          {/* Holographic Crew Console Wireframe Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {['EXECUTIVE LEAD', 'AI & SYSTEMS LEAD', 'HARDWARE & IOT LEAD', 'CREATIVE DIRECTOR'].map((role, i) => (
              <div
                key={i}
                onMouseEnter={() => soundEngine.playHover()}
                className="bg-jet-surface/80 border border-cerulean/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2 group hover:border-cerulean/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-jet border border-dashed border-chrome/30 flex items-center justify-center text-chrome/40 group-hover:text-cerulean transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] text-chrome/60 tracking-wider text-center uppercase">
                  {role}
                </span>
                <span className="font-mono text-[9px] text-cerulean/60 tracking-widest">
                  [REDACTED // 0{i + 1}]
                </span>
              </div>
            ))}
          </div>

          {/* Action Link to Official Instagram for Updates */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CHAPTER_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="cyber-btn-blue px-6 py-3 rounded text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-rose" />
              <span>FOLLOW @VISTAS_ACM FOR TEAM ANNOUNCEMENT</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
