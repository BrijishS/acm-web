import React from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { Shield, Target, Compass, Award, Cpu, Globe, Users, Code } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div id="about" className="relative border-t border-cerulean/15">
      {/* =========================================================
          PROFILE SECTION (NAV: PROFILE)
      ========================================================= */}
      <section id="profile" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
                <span>02 // CHAPTER PROFILE</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
                ORIGIN & <span className="text-cerulean glow-blue">FOUNDATION.</span>
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
              Chartered under the global Association for Computing Machinery, VISTAS ACM bridges academic computing theory with cutting-edge engineering realities.
            </p>
          </div>

          {/* Dual Primary Chamber: Institutional Context + ACM Identity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            {/* Left: About Chapter & ACM Global */}
            <div className="lg:col-span-7 hud-card p-6 md:p-8 rounded-xl border-cerulean/30">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-cerulean" />
                <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-semibold">
                  INTERNATIONAL ACM AFFILIATION
                </span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-3">
                THE WORLD'S PREMIER COMPUTING SOCIETY
              </h3>
              <p className="font-sans text-sm md:text-base text-chrome leading-relaxed mb-4">
                The <strong className="text-white">Association for Computing Machinery (ACM)</strong> is the world's largest educational and scientific computing society, uniting computing educators, researchers, and professionals to inspire dialogue, share resources, and address the field's challenges.
              </p>
              <p className="font-sans text-sm text-chrome/80 leading-relaxed">
                At <strong className="text-white">Vels Institute of Science, Technology and Advanced Studies (VISTAS)</strong>, Chennai, our official student chapter functions as an autonomous launchpad where curious minds collaborate on complex engineering problems, publish research, and build production-grade prototypes.
              </p>

              {/* Official Charter Badge */}
              <div className="mt-6 pt-6 border-t border-cerulean/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] text-chrome-muted tracking-widest uppercase block">
                    CHARTER DATE
                  </span>
                  <span className="font-mono text-xs md:text-sm text-rose font-bold">
                    {CHAPTER_INFO.charterDate}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-chrome-muted tracking-widest uppercase block">
                    CHAPTER ID
                  </span>
                  <span className="font-mono text-xs md:text-sm text-cerulean font-bold">
                    {CHAPTER_INFO.chapterId}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-chrome-muted tracking-widest uppercase block">
                    INSTITUTION
                  </span>
                  <span className="font-mono text-xs text-white font-medium">
                    VISTAS, Chennai
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Mission Chamber */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="hud-card p-6 rounded-xl border-cerulean/30 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2 font-mono text-xs text-cerulean tracking-wider">
                    <Target className="w-4 h-4 text-rose" />
                    <span>MISSION SPECIFICATION // 01</span>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white uppercase tracking-wider mb-2">
                    TRANSFORM IDEAS INTO IMPACT
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-chrome leading-relaxed">
                    Empower student engineers through hands-on technical workshops, competitive hackathons, interdisciplinary research, and active industry mentorship.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cerulean/15 flex items-center justify-between text-xs font-mono text-chrome/50">
                  <span>ACM INDIA STUDENT NETWORK</span>
                  <span className="text-cerulean">VELS UNIVERSITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISION & PILLARS SECTION (NAV: VISION)
      ========================================================= */}
      <section id="vision" className="py-20 px-4 md:px-8 bg-jet/60 border-t border-cerulean/15">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
                <span>03 // VISION & OPERATING PILLARS</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
                STRATEGIC <span className="text-rose glow-rose">HORIZON.</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-chrome max-w-md leading-relaxed">
              Establishing VISTAS ACM as an internationally recognized innovation hub pioneering research in AI, robotics, cyber defense, and distributed computing systems.
            </p>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'BUILD',
                subtitle: 'Practical Engineering',
                desc: 'Turning theoretical concepts into resilient prototypes, production codebases, and functional hardware systems.',
                icon: Code,
                color: 'cerulean'
              },
              {
                title: 'LEAD',
                subtitle: 'Empowered Ownership',
                desc: 'Providing every member the autonomy, resources, and platform to lead initiatives, teams, and technical domains.',
                icon: Award,
                color: 'rose'
              },
              {
                title: 'CREATE',
                subtitle: 'Inventive Curiosity',
                desc: 'Encouraging bold experimentation, algorithmic curiosity, and creative problem solving across all disciplines.',
                icon: Cpu,
                color: 'cerulean'
              },
              {
                title: 'CONNECT',
                subtitle: 'Unified Community',
                desc: 'Cultivating bonds that link students across departments, academic years, alumni networks, and global ACM chapters.',
                icon: Users,
                color: 'rose'
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="hud-card p-5 rounded-xl border-cerulean/20 hover:border-cerulean/60 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-jet border border-cerulean/30 flex items-center justify-center text-cerulean group-hover:text-rose transition-colors mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white tracking-wider uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <div className="font-mono text-[10px] text-cerulean tracking-widest uppercase mb-2">
                    {pillar.subtitle}
                  </div>
                  <p className="font-sans text-xs text-chrome leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
