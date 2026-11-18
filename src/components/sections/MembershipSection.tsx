import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO, DOMAINS_DATA } from '../../data/chapterData';
import { MembershipSubmission } from '../../types';
import { supabase } from '../../data/supabaseClient';
import {
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Globe,
  Award,
  Terminal,
  Send,
  Lock,
  AlertCircle,
  HelpCircle,
  Zap,
  Check
} from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    regNumber: '',
    department: 'Computer Science and Engineering',
    yearOfStudy: '2nd Year',
    domainsOfInterest: ['AI & Machine Learning'],
    statement: '',
    antiSpamAnswer: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<MembershipSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleDomain = (domainTitle: string) => {
    soundEngine.playClick();
    setFormData((prev) => {
      const exists = prev.domainsOfInterest.includes(domainTitle);
      return {
        ...prev,
        domainsOfInterest: exists
          ? prev.domainsOfInterest.filter((d) => d !== domainTitle)
          : [...prev.domainsOfInterest, domainTitle]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.regNumber.trim()) {
      setErrorMessage('Please complete all required fields.');
      soundEngine.playClick();
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid academic or personal email address.');
      soundEngine.playClick();
      return;
    }

    if (formData.domainsOfInterest.length === 0) {
      setErrorMessage('Please select at least one technical domain of interest.');
      soundEngine.playClick();
      return;
    }

    // Anti-spam math verification: 6 + 3 = 9
    if (formData.antiSpamAnswer.trim() !== '9') {
      setErrorMessage('Anti-spam verification failed. Please enter the correct sum for 6 + 3.');
      soundEngine.playClick();
      return;
    }

    setIsSubmitting(true);
    soundEngine.playHologramActivate();

    const submission: MembershipSubmission = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      department: formData.department,
      yearOfStudy: formData.yearOfStudy,
      domainsOfInterest: formData.domainsOfInterest,
      statement: formData.statement.trim() || 'Curious to learn and contribute to VISTAS ACM.',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    try {
      // 1. Save to local storage for persistence & Admin view
      const existing = JSON.parse(localStorage.getItem('vistas_membership_submissions') || '[]');
      existing.unshift(submission);
      localStorage.setItem('vistas_membership_submissions', JSON.stringify(existing));

      // 2. Attempt Supabase sync if table exists
      try {
        await supabase.from('membership_submissions').insert([{
          full_name: submission.fullName,
          email: submission.email,
          department: submission.department,
          year_of_study: submission.yearOfStudy,
          domains: submission.domainsOfInterest,
          statement: submission.statement,
          submitted_at: submission.submittedAt
        }]);
      } catch {
        // Fallback to local storage if table is not configured
      }

      setSubmissionSuccess(submission);
      soundEngine.playTelemetryBeep();
    } catch (err) {
      setErrorMessage('Could not record application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    soundEngine.playClick();
    setSubmissionSuccess(null);
    setFormData({
      fullName: '',
      email: '',
      regNumber: '',
      department: 'Computer Science and Engineering',
      yearOfStudy: '2nd Year',
      domainsOfInterest: ['AI & Machine Learning'],
      statement: '',
      antiSpamAnswer: ''
    });
  };

  const benefits = [
    {
      title: 'Technical Enrichment',
      description: 'Hands-on workshops, coding sprints, AI/ML hackathons, and software engineering bootcamps.',
      icon: BookOpen
    },
    {
      title: 'Professional Networking',
      description: 'Direct interactions with industry practitioners, researchers, and global ACM computing professionals.',
      icon: Globe
    },
    {
      title: 'Student Leadership',
      description: 'Opportunities to lead functional committees, organize university events, and direct technical projects.',
      icon: Award
    },
    {
      title: 'Collaborative Builds',
      description: 'Join cross-functional teams to engineer real student payloads, campus utilities, and research prototypes.',
      icon: Terminal
    }
  ];

  return (
    <section id="join" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/20 bg-transparent overflow-hidden">
      {/* Animated Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,123,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,123,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] animate-grid-drift pointer-events-none" />

      {/* Sweeping Laser Scan Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose/35 to-transparent pointer-events-none animate-laser-sweep" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <UserCheck className="w-4 h-4 text-rose" />
              <span>MEMBERSHIP INITIATION // CHAPTER ACCESS</span>
              <span className="text-[#A5ADBA]/40">·</span>
              <span className="text-cerulean font-bold">AY 2026–2027</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              JOIN <span className="text-cerulean glow-blue">VISTAS ACM.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-[#C0C0C0] max-w-md leading-relaxed font-semibold">
            Become a part of the official ACM Student Chapter. Build real tools, learn across 5 domains, and lead innovative technical initiatives.
          </p>
        </div>

        {/* Why Join ACM? Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="hud-card p-6 rounded-2xl border-cerulean/25 bg-[#0B1018]/90 backdrop-blur-md space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-cerulean/15 border border-cerulean/40 text-cerulean flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                  {b.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Membership Application Console */}
        <div className="hud-card p-6 sm:p-10 md:p-12 rounded-3xl border-cerulean/40 bg-[#0B1018]/95 backdrop-blur-xl shadow-hologram-blue">
          <div className="max-w-3xl mx-auto">
            {submissionSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="font-mono text-xs text-cerulean uppercase tracking-widest block mb-1">
                    SUBMISSION CONFIRMED // APPLICATION RECORDED
                  </span>
                  <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
                    Welcome, {submissionSuccess.fullName}!
                  </h3>
                  <div className="font-mono text-xs text-rose mt-2">
                    APPLICATION REFERENCE ID: <span className="font-bold">{submissionSuccess.id}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#050505] border border-cerulean/30 text-left font-mono text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#A5ADBA]">College Email:</span>
                    <span className="text-white font-semibold">{submissionSuccess.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#A5ADBA]">Department:</span>
                    <span className="text-white font-semibold">{submissionSuccess.department}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#A5ADBA]">Year of Study:</span>
                    <span className="text-white font-semibold">{submissionSuccess.yearOfStudy}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#A5ADBA]">Selected Domains:</span>
                    <span className="text-cerulean font-semibold">{submissionSuccess.domainsOfInterest.join(', ')}</span>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#A5ADBA] max-w-md mx-auto leading-relaxed">
                  Your application has been logged into the chapter administration roster. You will be invited to domain orientation briefings and technical sessions.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={handleResetForm}
                    className="cyber-btn-blue px-6 py-2.5 rounded-lg font-mono text-xs font-bold"
                  >
                    Submit Another Application
                  </button>

                  <a
                    href={CHAPTER_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-btn-rose px-6 py-2.5 rounded-lg font-mono text-xs font-bold"
                  >
                    Follow @vistas_acm ↗
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-1">
                    Student Membership Application
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#A5ADBA]">
                    Academic Year 2026–2027 · Open to students of the School of Engineering.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose/15 border border-rose/40 text-rose font-mono text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-cerulean uppercase mb-1 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brijish S"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#050505] border border-cerulean/30 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-cerulean uppercase mb-1 font-bold">
                      College Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@vistas.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050505] border border-cerulean/30 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                    />
                  </div>
                </div>

                {/* Roll Number, Department, Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-cerulean uppercase mb-1 font-bold">
                      Registration / Roll No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 231011001"
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      className="w-full bg-[#050505] border border-cerulean/30 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-cerulean uppercase mb-1 font-bold">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-[#050505] border border-cerulean/30 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cerulean"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-cerulean uppercase mb-1 font-bold">
                      Year of Study
                    </label>
                    <select
                      value={formData.yearOfStudy}
                      onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                      className="w-full bg-[#050505] border border-cerulean/30 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cerulean cursor-pointer"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>
                </div>

                {/* Domain Interests Selection */}
                <div>
                  <label className="block font-mono text-xs text-cerulean uppercase mb-2 font-bold">
                    Select Technical Domain Interests *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {DOMAINS_DATA.map((dom) => {
                      const isSelected = formData.domainsOfInterest.includes(dom.title);
                      return (
                        <button
                          key={dom.id}
                          type="button"
                          onClick={() => toggleDomain(dom.title)}
                          className={`p-3 rounded-xl border text-left text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-cerulean bg-cerulean/15 text-white font-bold shadow-[0_0_10px_rgba(0,123,255,0.3)]'
                              : 'border-[#1b2a47] bg-[#050505] text-[#A5ADBA] hover:border-cerulean/40'
                          }`}
                        >
                          <span>{dom.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-cerulean" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Statement of Interest */}
                <div>
                  <label className="block font-mono text-xs text-cerulean uppercase mb-1 font-bold">
                    Why do you want to join VISTAS ACM? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what technologies you are curious about or what you would like to build..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full bg-[#050505] border border-cerulean/30 rounded-xl p-3.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                  />
                </div>

                {/* Anti-spam Verification & Privacy Notice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                  <div className="p-3.5 rounded-xl bg-[#050505] border border-cerulean/20">
                    <label className="block font-mono text-[10px] text-rose uppercase mb-1 font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Security Check: What is 6 + 3? *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Answer in numbers"
                      value={formData.antiSpamAnswer}
                      onChange={(e) => setFormData({ ...formData, antiSpamAnswer: e.target.value })}
                      className="w-full bg-[#0B1018] border border-cerulean/30 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                    />
                  </div>

                  <div className="font-mono text-[10px] text-[#A5ADBA]/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-cerulean font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>PRIVACY PROTECTION NOTICE</span>
                    </div>
                    <p>
                      Your academic information is collected solely for chapter membership tracking and session announcements.
                    </p>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4 border-t border-cerulean/20">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-btn-blue w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-extrabold tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-hologram-blue"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING REGISTRATION...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-rose" />
                        <span>SUBMIT MEMBERSHIP REGISTRATION</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
