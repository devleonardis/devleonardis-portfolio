"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RefObject, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useInView } from "@/components/three/useInView";

const PHOSPHOR = new THREE.Color("#5cf2b0");
const SODIUM = new THREE.Color("#ffb547");
const LIMESTONE = new THREE.Color("#ece6d9");

type Shapes = {
  chaos: Float32Array;
  glyph: Float32Array;
  globe: Float32Array;
  colors: Float32Array;
  delays: Float32Array;
  spins: Float32Array;
};

/** Samples the "</>" glyph from a 2D canvas and builds three target layouts for the same set of cubes. */
function buildShapes(count: number): Shapes {
  const width = 240;
  const height = 100;
  const step = 4;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = "800 92px ui-monospace, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", width / 2, height / 2 + 4);
  const data = ctx.getImageData(0, 0, width, height).data;

  const pixels: Array<{ x: number; y: number; slash: boolean }> = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 128) {
        pixels.push({ x, y, slash: x > width * 0.4 && x < width * 0.6 });
      }
    }
  }

  const unit = 10 / width;
  const layers = Math.ceil(count / Math.max(pixels.length, 1));
  const chaos = new Float32Array(count * 3);
  const glyph = new Float32Array(count * 3);
  const globe = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const delays = new Float32Array(count);
  const spins = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const color = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const r = 5 + Math.random() * 7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    chaos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.6;
    chaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    chaos[i * 3 + 2] = r * Math.cos(phi) - 2;

    const pixel = pixels[i % pixels.length] ?? { x: width / 2, y: height / 2, slash: false };
    const layer = Math.floor(i / Math.max(pixels.length, 1));
    glyph[i * 3] = (pixel.x - width / 2) * unit;
    glyph[i * 3 + 1] = -(pixel.y - height / 2) * unit;
    glyph[i * 3 + 2] = (layer - (layers - 1) / 2) * step * unit;

    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const angle = golden * i;
    globe[i * 3] = Math.cos(angle) * ring * 2.9;
    globe[i * 3 + 1] = y * 2.9;
    globe[i * 3 + 2] = Math.sin(angle) * ring * 2.9;

    if (pixel.slash) color.copy(SODIUM);
    else if (Math.random() < 0.08) color.copy(LIMESTONE);
    else color.copy(PHOSPHOR).offsetHSL(0, 0, (Math.random() - 0.5) * 0.12);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    delays[i] = Math.random() * 0.3;
    spins[i] = 0.5 + Math.random() * 1.5;
  }

  return { chaos, glyph, globe, colors, delays, spins };
}

const smooth = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

function Voxels({ progress, count, reduced }: { progress: RefObject<number>; count: number; reduced: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(() => buildShapes(count), [count]);
  const offsetsRef = useRef<Float32Array | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const local = useMemo(() => new THREE.Vector3(), []);
  const pointerActive = useRef(false);
  const { camera, gl, size } = useThree();

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const color = new THREE.Color();
    for (let i = 0; i < count; i += 1) {
      color.setRGB(shapes.colors[i * 3], shapes.colors[i * 3 + 1], shapes.colors[i * 3 + 2]);
      instanced.setColorAt(i, color);
    }
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  }, [count, shapes]);

  useLayoutEffect(() => {
    const element = gl.domElement;
    const enter = () => (pointerActive.current = true);
    const leave = () => (pointerActive.current = false);
    element.addEventListener("pointermove", enter);
    element.addEventListener("pointerdown", enter);
    element.addEventListener("pointerleave", leave);
    return () => {
      element.removeEventListener("pointermove", enter);
      element.removeEventListener("pointerdown", enter);
      element.removeEventListener("pointerleave", leave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const instanced = mesh.current;
    const root = group.current;
    if (!instanced || !root) return;

    const fit = THREE.MathUtils.clamp(size.width / size.height / 0.95, 0.42, 1);
    root.scale.setScalar(fit);

    const p = progress.current ?? 0;
    const toGlyph = smooth(0.12, 0.45, p);
    const toGlobe = smooth(0.64, 0.92, p);
    const time = state.clock.elapsedTime;

    root.rotation.y = THREE.MathUtils.damp(
      root.rotation.y,
      toGlobe > 0 ? toGlobe * Math.PI * 1.5 + (reduced ? 0 : time * 0.15 * toGlobe) : state.pointer.x * 0.35,
      4,
      delta,
    );
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, -state.pointer.y * 0.2 + toGlobe * 0.25, 4, delta);

    let hasPointer = false;
    if (pointerActive.current) {
      raycaster.setFromCamera(state.pointer, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        root.worldToLocal(local.copy(hit));
        hasPointer = true;
      }
    }

    if (offsetsRef.current?.length !== count * 3) offsetsRef.current = new Float32Array(count * 3);
    const offsets = offsetsRef.current;
    const { chaos, glyph, globe, delays, spins } = shapes;
    const scale = 0.13 + toGlyph * 0.03 - toGlobe * 0.04;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const a = smooth(delays[i], delays[i] + 0.7, toGlyph);
      const b = smooth(delays[i], delays[i] + 0.7, toGlobe);
      const drift = reduced ? 0 : Math.sin(time * 0.6 + i) * 0.25 * (1 - a);

      let x = THREE.MathUtils.lerp(THREE.MathUtils.lerp(chaos[i3], glyph[i3], a), globe[i3], b);
      let y = THREE.MathUtils.lerp(THREE.MathUtils.lerp(chaos[i3 + 1] + drift, glyph[i3 + 1], a), globe[i3 + 1], b);
      let z = THREE.MathUtils.lerp(THREE.MathUtils.lerp(chaos[i3 + 2], glyph[i3 + 2], a), globe[i3 + 2], b);

      if (hasPointer) {
        const dx = x + offsets[i3] - local.x;
        const dy = y + offsets[i3 + 1] - local.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 2.2) {
          const force = (1 - distSq / 2.2) * 0.35;
          const dist = Math.sqrt(distSq) || 1;
          offsets[i3] += (dx / dist) * force;
          offsets[i3 + 1] += (dy / dist) * force;
          offsets[i3 + 2] += force * 0.8;
        }
      }
      offsets[i3] *= 0.92;
      offsets[i3 + 1] *= 0.92;
      offsets[i3 + 2] *= 0.92;

      x += offsets[i3];
      y += offsets[i3 + 1];
      z += offsets[i3 + 2];

      const tumble = reduced ? 0 : (1 - a + b * 0.3) * time * spins[i];
      dummy.position.set(x, y, z);
      dummy.rotation.set(tumble, tumble * 0.7, 0);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.35} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}

export default function VoxelScene({ progress }: { progress: RefObject<number> }) {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  const count = useMemo(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 700 : 1200), []);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  return (
    <div ref={container} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 11], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 8]} intensity={1.6} />
        <pointLight position={[-6, -3, 4]} intensity={30} color="#ffb547" />
        <pointLight position={[6, 2, -4]} intensity={25} color="#5cf2b0" />
        <Voxels progress={progress} count={count} reduced={reduced} />
      </Canvas>
    </div>
  );
}
