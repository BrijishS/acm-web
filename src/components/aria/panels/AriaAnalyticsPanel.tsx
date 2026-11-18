import React from 'react';
import { CHAPTER_INFO, MEMBERSHIP_DATA } from '../../../data/chapterData';
import { Award, CheckCircle2, ShieldCheck, Users, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../../../audio/soundEngine';

interface AriaAnalyticsPanelProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const AriaAnalyticsPanel: React.FC<AriaAnalyticsPanelProps> = ({ onNavigateSection }) => {
  return (
    <div className="hud-card p-4 rounded-xl border-cerulean/30 space-y-3 bg-[#071322]/90 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 border-b border-cerulean/20">
        <div className="flex items-center gap-2 font-mono text-[11px] text-cerulean tracking-widest uppercase">
          <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>CHAPTER STANDING & ANALYTICS</span>
        </div>
        <span className="font-mono text-[10px] text-chrome/50">GROUP ID: 199704</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="p-2.5 rounded-lg bg-black/40 border border-cerulean/20">
          <span className="font-mono text-[9px] text-chrome/50 uppercase block">ACTIVE INTERFACE</span>
          <span className="font-heading text-xl font-black text-white">{MEMBERSHIP_DATA.activeMembersInInterface}</span>
          <span className="font-mono text-[8px] text-cerulean block mt-0.5">Recorded Cadence</span>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-cerulean/20">
          <span className="font-mono text-[9px] text-chrome/50 uppercase block">ACTIVE ACM MEMBERS</span>
          <span className="font-heading text-xl font-black text-white">{MEMBERSHIP_DATA.activeAcmMembers}</span>
          <span className="font-mono text-[8px] text-rose block mt-0.5">Chapter Direct</span>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="font-sans text-[10px] text-chrome/80 leading-relaxed">
          {MEMBERSHIP_DATA.status}
        </p>
      </div>

      <div className="pt-2 border-t border-cerulean/15 flex justify-end">
        <button
          onClick={() => {
            soundEngine.playClick();
            onNavigateSection?.('achievements');
          }}
          className="cyber-btn-blue text-[10px] px-3 py-1 rounded inline-flex items-center gap-1"
        >
          <span>VIEW FULL VERIFIED RECORD</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
