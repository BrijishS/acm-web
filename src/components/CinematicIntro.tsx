import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { ChevronRight, Volume2, VolumeX, FastForward, Compass, X, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: (targetSectionId?: string) => void;
  isSoundMuted?: boolean;
  onToggleSound?: () => void;
}

// -------------------------------------------------------------
// 3D Digital Particle Cosmos & Blue Energy Rings
// -------------------------------------------------------------
function DigitalParticleNetwork({ count = 450 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;

      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += speeds[i] * delta * 0.6;
        if (arr[i * 3 + 1] > 7) {
          arr[i * 3 + 1] = -7;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#007BFF"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FuturisticBlueEnergyCore({ stage }: { stage: number }) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const energyOrbRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.6;
      outerRingRef.current.rotation.x = Math.sin(t * 0.8) * 0.3;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.z -= delta * 0.9;
      midRingRef.current.rotation.y = Math.cos(t * 0.7) * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 1.2;
      innerRingRef.current.rotation.y += delta * 0.8;
    }
    if (energyOrbRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      energyOrbRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const energyVisible = stage >= 1;

  return (
    <group position={[0, 0, -1]}>
      {energyVisible && (
        <>
          {/* Central Blue Energy Orb */}
          <mesh ref={energyOrbRef}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshBasicMaterial
              color="#007BFF"
              wireframe
              transparent
              opacity={stage >= 3 ? 0.35 : 0.6}
            />
          </mesh>

          {/* Dynamic Point Lights */}
          <pointLight color="#007BFF" intensity={stage >= 2 ? 4.5 : 2.5} distance={12} />
          <pointLight color="#38BDF8" intensity={2.0} distance={8} position={[0, 1, 1]} />
          <pointLight color="#FF2E88" intensity={stage >= 4 ? 2.5 : 0.5} distance={7} position={[0, -1, 1]} />

          {/* Concentric Energy Rings */}
          <mesh ref={outerRingRef}>
            <torusGeometry args={[2.0, 0.025, 16, 64]} />
            <meshBasicMaterial color="#007BFF" transparent opacity={0.65} />
          </mesh>

          <mesh ref={midRingRef}>
            <torusGeometry args={[1.5, 0.03, 16, 48]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.7} />
          </mesh>

          <mesh ref={innerRingRef}>
            <torusGeometry args={[1.0, 0.02, 12, 36]} />
            <meshBasicMaterial color="#C0C0C0" transparent opacity={0.8} />
          </mesh>
        </>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// Master Cinematic Introduction Component
// -------------------------------------------------------------
export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  isSoundMuted = false,
  onToggleSound
}) => {
  // Sequence stages:
  // 0: Dark screen with subtle digital particles
  // 1: Futuristic blue energy effect
  // 2: Reveal official VISTAS ACM logo
  // 3: Animated technological scanning effect
  // 4: Reveal tagline: INNOVATE. CREATE. LEAD.
  // 5: Ready to transition / auto-warp
  const [stage, setStage] = useState<number>(0);
  const [isTransitioningOut, setIsTransitioningOut] = useState<boolean>(false);
  const [isExploreOpen, setIsExploreOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check system prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      setStage(4);
      return;
    }

    soundEngine.playJarvisChirp();

    // Stage progression timeline
    const t1 = setTimeout(() => {
      setStage(1); // Blue energy
      soundEngine.playHologramActivate();
    }, 800);

    const t2 = setTimeout(() => {
      setStage(2); // Reveal logo
      soundEngine.playClick();
    }, 2200);

    const t3 = setTimeout(() => {
      setStage(3); // Tech scanline
      soundEngine.playLaserSweep();
    }, 3800);

    const t4 = setTimeout(() => {
      setStage(4); // Reveal Tagline
      soundEngine.playTelemetryBeep();
    }, 5400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExploreOpen) {
        if (e.key === 'Escape') setIsExploreOpen(false);
        return;
      }
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExploreOpen]);

  const handleEnter = (targetSectionId?: string) => {
    if (isTransitioningOut) return;
    setIsTransitioningOut(true);
    soundEngine.playHologramActivate();
    soundEngine.startAmbientHum();
    try {
      sessionStorage.setItem('vistas_intro_seen', 'true');
    } catch {
      // Ignore sessionStorage errors
    }
    setTimeout(() => {
      onComplete(targetSectionId);
    }, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioningOut ? 0 : 1, scale: isTransitioningOut ? 1.05 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#050505] text-white select-none overflow-hidden font-sans"
    >
      {/* 3D WebGL Background: Digital Particles & Energy Effect */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.3} />
          <DigitalParticleNetwork />
          <FuturisticBlueEnergyCore stage={stage} />
        </Canvas>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_95%)]" />

      {/* Blueprint Coordinate Overlay Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,123,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* -------------------------------------------------------------
          TOP BAR CONTROLS
      ------------------------------------------------------------- */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-transparent">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-cerulean/70 p-0.5 bg-[#0B1018] flex items-center justify-center shadow-[0_0_12px_rgba(0,123,255,0.4)]">
            <img
              src={CHAPTER_INFO.logoUrl}
              alt="VISTAS ACM"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-heading text-sm font-extrabold tracking-widest text-white uppercase">
              <span>VISTAS</span>
              <span className="text-cerulean">ACM</span>
            </div>
            <span className="text-[9px] font-mono text-[#A5ADBA] tracking-wider uppercase hidden sm:block">
              MISSION CONTROL 2.0
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              if (onToggleSound) onToggleSound();
              else soundEngine.toggleMute();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cerulean/30 bg-[#0B1018]/80 hover:border-cerulean text-[#A5ADBA] hover:text-white transition-all cursor-pointer"
            title={isSoundMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isSoundMuted ? <VolumeX className="w-3.5 h-3.5 text-white/40" /> : <Volume2 className="w-3.5 h-3.5 text-cerulean" />}
            <span className="text-[10px] sm:text-xs uppercase hidden md:inline">
              {isSoundMuted ? 'MUTED' : 'AUDIO'}
            </span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setReducedMotion(!reducedMotion);
              if (!reducedMotion) setStage(4);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cerulean/30 bg-[#0B1018]/80 hover:border-cerulean text-[#A5ADBA] hover:text-white transition-all cursor-pointer text-[10px]"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${reducedMotion ? 'bg-rose' : 'bg-cerulean'}`} />
            <span>{reducedMotion ? 'STATIC' : 'MOTION'}</span>
          </button>

          {/* DIRECTORY / EXPLORE */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsExploreOpen(true);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#1b2a47] hover:border-cerulean text-[#A5ADBA] hover:text-white bg-[#0B1018]/80 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Compass className="w-3.5 h-3.5 text-cerulean" />
            <span className="hidden sm:inline">EXPLORE</span>
          </button>

          {/* SKIP INTRO BUTTON */}
          <button
            onClick={() => handleEnter()}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cerulean hover:bg-cerulean/80 text-white font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(0,123,255,0.5)] group"
          >
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            <span className="text-[11px] sm:text-xs tracking-wider uppercase">SKIP INTRO</span>
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------
          CENTER CHOREOGRAPHED HERO REVEAL
      ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative pointer-events-auto">
          {/* STAGE 1 & 2: Futuristic Blue Energy Glow & Official Logo */}
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="relative mb-6"
              >
                {/* Expanding Blue Energy Shockwave Ring */}
                <div className="absolute -inset-6 rounded-full border border-cerulean/40 animate-ping pointer-events-none" />
                <div className="absolute -inset-12 rounded-full border border-cerulean/20 animate-pulse pointer-events-none" />

                {/* Logo Frame */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-cerulean p-1.5 bg-[#050505]/95 shadow-[0_0_40px_rgba(0,123,255,0.7)] backdrop-blur-xl flex items-center justify-center">
                  <img
                    src={CHAPTER_INFO.logoUrl}
                    alt="VISTAS ACM Logo"
                    className="w-full h-full object-cover rounded-full"
                  />

                  {/* STAGE 3: Animated Technological Scanning Laser Sweep */}
                  {stage >= 3 && (
                    <motion.div
                      initial={{ top: '-10%', opacity: 1 }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_15px_#38BDF8] pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Heading: VISTAS ACM */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-2 mb-4"
              >
                <div className="font-mono text-xs sm:text-sm text-cerulean tracking-[0.35em] uppercase font-bold drop-shadow-[0_0_10px_rgba(0,123,255,0.6)]">
                  ASSOCIATION FOR COMPUTING MACHINERY
                </div>
                <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
                  VISTAS <span className="text-cerulean glow-blue">ACM</span>
                </h1>
                <div className="font-mono text-[11px] sm:text-xs text-[#A5ADBA] tracking-[0.25em] uppercase">
                  STUDENT CHAPTER · GROUP ID {CHAPTER_INFO.groupId} · AY {CHAPTER_INFO.academicYear}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 4: Reveal Tagline: INNOVATE. CREATE. LEAD. */}
          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center space-y-4 max-w-2xl mt-2"
              >
                {/* Official Tagline Banner */}
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#0B1018]/95 border-2 border-rose shadow-[0_0_30px_rgba(255,46,136,0.5)] backdrop-blur-xl">
                  <Sparkles className="w-4 h-4 text-rose animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="font-heading text-lg sm:text-2xl md:text-3xl font-black text-white tracking-[0.25em] uppercase">
                    INNOVATE. CREATE. LEAD.
                  </span>
                  <Sparkles className="w-4 h-4 text-rose animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                {/* Supporting Mission Message */}
                <p className="font-sans text-xs sm:text-sm md:text-base text-[#A5ADBA] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,1)] max-w-xl">
                  {CHAPTER_INFO.supportingMessage}
                </p>

                {/* Action Trigger Button to Enter */}
                <div className="pt-4">
                  <button
                    onClick={() => handleEnter()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-8 py-3.5 rounded-full bg-cerulean hover:bg-[#0066d6] text-white font-mono text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(0,123,255,0.7)] transition-all group hover:scale-105"
                  >
                    <span>ENTER MISSION CONTROL 2.0</span>
                    <ChevronRight className="w-4 h-4 text-rose group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* -------------------------------------------------------------
          BOTTOM TELEMETRY FOOTER
      ------------------------------------------------------------- */}
      <footer className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent font-mono text-xs text-[#A5ADBA]">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-cerulean animate-ping" />
          <span>SYSTEM: INITIALIZING</span>
          <span className="text-[#A5ADBA]/40">·</span>
          <span className="text-white">STAGE 0{stage + 1}/05</span>
        </div>

        <div className="hidden sm:block text-[10px] tracking-widest uppercase text-[#A5ADBA]/60">
          PRESS SPACE OR ENTER TO ACCESS PLATFORM
        </div>

        <button
          onClick={() => handleEnter('team')}
          onMouseEnter={() => soundEngine.playHover()}
          className="text-[10px] sm:text-xs text-[#A5ADBA] hover:text-white uppercase tracking-wider cursor-pointer transition-colors"
        >
          — SKIP TO CREW
        </button>
      </footer>

      {/* -------------------------------------------------------------
          EXPLORE DIRECTORY DRAWER
      ------------------------------------------------------------- */}
      <AnimatePresence>
        {isExploreOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-end bg-black/85 backdrop-blur-xl select-none">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg h-full bg-[#050505] border-l border-cerulean/30 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2a47]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-white">
                    <span className="w-2 h-2 rounded-full bg-rose animate-ping" />
                    <span>MISSION CONTROL SECTIONS</span>
                  </div>
                  <button
                    onClick={() => setIsExploreOpen(false)}
                    className="p-1 rounded-full border border-[#1b2a47] hover:border-white text-[#A5ADBA] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                  {[
                    { id: 'mission', label: '01 / HOME' },
                    { id: 'about', label: '02 / ABOUT ACM' },
                    { id: 'events', label: '03 / EVENTS' },
                    { id: 'domains', label: '04 / ACTIVITIES' },
                    { id: 'team', label: '05 / OUR CREW' },
                    { id: 'projects', label: '06 / PROJECTS' },
                    { id: 'gallery', label: '07 / GALLERY' },
                    { id: 'achievements', label: '08 / ACHIEVEMENTS' },
                    { id: 'timeline', label: '09 / TIMELINE' },
                    { id: 'join', label: '10 / JOIN ACM' },
                    { id: 'contact', label: '11 / CONTACT' }
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setIsExploreOpen(false);
                        handleEnter(sec.id);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="p-3 rounded-lg border border-[#162238] hover:border-cerulean bg-[#0B1018]/60 hover:bg-[#0e1624] text-left text-[#A5ADBA] hover:text-white flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>{sec.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-cerulean" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1b2a47] font-mono text-[11px] text-[#A5ADBA]">
                {CHAPTER_INFO.fullName} · ID {CHAPTER_INFO.groupId}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
