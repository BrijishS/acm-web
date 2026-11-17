import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from '../audio/soundEngine';
import { CHAPTER_INFO } from '../data/chapterData';
import { ChevronRight, FastForward, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

// -------------------------------------------------------------
// 3D Cinematic Game-Intro Portal Scene (Three.js)
// -------------------------------------------------------------
function PortalScene({ onArrival }: { onArrival: () => void }) {
  const portalRef = useRef<THREE.Group>(null);
  const rainRef = useRef<THREE.Points>(null);
  const cameraRef = useRef<{ z: number; arrived: boolean }>({ z: 12, arrived: false });

  // Rain & atmospheric dust particles
  const [rainPositions] = useState(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  });

  useFrame((state, delta) => {
    // Cinematic forward camera dolly movement
    if (cameraRef.current.z > 2.8) {
      cameraRef.current.z -= delta * 2.2;
      state.camera.position.z = cameraRef.current.z;
      state.camera.position.y = 1.0 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      state.camera.lookAt(0, 1.2, 0);
    } else if (!cameraRef.current.arrived) {
      cameraRef.current.arrived = true;
      onArrival();
    }

    // Rain particles falling downwards
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] -= delta * 7;
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 12;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Rotating portal rings
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <>
      <color attach="background" args={['#020408']} />
      <fogExp2 attach="fog" args={['#020408', 0.08]} />

      {/* Atmospheric lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 8, 4]} intensity={0.8} color="#e0f2fe" />
      <pointLight position={[0, 2.5, -2]} intensity={5} color="#38BDF8" distance={15} />
      <pointLight position={[0, 0.5, 0]} intensity={3} color="#FF1E56" distance={10} />

      {/* Reflective Ground Wet Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.12}
          metalness={0.88}
        />
      </mesh>

      {/* Futuristic Portal Archways with Laser Crimson & Cyan Glow */}
      <group position={[0, 2, -1]}>
        {/* Outer Hexagonal Ring */}
        <group ref={portalRef}>
          <mesh>
            <torusGeometry args={[2.4, 0.06, 16, 6]} />
            <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1.2} />
          </mesh>
          <mesh>
            <torusGeometry args={[2.0, 0.04, 16, 32]} />
            <meshStandardMaterial color="#FF1E56" emissive="#FF1E56" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Illuminated Portal Gate Columns */}
        {[-2.6, 2.6].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]}>
            <boxGeometry args={[0.3, 4.5, 0.4]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Inner Laser Horizon Aperture */}
        <mesh position={[0, 0, -0.2]}>
          <circleGeometry args={[1.8, 32]} />
          <meshBasicMaterial color="#0b1b36" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* Rain & Dust Particles */}
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rainPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#7dd3fc" transparent opacity={0.65} />
      </points>
    </>
  );
}

// -------------------------------------------------------------
// Master Cinematic Intro Component
// -------------------------------------------------------------
export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [sceneArrived, setSceneArrived] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    soundEngine.playJarvisChirp();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEnter = () => {
    setIsEntering(true);
    soundEngine.playHologramActivate();
    soundEngine.startAmbientHum();
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isEntering ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#020408] text-chrome select-none overflow-hidden"
    >
      {/* 3D WebGL Atmospheric Portal Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.4, 12], fov: 50 }}>
          <PortalScene onArrival={() => setSceneArrived(true)} />
        </Canvas>
      </div>

      {/* Vignette & Cinematic Letterbox Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#020408_95%)]" />

      {/* Top Header Controls */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between font-mono text-xs tracking-widest text-[#94a3b8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E56] animate-ping" />
          <span className="text-white font-bold">VISTAS ACM</span>
          <span className="text-[#64748b]">/</span>
          <span className="text-cerulean">CINEMATIC OPENING</span>
        </div>

        <button
          onClick={handleEnter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1b2a47] hover:border-cerulean text-[#94a3b8] hover:text-white transition-colors cursor-pointer bg-[#030611]/80 backdrop-blur-md"
        >
          <FastForward className="w-3.5 h-3.5 text-rose" />
          <span>SKIP INTRO [ESC]</span>
        </button>
      </div>

      {/* Dramatic Brand Reveal at Portal Arrival */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: sceneArrived ? 1 : 0.4, scale: sceneArrived ? 1 : 0.95 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          {/* Logo Aperture */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-cerulean/60 p-1 mb-5 bg-[#030611]/90 shadow-[0_0_30px_rgba(56,189,248,0.5)]">
            <img
              src={CHAPTER_INFO.logoUrl}
              alt="VISTAS ACM Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="font-mono text-xs sm:text-sm text-rose tracking-[0.3em] uppercase font-bold mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            ASSOCIATION FOR COMPUTING MACHINERY
          </div>

          <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,1)]">
            VISTAS <span className="text-cerulean glow-blue">ACM</span>
          </h1>

          <p className="font-mono text-xs sm:text-sm text-chrome tracking-[0.25em] uppercase mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            FUTURE INNOVATION COMMAND CENTER
          </p>

          {/* Action Trigger Button */}
          <div className="mt-8 pointer-events-auto">
            <button
              onClick={handleEnter}
              onMouseEnter={() => soundEngine.playHover()}
              className="cyber-btn-blue px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(56,189,248,0.6)]"
            >
              <span>ENTER EXPERIENCE</span>
              <ChevronRight className="w-4 h-4 text-rose" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Tag */}
      <div className="absolute bottom-5 inset-x-0 text-center font-mono text-[10px] text-chrome/50 tracking-widest uppercase pointer-events-none">
        CHARTERED MAY 19, 2025 · VELS INSTITUTE OF SCIENCE, TECHNOLOGY AND ADVANCED STUDIES
      </div>
    </motion.div>
  );
};
