import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { ProjectItem } from '../../types';
import { fetchLiveProjects } from '../../data/supabaseClient';
import { PROJECTS_DATA } from '../../data/chapterData';
import {
  Code,
  Terminal,
  Sparkles,
  Box,
  ArrowUpRight,
  Cpu,
  Search,
  X,
  Github,
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailProject, setDetailProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    fetchLiveProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const categories = ['All', 'Web & App Development', 'Data & Cloud', 'Emerging Tech'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-[#050505]">
      {/* Anchor */}
      <div id="builds" className="absolute top-0 pointer-events-none" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
              <span>CHAPTER BUILDS // STUDENT PAYLOADS</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-cerulean font-bold">INNOVATION SHOWCASE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              MADE TO <span className="text-cerulean glow-blue">MATTER.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <p className="font-sans text-sm md:text-base text-white leading-relaxed font-semibold">
              Ideas become real working software and hardware solutions.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
              A curated showcase of student experiments, useful campus tools, and collaborative systems engineered at VISTAS ACM.
            </p>
          </div>
        </div>

        {/* Innovation in Action Banner */}
        <div className="hud-card p-6 sm:p-8 rounded-2xl border-cerulean/30 bg-[#0B1018]/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-cerulean/15 border border-cerulean/40 text-cerulean flex-shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs text-rose tracking-widest uppercase font-bold block mb-0.5">
                STUDENT ENGINEERING INCUBATOR
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                Ideas deserve to be built.
              </h3>
            </div>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-[#050505] border border-cerulean/40 font-mono text-xs font-bold text-cerulean tracking-wider uppercase">
            Build what's next.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="hud-card p-4 rounded-xl bg-[#0B1018]/90 border-cerulean/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-cerulean absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-cerulean/30 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5ADBA] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
                    ? 'bg-cerulean text-white font-bold shadow-[0_0_12px_rgba(0,123,255,0.5)]'
                    : 'bg-[#050505] text-[#A5ADBA] hover:text-white border border-cerulean/20 hover:border-cerulean/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => {
                soundEngine.playHologramActivate();
                setDetailProject(project);
              }}
              className="hud-card p-6 rounded-2xl border-cerulean/25 hover:border-cerulean/60 transition-all flex flex-col justify-between group bg-[#0B1018]/90 backdrop-blur-md shadow-hologram-blue cursor-pointer"
            >
              <div>
                {/* Top Telemetry Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                  <span className="font-mono text-xs text-rose font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-cerulean uppercase px-2 py-0.5 rounded bg-[#050505] border border-cerulean/20">
                    STATUS: {project.status}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-3 group-hover:text-cerulean transition-colors">
                  {project.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Progress bar simulation for each payload */}
                <div className="w-full bg-[#050505] rounded-full h-1.5 mb-6 overflow-hidden border border-cerulean/20">
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
                        <span className="font-mono text-[9px] text-[#A5ADBA]/60 uppercase block">{m.label}</span>
                        <span className="font-mono text-[11px] text-white font-bold truncate block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-[#050505] border border-cerulean/20 text-[11px] font-mono text-[#A5ADBA]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2 rounded-lg bg-cerulean/10 hover:bg-cerulean/20 border border-cerulean/40 text-cerulean font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors">
                  <span>INSPECT PAYLOAD</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================
          PROJECT DETAIL MODAL
      ========================================================= */}
      <AnimatePresence>
        {detailProject && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-[#050505] border border-cerulean/40 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
            >
              <button
                onClick={() => setDetailProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-cerulean/30 hover:border-white text-[#A5ADBA] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="px-2.5 py-0.5 rounded bg-rose/15 border border-rose/40 text-rose font-mono text-xs font-bold uppercase tracking-wider block w-fit mb-2">
                  {detailProject.category}
                </span>
                <h3 className="font-heading text-3xl font-black text-white uppercase tracking-wider">
                  {detailProject.title}
                </h3>
                <span className="font-mono text-xs text-cerulean mt-1 block">
                  STATUS: {detailProject.status} · VISTAS ACM PAYLOAD
                </span>
              </div>

              <p className="font-sans text-sm text-[#A5ADBA] leading-relaxed">
                {detailProject.description}
              </p>

              {/* Technologies */}
              <div>
                <span className="font-mono text-[10px] text-cerulean uppercase tracking-widest block mb-2 font-bold">
                  TECHNOLOGY STACK & INTEGRATIONS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {detailProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-[#0B1018] border border-cerulean/30 font-mono text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {detailProject.metrics && (
                <div className="grid grid-cols-3 gap-2 p-4 rounded-xl bg-[#0B1018] border border-cerulean/20 text-center font-mono">
                  {detailProject.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-[10px] text-[#A5ADBA] uppercase block">{m.label}</span>
                      <span className="text-xs sm:text-sm text-white font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={detailProject.project_url || "https://github.com/BrijishS"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-cerulean hover:bg-cerulean/80 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-hologram-blue"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>DEMO / REPOSITORY ↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
