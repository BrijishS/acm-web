import React, { useState, useEffect } from 'react';
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
import { soundEngine } from './audio/soundEngine';

export function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('vistas_intro_seen') !== 'true';
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState('mission');
  const [isSoundMuted, setIsSoundMuted] = useState(soundEngine.getIsMuted());

  const handleIntroComplete = () => {
    sessionStorage.setItem('vistas_intro_seen', 'true');
    setShowIntro(false);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsSoundMuted(muted);
  };

  // Observe active section on scroll
  useEffect(() => {
    const sections = ['mission', 'profile', 'vision', 'domains', 'launches', 'builds', 'governance', 'crew', 'contact'];
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

      {/* Full-Width Mission Control Header: VISTAS / ACM, Navigation Links, T+ 00:19 */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Mission Control Experience */}
      <main id="command-center-root">
        {/* MISSION: Command Center Hero with Space / Telemetry Visuals */}
        <HomeSection onNavigate={handleNavigate} />

        {/* PROFILE & VISION: Chapter Foundation & 4 Operating Pillars */}
        <AboutSection />

        {/* GALAXY: Technology Divisions / Domains (#domains) */}
        <DomainsSection />

        {/* LAUNCHES: Events, Hackathons & Operations (#launches) */}
        <EventsSection />

        {/* BUILDS: Innovation Lab, Hardware & Prototypes (#builds) */}
        <ProjectsSection />

        {/* GOVERNANCE: ACM Constitution, Bylaws & Academic Oversight (#governance) */}
        <GovernanceSection />

        {/* CREW: Team Command Console - STRICT PLACEHOLDER (#crew) */}
        <TeamSection />

        {/* VISUAL ARCHIVE: Photo Gallery */}
        <GallerySection />

        {/* CONTACT: Communication Terminal & Join Dispatch (#contact) */}
        <ContactSection />

        {/* SOCIAL RADAR: Official Instagram */}
        <InstagramSection />
      </main>

      {/* Chapter Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* JARVIS ACM Intelligence Floating System */}
      <JarvisAssistant
        onNavigateSection={handleNavigate}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}

export default App;
