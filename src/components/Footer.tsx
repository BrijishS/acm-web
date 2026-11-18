import React from 'react';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { id: 'mission', label: 'Mission' },
    { id: 'profile', label: 'Profile' },
    { id: 'vision', label: 'Vision' },
    { id: 'domains', label: 'Galaxy' },
    { id: 'events', label: 'Launches' },
    { id: 'projects', label: 'Builds' },
    { id: 'governance', label: 'Governance' },
    { id: 'team', label: 'Crew' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

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
              <div className="flex flex-col">
                <b className="font-heading text-xl font-bold tracking-wider text-white uppercase leading-none">
                  VISTAS ACM
                </b>
                <small className="font-mono text-[9px] text-cerulean tracking-[0.2em] uppercase mt-0.5">
                  Student Chapter
                </small>
              </div>
            </div>

            <p className="font-sans text-xs md:text-sm text-chrome/80 leading-relaxed max-w-sm">
              Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS).
            </p>

            <div className="font-mono text-xs text-rose tracking-wider font-bold">
              BUILD / LEAD / CREATE / CONNECT.
            </div>
          </div>

          {/* Quick Official Navigation */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-cerulean tracking-widest uppercase block mb-3 font-semibold">
              CHAPTER NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans font-medium">
              {footerLinks.map((item) => (
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
              <a
                href={CHAPTER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-chrome/70 hover:text-rose transition-colors py-1 flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Communication Links & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-rose tracking-widest uppercase block mb-3 font-semibold">
                COMMUNICATION
              </span>
              <div className="space-y-2 text-xs font-mono">
                <a
                  href={CHAPTER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-chrome hover:text-rose transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose" />
                  <span>@vistas_acm ↗</span>
                </a>
                <div className="text-[11px] text-chrome/60 pt-1">
                  ACM Chapter Group ID 199704
                </div>
              </div>
            </div>

            {/* Back to top */}
            <div className="mt-6 md:mt-0">
              <button
                onClick={scrollToTop}
                onMouseEnter={() => soundEngine.playHover()}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cerulean/30 hover:border-cerulean text-xs font-mono text-cerulean transition-colors cursor-pointer"
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
            © VISTAS ACM · Build / Lead / Create / Connect
          </div>
          <div className="flex items-center gap-2">
            <span>Department of Computer Science and Engineering</span>
            <span>·</span>
            <span>School of Engineering, VISTAS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
