/**
 * Site background: a point-cloud terrain, like a lidar scan, drifting toward the viewer.
 * A scan line sweeps through it, the camera leans toward the pointer, and scrolling flies
 * the terrain forward. Everything moves in the vertex shader, so the CPU only updates uniforms.
 * Under reduced motion it draws one still frame.
 */
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { reducedMotion } from './motion';

const COLS = 150;
const ROWS = 120;
const SPACING = 0.6;
const DEPTH = ROWS * SPACING;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uFlow;
  uniform float uSize;
  uniform float uDepth;
  varying float vFade;
  varying float vScan;
  varying float vHeight;

  float terrain(vec2 p, float t) {
    return sin(p.x * 0.21 + t * 0.30) * 0.9
         + sin(p.y * 0.17 - t * 0.22) * 0.8
         + sin((p.x - p.y) * 0.11 + t * 0.18) * 1.3
         + sin(length(p) * 0.33 - t * 0.45) * 0.35;
  }

  void main() {
    // Wrap the grid so the terrain streams past forever; the wrap happens in the far fog.
    float z = mod(position.z + uFlow, uDepth) - uDepth + 8.0;
    vec2 ground = vec2(position.x, z - uFlow);
    float h = terrain(ground, uTime);
    vec4 mv = modelViewMatrix * vec4(position.x, h - 2.6, z, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(uSize * 9.0 / -mv.z, 1.0, 4.5 * uSize);

    float scanZ = mod(uTime * 7.0, uDepth) - uDepth + 8.0;
    vScan = exp(-pow((z - scanZ) * 0.55, 2.0));
    vFade = smoothstep(-uDepth + 8.0, -uDepth + 52.0, z) * smoothstep(9.0, 2.0, z);
    vHeight = h;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform vec3 uPeak;
  uniform float uAlpha;
  varying float vFade;
  varying float vScan;
  varying float vHeight;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 col = mix(uInk, uPeak, smoothstep(1.6, 2.8, vHeight) * 0.6);
    col = mix(col, uAccent, vScan);
    gl_FragColor = vec4(col, uAlpha * vFade * (1.0 + vScan * 1.6));
  }
`;

function grid(): BufferGeometry {
  const pos = new Float32Array(COLS * ROWS * 3);
  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      pos[i++] = (c - COLS / 2) * SPACING;
      pos[i++] = 0;
      pos[i++] = r * SPACING;
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  return g;
}

const cssColor = (name: string) =>
  new Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());

export function startBackdrop(canvas: HTMLCanvasElement) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
  } catch {
    return; // No WebGL: the plain page background stays.
  }
  const scene = new Scene();
  const camera = new PerspectiveCamera(55, 1, 0.1, 120);
  const uniforms = {
    uTime: { value: 8 },
    uFlow: { value: 0 },
    uSize: { value: 1 },
    uDepth: { value: DEPTH },
    uInk: { value: new Color() },
    uAccent: { value: new Color() },
    uPeak: { value: new Color() },
    uAlpha: { value: 0.3 },
  };
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
  });
  scene.add(new Points(grid(), material));

  const theme = () => {
    const dark = matchMedia('(prefers-color-scheme: dark)').matches;
    uniforms.uInk.value = cssColor('--graphite');
    uniforms.uAccent.value = cssColor('--z');
    uniforms.uPeak.value = cssColor('--x');
    uniforms.uAlpha.value = dark ? 0.42 : 0.3;
  };
  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the terrain filling narrow phone screens too.
    camera.fov = w < h ? 70 : 55;
    camera.updateProjectionMatrix();
    uniforms.uSize.value = dpr * (w < 700 ? 1.6 : 2.2);
  };

  const still = reducedMotion();
  const pointer = { x: 0, y: 0 };
  const cam = { x: 0, y: 0 };
  let raf = 0;
  let last = performance.now();
  let scroll = 0;

  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    uniforms.uTime.value += dt;
    scroll += (window.scrollY / window.innerHeight - scroll) * 0.08;
    uniforms.uFlow.value = uniforms.uTime.value * 0.9 + scroll * 9;
    cam.x += (pointer.x * 2.2 - cam.x) * 0.04;
    cam.y += (pointer.y * 0.8 - cam.y) * 0.04;
    render();
    if (!document.hidden) raf = requestAnimationFrame(frame);
  };
  const render = () => {
    camera.position.set(cam.x, 3.2 + cam.y, 9);
    camera.lookAt(cam.x * 0.3, -3.4, -14);
    renderer.render(scene, camera);
  };

  theme();
  resize();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    theme();
    if (still) render();
  });
  window.addEventListener('resize', () => {
    resize();
    if (still) render();
  });
  if (still) {
    render();
    return;
  }
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });
  raf = requestAnimationFrame(frame);
}
