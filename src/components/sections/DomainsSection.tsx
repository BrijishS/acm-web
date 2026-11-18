import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { DOMAINS_DATA, CHAPTER_ACTIVITIES } from '../../data/chapterData';
import { Domain } from '../../types';
import { Cpu, X, ArrowUpRight, Sparkles, Layers, ShieldCheck, Orbit, CheckCircle2 } from 'lucide-react';

export const DomainsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const openDomainModal = (domain: Domain) => {
    soundEngine.playHologramActivate();
    setSelectedDomain(domain);
  };

  const closeModal = () => {
    soundEngine.playClick();
    setSelectedDomain(null);
  };

  return (
    <section id="domains" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-transparent overflow-hidden">
      <div id="galaxy" className="absolute top-0 pointer-events-none" />
      {/* Animated Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(14,35,71,0.35)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:44px_44px] animate-grid-drift pointer-events-none" />

      {/* Futuristic Orbit Radar Rings Background Animation */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cerulean/10 pointer-events-none animate-spin" style={{ animationDuration: '45s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cerulean rounded-full shadow-[0_0_12px_#38BDF8]" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-dashed border-rose/10 pointer-events-none animate-spin" style={{ animationDuration: '65s', animationDirection: 'reverse' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-rose rounded-full shadow-[0_0_10px_#FF3B9D]" />
      </div>

      {/* Sweeping Laser Scan Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cerulean/40 to-transparent pointer-events-none animate-laser-sweep" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        {/* =========================================================
            SECTION: TECHNICAL DOMAINS
        ========================================================= */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
                <Orbit className="w-4 h-4 text-rose animate-spin" />
                <span>GALAXY // 05 TECHNICAL DOMAINS</span>
                <span className="text-chrome/30">·</span>
                <span className="text-[#FF3B9D] font-bold">VISTAS ACM</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
                TECHNICAL <span className="text-cerulean glow-blue">DOMAINS.</span>
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
              Explore our 5 technical divisions shaping active computing curiosity, engineering practice, and collaborative projects at VISTAS ACM.
            </p>
          </div>

          {/* 5 Holographic Domain Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS_DATA.map((domain) => {
              const isRose = domain.hologramColor === 'rose';
              return (
                <motion.div
                  key={domain.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => openDomainModal(domain)}
                  className={`hud-card p-6 sm:p-7 rounded-2xl cursor-pointer flex flex-col justify-between group bg-[#030611]/90 backdrop-blur-md ${
                    isRose ? 'border-rose/25 hover:border-rose/70 shadow-hologram-rose' : 'border-cerulean/25 hover:border-cerulean/70 shadow-hologram-blue'
                  }`}
                >
                  <div>
                    {/* Top Bar: Code + Symbol */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                      <span className="font-mono text-xs text-chrome/50 tracking-widest uppercase">
                        {domain.code}
                      </span>
                      <span className="font-mono text-xl text-cerulean group-hover:text-rose transition-colors">
                        {domain.symbol}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-rose tracking-wider uppercase font-semibold block mb-1">
                      {domain.category}
                    </span>

                    <h3 className="font-heading text-2xl font-bold text-white tracking-wider uppercase mb-2 group-hover:text-cerulean transition-colors leading-tight">
                      {domain.title}
                    </h3>

                    <p className="font-sans text-sm text-chrome/90 leading-relaxed mb-5">
                      {domain.description}
                    </p>
                  </div>

                  <div>
                    {/* Technologies Sub-Tags */}
                    <div className="space-y-2 mb-5">
                      <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase font-semibold block">
                        CORE TECHNOLOGIES:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded bg-[#071329] border border-cerulean/20 text-[11px] font-mono text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link Footer */}
                    <div className="pt-3 border-t border-cerulean/15 flex items-center justify-between text-xs font-mono text-cerulean group-hover:text-rose transition-colors">
                      <span className="tracking-wider">VIEW DOMAIN TELEMETRY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            SECTION: CHAPTER ACTIVITIES – WHAT WE DO
        ========================================================= */}
        <div className="hud-card p-6 sm:p-10 md:p-12 rounded-3xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-xl">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-xs text-[#FF3B9D] tracking-widest uppercase font-bold block mb-2">
              CHAPTER ACTIVITIES // 08 OPERATIONAL DIVISIONS
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">
              WHAT WE <span className="text-cerulean glow-blue">DO.</span>
            </h3>
            <p className="font-sans text-sm sm:text-base text-chrome/90 leading-relaxed">
              Activities that let students apply academic knowledge, collaborate with peers, meet professionals and build career-relevant competencies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHAPTER_ACTIVITIES.map((act, i) => (
              <div
                key={act.id}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-5 rounded-xl bg-[#071329]/80 border border-cerulean/20 hover:border-cerulean/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase bg-cerulean/10 px-2 py-0.5 rounded border border-cerulean/30">
                      0{i + 1}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-2">
                    {act.title}
                  </h4>
                  <p className="font-sans text-xs text-chrome/80 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: In-Depth Holographic Domain Diagnostics */}
        <AnimatePresence>
          {selectedDomain && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl hud-card rounded-2xl overflow-hidden border-cerulean shadow-2xl p-6 md:p-8 bg-[#030611]"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-cerulean/20 mb-6">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase mb-1">
                      <span>{selectedDomain.code}</span>
                      <span>//</span>
                      <span>{selectedDomain.category}</span>
                    </div>
                    <h3 className="font-heading text-3xl font-extrabold text-white uppercase tracking-wider">
                      {selectedDomain.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-1.5 rounded-lg border border-chrome/30 hover:border-rose text-chrome hover:text-rose transition-colors cursor-pointer"
                    aria-label="Close Domain Telemetry"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Details */}
                <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed mb-6">
                  {selectedDomain.description}
                </p>

                {/* Sub-Technologies */}
                <div className="mb-6">
                  <span className="font-mono text-xs text-cerulean tracking-widest uppercase block mb-3 font-semibold">
                    SUB-TECHNOLOGIES & TOOLS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDomain.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#071329] border border-cerulean/30 text-xs font-mono text-cerulean font-bold"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activities in this Domain */}
                <div className="mb-6">
                  <span className="font-mono text-xs text-rose tracking-widest uppercase block mb-3 font-semibold">
                    CHAPTER DOMAIN ACTIVITIES
                  </span>
                  <div className="space-y-2">
                    {selectedDomain.activities.map((act, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#071329]/80 border border-cerulean/20 flex items-center gap-2.5 font-sans text-xs text-white/90"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cerulean flex-shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Computational Specs */}
                <div className="mb-8">
                  <span className="font-mono text-xs text-chrome/60 tracking-widest uppercase block mb-3 font-semibold">
                    SPECIFICATIONS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedDomain.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="bg-[#071329] p-3 rounded-lg border border-cerulean/20">
                        <span className="font-mono text-[9px] text-chrome/50 tracking-wider uppercase block">
                          {spec.label}
                        </span>
                        <span className="font-mono text-xs text-white font-bold tracking-wider truncate block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-full cyber-btn-blue py-3 rounded-lg font-mono text-xs font-bold tracking-wider uppercase cursor-pointer"
                >
                  DISMISS TELEMETRY
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
