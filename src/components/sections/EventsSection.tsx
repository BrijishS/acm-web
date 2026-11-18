import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { EventItem } from '../../types';
import { fetchLiveEvents } from '../../data/supabaseClient';
import { EVENTS_DATA } from '../../data/chapterData';
import { Calendar, MapPin, ExternalLink, Sparkles, Clock, Compass, Users } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Hackathon' | 'Workshop' | 'Competition' | 'Tech Talk'>('all');

  useEffect(() => {
    fetchLiveEvents().then((data) => {
      if (data && data.length > 0) {
        setEvents(data);
      }
    });
  }, []);

  const handleFilterChange = (filter: 'all' | 'Hackathon' | 'Workshop' | 'Competition' | 'Tech Talk') => {
    soundEngine.playClick();
    setActiveFilter(filter);
  };

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    return evt.category === activeFilter;
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-[#020408]">
      <div id="launches" className="absolute top-0 pointer-events-none" />
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(14,35,71,0.45)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>CHAPTER EVENTS // LAUNCH SCHEDULE</span>
              <span className="text-chrome/30">·</span>
              <span className="text-[#FF3B9D] font-bold">EXPLORE THE PROGRAM</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              MAKE <span className="text-cerulean glow-blue">SOMETHING.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <p className="font-sans text-sm md:text-base text-white leading-relaxed font-semibold">
              Workshops, talks, and community moments are where ideas meet people.
            </p>
            <p className="font-sans text-xs sm:text-sm text-chrome/80 leading-relaxed">
              Ideas become experiences. A space to learn, build and connect.
            </p>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cerulean/15">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All events (06)' },
              { id: 'Hackathon', label: 'Hackathons' },
              { id: 'Competition', label: 'Competitions' },
              { id: 'Workshop', label: 'Workshops' },
              { id: 'Tech Talk', label: 'Tech Talks & Outreach' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id as typeof activeFilter)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#38BDF8] text-[#030611] font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'bg-[#071329] text-chrome hover:text-white border border-cerulean/20 hover:border-cerulean/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-chrome/50">
            SHOWING {filteredEvents.length} OF {events.length} EVENTS
          </span>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hud-card p-6 sm:p-7 rounded-2xl border-cerulean/25 hover:border-cerulean/60 transition-all flex flex-col justify-between group bg-[#030611]/90 backdrop-blur-md shadow-hologram-blue"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                  <span className="px-2.5 py-0.5 rounded bg-rose/15 border border-rose/30 text-rose font-mono text-[11px] font-bold uppercase">
                    {evt.category}
                  </span>
                  <span className="font-mono text-[10px] text-cerulean uppercase px-2 py-0.5 rounded bg-cerulean/10 border border-cerulean/30">
                    {evt.attendeesEstimate || 'UPCOMING'}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-cerulean transition-colors">
                  {evt.title}
                </h3>

                <p className="font-sans text-sm text-chrome/90 leading-relaxed mb-6">
                  {evt.description}
                </p>
              </div>

              <div>
                <div className="space-y-2 pt-4 border-t border-cerulean/15 font-mono text-xs text-chrome/60 mb-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cerulean" />
                    <span>{formatDate(evt.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                <a
                  href={evt.registration_url || "https://www.instagram.com/vistas_acm/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn-blue w-full py-2.5 rounded-lg font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  <span>UPDATES @VISTAS_ACM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
