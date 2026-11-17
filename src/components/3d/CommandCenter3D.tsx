import React, { useRef, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// -------------------------------------------------------------
// WebGL Error Boundary Fallback
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// 1. Quantum Holographic Core (Tony Stark Arc Reactor Inspired)
// -------------------------------------------------------------
function QuantumCore() {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const energyBeamsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.45;
      outerRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.z -= delta * 0.65;
      midRingRef.current.rotation.y = Math.cos(t * 0.6) * 0.25;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.8;
      innerRingRef.current.rotation.y += delta * 0.4;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 3.5) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (energyBeamsRef.current) {
      energyBeamsRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Plasma Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 3]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.85} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Point lights for real-time metallic illumination */}
      <pointLight color="#38BDF8" intensity={4} distance={15} />
      <pointLight color="#FF3B9D" intensity={2.5} distance={10} position={[0, 1.5, 1]} />

      {/* Outer Metallic Gimbal Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.2, 0.045, 16, 64]} />
          <meshStandardMaterial color="#C5CBD3" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Cerulean LED nodes along the ring */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshBasicMaterial color="#38BDF8" />
            </mesh>
          );
        })}
      </group>

      {/* Middle Rotating Segment Ring (Neon Rose Accents) */}
      <group ref={midRingRef}>
        <mesh>
          <torusGeometry args={[1.7, 0.035, 16, 48]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.8} roughness={0.3} wireframe />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, 0]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshBasicMaterial color="#FF3B9D" />
            </mesh>
          );
        })}
      </group>

      {/* Inner Fast Gyro Ring */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.25, 0.025, 12, 36]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Holographic Concentric Grid Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <ringGeometry args={[0.8, 3.8, 32]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 2. Articulated Robotics Arm with Gripper & Laser Pointer
// -------------------------------------------------------------
function RoboticArm({ position, side }: { position: [number, number, number]; side: 'left' | 'right' }) {
  const armBaseRef = useRef<THREE.Group>(null);
  const lowerArmRef = useRef<THREE.Group>(null);
  const upperArmRef = useRef<THREE.Group>(null);
  const gripperLeftRef = useRef<THREE.Mesh>(null);
  const gripperRightRef = useRef<THREE.Mesh>(null);
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const multiplier = side === 'left' ? 1 : -1;

    if (armBaseRef.current) {
      armBaseRef.current.rotation.y = Math.sin(t * 0.6) * 0.4 * multiplier;
    }
    if (lowerArmRef.current) {
      lowerArmRef.current.rotation.z = (Math.sin(t * 0.8) * 0.25 - 0.2) * multiplier;
    }
    if (upperArmRef.current) {
      upperArmRef.current.rotation.z = (Math.cos(t * 0.7) * 0.35 + 0.3) * multiplier;
    }
    if (gripperLeftRef.current && gripperRightRef.current) {
      const grip = 0.08 + Math.sin(t * 1.8) * 0.04;
      gripperLeftRef.current.position.x = -grip;
      gripperRightRef.current.position.x = grip;
    }
    if (laserRef.current) {
      laserRef.current.scale.y = 1 + Math.sin(t * 4) * 0.1;
    }
  });

  return (
    <group ref={armBaseRef} position={position}>
      {/* Heavy Industrial Pedestal */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.4, 16]} />
        <meshStandardMaterial color="#1a2333" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Rotating Base Turret */}
      <mesh position={[0, -1.45, 0]}>
        <cylinderGeometry args={[0.42, 0.45, 0.35, 16]} />
        <meshStandardMaterial color="#C5CBD3" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Shoulder Joint Servo */}
      <mesh position={[0, -1.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.5, 16]} />
        <meshStandardMaterial color="#0e1726" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Lower Arm Bicep */}
      <group ref={lowerArmRef} position={[0, -1.15, 0]}>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.22, 1.7, 0.25]} />
          <meshStandardMaterial color="#1f293d" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Hydraulic Piston Cylinders */}
        <mesh position={[0.15, 0.9, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Elbow Joint */}
        <mesh position={[0, 1.75, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.4, 16]} />
          <meshStandardMaterial color="#C5CBD3" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Upper Arm Forearm */}
        <group ref={upperArmRef} position={[0, 1.75, 0]}>
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[0.18, 1.4, 0.2]} />
            <meshStandardMaterial color="#151e2e" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Wrist Assembly */}
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.18, 16]} />
            <meshStandardMaterial color="#FF3B9D" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Gripper Tool Head */}
          <group position={[0, 1.65, 0]}>
            {/* Left mechanical gripper finger */}
            <mesh ref={gripperLeftRef} position={[-0.08, 0.12, 0]}>
              <boxGeometry args={[0.05, 0.25, 0.08]} />
              <meshStandardMaterial color="#C5CBD3" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Right mechanical gripper finger */}
            <mesh ref={gripperRightRef} position={[0.08, 0.12, 0]}>
              <boxGeometry args={[0.05, 0.25, 0.08]} />
              <meshStandardMaterial color="#C5CBD3" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Scanning Laser Beam projecting downwards */}
            <mesh ref={laserRef} position={[0, -0.6, 0]}>
              <cylinderGeometry args={[0.015, 0.08, 1.2, 8]} />
              <meshBasicMaterial color={side === 'left' ? '#38BDF8' : '#FF3B9D'} transparent opacity={0.65} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// 3. Cybernetic Holographic HUD Panels Floating in 3D Space
// -------------------------------------------------------------
function FloatingHudPanel({ position, rotation, label, color = '#38BDF8' }: {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  color?: string;
}) {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (panelRef.current) {
      panelRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.12;
    }
  });

  return (
    <group ref={panelRef} position={position} rotation={rotation}>
      {/* Glass Pane */}
      <mesh>
        <planeGeometry args={[1.6, 0.95]} />
        <meshBasicMaterial color="#08101e" transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>
      {/* Hologram Border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.95)]} />
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
      {/* Internal UI lines */}
      <mesh position={[0, 0.25, 0.01]}>
        <planeGeometry args={[1.3, 0.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.4, -0.1, 0.01]}>
        <planeGeometry args={[0.5, 0.02]} />
        <meshBasicMaterial color="#C5CBD3" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.2, -0.1, 0.01]}>
        <planeGeometry args={[0.6, 0.02]} />
        <meshBasicMaterial color="#FF3B9D" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.25, 0.01]}>
        <planeGeometry args={[1.1, 0.02]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// 4. Volumetric Particle Network & Laser Scanning Plane
// -------------------------------------------------------------
function ParticleField() {
  const count = 350;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorCerulean = new THREE.Color('#38BDF8');
    const colorRose = new THREE.Color('#FF3B9D');
    const colorSilver = new THREE.Color('#C5CBD3');

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      const choice = Math.random();
      const c = choice > 0.6 ? colorCerulean : choice > 0.35 ? colorSilver : colorRose;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.075} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

// -------------------------------------------------------------
// 5. Interactive Camera Rig with Mouse Parallax
// -------------------------------------------------------------
function CameraRig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.8 + 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// -------------------------------------------------------------
// Master 3D Command Center Component
// -------------------------------------------------------------
export function CommandCenter3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <WebGLErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-jet via-jet-surface to-jet">
            <div className="w-96 h-96 rounded-full border border-cerulean/30 border-dashed animate-rotate-slow flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-rose/30 animate-rotate-reverse flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-cerulean/10 border border-cerulean shadow-hologram-blue" />
              </div>
            </div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0.6, 6.2], fov: 48 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <CameraRig />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 8, 4]} intensity={1.2} color="#FFFFFF" />
          <directionalLight position={[-4, -3, 2]} intensity={0.8} color="#38BDF8" />

          {/* Quantum Arc Reactor Core */}
          <QuantumCore />

          {/* Left and Right Industrial Robotic Arms */}
          <RoboticArm position={[-3.8, -0.6, -1]} side="left" />
          <RoboticArm position={[3.8, -0.6, -1]} side="right" />

          {/* Floating Telemetry HUD Panes */}
          <FloatingHudPanel position={[-2.8, 1.4, 0.5]} rotation={[0, 0.35, 0]} label="TELEMETRY 01" color="#38BDF8" />
          <FloatingHudPanel position={[2.8, 1.4, 0.5]} rotation={[0, -0.35, 0]} label="DIAGNOSTICS" color="#FF3B9D" />

          {/* Particle Network */}
          <ParticleField />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
export default CommandCenter3D;
