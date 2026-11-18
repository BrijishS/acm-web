// ============================================================================
// VISTAS ACM — Mission Control 2.0
// Cinematic AI System Initialization & Holographic Reactor Boot Sequence
// ============================================================================

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import {
  ChevronRight,
  Volume2,
  VolumeX,
  FastForward,
  Compass,
  X,
  Sparkles,
  Activity,
  Cpu,
  Shield,
  Layers,
  CheckCircle2,
  Terminal,
  Radio
} from 'lucide-react';

interface CinematicIntroProps {
  onComplete: (targetSectionId?: string) => void;
  isSoundMuted?: boolean;
  onToggleSound?: () => void;
}

// ----------------------------------------------------------------------------
// 1. Three.js: Digital Particle Cosmos (Stage 1 to 5)
// ----------------------------------------------------------------------------
function DigitalParticleNetwork({ count = 380, stage }: { count?: number; stage: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
      spd[i] = 0.2 + Math.random() * 0.6;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const speedMult = stage >= 4 ? 2.5 : stage >= 2 ? 1.4 : 0.8;
      pointsRef.current.rotation.y += delta * 0.06 * speedMult;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;

      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Particle inward convergence during stage 3 (Logo Reveal)
        if (stage === 3) {
          arr[i * 3] *= 0.985;
          arr[i * 3 + 1] *= 0.985;
        } else {
          arr[i * 3 + 1] += speeds[i] * delta * 0.5 * speedMult;
          if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -8;
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
        size={stage >= 3 ? 0.08 : 0.06}
        color={stage >= 4 ? '#00CFFF' : '#007BFF'}
        transparent
        opacity={stage >= 1 ? 0.75 : 0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ----------------------------------------------------------------------------
// 2. Three.js: 3D Holographic Arc Reactor Assembly (Stage 2 to 5)
// ----------------------------------------------------------------------------
function HolographicReactor3D({ stage, isWarping }: { stage: number; isWarping: boolean }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const scanningRingRef = useRef<THREE.Mesh>(null);
  const assemblyScaleRef = useRef<number>(0.1);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Progressive assembly interpolation
    if (stage >= 2) {
      assemblyScaleRef.current = THREE.MathUtils.lerp(
        assemblyScaleRef.current,
        isWarping ? 3.5 : 1.0,
        delta * (isWarping ? 4.0 : 2.5)
      );
    }

    const currentScale = assemblyScaleRef.current;

    if (outerRingRef.current) {
      outerRingRef.current.scale.set(currentScale, currentScale, currentScale);
      outerRingRef.current.rotation.z += delta * (isWarping ? 4.5 : 0.55);
      outerRingRef.current.rotation.x = Math.sin(t * 0.6) * 0.25;
    }

    if (midRingRef.current) {
      midRingRef.current.scale.set(currentScale, currentScale, currentScale);
      midRingRef.current.rotation.y -= delta * (isWarping ? 5.5 : 0.85);
      midRingRef.current.rotation.z = Math.cos(t * 0.7) * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.scale.set(currentScale, currentScale, currentScale);
      innerRingRef.current.rotation.x += delta * (isWarping ? 7.0 : 1.2);
      innerRingRef.current.rotation.z -= delta * (isWarping ? 5.0 : 0.6);
    }

    if (coreRef.current) {
      const pulse = currentScale * (1 + Math.sin(t * (stage >= 4 ? 6 : 3.5)) * 0.08);
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (scanningRingRef.current) {
      scanningRingRef.current.position.y = Math.sin(t * 3.5) * 1.1;
      scanningRingRef.current.rotation.z += delta * 1.5;
    }
  });

  if (stage < 2) return null;

  return (
    <group position={[0, 0, -1]}>
      {/* Central Quantum Energy Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          color="#00CFFF"
          emissive="#007BFF"
          emissiveIntensity={stage >= 4 ? 2.8 : 1.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Dynamic Illumination Lights */}
      <pointLight color="#00CFFF" intensity={stage >= 4 ? 4.5 : 3.0} distance={14} />
      <pointLight color="#007BFF" intensity={2.5} distance={10} position={[0, 1.2, 1.5]} />
      <pointLight color="#FF2E88" intensity={stage >= 3 ? 2.5 : 0.4} distance={8} position={[0, -1.2, 1]} />

      {/* Outer Gimbal Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.1, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#C0C0C0"
            metalness={0.95}
            roughness={0.15}
            emissive="#007BFF"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Cerulean LED notches */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial color="#00CFFF" />
            </mesh>
          );
        })}
      </group>

      {/* Middle Counter-rotating Ring */}
      <group ref={midRingRef}>
        <mesh>
          <torusGeometry args={[1.6, 0.03, 16, 48]} />
          <meshStandardMaterial
            color="#00CFFF"
            metalness={0.85}
            roughness={0.2}
            emissive="#00CFFF"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Inner Fast Ring */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.2, 0.025, 16, 36]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.9}
            emissive="#007BFF"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Scanning Ring Beam */}
      <mesh ref={scanningRingRef}>
        <ringGeometry args={[1.1, 1.15, 32]} />
        <meshBasicMaterial
          color="#00CFFF"
          side={THREE.DoubleSide}
          transparent
          opacity={stage >= 3 ? 0.7 : 0.3}
        />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------
// 3. Fallback 2D Canvas Reactor (when WebGL is unavailable or reduced-motion)
// ----------------------------------------------------------------------------
function Fallback2DReactor({ stage }: { stage: number }) {
  return (
    <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center select-none pointer-events-none">
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00CFFF]/40 animate-spin" style={{ animationDuration: '24s' }} />
      <div className="absolute inset-4 rounded-full border border-cerulean/60 animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />
      <div className="absolute inset-8 rounded-full border-2 border-[#00CFFF]/80 animate-spin" style={{ animationDuration: '9s' }} />
      <div className={`w-16 h-16 rounded-full shadow-[0_0_35px_rgba(0,207,255,0.8)] transition-all duration-700 ${
        stage >= 4 ? 'bg-[#00CFFF] animate-pulse' : stage >= 2 ? 'bg-cerulean animate-ping' : 'bg-white/30'
      }`} />
    </div>
  );
}

// ----------------------------------------------------------------------------
// Master Cinematic Intro Component
// ----------------------------------------------------------------------------
export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  isSoundMuted = false,
  onToggleSound
}) => {
  // 5 Stages:
  // 1: SYSTEM AWAKENING
  // 2: REACTOR ACTIVATION
  // 3: ACM IDENTITY REVEAL
  // 4: INTELLIGENCE INITIALIZATION
  // 5: MISSION CONTROL ONLINE
  const [stage, setStage] = useState<number>(1);
  const [realProgress, setRealProgress] = useState<number>(18);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [isExploreOpen, setIsExploreOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [hasWebGl, setHasWebGl] = useState<boolean>(true);

  // Diagnostic checklist states
  const [diagnostics, setDiagnostics] = useState<{
    visualAssets: boolean;
    interfaceHud: boolean;
    navigation: boolean;
    animations: boolean;
    telemetry: boolean;
  }>({
    visualAssets: false,
    interfaceHud: false,
    navigation: false,
    animations: false,
    telemetry: false
  });

  // Genuine asset readiness check
  useEffect(() => {
    // 1. WebGL test
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGl(!!gl);
    } catch {
      setHasWebGl(false);
    }

    // 2. Preload Logo Image
    const logoImg = new Image();
    logoImg.src = CHAPTER_INFO.logoUrl;
    logoImg.onload = () => {
      setDiagnostics((d) => ({ ...d, visualAssets: true }));
      setRealProgress((p) => Math.max(p, 42));
    };
    logoImg.onerror = () => {
      setDiagnostics((d) => ({ ...d, visualAssets: true }));
      setRealProgress((p) => Math.max(p, 42));
    };

    // 3. Document ready test
    if (document.readyState === 'complete') {
      setDiagnostics((d) => ({ ...d, interfaceHud: true, navigation: true }));
      setRealProgress((p) => Math.max(p, 68));
    } else {
      window.addEventListener('load', () => {
        setDiagnostics((d) => ({ ...d, interfaceHud: true, navigation: true }));
        setRealProgress((p) => Math.max(p, 68));
      });
    }

    // 4. Reduced-motion check
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      setStage(4);
      setRealProgress(100);
      return;
    }

    // Audio boot chirp
    soundEngine.playJarvisChirp();

    // STAGE 01 -> STAGE 02: Reactor Activation
    const tStage2 = setTimeout(() => {
      setStage(2);
      soundEngine.playReactorIgnition();
      setDiagnostics((d) => ({ ...d, animations: true }));
      setRealProgress((p) => Math.max(p, 55));
    }, 1200);

    // STAGE 02 -> STAGE 03: ACM Identity Reveal
    const tStage3 = setTimeout(() => {
      setStage(3);
      soundEngine.playParticleConvergence();
      soundEngine.playLaserSweep();
      setRealProgress((p) => Math.max(p, 78));
    }, 3200);

    // STAGE 03 -> STAGE 04: Intelligence Initialization
    const tStage4 = setTimeout(() => {
      setStage(4);
      soundEngine.playTelemetryBeep();
      setDiagnostics((d) => ({ ...d, telemetry: true }));
      setRealProgress(100);
    }, 5200);

    // Keyboard navigation listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExploreOpen) {
        if (e.key === 'Escape') setIsExploreOpen(false);
        return;
      }
      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        handleExecuteWarp();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleExecuteWarp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(tStage2);
      clearTimeout(tStage3);
      clearTimeout(tStage4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExploreOpen]);

  // STAGE 05: MISSION CONTROL ONLINE
  const handleExecuteWarp = (targetSectionId?: string) => {
    if (isWarping) return;
    setIsWarping(true);
    setStage(5);
    soundEngine.playWarpTransition();

    try {
      sessionStorage.setItem('vistas_intro_seen', 'true');
    } catch {}

    setTimeout(() => {
      onComplete(targetSectionId);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isWarping ? 0 : 1,
        scale: isWarping ? 1.08 : 1,
        filter: isWarping ? 'blur(12px)' : 'none'
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] text-white select-none overflow-hidden font-sans"
    >
      {/* 3D WebGL Background Scene */}
      <div className="absolute inset-0 z-0">
        {hasWebGl && !reducedMotion ? (
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.4} />
            <DigitalParticleNetwork stage={stage} />
            <HolographicReactor3D stage={stage} isWarping={isWarping} />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Fallback2DReactor stage={stage} />
          </div>
        )}
      </div>

      {/* Cinematic Vignette & Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_95%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,207,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Stage 1: Blue electrical scanning lines */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00CFFF]/40 to-transparent pointer-events-none animate-laser-sweep" />

      {/* =========================================================
          TOP BAR CONTROLS
      ========================================================= */}
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
            <div className="flex items-center gap-1.5 font-heading text-sm font-black tracking-widest text-white uppercase">
              <span>VISTAS</span>
              <span className="text-cerulean">ACM</span>
            </div>
            <span className="text-[9px] font-mono text-[#00CFFF] tracking-wider uppercase hidden sm:block">
              MISSION CONTROL 2.0
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          {/* Audio Button */}
          <button
            onClick={() => {
              if (onToggleSound) onToggleSound();
              else soundEngine.toggleMute();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cerulean/30 bg-[#0B1018]/80 hover:border-cerulean text-[#A5ADBA] hover:text-white transition-all cursor-pointer"
            title={isSoundMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isSoundMuted ? <VolumeX className="w-3.5 h-3.5 text-white/40" /> : <Volume2 className="w-3.5 h-3.5 text-[#00CFFF]" />}
            <span className="text-[10px] sm:text-xs uppercase hidden md:inline">
              {isSoundMuted ? 'MUTED' : 'AUDIO'}
            </span>
          </button>

          {/* Motion Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setReducedMotion(!reducedMotion);
              if (!reducedMotion) {
                setStage(4);
                setRealProgress(100);
              }
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cerulean/30 bg-[#0B1018]/80 hover:border-cerulean text-[#A5ADBA] hover:text-white transition-all cursor-pointer text-[10px]"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${reducedMotion ? 'bg-rose' : 'bg-[#00CFFF]'}`} />
            <span>{reducedMotion ? 'STATIC' : 'MOTION'}</span>
          </button>

          {/* Explore Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsExploreOpen(true);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#1b2a47] hover:border-[#00CFFF] text-[#A5ADBA] hover:text-white bg-[#0B1018]/80 transition-all cursor-pointer font-bold text-[11px]"
          >
            <Compass className="w-3.5 h-3.5 text-[#00CFFF]" />
            <span className="hidden sm:inline">EXPLORE</span>
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={() => handleExecuteWarp()}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cerulean hover:bg-[#00CFFF] text-white hover:text-black font-bold transition-all cursor-pointer shadow-[0_0_18px_rgba(0,123,255,0.5)] group"
          >
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            <span className="text-[11px] sm:text-xs tracking-wider uppercase">SKIP INTRO</span>
          </button>
        </div>
      </header>

      {/* =========================================================
          CENTER CHOREOGRAPHED HERO REVEAL (5 STAGES)
      ========================================================= */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative pointer-events-auto">
          {/* STAGE 01: SYSTEM AWAKENING MESSAGE */}
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="font-heading text-4xl sm:text-6xl font-black text-white tracking-widest uppercase">
                VISTAS <span className="text-[#00CFFF] glow-blue">ACM</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#00CFFF] tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00CFFF] animate-ping" />
                <span>INITIALIZING INTELLIGENCE SYSTEM...</span>
              </div>
            </motion.div>
          )}

          {/* STAGE 02 & 03: REACTOR & ORIGINAL VISTAS ACM LOGO REVEAL */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative mb-6"
              >
                {/* Expanding Energy Shockwave Rings */}
                <div className="absolute -inset-8 rounded-full border border-[#00CFFF]/40 animate-ping pointer-events-none" />
                <div className="absolute -inset-14 rounded-full border border-cerulean/20 animate-pulse pointer-events-none" />

                {/* Original Logo Materialization in Reactor Core */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-[#00CFFF] p-1.5 bg-[#050505]/95 shadow-[0_0_50px_rgba(0,207,255,0.7)] backdrop-blur-xl flex items-center justify-center">
                  <img
                    src={CHAPTER_INFO.logoUrl}
                    alt="Official VISTAS ACM Logo"
                    className="w-full h-full object-cover rounded-full"
                  />

                  {/* Scanning Laser Beam */}
                  {stage >= 3 && (
                    <motion.div
                      initial={{ top: '0%', opacity: 1 }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00CFFF] to-transparent shadow-[0_0_15px_#00CFFF] pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 03: ACM TYPOGRAPHY REVEAL */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-1 mb-4"
              >
                <div className="font-mono text-xs sm:text-sm text-[#00CFFF] tracking-[0.35em] uppercase font-bold drop-shadow-[0_0_10px_rgba(0,207,255,0.6)]">
                  ASSOCIATION FOR COMPUTING MACHINERY
                </div>
                <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
                  VISTAS <span className="text-[#00CFFF] glow-blue">ACM</span>
                </h1>
                <div className="font-mono text-[11px] sm:text-xs text-[#A5ADBA] tracking-[0.25em] uppercase mt-1">
                  STUDENT CHAPTER · GROUP ID {CHAPTER_INFO.groupId} · AY {CHAPTER_INFO.academicYear}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 04: INTELLIGENCE INITIALIZATION & DIAGNOSTICS */}
          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center space-y-4 max-w-2xl mt-1"
              >
                {/* Official Tagline Banner */}
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#0B1018]/95 border-2 border-rose shadow-[0_0_30px_rgba(255,46,136,0.5)] backdrop-blur-xl">
                  <Sparkles className="w-4 h-4 text-rose animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="font-heading text-lg sm:text-2xl font-black text-white tracking-[0.25em] uppercase">
                    INNOVATE. CREATE. LEAD.
                  </span>
                  <Sparkles className="w-4 h-4 text-rose animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                {/* Floating Holographic Diagnostic Deck */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] text-left pt-2">
                  <div className="p-2 rounded bg-black/60 border border-cerulean/25 flex items-center justify-between">
                    <span className="text-chrome/70">VISUAL ASSETS</span>
                    <span className="text-emerald-400 font-bold">READY</span>
                  </div>
                  <div className="p-2 rounded bg-black/60 border border-cerulean/25 flex items-center justify-between">
                    <span className="text-chrome/70">HUD TOKENS</span>
                    <span className="text-emerald-400 font-bold">ACTIVE</span>
                  </div>
                  <div className="p-2 rounded bg-black/60 border border-cerulean/25 flex items-center justify-between">
                    <span className="text-chrome/70">NAVIGATION</span>
                    <span className="text-[#00CFFF] font-bold">11 ANCHORS</span>
                  </div>
                  <div className="p-2 rounded bg-black/60 border border-cerulean/25 flex items-center justify-between">
                    <span className="text-chrome/70">A.R.I.A. CORE</span>
                    <span className="text-[#00CFFF] font-bold">ONLINE</span>
                  </div>
                </div>

                {/* A.R.I.A. Subsystem Initialization Message */}
                <div className="font-mono text-xs text-[#00CFFF] tracking-wider uppercase flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#00CFFF]" />
                  <span>A.R.I.A. INTELLIGENCE SYSTEMS INITIALIZED · GROUP ID 199704</span>
                </div>

                {/* Enter Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleExecuteWarp()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-8 py-3 rounded-full bg-[#00CFFF] hover:bg-cerulean text-black hover:text-white font-mono text-xs sm:text-sm font-black tracking-widest uppercase flex items-center gap-3 cursor-pointer shadow-[0_0_35px_rgba(0,207,255,0.7)] transition-all group hover:scale-105"
                  >
                    <span>ENTER MISSION CONTROL 2.0</span>
                    <ChevronRight className="w-4 h-4 text-black group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================
          BOTTOM REAL PROGRESS & SYSTEM TELEMETRY
      ========================================================= */}
      <footer className="absolute bottom-0 inset-x-0 z-20 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent font-mono text-xs text-[#A5ADBA] gap-2">
        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#00CFFF] animate-ping" />
          <span className="text-white font-bold">SYSTEM BOOT:</span>
          <span className="text-[#00CFFF]">
            {stage === 1 ? 'STAGE 01 // SYSTEM AWAKENING' :
             stage === 2 ? 'STAGE 02 // REACTOR ACTIVATION' :
             stage === 3 ? 'STAGE 03 // ACM IDENTITY REVEAL' :
             stage === 4 ? 'STAGE 04 // INTELLIGENCE READY' :
             'STAGE 05 // MISSION CONTROL ONLINE'}
          </span>
          <span className="text-chrome/30">·</span>
          <span className="text-white font-mono">{realProgress}%</span>
        </div>

        {/* Real Progress Bar */}
        <div className="w-full sm:w-48 h-1.5 bg-black/60 rounded-full overflow-hidden border border-cerulean/30">
          <motion.div
            className="h-full bg-gradient-to-r from-cerulean via-[#00CFFF] to-rose"
            initial={{ width: '18%' }}
            animate={{ width: `${realProgress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="hidden md:block text-[10px] tracking-widest uppercase text-[#A5ADBA]/60">
          PRESS SPACE OR ENTER TO ENTER
        </div>
      </footer>

      {/* =========================================================
          EXPLORE DIRECTORY DRAWER
      ========================================================= */}
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
                    { id: 'home', label: '01 / HOME' },
                    { id: 'about', label: '02 / ABOUT ACM' },
                    { id: 'events', label: '03 / EVENTS & LAUNCHES' },
                    { id: 'domains', label: '04 / TECHNICAL DOMAINS' },
                    { id: 'crew', label: '05 / OUR CREW (16 LEADERS)' },
                    { id: 'projects', label: '06 / STUDENT PAYLOADS' },
                    { id: 'gallery', label: '07 / MEDIA ARCHIVE' },
                    { id: 'achievements', label: '08 / ACHIEVEMENTS & STANDING' },
                    { id: 'timeline', label: '09 / CHAPTER TIMELINE' },
                    { id: 'governance', label: '10 / GOVERNANCE STRUCTURE' },
                    { id: 'join', label: '11 / MEMBERSHIP INITIATION' },
                    { id: 'contact', label: '12 / CONTACT UPLINK' }
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setIsExploreOpen(false);
                        handleExecuteWarp(sec.id);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="p-3 rounded-lg border border-[#162238] hover:border-[#00CFFF] bg-[#0B1018]/60 hover:bg-[#0e1624] text-left text-[#A5ADBA] hover:text-white flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>{sec.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#00CFFF]" />
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
