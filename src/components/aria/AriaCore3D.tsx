// ============================================================================
// A.R.I.A. — 3D Holographic AI Core
// Three.js / React Three Fiber Core Reactive to AI States
// ============================================================================

import React, { useRef, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AriaCoreState } from '../../types/aria';

interface AriaCore3DProps {
  state: AriaCoreState;
  waveform?: number[];
  reducedMotion?: boolean;
}

// -------------------------------------------------------------
// WebGL Error Boundary
// -------------------------------------------------------------
interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}
interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("A.R.I.A. 3D WebGL fallback triggered:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// -------------------------------------------------------------
// 3D Scene Components
// -------------------------------------------------------------
interface InnerCoreSceneProps {
  state: AriaCoreState;
  waveform: number[];
  reducedMotion: boolean;
}

function InnerCoreScene({ state, waveform, reducedMotion }: InnerCoreSceneProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const shieldMeshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);

  // Average waveform volume (0.0 to 1.0)
  const avgVolume = useMemo(() => {
    if (!waveform || waveform.length === 0) return 0.1;
    const sum = waveform.reduce((a, b) => a + b, 0);
    return sum / waveform.length;
  }, [waveform]);

  // Color mappings based on state
  const themeColors = useMemo(() => {
    switch (state) {
      case 'listening':
        return { primary: '#00F0FF', secondary: '#38BDF8', glow: '#00E5FF' };
      case 'thinking':
        return { primary: '#A855F7', secondary: '#38BDF8', glow: '#C084FC' };
      case 'speaking':
        return { primary: '#00F0FF', secondary: '#FF2E88', glow: '#38BDF8' };
      case 'error':
        return { primary: '#FF2E88', secondary: '#EF4444', glow: '#F43F5E' };
      case 'admin':
        return { primary: '#F59E0B', secondary: '#FF2E88', glow: '#FBBF24' };
      default: // standby / loading
        return { primary: '#38BDF8', secondary: '#007BFF', glow: '#0284C7' };
    }
  }, [state]);

  // Particle positions
  const particleCount = 180;
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      spd[i] = 0.4 + Math.random() * 0.8;
    }
    return [pos, spd];
  }, []);

  useFrame((sceneState, delta) => {
    if (reducedMotion) return;
    const t = sceneState.clock.getElapsedTime();

    // Speed multiplier by state
    const speedMult =
      state === 'thinking' ? 2.6 :
      state === 'listening' ? 1.4 :
      state === 'speaking' ? 1.8 : 0.8;

    // 1. Orbital Ring Rotations
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.45 * speedMult;
      outerRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.25;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y -= delta * 0.65 * speedMult;
      midRingRef.current.rotation.z = Math.cos(t * 0.6) * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.85 * speedMult;
      innerRingRef.current.rotation.z -= delta * 0.5 * speedMult;
    }

    // 2. Central Core Pulsing
    if (coreMeshRef.current) {
      let pulse = 1 + Math.sin(t * 3.5) * 0.08;
      if (state === 'speaking') {
        pulse = 1 + avgVolume * 0.45;
      } else if (state === 'listening') {
        pulse = 1 + Math.sin(t * 8) * 0.15;
      }
      coreMeshRef.current.scale.set(pulse, pulse, pulse);
    }

    // 3. Geometric Shield Counter-rotation
    if (shieldMeshRef.current) {
      shieldMeshRef.current.rotation.y += delta * 0.3 * speedMult;
      shieldMeshRef.current.rotation.x = Math.cos(t * 0.4) * 0.2;
    }

    // 4. Scanning Ring Vertical Sweep
    if (scanRingRef.current) {
      scanRingRef.current.position.y = Math.sin(t * (state === 'thinking' ? 5 : 2.5)) * 1.2;
      scanRingRef.current.rotation.z += delta * 0.8;
    }

    // 5. Particle Halo Drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.15 * speedMult;
      particlesRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic State Light Sources */}
      <pointLight color={themeColors.primary} intensity={3.5} distance={12} />
      <pointLight color={themeColors.secondary} intensity={2.0} distance={8} position={[0, 1.2, 1.5]} />

      {/* 1. Central Quantum Core Sphere */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={themeColors.primary}
          emissive={themeColors.glow}
          emissiveIntensity={state === 'speaking' ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Faceted Geometric Icosahedron Shield */}
      <mesh ref={shieldMeshRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color={themeColors.secondary}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 3. Outer Gimbal Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[1.85, 0.035, 16, 64]} />
          <meshStandardMaterial
            color={themeColors.primary}
            emissive={themeColors.primary}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* LED telemetry notches */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, 0]}>
              <boxGeometry args={[0.09, 0.09, 0.09]} />
              <meshBasicMaterial color={themeColors.glow} />
            </mesh>
          );
        })}
      </group>

      {/* 4. Middle Gimbal Ring */}
      <group ref={midRingRef}>
        <mesh>
          <torusGeometry args={[1.45, 0.03, 16, 64]} />
          <meshStandardMaterial
            color={themeColors.secondary}
            emissive={themeColors.secondary}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* 5. Inner Fast Gimbal Ring */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.15, 0.025, 16, 48]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={themeColors.primary}
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* 6. Vertical Laser Scan Ring */}
      <mesh ref={scanRingRef}>
        <ringGeometry args={[1.0, 1.05, 32]} />
        <meshBasicMaterial
          color={themeColors.glow}
          side={THREE.DoubleSide}
          transparent
          opacity={state === 'thinking' ? 0.75 : 0.35}
        />
      </mesh>

      {/* 7. Reactive Particle Halo */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color={themeColors.primary}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// -------------------------------------------------------------
// High-Fidelity 2D Canvas Fallback
// -------------------------------------------------------------
const CoreFallback2D: React.FC<{ state: AriaCoreState }> = ({ state }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-cerulean/40 animate-spin"
          style={{ animationDuration: state === 'thinking' ? '6s' : '20s' }}
        />
        {/* Middle Ring */}
        <div
          className="absolute inset-4 rounded-full border border-rose/40 animate-spin"
          style={{ animationDuration: '14s', animationDirection: 'reverse' }}
        />
        {/* Inner Ring */}
        <div
          className="absolute inset-8 rounded-full border-2 border-cerulean/70 animate-spin"
          style={{ animationDuration: '10s' }}
        />
        {/* Glowing Center */}
        <div
          className={`w-16 h-16 rounded-full shadow-[0_0_40px_rgba(0,207,255,0.8)] transition-colors duration-500 ${
            state === 'listening' ? 'bg-[#00F0FF] animate-ping' :
            state === 'thinking' ? 'bg-purple-500 animate-pulse' :
            state === 'speaking' ? 'bg-[#FF2E88] animate-bounce' :
            state === 'error' ? 'bg-rose animate-pulse' :
            state === 'admin' ? 'bg-amber-400 animate-pulse' :
            'bg-cerulean animate-pulse'
          }`}
        />
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Main Exported 3D Component
// -------------------------------------------------------------
export const AriaCore3D: React.FC<AriaCore3DProps> = ({
  state,
  waveform = new Array(24).fill(0.05),
  reducedMotion = false
}) => {
  return (
    <div className="relative w-full h-full min-h-[280px]">
      <WebGLErrorBoundary fallback={<CoreFallback2D state={state} />}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full block"
        >
          <ambientLight intensity={0.4} />
          <InnerCoreScene
            state={state}
            waveform={waveform}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
