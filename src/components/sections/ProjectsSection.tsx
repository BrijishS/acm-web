import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { ProjectItem } from '../../types';
import { fetchLiveProjects } from '../../data/supabaseClient';
import { Code, Github, ExternalLink, Cpu, Terminal, Sparkles, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeTag, setActiveTag] = useState<string>('All');

  useEffect(() => {
    fetchLiveProjects().then(setProjects);
  }, []);

  const tags = ['All', 'Artificial Intelligence', 'IoT & Hardware', 'Speech & Audio AI', 'Cybersecurity'];

  const filteredProjects = projects.filter((p) => {
    if (activeTag === 'All') return true;
    return p.category.toLowerCase().includes(activeTag.toLowerCase());
  });

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15 bg-jet/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
              <span>05 // INNOVATION LAB SHOWCASE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              INNOVATION <span className="text-cerulean glow-blue">PROTOTYPES.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            Cutting-edge student engineering prototypes engineered inside VISTAS ACM research cells — from edge computer vision to LoRa wireless telemetry.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                soundEngine.playClick();
                setActiveTag(tag);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTag === tag
                  ? 'bg-rose text-white font-bold shadow-[0_0_12px_rgba(255,59,157,0.5)]'
                  : 'bg-jet-surface text-chrome hover:text-white border border-cerulean/20 hover:border-cerulean/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hud-card p-6 rounded-xl border-cerulean/25 hover:border-cerulean/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Telemetry Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                  <span className="font-mono text-xs text-rose font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-chrome/60 uppercase px-2 py-0.5 rounded bg-jet border border-cerulean/20">
                    STATUS: {project.status}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-3">
                  {project.title}
                </h3>

                <p className="font-sans text-sm text-chrome/80 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Performance Metrics if available */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-lg bg-jet border border-cerulean/15">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="font-mono text-[9px] text-chrome/50 uppercase block">
                          {m.label}
                        </span>
                        <span className="font-mono text-xs text-cerulean font-bold">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Technology Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-jet border border-cerulean/20 text-[10px] font-mono text-chrome"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-cerulean/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-chrome hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source ↗</span>
                      </a>
                    )}
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        className="flex items-center gap-1.5 text-xs font-mono text-cerulean hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo ↗</span>
                      </a>
                    )}
                  </div>

                  <span className="font-mono text-[10px] text-chrome/40 tracking-wider">
                    VISTAS INNOVATION LAB
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
