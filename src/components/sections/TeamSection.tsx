import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { ACTUAL_TEAM_MEMBERS, TeamMember } from '../../data/teamData';
import { fetchLiveTeam } from '../../data/supabaseClient';
import {
  Shield,
  Linkedin,
  Github,
  Instagram,
  ChevronLeft,
  ChevronRight,
  Scan,
  Grid,
  Disc,
  ExternalLink,
  CheckCircle2,
  Search,
  X,
  User,
  Sparkles,
  Award
} from 'lucide-react';

// 3D Card Tilt Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', onClick, onMouseEnter }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-(y / rect.height) * 12);
    setRotateY((x / rect.width) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export const TeamSection: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(ACTUAL_TEAM_MEMBERS);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'scanner' | 'grid'>('scanner');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailMember, setDetailMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchLiveTeam()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
          setMembers(sorted);
        }
      })
      .catch((err) => {
        console.warn("Using curated team records:", err);
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

  const categories = [
    { id: 'ALL', label: 'All Crew (16)' },
    { id: 'FACULTY', label: 'Faculty Advisory' },
    { id: 'EXECUTIVE', label: 'Executive Council' },
    { id: 'TECHNICAL', label: 'Technical & Projects' },
    { id: 'CREATIVE', label: 'Creative & Design' },
    { id: 'PR_MEDIA', label: 'PR, Media & Industry' }
  ];

  const filteredMembers = members.filter((m) => {
    // Category match
    let matchesCategory = true;
    if (filterCategory === 'FACULTY') {
      matchesCategory = !!m.isFaculty;
    } else if (filterCategory === 'EXECUTIVE') {
      matchesCategory = m.domain.toUpperCase().includes('EXECUTIVE') || m.domain.toUpperCase().includes('DIGITAL') || m.domain.toUpperCase().includes('MEMBERSHIP');
    } else if (filterCategory === 'TECHNICAL') {
      matchesCategory = m.domain.toUpperCase().includes('TECHNICAL') || m.domain.toUpperCase().includes('PROJECT') || m.domain.toUpperCase().includes('TRAINING');
    } else if (filterCategory === 'CREATIVE') {
      matchesCategory = m.domain.toUpperCase().includes('CREATIVE') || m.domain.toUpperCase().includes('DESIGN');
    } else if (filterCategory === 'PR_MEDIA') {
      matchesCategory = m.domain.toUpperCase().includes('PUBLICITY') || m.domain.toUpperCase().includes('CORPORATE') || m.domain.toUpperCase().includes('EVENT') || m.domain.toUpperCase().includes('SPONSORSHIP') || m.domain.toUpperCase().includes('RESEARCH');
    }

    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      m.name.toLowerCase().includes(query) ||
      m.designation.toLowerCase().includes(query) ||
      m.domain.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="crew" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-[#050505] overflow-hidden">
      {/* Target anchor */}
      <div id="team" className="absolute top-0 pointer-events-none" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>OUR CREW // CHAPTER LEADERSHIP</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-rose font-bold">16 VERIFIED ACM LEADERS</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              PEOPLE MAKE THE <span className="text-cerulean glow-blue">CHAPTER.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#C0C0C0] max-w-md leading-relaxed font-semibold">
            One dedicated team. Discover the student leaders and faculty mentors building the VISTAS ACM chapter.
          </p>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 rounded-xl bg-[#0B1018] border border-cerulean/30 shadow-hologram-blue">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('scanner');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  viewMode === 'scanner'
                    ? 'bg-cerulean text-white shadow-[0_0_12px_rgba(0,123,255,0.6)]'
                    : 'text-[#A5ADBA] hover:text-white'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>SCANNER</span>
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-cerulean text-white shadow-[0_0_12px_rgba(0,123,255,0.6)]'
                    : 'text-[#A5ADBA] hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="hud-card p-4 rounded-xl bg-[#0B1018]/90 border-cerulean/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-cerulean absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search crew by name or role..."
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

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setFilterCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-cerulean text-white shadow-[0_0_10px_rgba(0,123,255,0.5)]'
                    : 'bg-[#050505] border border-cerulean/20 text-[#A5ADBA] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------
            VIEW 1: CIRCULAR HOLOGRAPHIC SCANNER
        ------------------------------------------------------------- */}
        {viewMode === 'scanner' && (
          <div className="space-y-10">
            {/* Main Holographic Scanner Station */}
            <div className="hud-card p-6 sm:p-10 md:p-12 rounded-3xl border-cerulean/40 shadow-hologram-blue relative overflow-hidden bg-[#0B1018]/90 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,123,255,0.12)_0,transparent_65%)] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Large Circular Holographic Scanner */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-cerulean/30 animate-spin" style={{ animationDuration: '45s' }}>
                      <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cerulean font-bold">000°</span>
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-cerulean font-bold">180°</span>
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-cerulean font-bold">270°</span>
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] text-cerulean font-bold">090°</span>
                    </div>

                    <div
                      className="absolute inset-4 rounded-full border border-dashed border-rose/40 animate-spin"
                      style={{ animationDuration: '28s', animationDirection: 'reverse' }}
                    />
                    <div className="absolute inset-8 rounded-full border border-cerulean/50" />

                    {/* Radar Sweep Effect */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none animate-spin"
                      style={{
                        animationDuration: '6s',
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(0,123,255,0.25) 360deg)'
                      }}
                    />

                    {/* Central Avatar Core */}
                    <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-cerulean shadow-[0_0_35px_rgba(0,123,255,0.5)] bg-[#050505] z-10 flex items-center justify-center">
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

                      {/* Biometric Scanning Line */}
                      <motion.div
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose to-transparent shadow-[0_0_15px_#FF2E88] pointer-events-none z-20"
                      />

                      <div className="absolute inset-2 border border-cerulean/20 rounded-full pointer-events-none" />
                      <div className="absolute top-2 left-2 text-[9px] font-mono text-cerulean bg-black/60 px-1.5 py-0.5 rounded">
                        ROLE // 0{activeIdx + 1}
                      </div>
                      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-rose bg-black/60 px-1.5 py-0.5 rounded">
                        OFFICIAL
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-cerulean bg-cerulean/10 border border-cerulean/30 px-3 py-1 rounded-full">
                    <Scan className="w-3.5 h-3.5 animate-pulse text-rose" />
                    <span>VISTAS ACM LEADERSHIP // AY 2026–2027</span>
                  </div>
                </div>

                {/* Right: Holographic ID Card Display */}
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
                        <span className="px-3 py-1 rounded-md bg-rose/15 border border-rose/50 text-rose font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,46,136,0.3)]">
                          <Shield className="w-3.5 h-3.5" />
                          <span>{activeMember.designation}</span>
                        </span>

                        <span className="px-3 py-1 rounded-md bg-cerulean/10 border border-cerulean/40 text-cerulean font-mono text-xs font-bold tracking-wider uppercase">
                          {activeMember.domain}
                        </span>

                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 font-mono text-xs flex items-center gap-1 ml-auto">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>ACM CHAPTER LEADER</span>
                        </span>
                      </div>

                      {/* Operative Full Name */}
                      <div>
                        <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                          {activeMember.name}
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-cerulean via-rose to-transparent mt-2 rounded" />
                      </div>

                      {/* Bio */}
                      <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {activeMember.bio}
                      </p>

                      {/* Responsibilities */}
                      <div className="p-4 rounded-xl bg-[#050505] border border-cerulean/30 space-y-1.5">
                        <span className="font-mono text-xs text-cerulean uppercase tracking-wider block font-bold">
                          OFFICIAL RESPONSIBILITIES:
                        </span>
                        <p className="font-sans text-sm text-[#A5ADBA] leading-relaxed">
                          {activeMember.responsibilities}
                        </p>
                      </div>

                      {/* Social Actions & Navigation Arrows */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {activeMember.linkedin_url && (
                          <a
                            href={activeMember.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => soundEngine.playHover()}
                            className="px-4 py-2 rounded-lg border border-cerulean/60 bg-cerulean/10 hover:bg-cerulean/20 text-cerulean font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors"
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
                            className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors"
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
                            className="px-4 py-2 rounded-lg border border-rose/50 bg-rose/10 hover:bg-rose/20 text-rose font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-colors"
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
                            aria-label="Previous Member"
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
                            aria-label="Next Member"
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

            {/* Selector Carousel (Filtered Members) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-bold">
                  CHAPTER LEADERSHIP ROSTER ({filteredMembers.length} MEMBERS)
                </span>
                <span className="font-mono text-[11px] text-[#A5ADBA]">
                  Click any card to inspect or trigger full modal
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2.5">
                {filteredMembers.map((member) => {
                  const isSelected = member.id === activeMember.id;
                  const idxInAll = members.findIndex((m) => m.id === member.id);
                  return (
                    <button
                      key={member.id}
                      onClick={() => handleSelectMember(idxInAll)}
                      onMouseEnter={() => soundEngine.playHover()}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 relative overflow-hidden ${
                        isSelected
                          ? 'border-cerulean bg-cerulean/15 shadow-[0_0_20px_rgba(0,123,255,0.35)]'
                          : 'border-[#1b2a47] bg-[#0B1018]/80 hover:border-cerulean/60 hover:bg-[#0B1018]'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose shadow-[0_0_8px_#FF2E88]" />
                      )}

                      <div className="w-10 h-10 rounded-full overflow-hidden border border-cerulean/50 flex-shrink-0 bg-black">
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
                        <div className="font-mono text-[9px] text-cerulean truncate uppercase">
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
            VIEW 2: ALL OPERATIVES 3D TILT GRID VIEW
        ------------------------------------------------------------- */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <TiltCard
                  key={member.id}
                  onClick={() => {
                    soundEngine.playHologramActivate();
                    setDetailMember(member);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="hud-card p-6 rounded-2xl border-cerulean/30 hover:border-cerulean/70 transition-all flex flex-col justify-between group bg-[#0B1018]/90 backdrop-blur-md relative overflow-hidden cursor-pointer"
                >
                  <div>
                    {/* Header: Photo + Badges */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cerulean/50 flex-shrink-0 bg-[#050505] group-hover:border-rose transition-colors shadow-[0_0_15px_rgba(0,123,255,0.3)]">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-rose/15 border border-rose/40 text-rose font-mono text-[10px] font-bold tracking-wider uppercase mb-1">
                          {member.designation}
                        </span>
                        <h4 className="font-heading text-xl font-bold text-white uppercase tracking-wide truncate group-hover:text-cerulean transition-colors">
                          {member.name}
                        </h4>
                        <div className="font-mono text-xs text-cerulean truncate mt-0.5">
                          {member.domain}
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed mb-6 line-clamp-3">
                      {member.responsibilities}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-cerulean tracking-widest uppercase">
                      CLICK FOR PROFILE ↗
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
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
                          className="w-7 h-7 rounded border border-rose/50 hover:border-rose bg-white/5 text-rose flex items-center justify-center transition-colors"
                          title="Instagram"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          CREW PROFILE DETAIL MODAL POPUP
      ========================================================= */}
      <AnimatePresence>
        {detailMember && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-[#050505] border border-cerulean/40 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
            >
              <button
                onClick={() => setDetailMember(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-cerulean/30 hover:border-white text-[#A5ADBA] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-5 pb-5 border-b border-cerulean/20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cerulean flex-shrink-0 bg-[#0B1018] shadow-[0_0_20px_rgba(0,123,255,0.4)]">
                  <img
                    src={detailMember.image_url}
                    alt={detailMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-rose/15 border border-rose/40 text-rose font-mono text-[10px] font-bold uppercase tracking-wider block w-fit mb-1.5">
                    {detailMember.designation}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                    {detailMember.name}
                  </h3>
                  <div className="font-mono text-xs text-cerulean mt-0.5">
                    {detailMember.domain}
                  </div>
                </div>
              </div>

              {detailMember.bio && (
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-cerulean uppercase tracking-widest block font-bold">
                    BIOGRAPHY & ACADEMIC ROLE
                  </span>
                  <p className="font-sans text-sm text-white/90 leading-relaxed">
                    {detailMember.bio}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-[#0B1018] border border-cerulean/30 space-y-1.5">
                <span className="font-mono text-xs text-rose uppercase tracking-wider block font-bold">
                  ASSIGNED CHAPTER RESPONSIBILITIES:
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
                  {detailMember.responsibilities}
                </p>
              </div>

              {/* Verified Links */}
              <div className="flex items-center gap-3 pt-2">
                {detailMember.linkedin_url && (
                  <a
                    href={detailMember.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-cerulean/15 border border-cerulean text-cerulean font-mono text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-cerulean hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </a>
                )}
                {detailMember.github_url && (
                  <a
                    href={detailMember.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-white/5 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                )}
                {detailMember.instagram_url && (
                  <a
                    href={detailMember.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-rose/15 border border-rose text-rose font-mono text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-rose hover:text-white transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>INSTAGRAM</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
