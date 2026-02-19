"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

// ─── Option A: "Liquid Mesh" ───
// Smooth, flowing color blobs that drift and morph — similar to Stripe/Linear style
const SHADER_LIQUID_MESH = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  uv.x *= aspect;
  float t = u_time * 0.12;

  // four drifting color centers
  vec2 p1 = vec2(0.3 * aspect + sin(t * 0.7) * 0.3, 0.3 + cos(t * 0.5) * 0.25);
  vec2 p2 = vec2(0.7 * aspect + cos(t * 0.6) * 0.25, 0.7 + sin(t * 0.8) * 0.2);
  vec2 p3 = vec2(0.5 * aspect + sin(t * 0.9 + 2.0) * 0.3, 0.5 + cos(t * 0.4 + 1.0) * 0.3);
  vec2 p4 = vec2(0.6 * aspect + cos(t * 0.5 + 3.0) * 0.2, 0.2 + sin(t * 0.7 + 2.0) * 0.25);

  // soft radial influence for each blob
  float d1 = exp(-3.5 * length(uv - p1));
  float d2 = exp(-3.0 * length(uv - p2));
  float d3 = exp(-3.5 * length(uv - p3));
  float d4 = exp(-4.0 * length(uv - p4));

  // colors: teal, emerald, cyan, blue
  vec3 c1 = vec3(0.10, 0.70, 0.65);
  vec3 c2 = vec3(0.05, 0.50, 0.45);
  vec3 c3 = vec3(0.15, 0.55, 0.80);
  vec3 c4 = vec3(0.08, 0.40, 0.70);
  vec3 bg = vec3(0.06, 0.08, 0.14);

  float total = d1 + d2 + d3 + d4 + 0.001;
  vec3 color = (c1 * d1 + c2 * d2 + c3 * d3 + c4 * d4) / total;
  float blend = smoothstep(0.0, 0.6, d1 + d2 + d3 + d4);
  color = mix(bg, color, blend);

  // subtle brightness boost in the center
  float glow = exp(-2.0 * length(uv - vec2(0.4 * aspect, 0.5)));
  color += vec3(0.03, 0.08, 0.08) * glow;

  gl_FragColor = vec4(color, 1.0);
}
`;

// ─── Option B: "Aurora Waves" ───
// Flowing horizontal light bands, like northern lights
const SHADER_AURORA = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

// simplex-style hash
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float simplex(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float f = 0.0;
  f += 0.5 * simplex(p); p *= 2.01;
  f += 0.25 * simplex(p); p *= 2.02;
  f += 0.125 * simplex(p); p *= 2.03;
  f += 0.0625 * simplex(p);
  return f;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.08;

  // horizontal aurora bands
  float n1 = fbm(vec2(uv.x * 2.0 + t, uv.y * 3.0 + t * 0.3));
  float n2 = fbm(vec2(uv.x * 1.5 - t * 0.5, uv.y * 4.0 + t * 0.2));
  float n3 = fbm(vec2(uv.x * 3.0 + t * 0.7, uv.y * 2.5 - t * 0.4));

  // wave shapes
  float wave1 = smoothstep(0.0, 0.15, 0.1 - abs(uv.y - 0.4 - n1 * 0.15));
  float wave2 = smoothstep(0.0, 0.2, 0.12 - abs(uv.y - 0.55 - n2 * 0.12));
  float wave3 = smoothstep(0.0, 0.1, 0.08 - abs(uv.y - 0.65 - n3 * 0.1));

  vec3 bg = vec3(0.04, 0.05, 0.12);
  vec3 color = bg;
  color += vec3(0.08, 0.60, 0.55) * wave1 * 1.2;
  color += vec3(0.10, 0.45, 0.75) * wave2 * 1.0;
  color += vec3(0.05, 0.70, 0.60) * wave3 * 0.8;

  // ambient glow
  float glow = fbm(uv * 2.0 + t * 0.3) * 0.08;
  color += vec3(0.05, 0.15, 0.20) * glow;

  // fade edges
  float fade = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
  color = mix(bg, color, fade);

  gl_FragColor = vec4(color, 1.0);
}
`;

// ─── Option C: "Plasma Flow" ───
// Futuristic iridescent plasma with sine-based interference patterns
const SHADER_PLASMA = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  uv.x *= aspect;
  float t = u_time * 0.25;

  // layered sine interference with more fluidity
  float v1 = sin(uv.x * 4.0 + t * 1.2);
  float v2 = sin(uv.y * 3.5 - t * 0.9);
  float v3 = sin((uv.x + uv.y) * 2.5 + t * 0.8);
  float v4 = sin(length(uv - vec2(0.5 * aspect, 0.5)) * 5.0 - t * 1.1);

  float v = (v1 + v2 + v3 + v4) * 0.25;

  // domain warp
  float warp = sin(v * 3.14159 + t * 0.3) * 0.5 + 0.5;
  float warp2 = cos(v * 2.5 - t * 0.2) * 0.5 + 0.5;

  // #0BB980 shades palette
  vec3 base = vec3(0.043, 0.725, 0.502);   // #0BB980
  vec3 c1 = base * 1.3;                     // bright mint
  vec3 c2 = base * 0.85;                    // medium green
  vec3 c3 = base * 0.5;                     // deep forest
  vec3 c4 = base * 1.1 + vec3(0.0, 0.08, 0.05); // slightly shifted light

  vec3 color = mix(c1, c2, warp);
  color = mix(color, c3, warp2 * 0.4);
  color = mix(color, c4, sin(v * 2.0 + t) * 0.3 + 0.3);

  // blend with dark bg
  color *= 0.7;
  vec3 bg = vec3(0.03, 0.06, 0.04);
  float intensity = smoothstep(-1.0, 1.0, v) * 0.75 + 0.25;
  color = mix(bg, color, intensity);

  // soft vignette
  vec2 center = gl_FragCoord.xy / u_resolution.xy - 0.5;
  color *= 1.0 - dot(center, center) * 0.6;

  gl_FragColor = vec4(color, 1.0);
}
`;

export type ShaderVariant = "liquid-mesh" | "aurora" | "plasma";

const SHADERS: Record<ShaderVariant, string> = {
  "liquid-mesh": SHADER_LIQUID_MESH,
  "aurora": SHADER_AURORA,
  "plasma": SHADER_PLASMA,
};

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroShader({ variant = "liquid-mesh" }: { variant?: ShaderVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, SHADERS[variant]);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    function render(time: number) {
      resize();
      gl!.uniform1f(uTime, time * 0.001);
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
