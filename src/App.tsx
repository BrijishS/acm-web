import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navigation } from './components/Navigation';
import { HomeSection } from './components/sections/HomeSection';
import { AboutSection } from './components/sections/AboutSection';
import { DomainsSection } from './components/sections/DomainsSection';
import { EventsSection } from './components/sections/EventsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
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
    // Check if intro was already seen this session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('vistas_intro_seen') !== 'true';
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState('home');
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
    const sections = ['home', 'about', 'domains', 'events', 'projects', 'team', 'gallery', 'contact', 'instagram'];
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
    <div className="relative min-h-screen bg-jet text-chrome selection:bg-rose selection:text-white">
      {/* Cinematic Intro Modal */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Sci-Fi Target Custom Cursor */}
      <CustomCursor />

      {/* Central Command HUD Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Command Center Experience Sections */}
      <main id="command-center-root">
        {/* 01. HOME – COMMAND CENTER */}
        <HomeSection onNavigate={handleNavigate} />

        {/* 02. ABOUT ACM – OUR MISSION */}
        <AboutSection />

        {/* 03. DOMAINS – TECHNOLOGY DIVISIONS */}
        <DomainsSection />

        {/* 04. EVENTS – EVENT COMMAND CENTER */}
        <EventsSection />

        {/* 05. PROJECTS – INNOVATION LAB */}
        <ProjectsSection />

        {/* 06. TEAM – CREW COMMAND (STRICT PLACEHOLDER ONLY) */}
        <TeamSection />

        {/* 07. GALLERY – VISUAL ARCHIVE */}
        <GallerySection />

        {/* 08. CONTACT – CONNECT WITH US */}
        <ContactSection />

        {/* 09. INSTAGRAM – SOCIAL CONNECTION */}
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
