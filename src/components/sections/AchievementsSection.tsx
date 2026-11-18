import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_ACHIEVEMENTS, MEMBERSHIP_DATA, CHAPTER_INFO } from '../../data/chapterData';
import {
  ShieldCheck,
  Users,
  Layers,
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Trophy,
  Activity,
  FileCheck
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-[#050505]">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <Trophy className="w-4 h-4 text-rose" />
              <span>CHAPTER STANDING // VERIFIED RECORD</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-cerulean font-bold">ACM RECOGNITION</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              OFFICIAL <span className="text-cerulean glow-blue">ACHIEVEMENTS.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#C0C0C0] max-w-md leading-relaxed font-semibold">
            Chartered excellence and institutional standing. Documented and confirmed by the Association for Computing Machinery.
          </p>
        </div>

        {/* 4 Core Achievement Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHAPTER_ACHIEVEMENTS.map((ach) => {
            return (
              <motion.div
                key={ach.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="hud-card p-6 sm:p-7 rounded-2xl border-cerulean/30 hover:border-cerulean/70 flex flex-col justify-between group bg-[#0B1018]/90 backdrop-blur-md shadow-hologram-blue relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>

                    <div className="p-2 rounded-lg bg-cerulean/10 border border-cerulean/30 text-cerulean">
                      {ach.iconName === 'ShieldCheck' && <ShieldCheck className="w-4 h-4" />}
                      {ach.iconName === 'Users' && <Users className="w-4 h-4" />}
                      {ach.iconName === 'Layers' && <Layers className="w-4 h-4" />}
                      {ach.iconName === 'Award' && <Award className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2 group-hover:text-cerulean transition-colors">
                    {ach.metric}
                  </div>

                  <h3 className="font-mono text-xs text-rose uppercase tracking-widest font-bold mb-3">
                    {ach.label}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
                    {ach.detail}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-cerulean/15 font-mono text-[10px] text-cerulean tracking-widest uppercase">
                  VISTAS ACM · AY 2026–2027
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Good Standing & Institutional Governance Highlight Banner */}
        <div className="hud-card p-8 rounded-3xl border-cerulean/40 bg-[#0B1018]/95 backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase font-bold">
                <FileCheck className="w-4 h-4 text-rose" />
                <span>OFFICIAL ACM CHAPTER PROGRAM VERIFICATION</span>
              </div>

              <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-wide">
                Chartered Chapter in Good Standing
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#C0C0C0] leading-relaxed">
                {MEMBERSHIP_DATA.status} {MEMBERSHIP_DATA.documentation}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505] border border-cerulean/30 text-white">
                  <span className="text-cerulean font-bold">INSTITUTION:</span>
                  <span>VELS UNIVERSITY (VISTAS)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050505] border border-cerulean/30 text-white">
                  <span className="text-rose font-bold">DEPARTMENT:</span>
                  <span>COMPUTER SCIENCE & ENG</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="hud-card p-6 rounded-2xl border-cerulean/50 bg-[#050505] text-center w-full max-w-sm space-y-3 shadow-hologram-blue">
                <div className="w-16 h-16 rounded-full border-2 border-cerulean p-1 mx-auto flex items-center justify-center bg-[#0B1018]">
                  <img
                    src={CHAPTER_INFO.logoUrl}
                    alt="VISTAS ACM Insignia"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                  GROUP ID: {CHAPTER_INFO.groupId}
                </div>
                <div className="font-mono text-xs text-cerulean">
                  ACM STUDENT CHAPTER
                </div>
                <div className="pt-2 border-t border-cerulean/20 text-[11px] font-mono text-[#A5ADBA]">
                  Active Cadence · Academic Year 2026–2027
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
