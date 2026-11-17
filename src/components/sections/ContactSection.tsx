import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { Send, MapPin, Mail, Instagram, CheckCircle2, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branchYear: '',
    domainInterest: 'Artificial Intelligence & ML',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.branchYear.trim()) {
      setErrorMsg('Please complete all mandatory telemetry fields.');
      soundEngine.playClick();
      return;
    }

    soundEngine.playHologramActivate();
    setErrorMsg('');
    setSubmitted(true);

    // Format mailto packet so the student's email app is populated with complete structured telemetry
    const subject = encodeURIComponent(`VISTAS ACM Chapter Membership / Inquiry: ${formData.name}`);
    const body = encodeURIComponent(
      `VISTAS ACM COMMAND CENTER - TRANSMISSION TELEMETRY\n` +
      `--------------------------------------------------\n` +
      `Candidate Name: ${formData.name}\n` +
      `College Email: ${formData.email}\n` +
      `Branch & Year: ${formData.branchYear}\n` +
      `Domain of Interest: ${formData.domainInterest}\n\n` +
      `Message / Objective:\n${formData.message || 'Ready to join the innovation network.'}\n` +
      `--------------------------------------------------\n` +
      `Transmitted from VISTAS ACM Command Center Portal`
    );

    window.location.href = `mailto:${CHAPTER_INFO.facultyCoordinatorEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 border-t border-cerulean/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>08 // COMMUNICATION TERMINAL</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wider">
              CONNECT & <span className="text-cerulean glow-blue">ENGAGE.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed">
            Transmit an inquiry, collaborate on research, or apply to join technical divisions across the VISTAS ACM network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Official Telemetry Info */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="hud-card p-6 md:p-8 rounded-xl border-cerulean/30">
              <span className="font-mono text-xs text-rose tracking-widest uppercase font-semibold block mb-2">
                OFFICIAL CHAPTER TRANSMISSION HUB
              </span>
              <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-wide mb-3">
                JOIN THE INNOVATION MISSION
              </h3>
              <p className="font-sans text-xs md:text-sm text-chrome leading-relaxed mb-6">
                Tell us what engineering domain sparks your curiosity. The chapter executive committee reviews membership applications and collaborative project proposals continuously.
              </p>

              {/* Verified Contact Details */}
              <div className="space-y-4 pt-4 border-t border-cerulean/15 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-jet border border-cerulean/30 text-cerulean mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-chrome/50 uppercase block text-[10px]">COORDINATOR EMAIL</span>
                    <a
                      href={`mailto:${CHAPTER_INFO.facultyCoordinatorEmail}`}
                      className="text-white hover:text-cerulean transition-colors font-semibold"
                    >
                      {CHAPTER_INFO.facultyCoordinatorEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-jet border border-rose/30 text-rose mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-chrome/50 uppercase block text-[10px]">OFFICIAL INSTAGRAM</span>
                    <a
                      href={CHAPTER_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose hover:underline font-semibold"
                    >
                      {CHAPTER_INFO.instagramHandle} ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-jet border border-cerulean/30 text-cerulean mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-chrome/50 uppercase block text-[10px]">CAMPUS HEADQUARTERS</span>
                    <span className="text-white block font-medium">
                      School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS)
                    </span>
                    <span className="text-chrome/60 text-[11px] block mt-0.5">
                      {CHAPTER_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="bg-jet-surface/90 border border-cerulean/20 rounded-xl p-4 flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-2 text-cerulean">
                <ShieldCheck className="w-4 h-4 text-rose" />
                STATUS: ACCEPTING TELEMETRY
              </span>
              <span className="text-chrome/50">2026/2027 CADENCE</span>
            </div>
          </div>

          {/* Right: Holographic Input Form */}
          <div className="lg:col-span-7 hud-card p-6 md:p-8 rounded-xl border-cerulean/40 shadow-hologram-blue">
            <div className="flex items-center justify-between pb-4 border-b border-cerulean/20 mb-6">
              <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-semibold">
                CANDIDATE DISPATCH TERMINAL
              </span>
              <span className="font-mono text-[10px] text-rose uppercase tracking-wider">
                PORT 443 // ENCRYPTED
              </span>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-cerulean/15 border border-cerulean mx-auto flex items-center justify-center text-cerulean mb-4 shadow-hologram-blue">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-3xl font-bold text-white uppercase tracking-wider mb-2">
                  TRANSMISSION DISPATCHED
                </h4>
                <p className="font-sans text-sm text-chrome max-w-md mx-auto mb-6">
                  Your details have been queued for coordinator review and formatted into your email client. Welcome to the innovation network!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="cyber-btn-blue px-6 py-2.5 rounded text-xs font-bold"
                >
                  DISPATCH ANOTHER PACKET
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded bg-rose/15 border border-rose/40 text-rose text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      COLLEGE EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@vistas.edu"
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      BRANCH & ACADEMIC YEAR *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.branchYear}
                      onChange={(e) => setFormData({ ...formData, branchYear: e.target.value })}
                      placeholder="e.g. CSE / 2nd Year"
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      DOMAIN OF INTEREST
                    </label>
                    <select
                      value={formData.domainInterest}
                      onChange={(e) => setFormData({ ...formData, domainInterest: e.target.value })}
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded px-3 py-2.5 text-xs text-white outline-none font-mono"
                    >
                      <option>Artificial Intelligence & ML</option>
                      <option>Web & Full-Stack Systems</option>
                      <option>Cybersecurity & Defense</option>
                      <option>Data Science & Cloud</option>
                      <option>Robotics & Hardware Labs</option>
                      <option>IoT & Smart Telemetry</option>
                      <option>App & Edge Ecosystems</option>
                      <option>Research & Innovation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                    TECHNICAL STATEMENT / GOALS
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly state your technical curiosity, projects you've built, or what you hope to innovate within VISTAS ACM..."
                    className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="cyber-btn-rose w-full py-3.5 rounded text-xs font-bold tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MEMBERSHIP PACKET ↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
