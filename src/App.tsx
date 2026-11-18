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
import { AchievementsSection } from './components/sections/AchievementsSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { MembershipSection } from './components/sections/MembershipSection';
import { ContactSection } from './components/sections/ContactSection';
import { InstagramSection } from './components/sections/InstagramSection';
import { Footer } from './components/Footer';
import { AriaInterface } from './components/aria/AriaInterface';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomCursor } from './components/CustomCursor';
import { GlobalBackgroundAnimation } from './components/GlobalBackgroundAnimation';
import { soundEngine } from './audio/soundEngine';

export function App() {
  // Check if intro has already been experienced in this session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('vistas_intro_seen') !== 'true';
    } catch {
      return true;
    }
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(soundEngine.getIsMuted());
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAriaOpen, setIsAriaOpen] = useState<boolean>(false);

  // Lock body scroll while entry animation is active
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

  const handleIntroComplete = (targetSectionId?: string) => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('vistas_intro_seen', 'true');
    } catch {
      // Ignore sessionStorage errors
    }
    if (targetSectionId) {
      setTimeout(() => {
        handleNavigate(targetSectionId);
      }, 200);
    }
  };

  const handleNavigate = (sectionId: string) => {
    // Map section aliases
    const targetMap: Record<string, string> = {
      home: 'home',
      mission: 'home',
      about: 'about',
      profile: 'about',
      vision: 'about',
      activities: 'domains',
      domains: 'domains',
      galaxy: 'domains',
      events: 'events',
      launches: 'events',
      crew: 'crew',
      team: 'crew',
      projects: 'projects',
      builds: 'projects',
      gallery: 'gallery',
      achievements: 'achievements',
      timeline: 'timeline',
      governance: 'governance',
      join: 'join',
      membership: 'join',
      contact: 'contact'
    };

    const targetId = targetMap[sectionId] || sectionId;
    setActiveSection(sectionId);
    const element = document.getElementById(targetId) || document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    soundEngine.playClick();
  };

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsSoundMuted(muted);
  };

  // Observe active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'events', 'domains', 'crew', 'projects', 'gallery', 'achievements', 'timeline', 'governance', 'join', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
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
    <div className="relative min-h-screen bg-[#030407] text-[#C0C0C0] selection:bg-rose selection:text-white">
      {/* Dynamic Global Background Sci-Fi Animation (Constellation Web + Laser Radar + Pulsing Nebulae) */}
      <GlobalBackgroundAnimation />

      {/* Sci-Fi Target Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Website Opening Sequence */}
      {showIntro && (
        <CinematicIntro
          onComplete={handleIntroComplete}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* Full-Width Mission Control Header */}
      {!showIntro && (
        <Navigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
          onReplayIntro={() => setShowIntro(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenAria={() => setIsAriaOpen(true)}
        />
      )}

      {/* Main Mission Control Experience */}
      <main id="command-center-root">
        {/* 1. HERO SECTION: Dynamic 3D WebGL Background + Official Tagline */}
        <HomeSection onNavigate={handleNavigate} />

        {/* 2. ABOUT ACM: Mission, Vision, Curiosity Makes, 3 Action Pathways */}
        <AboutSection />

        {/* 3. EVENTS: Complete Event Management System with Countdown & Registration */}
        <EventsSection />

        {/* 4. ACTIVITIES & DOMAINS: 5 Technical Domains & Chapter Programs */}
        <DomainsSection />

        {/* 5. OUR CREW: 16 Verified Leaders, 3D Tilt Cards & Scanner */}
        <TeamSection />

        {/* 6. PROJECTS: Student Payloads & Innovation Showcase */}
        <ProjectsSection />

        {/* 7. GALLERY: Media Archive with Category Filters & Lightbox */}
        <GallerySection />

        {/* 8. ACHIEVEMENTS: Official Good Standing & Statistics */}
        <AchievementsSection />

        {/* 9. TIMELINE: Chapter History & Milestones */}
        <TimelineSection />

        {/* 10. GOVERNANCE: Command Structure, Committee Functions & Review Mechanism */}
        <GovernanceSection />

        {/* 11. JOIN ACM: Membership Information & Interactive Registration Form */}
        <MembershipSection />

        {/* 12. INSTAGRAM: Social Radar & Transmissions */}
        <InstagramSection />

        {/* 13. CONTACT: Communication Channels & Verified Department Coordinates */}
        <ContactSection />
      </main>

      {/* Chapter Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* A.R.I.A. Advanced Responsive Intelligence Assistant */}
      {!showIntro && (
        <AriaInterface
          isOpen={isAriaOpen}
          onClose={() => setIsAriaOpen(false)}
          onNavigateSection={handleNavigate}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isAdminAuthenticated={typeof window !== 'undefined' && sessionStorage.getItem('vistas_admin_auth') === 'true'}
        />
      )}

      {/* Floating Holographic A.R.I.A. Access Capsule (When closed) */}
      {!showIntro && !isAriaOpen && (
        <button
          onClick={() => {
            soundEngine.playJarvisChirp();
            setIsAriaOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full hud-card border-cerulean/50 bg-[#071322]/90 hover:border-[#00CFFF] text-white shadow-[0_0_25px_rgba(0,207,255,0.4)] backdrop-blur-xl group transition-all duration-300 hover:scale-105 cursor-pointer"
          title="Activate A.R.I.A. Holographic Assistant"
        >
          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#00CFFF] animate-ping opacity-75" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00CFFF] shadow-[0_0_8px_#00CFFF]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading text-xs font-black tracking-wider uppercase group-hover:text-[#00CFFF] transition-colors leading-none">
              A.R.I.A. AI
            </span>
            <span className="font-mono text-[8px] text-chrome/50 leading-none mt-0.5">
              CLICK OR SAY "HEY A.R.I.A."
            </span>
          </div>
        </button>
      )}

      {/* Protected Administrator Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default App;
