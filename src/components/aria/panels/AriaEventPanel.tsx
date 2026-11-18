import React from 'react';
import { EventItem } from '../../../types';
import { EVENTS_DATA } from '../../../data/chapterData';
import { Calendar, MapPin, Tag, ArrowUpRight, Flame } from 'lucide-react';
import { soundEngine } from '../../../audio/soundEngine';

interface AriaEventPanelProps {
  events?: EventItem[];
  onSelectEvent?: (event: EventItem) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const AriaEventPanel: React.FC<AriaEventPanelProps> = ({
  events = EVENTS_DATA,
  onSelectEvent,
  onNavigateSection
}) => {
  return (
    <div className="hud-card p-4 rounded-xl border-cerulean/30 space-y-3 bg-[#071322]/90 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2 border-b border-cerulean/20">
        <div className="flex items-center gap-2 font-mono text-[11px] text-cerulean tracking-widest uppercase">
          <Flame className="w-3.5 h-3.5 text-rose animate-pulse" />
          <span>HOLOGRAPHIC EVENT TELEMETRY</span>
        </div>
        <span className="font-mono text-[10px] text-chrome/50">{events.length} ACTIVE INITIATIVES</span>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {events.map((evt) => (
          <div
            key={evt.id}
            onClick={() => {
              soundEngine.playClick();
              onSelectEvent?.(evt);
              onNavigateSection?.('events');
            }}
            className="p-2.5 rounded-lg bg-black/40 border border-cerulean/15 hover:border-cerulean/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-bold text-white group-hover:text-cerulean transition-colors uppercase">
                {evt.title}
              </span>
              <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                evt.status === 'upcoming' ? 'bg-cerulean/20 text-cerulean border border-cerulean/30' :
                evt.status === 'ongoing' ? 'bg-rose/20 text-rose border border-rose/30 animate-pulse' :
                'bg-white/10 text-chrome'
              }`}>
                {evt.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-chrome/60 mt-1.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cerulean" />
                {evt.event_date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose" />
                {evt.venue}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-cerulean/15 flex justify-end">
        <button
          onClick={() => onNavigateSection?.('events')}
          className="cyber-btn-blue text-[10px] px-3 py-1 rounded inline-flex items-center gap-1"
        >
          <span>OPEN EVENTS CONSOLE</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
