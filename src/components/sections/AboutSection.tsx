import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import {
  ABOUT_DATA,
  CHAPTER_INFO,
  CHAPTER_OBJECTIVES,
  MEMBERSHIP_DATA,
  VISION_MISSION
} from '../../data/chapterData';
import {
  Compass,
  Code,
  Share2,
  Sparkles,
  Target,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Globe,
  Award,
  UserCheck,
  CheckCircle
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div id="about" className="relative border-t border-cerulean/15">
      {/* =========================================================
          PART 1: CURIOSITY MAKES / LEARN IT. MAKE IT REAL.
      ========================================================= */}
      <section className="py-24 px-4 sm:px-6 md:px-8 bg-[#020408]">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(14,35,71,0.45)_0%,transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
                <span>ABOUT VISTAS ACM</span>
                <span className="text-chrome/30">·</span>
                <span className="text-[#FF3B9D] font-bold">GROUP ID: 199704</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
                {ABOUT_DATA.title}
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-chrome max-w-lg leading-relaxed font-semibold">
              {ABOUT_DATA.lead}
            </p>
          </div>

          {/* Learn it. Make it real. Subtitle + 3 Action Pillars: Explore / Make / Share */}
          <div className="space-y-8">
            <div className="text-center sm:text-left">
              <span className="font-mono text-xs text-rose tracking-[0.25em] uppercase font-bold block mb-1">
                THE THREE PATHWAYS
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
                {ABOUT_DATA.subheading}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ABOUT_DATA.pillars.map((pillar, idx) => {
                const isMake = pillar.id === 'make';
                return (
                  <motion.div
                    key={pillar.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`hud-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between group bg-[#030611]/90 backdrop-blur-md ${
                      isMake ? 'border-rose/40 shadow-hologram-rose' : 'border-cerulean/30 shadow-hologram-blue'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-6 border-b border-cerulean/15">
                        <span className="font-mono text-xs text-chrome/50 tracking-widest uppercase">
                          STEP 0{idx + 1}
                        </span>
                        <div className={`p-2.5 rounded-lg border ${
                          isMake
                            ? 'border-rose/50 bg-[#FF3B9D]/10 text-rose'
                            : 'border-cerulean/50 bg-[#38BDF8]/10 text-cerulean'
                        }`}>
                          {pillar.id === 'explore' && <Compass className="w-5 h-5" />}
                          {pillar.id === 'make' && <Code className="w-5 h-5" />}
                          {pillar.id === 'share' && <Share2 className="w-5 h-5" />}
                        </div>
                      </div>

                      <h4 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wider uppercase mb-3 group-hover:text-cerulean transition-colors">
                        {pillar.title}
                      </h4>

                      <p className="font-sans text-sm sm:text-base text-chrome/90 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-cerulean/15 flex items-center justify-between text-xs font-mono text-cerulean group-hover:text-white transition-colors">
                      <span className="tracking-wider uppercase">CORE PILLAR</span>
                      <ArrowUpRight className="w-4 h-4 text-rose" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Ideas into impact: Discover, Experiment, Collaborate, Contribute */}
          <div className="hud-card p-8 sm:p-10 md:p-12 rounded-3xl border-cerulean/40 shadow-hologram-blue bg-[#030611]/95 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-cerulean/20">
              <div>
                <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-semibold block mb-2">
                  FROM CONCEPT TO EXECUTION
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider">
                  {ABOUT_DATA.ideasHeading}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {ABOUT_DATA.coreValues.map((val, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-xl bg-[#071329] border border-cerulean/30 font-mono text-xs text-white font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cerulean" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Tenet */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2 font-mono text-xs text-chrome/70">
                <ShieldCheck className="w-4 h-4 text-cerulean" />
                <span>CHAPTER OPERATING TENET:</span>
              </div>
              <div className="font-heading text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cerulean via-white to-rose tracking-wider uppercase">
                {ABOUT_DATA.tenet}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PART 2: CHAPTER PROFILE & WHO WE ARE (#profile)
      ========================================================= */}
      <section id="profile" className="py-24 px-4 sm:px-6 md:px-8 bg-[#030611] border-t border-cerulean/15">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
                <Globe className="w-4 h-4 text-rose" />
                <span>CHAPTER PROFILE // INSTITUTIONAL FOUNDATION</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
                WHO WE <span className="text-cerulean glow-blue">ARE.</span>
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
              Affiliated with the Association for Computing Machinery (ACM), operating under the Department of Computer Science and Engineering, School of Engineering, VISTAS Chennai.
            </p>
          </div>

          {/* Primary Chamber: Who We Are & About ACM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left (Col 1-7): Chapter Profile */}
            <div className="lg:col-span-7 hud-card p-6 md:p-8 rounded-2xl border-cerulean/30 space-y-5 bg-[#030611]/90 backdrop-blur-md">
              <div className="flex items-center gap-2.5 font-mono text-xs text-cerulean tracking-widest uppercase font-semibold">
                <Globe className="w-4 h-4 text-cerulean" />
                <span>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</span>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                GUIDED BY FACULTY, DRIVEN BY STUDENTS.
              </h3>

              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed">
                The <strong className="text-white font-semibold">VISTAS ACM Student Chapter</strong> functions under the Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS), and is affiliated with the Association for Computing Machinery (ACM).
              </p>

              <p className="font-sans text-sm text-chrome/90 leading-relaxed">
                It provides a platform for students to engage with computing-related professional activities, technical learning, peer interaction and professional networking.
              </p>

              {/* Emerging Technologies Platform Points */}
              <div className="pt-2">
                <span className="font-mono text-xs text-[#FF3B9D] tracking-wider uppercase block mb-3 font-bold">
                  PLATFORM ACTIVITIES & COMPETENCY BUILDING:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Workshops',
                    'Guest lectures',
                    'Seminars',
                    'Hackathons',
                    'Coding competitions',
                    'Research activities',
                    'Professional development'
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-[#071329] border border-cerulean/20 font-mono text-[11px] text-chrome flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cerulean" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-chrome/80 leading-relaxed pt-2">
                It operates under the guidance of the Faculty Advisor, supported by student office bearers and functional heads who coordinate activities throughout the academic year.
              </p>

              {/* Official Credentials Badge */}
              <div className="pt-4 border-t border-cerulean/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-mono text-[9px] text-chrome/50 uppercase block">GROUP ID</span>
                  <span className="font-mono text-xs font-bold text-cerulean">199704</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-mono text-[9px] text-chrome/50 uppercase block">ACADEMIC YEAR</span>
                  <span className="font-mono text-xs font-bold text-white">2026–2027</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-mono text-[9px] text-chrome/50 uppercase block">SCHOOL</span>
                  <span className="font-mono text-xs font-bold text-white truncate">Engineering</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-mono text-[9px] text-chrome/50 uppercase block">DEPARTMENT</span>
                  <span className="font-mono text-xs font-bold text-[#FF3B9D] truncate">CSE</span>
                </div>
              </div>
            </div>

            {/* Right (Col 8-12): About ACM */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="hud-card p-6 md:p-8 rounded-2xl border-cerulean/30 flex-1 flex flex-col justify-between bg-[#030611]/90 backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-wider uppercase mb-3">
                    <Award className="w-4 h-4 text-rose" />
                    <span>PROFESSIONAL SOCIETY</span>
                  </div>

                  <h4 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-3">
                    ASSOCIATION FOR COMPUTING MACHINERY
                  </h4>

                  <p className="font-sans text-sm text-chrome/90 leading-relaxed mb-4">
                    <strong className="text-white">ACM</strong> is an international professional organization serving computing educators, researchers, industry professionals and students.
                  </p>

                  <div className="mb-4">
                    <span className="font-mono text-xs text-cerulean tracking-wider uppercase block mb-2 font-semibold">
                      ADVANCING COMPUTING THROUGH:
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-chrome/90">
                      {[
                        'Professional networking',
                        'Technical publications',
                        'Conferences',
                        'Educational resources',
                        'Knowledge-sharing'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#FF3B9D]">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="font-sans text-xs text-chrome/80 leading-relaxed">
                    Through its student chapters, ACM gives students opportunities to interact with computing professionals, learn about emerging technologies, take part in technical events and develop professional and leadership skills.
                  </p>
                </div>

                <div className="pt-4 border-t border-cerulean/15 flex items-center justify-between text-xs font-mono text-chrome/50 mt-4">
                  <span>FACULTY ADVISOR</span>
                  <span className="text-white font-semibold">Mr. N. Udayakumar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purpose and Objectives (07 Pillars) */}
          <div className="hud-card p-6 md:p-10 rounded-2xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-cerulean/20 gap-4">
              <div>
                <span className="font-mono text-xs text-[#FF3B9D] tracking-widest uppercase font-bold block mb-1">
                  PURPOSE & OBJECTIVES // 07 PILLARS
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
                  BRIDGING ACADEMIC LEARNING & PROFESSIONAL PRACTICE.
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHAPTER_OBJECTIVES.map((obj, i) => (
                <div
                  key={i}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="p-4 rounded-xl bg-[#071329]/80 border border-cerulean/20 flex items-start gap-3.5 hover:border-cerulean/60 transition-colors"
                >
                  <span className="font-mono text-xs font-bold text-cerulean bg-cerulean/10 px-2 py-1 rounded border border-cerulean/30 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-chrome/90 leading-relaxed">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Information */}
          <div className="hud-card p-6 md:p-8 rounded-2xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-3">
              <UserCheck className="w-4 h-4 text-rose" />
              <span>OFFICIAL MEMBERSHIP STATUS & TELEMETRY</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-3">
              CHAPTER MEMBERSHIP OVERVIEW
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#071329] border border-cerulean/20 text-center">
                <span className="font-mono text-[10px] text-chrome/50 uppercase block mb-1">ACTIVE MEMBERS DISPLAYED</span>
                <span className="font-heading text-3xl font-extrabold text-white">{MEMBERSHIP_DATA.activeMembersInInterface}</span>
                <span className="font-mono text-[9px] text-chrome/40 block mt-1">In ACM Interface</span>
              </div>
              <div className="p-4 rounded-xl bg-[#071329] border border-cerulean/20 text-center">
                <span className="font-mono text-[10px] text-chrome/50 uppercase block mb-1">ACTIVE ACM MEMBERS</span>
                <span className="font-heading text-3xl font-extrabold text-white">{MEMBERSHIP_DATA.activeAcmMembers}</span>
                <span className="font-mono text-[9px] text-chrome/40 block mt-1">Chapter Cadence</span>
              </div>
              <div className="p-4 rounded-xl bg-[#071329] border border-cerulean/20 text-center">
                <span className="font-mono text-[10px] text-chrome/50 uppercase block mb-1">ORIGINAL MEMBERS LISTED</span>
                <span className="font-heading text-3xl font-extrabold text-white">{MEMBERSHIP_DATA.originalMembersInAdmin}</span>
                <span className="font-mono text-[9px] text-chrome/40 block mt-1">Administrative Interface</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{MEMBERSHIP_DATA.status}</span>
              </div>
              <p className="font-sans text-xs text-chrome/80 leading-relaxed">
                {MEMBERSHIP_DATA.documentation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PART 3: VISION & MISSION (#vision)
      ========================================================= */}
      <section id="vision" className="py-20 px-4 sm:px-6 md:px-8 bg-[#020408] border-t border-cerulean/15">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase mb-2">
                <span className="w-1.5 h-1.5 bg-rose rounded-full animate-ping" />
                <span>VISION & MISSION // STRATEGIC HORIZON</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
                STRATEGIC <span className="text-rose glow-rose">HORIZON.</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-chrome max-w-md leading-relaxed">
              Shaping technically competent, ethical, and collaborative computing graduates through active engagement with ACM.
            </p>
          </div>

          {/* Dual Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VISION */}
            <div className="hud-card p-6 sm:p-8 rounded-2xl border-cerulean/30 space-y-3 bg-[#030611]/90 backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase font-bold">
                <Target className="w-4 h-4 text-cerulean" />
                <span>VISION</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wide">
                {VISION_MISSION.visionTitle}
              </h3>
              <p className="font-sans text-sm sm:text-base text-chrome/90 leading-relaxed">
                {VISION_MISSION.visionText}
              </p>
            </div>

            {/* MISSION */}
            <div className="hud-card-rose p-6 sm:p-8 rounded-2xl border-rose/30 space-y-3 bg-[#030611]/90 backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-widest uppercase font-bold">
                <Compass className="w-4 h-4 text-rose" />
                <span>MISSION</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wide">
                {VISION_MISSION.missionTitle}
              </h3>
              <p className="font-sans text-sm sm:text-base text-chrome/90 leading-relaxed">
                {VISION_MISSION.missionText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
