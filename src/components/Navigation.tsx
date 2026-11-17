import React, { useState, useEffect } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { Menu, X, Volume2, VolumeX, Instagram, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'domains', label: 'Domains' },
  { id: 'events', label: 'Events' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Team' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  isSoundMuted,
  onToggleSound
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 py-3">
      <div
        className={`max-w-7xl mx-auto rounded-xl transition-all duration-300 border ${
          isScrolled
            ? 'bg-jet/90 backdrop-blur-md border-cerulean/30 shadow-hud-panel py-2.5 px-4 md:px-6'
            : 'bg-jet/40 backdrop-blur-sm border-white/10 py-3 px-4 md:px-6'
        } flex items-center justify-between`}
      >
        {/* Brand Logo & Identification */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          aria-label="VISTAS ACM Home"
        >
          <div className="relative w-10 h-10 rounded-full border border-cerulean/50 p-0.5 overflow-hidden group-hover:border-rose transition-colors shadow-hologram-blue">
            <img
              src={CHAPTER_INFO.logoUrl}
              alt="VISTAS ACM Chapter Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-wider text-white uppercase group-hover:text-cerulean transition-colors leading-none">
              VISTAS <span className="text-cerulean">ACM</span>
            </span>
            <span className="font-mono text-[9px] text-chrome-muted tracking-widest uppercase">
              STUDENT CHAPTER
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-jet-surface/60 border border-cerulean/20 rounded-full p-1 shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'text-white font-bold bg-cerulean/20 border border-cerulean shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                    : 'text-chrome/75 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cerulean animate-ping" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Audio, Instagram & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2 rounded-lg border border-cerulean/30 hover:border-cerulean bg-jet-surface/50 text-chrome hover:text-cerulean transition-colors cursor-pointer"
            title={isSoundMuted ? "Enable Audio Atmosphere" : "Mute Audio Atmosphere"}
            aria-label="Toggle Sound"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-chrome/50" /> : <Volume2 className="w-4 h-4 text-cerulean" />}
          </button>

          {/* Instagram Button */}
          <a
            href={CHAPTER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2 rounded-lg border border-rose/30 hover:border-rose bg-jet-surface/50 text-chrome hover:text-rose transition-colors cursor-pointer"
            title="Official VISTAS ACM Instagram"
            aria-label="VISTAS ACM on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Join Chapter CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            onMouseEnter={() => soundEngine.playHover()}
            className="cyber-btn-blue px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>JOIN CHAPTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-rose" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-2 rounded border border-cerulean/30 text-chrome"
            aria-label="Toggle Audio"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cerulean" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-cerulean/40 text-cerulean hover:text-white"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-xl bg-jet/95 border border-cerulean/40 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between p-2.5 rounded text-left transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-cerulean/20 text-cerulean font-bold border-l-2 border-cerulean'
                    : 'text-chrome hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'team' && (
                  <span className="text-[10px] text-rose bg-rose/10 px-1.5 py-0.5 rounded border border-rose/30">
                    COMING SOON
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-cerulean/20 flex items-center justify-between">
            <a
              href={CHAPTER_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-rose hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span>@vistas_acm ↗</span>
            </a>

            <button
              onClick={() => handleNavClick('contact')}
              className="cyber-btn-blue px-4 py-2 rounded text-xs font-bold flex items-center gap-1"
            >
              <span>JOIN CHAPTER</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-rose" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
