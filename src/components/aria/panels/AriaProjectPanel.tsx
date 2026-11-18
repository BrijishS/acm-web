import React from 'react';
import { PROJECTS_DATA } from '../../../data/chapterData';
import { ProjectItem } from '../../../types';
import { Cpu, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { soundEngine } from '../../../audio/soundEngine';

interface AriaProjectPanelProps {
  projects?: ProjectItem[];
  onNavigateSection?: (sectionId: string) => void;
}

export const AriaProjectPanel: React.FC<AriaProjectPanelProps> = ({
  projects = PROJECTS_DATA,
  onNavigateSection
}) => {
  return (
    <div className="hud-card p-4 rounded-xl border-cerulean/30 space-y-3 bg-[#071322]/90 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 border-b border-cerulean/20">
        <div className="flex items-center gap-2 font-mono text-[11px] text-cerulean tracking-widest uppercase">
          <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>STUDENT PAYLOAD SPECS</span>
        </div>
        <span className="font-mono text-[10px] text-chrome/50">3 ACTIVE BUILDS</span>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onNavigateSection?.('projects')}
            className="p-2.5 rounded-lg bg-black/40 border border-cerulean/15 hover:border-cerulean/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-white group-hover:text-cerulean transition-colors uppercase">
                {proj.title}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PAYLOAD
              </span>
            </div>

            <p className="font-sans text-[11px] text-chrome/70 line-clamp-2 mt-1">
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {proj.tags?.slice(0, 3).map((tech: string, i: number) => (
                <span key={i} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-cerulean border border-cerulean/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-cerulean/15 flex justify-end">
        <button
          onClick={() => {
            soundEngine.playClick();
            onNavigateSection?.('projects');
          }}
          className="cyber-btn-blue text-[10px] px-3 py-1 rounded inline-flex items-center gap-1"
        >
          <span>INSPECT ALL PAYLOADS</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
