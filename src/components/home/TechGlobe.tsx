import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const CAPABILITIES = [
  "Web Apps", "Mobile", "AI / ML", "Cloud",
  "Video", "Design", "DevOps", "APIs",
  "Security", "Analytics",
];

function createGlobeScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4.2;

  const radius = 1.8;
  const group = new THREE.Group();
  scene.add(group);

  // Core sphere (dark fill)
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x0a1628, transparent: true, opacity: 0.85 });
  const coreGeo = new THREE.SphereGeometry(radius * 0.97, 32, 32);
  group.add(new THREE.Mesh(coreGeo, coreMat));

  // Wireframe sphere
  const wireGeo = new THREE.SphereGeometry(radius, 24, 18);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x1a8fff, wireframe: true, transparent: true, opacity: 0.12 });
  group.add(new THREE.Mesh(wireGeo, wireMat));

  // Surface dots
  const dotCount = 600;
  const dotGeo = new THREE.BufferGeometry();
  const dotPos = new Float32Array(dotCount * 3);
  for (let i = 0; i < dotCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    dotPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    dotPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    dotPos[i * 3 + 2] = radius * Math.cos(phi);
  }
  dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
  const dotMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.025, transparent: true, opacity: 0.5, sizeAttenuation: true });
  group.add(new THREE.Points(dotGeo, dotMat));

  // Helper: lat/lng to vec3
  function ll(lat: number, lng: number, r: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    );
  }

  // Capability positions
  const capCoords = [
    { lat: 20, lng: 30 }, { lat: -15, lng: 120 }, { lat: 45, lng: -60 },
    { lat: -40, lng: -130 }, { lat: 60, lng: 160 }, { lat: -55, lng: 60 },
    { lat: 10, lng: -170 }, { lat: -30, lng: -30 }, { lat: 35, lng: 90 },
    { lat: -10, lng: -90 },
  ];

  // Marker dots on surface
  const markerGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  capCoords.forEach((c) => {
    const pos = ll(c.lat, c.lng, radius);
    const mesh = new THREE.Mesh(markerGeo, markerMat);
    mesh.position.copy(pos);
    group.add(mesh);
  });

  // Connection arcs
  const arcPairs = [[0, 2], [1, 3], [4, 5], [6, 7], [8, 9], [0, 8]];
  const arcMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
  arcPairs.forEach(([a, b]) => {
    const s = ll(capCoords[a].lat, capCoords[a].lng, radius);
    const e = ll(capCoords[b].lat, capCoords[b].lng, radius);
    const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35);
    const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    const pts = curve.getPoints(30);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    group.add(new THREE.Line(geo, arcMat));
  });

  // Orbital rings
  const ring1Geo = new THREE.TorusGeometry(radius * 1.15, 0.008, 8, 100);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x1a8fff, transparent: true, opacity: 0.2 });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(radius * 1.25, 0.006, 8, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.12 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.set(1.2, 0.5, 0);
  group.add(ring2);

  // Text labels using Canvas textures (no font loading needed)
  CAPABILITIES.forEach((label, i) => {
    const c = capCoords[i];
    const pos = ll(c.lat, c.lng, radius + 0.3);

    const canvas2d = document.createElement("canvas");
    canvas2d.width = 256;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext("2d")!;
    ctx.clearRect(0, 0, 256, 64);
    ctx.font = "bold 28px monospace";
    ctx.fillStyle = "#93c5fd";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 128, 32);

    const texture = new THREE.CanvasTexture(canvas2d);
    texture.needsUpdate = true;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9, depthWrite: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(pos);
    sprite.scale.set(0.6, 0.15, 1);
    group.add(sprite);
  });

  // Mouse tracking
  const mouse = { x: 0, y: 0 };
  const targetRot = { x: 0.3, y: 0 };
  const currentRot = { x: 0.3, y: 0 };

  function onMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetRot.x = mouse.y * 0.4;
    targetRot.y = mouse.x * 0.8;
  }

  canvas.addEventListener("mousemove", onMouseMove);

  let animId: number;
  function animate() {
    animId = requestAnimationFrame(animate);
    currentRot.x += (targetRot.x - currentRot.x) * 0.03;
    currentRot.y += (targetRot.y - currentRot.y) * 0.03;
    group.rotation.x = currentRot.x;
    group.rotation.y = currentRot.y + performance.now() * 0.00008;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }
  animate();

  return () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousemove", onMouseMove);
    renderer.dispose();
  };
}

export function TechGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = createGlobeScene(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px] relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] rounded-full bg-primary/10 blur-[100px]" />
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: "grab" }}
      />
    </div>
  );
}
