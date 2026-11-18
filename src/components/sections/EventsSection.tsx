import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { EventItem } from '../../types';
import { fetchLiveEvents } from '../../data/supabaseClient';
import { EVENTS_DATA } from '../../data/chapterData';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Clock,
  Search,
  Filter,
  X,
  CheckCircle2,
  AlertCircle,
  Timer,
  ChevronRight,
  Sparkles,
  UserCheck
} from 'lucide-react';

// Countdown calculation helper
function calculateTimeRemaining(targetDate: string) {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPast: false
  };
}

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Quick Registration Form State inside Modal
  const [regForm, setRegForm] = useState({ name: '', email: '', department: 'CSE', year: '2nd Year' });
  const [regSubmitted, setRegSubmitted] = useState<boolean>(false);
  const [regError, setRegError] = useState<string>('');

  // Live countdown ticker state
  const [, setTick] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchLiveEvents().then((data) => {
      if (data && data.length > 0) {
        setEvents(data);
      }
    });
  }, []);

  const handleOpenModal = (evt: EventItem) => {
    soundEngine.playHologramActivate();
    setSelectedEvent(evt);
    setRegSubmitted(false);
    setRegError('');
  };

  const handleCloseModal = () => {
    soundEngine.playClick();
    setSelectedEvent(null);
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name.trim() || !regForm.email.trim()) {
      setRegError('Please provide your name and email address.');
      soundEngine.playClick();
      return;
    }
    soundEngine.playHologramActivate();
    setRegSubmitted(true);
    setRegError('');
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const filteredEvents = events.filter((evt) => {
    const matchesCat = activeCategory === 'all' || evt.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesStatus = activeStatus === 'all' || evt.status.toLowerCase() === activeStatus.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      evt.title.toLowerCase().includes(query) ||
      evt.description.toLowerCase().includes(query) ||
      evt.venue.toLowerCase().includes(query) ||
      evt.category.toLowerCase().includes(query);
    return matchesCat && matchesStatus && matchesQuery;
  });

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-[#050505]">
      {/* Anchor */}
      <div id="launches" className="absolute top-0 pointer-events-none" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>CHAPTER EVENTS // MISSION LAUNCHES</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-rose font-bold">VERIFIED ACM SCHEDULE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              MAKE <span className="text-cerulean glow-blue">SOMETHING.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-1.5">
            <p className="font-sans text-sm md:text-base text-white leading-relaxed font-semibold">
              Workshops, talks, hackathons and community moments are where ideas meet people.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
              Explore the chapter schedule, register for hands-on sessions, and collaborate with computing peers.
            </p>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="hud-card p-5 rounded-2xl bg-[#0B1018]/90 border-cerulean/25 backdrop-blur-md space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cerulean absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events by title, topic, or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050505] border border-cerulean/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/50 focus:outline-none focus:border-cerulean transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5ADBA] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#050505] border border-cerulean/20 font-mono text-xs">
              {[
                { id: 'all', label: 'ALL' },
                { id: 'upcoming', label: 'UPCOMING' },
                { id: 'ongoing', label: 'ONGOING' },
                { id: 'completed', label: 'COMPLETED' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveStatus(st.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeStatus === st.id
                      ? 'bg-cerulean text-white font-bold shadow-[0_0_10px_rgba(0,123,255,0.4)]'
                      : 'text-[#A5ADBA] hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cerulean/15">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'Hackathon', label: 'Hackathons' },
                { id: 'Competition', label: 'Competitions' },
                { id: 'Workshop', label: 'Workshops' },
                { id: 'Tech Talk', label: 'Tech Talks & Outreach' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveCategory(tab.id);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-cerulean text-white font-bold shadow-[0_0_12px_rgba(0,123,255,0.4)]'
                      : 'bg-[#050505] text-[#A5ADBA] hover:text-white border border-cerulean/20 hover:border-cerulean/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs text-[#A5ADBA]/70">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'EVENT' : 'EVENTS'} FOUND
            </span>
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const countdown = calculateTimeRemaining(evt.event_date);
            const isHackathon = evt.category === 'Hackathon';

            return (
              <motion.div
                key={evt.id}
                whileHover={{ y: -6 }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`hud-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group bg-[#0B1018]/90 backdrop-blur-md transition-all ${
                  isHackathon
                    ? 'border-rose/40 shadow-hologram-rose hover:border-rose'
                    : 'border-cerulean/25 shadow-hologram-blue hover:border-cerulean/60'
                }`}
              >
                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cerulean/15">
                    <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold uppercase ${
                      isHackathon
                        ? 'bg-rose/15 border border-rose/40 text-rose'
                        : 'bg-cerulean/15 border border-cerulean/40 text-cerulean'
                    }`}>
                      {evt.category}
                    </span>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/80">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="uppercase">{evt.status}</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-cerulean transition-colors">
                    {evt.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed mb-5">
                    {evt.description}
                  </p>

                  {/* Countdown Timer Widget for upcoming events */}
                  {!countdown.isPast && (
                    <div className="p-3 rounded-xl bg-[#050505] border border-cerulean/20 font-mono text-center mb-5">
                      <div className="text-[10px] text-cerulean uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                        <Timer className="w-3 h-3 text-rose animate-spin" style={{ animationDuration: '6s' }} />
                        <span>TIME UNTIL LAUNCH</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-white font-bold text-xs sm:text-sm">
                        <div className="bg-[#0B1018] p-1.5 rounded border border-white/5">
                          <span>{String(countdown.days).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-[#A5ADBA] font-normal">DAYS</span>
                        </div>
                        <div className="bg-[#0B1018] p-1.5 rounded border border-white/5">
                          <span>{String(countdown.hours).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-[#A5ADBA] font-normal">HRS</span>
                        </div>
                        <div className="bg-[#0B1018] p-1.5 rounded border border-white/5">
                          <span>{String(countdown.minutes).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-[#A5ADBA] font-normal">MIN</span>
                        </div>
                        <div className="bg-[#0B1018] p-1.5 rounded border border-white/5">
                          <span className="text-rose">{String(countdown.seconds).padStart(2, '0')}</span>
                          <span className="block text-[8px] text-[#A5ADBA] font-normal">SEC</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="space-y-1.5 pt-4 border-t border-cerulean/15 font-mono text-xs text-[#A5ADBA] mb-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cerulean" />
                      <span>{formatDate(evt.event_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenModal(evt)}
                      className="py-2.5 px-3 rounded-lg bg-[#0B1018] border border-cerulean/40 hover:border-cerulean text-white font-mono text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:bg-cerulean/10"
                    >
                      <span>DETAILS</span>
                      <ChevronRight className="w-3.5 h-3.5 text-cerulean" />
                    </button>

                    <a
                      href={evt.registration_url || "https://www.instagram.com/vistas_acm/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn-blue py-2.5 px-3 rounded-lg font-mono text-xs font-bold text-center flex items-center justify-center gap-1.5"
                    >
                      <span>REGISTER</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredEvents.length === 0 && (
          <div className="hud-card p-12 rounded-2xl text-center space-y-3 bg-[#0B1018]/90 border-cerulean/20">
            <AlertCircle className="w-8 h-8 text-rose mx-auto" />
            <h3 className="font-heading text-xl font-bold text-white uppercase">No Events Found</h3>
            <p className="font-sans text-xs text-[#A5ADBA] max-w-sm mx-auto">
              No chapter events match your current filter query. Try selecting another category or clearing your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveStatus('all');
              }}
              className="px-4 py-2 rounded-lg bg-cerulean text-white font-mono text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* =========================================================
          EVENT DETAIL & REGISTRATION MODAL
      ========================================================= */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-cerulean/40 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-cerulean/30 hover:border-white text-[#A5ADBA] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cerulean/15 border border-cerulean/30 text-cerulean font-mono text-xs font-bold uppercase mb-2">
                  <span>{selectedEvent.category}</span>
                  <span>·</span>
                  <span className="text-white">{selectedEvent.status}</span>
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
                  {selectedEvent.title}
                </h3>
              </div>

              {/* Event Description */}
              <p className="font-sans text-sm sm:text-base text-[#A5ADBA] leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Event Schedule & Location Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0B1018] border border-cerulean/20 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-cerulean uppercase block">DATE & TIME</span>
                  <div className="flex items-center gap-1.5 text-white font-semibold mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-cerulean" />
                    <span>{formatDate(selectedEvent.event_date)}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-rose uppercase block">OFFICIAL VENUE</span>
                  <div className="flex items-center gap-1.5 text-white font-semibold mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose" />
                    <span className="truncate">{selectedEvent.venue}</span>
                  </div>
                </div>
              </div>

              {/* Registration Form / Status Confirmation */}
              <div className="p-5 rounded-xl bg-[#0B1018]/90 border border-cerulean/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-cerulean" />
                    <span>Quick Chapter Registration</span>
                  </h4>
                  <span className="text-[10px] font-mono text-rose uppercase font-semibold">FREE FOR STUDENTS</span>
                </div>

                {regSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h5 className="font-heading text-lg font-bold text-white uppercase">Registration Received!</h5>
                    <p className="font-sans text-xs text-[#A5ADBA]">
                      Thank you, <span className="text-white font-semibold">{regForm.name}</span>. Your seat reservation has been recorded for <span className="text-cerulean font-semibold">{selectedEvent.title}</span>. Follow <span className="text-rose font-bold">@vistas_acm</span> for final entry updates.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegSubmit} className="space-y-3">
                    {regError && (
                      <div className="p-2 rounded bg-rose/10 border border-rose/30 text-rose font-mono text-xs">
                        {regError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-[#A5ADBA] uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          placeholder="Student Name"
                          className="w-full bg-[#050505] border border-cerulean/30 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-[#A5ADBA] uppercase mb-1">College Email</label>
                        <input
                          type="email"
                          required
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          placeholder="student@vistas.ac.in"
                          className="w-full bg-[#050505] border border-cerulean/30 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] text-[#A5ADBA] uppercase mb-1">Department</label>
                        <input
                          type="text"
                          value={regForm.department}
                          onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                          className="w-full bg-[#050505] border border-cerulean/30 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cerulean"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-[#A5ADBA] uppercase mb-1">Year of Study</label>
                        <select
                          value={regForm.year}
                          onChange={(e) => setRegForm({ ...regForm, year: e.target.value })}
                          className="w-full bg-[#050505] border border-cerulean/30 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cerulean"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="cyber-btn-blue flex-1 py-2.5 rounded-lg font-mono text-xs font-bold text-center cursor-pointer shadow-hologram-blue"
                      >
                        CONFIRM EVENT SEAT
                      </button>

                      <a
                        href={selectedEvent.registration_url || "https://www.instagram.com/vistas_acm/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-lg bg-rose/20 border border-rose text-rose hover:text-white hover:bg-rose font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>INSTAGRAM</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
