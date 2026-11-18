import React, { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(soundEngine.getIsMuted());
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAriaOpen, setIsAriaOpen] = useState<boolean>(false);

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

      {/* Full-Width Mission Control Header */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAria={() => setIsAriaOpen(true)}
      />

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
      <AriaInterface
        isOpen={isAriaOpen}
        onClose={() => setIsAriaOpen(false)}
        onNavigateSection={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminAuthenticated={typeof window !== 'undefined' && sessionStorage.getItem('vistas_admin_auth') === 'true'}
      />

      {/* Protected Administrator Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default App;
