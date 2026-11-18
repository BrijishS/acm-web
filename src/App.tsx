import React, { useState, useEffect, useRef } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navigation } from './components/Navigation';
import { HomeSection } from './components/sections/HomeSection';
import { AboutSection } from './components/sections/AboutSection';
import { DomainsSection } from './components/sections/DomainsSection';
import { EventsSection } from './components/sections/EventsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { GovernanceSection } from './components/sections/GovernanceSection';
import { TeamSection } from './components/sections/TeamSection';
import { GallerySection } from './components/sections/GallerySection';
import { ContactSection } from './components/sections/ContactSection';
import { InstagramSection } from './components/sections/InstagramSection';
import { Footer } from './components/Footer';
import { JarvisAssistant } from './components/JarvisAssistant';
import { CustomCursor } from './components/CustomCursor';
import { AiTransmissionHud } from './components/AiTransmissionHud';
import { CinematicSectionTransition } from './components/CinematicSectionTransition';
import { soundEngine } from './audio/soundEngine';
import { aiVoiceEngine, SectionAiBriefing } from './audio/aiVoiceEngine';

export function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('vistas_intro_seen') !== 'true';
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState('mission');
  const [isSoundMuted, setIsSoundMuted] = useState(soundEngine.getIsMuted());
  const [aiTransmission, setAiTransmission] = useState<SectionAiBriefing | null>(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIntroComplete = () => {
    sessionStorage.setItem('vistas_intro_seen', 'true');
    setShowIntro(false);
  };

  // Lock body scroll while cinematic intro entry is active
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  const handleNavigate = (sectionId: string, triggerAiVoice: boolean = true) => {
    // Map aliases
    const targetMap: Record<string, string> = {
      home: 'mission',
      about: 'about',
      profile: 'profile',
      vision: 'vision',
      galaxy: 'domains',
      launches: 'events',
      builds: 'projects',
      crew: 'team',
    };
    const targetId = targetMap[sectionId] || sectionId;
    setActiveSection(sectionId);
    const element = document.getElementById(targetId) || document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Trigger section arrival scanline & illumination animation
      element.classList.remove('section-ai-targeted');
      void element.offsetWidth;
      element.classList.add('section-ai-targeted');
      setTimeout(() => {
        element.classList.remove('section-ai-targeted');
      }, 2500);
    }

    // Trigger AI Voice briefing and dynamic HUD animation
    if (triggerAiVoice) {
      if (aiTimerRef.current) {
        clearTimeout(aiTimerRef.current);
      }

      const briefing = aiVoiceEngine.getBriefing(targetId);
      setAiTransmission(briefing);

      soundEngine.playJarvisChirp();

      if (!isSoundMuted) {
        setIsAiSpeaking(true);
        aiVoiceEngine.speak(briefing.voiceLine, {
          onStart: () => setIsAiSpeaking(true),
          onEnd: () => {
            setIsAiSpeaking(false);
            aiTimerRef.current = setTimeout(() => {
              setAiTransmission(null);
            }, 1400);
          },
          onError: () => {
            setIsAiSpeaking(false);
            aiTimerRef.current = setTimeout(() => {
              setAiTransmission(null);
            }, 2500);
          }
        });
      } else {
        // Visual AI animation when audio is muted
        setIsAiSpeaking(true);
        aiTimerRef.current = setTimeout(() => {
          setIsAiSpeaking(false);
          aiTimerRef.current = setTimeout(() => {
            setAiTransmission(null);
          }, 1200);
        }, 2800);
      }
    }
  };

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsSoundMuted(muted);
    if (muted) {
      aiVoiceEngine.stop();
      setIsAiSpeaking(false);
    }
  };

  const handleDismissAiTransmission = () => {
    aiVoiceEngine.stop();
    setIsAiSpeaking(false);
    setAiTransmission(null);
  };

  // Observe active section on scroll
  useEffect(() => {
    const sections = ['mission', 'profile', 'vision', 'domains', 'events', 'projects', 'governance', 'team', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030611] text-chrome selection:bg-rose selection:text-white">
      {/* Cinematic Intro Modal */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Sci-Fi Target Custom Cursor */}
      <CustomCursor />

      {/* Full-Width Mission Control Header: Hidden during entry, visible once experience entered */}
      {!showIntro && (
        <>
          <Navigation
            activeSection={activeSection}
            onNavigate={handleNavigate}
            isSoundMuted={isSoundMuted}
            onToggleSound={handleToggleSound}
          />

          {/* AI Voice & Holographic Animation Transmission HUD */}
          <AiTransmissionHud
            transmission={aiTransmission}
            isSpeaking={isAiSpeaking}
            onDismiss={handleDismissAiTransmission}
            isMuted={isSoundMuted}
          />

          {/* Cinematic Section Transition Warp & Holographic Target Lock */}
          <CinematicSectionTransition transmission={aiTransmission} />
        </>
      )}

      {/* Main Mission Control Experience */}
      <main id="command-center-root">
        {/* MISSION: Command Center Hero with Space / Telemetry Visuals */}
        <HomeSection onNavigate={handleNavigate} />

        {/* PROFILE & VISION: Chapter Foundation, Operating Pillars & About ACM */}
        <AboutSection />

        {/* GALAXY: 5 Technical Domains & Chapter Activities */}
        <DomainsSection />

        {/* LAUNCHES: Chapter Events & Hackathons */}
        <EventsSection />

        {/* BUILDS: Student Projects & Hardware / Software Payloads */}
        <ProjectsSection />

        {/* GOVERNANCE: Command Structure, Committee Functions & Review Mechanism */}
        <GovernanceSection />

        {/* CREW: Leadership & Office Bearers (16 Members) */}
        <TeamSection />

        {/* GALLERY: Moments Together & Visual Archive */}
        <GallerySection />

        {/* INSTAGRAM: Social Radar & Transmissions */}
        <InstagramSection />

        {/* CONTACT: Open a Channel & Join Chapter */}
        <ContactSection />
      </main>

      {/* Chapter Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* JARVIS ACM Intelligence Floating System: Only visible in main website */}
      {!showIntro && (
        <JarvisAssistant
          onNavigateSection={handleNavigate}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
        />
      )}
    </div>
  );
}

export default App;
