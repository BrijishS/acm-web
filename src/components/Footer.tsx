import React from 'react';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { Instagram, ArrowUp, Globe, Shield, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cerulean/20 bg-jet pt-16 pb-12 px-4 md:px-8 text-chrome overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-cerulean/15">
          {/* Brand & Identity */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-cerulean/50 p-0.5 overflow-hidden">
                <img
                  src={CHAPTER_INFO.logoUrl}
                  alt="VISTAS ACM Chapter Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-wider text-white uppercase block leading-tight">
                  VISTAS <span className="text-cerulean">ACM</span>
                </span>
                <span className="font-mono text-[9px] text-chrome-muted tracking-widest uppercase">
                  FUTURE INNOVATION COMMAND CENTER
                </span>
              </div>
            </div>

            <p className="font-sans text-xs md:text-sm text-chrome/80 leading-relaxed max-w-sm">
              Official student chapter of the Association for Computing Machinery at Vels Institute of Science, Technology and Advanced Studies (VISTAS), Chennai.
            </p>

            <div className="font-mono text-xs text-rose">
              BUILD · LEAD · CREATE · CONNECT
            </div>
          </div>

          {/* Quick HUD Navigation */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-cerulean tracking-widest uppercase block mb-3 font-semibold">
              NAVIGATION TERMINALS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { id: 'home', label: 'Command Center' },
                { id: 'about', label: 'About Chapter' },
                { id: 'domains', label: 'Tech Domains' },
                { id: 'events', label: 'Operations' },
                { id: 'projects', label: 'Innovation Lab' },
                { id: 'team', label: 'Crew Command' },
                { id: 'gallery', label: 'Visual Archive' },
                { id: 'contact', label: 'Contact Hub' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onNavigate(item.id);
                  }}
                  className="text-left text-chrome/70 hover:text-cerulean transition-colors cursor-pointer py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry & Social Actions */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-rose tracking-widest uppercase block mb-3 font-semibold">
                COMMUNICATION LINKS
              </span>
              <div className="space-y-2 text-xs font-mono">
                <a
                  href={CHAPTER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-chrome hover:text-rose transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose" />
                  <span>Instagram @vistas_acm ↗</span>
                </a>
                <a
                  href={`mailto:${CHAPTER_INFO.facultyCoordinatorEmail}`}
                  className="flex items-center gap-2 text-chrome hover:text-cerulean transition-colors"
                >
                  <Terminal className="w-4 h-4 text-cerulean" />
                  <span className="truncate">{CHAPTER_INFO.facultyCoordinatorEmail}</span>
                </a>
              </div>
            </div>

            {/* Back to top */}
            <div className="mt-6 md:mt-0">
              <button
                onClick={scrollToTop}
                onMouseEnter={() => soundEngine.playHover()}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-cerulean/30 hover:border-cerulean text-xs font-mono text-cerulean transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>RETURN TO TOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-chrome/50 gap-4">
          <div>
            © {new Date().getFullYear()} VISTAS ACM STUDENT CHAPTER · CHARTERED MAY 19, 2025.
          </div>
          <div className="flex items-center gap-4">
            <span>ACM INDIA COUNCIL</span>
            <span>·</span>
            <span>VELS UNIVERSITY (VISTAS)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
