import React, { useEffect, useId, useRef } from "react";
import { addTicker, scenePos, toView, getMetrics, eio, clamp, lerp } from "./engine";
import { prefersReducedMotion } from "@/lib/gsap";

/** Isometric "data block" that matches the ERS logo cube. */
export function CubeSVG({ className = "", style }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fe6ff" />
          <stop offset="1" stopColor="#26AFED" />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e66f6" />
          <stop offset="1" stopColor="#0a2f8f" />
        </linearGradient>
        <linearGradient id={`r${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b8cff" />
          <stop offset="1" stopColor="#1349c7" />
        </linearGradient>
      </defs>
      <g stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinejoin="round">
        <polygon points="0,-80 69,-40 0,0 -69,-40" fill={`url(#t${id})`} />
        <polygon points="-69,-40 0,0 0,80 -69,40" fill={`url(#l${id})`} />
        <polygon points="69,-40 0,0 0,80 69,40" fill={`url(#r${id})`} />
      </g>
      <g stroke="rgba(255,255,255,.5)" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M-50 -5 L-50 25 L-30 37" />
        <path d="M-30 5 L-30 20" />
        <path d="M25 10 L50 -5 M25 30 L50 15 M25 50 L40 41" />
      </g>
      <g fill="#fff">
        <circle cx="-30" cy="37" r="4" />
        <circle cx="50" cy="-5" r="4" />
        <circle cx="50" cy="15" r="4" />
      </g>
    </svg>
  );
}

// Keyframes: [scene, progress, x, y, size, opacity] in stage coordinates.
const KF = [
  ["hero", 0.0, 960, 424, 40, 0, 0.5],
  ["hero", 0.52, 960, 424, 60, 0, 0.5],
  ["hero", 0.62, 960, 424, 200, 1, 0.5],
  ["hero", 1.0, 960, 424, 200, 1, 0.5],
  ["trust", 0.04, 1660, 210, 150, 1, 1],
  ["trust", 1.0, 1660, 210, 150, 1, 1],
  ["build", 0.0, 1300, 464, 190, 1, 0.7],
  ["build", 0.06, 1300, 464, 200, 1, 0.7],
  ["build", 0.13, 1300, 464, 300, 0, 0.7],
  ["values", 0.36, 960, 234, 60, 0, 0.5],
  ["values", 0.5, 960, 234, 180, 1, 0.5],
  ["values", 1.0, 960, 234, 180, 1, 0.5],
];
// Phone/tablet stage (430 x 860)
const KF_M = [
  ["hero", 0.0, 215, 430, 30, 0, 0.5],
  ["hero", 0.52, 215, 430, 40, 0, 0.5],
  ["hero", 0.62, 215, 430, 130, 1, 0.5],
  ["hero", 1.0, 215, 430, 130, 1, 0.5],
  ["trust", 0.04, 372, 34, 64, 1, 1],
  ["trust", 1.0, 372, 34, 64, 1, 1],
  ["build", 0.0, 215, 510, 110, 1, 0.5],
  ["build", 0.06, 215, 510, 120, 1, 0.5],
  ["build", 0.13, 215, 510, 180, 0, 0.5],
  ["values", 0.36, 215, 250, 40, 0, 0.5],
  ["values", 0.5, 215, 250, 110, 1, 0.5],
  ["values", 1.0, 215, 250, 110, 1, 0.5],
];

/** Fixed cube that travels between scenes on desktop. */
export default function TravelCube() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;
    let sy0 = window.scrollY;
    // only touch the DOM when a value really changes (fewer style recalcs per frame)
    const last = {};
    const set = (k, v) => {
      if (last[k] !== v) {
        last[k] = v;
        node.style[k] = v;
      }
    };
    return addTicker((t, dt) => {
      if (!document.documentElement.classList.contains("hs-anim")) {
        set("display", "none");
        return;
      }
      const m0 = getMetrics();
      const pts = (m0.mobile ? KF_M : KF).map((k) => [scenePos(k[0], k[1]), ...k.slice(2)]);
      if (pts.some((p) => p[0] == null)) {
        set("display", "none");
        return;
      }
      const yRaw = window.scrollY;
      const follow = m0.mobile ? 14 : 9;
      sy0 += (yRaw - sy0) * (1 - Math.exp(-dt * follow));
      if (Math.abs(yRaw - sy0) < 0.5) sy0 = yRaw;
      const y = sy0;
      let i = 0;
      while (i < pts.length - 2 && y >= pts[i + 1][0]) i++;
      const a = pts[i];
      const b = pts[i + 1];
      const k = eio(clamp((y - a[0]) / Math.max(1, b[0] - a[0])));
      const x = lerp(a[1] + m0.dx * a[5], b[1] + m0.dx * b[5], k);
      let sy = lerp(a[2], b[2], k);
      const size = lerp(a[3], b[3], k);
      const o = lerp(a[4], b[4], k);
      // after the last keyframe the cube scrolls away with the page
      const endPos = pts[pts.length - 1][0];
      const after = Math.max(0, yRaw - endPos);
      const m = getMetrics();
      const [vx, vy] = toView(x, sy);
      const px = size * m.s;
      set("display", o > 0.01 ? "block" : "none");
      set("opacity", o);
      const baseSize = 200;
      const sc = px / baseSize;
      const tx = vx - px / 2;
      const ty = vy - px / 2 - after + Math.sin(t * 2) * 8 * m.s;
      set("width", `${baseSize}px`);
      set("height", `${baseSize}px`);
      set("transformOrigin", "top left");
      set("transform", `translate3d(${tx}px, ${ty}px, 0) scale(${sc}) rotate(${Math.sin(t * 1.3) * 4}deg)`);
    });
  }, []);
  return (
    <div ref={ref} className="hs-travel-cube" aria-hidden="true">
      <div className="hs-travel-glow" />
      <CubeSVG className="hs-travel-svg" />
    </div>
  );
}
