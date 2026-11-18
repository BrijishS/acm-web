import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_TIMELINE } from '../../data/chapterData';
import { TimelineItem } from '../../types';
import {
  Calendar,
  GitCommit,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Bookmark,
  ChevronRight,
  Layers,
  Flag
} from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineItem>(CHAPTER_TIMELINE[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Foundation', 'Milestone', 'Initiative', 'Recognition', 'Activity'];

  const filteredTimeline = CHAPTER_TIMELINE.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleSelectMilestone = (item: TimelineItem) => {
    soundEngine.playClick();
    setSelectedMilestone(item);
  };

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-transparent overflow-hidden">
      {/* Animated Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] animate-grid-drift pointer-events-none" />

      {/* Sweeping Laser Scan Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cerulean/35 to-transparent pointer-events-none animate-laser-sweep" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <Clock className="w-4 h-4 text-rose" />
              <span>CHAPTER HISTORY // CHRONOLOGY</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-cerulean font-bold">VERIFIED MILESTONES</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              CHAPTER <span className="text-cerulean glow-blue">TIMELINE.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#C0C0C0] max-w-md leading-relaxed font-semibold">
            The journey of VISTAS ACM — from official charter and leadership induction to specialized domains and flagship hackathons.
          </p>
        </div>

        {/* Category Filters */}
        <div className="hud-card p-3 rounded-xl bg-[#0B1018]/90 border-cerulean/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cerulean text-white font-bold shadow-[0_0_10px_rgba(0,123,255,0.5)]'
                    : 'bg-[#050505] text-[#A5ADBA] hover:text-white border border-cerulean/20 hover:border-cerulean/40'
                }`}
              >
                {cat === 'all' ? 'All Milestones' : cat}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-[#A5ADBA]/70">
            {filteredTimeline.length} VERIFIED MILESTONES
          </span>
        </div>

        {/* Master Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline Track */}
          <div className="lg:col-span-7 relative space-y-6 before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-cerulean before:via-rose before:to-cerulean/30">
            {filteredTimeline.map((item, idx) => {
              const isSelected = item.id === selectedMilestone.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  onClick={() => handleSelectMilestone(item)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`relative pl-12 cursor-pointer group`}
                >
                  {/* Glowing Node on the Vertical Rail */}
                  <div
                    className={`absolute left-3.5 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'bg-rose border-white scale-125 shadow-[0_0_15px_#FF2E88]'
                        : 'bg-[#050505] border-cerulean group-hover:border-rose group-hover:scale-110'
                    }`}
                  />

                  {/* Card Body */}
                  <div
                    className={`hud-card p-5 sm:p-6 rounded-2xl transition-all ${
                      isSelected
                        ? 'border-cerulean bg-[#0B1018] shadow-[0_0_25px_rgba(0,123,255,0.35)]'
                        : 'border-cerulean/20 bg-[#0B1018]/70 hover:border-cerulean/50 hover:bg-[#0B1018]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-cerulean/15">
                      <span className="font-mono text-xs text-rose font-bold tracking-widest uppercase">
                        {item.dateStr}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded bg-cerulean/15 border border-cerulean/30 font-mono text-[10px] text-cerulean uppercase font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wide group-hover:text-cerulean transition-colors mb-1">
                      {item.title}
                    </h3>

                    <div className="font-mono text-xs text-cerulean mb-3">
                      {item.subtitle}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Holographic Milestone Inspector Deck */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="hud-card p-6 sm:p-8 rounded-3xl border-cerulean/40 bg-[#0B1018]/95 backdrop-blur-xl shadow-hologram-blue space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-cerulean/20">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-rose uppercase tracking-widest font-bold">
                  <Bookmark className="w-4 h-4 text-rose" />
                  <span>SELECTED MILESTONE</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#050505] border border-cerulean/30 font-mono text-xs text-cerulean">
                  {selectedMilestone.year}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-cerulean uppercase tracking-widest block mb-1">
                  OFFICIAL CADENCE: {selectedMilestone.dateStr}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-wider leading-snug">
                  {selectedMilestone.title}
                </h3>
                <div className="font-mono text-xs text-rose mt-1">
                  {selectedMilestone.subtitle}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#050505] border border-cerulean/20">
                <span className="font-mono text-[10px] text-[#A5ADBA] uppercase tracking-widest block mb-1 font-bold">
                  DOCUMENTED ARCHIVE RECORD:
                </span>
                <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed">
                  {selectedMilestone.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#050505] border border-cerulean/20 text-center">
                  <span className="text-[10px] text-[#A5ADBA] block">CATEGORY</span>
                  <span className="text-white font-bold">{selectedMilestone.category}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#050505] border border-cerulean/20 text-center">
                  <span className="text-[10px] text-[#A5ADBA] block">VERIFICATION</span>
                  <span className="text-emerald-400 font-bold">DOCUMENTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
