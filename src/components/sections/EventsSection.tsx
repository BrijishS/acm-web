import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { EventItem } from '../../types';
import { fetchLiveEvents } from '../../data/supabaseClient';
import { Calendar, MapPin, ExternalLink, Filter, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past' | 'Hackathon' | 'Workshop'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLiveEvents()
      .then((data) => setEvents(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleFilterChange = (filter: 'all' | 'upcoming' | 'past' | 'Hackathon' | 'Workshop') => {
    soundEngine.playClick();
    setActiveFilter(filter);
  };

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return evt.status === 'upcoming';
    if (activeFilter === 'past') return evt.status === 'completed';
    return evt.category === activeFilter;
  });

  const featuredEvent = events.find((e) => e.featured) || events[0];

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
    <section id="events" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>04 // EVENT COMMAND CENTER</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              OPERATIONS & <span className="text-cerulean glow-blue">HACKATHONS.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            High-velocity technical bootcamps, 24-hour innovation marathons, and symposiums bringing student builders face-to-face with industry reality.
          </p>
        </div>

        {/* Featured Flagship Event Spotlight */}
        {featuredEvent && (
          <div className="hud-card p-6 md:p-8 rounded-2xl border-cerulean/40 shadow-hologram-blue mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-6 py-1 bg-gradient-to-l from-rose to-transparent font-mono text-[10px] text-white tracking-widest font-bold uppercase">
              FLAGSHIP CHAPTER OPERATION
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-rose/20 border border-rose/40 text-rose font-mono text-xs font-bold uppercase">
                    {featuredEvent.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-cerulean">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(featuredEvent.event_date)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-chrome/60">
                    <MapPin className="w-3.5 h-3.5 text-rose" />
                    {featuredEvent.venue}
                  </span>
                </div>

                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider mb-3">
                  {featuredEvent.title}
                </h3>

                <p className="font-sans text-sm md:text-base text-chrome leading-relaxed mb-6">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {featuredEvent.registration_url && (
                    <a
                      href={featuredEvent.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn-rose px-6 py-3 rounded text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <span>REGISTER ON INSTAGRAM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {featuredEvent.attendeesEstimate && (
                    <span className="font-mono text-xs text-chrome/60">
                      TARGET CADENCE: <strong className="text-white">{featuredEvent.attendeesEstimate}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Holographic Radar Visual Element */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="relative w-44 h-44 rounded-full border border-cerulean/30 flex items-center justify-center p-3 animate-rotate-slow">
                  <div className="w-full h-full rounded-full border border-dashed border-rose/40 flex items-center justify-center">
                    <div className="text-center font-mono">
                      <span className="text-[10px] text-cerulean tracking-widest block">TELEMETRY</span>
                      <span className="text-lg font-bold text-white font-heading">ACTIVE</span>
                      <span className="text-[9px] text-rose block">VISTAS LABS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-cerulean/15">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Operations' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past Archives' },
              { id: 'Hackathon', label: 'Hackathons' },
              { id: 'Workshop', label: 'Workshops' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id as typeof activeFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-cerulean text-jet font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'bg-jet-surface text-chrome hover:text-white border border-cerulean/20 hover:border-cerulean/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-chrome/50">
            SHOWING {filteredEvents.length} OPERATIONS
          </span>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => {
            const isUpcoming = evt.status === 'upcoming';
            return (
              <div
                key={evt.id}
                onMouseEnter={() => soundEngine.playHover()}
                className="hud-card p-5 rounded-xl border-cerulean/20 hover:border-cerulean/60 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Status & Category Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                        isUpcoming
                          ? 'bg-rose/15 text-rose border border-rose/30'
                          : 'bg-chrome/10 text-chrome/70 border border-chrome/20'
                      }`}
                    >
                      {evt.status}
                    </span>
                    <span className="font-mono text-xs text-cerulean">{evt.category}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider mb-2 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="font-sans text-xs text-chrome/80 leading-relaxed mb-4 line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-cerulean/15">
                  <div className="flex items-center gap-2 text-xs font-mono text-chrome/60 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cerulean" />
                    <span>{formatDate(evt.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-chrome/60 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-rose" />
                    <span className="truncate">{evt.venue}</span>
                  </div>

                  {evt.registration_url && (
                    <a
                      href={evt.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn-blue w-full py-2 rounded text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>DETAILS & REGISTRATION</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
