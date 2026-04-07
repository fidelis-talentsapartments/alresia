import { useRef, useEffect } from "react";
import * as THREE from "three";

const CAPABILITIES = [
  "Web Apps", "Mobile", "AI / ML", "Cloud",
  "Video", "Design", "DevOps", "APIs",
  "Security", "Analytics",
];

const capCoords = [
  { lat: 20, lng: 30 }, { lat: -15, lng: 120 }, { lat: 45, lng: -60 },
  { lat: -40, lng: -130 }, { lat: 60, lng: 160 }, { lat: -55, lng: 60 },
  { lat: 10, lng: -170 }, { lat: -30, lng: -30 }, { lat: 35, lng: 90 },
  { lat: -10, lng: -90 },
];

function ll(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function getThemeColors(isDark: boolean) {
  return isDark
    ? {
        core: 0x0a1628,
        wire: 0x1a8fff,
        dot: 0x38bdf8,
        arc: 0x38bdf8,
        ring1: 0x1a8fff,
        ring2: 0x38bdf8,
        marker: 0x38bdf8,
        label: "#93c5fd",
        labelOutline: "#000814",
      }
    : {
        core: 0xe8eef5,
        wire: 0x1a6fbf,
        dot: 0x0e7490,
        arc: 0x0e7490,
        ring1: 0x1a6fbf,
        ring2: 0x0e7490,
        marker: 0x0284c7,
        label: "#0c4a6e",
        labelOutline: "#ffffff",
      };
}

function createGlobeScene(canvas: HTMLCanvasElement, isDark: boolean) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4.2;

  const radius = 1.8;
  const colors = getThemeColors(isDark);
  const group = new THREE.Group();
  scene.add(group);

  // Core sphere
  const coreMat = new THREE.MeshBasicMaterial({ color: colors.core, transparent: true, opacity: isDark ? 0.85 : 0.6 });
  group.add(new THREE.Mesh(new THREE.SphereGeometry(radius * 0.97, 32, 32), coreMat));

  // Wireframe
  const wireMat = new THREE.MeshBasicMaterial({ color: colors.wire, wireframe: true, transparent: true, opacity: isDark ? 0.12 : 0.18 });
  group.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 18), wireMat));

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
  group.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: colors.dot, size: 0.025, transparent: true, opacity: isDark ? 0.5 : 0.6, sizeAttenuation: true })));

  // Marker dots
  const markerGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const markerMat = new THREE.MeshBasicMaterial({ color: colors.marker });
  capCoords.forEach((c) => {
    const mesh = new THREE.Mesh(markerGeo, markerMat);
    mesh.position.copy(ll(c.lat, c.lng, radius));
    group.add(mesh);
  });

  // Connection arcs
  const arcPairs = [[0, 2], [1, 3], [4, 5], [6, 7], [8, 9], [0, 8]];
  const arcMat = new THREE.LineBasicMaterial({ color: colors.arc, transparent: true, opacity: isDark ? 0.3 : 0.4 });
  arcPairs.forEach(([a, b]) => {
    const s = ll(capCoords[a].lat, capCoords[a].lng, radius);
    const e = ll(capCoords[b].lat, capCoords[b].lng, radius);
    const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35);
    const pts = new THREE.QuadraticBezierCurve3(s, mid, e).getPoints(30);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat));
  });

  // Orbital rings
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.15, 0.008, 8, 100),
    new THREE.MeshBasicMaterial({ color: colors.ring1, transparent: true, opacity: isDark ? 0.2 : 0.25 })
  );
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.25, 0.006, 8, 100),
    new THREE.MeshBasicMaterial({ color: colors.ring2, transparent: true, opacity: isDark ? 0.12 : 0.15 })
  );
  ring2.rotation.set(1.2, 0.5, 0);
  group.add(ring2);

  // Text labels via canvas textures
  CAPABILITIES.forEach((label, i) => {
    const pos = ll(capCoords[i].lat, capCoords[i].lng, radius + 0.3);
    const c2d = document.createElement("canvas");
    c2d.width = 256;
    c2d.height = 64;
    const ctx = c2d.getContext("2d")!;
    ctx.clearRect(0, 0, 256, 64);
    // Outline for readability
    ctx.font = "bold 28px monospace";
    ctx.strokeStyle = colors.labelOutline;
    ctx.lineWidth = 4;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(label, 128, 32);
    ctx.fillStyle = colors.label;
    ctx.fillText(label, 128, 32);

    const texture = new THREE.CanvasTexture(c2d);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9, depthWrite: false }));
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
    if (canvas.width !== w * renderer.getPixelRatio() || canvas.height !== h * renderer.getPixelRatio()) {
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
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");
    cleanupRef.current = createGlobeScene(canvasRef.current, isDark);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      if (!canvasRef.current) return;
      cleanupRef.current?.();
      const nowDark = document.documentElement.classList.contains("dark");
      cleanupRef.current = createGlobeScene(canvasRef.current, nowDark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div className="w-full relative" style={{ height: "550px" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]" />
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: "grab" }}
      />
    </div>
  );
}
