import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const CAPABILITIES = [
  { label: "Web Apps", icon: "⚡", lat: 20, lng: 30 },
  { label: "Mobile", icon: "📱", lat: -15, lng: 120 },
  { label: "AI / ML", icon: "🧠", lat: 45, lng: -60 },
  { label: "Cloud", icon: "☁️", lat: -40, lng: -130 },
  { label: "Video", icon: "🎬", lat: 60, lng: 160 },
  { label: "Design", icon: "🎨", lat: -55, lng: 60 },
  { label: "DevOps", icon: "🔧", lat: 10, lng: -170 },
  { label: "APIs", icon: "🔗", lat: -30, lng: -30 },
  { label: "Security", icon: "🛡️", lat: 35, lng: 90 },
  { label: "Analytics", icon: "📊", lat: -10, lng: -90 },
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeWireframe() {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  // Rotation from mouse
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0.3, y: 0 });

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;
    mouseTarget.current.x = mouse.y * 0.4;
    mouseTarget.current.y = mouse.x * 0.8;

    currentRotation.current.x += (mouseTarget.current.x - currentRotation.current.x) * 0.03;
    currentRotation.current.y += (mouseTarget.current.y - currentRotation.current.y) * 0.03;

    // Add slow auto-rotation
    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y + performance.now() * 0.00008;
  });

  const radius = Math.min(viewport.width, viewport.height) * 0.32;
  const globeRadius = Math.max(1.6, Math.min(2.2, radius));

  // Generate grid lines
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 4) {
        pts.push(latLngToVec3(lat, lng, globeRadius));
      }
      lines.push(pts);
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        pts.push(latLngToVec3(lat, lng, globeRadius));
      }
      lines.push(pts);
    }

    return lines;
  }, [globeRadius]);

  // Generate dot grid for landmass effect
  const dots = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 600; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, [globeRadius]);

  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(dots.length * 3);
    dots.forEach((d, i) => {
      positions[i * 3] = d.x;
      positions[i * 3 + 1] = d.y;
      positions[i * 3 + 2] = d.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [dots]);

  // Connection arcs between some capabilities
  const arcs = useMemo(() => {
    const pairs = [
      [0, 1], [2, 3], [4, 5], [6, 7], [1, 8], [3, 9],
    ];
    return pairs.map(([a, b]) => {
      const start = latLngToVec3(CAPABILITIES[a].lat, CAPABILITIES[a].lng, globeRadius);
      const end = latLngToVec3(CAPABILITIES[b].lat, CAPABILITIES[b].lng, globeRadius);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(globeRadius * 1.3);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(40);
    });
  }, [globeRadius]);

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.02, 32, 32]} />
        <meshBasicMaterial
          color="#1a8fff"
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Wireframe grid */}
      {gridLines.map((pts, i) => (
        <line key={`grid-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              count={pts.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1a8fff" transparent opacity={0.12} />
        </line>
      ))}

      {/* Dot scatter */}
      <points geometry={dotGeometry}>
        <pointsMaterial
          color="#38bdf8"
          size={0.025}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Connection arcs */}
      {arcs.map((pts, i) => (
        <line key={`arc-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              count={pts.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </line>
      ))}

      {/* Capability markers */}
      {CAPABILITIES.map((cap, i) => {
        const pos = latLngToVec3(cap.lat, cap.lng, globeRadius);
        const outerPos = latLngToVec3(cap.lat, cap.lng, globeRadius + 0.25);
        return (
          <group key={i}>
            {/* Pin dot */}
            <mesh position={pos}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            {/* Pin line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array([pos.x, pos.y, pos.z, outerPos.x, outerPos.y, outerPos.z])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
            </line>
            {/* Label */}
            <Float speed={1.5} floatIntensity={0.15} rotationIntensity={0}>
              <Text
                position={[outerPos.x * 1.12, outerPos.y * 1.12, outerPos.z * 1.12]}
                fontSize={0.12}
                color="#93c5fd"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Medium.woff"
                outlineWidth={0.005}
                outlineColor="#000000"
              >
                {cap.label}
              </Text>
            </Float>
          </group>
        );
      })}

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[globeRadius * 1.15, 0.008, 8, 100]} />
        <meshBasicMaterial color="#1a8fff" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[globeRadius * 1.25, 0.006, 8, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function TechGlobe() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[550px] relative">
      {/* Radial glow behind globe */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] rounded-full bg-primary/10 blur-[80px]" />
      </div>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ cursor: "grab" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <GlobeWireframe />
      </Canvas>
    </div>
  );
}
