import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { AssistantMessage } from '../types';
import { ASSISTANT_KNOWLEDGE, CHAPTER_INFO } from '../data/chapterData';
import { Bot, Send, X, Sparkles, Compass, Radio, Cpu, Volume2, VolumeX } from 'lucide-react';

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
      text: `Greetings. I am the ACM INTELLIGENCE SYSTEM. Welcome to the VISTAS ACM Future Innovation Command Center. How may I assist your exploration today?`,
      timestamp: '00:01:04',
      suggestions: [
        'Explore Domains',
        'Upcoming Events',
        'Innovation Projects',
        'Join Chapter',
        'Chapter Story'
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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate Holographic Processing Latency & Synthesize Response
    setTimeout(() => {
      soundEngine.playHologramActivate();
      const lower = query.toLowerCase();

      // Check section navigation trigger words
      if (lower.includes('domain') || lower.includes('ai') || lower.includes('technology')) {
        respond(
          "Accessing Technology Divisions. VISTAS ACM operates across 8 technical domains including AI, Robotics, Cybersecurity, and Cloud Computing.",
          ['Go to Domains', 'Upcoming Events', 'Join Chapter'],
          'domains'
        );
      } else if (lower.includes('event') || lower.includes('hackathon') || lower.includes('workshop')) {
        respond(
          "Routing to Event Command Center. Flagship: HACK-VORTEX (24-Hour Hackathon) and technical bootcamps.",
          ['Go to Events', 'Follow Instagram', 'Register Interest'],
          'events'
        );
      } else if (lower.includes('project') || lower.includes('lab') || lower.includes('research')) {
        respond(
          "Opening Innovation Lab. Student prototypes span edge neural telemetry, LoRa wireless meshes, and zero-trust security tools.",
          ['Go to Projects', 'View GitHub', 'Join Chapter'],
          'projects'
        );
      } else if (lower.includes('team') || lower.includes('lead') || lower.includes('who are')) {
        respond(
          "TEAM PROFILES // COMING SOON. Meet the people behind the mission soon. Our holographic crew console is staged for the upcoming announcement.",
          ['Go to Team Section', 'Follow @vistas_acm'],
          'team'
        );
      } else if (lower.includes('about') || lower.includes('vistas') || lower.includes('mission') || lower.includes('story')) {
        respond(
          "Opening Mission Chamber. VISTAS ACM was chartered on May 19, 2025 at Vels Institute of Science, Technology and Advanced Studies (VISTAS) under ACM India.",
          ['Go to About Section', 'Our Values', 'Explore Domains'],
          'about'
        );
      } else if (lower.includes('join') || lower.includes('contact') || lower.includes('register') || lower.includes('apply')) {
        respond(
          "Deploying Connect Terminal. You can submit your membership request or reach faculty coordinators directly through our terminal.",
          ['Go to Contact Terminal', 'Instagram Link'],
          'contact'
        );
      } else if (lower.includes('gallery') || lower.includes('photo') || lower.includes('moments')) {
        respond(
          "Opening Visual Archive. Explore photographic telemetry from hackathons, workshops, and chapter milestones.",
          ['Go to Gallery', 'Instagram Highlights'],
          'gallery'
        );
      } else if (lower.includes('instagram') || lower.includes('social')) {
        respond(
          `Official social radar active at ${CHAPTER_INFO.instagramHandle}. Stay connected for real-time announcements.`,
          ['Open Instagram Link', 'Upcoming Events'],
          'instagram'
        );
      } else {
        // Fallback intelligent response
        respond(
          "Understood. Command telemetry acknowledged. You can query technical divisions, events, projects, or use quick navigation commands.",
          ['Explore Domains', 'Upcoming Events', 'Innovation Projects', 'Join Chapter']
        );
      }
      setIsTyping(false);
    }, 650);
  };

  const respond = (text: string, suggestions?: string[], actionTarget?: string) => {
    const jarvisMsg: AssistantMessage = {
      id: `jarvis-${Date.now()}`,
      sender: 'jarvis',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      suggestions,
      actionTarget
    };
    setMessages((prev) => [...prev, jarvisMsg]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    soundEngine.playClick();
    if (suggestion.includes('Domains')) onNavigateSection('domains');
    else if (suggestion.includes('Events')) onNavigateSection('events');
    else if (suggestion.includes('Projects')) onNavigateSection('projects');
    else if (suggestion.includes('Team')) onNavigateSection('team');
    else if (suggestion.includes('About') || suggestion.includes('Story')) onNavigateSection('about');
    else if (suggestion.includes('Join') || suggestion.includes('Contact')) onNavigateSection('contact');
    else if (suggestion.includes('Gallery')) onNavigateSection('gallery');
    else if (suggestion.includes('Instagram')) onNavigateSection('instagram');
    else handleSend(suggestion);
  };

  return (
    <>
      {/* -------------------------------------------------------------
          1. Floating Holographic AI Core Button
      ------------------------------------------------------------- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <motion.button
          onClick={toggleOpen}
          onMouseEnter={() => soundEngine.playHover()}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative group p-3.5 rounded-full bg-jet-surface/90 border border-cerulean shadow-hologram-blue backdrop-blur-md cursor-pointer flex items-center justify-center"
          aria-label="Toggle ACM Intelligence System Assistant"
        >
          {/* Pulsating outer holographic rings */}
          <span className="absolute inset-0 rounded-full border border-cerulean/40 animate-ping pointer-events-none" />
          <span className="absolute -inset-1.5 rounded-full border border-dashed border-rose/40 animate-rotate-slow pointer-events-none" />

          {/* Core Indicator Icon */}
          <div className="relative w-8 h-8 rounded-full bg-cerulean/15 flex items-center justify-center text-cerulean group-hover:text-rose transition-colors">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>

          {/* Tooltip Tag */}
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-jet border border-cerulean/40 text-[10px] font-mono text-cerulean tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            JARVIS // INTELLIGENCE
          </span>
        </motion.button>
      </div>

      {/* -------------------------------------------------------------
          2. Holographic Chat Terminal Interface
      ------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[420px] max-h-[580px] h-[78vh] z-50 flex flex-col hud-card rounded-xl overflow-hidden shadow-2xl border-cerulean/50"
          >
            {/* Terminal Header */}
            <div className="p-3.5 bg-jet border-b border-cerulean/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-cerulean animate-pulse shadow-[0_0_8px_#38BDF8]" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-white tracking-wider uppercase leading-none">
                    ACM INTELLIGENCE <span className="text-cerulean">SYSTEM</span>
                  </h3>
                  <span className="font-mono text-[9px] text-chrome-muted tracking-widest uppercase">
                    JARVIS V2.4 // TELEMETRY ACTIVE
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={onToggleSound}
                  className="p-1 text-chrome/60 hover:text-cerulean transition-colors cursor-pointer"
                  title={isSoundMuted ? "Unmute Audio Feedback" : "Mute Audio Feedback"}
                >
                  {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cerulean" />}
                </button>
                <button
                  onClick={toggleOpen}
                  className="p-1 text-chrome/60 hover:text-rose transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Log Viewport */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scanline-overlay text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="font-mono text-[9px] text-chrome/40 mb-1">
                    {msg.sender === 'jarvis' ? 'JARVIS AI // ' : 'USER // '} {msg.timestamp}
                  </span>

                  <div
                    className={`max-w-[85%] p-3 rounded-lg font-sans leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cerulean/15 text-white border border-cerulean/40'
                        : 'bg-jet-surface/90 text-chrome border border-cerulean/20 shadow-inner'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Action Target Navigation Pill */}
                    {msg.actionTarget && (
                      <button
                        onClick={() => onNavigateSection(msg.actionTarget!)}
                        className="mt-2.5 flex items-center gap-1.5 px-3 py-1 bg-cerulean/20 hover:bg-cerulean text-cerulean hover:text-jet border border-cerulean rounded text-[11px] font-mono tracking-wider transition-colors cursor-pointer font-semibold"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>ENGAGE NAVIGATION // {msg.actionTarget.toUpperCase()}</span>
                      </button>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(sug)}
                          className="px-2.5 py-0.5 rounded-full bg-jet border border-cerulean/30 hover:border-rose text-chrome hover:text-rose font-mono text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-cerulean" />
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-cerulean font-mono text-xs p-2">
                  <Radio className="w-3.5 h-3.5 animate-spin text-rose" />
                  <span>SYNTHESIZING TELEMETRY...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-jet border-t border-cerulean/30 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask JARVIS (e.g., 'explore domains', 'events')..."
                className="flex-1 bg-jet-surface border border-cerulean/20 focus:border-cerulean rounded px-3 py-2 text-xs text-white placeholder-chrome/40 outline-none font-mono"
              />
              <button
                type="submit"
                className="cyber-btn-blue px-3.5 py-2 rounded text-xs flex items-center justify-center cursor-pointer"
                aria-label="Send Query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
