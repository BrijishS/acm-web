import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { ProjectItem } from '../../types';
import { fetchLiveProjects } from '../../data/supabaseClient';
import { PROJECTS_DATA } from '../../data/chapterData';
import { Code, Terminal, Sparkles, Box, ArrowUpRight, Cpu } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    fetchLiveProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const categories = ['All', 'Web & App Development', 'Data & Cloud', 'Emerging Tech'];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-[#020408]">
      <div id="builds" className="absolute top-0 pointer-events-none" />
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(14,35,71,0.45)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
              <span>CHAPTER BUILDS // PAYLOADS</span>
              <span className="text-chrome/30">·</span>
              <span className="text-[#38BDF8] font-bold">SELECTED PROJECTS</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              MADE TO <span className="text-cerulean glow-blue">MATTER.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <p className="font-sans text-sm md:text-base text-white leading-relaxed font-semibold">
              Ideas become real things.
            </p>
            <p className="font-sans text-xs sm:text-sm text-chrome/80 leading-relaxed">
              A collection of experiments, useful tools and collaborative work shaped by curious minds at VISTAS ACM.
            </p>
          </div>
        </div>

        {/* Ideas deserve to be built. Build what's next banner */}
        <div className="hud-card p-6 sm:p-8 rounded-2xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-cerulean/10 border border-cerulean/40 text-cerulean flex-shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs text-rose tracking-widest uppercase font-bold block mb-0.5">
                INNOVATION IN ACTION
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                Ideas deserve to be built.
              </h3>
            </div>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-[#071329] border border-cerulean/40 font-mono text-xs font-bold text-cerulean tracking-wider uppercase">
            Build what's next.
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-cerulean/15">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#38BDF8] text-[#030611] font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                  : 'bg-[#071329] text-chrome hover:text-white border border-cerulean/20 hover:border-cerulean/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Showcase Cards (The 3 Payloads) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hud-card p-6 rounded-2xl border-cerulean/25 hover:border-cerulean/60 transition-all flex flex-col justify-between group bg-[#030611]/90 backdrop-blur-md shadow-hologram-blue"
            >
              <div>
                {/* Top Telemetry Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                  <span className="font-mono text-xs text-[#FF3B9D] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-cerulean uppercase px-2 py-0.5 rounded bg-[#071329] border border-cerulean/20">
                    STATUS: {project.status}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-3 group-hover:text-cerulean transition-colors">
                  {project.title}
                </h3>

                <p className="font-sans text-sm text-chrome/90 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Progress bar simulation for each payload */}
                <div className="w-full bg-[#071329] rounded-full h-1.5 mb-6 overflow-hidden border border-cerulean/20">
                  <div
                    className="bg-gradient-to-r from-cerulean to-rose h-1.5 rounded-full"
                    style={{ width: idx === 0 ? '92%' : idx === 1 ? '78%' : '60%' }}
                  />
                </div>
              </div>

              <div>
                {/* Metrics */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 py-3 mb-4 border-y border-cerulean/15 text-center">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="font-mono text-[9px] text-chrome/50 uppercase block">{m.label}</span>
                        <span className="font-mono text-[11px] text-white font-bold truncate block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-[#071329] border border-cerulean/20 text-[11px] font-mono text-chrome/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
