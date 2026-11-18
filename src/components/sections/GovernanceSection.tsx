import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import {
  CHAPTER_INFO,
  COMMITTEE_RESPONSIBILITIES,
  DETAILED_COMMITTEE_FUNCTIONS,
  GOVERNANCE_STAGES
} from '../../data/chapterData';
import {
  Landmark,
  Shield,
  Award,
  CheckCircle2,
  FileText,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  GitCommit
} from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  return (
    <section id="governance" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-[#020408]">
      {/* Blueprint coordinate grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(14,35,71,0.5)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <Landmark className="w-4 h-4 text-rose" />
              <span>CHAPTER GOVERNANCE // COMMAND STRUCTURE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              COMMAND <span className="text-cerulean glow-blue">STRUCTURE.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-lg leading-relaxed">
            The chapter is supported by a Faculty Advisor and a team of student office bearers. The student committee plans, organizes and coordinates professional, technical and co-curricular activities under the Faculty Advisor's guidance.
          </p>
        </div>

        {/* Executive Oversight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Faculty Advisory */}
          <div className="hud-card p-6 sm:p-7 rounded-2xl border-cerulean/30 flex flex-col justify-between bg-[#030611]/90 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cerulean tracking-wider uppercase mb-3 font-semibold">
                <Award className="w-4 h-4 text-cerulean" />
                <span>FACULTY ADVISORY</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2">
                MR. N. UDAYAKUMAR
              </h3>
              <p className="font-sans text-xs sm:text-sm text-chrome/80 leading-relaxed mb-4">
                Assistant Professor, Department of Computer Science and Engineering. Provides overall guidance, departmental coordination, and monitors documentation and progress.
              </p>
            </div>
            <div className="pt-4 border-t border-cerulean/15 font-mono text-xs text-chrome/60">
              <span className="text-[10px] uppercase block text-chrome/40">COORDINATION EMAIL</span>
              <span className="text-white font-medium">{CHAPTER_INFO.facultyCoordinatorEmail}</span>
            </div>
          </div>

          {/* Student Committee Leadership */}
          <div className="hud-card p-6 sm:p-7 rounded-2xl border-cerulean/30 flex flex-col justify-between bg-[#030611]/90 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-wider uppercase mb-3 font-semibold">
                <Users className="w-4 h-4 text-rose" />
                <span>STUDENT LEADERSHIP</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2">
                EXECUTIVE COUNCIL
              </h3>
              <p className="font-sans text-xs sm:text-sm text-chrome/80 leading-relaxed mb-4">
                Guided by the Student Chairperson, Vice Chairperson, Secretary, Treasurer, Webmaster, and functional domain heads overseeing chapter initiatives.
              </p>
            </div>
            <div className="pt-4 border-t border-cerulean/15 font-mono text-xs text-chrome/60">
              <span className="text-[10px] uppercase block text-chrome/40">ACADEMIC YEAR</span>
              <span className="text-cerulean font-medium">2026–2027</span>
            </div>
          </div>

          {/* Professional Affiliation */}
          <div className="hud-card p-6 sm:p-7 rounded-2xl border-rose/30 flex flex-col justify-between bg-[#030611]/90 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-wider uppercase mb-3 font-semibold">
                <Shield className="w-4 h-4 text-rose" />
                <span>PROFESSIONAL SOCIETY</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2">
                ACM AFFILIATION
              </h3>
              <p className="font-sans text-xs md:text-sm text-chrome/80 leading-relaxed mb-4">
                Chartered student chapter under the Association for Computing Machinery (ACM), adhering to professional standards, ethical computing, and lifelong learning.
              </p>
            </div>
            <div className="pt-4 border-t border-rose/15 font-mono text-xs text-chrome/60">
              <span className="text-[10px] uppercase block text-chrome/40">ACM CHAPTER GROUP ID</span>
              <span className="text-rose font-medium">199704</span>
            </div>
          </div>
        </div>

        {/* Section 1: Functions of the Student Committee (07 Responsibilities) */}
        <div className="hud-card p-6 sm:p-10 rounded-3xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-xl space-y-6">
          <div className="border-b border-cerulean/15 pb-4">
            <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-bold block mb-1">
              FUNCTIONS OF THE STUDENT COMMITTEE // 07 PILLARS
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
              COMMITTEE RESPONSIBILITIES
            </h3>
            <p className="font-sans text-xs sm:text-sm text-chrome/80 mt-1 max-w-2xl">
              The committee plans, coordinates, implements and monitors professional, technical, research-oriented and student development activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {COMMITTEE_RESPONSIBILITIES.map((resp, i) => (
              <div
                key={i}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-4 rounded-xl bg-[#071329]/80 border border-cerulean/20 hover:border-cerulean/50 transition-colors flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-cerulean bg-cerulean/10 px-2 py-0.5 rounded border border-cerulean/30 flex-shrink-0">
                  0{i + 1}
                </span>
                <p className="font-sans text-xs sm:text-sm text-chrome/90 leading-relaxed">
                  {resp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Detailed Committee Functions (10 Functions) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-cerulean/15">
            <div>
              <span className="font-mono text-xs text-rose tracking-widest uppercase font-bold block mb-1">
                OPERATIONAL BREAKDOWN // 10 FUNCTIONS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
                DETAILED COMMITTEE FUNCTIONS
              </h3>
            </div>
            <span className="font-mono text-xs text-chrome/50">
              SPECIFICATION // ACM GROUP ID 199704
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DETAILED_COMMITTEE_FUNCTIONS.map((fn) => (
              <motion.div
                key={fn.number}
                whileHover={{ y: -4 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="hud-card p-5 rounded-xl border-cerulean/20 hover:border-cerulean/60 transition-colors flex flex-col justify-between group bg-[#030611]/90"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-cerulean/15">
                    <span className="font-mono text-xs font-bold text-cerulean bg-cerulean/10 px-2 py-0.5 rounded border border-cerulean/30">
                      FN-{fn.number}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-rose opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-heading text-base font-bold text-white uppercase tracking-wide mb-2 group-hover:text-cerulean transition-colors leading-snug">
                    {fn.title}
                  </h4>
                  <p className="font-sans text-xs text-chrome/80 leading-relaxed">
                    {fn.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Governance and Review (7 Stages) */}
        <div className="hud-card p-6 sm:p-10 rounded-3xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-xl space-y-8">
          <div className="border-b border-cerulean/15 pb-4">
            <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-bold block mb-1">
              QUALITY ASSURANCE // 07 STAGES
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
              GOVERNANCE AND REVIEW PROCESS
            </h3>
            <p className="font-sans text-xs sm:text-sm text-chrome/80 mt-1 max-w-2xl">
              A structured review mechanism involving the Faculty Advisor, Student Chairperson, office bearers and functional heads ensuring continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {GOVERNANCE_STAGES.map((stg) => (
              <div
                key={stg.stage}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-4 rounded-xl bg-[#071329]/80 border border-cerulean/20 hover:border-cerulean/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-rose font-bold bg-rose/10 px-2 py-0.5 rounded border border-rose/30">
                      STAGE 0{stg.stage}
                    </span>
                    <GitCommit className="w-3.5 h-3.5 text-cerulean" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wide mb-2 leading-tight">
                    {stg.title}
                  </h4>
                  <p className="font-sans text-[11px] text-chrome/75 leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Accreditation Banner */}
        <div className="p-6 rounded-2xl bg-[#071329] border border-cerulean/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cerulean animate-ping" />
            <div>
              <span className="text-white font-bold tracking-wider block">OFFICIAL CHAPTER STATUS ACTIVE · IN GOOD STANDING</span>
              <span className="text-chrome/50 text-[11px]">Department of Computer Science and Engineering · School of Engineering, VISTAS</span>
            </div>
          </div>

          <div className="text-right text-[11px] text-cerulean font-bold">
            <span>ACM CHAPTER GROUP ID: 199704 · AY 2026–2027</span>
          </div>
        </div>
      </div>
    </section>
  );
};
