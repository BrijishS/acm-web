import React, { useState, useEffect } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { Menu, X, Volume2, VolumeX, Instagram, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onReplayIntro?: () => void;
}

export const MISSION_NAV_ITEMS = [
  { id: 'mission', label: 'MISSION' },
  { id: 'profile', label: 'PROFILE' },
  { id: 'vision', label: 'VISION' },
  { id: 'domains', label: 'GALAXY' },
  { id: 'events', label: 'LAUNCHES' },
  { id: 'projects', label: 'BUILDS' },
  { id: 'governance', label: 'GOVERNANCE' },
  { id: 'team', label: 'CREW' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'contact', label: 'CONTACT' },
];

export const MOBILE_NAV_ITEMS = [
  { id: 'mission', label: 'MISSION' },
  { id: 'profile', label: 'PROFILE' },
  { id: 'vision', label: 'VISION' },
  { id: 'domains', label: 'GALAXY' },
  { id: 'events', label: 'LAUNCHES' },
  { id: 'projects', label: 'BUILDS' },
  { id: 'governance', label: 'GOVERNANCE' },
  { id: 'team', label: 'CREW' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  isSoundMuted,
  onToggleSound,
  onReplayIntro
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(19);
  const [targetedNavId, setTargetedNavId] = useState<string | null>(null);

  // Mission Elapsed Time (MET) counter: T+ MM:SS as seen in user's reference photo
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMET = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `T+ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleNavClick = (id: string) => {
    setTargetedNavId(id);
    setTimeout(() => setTargetedNavId(null), 1800);
    soundEngine.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#030611]/95 backdrop-blur-md border-b border-[#1b2a47] transition-all duration-200">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Logo + VISTAS / ACM Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-none group flex-shrink-0"
          aria-label="VISTAS ACM Home"
        >
          <div className="w-8 h-8 rounded-full border border-cerulean/60 p-0.5 overflow-hidden flex items-center justify-center bg-[#071329] group-hover:border-rose transition-colors shadow-[0_0_12px_rgba(56,189,248,0.4)]">
            <img
              src={CHAPTER_INFO.logoUrl}
              alt="VISTAS ACM Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex items-center gap-1.5 font-heading text-lg sm:text-xl font-bold tracking-wider uppercase select-none">
            <span className="text-white group-hover:text-cerulean transition-colors font-extrabold">VISTAS</span>
            <span className="text-[#64748b] font-normal">/</span>
            <span className="text-[#38BDF8] glow-blue group-hover:text-rose transition-colors font-black">ACM</span>
          </div>
        </button>

        {/* Center: Mission Control Nav Links (Exact style from Reference Image) */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2 font-mono text-[11px] 2xl:text-xs tracking-wider uppercase">
          {MISSION_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isTargeted = targetedNavId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-2.5 py-1.5 2xl:px-3 rounded-md transition-all duration-200 cursor-pointer ${
                  isTargeted
                    ? 'border-2 border-[#FF3B9D] text-white bg-[#FF3B9D]/20 font-bold shadow-[0_0_20px_#FF3B9D]'
                    : isActive
                    ? 'border border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* AI Selection Radar Ping */}
                {isTargeted && (
                  <span className="absolute -inset-1 rounded-lg border border-[#38BDF8] animate-ping pointer-events-none opacity-50" />
                )}

                <span>{item.label}</span>
                {/* Active cyan indicator dot centered underneath */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Compact Nav for LG screens */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1 font-mono text-[10px] tracking-wider uppercase">
          {MISSION_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isTargeted = targetedNavId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-1.5 py-1 rounded transition-colors cursor-pointer ${
                  isTargeted
                    ? 'border border-[#FF3B9D] text-white bg-[#FF3B9D]/20 font-bold shadow-[0_0_15px_#FF3B9D]'
                    : isActive
                    ? 'border border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10 font-bold'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {isTargeted && (
                  <span className="absolute -inset-1 rounded border border-[#38BDF8] animate-ping pointer-events-none opacity-40" />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38BDF8]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Audio Toggle, Instagram, Join Mission Button & Mission Elapsed Time */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Replay Entry Animation Button */}
          {onReplayIntro && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onReplayIntro();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#38BDF8] text-[#38BDF8] hover:text-white bg-[#030611] hover:bg-[#38BDF8]/20 transition-all font-mono text-xs font-bold tracking-wider cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
              <span>ENTRY INTRO</span>
            </button>
          )}

          {/* Mission Elapsed Time (MET) counter from Reference Screenshot */}
          <div
            className="hidden sm:flex font-mono text-xs text-[#fbbf24] font-bold tracking-widest select-none items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#fbbf24]/10 border border-[#fbbf24]/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]"
            title="Mission Elapsed Time"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-ping" />
            <span>{formatMET(elapsedSeconds)}</span>
          </div>

          {/* Audio Atmosphere Toggle with Cyan Border (Reference Image Style) */}
          <button
            onClick={onToggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-8 h-8 rounded-lg border border-[#38BDF8]/40 hover:border-[#38BDF8] bg-[#071329]/80 text-[#38BDF8] flex items-center justify-center transition-colors cursor-pointer shadow-[0_0_10px_rgba(56,189,248,0.2)]"
            title={isSoundMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Audio"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#38BDF8]" />}
          </button>

          {/* Instagram Link with Rose Border (Reference Image Style) */}
          <a
            href={CHAPTER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            className="w-8 h-8 rounded-lg border border-[#FF3B9D]/50 hover:border-[#FF3B9D] bg-[#071329]/80 text-[#FF3B9D] flex items-center justify-center transition-colors cursor-pointer shadow-[0_0_10px_rgba(255,59,157,0.2)]"
            title="Official Instagram @vistas_acm"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-lg border border-cerulean/40 text-cerulean flex items-center justify-center cursor-pointer ml-1"
            aria-expanded={mobileMenuOpen}
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030611]/98 border-b border-[#1b2a47] px-4 py-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs">
            <span className="text-[#94a3b8]">MISSION ELAPSED:</span>
            <span className="text-[#fbbf24] font-bold">{formatMET(elapsedSeconds)}</span>
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-xs tracking-wider">
            {MOBILE_NAV_ITEMS.map((item) => {
              const isTargeted = targetedNavId === item.id;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isTargeted
                      ? 'bg-[#FF3B9D]/20 text-white font-bold border-2 border-[#FF3B9D] shadow-[0_0_15px_#FF3B9D]'
                      : isActive
                      ? 'bg-[#38BDF8]/15 text-[#38BDF8] font-bold border border-[#38BDF8]/50'
                      : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('contact')}
              className="mt-2 w-full py-2.5 rounded-lg border border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10 font-mono text-xs font-bold text-center tracking-wider uppercase flex items-center justify-center gap-1.5"
            >
              <span>JOIN THE CHAPTER</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
