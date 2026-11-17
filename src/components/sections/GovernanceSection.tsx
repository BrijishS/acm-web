import React from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { Shield, BookOpen, Scale, Award, CheckCircle, FileText, Landmark } from 'lucide-react';

export const GovernanceSection: React.FC = () => {
  return (
    <section id="governance" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15 bg-jet">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <Landmark className="w-4 h-4 text-rose" />
              <span>06 // CHAPTER GOVERNANCE & CONSTITUTION</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              COUNCIL & <span className="text-cerulean glow-blue">GOVERNANCE.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            Formal institutional and professional charter ensuring adherence to the Association for Computing Machinery (ACM) Code of Ethics and academic standards.
          </p>
        </div>

        {/* Governance Structure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Faculty Sponsorship & Advisory */}
          <div className="hud-card p-6 rounded-xl border-cerulean/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-wider uppercase mb-3 font-semibold">
                <Award className="w-4 h-4 text-cerulean" />
                <span>ACADEMIC SPONSORSHIP</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2">
                FACULTY COORDINATION
              </h3>
              <p className="font-sans text-xs md:text-sm text-chrome/80 leading-relaxed mb-4">
                Guided by senior faculty leadership at the School of Engineering, VISTAS Chennai, ensuring research alignment, institutional funding, and campus laboratory access.
              </p>
            </div>
            <div className="pt-4 border-t border-cerulean/15 font-mono text-xs text-chrome/60">
              <span className="text-[10px] uppercase block text-chrome/40">SPONSOR CONTACT</span>
              <span className="text-white font-medium">{CHAPTER_INFO.facultyCoordinatorEmail}</span>
            </div>
          </div>

          {/* ACM Constitution & Global Bylaws */}
          <div className="hud-card p-6 rounded-xl border-cerulean/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cerulean tracking-wider uppercase mb-3 font-semibold">
                <Scale className="w-4 h-4 text-rose" />
                <span>ETHICS & BYLAWS</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2">
                ACM CODE OF ETHICS
              </h3>
              <p className="font-sans text-xs md:text-sm text-chrome/80 leading-relaxed mb-4">
                Strict adherence to the ACM Global Code of Ethics and Professional Conduct, championing computing inclusivity, algorithmic fairness, and data privacy.
              </p>
            </div>
            <div className="pt-4 border-t border-cerulean/15 font-mono text-xs text-chrome/60">
              <span className="text-[10px] uppercase block text-chrome/40">AFFILIATION</span>
              <span className="text-cerulean font-medium">ACM India Student Council</span>
            </div>
          </div>

          {/* Autonomous Student Executive Structure */}
          <div className="hud-card-rose p-6 rounded-xl border-rose/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-rose tracking-wider uppercase mb-3 font-semibold">
                <Shield className="w-4 h-4 text-cerulean" />
                <span>CHAPTER AUTONOMY</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2">
                EXECUTIVE COMMITTEE
              </h3>
              <p className="font-sans text-xs md:text-sm text-chrome/80 leading-relaxed mb-4">
                Structured with an elected student leadership core managing chapter technical operations, event coordination, domain cells, and digital communication.
              </p>
            </div>
            <div className="pt-4 border-t border-rose/15 font-mono text-xs text-chrome/60">
              <span className="text-[10px] uppercase block text-chrome/40">LEADERSHIP CADENCE</span>
              <span className="text-rose font-medium">Annual Democratic Election</span>
            </div>
          </div>
        </div>

        {/* Charter Accreditation Banner */}
        <div className="p-6 rounded-xl bg-jet-surface border border-cerulean/25 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cerulean animate-ping" />
            <div>
              <span className="text-white font-bold tracking-wider block">OFFICIAL CHAPTER CHARTER VERIFIED</span>
              <span className="text-chrome/50 text-[11px]">VISTAS ACM · CHARTERED ON MAY 19, 2025</span>
            </div>
          </div>

          <div className="text-right text-[11px] text-chrome/60">
            <span>VELS INSTITUTE OF SCIENCE, TECHNOLOGY AND ADVANCED STUDIES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
