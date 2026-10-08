"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { orbSignal } from "@/components/three/signals";
import { useInView } from "@/components/three/useInView";

const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uExcite;
uniform vec2 uPointer;
varying vec3 vPos;
varying float vDisp;
${noiseGLSL}
void main() {
  float speed = 0.18 + uExcite * 0.45;
  float n = snoise(normal * 1.2 + vec3(uTime * speed));
  float n2 = snoise(normal * 3.0 + vec3(uTime * speed * 2.2 + 9.0));
  vec3 toPointer = normalize(vec3(uPointer * 1.2, 0.9));
  float bulge = pow(max(dot(normal, toPointer), 0.0), 5.0);
  float d = n * (0.13 + uExcite * 0.14) + n2 * (0.035 + uExcite * 0.04) + bulge * 0.18;
  vDisp = d;
  vec4 mv = modelViewMatrix * vec4(position + normal * d, 1.0);
  vPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

// Topographic shading: contour lines on the displacement field, lit with screen-space normals.
const fragmentShader = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uPhosphor;
uniform vec3 uSodium;
uniform float uExcite;
uniform float uTime;
varying vec3 vPos;
varying float vDisp;
void main() {
  vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
  vec3 v = normalize(-vPos);
  float fres = pow(1.0 - abs(dot(n, v)), 2.2);
  float diffuse = max(dot(n, normalize(vec3(-0.4, 0.7, 0.6))), 0.0);

  float field = vDisp * 26.0 - uTime * 0.4;
  float f = fract(field);
  float w = fwidth(field);
  float contour = 1.0 - smoothstep(0.0, w * 1.4, min(f, 1.0 - f));

  vec3 col = uDeep * (0.55 + diffuse * 0.6);
  col += uPhosphor * contour * (0.35 + fres * 0.6);
  col += uPhosphor * fres * 0.55;
  col = mix(col, uSodium, smoothstep(0.16, 0.3, vDisp) * (0.5 + uExcite * 0.4) * (0.4 + contour));
  gl_FragColor = vec4(col, 1.0);
}
`;

function createRingGeometry() {
  const count = 1400;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.05 + Math.pow(Math.random(), 2) * 0.9;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.08 * radius;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function OrbMesh({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Points>(null);
  const pointer = useRef(new THREE.Vector2());
  const excite = useRef(0);
  const intro = useRef(reduced ? 1 : 0);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uExcite: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uDeep: { value: new THREE.Color("#12324a") },
      uPhosphor: { value: new THREE.Color("#5cf2b0") },
      uSodium: { value: new THREE.Color("#ffb547") },
    }),
    [],
  );

  const ringGeometry = useMemo(() => createRingGeometry(), []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    const target = Math.min(1, orbSignal.excite + scroll * 0.6);
    excite.current = THREE.MathUtils.damp(excite.current, target, 4, delta);

    if (material.current) {
      const live = material.current.uniforms;
      live.uTime.value += reduced ? 0 : delta;
      live.uExcite.value = excite.current;
      live.uPointer.value.lerp(pointer.current, 0.06);
    }

    if (group.current) {
      group.current.rotation.y += delta * (0.08 + excite.current * 0.5);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.25, 0.05);
      group.current.position.y = scroll * 1.1;
      intro.current = Math.min(1, intro.current + delta * 0.7);
      const eased = 1 - Math.pow(1 - intro.current, 3);
      const s = Math.max(0.6, 1 - scroll * 0.25) * (0.6 + eased * 0.4);
      group.current.scale.setScalar(s);
    }
    if (shell.current) {
      shell.current.rotation.x -= delta * 0.05;
      shell.current.rotation.z += delta * 0.04;
    }
    if (ring.current) {
      ring.current.rotation.y -= delta * (0.12 + excite.current * 0.8);
      ring.current.rotation.z = 0.35 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, 64]} />
        <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#5cf2b0" wireframe transparent opacity={0.09} />
      </mesh>
      <points ref={ring} geometry={ringGeometry} rotation={[0.35, 0, 0.35]}>
        <pointsMaterial color="#ece6d9" size={0.018} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>
    </group>
  );
}

export default function Orb() {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  const reduced = Boolean(useReducedMotion());

  return (
    <div ref={container} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <OrbMesh reduced={reduced} />
      </Canvas>
    </div>
  );
}
