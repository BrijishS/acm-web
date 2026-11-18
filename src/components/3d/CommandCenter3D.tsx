// ============================================================================
// VISTAS ACM — Mission Control 2.0
// Cinematic 3D AI Command Environment (Iron Man Holographic Command Center)
// ============================================================================

import React, { useRef, useMemo, useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ----------------------------------------------------------------------------
// WebGL Error Boundary Fallback
// ----------------------------------------------------------------------------
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("3D WebGL Canvas fallback triggered:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ----------------------------------------------------------------------------
// 1. Distant Holographic Orbital Structures (Layer 1: Depth z = -6 to -10)
// ----------------------------------------------------------------------------
function DistantOrbitalStructures({ reducedMotion }: { reducedMotion: boolean }) {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.08;
      ring1Ref.current.rotation.x = Math.sin(t * 0.15) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.06;
      ring2Ref.current.rotation.z = Math.cos(t * 0.18) * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.05;
      ring3Ref.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <group position={[0, -0.4, -7.5]}>
      {/* Primary Distant Macro-Orbital Ring (Diameter ~14 units) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[7.2, 0.025, 16, 96]} />
          <meshBasicMaterial color="#007BFF" transparent opacity={0.22} />
        </mesh>
        {/* Subtle LED telemetry notches along the perimeter */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          return (
            <mesh key={i} position={[Math.cos(angle) * 7.2, Math.sin(angle) * 7.2, 0]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshBasicMaterial color="#00CFFF" transparent opacity={0.55} />
            </mesh>
          );
        })}
      </group>

      {/* Secondary Counter-Rotating Ring (Diameter ~11 units) */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[5.5, 0.02, 16, 72]} />
          <meshBasicMaterial color="#00CFFF" transparent opacity={0.18} />
        </mesh>
      </group>

      {/* Tertiary Tilted Gyro Ring (Diameter ~8 units) */}
      <group ref={ring3Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[4.2, 0.018, 12, 64]} />
          <meshBasicMaterial color="#C0C0C0" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Faint Concentric Coordinate Disc Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <ringGeometry args={[2.5, 9.5, 48]} />
        <meshBasicMaterial color="#007BFF" wireframe transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------
// 2. Peripheral Floating Holographic Geometric Crystals (Layer 2: Outer Flanks)
// Kept away from screen center to maintain pristine text legibility
// ----------------------------------------------------------------------------
function FloatingHoloCrystal({
  position,
  rotationSpeed = 0.3,
  scale = 1.0,
  color = '#00CFFF',
  reducedMotion = false
}: {
  position: [number, number, number];
  rotationSpeed?: number;
  scale?: number;
  color?: string;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const basePosY = position[1];

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += delta * rotationSpeed;
    groupRef.current.rotation.x += delta * (rotationSpeed * 0.6);
    groupRef.current.position.y = basePosY + Math.sin(t * 1.2 + position[0]) * 0.18;
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
      {/* Inner Dense Core */}
      <mesh>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#071522" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Peripheral Accent Point Light */}
      <pointLight color={color} intensity={1.2} distance={3.5} />
    </group>
  );
}

// ----------------------------------------------------------------------------
// 3. Animated Digital Energy Streams (Continuous Vertical/Diagonal Data Flow)
// ----------------------------------------------------------------------------
function DigitalEnergyStream({
  x,
  z,
  speed = 1.8,
  length = 3.5,
  color = '#00CFFF',
  reducedMotion = false
}: {
  x: number;
  z: number;
  speed?: number;
  length?: number;
  color?: string;
  reducedMotion?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.position.y += delta * speed;
    if (meshRef.current.position.y > 6.0) {
      meshRef.current.position.y = -6.0;
    }
  });

  return (
    <mesh ref={meshRef} position={[x, (Math.random() - 0.5) * 8, z]}>
      <cylinderGeometry args={[0.015, 0.015, length, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

// ----------------------------------------------------------------------------
// 4. Peripheral Neural Constellation Network with Connecting Glowing Lines
// Positioned exclusively on left and right wings (x <= -3.2 or x >= 3.2)
// ----------------------------------------------------------------------------
function PeripheralNeuralNetwork({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 42;

  // Generate nodes strictly on the outer flanks
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const isLeft = i % 2 === 0;
      const x = isLeft ? -3.4 - Math.random() * 3.8 : 3.4 + Math.random() * 3.8;
      const y = (Math.random() - 0.5) * 6.5;
      const z = -1.5 - Math.random() * 4.5;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect close neighbors
    const linePairs: number[] = [];
    const maxDist = 2.4;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist) {
          linePairs.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePairs.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const posArray = new Float32Array(nodes.length * 3);
    for (let i = 0; i < nodes.length; i++) {
      posArray[i * 3] = nodes[i].x;
      posArray[i * 3 + 1] = nodes[i].y;
      posArray[i * 3 + 2] = nodes[i].z;
    }

    return {
      nodePositions: posArray,
      linePositions: new Float32Array(linePairs)
    };
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Glowing Neural Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodePositions.length / 3} array={nodePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#00CFFF" transparent opacity={0.75} blending={THREE.AdditiveBlending} />
      </points>

      {/* Connective Laser Synapse Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#007BFF" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

// ----------------------------------------------------------------------------
// 5. Ambient 3D Micro-Particle Field (Spatial Depth & Pointer Reaction)
// ----------------------------------------------------------------------------
function AmbientAtmosphericDust({
  count = 220,
  reducedMotion = false
}: {
  count?: number;
  reducedMotion?: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Disperse across wide frustum
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      spd[i] = 0.15 + Math.random() * 0.45;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !pointsRef.current) return;
    const { x, y } = state.pointer;
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -y * 0.08, 0.05);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, x * 0.08, 0.05);

    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.4;
      if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#00CFFF"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ----------------------------------------------------------------------------
// 6. Interactive Multi-Layer Camera Rig with Pointer Parallax
// ----------------------------------------------------------------------------
function ParallaxCameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame((state) => {
    if (reducedMotion) return;
    const { x, y } = state.pointer;
    // Smooth natural damping
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 0.75, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.4 + 0.2, 0.04);
    state.camera.lookAt(0, 0, -2);
  });
  return null;
}

// ----------------------------------------------------------------------------
// Master 3D Command Center Background Component
// ----------------------------------------------------------------------------
export function CommandCenter3D() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [particleDensity, setParticleDensity] = useState<number>(220);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReducedMotion(true);
      }
      // Responsive density scaling
      if (window.innerWidth < 640) {
        setParticleDensity(80); // Mobile
      } else if (window.innerWidth < 1024) {
        setParticleDensity(140); // Tablet
      } else {
        setParticleDensity(240); // Desktop
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Space Atmospheric Radial Glow (Clean Center, Glowing Periphery) */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-[#007BFF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-[#00CFFF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#071522]/30 blur-[140px] pointer-events-none" />

      {/* 2. WebGL 3D Spatial Environment */}
      <WebGLErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            <div className="w-[600px] h-[600px] rounded-full border border-cerulean/20 border-dashed animate-spin pointer-events-none" style={{ animationDuration: '45s' }} />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0.2, 5.8], fov: 46 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full block"
        >
          {/* Volumetric Blue Atmosphere Fog */}
          <color attach="background" args={['#030609']} />
          <fogExp2 attach="fog" args={['#030609', 0.055]} />

          {/* Interactive Parallax Camera Rig */}
          <ParallaxCameraRig reducedMotion={reducedMotion} />

          {/* Volumetric Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 6, 3]} intensity={1.0} color="#00CFFF" />
          <directionalLight position={[-5, -4, 2]} intensity={0.8} color="#007BFF" />

          {/* LAYER 1: Distant Orbital Structures (z = -7.5) */}
          <DistantOrbitalStructures reducedMotion={reducedMotion} />

          {/* LAYER 2: Peripheral Neural Network with Glowing Synapse Lines */}
          <PeripheralNeuralNetwork reducedMotion={reducedMotion} />

          {/* LAYER 2: Floating Holographic Geometric Crystals (Left & Right Flanks) */}
          <FloatingHoloCrystal position={[-4.5, 1.8, -2.5]} rotationSpeed={0.35} scale={0.9} color="#00CFFF" reducedMotion={reducedMotion} />
          <FloatingHoloCrystal position={[-5.2, -1.6, -3.2]} rotationSpeed={0.25} scale={0.75} color="#007BFF" reducedMotion={reducedMotion} />
          <FloatingHoloCrystal position={[4.6, 1.5, -2.8]} rotationSpeed={0.3} scale={0.85} color="#00CFFF" reducedMotion={reducedMotion} />
          <FloatingHoloCrystal position={[5.4, -1.8, -3.5]} rotationSpeed={0.28} scale={0.7} color="#007BFF" reducedMotion={reducedMotion} />

          {/* LAYER 2: Vertical Digital Energy Streams (Peripheral Data Uplinks) */}
          <DigitalEnergyStream x={-4.8} z={-2.2} speed={1.6} length={3.2} color="#00CFFF" reducedMotion={reducedMotion} />
          <DigitalEnergyStream x={-3.6} z={-3.5} speed={2.2} length={2.5} color="#007BFF" reducedMotion={reducedMotion} />
          <DigitalEnergyStream x={4.8} z={-2.4} speed={1.8} length={3.0} color="#00CFFF" reducedMotion={reducedMotion} />
          <DigitalEnergyStream x={3.8} z={-3.2} speed={2.4} length={2.8} color="#007BFF" reducedMotion={reducedMotion} />

          {/* LAYER 3: Small Ambient Cyan & Silver Dust Particles (Depth & Pointer Reactivity) */}
          <AmbientAtmosphericDust count={particleDensity} reducedMotion={reducedMotion} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

export default CommandCenter3D;
