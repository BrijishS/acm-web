import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { CHAPTER_INFO } from '../../data/chapterData';
import { Send, MapPin, Mail, Instagram, CheckCircle2, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branchYear: '',
    domainInterest: 'AI & Machine Learning',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.branchYear.trim()) {
      setErrorMsg('Please complete all mandatory fields.');
      soundEngine.playClick();
      return;
    }

    soundEngine.playHologramActivate();
    setErrorMsg('');
    setSubmitted(true);

    // Format transmission mailto
    const subject = encodeURIComponent(`VISTAS ACM Interest: ${formData.name}`);
    const body = encodeURIComponent(
      `VISTAS ACM CONTACT SUBMISSION\n` +
      `--------------------------------------------------\n` +
      `Name: ${formData.name}\n` +
      `College Email: ${formData.email}\n` +
      `Branch & Year: ${formData.branchYear}\n` +
      `Interested in: ${formData.domainInterest}\n\n` +
      `Message:\n${formData.message || "I'd like to take part in VISTAS ACM."}\n` +
      `--------------------------------------------------\n` +
      `Sent via VISTAS ACM Website`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-cerulean/15 bg-[#020408]">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(14,35,71,0.45)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cerulean/15">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cerulean tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-cerulean rounded-full animate-ping" />
              <span>CONTACT CHAPTER</span>
              <span className="text-chrome/30">·</span>
              <span className="text-[#FF3B9D] font-bold">@VISTAS_ACM</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider">
              FIND YOUR <span className="text-cerulean glow-blue">WAY IN.</span>
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-chrome max-w-md leading-relaxed font-semibold">
            Have a question, an event idea, or a project to share? Reach out to the chapter team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Official Chapter Info & Unconfirmed status markers */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="hud-card p-6 md:p-8 rounded-2xl border-cerulean/30 bg-[#030611]/90 backdrop-blur-md space-y-6">
              <div>
                <span className="font-mono text-xs text-rose tracking-widest uppercase font-semibold block mb-2">
                  CONNECT WITH US
                </span>
                <h3 className="font-heading text-3xl font-black text-white uppercase tracking-wide mb-2">
                  Let's make something.
                </h3>
                <p className="font-sans text-sm text-chrome/90 leading-relaxed">
                  Tell us what you're curious about and how you'd like to take part.
                </p>
              </div>

              {/* Verified Contact Details */}
              <div className="space-y-4 pt-4 border-t border-cerulean/15 font-mono text-xs">
                {/* Instagram */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-jet border border-rose/30 text-rose mt-0.5 shadow-[0_0_10px_rgba(255,59,157,0.2)]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-chrome/50 uppercase block text-[10px]">INSTAGRAM</span>
                    <a
                      href={CHAPTER_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose hover:underline font-semibold text-sm block"
                    >
                      {CHAPTER_INFO.instagramHandle} ↗
                    </a>
                  </div>
                </div>

                {/* Email (Marked To be confirmed) */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-jet border border-cerulean/30 text-cerulean mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-chrome/50 uppercase block text-[10px]">CHAPTER EMAIL</span>
                    <span className="text-white block font-medium">
                      To be confirmed
                    </span>
                    <span className="text-chrome/40 text-[10px] block mt-0.5">
                      Connect via Instagram @vistas_acm
                    </span>
                  </div>
                </div>

                {/* Campus Headquarters (Marked To be confirmed) */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-jet border border-cerulean/30 text-cerulean mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-chrome/50 uppercase block text-[10px]">DEPARTMENT / CAMPUS</span>
                    <span className="text-white block font-medium">
                      Department of Computer Science and Engineering
                    </span>
                    <span className="text-chrome/70 text-[11px] block mt-0.5">
                      School of Engineering, VISTAS
                    </span>
                    <span className="text-chrome/50 text-[10px] block mt-0.5">
                      Campus office: To be confirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="bg-[#071329] border border-cerulean/20 rounded-xl p-4 flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-2 text-cerulean">
                <ShieldCheck className="w-4 h-4 text-rose" />
                ACM GROUP ID: 199704
              </span>
              <span className="text-chrome/50">AY 2026–2027</span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 hud-card p-6 md:p-8 rounded-2xl border-cerulean/40 shadow-hologram-blue bg-[#030611]/95 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-cerulean/20 mb-6">
              <span className="font-mono text-xs text-cerulean tracking-widest uppercase font-semibold">
                JOIN THE CHAPTER FORM
              </span>
              <span className="font-mono text-[10px] text-rose uppercase tracking-wider font-bold">
                VISTAS ACM
              </span>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cerulean/15 border border-cerulean mx-auto flex items-center justify-center text-cerulean shadow-hologram-blue">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-3xl font-bold text-white uppercase tracking-wider">
                  MESSAGE PREPARED
                </h4>
                <p className="font-sans text-sm text-chrome max-w-md mx-auto leading-relaxed">
                  Your message has been formatted into your email client. Thank you for reaching out to VISTAS ACM!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="cyber-btn-blue px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose/15 border border-rose/40 text-rose text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      College email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@vistas.edu"
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      Branch and year *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.branchYear}
                      onChange={(e) => setFormData({ ...formData, branchYear: e.target.value })}
                      placeholder="e.g. CSE / 2nd Year"
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                      Interested in
                    </label>
                    <select
                      value={formData.domainInterest}
                      onChange={(e) => setFormData({ ...formData, domainInterest: e.target.value })}
                      className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded-lg px-3 py-2.5 text-xs text-white outline-none font-mono"
                    >
                      <option>AI & Machine Learning</option>
                      <option>Web & App Development</option>
                      <option>Cybersecurity</option>
                      <option>Data & Cloud</option>
                      <option>Emerging Tech</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-chrome/70 tracking-wider uppercase block mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're curious about and how you'd like to take part..."
                    className="w-full bg-jet border border-cerulean/30 focus:border-cerulean rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-chrome/30 outline-none font-mono leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="cyber-btn-rose w-full py-3.5 rounded-lg text-xs font-bold tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-2 uppercase shadow-hologram-rose"
                >
                  <Send className="w-4 h-4" />
                  <span>Join the chapter</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
