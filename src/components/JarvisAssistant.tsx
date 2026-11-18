import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { AssistantMessage } from '../types';
import { ASSISTANT_KNOWLEDGE, CHAPTER_INFO } from '../data/chapterData';
import { Bot, Send, X, Sparkles, Compass, Radio, Cpu, Volume2, VolumeX, Shield, HelpCircle } from 'lucide-react';

interface JarvisAssistantProps {
  onNavigateSection: (sectionId: string) => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const JarvisAssistant: React.FC<JarvisAssistantProps> = ({
  onNavigateSection,
  isSoundMuted,
  onToggleSound
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-0',
      sender: 'jarvis',
      text: `Greetings. I am the ACM DIGITAL ASSISTANT for VISTAS ACM Student Chapter (Group ID 199704). How may I assist your mission exploration today?`,
      timestamp: 'ONLINE',
      suggestions: [
        'Explore 5 Domains',
        'Upcoming Events & Hackathon',
        'Meet Chapter Crew',
        'How to Join ACM',
        'Student Projects'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleOpen = () => {
    soundEngine.playJarvisChirp();
    setIsOpen(!isOpen);
  };

  const handleSend = (userText: string) => {
    const query = userText.trim();
    if (!query) return;

    soundEngine.playClick();

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Knowledge matching logic
    setTimeout(() => {
      soundEngine.playHologramActivate();
      const lower = query.toLowerCase();

      if (lower.includes('domain') || lower.includes('technology') || lower.includes('ai') || lower.includes('cyber') || lower.includes('cloud') || lower.includes('web')) {
        respond(
          "VISTAS ACM focuses on 5 official technical domains: 1) AI & Machine Learning, 2) Web & App Development, 3) Cybersecurity, 4) Data & Cloud, and 5) Emerging Tech (IoT, AR/VR, Blockchain).",
          ['View Technical Domains', 'Student Projects', 'Join Chapter'],
          'domains'
        );
      } else if (lower.includes('event') || lower.includes('hackathon') || lower.includes('launch') || lower.includes('vel') || lower.includes('cipher') || lower.includes('brawl')) {
        respond(
          "Our verified calendar features 6 core initiatives: Hack the Vel (24-hour hackathon, Dec 18), Cipher Quest (cryptic hunt, Nov 20), Byte Brawl (coding sprint, Nov 28), Neural Nights (AI workshop, Dec 5), Pixel Forge (design sprint, Dec 12), and Orbit Outreach (school outreach, Dec 22).",
          ['Explore Event Schedule', 'Follow @vistas_acm'],
          'events'
        );
      } else if (lower.includes('team') || lower.includes('crew') || lower.includes('chairperson') || lower.includes('udayakumar') || lower.includes('brijish') || lower.includes('leader')) {
        respond(
          "The chapter operates under Faculty Advisor Mr. N. Udayakumar (Assistant Professor, Dept. of CSE) and Student Chairperson Mr. Brijish S, alongside 15 dedicated student office bearers across Executive, Technical, Creative, and Media committees.",
          ['Meet Our Crew', 'View Governance Structure'],
          'crew'
        );
      } else if (lower.includes('project') || lower.includes('payload') || lower.includes('companion') || lower.includes('vault') || lower.includes('rural')) {
        respond(
          "Current student payloads include: PAYLOAD-01: Campus Companion (VISTAS campus hub), PAYLOAD-02: Exam Vault (smart academic archive), and PAYLOAD-03: Rural Learn Kit (offline-friendly educational tools).",
          ['Inspect Projects', 'Technical Domains'],
          'projects'
        );
      } else if (lower.includes('join') || lower.includes('membership') || lower.includes('register') || lower.includes('apply')) {
        respond(
          "Students across the School of Engineering can join VISTAS ACM. Membership offers access to technical workshops, hackathons, ACM digital resources, and student leadership opportunities. Use our membership form or connect on Instagram @vistas_acm.",
          ['Open Membership Form', 'Contact Chapter'],
          'join'
        );
      } else if (lower.includes('timeline') || lower.includes('history') || lower.includes('founded') || lower.includes('milestone')) {
        respond(
          "VISTAS ACM was chartered under Group ID 199704 in October 2026. In November 2026, the ACM Chapter Program Manager confirmed the chapter in Good Standing with complete activity records and documentation.",
          ['View Chapter Timeline', 'Governance Details'],
          'timeline'
        );
      } else if (lower.includes('vistas') || lower.includes('location') || lower.includes('vels') || lower.includes('department') || lower.includes('address')) {
        respond(
          "VISTAS ACM is based at the Department of Computer Science and Engineering, School of Engineering, Vels Institute of Science, Technology and Advanced Studies (VISTAS), Pallavaram, Chennai, Tamil Nadu 600117, India.",
          ['About Chapter', 'Contact Channel'],
          'about'
        );
      } else if (lower.includes('achievement') || lower.includes('stats') || lower.includes('standing')) {
        respond(
          "Key chapter achievements: ACM Chapter Group ID 199704, 16 Council Leadership Members, 5 Technical Domains, and official Good Standing status verified by ACM headquarters.",
          ['View Achievements', 'Explore ACM'],
          'achievements'
        );
      } else {
        // Strict boundary adherence rule: do not invent information
        respond(
          "I do not have verified chapter records regarding that specific inquiry. You can query our technical domains, upcoming events, crew members, student payloads, or reach out to the committee directly.",
          ['Technical Domains', 'Upcoming Events', 'Meet Crew', 'Contact Chapter']
        );
      }
      setIsTyping(false);
    }, 550);
  };

  const respond = (text: string, suggestions?: string[], actionTarget?: string) => {
    const reply: AssistantMessage = {
      id: `ai-${Date.now()}`,
      sender: 'jarvis',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions,
      actionTarget
    };
    setMessages((prev) => [...prev, reply]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    soundEngine.playClick();
    if (suggestion.includes('Domains')) onNavigateSection('domains');
    else if (suggestion.includes('Event')) onNavigateSection('events');
    else if (suggestion.includes('Projects') || suggestion.includes('Payload')) onNavigateSection('projects');
    else if (suggestion.includes('Crew') || suggestion.includes('Team')) onNavigateSection('crew');
    else if (suggestion.includes('Join') || suggestion.includes('Membership')) onNavigateSection('join');
    else if (suggestion.includes('Timeline')) onNavigateSection('timeline');
    else if (suggestion.includes('Governance')) onNavigateSection('about');
    else if (suggestion.includes('Achievements')) onNavigateSection('achievements');
    else if (suggestion.includes('Contact')) onNavigateSection('contact');
    else handleSend(suggestion);
  };

  return (
    <>
      {/* Floating Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleOpen}
          onMouseEnter={() => soundEngine.playHover()}
          className="relative w-14 h-14 rounded-full bg-[#050505] border-2 border-cerulean shadow-[0_0_25px_rgba(0,123,255,0.6)] flex items-center justify-center text-cerulean hover:scale-105 transition-transform cursor-pointer group"
          aria-label="Open ACM Digital Assistant"
          title="ACM Digital Assistant"
        >
          {/* Pulsing beacon ring */}
          <span className="absolute -inset-1 rounded-full border border-cerulean/50 animate-ping pointer-events-none opacity-50" />
          <Bot className="w-6 h-6 text-cerulean group-hover:text-rose transition-colors" />

          {/* Active online green dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050505] shadow-[0_0_8px_#34d399]" />
        </button>
      </div>

      {/* Expandable Assistant Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full sm:max-w-md h-[85vh] sm:h-[650px] bg-[#050505] border border-cerulean/40 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-[#0B1018] border-b border-cerulean/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-cerulean p-1 bg-[#050505] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cerulean" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider flex items-center gap-1.5 leading-none">
                      <span>ACM DIGITAL ASSISTANT</span>
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>MISSION INTELLIGENCE // ONLINE</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={onToggleSound}
                    className="p-1.5 rounded-lg border border-cerulean/30 text-cerulean hover:text-white"
                    title={isSoundMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isSoundMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleOpen}
                    className="p-1.5 rounded-lg border border-white/20 text-[#A5ADBA] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs sm:text-sm">
                {messages.map((msg) => {
                  const isAi = msg.sender === 'jarvis';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl ${
                          isAi
                            ? 'bg-[#0B1018] border border-cerulean/30 text-white shadow-hologram-blue'
                            : 'bg-cerulean text-white font-medium shadow-[0_0_15px_rgba(0,123,255,0.4)]'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                        {/* Direct action target button */}
                        {msg.actionTarget && (
                          <button
                            onClick={() => {
                              onNavigateSection(msg.actionTarget!);
                              setIsOpen(false);
                            }}
                            className="mt-3 px-3 py-1.5 rounded-lg bg-cerulean/20 hover:bg-cerulean text-cerulean hover:text-white border border-cerulean font-mono text-xs font-bold transition-all block w-full text-center cursor-pointer"
                          >
                            NAVIGATE TO SECTION ↗
                          </button>
                        )}
                      </div>

                      <span className="font-mono text-[9px] text-[#A5ADBA]/60 mt-1 px-1">
                        {msg.timestamp}
                      </span>

                      {/* Suggestions Chips */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                          {msg.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(sug)}
                              className="px-2.5 py-1 rounded-full bg-[#0B1018] border border-cerulean/30 hover:border-cerulean text-cerulean hover:text-white font-mono text-[10px] tracking-wider transition-colors cursor-pointer"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-cerulean font-mono text-xs p-2">
                    <span className="w-2 h-2 rounded-full bg-cerulean animate-ping" />
                    <span>Synthesizing response...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#0B1018] border-t border-cerulean/20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about domains, events, crew, membership..."
                    className="flex-1 bg-[#050505] border border-cerulean/30 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-[#A5ADBA]/40 focus:outline-none focus:border-cerulean"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-cerulean hover:bg-cerulean/80 text-white cursor-pointer shadow-[0_0_12px_rgba(0,123,255,0.4)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
