import React from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { Instagram, Radio } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-transparent overflow-hidden">
      {/* Animated Blueprint coordinate grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,46,136,0.06)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,46,136,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:44px_44px] animate-grid-drift pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Holographic Social Radar Container */}
        <div className="hud-card-rose p-8 md:p-12 rounded-3xl border-rose/30 shadow-hologram-rose relative overflow-hidden bg-[#030611]/90 backdrop-blur-xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-rose/15 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase mb-3 font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>SOCIAL RADAR & TRANSMISSIONS</span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl font-black text-white uppercase tracking-wider mb-4">
                FOLLOW THE <span className="text-rose glow-rose">JOURNEY.</span>
              </h2>

              <p className="font-sans text-sm md:text-base text-chrome leading-relaxed mb-6 max-w-xl">
                Stay tapped into real-time workshops, event registration deadlines, technical project teasers, hackathon announcements, and community moments on our official Instagram feed.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={CHAPTER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="cyber-btn-rose px-7 py-3.5 rounded text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-hologram-rose"
                >
                  <Instagram className="w-4 h-4" />
                  <span>FOLLOW {CHAPTER_INFO.instagramHandle} ↗</span>
                </a>

                <div className="flex items-center gap-2 font-mono text-xs text-chrome/60">
                  <span className="w-2 h-2 rounded-full bg-cerulean animate-ping" />
                  <span>OFFICIAL VISTAS ACM SOCIAL FEED</span>
                </div>
              </div>
            </div>

            {/* Right Holographic Social Card Widget */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs hud-card p-5 rounded-2xl border-rose/40 text-center bg-[#071329]/90 backdrop-blur-md">
                <div className="w-16 h-16 rounded-full border-2 border-rose p-1 mx-auto mb-3 shadow-[0_0_15px_rgba(255,59,157,0.5)]">
                  <img
                    src={CHAPTER_INFO.logoUrl}
                    alt="VISTAS ACM Social Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="font-heading text-xl font-bold text-white tracking-wider uppercase mb-0.5">
                  VISTAS ACM
                </h3>
                <span className="font-mono text-xs text-rose tracking-wider block mb-3 font-semibold">
                  {CHAPTER_INFO.instagramHandle}
                </span>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#030611] border border-cerulean/20 text-center font-mono text-xs mb-4">
                  <div>
                    <span className="text-white font-bold block">ACTIVE</span>
                    <span className="text-[10px] text-chrome/50">TRANSMISSIONS</span>
                  </div>
                  <div>
                    <span className="text-cerulean font-bold block">OFFICIAL</span>
                    <span className="text-[10px] text-chrome/50">VERIFIED</span>
                  </div>
                </div>

                <a
                  href={CHAPTER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-rose/20 hover:bg-rose text-rose hover:text-white border border-rose text-xs font-mono tracking-wider transition-colors block font-bold cursor-pointer"
                >
                  VIEW PROFILE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
