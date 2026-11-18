import React, { useState, useEffect } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { Menu, X, Volume2, VolumeX, Instagram, Shield, Sparkles, Terminal } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onReplayIntro?: () => void;
  onOpenAdmin?: () => void;
  onOpenAria?: () => void;
}

export const MAIN_NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT ACM' },
  { id: 'events', label: 'EVENTS' },
  { id: 'activities', label: 'ACTIVITIES' },
  { id: 'crew', label: 'OUR CREW' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'join', label: 'JOIN ACM' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  isSoundMuted,
  onToggleSound,
  onReplayIntro,
  onOpenAdmin,
  onOpenAria
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(42);
  const [targetedNavId, setTargetedNavId] = useState<string | null>(null);

  // Mission Elapsed Time (MET) counter
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#0B1018] shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all duration-200">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo & Title */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-none group flex-shrink-0"
          aria-label="VISTAS ACM Home"
        >
          <div className="w-8 h-8 rounded-full border border-cerulean/70 p-0.5 overflow-hidden flex items-center justify-center bg-[#0B1018] group-hover:border-rose transition-colors shadow-[0_0_12px_rgba(0,123,255,0.4)]">
            <img
              src={CHAPTER_INFO.logoUrl}
              alt="VISTAS ACM Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex items-center gap-1.5 font-heading text-lg sm:text-xl font-bold tracking-wider uppercase select-none">
            <span className="text-white group-hover:text-cerulean transition-colors font-extrabold">VISTAS</span>
            <span className="text-[#A5ADBA]/50 font-normal">/</span>
            <span className="text-cerulean glow-blue group-hover:text-rose transition-colors font-black">ACM</span>
          </div>
        </button>

        {/* Center: Desktop Navigation Bar with Animated Indicator */}
        <nav className="hidden 2xl:flex items-center gap-1 font-mono text-[11px] tracking-wider uppercase">
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isTargeted = targetedNavId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                  isTargeted
                    ? 'border-2 border-rose text-white bg-rose/20 font-bold shadow-[0_0_20px_#FF2E88]'
                    : isActive
                    ? 'border border-cerulean text-cerulean bg-cerulean/15 font-bold shadow-[0_0_15px_rgba(0,123,255,0.35)]'
                    : 'text-[#A5ADBA] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isTargeted && (
                  <span className="absolute -inset-1 rounded-lg border border-cerulean animate-ping pointer-events-none opacity-50" />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cerulean shadow-[0_0_8px_#007BFF]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Medium/Large Screens: Grouped Primary Navigation */}
        <nav className="hidden lg:flex 2xl:hidden items-center gap-1 font-mono text-[10px] tracking-wider uppercase">
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-2 py-1 rounded transition-colors cursor-pointer ${
                  isActive
                    ? 'border border-cerulean text-cerulean bg-cerulean/15 font-bold'
                    : 'text-[#A5ADBA] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cerulean" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Mission Elapsed Time, Replay, Admin, Audio, Instagram, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* A.R.I.A. AI Holographic Trigger */}
          {onOpenAria && (
            <button
              onClick={() => {
                soundEngine.playJarvisChirp();
                onOpenAria();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00CFFF]/70 text-[#00CFFF] hover:text-white bg-[#071322] hover:bg-[#00CFFF]/25 transition-all font-mono text-[11px] font-extrabold tracking-widest cursor-pointer shadow-[0_0_15px_rgba(0,207,255,0.4)] group"
              title="Summon A.R.I.A. Holographic AI"
            >
              <div className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-[#00CFFF] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#00CFFF] block" />
              </div>
              <span>A.R.I.A.</span>
            </button>
          )}

          {/* Replay Cinematic Intro */}
          {onReplayIntro && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onReplayIntro();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-cerulean/40 text-cerulean hover:text-white bg-[#0B1018] hover:bg-cerulean/20 transition-all font-mono text-[11px] font-bold tracking-wider cursor-pointer shadow-[0_0_10px_rgba(0,123,255,0.25)]"
              title="Replay Cinematic Website Opening"
            >
              <Sparkles className="w-3 h-3 text-rose" />
              <span>INTRO</span>
            </button>
          )}

          {/* Admin Dashboard Trigger */}
          {onOpenAdmin && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenAdmin();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-rose/50 text-rose hover:text-white bg-[#0B1018] hover:bg-rose/20 transition-all font-mono text-[11px] font-bold tracking-wider cursor-pointer shadow-[0_0_10px_rgba(255,46,136,0.25)]"
              title="Mission Control Administrator Dashboard"
            >
              <Shield className="w-3 h-3 text-rose" />
              <span className="hidden md:inline">ADMIN</span>
            </button>
          )}

          {/* Mission Elapsed Time (MET) */}
          <div
            className="hidden xl:flex font-mono text-xs text-[#fbbf24] font-bold tracking-widest select-none items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#fbbf24]/10 border border-[#fbbf24]/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]"
            title="Mission Elapsed Time"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-ping" />
            <span>{formatMET(elapsedSeconds)}</span>
          </div>

          {/* Audio Atmosphere Toggle */}
          <button
            onClick={onToggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-8 h-8 rounded-lg border border-cerulean/40 hover:border-cerulean bg-[#0B1018] text-cerulean flex items-center justify-center transition-colors cursor-pointer shadow-[0_0_10px_rgba(0,123,255,0.2)]"
            title={isSoundMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Audio"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-cerulean" />}
          </button>

          {/* Instagram Link */}
          <a
            href={CHAPTER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            className="w-8 h-8 rounded-lg border border-rose/50 hover:border-rose bg-[#0B1018] text-rose flex items-center justify-center transition-colors cursor-pointer shadow-[0_0_10px_rgba(255,46,136,0.2)]"
            title="Official Instagram @vistas_acm"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-lg border border-cerulean/50 text-cerulean flex items-center justify-center cursor-pointer ml-1"
            aria-expanded={mobileMenuOpen}
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505]/98 border-b border-[#0B1018] px-4 py-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs">
            <span className="text-[#A5ADBA]">MISSION ELAPSED:</span>
            <span className="text-[#fbbf24] font-bold">{formatMET(elapsedSeconds)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs tracking-wider">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-cerulean/20 text-cerulean font-bold border border-cerulean'
                      : 'text-[#A5ADBA] hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cerulean shadow-[0_0_6px_#007BFF]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile A.R.I.A., Admin & Replay triggers */}
          <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-white/10">
            {onOpenAria && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundEngine.playJarvisChirp();
                  onOpenAria();
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-[#00CFFF]/60 bg-[#00CFFF]/15 text-[#00CFFF] font-mono text-xs font-black tracking-widest flex items-center justify-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#00CFFF] animate-ping" />
                <span>OPEN A.R.I.A. AI ASSISTANT</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-rose/50 bg-rose/10 text-rose font-mono text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>ADMIN CONSOLE</span>
                </button>
              )}
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-cerulean/50 bg-cerulean/10 text-cerulean font-mono text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>REPLAY INTRO</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
