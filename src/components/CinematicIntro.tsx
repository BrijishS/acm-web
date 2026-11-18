import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { ChevronRight, ChevronDown, Volume2, VolumeX, FileText, X } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: (targetSectionId?: string) => void;
  isSoundMuted?: boolean;
  onToggleSound?: () => void;
}

// -------------------------------------------------------------
// 3D Scene Components for the Arrival Entry Screen
// -------------------------------------------------------------
function StreetlampsAndRoad() {
  const lampPositions = useMemo(() => [
    [-3.2, 0, 4],
    [3.2, 0, 4],
    [-3.2, 0, 0],
    [3.2, 0, 0],
    [-3.2, 0, -4],
    [3.2, 0, -4]
  ], []);

  return (
    <group>
      {/* Wet reflective asphalt tarmac plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.12}
          metalness={0.88}
        />
      </mesh>

      {/* Streetlamps casting soft illumination */}
      {lampPositions.map((pos, idx) => (
        <group key={idx} position={[pos[0], pos[1], pos[2]]}>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 3.6, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[pos[0] > 0 ? -0.3 : 0.3, 3.5, 0]} rotation={[0, 0, pos[0] > 0 ? 0.3 : -0.3]}>
            <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[pos[0] > 0 ? -0.55 : 0.55, 3.4, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshBasicMaterial color="#e0f2fe" />
          </mesh>
          <pointLight
            position={[pos[0] > 0 ? -0.55 : 0.55, 3.3, 0]}
            color="#bae6fd"
            intensity={1.8}
            distance={7}
          />
        </group>
      ))}
    </group>
  );
}

function FloatingCyberCapsule() {
  const capsuleRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (capsuleRef.current) {
      capsuleRef.current.position.y = 0.55 + Math.sin(t * 1.8) * 0.06;
      capsuleRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group ref={capsuleRef} position={[0, 0.55, 0]}>
      {/* Horizontal capsule cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.9, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* End caps */}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.06, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* Center glowing violet/cyan seam line reflecting on the floor */}
      <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.23, 0.02, 16, 32]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      <pointLight color="#c084fc" intensity={3} distance={5} />
      <pointLight color="#38bdf8" intensity={2.5} distance={6} position={[0, -0.3, 0]} />
    </group>
  );
}

function RainAndMist({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3 + 1] -= delta * 6;
        if (arr[i * 3 + 1] < 0) {
          arr[i * 3 + 1] = 12;
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
      <pointsMaterial size={0.06} color="#93c5fd" transparent opacity={0.65} />
    </points>
  );
}

// Stepper items that map directly to website sections
const STEPPER_ITEMS = [
  { id: 'mission', num: '01', title: 'ARRIVAL', active: true },
  { id: 'profile', num: '02', title: 'THE STORY', active: false },
  { id: 'vision', num: '03', title: 'VISTAS', active: false },
  { id: 'domains', num: '04', title: 'DOMAINS', active: false },
  { id: 'projects', num: '05', title: 'BUILDS', active: false },
  { id: 'events', num: '06', title: 'EVENTS', active: false },
  { id: 'governance', num: '07', title: 'GOVERNANCE', active: false },
  { id: 'team', num: '08', title: 'CREW', active: false }
];

// -------------------------------------------------------------
// Master Arrival Entry Animation Component
// -------------------------------------------------------------
export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  isSoundMuted = false,
  onToggleSound
}) => {
  const [isEntering, setIsEntering] = useState(false);
  const [soundtrackPlaying, setSoundtrackPlaying] = useState(soundEngine.isSoundtrackActive());
  const [fullMotion, setFullMotion] = useState(true);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  useEffect(() => {
    soundEngine.playJarvisChirp();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExploreOpen) {
        if (e.key === 'Escape') setIsExploreOpen(false);
        return;
      }
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        handleEnter();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isExploreOpen && e.deltaY > 30) {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isExploreOpen]);

  const handleEnter = (targetSectionId?: string) => {
    if (isEntering) return;
    setIsEntering(true);
    soundEngine.playHologramActivate();
    soundEngine.startAmbientHum();
    setTimeout(() => {
      onComplete(targetSectionId);
    }, 600);
  };

  const handleToggleSoundtrack = () => {
    soundEngine.playClick();
    const active = soundEngine.toggleSoundtrack();
    setSoundtrackPlaying(active);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isEntering ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#020408] text-white select-none overflow-hidden font-sans"
    >
      {/* 3D WebGL Canvas Scene (Arrival Atmosphere) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.2, 5.5], fov: 50 }}>
          <color attach="background" args={['#020408']} />
          <fogExp2 attach="fog" args={['#020408', 0.07]} />

          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 10, 5]} intensity={0.8} color="#e0f2fe" />

          <StreetlampsAndRoad />
          <FloatingCyberCapsule />
          <RainAndMist />
        </Canvas>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,#020408_95%)]" />

      {/* ----------------------------------------------------------- */}
      {/* Top Header HUD (matches screenshot) */}
      {/* ----------------------------------------------------------- */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-b from-[#020408]/90 via-[#020408]/50 to-transparent">
        {/* Left: Brand + | 01 ARRIVAL */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border border-[#38BDF8]/60 p-0.5 bg-[#030611] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.3)]">
              <img
                src={CHAPTER_INFO.logoUrl}
                alt="VISTAS ACM"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white tracking-widest uppercase">
                <span>VISTAS</span>
                <span className="text-[#38BDF8]">ACM</span>
              </div>
              <span className="text-[9px] font-mono text-[#64748b] tracking-wider uppercase hidden sm:block">
                STUDENT CHAPTER
              </span>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-[#334155] hidden sm:block" />

          {/* Active 01 ARRIVAL badge */}
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
            <span className="text-[#F97316] font-bold">01</span>
            <span className="text-[#e2e8f0] font-semibold tracking-[0.2em] uppercase text-[11px] sm:text-xs">
              ARRIVAL
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-[11px] tracking-wider text-[#94a3b8]">
          {/* Soundtrack button */}
          <button
            onClick={handleToggleSoundtrack}
            onMouseEnter={() => soundEngine.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              soundtrackPlaying
                ? 'border-[#F97316]/70 text-[#F97316] bg-[#F97316]/10'
                : 'border-[#1e293b] hover:border-[#64748b] text-[#94a3b8] hover:text-white'
            }`}
            title="Toggle Ambient Soundtrack"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                soundtrackPlaying ? 'bg-[#F97316] animate-pulse' : 'bg-[#64748b]'
              }`}
            />
            <span className="text-[10px] sm:text-[11px] uppercase">
              🎵 {soundtrackPlaying ? 'SOUNDTRACK ON' : 'SOUNDTRACK'}
            </span>
          </button>

          {/* Motion toggle */}
          <button
            onClick={() => setFullMotion(!fullMotion)}
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#1e293b] hover:border-[#64748b] hover:text-white transition-all cursor-pointer"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                fullMotion ? 'bg-[#38BDF8]' : 'bg-[#64748b]'
              }`}
            />
            <span className="text-[10px] uppercase">
              {fullMotion ? 'FULL MOTION' : 'REDUCED MOTION'}
            </span>
          </button>

          {/* TEXT VERSION / SKIP BUTTON */}
          <button
            onClick={() => handleEnter()}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#38BDF8]/50 hover:border-[#38BDF8] text-[#38BDF8] hover:text-white bg-[#030611]/80 hover:bg-[#38BDF8]/20 transition-all cursor-pointer font-bold"
          >
            <FileText className="w-3 h-3 text-[#38BDF8]" />
            <span className="text-[10px] sm:text-[11px] uppercase">TEXT VERSION</span>
          </button>

          {/* EXPLORE + Drawer */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsExploreOpen(true);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#334155] hover:border-[#38BDF8] text-white bg-[#071329]/90 hover:bg-[#0f1f3d] transition-all cursor-pointer font-bold tracking-widest text-[11px]"
          >
            <span>EXPLORE</span>
            <span className="text-[#F97316] font-extrabold">+</span>
          </button>
        </div>
      </header>

      {/* ----------------------------------------------------------- */}
      {/* Right Stepper HUD (matches screenshot) */}
      {/* ----------------------------------------------------------- */}
      <aside className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-end select-none font-mono text-xs">
        <div className="flex flex-col items-end gap-3.5 relative py-2">
          {STEPPER_ITEMS.map((item) => (
            <button
              key={item.num}
              onClick={() => handleEnter(item.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className="group flex items-center gap-3 cursor-pointer focus:outline-none transition-all duration-200"
              title={`Jump to ${item.title}`}
            >
              <span
                className={`text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 ${
                  item.active
                    ? 'opacity-100 text-[#F97316]'
                    : 'opacity-0 group-hover:opacity-100 text-[#94a3b8] group-hover:text-white translate-x-1 group-hover:translate-x-0 hidden sm:inline-block'
                }`}
              >
                {item.title}
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold transition-colors ${
                    item.active
                      ? 'text-[#F97316]'
                      : 'text-[#475569] group-hover:text-[#94a3b8]'
                  }`}
                >
                  {item.num}
                </span>

                <span
                  className={`w-2.5 h-[2px] rounded-full transition-all ${
                    item.active
                      ? 'bg-[#F97316] w-4 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
                      : 'bg-[#334155] group-hover:bg-[#94a3b8]'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* 02% percentage readout at bottom */}
        <div className="mt-4 pt-3 border-t border-[#1e293b]/80 text-right">
          <span className="text-[#F97316] font-bold text-xs tracking-widest">
            02%
          </span>
        </div>
      </aside>

      {/* ----------------------------------------------------------- */}
      {/* Center Brand & Enter Trigger (matches screenshot) */}
      {/* ----------------------------------------------------------- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center pointer-events-auto"
        >
          {/* Glowing Emblem with Circular Halo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#38BDF8]/70 p-1 mb-5 bg-[#030611]/90 shadow-[0_0_35px_rgba(56,189,248,0.5)]">
            <img
              src={CHAPTER_INFO.logoUrl}
              alt="VISTAS ACM Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Association For Computing Machinery */}
          <div className="font-mono text-xs sm:text-sm text-[#FF1E56] tracking-[0.3em] uppercase font-bold mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            ASSOCIATION FOR COMPUTING MACHINERY
          </div>

          {/* VISTAS ACM */}
          <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,1)]">
            VISTAS <span className="text-[#38BDF8] glow-blue">ACM</span>
          </h1>

          {/* Student Chapter · Group ID 199704 */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#94a3b8] tracking-[0.25em] uppercase mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            <span>STUDENT CHAPTER</span>
            <span className="text-[#38BDF8]">❖</span>
            <span>GROUP ID {CHAPTER_INFO.groupId}</span>
          </div>

          {/* Action Trigger Button: ENTER ODYSSEY > */}
          <div className="mt-8 pointer-events-auto">
            <button
              onClick={() => handleEnter()}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-8 py-3.5 rounded-full bg-[#0284c7] hover:bg-[#38BDF8] text-white hover:text-[#020408] font-mono text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all group"
            >
              <span>ENTER ODYSSEY</span>
              <ChevronRight className="w-4 h-4 text-[#F97316] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* Bottom Footer Controls (matches screenshot) */}
      {/* ----------------------------------------------------------- */}
      <footer className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-gradient-to-t from-[#020408]/90 via-[#020408]/40 to-transparent font-mono text-xs text-[#94a3b8]">
        {/* Left: SOUND ON */}
        <button
          onClick={() => {
            if (onToggleSound) onToggleSound();
            else soundEngine.toggleMute();
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase hover:text-white transition-colors cursor-pointer"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              !isSoundMuted ? 'bg-[#38BDF8] animate-pulse' : 'bg-[#64748b]'
            }`}
          />
          <span>{!isSoundMuted ? 'SOUND ON' : 'SOUND MUTED'}</span>
        </button>

        {/* Center: v SCROLL OR USE ARROW KEYS TO EXPLORE */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#64748b] tracking-[0.2em] uppercase animate-bounce cursor-pointer" onClick={() => handleEnter()}>
          <ChevronDown className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>SCROLL OR USE ARROW KEYS TO EXPLORE</span>
        </div>

        {/* Right: — SKIP TO CREW */}
        <button
          onClick={() => handleEnter('team')}
          onMouseEnter={() => soundEngine.playHover()}
          className="flex items-center gap-1 text-[10px] sm:text-[11px] tracking-widest uppercase text-[#64748b] hover:text-white transition-colors cursor-pointer"
        >
          <span>— SKIP TO CREW</span>
        </button>
      </footer>

      {/* ----------------------------------------------------------- */}
      {/* Explore Drawer Modal (Direct Jump to Any Section) */}
      {/* ----------------------------------------------------------- */}
      <AnimatePresence>
        {isExploreOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-end bg-black/80 backdrop-blur-xl select-none">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg h-full bg-[#030611] border-l border-[#1b2a47] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2a47]">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-white">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
                    <span>DIRECTORY OF TRANSMISSIONS</span>
                  </div>
                  <button
                    onClick={() => setIsExploreOpen(false)}
                    className="p-1 rounded-full border border-[#1b2a47] hover:border-white text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 font-mono text-xs">
                  {[
                    { id: 'mission', label: '01 / MISSION HOME' },
                    { id: 'profile', label: '02 / ABOUT & FOUNDATION' },
                    { id: 'vision', label: '03 / VISION & THREE PILLARS' },
                    { id: 'domains', label: '04 / TECHNICAL GALAXY' },
                    { id: 'projects', label: '05 / CHAPTER BUILDS' },
                    { id: 'events', label: '06 / LAUNCHES & HACKATHONS' },
                    { id: 'governance', label: '07 / GOVERNANCE STRUCTURE' },
                    { id: 'team', label: '08 / CREW & LEADERSHIP' },
                    { id: 'gallery', label: '09 / MEDIA ARCHIVE' },
                    { id: 'contact', label: '10 / TRANSMISSIONS & JOIN' }
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setIsExploreOpen(false);
                        handleEnter(sec.id);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="p-3 rounded-lg border border-[#162238] hover:border-[#38BDF8] bg-[#071329]/50 hover:bg-[#0c1f42] text-left text-[#cbd5e1] hover:text-white flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>{sec.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1b2a47] font-mono text-[11px] text-[#64748b]">
                {CHAPTER_INFO.fullName} · ID {CHAPTER_INFO.groupId}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
