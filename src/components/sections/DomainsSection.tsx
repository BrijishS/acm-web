import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { DOMAINS_DATA } from '../../data/chapterData';
import { Domain } from '../../types';
import { Cpu, X, Terminal, ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

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
    <section id="domains" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15 bg-jet/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
              <span>03 // TECHNOLOGY DIVISIONS</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              HOLOGRAPHIC <span className="text-cerulean glow-blue">DOMAINS.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            Specialized engineering cells exploring the outer boundaries of computing science, intelligent systems, cybernetics, and physical hardware.
          </p>
        </div>

        {/* 8 Holographic Domain Division Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOMAINS_DATA.map((domain, index) => {
            const isRose = domain.hologramColor === 'rose';
            return (
              <motion.div
                key={domain.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => openDomainModal(domain)}
                className={`hud-card p-5 rounded-xl cursor-pointer flex flex-col justify-between group ${
                  isRose ? 'border-rose/25 hover:border-rose/70' : 'border-cerulean/25 hover:border-cerulean/70'
                }`}
              >
                <div>
                  {/* Top Bar: Code + Symbol */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-cerulean/15">
                    <span className="font-mono text-[10px] text-chrome/50 tracking-widest uppercase">
                      {domain.code}
                    </span>
                    <span className="font-mono text-base text-cerulean group-hover:text-rose transition-colors">
                      {domain.symbol}
                    </span>
                  </div>

                  <span className="font-mono text-[9px] text-rose tracking-wider uppercase font-semibold block mb-1">
                    {domain.category}
                  </span>

                  <h3 className="font-heading text-xl font-bold text-white tracking-wider uppercase mb-2 group-hover:text-cerulean transition-colors leading-tight">
                    {domain.title}
                  </h3>

                  <p className="font-sans text-xs text-chrome/80 leading-relaxed mb-4 line-clamp-3">
                    {domain.description}
                  </p>
                </div>

                <div>
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {domain.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-jet border border-cerulean/20 text-[10px] font-mono text-chrome/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-3 border-t border-cerulean/15 flex items-center justify-between text-xs font-mono text-cerulean group-hover:text-rose transition-colors">
                    <span className="tracking-wider">ACCESS TELEMETRY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal: In-Depth Holographic Domain Diagnostics */}
        <AnimatePresence>
          {selectedDomain && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jet/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl hud-card rounded-2xl overflow-hidden border-cerulean shadow-2xl p-6 md:p-8"
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
                <p className="font-sans text-sm md:text-base text-chrome leading-relaxed mb-6">
                  {selectedDomain.description}
                </p>

                {/* Hardware & Computational Specs */}
                <div className="mb-6">
                  <span className="font-mono text-xs text-cerulean tracking-widest uppercase block mb-3 font-semibold">
                    DOMAIN TELEMETRY SPECIFICATIONS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedDomain.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="bg-jet p-3 rounded-lg border border-cerulean/20">
                        <span className="font-mono text-[9px] text-chrome/50 tracking-wider uppercase block">
                          {spec.label}
                        </span>
                        <span className="font-mono text-xs text-white font-bold tracking-wider">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Associated Tags */}
                <div className="mb-8">
                  <span className="font-mono text-xs text-chrome-muted tracking-widest uppercase block mb-2 font-medium">
                    EXPLORED TECHNOLOGIES & TOOLS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDomain.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-jet border border-cerulean/30 text-xs font-mono text-cerulean font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA to Join Chapter / Inquire */}
                <div className="pt-4 border-t border-cerulean/20 flex items-center justify-between">
                  <span className="font-mono text-xs text-chrome/50">
                    STATUS: DIVISION OPEN FOR STUDENT COLLABORATION
                  </span>
                  <button
                    onClick={closeModal}
                    className="cyber-btn-blue px-5 py-2 rounded text-xs font-bold"
                  >
                    CLOSE TELEMETRY
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
