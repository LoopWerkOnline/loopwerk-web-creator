import { useEffect, useRef } from "react";

/**
 * Vloeiende achtergrond in de huisstijl (WebGL, geen libraries). Langzaam bewegende kleurvlakken
 * in donkergroen, groen en koper, met een licht dat de muis volgt. Stopt buiten beeld; bij
 * "minder beweging" of zonder WebGL blijft een stilstaande gradient staan (CSS op de wrapper).
 */
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

vec3 ink = vec3(0.13, 0.20, 0.165);
vec3 forest = vec3(0.29, 0.37, 0.28);
vec3 copper = vec3(0.69, 0.48, 0.35);
vec3 sage = vec3(0.70, 0.74, 0.65);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 0.8;
  float t = uTime * 0.06;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 1.5 * q + vec2(1.7, 9.2) + t * 1.5), fbm(p + 1.5 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 1.6 * r);

  vec3 col = mix(ink, forest, smoothstep(0.25, 0.75, f));
  col = mix(col, copper, smoothstep(0.5, 0.85, r.x) * 0.6);
  col = mix(col, sage, smoothstep(0.75, 1.0, q.y) * 0.18);

  vec2 m = uMouse * vec2(uRes.x / uRes.y, 1.0) * 0.8;
  float glow = exp(-2.2 * length(p - m));
  col += copper * glow * 0.22;

  // Links donkerder voor leesbare tekst, onderaan terug naar de achtergrondkleur.
  col = mix(ink, col, smoothstep(0.0, 0.75, uv.x) * 0.85 + 0.15);
  col = mix(ink, col, smoothstep(0.0, 0.35, uv.y));
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

export function LiquidBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const mouse = { x: 0.75, y: 0.55, tx: 0.75, ty: 0.55 };

    const resize = () => {
      // Halve resolutie: zacht beeld, licht voor de processor.
      const scale = Math.min(window.devicePixelRatio, 2) * 0.5;
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const frame = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });

    resize();
    canvas.style.opacity = "1";
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 -z-20 bg-[radial-gradient(60%_80%_at_75%_40%,#4a5f48_0%,#22332a_70%),linear-gradient(#22332a,#22332a)] ${className}`}
      aria-hidden="true"
    >
      <canvas ref={ref} className="h-full w-full opacity-0 transition-opacity duration-1000" />
    </div>
  );
}
