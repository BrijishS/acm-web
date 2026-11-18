import React from 'react';
import { ACTUAL_TEAM_MEMBERS, TeamMember } from '../../../data/teamData';
import { Shield, ArrowUpRight, Linkedin, Github, ExternalLink } from 'lucide-react';
import { soundEngine } from '../../../audio/soundEngine';

interface AriaCrewPanelProps {
  crew?: TeamMember[];
  onNavigateSection?: (sectionId: string) => void;
}

export const AriaCrewPanel: React.FC<AriaCrewPanelProps> = ({
  crew = ACTUAL_TEAM_MEMBERS,
  onNavigateSection
}) => {
  return (
    <div className="hud-card p-4 rounded-xl border-cerulean/30 space-y-3 bg-[#071322]/90 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 border-b border-cerulean/20">
        <div className="flex items-center gap-2 font-mono text-[11px] text-cerulean tracking-widest uppercase">
          <Shield className="w-3.5 h-3.5 text-cerulean animate-pulse" />
          <span>LEADERSHIP DOSSIER</span>
        </div>
        <span className="font-mono text-[10px] text-chrome/50">16 VERIFIED LEADERS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
        {crew.slice(0, 8).map((member) => (
          <div
            key={member.id}
            onClick={() => onNavigateSection?.('crew')}
            className="p-2 rounded-lg bg-black/40 border border-cerulean/15 hover:border-cerulean/60 transition-all cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-cerulean/40 flex-shrink-0 bg-[#0B1018]">
              <img
                src={member.image_url}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/vistas-acm-blue-logo.jpg';
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-heading text-xs font-bold text-white group-hover:text-cerulean transition-colors truncate block">
                {member.name}
              </span>
              <span className="font-mono text-[9px] text-chrome/60 truncate block uppercase">
                {member.designation}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-cerulean/15 flex justify-end">
        <button
          onClick={() => {
            soundEngine.playClick();
            onNavigateSection?.('crew');
          }}
          className="cyber-btn-blue text-[10px] px-3 py-1 rounded inline-flex items-center gap-1"
        >
          <span>VIEW FULL 16-MEMBER CREW</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
