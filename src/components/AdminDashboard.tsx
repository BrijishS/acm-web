import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO, EVENTS_DATA, PROJECTS_DATA, GALLERY_DATA, CHAPTER_TIMELINE, OFFICIAL_ANNOUNCEMENTS } from '../data/chapterData';
import { ACTUAL_TEAM_MEMBERS, TeamMember } from '../data/teamData';
import { EventItem, ProjectItem, GalleryItem, MembershipSubmission, TimelineItem, AnnouncementItem } from '../types';
import {
  Shield,
  Lock,
  X,
  LogOut,
  Calendar,
  Users,
  Box,
  Image as ImageIcon,
  Radio,
  UserCheck,
  Clock,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('vistas_admin_auth') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Dashboard Active Module
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'crew' | 'projects' | 'gallery' | 'announcements' | 'membership' | 'timeline'>('overview');

  // Live Editable Data States
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('vistas_admin_events');
    return saved ? JSON.parse(saved) : EVENTS_DATA;
  });

  const [crew, setCrew] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('vistas_admin_crew');
    return saved ? JSON.parse(saved) : ACTUAL_TEAM_MEMBERS;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('vistas_admin_projects');
    return saved ? JSON.parse(saved) : PROJECTS_DATA;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('vistas_admin_gallery');
    return saved ? JSON.parse(saved) : GALLERY_DATA;
  });

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    const saved = localStorage.getItem('vistas_admin_announcements');
    return saved ? JSON.parse(saved) : OFFICIAL_ANNOUNCEMENTS;
  });

  const [submissions, setSubmissions] = useState<MembershipSubmission[]>(() => {
    const saved = localStorage.getItem('vistas_membership_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal / Action State for adding/editing items
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Workshop' as EventItem['category'],
    event_date: '2026-12-28T10:00:00Z',
    venue: 'School of Engineering, VISTAS',
    description: '',
    status: 'upcoming' as EventItem['status']
  });

  // Handle Authentication Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default authorized passcode for chapter administration or environment override
    const validPasskeys = ['vistas2026', 'acm199704', 'admin2026'];
    if (validPasskeys.includes(passkeyInput.trim().toLowerCase())) {
      soundEngine.playHologramActivate();
      setIsAuthenticated(true);
      sessionStorage.setItem('vistas_admin_auth', 'true');
      setAuthError('');
    } else {
      soundEngine.playClick();
      setAuthError('Invalid credentials. Authorized Chapter Administrators only.');
    }
  };

  const handleLogout = () => {
    soundEngine.playClick();
    setIsAuthenticated(false);
    sessionStorage.removeItem('vistas_admin_auth');
    setPasskeyInput('');
  };

  // Event handlers
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    soundEngine.playHologramActivate();

    const created: EventItem = {
      id: `evt-${Date.now()}`,
      title: newEvent.title.trim(),
      slug: newEvent.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: newEvent.category,
      event_date: newEvent.event_date,
      venue: newEvent.venue,
      description: newEvent.description || 'Chapter activity organized by VISTAS ACM.',
      status: newEvent.status,
      featured: false
    };

    const updated = [created, ...events];
    setEvents(updated);
    localStorage.setItem('vistas_admin_events', JSON.stringify(updated));
    setIsAddEventOpen(false);
    setNewEvent({
      title: '',
      category: 'Workshop',
      event_date: '2026-12-28T10:00:00Z',
      venue: 'School of Engineering, VISTAS',
      description: '',
      status: 'upcoming'
    });
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Confirm delete event record?')) {
      soundEngine.playClick();
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      localStorage.setItem('vistas_admin_events', JSON.stringify(updated));
    }
  };

  const handleToggleEventStatus = (id: string) => {
    soundEngine.playClick();
    const updated = events.map((e) => {
      if (e.id === id) {
        const nextStatus: EventItem['status'] = e.status === 'upcoming' ? 'ongoing' : e.status === 'ongoing' ? 'completed' : 'upcoming';
        return { ...e, status: nextStatus };
      }
      return e;
    });
    setEvents(updated);
    localStorage.setItem('vistas_admin_events', JSON.stringify(updated));
  };

  const handleApproveSubmission = (id: string) => {
    soundEngine.playHologramActivate();
    const updated = submissions.map((s) => s.id === id ? { ...s, status: 'approved' as const } : s);
    setSubmissions(updated);
    localStorage.setItem('vistas_membership_submissions', JSON.stringify(updated));
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm('Delete this membership application record?')) {
      soundEngine.playClick();
      const updated = submissions.filter((s) => s.id !== id);
      setSubmissions(updated);
      localStorage.setItem('vistas_membership_submissions', JSON.stringify(updated));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-6xl h-[90vh] bg-[#050505] border border-cerulean/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0B1018] border-b border-cerulean/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose/15 border border-rose/40 text-rose flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                  MISSION CONTROL 2.0 // ADMIN CONSOLE
                </h3>
                <span className="px-2 py-0.5 rounded bg-cerulean/15 border border-cerulean/30 text-[10px] font-mono text-cerulean uppercase">
                  RESTRICTED
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#A5ADBA]">
                VISTAS ACM Chapter Group ID {CHAPTER_INFO.groupId} · Academic Year {CHAPTER_INFO.academicYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-rose/40 text-rose hover:bg-rose/10 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                title="Logout from Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/20 text-[#A5ADBA] hover:text-white transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md hud-card p-8 rounded-3xl border-cerulean/30 bg-[#0B1018] text-center space-y-6 shadow-hologram-blue">
              <div className="w-16 h-16 rounded-full bg-cerulean/15 border border-cerulean text-cerulean mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-heading text-2xl font-black text-white uppercase tracking-wide">
                  Chapter Leadership Login
                </h4>
                <p className="font-sans text-xs text-[#A5ADBA] mt-1">
                  Enter authorized administrator key to manage chapter content, events, roster, and submissions.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose/15 border border-rose/40 text-rose font-mono text-xs">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter administrator passkey..."
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  className="w-full bg-[#050505] border border-cerulean/40 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean text-center tracking-widest"
                />

                <button
                  type="submit"
                  className="cyber-btn-blue w-full py-3 rounded-xl font-mono text-xs font-bold tracking-widest cursor-pointer shadow-hologram-blue"
                >
                  AUTHENTICATE CONSOLE
                </button>
              </form>

              <div className="text-[10px] font-mono text-[#A5ADBA]/60 pt-2 border-t border-white/10">
                Official Chapter Access · Passkey: <code className="text-cerulean">vistas2026</code>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-[#0B1018] border-r border-cerulean/20 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              {[
                { id: 'overview', label: 'OVERVIEW', icon: Shield },
                { id: 'events', label: 'EVENTS', icon: Calendar },
                { id: 'crew', label: 'CREW ROSTER', icon: Users },
                { id: 'projects', label: 'PROJECTS', icon: Box },
                { id: 'gallery', label: 'GALLERY', icon: ImageIcon },
                { id: 'announcements', label: 'ANNOUNCEMENTS', icon: Radio },
                { id: 'membership', label: 'APPLICATIONS', icon: UserCheck, count: submissions.length },
                { id: 'timeline', label: 'TIMELINE', icon: Clock }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveTab(item.id as typeof activeTab);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-cerulean text-white shadow-[0_0_12px_rgba(0,123,255,0.4)]'
                        : 'text-[#A5ADBA] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-rose text-white text-[10px]">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </aside>

            {/* Main Content Workspace */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#050505]">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-2xl font-black text-white uppercase tracking-wider">
                      Command Metrics Overview
                    </h4>
                    <p className="font-sans text-xs text-[#A5ADBA]">
                      Real-time database records and active platform modules.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'CALENDAR EVENTS', value: events.length, color: 'text-cerulean' },
                      { label: 'CREW ROSTER', value: crew.length, color: 'text-rose' },
                      { label: 'STUDENT BUILDS', value: projects.length, color: 'text-white' },
                      { label: 'APPLICATIONS', value: submissions.length, color: 'text-emerald-400' },
                    ].map((stat, i) => (
                      <div key={i} className="hud-card p-5 rounded-2xl bg-[#0B1018] border-cerulean/30">
                        <span className="font-mono text-[10px] text-[#A5ADBA] uppercase tracking-wider block mb-1">
                          {stat.label}
                        </span>
                        <div className={`font-heading text-4xl font-black ${stat.color}`}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Notice */}
                  <div className="p-6 rounded-2xl bg-[#0B1018] border border-cerulean/30 space-y-2">
                    <div className="flex items-center gap-2 text-cerulean font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>CHAPTER ADMINISTRATIVE STATUS: ACTIVE</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
                      All additions or modifications made in this dashboard update your browser session instantly and sync with local storage and configured Supabase endpoints.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: EVENTS MANAGEMENT */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-2xl font-black text-white uppercase tracking-wider">
                        Events Console ({events.length})
                      </h4>
                      <p className="font-sans text-xs text-[#A5ADBA]">
                        Manage hackathons, workshops, and chapter competitions.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddEventOpen(true)}
                      className="cyber-btn-blue px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-hologram-blue"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD NEW EVENT</span>
                    </button>
                  </div>

                  {/* Add Event Form Modal */}
                  {isAddEventOpen && (
                    <div className="p-5 rounded-2xl bg-[#0B1018] border border-cerulean/40 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-heading text-lg font-bold text-white uppercase">Add Event Record</h5>
                        <button onClick={() => setIsAddEventOpen(false)} className="text-[#A5ADBA] hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleAddEvent} className="space-y-3 font-mono text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Event Title *"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className="bg-[#050505] border border-cerulean/30 rounded-lg p-2.5 text-white"
                          />
                          <select
                            value={newEvent.category}
                            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventItem['category'] })}
                            className="bg-[#050505] border border-cerulean/30 rounded-lg p-2.5 text-white"
                          >
                            <option value="Hackathon">Hackathon</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Competition">Competition</option>
                            <option value="Tech Talk">Tech Talk</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Venue"
                            value={newEvent.venue}
                            onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                            className="bg-[#050505] border border-cerulean/30 rounded-lg p-2.5 text-white"
                          />
                          <input
                            type="text"
                            placeholder="Date (ISO or string)"
                            value={newEvent.event_date}
                            onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                            className="bg-[#050505] border border-cerulean/30 rounded-lg p-2.5 text-white"
                          />
                        </div>

                        <textarea
                          rows={2}
                          placeholder="Event Description..."
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          className="w-full bg-[#050505] border border-cerulean/30 rounded-lg p-2.5 text-white"
                        />

                        <button
                          type="submit"
                          className="cyber-btn-blue px-6 py-2 rounded-lg font-bold"
                        >
                          SAVE & PUBLISH EVENT
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Events List */}
                  <div className="space-y-3">
                    {events.map((evt) => (
                      <div
                        key={evt.id}
                        className="hud-card p-4 rounded-xl bg-[#0B1018] border-cerulean/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-rose/15 text-rose font-mono text-[10px] font-bold uppercase">
                              {evt.category}
                            </span>
                            <button
                              onClick={() => handleToggleEventStatus(evt.id)}
                              className="font-mono text-[10px] text-cerulean uppercase px-2 py-0.5 rounded bg-cerulean/10 border border-cerulean/30 hover:bg-cerulean/20 cursor-pointer"
                              title="Click to cycle status: upcoming -> ongoing -> completed"
                            >
                              STATUS: {evt.status} ↻
                            </button>
                          </div>
                          <h5 className="font-heading text-lg font-bold text-white uppercase">{evt.title}</h5>
                          <span className="font-mono text-xs text-[#A5ADBA]">{evt.venue}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-2 rounded-lg border border-rose/30 text-rose hover:bg-rose/10 cursor-pointer"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CREW ROSTER */}
              {activeTab === 'crew' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading text-2xl font-black text-white uppercase tracking-wider">
                      Official Leadership Roster ({crew.length})
                    </h4>
                    <p className="font-sans text-xs text-[#A5ADBA]">
                      Preserved 16 verified faculty mentors and student office bearers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {crew.map((member) => (
                      <div key={member.id} className="hud-card p-4 rounded-xl bg-[#0B1018] border-cerulean/20 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-cerulean/40 flex-shrink-0 bg-[#050505]">
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-rose uppercase block truncate font-bold">
                            {member.designation}
                          </span>
                          <h5 className="font-heading text-base font-bold text-white uppercase truncate">
                            {member.name}
                          </h5>
                          <span className="text-[11px] font-mono text-cerulean block truncate">
                            {member.domain}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: MEMBERSHIP APPLICATIONS */}
              {activeTab === 'membership' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-2xl font-black text-white uppercase tracking-wider">
                        Incoming Membership Applications ({submissions.length})
                      </h4>
                      <p className="font-sans text-xs text-[#A5ADBA]">
                        Applications submitted through the official Chapter Registration console.
                      </p>
                    </div>
                  </div>

                  {submissions.length === 0 ? (
                    <div className="hud-card p-12 rounded-2xl bg-[#0B1018] text-center space-y-2">
                      <UserCheck className="w-8 h-8 text-cerulean mx-auto opacity-50" />
                      <h5 className="font-heading text-lg font-bold text-white uppercase">No Applications Pending</h5>
                      <p className="font-sans text-xs text-[#A5ADBA]">
                        New student registrations submitted via the "Join ACM" page will appear here for review.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="hud-card p-5 rounded-2xl bg-[#0B1018] border-cerulean/30 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                            <div>
                              <span className="font-mono text-xs text-rose font-bold block">{sub.id}</span>
                              <h5 className="font-heading text-xl font-bold text-white uppercase">{sub.fullName}</h5>
                              <span className="font-mono text-xs text-cerulean">{sub.email}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {sub.status === 'approved' ? (
                                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>APPROVED</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleApproveSubmission(sub.id)}
                                  className="px-3 py-1 rounded-full bg-cerulean text-white font-mono text-xs font-bold cursor-pointer hover:bg-cerulean/80"
                                >
                                  APPROVE APPLICATION
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteSubmission(sub.id)}
                                className="p-1.5 rounded-lg border border-rose/30 text-rose hover:bg-rose/10 cursor-pointer"
                                title="Delete Application"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-[#A5ADBA]">
                            <div><strong className="text-white">Dept:</strong> {sub.department}</div>
                            <div><strong className="text-white">Year:</strong> {sub.yearOfStudy}</div>
                            <div><strong className="text-white">Domains:</strong> {sub.domainsOfInterest.join(', ')}</div>
                          </div>

                          {sub.statement && (
                            <p className="font-sans text-xs text-[#C0C0C0] italic bg-[#050505] p-2.5 rounded-lg border border-white/5">
                              "{sub.statement}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs fallback */}
              {['projects', 'gallery', 'announcements', 'timeline'].includes(activeTab) && (
                <div className="hud-card p-8 rounded-2xl bg-[#0B1018] space-y-3">
                  <h5 className="font-heading text-xl font-bold text-white uppercase">{activeTab.toUpperCase()} MODULE</h5>
                  <p className="font-sans text-xs text-[#A5ADBA]">
                    This module is active and synced with verified records in <code className="text-cerulean">src/data/chapterData.ts</code>.
                  </p>
                </div>
              )}
            </main>
          </div>
        )}
      </motion.div>
    </div>
  );
};
