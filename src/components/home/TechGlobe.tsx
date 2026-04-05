import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Line } from "@react-three/drei";
import * as THREE from "three";

const CAPABILITIES = [
  { label: "Web Apps", lat: 20, lng: 30 },
  { label: "Mobile", lat: -15, lng: 120 },
  { label: "AI / ML", lat: 45, lng: -60 },
  { label: "Cloud", lat: -40, lng: -130 },
  { label: "Video", lat: 60, lng: 160 },
  { label: "Design", lat: -55, lng: 60 },
  { label: "DevOps", lat: 10, lng: -170 },
  { label: "APIs", lat: -30, lng: -30 },
  { label: "Security", lat: 35, lng: 90 },
  { label: "Analytics", lat: -10, lng: -90 },
];

function latLngToVec3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function GlobeCore({ radius }: { radius: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0.3, y: 0 });

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    mouseTarget.current.x = mouse.y * 0.4;
    mouseTarget.current.y = mouse.x * 0.8;
    currentRot.current.x += (mouseTarget.current.x - currentRot.current.x) * 0.03;
    currentRot.current.y += (mouseTarget.current.y - currentRot.current.y) * 0.03;
    groupRef.current.rotation.x = currentRot.current.x;
    groupRef.current.rotation.y = currentRot.current.y + performance.now() * 0.00008;
  });

  // Latitude lines
  const latLines = useMemo(() => {
    const lines: [number, number, number][][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: [number, number, number][] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        pts.push(latLngToVec3(lat, lng, radius));
      }
      lines.push(pts);
    }
    return lines;
  }, [radius]);

  // Longitude lines
  const lngLines = useMemo(() => {
    const lines: [number, number, number][][] = [];
    for (let lng = 0; lng < 360; lng += 30) {
      const pts: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        pts.push(latLngToVec3(lat, lng, radius));
      }
      lines.push(pts);
    }
    return lines;
  }, [radius]);

  // Dots on surface
  const dotPositions = useMemo(() => {
    const pos = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [radius]);

  // Connection arcs
  const arcs = useMemo(() => {
    const pairs = [[0, 1], [2, 3], [4, 5], [6, 7], [1, 8], [3, 9]];
    return pairs.map(([a, b]) => {
      const s = new THREE.Vector3(...latLngToVec3(CAPABILITIES[a].lat, CAPABILITIES[a].lng, radius));
      const e = new THREE.Vector3(...latLngToVec3(CAPABILITIES[b].lat, CAPABILITIES[b].lng, radius));
      const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35);
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      return curve.getPoints(40).map((p): [number, number, number] => [p.x, p.y, p.z]);
    });
  }, [radius]);

  // Capability pin positions
  const pins = useMemo(() => {
    return CAPABILITIES.map((cap) => {
      const surface = latLngToVec3(cap.lat, cap.lng, radius);
      const outer = latLngToVec3(cap.lat, cap.lng, radius + 0.28);
      const labelPos = latLngToVec3(cap.lat, cap.lng, radius + 0.4);
      return { label: cap.label, surface, outer, labelPos };
    });
  }, [radius]);

  return (
    <group ref={groupRef}>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 32]} />
        <meshBasicMaterial color="#0a1628" transparent opacity={0.85} />
      </mesh>

      {/* Wireframe grid */}
      {latLines.map((pts, i) => (
        <Line key={`lat-${i}`} points={pts} color="#1a8fff" lineWidth={0.5} transparent opacity={0.15} />
      ))}
      {lngLines.map((pts, i) => (
        <Line key={`lng-${i}`} points={pts} color="#1a8fff" lineWidth={0.5} transparent opacity={0.15} />
      ))}

      {/* Surface dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={dotPositions} count={800} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#38bdf8" size={0.02} transparent opacity={0.45} sizeAttenuation />
      </points>

      {/* Arcs */}
      {arcs.map((pts, i) => (
        <Line key={`arc-${i}`} points={pts} color="#38bdf8" lineWidth={1} transparent opacity={0.35} />
      ))}

      {/* Capability markers */}
      {pins.map((pin, i) => (
        <group key={i}>
          {/* Dot on surface */}
          <mesh position={pin.surface}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          {/* Pulse ring */}
          <mesh position={pin.surface} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.05, 0.07, 16]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Pin line */}
          <Line points={[pin.surface, pin.outer]} color="#38bdf8" lineWidth={1} transparent opacity={0.5} />
          {/* Label */}
          <Float speed={1.5} floatIntensity={0.1} rotationIntensity={0}>
            <Text
              position={pin.labelPos}
              fontSize={0.11}
              color="#93c5fd"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.008}
              outlineColor="#000814"
            >
              {pin.label}
            </Text>
          </Float>
        </group>
      ))}

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.15, 0.008, 8, 100]} />
        <meshBasicMaterial color="#1a8fff" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[radius * 1.25, 0.006, 8, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export function TechGlobe() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[550px] relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] h-[60%] rounded-full bg-primary/8 blur-[80px]" />
      </div>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 50 }}
        style={{ cursor: "grab" }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeCore radius={2.0} />
      </Canvas>
    </div>
  );
}
