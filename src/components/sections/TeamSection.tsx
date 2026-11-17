import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { ACTUAL_TEAM_MEMBERS, TeamMember } from '../../data/teamData';
import { fetchLiveTeam } from '../../data/supabaseClient';
import { CHAPTER_INFO } from '../../data/chapterData';
import {
  Shield,
  Linkedin,
  Github,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Radio,
  Scan,
  Sparkles,
  Grid,
  Disc,
  ExternalLink,
  Award,
  CheckCircle2
} from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(ACTUAL_TEAM_MEMBERS);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'scanner' | 'grid'>('scanner');
  const [filterDomain, setFilterDomain] = useState<string>('ALL');

  // Fetch live team members from Supabase, fallback to ACTUAL_TEAM_MEMBERS
  useEffect(() => {
    let isMounted = true;
    fetchLiveTeam()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          // Sort by display_order
          const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
          setMembers(sorted);
        }
      })
      .catch((err) => {
        console.warn("Using offline curated team records:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeMember = members[activeIdx] || members[0];

  const handleSelectMember = (idx: number) => {
    soundEngine.playClick();
    setActiveIdx(idx);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : members.length - 1));
  };

  const handleNext = () => {
    soundEngine.playClick();
    setActiveIdx((prev) => (prev < members.length - 1 ? prev + 1 : 0));
  };

  // Domain filters
  const domains = ['ALL', 'EXECUTIVE COUNCIL', 'CYBER SECURITY', 'RESEARCH & INNOVATION', 'CORPORATE RELATIONS', 'TECHNICAL & DEVELOPMENT', 'MEDIA & CREATIVE'];
  const filteredMembers = filterDomain === 'ALL'
    ? members
    : members.filter((m) => m.domain.toUpperCase() === filterDomain.toUpperCase());

  return (
    <section id="crew" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-[#020408] overflow-hidden">
      {/* Background blueprint coordinate grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(14,35,71,0.5)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#38BDF8] tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-ping" />
              <span>07 // CREW COMMAND CONSOLE</span>
              <span className="text-[#FF3B9D] font-bold">· 10 ACTIVE OPERATIVES</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              CREW <span className="text-[#38BDF8] glow-blue">ROSTER.</span>
            </h2>
          </div>

          {/* View Mode Toggle: Scanner Mode vs Full Grid Mode */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 rounded-xl bg-[#071329] border border-cerulean/30 shadow-hologram-blue">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('scanner');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  viewMode === 'scanner'
                    ? 'bg-[#38BDF8] text-[#030611] shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>CIRCULAR SCANNER</span>
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#38BDF8] text-[#030611] shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>ALL OPERATIVES</span>
              </button>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            VIEW 1: CIRCULAR HOLOGRAPHIC SCANNER (Master Prompt Section 7)
            ------------------------------------------------------------- */}
        {viewMode === 'scanner' && (
          <div className="space-y-10">
            {/* Main Holographic Scanner Station */}
            <div className="hud-card p-6 sm:p-10 md:p-12 rounded-3xl border-cerulean/40 shadow-hologram-blue relative overflow-hidden bg-[#030611]/90 backdrop-blur-xl">
              {/* Radar Grid Backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.12)_0,transparent_65%)] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left (Col 1-5): Large Circular Holographic Scanner */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  {/* Outer Rings & Radar Sweep Container */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                    {/* Ring 1: Outer Calibrated Degree Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-cerulean/30 animate-spin" style={{ animationDuration: '45s' }}>
                      <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cerulean font-bold">000°</span>
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cerulean font-bold">180°</span>
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-cerulean font-bold">270°</span>
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-cerulean font-bold">090°</span>
                    </div>

                    {/* Ring 2: Counter-rotating Dashed Ring with Rose Nodes */}
                    <div
                      className="absolute inset-4 rounded-full border border-dashed border-[#FF3B9D]/40 animate-spin"
                      style={{ animationDuration: '28s', animationDirection: 'reverse' }}
                    />

                    {/* Ring 3: Concentric Thin Cyan Reticle */}
                    <div className="absolute inset-8 rounded-full border border-cerulean/50" />

                    {/* Radar Sweep Effect: Rotating Conic Beam */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none animate-spin"
                      style={{
                        animationDuration: '6s',
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(56,189,248,0.25) 360deg)'
                      }}
                    />

                    {/* Central Holographic Avatar Core */}
                    <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#38BDF8] shadow-[0_0_35px_rgba(56,189,248,0.5)] bg-[#071329] z-10 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeMember.id}
                          src={activeMember.image_url}
                          alt={activeMember.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.35 }}
                          className="w-full h-full object-cover select-none"
                        />
                      </AnimatePresence>

                      {/* Biometric-Style Vertical Scanning Line */}
                      <motion.div
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF3B9D] to-transparent shadow-[0_0_15px_#FF3B9D] pointer-events-none z-20"
                      />

                      {/* HUD Scan Reticle Overlay */}
                      <div className="absolute inset-2 border border-cerulean/20 rounded-full pointer-events-none" />
                      <div className="absolute top-2 left-2 text-[9px] font-mono text-[#38BDF8] bg-black/60 px-1.5 py-0.5 rounded">
                        SCAN // 0{activeIdx + 1}
                      </div>
                      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#FF3B9D] bg-black/60 px-1.5 py-0.5 rounded">
                        BIO-VERIFIED
                      </div>
                    </div>
                  </div>

                  {/* Scanner Status Readout */}
                  <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-3 py-1 rounded-full">
                    <Scan className="w-3.5 h-3.5 animate-pulse text-[#FF3B9D]" />
                    <span>BIOMETRIC LOCK: ACTIVE // CLEARANCE: LEVEL 5</span>
                  </div>
                </div>

                {/* Right (Col 6-12): Holographic ID Card Display */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMember.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Top Badges & Designation */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded-md bg-[#FF3B9D]/15 border border-[#FF3B9D]/50 text-[#FF3B9D] font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,59,157,0.3)]">
                          <Shield className="w-3.5 h-3.5" />
                          <span>{activeMember.designation}</span>
                        </span>

                        <span className="px-3 py-1 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/40 text-[#38BDF8] font-mono text-xs font-bold tracking-wider uppercase">
                          {activeMember.domain}
                        </span>

                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 font-mono text-xs flex items-center gap-1 ml-auto">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>ACM VERIFIED</span>
                        </span>
                      </div>

                      {/* Operative Full Name */}
                      <div>
                        <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                          {activeMember.name}
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#38BDF8] via-[#FF3B9D] to-transparent mt-2 rounded" />
                      </div>

                      {/* Authentic Bio Paragraph */}
                      <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {activeMember.bio || "Active ACM Executive Council member steering chapter innovation, research initiatives, and computing technology events at Vels Institute of Science, Technology and Advanced Studies."}
                      </p>

                      {/* Operative Telemetry Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#071329]/90 border border-cerulean/25">
                        <div>
                          <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest uppercase">OPERATIVE ID</div>
                          <div className="font-mono text-sm font-bold text-white mt-0.5">VISTAS-{String(activeIdx + 1).padStart(2, '0')}</div>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest uppercase">AFFILIATION</div>
                          <div className="font-mono text-sm font-bold text-white mt-0.5">ACM INDIA</div>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest uppercase">STATUS</div>
                          <div className="font-mono text-sm font-bold text-emerald-400 mt-0.5">ONLINE // ACT</div>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest uppercase">CLEARANCE</div>
                          <div className="font-mono text-sm font-bold text-[#FF3B9D] mt-0.5">LEVEL 5</div>
                        </div>
                      </div>

                      {/* Social & Contact Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {activeMember.linkedin_url && (
                          <a
                            href={activeMember.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => soundEngine.playHover()}
                            className="px-4 py-2.5 rounded-lg border border-[#38BDF8]/60 bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span>LINKEDIN</span>
                            <ExternalLink className="w-3 h-3 text-white/50" />
                          </a>
                        )}

                        {activeMember.github_url && (
                          <a
                            href={activeMember.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => soundEngine.playHover()}
                            className="px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>GITHUB</span>
                            <ExternalLink className="w-3 h-3 text-white/50" />
                          </a>
                        )}

                        {activeMember.instagram_url && (
                          <a
                            href={activeMember.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => soundEngine.playHover()}
                            className="px-4 py-2.5 rounded-lg border border-[#FF3B9D]/50 bg-[#FF3B9D]/10 hover:bg-[#FF3B9D]/20 text-[#FF3B9D] font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors shadow-[0_0_12px_rgba(255,59,157,0.25)]"
                          >
                            <Instagram className="w-4 h-4" />
                            <span>INSTAGRAM</span>
                            <ExternalLink className="w-3 h-3 text-white/50" />
                          </a>
                        )}

                        {/* Scanner Navigation Arrows */}
                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            onClick={handlePrev}
                            onMouseEnter={() => soundEngine.playHover()}
                            className="w-10 h-10 rounded-lg border border-cerulean/40 hover:border-cerulean bg-white/5 text-cerulean flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Previous Operative"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <span className="font-mono text-xs text-white/70 px-2">
                            {activeIdx + 1} / {members.length}
                          </span>
                          <button
                            onClick={handleNext}
                            onMouseEnter={() => soundEngine.playHover()}
                            className="w-10 h-10 rounded-lg border border-cerulean/40 hover:border-cerulean bg-white/5 text-cerulean flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Next Operative"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Crew Selector Carousel (All 10 Members) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cerulean tracking-widest uppercase">
                  SELECT OPERATIVE // ORBITAL ROSTER
                </span>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  Click to scan operative telemetry
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {members.map((member, i) => {
                  const isSelected = i === activeIdx;
                  return (
                    <button
                      key={member.id}
                      onClick={() => handleSelectMember(i)}
                      onMouseEnter={() => soundEngine.playHover()}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                        isSelected
                          ? 'border-[#38BDF8] bg-[#38BDF8]/15 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                          : 'border-[#1b2a47] bg-[#071329]/80 hover:border-cerulean/60 hover:bg-[#071329]'
                      }`}
                    >
                      {/* Active indicator dot */}
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF3B9D] shadow-[0_0_8px_#FF3B9D]" />
                      )}

                      <div className="w-11 h-11 rounded-full overflow-hidden border border-cerulean/50 flex-shrink-0 bg-black">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="font-heading text-xs font-bold text-white truncate uppercase">
                          {member.name}
                        </div>
                        <div className="font-mono text-[10px] text-[#38BDF8] truncate uppercase">
                          {member.designation}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            VIEW 2: ALL OPERATIVES GRID VIEW (10 Real Members)
            ------------------------------------------------------------- */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            {/* Domain Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => {
                    soundEngine.playClick();
                    setFilterDomain(dom);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    filterDomain === dom
                      ? 'bg-[#38BDF8] text-[#030611] shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                      : 'bg-[#071329] border border-cerulean/20 text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>

            {/* Grid of All 10 Authentic Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hud-card p-6 rounded-2xl border-cerulean/30 hover:border-cerulean/70 transition-all duration-300 flex flex-col justify-between group bg-[#030611]/90 backdrop-blur-md relative overflow-hidden"
                >
                  {/* Top Holographic Corner Accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cerulean/50" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cerulean/50" />

                  <div>
                    {/* Header: Photo + Badges */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cerulean/50 flex-shrink-0 bg-[#071329] group-hover:border-rose transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-rose/15 border border-rose/40 text-rose font-mono text-[10px] font-bold tracking-wider uppercase mb-1.5">
                          {member.designation}
                        </span>
                        <h4 className="font-heading text-xl font-bold text-white uppercase tracking-wide truncate group-hover:text-cerulean transition-colors">
                          {member.name}
                        </h4>
                        <div className="font-mono text-xs text-[#38BDF8] truncate mt-0.5">
                          {member.domain}
                        </div>
                      </div>
                    </div>

                    {/* Bio Description */}
                    <p className="font-sans text-xs sm:text-sm text-chrome/90 leading-relaxed mb-6 line-clamp-3">
                      {member.bio || "Active ACM Executive Council member steering chapter innovation, research initiatives, and computing technology events at VISTAS."}
                    </p>
                  </div>

                  {/* Footer: Social Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase">
                      VISTAS // ACM CREW
                    </span>

                    <div className="flex items-center gap-2">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => soundEngine.playHover()}
                          className="w-7 h-7 rounded border border-cerulean/40 hover:border-cerulean bg-white/5 text-cerulean flex items-center justify-center transition-colors"
                          title="LinkedIn"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.github_url && (
                        <a
                          href={member.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => soundEngine.playHover()}
                          className="w-7 h-7 rounded border border-white/20 hover:border-white bg-white/5 text-white flex items-center justify-center transition-colors"
                          title="GitHub"
                          aria-label="GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.instagram_url && (
                        <a
                          href={member.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => soundEngine.playHover()}
                          className="w-7 h-7 rounded border border-rose/50 hover:border-rose bg-white/5 text-rose flex items-center justify-center transition-colors"
                          title="Instagram"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};