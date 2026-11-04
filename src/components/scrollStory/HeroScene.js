import React, { useRef } from "react";
import Link from "next/link";
import { useScene, fitCanvas, toView, getMetrics, ax, seg, eio, eo, lerp, clamp, rv, css } from "./engine";
import { LAND_DOTS_B64 } from "./landDots";

const D2R = Math.PI / 180;
const TILT = 0.38;

/* Accurate land dots (Natural Earth 50m), decoded once into unit vectors. */
let LAND = null;
function landVectors() {
  if (LAND) return LAND;
  const bin = typeof atob === "function" ? atob(LAND_DOTS_B64) : "";
  const n = bin.length / 4;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    let la = (bin.charCodeAt(o) | (bin.charCodeAt(o + 1) << 8));
    let lo = (bin.charCodeAt(o + 2) | (bin.charCodeAt(o + 3) << 8));
    if (la > 32767) la -= 65536;
    if (lo > 32767) lo -= 65536;
    const a = (la / 10) * D2R;
    const b = (lo / 10) * D2R;
    out[i * 3] = Math.cos(a) * Math.sin(b);
    out[i * 3 + 1] = Math.sin(a);
    out[i * 3 + 2] = Math.cos(a) * Math.cos(b);
  }
  LAND = out;
  return out;
}

// Eagerly pre-decode land vectors as soon as module loads on client
if (typeof window !== "undefined") {
  try {
    landVectors();
  } catch (e) {}
}

const HQ = [31.52, 74.36];
const CITIES = [
  [51.5, -0.12], [25.2, 55.27], [40.71, -74.0], [1.35, 103.82], [-23.55, -46.63],
  [-33.87, 151.21], [35.68, 139.69], [24.71, 46.68], [50.11, 8.68], [43.65, -79.38],
];
const STARS = Array.from({ length: 140 }, (_, i) => ({
  x: ((i * 7919) % 10007) / 10007,
  y: ((i * 104729) % 9973) / 9973,
  r: 0.4 + ((i * 31) % 10) / 12,
  p: (i * 0.37) % 6.28,
}));
const v3 = (la, lo) => [Math.cos(la * D2R) * Math.sin(lo * D2R), Math.sin(la * D2R), Math.cos(la * D2R) * Math.cos(lo * D2R)];

function rotate(x, y, z, cr, sr, ct, stt) {
  const x1 = x * cr + z * sr;
  const z1 = -x * sr + z * cr;
  return [x1, y * ct - z1 * stt, y * stt + z1 * ct];
}
function slerp(a, b, u) {
  const d = Math.acos(clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1));
  const s = Math.sin(d) || 1;
  const k1 = Math.sin((1 - u) * d) / s;
  const k2 = Math.sin(u * d) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}
// light comes from the upper left, slightly in front
const LX = -0.55, LY = 0.5, LZ = 0.67;
const SHADES = ["#2b5fb4", "#3876d4", "#4b92ea", "#68b0f6", "#8fd0ff", "#c4ecff"];

function drawStars(g, w, h, t, alpha) {
  if (alpha <= 0) return;
  for (const s of STARS) {
    const tw = 0.45 + 0.55 * Math.sin(t * 1.3 + s.p);
    g.fillStyle = `rgba(190,220,255,${0.5 * tw * alpha})`;
    g.fillRect(s.x * w, s.y * h, s.r * 1.6, s.r * 1.6);
  }
}

function drawGlobe(g, w, h, o) {
  const { cx, cy, R, rot, t, fade, conv, flash, ccx, ccy, small } = o;
  g.clearRect(0, 0, w, h);
  drawStars(g, w, h, t, o.stars ?? 1);
  if (fade > 0.01) {
    g.save();
    g.globalAlpha = fade;
    // atmosphere
    let gr = g.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.42);
    gr.addColorStop(0, "rgba(64,170,255,0.55)");
    gr.addColorStop(0.18, "rgba(38,140,237,0.26)");
    gr.addColorStop(0.5, "rgba(30,90,220,0.08)");
    gr.addColorStop(1, "rgba(30,90,220,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R * 1.42, 0, 7);
    g.fill();
    // ocean body with lighting
    gr = g.createRadialGradient(cx - R * 0.42, cy - R * 0.4, R * 0.05, cx, cy, R * 1.02);
    gr.addColorStop(0, "#1b4aa6");
    gr.addColorStop(0.45, "#0b2a6e");
    gr.addColorStop(0.85, "#05153f");
    gr.addColorStop(1, "#030d2a");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.fill();

    const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(TILT), stt = Math.sin(TILT);
    // graticule
    g.lineWidth = 1;
    g.strokeStyle = "rgba(120,180,255,0.07)";
    for (let la = -60; la <= 60; la += 30) {
      g.beginPath();
      let pen = false;
      for (let lo = -180; lo <= 180; lo += 4) {
        const v = v3(la, lo);
        const [x, y, z] = rotate(v[0], v[1], v[2], cr, sr, ct, stt);
        if (z < 0) { pen = false; continue; }
        const px = cx + x * R, py = cy - y * R;
        if (!pen) { g.moveTo(px, py); pen = true; } else g.lineTo(px, py);
      }
      g.stroke();
    }
    for (let lo = -180; lo < 180; lo += 30) {
      g.beginPath();
      let pen = false;
      for (let la = -88; la <= 88; la += 4) {
        const v = v3(la, lo);
        const [x, y, z] = rotate(v[0], v[1], v[2], cr, sr, ct, stt);
        if (z < 0) { pen = false; continue; }
        const px = cx + x * R, py = cy - y * R;
        if (!pen) { g.moveTo(px, py); pen = true; } else g.lineTo(px, py);
      }
      g.stroke();
    }

    // land dots, lit and bucketed by brightness
    const L = landVectors();
    const n = L.length / 3;
    const step = small ? 2 : 1;
    const ds = Math.max(1.7, R / 190) * (small ? 1.3 : 1);
    const paths = SHADES.map(() => new Path2D());
    for (let i = 0; i < n; i += step) {
      const [x, y, z] = rotate(L[i * 3], L[i * 3 + 1], L[i * 3 + 2], cr, sr, ct, stt);
      if (z < 0.02) continue;
      const lit = clamp(0.3 + 0.8 * Math.max(0, x * LX + y * LY + z * LZ));
      const edge = clamp(z * 2.2);
      const b = Math.min(SHADES.length - 1, Math.floor(lit * edge * SHADES.length));
      const d = ds * (0.6 + 0.4 * z);
      paths[b].rect(cx + x * R - d / 2, cy - y * R - d / 2, d, d);
    }
    paths.forEach((p, i) => {
      g.fillStyle = SHADES[i];
      g.fill(p);
    });

    // specular sheen + night side + fresnel rim
    gr = g.createRadialGradient(cx - R * 0.45, cy - R * 0.45, 0, cx - R * 0.45, cy - R * 0.45, R * 0.9);
    gr.addColorStop(0, "rgba(160,215,255,0.16)");
    gr.addColorStop(1, "rgba(160,215,255,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.fill();
    gr = g.createLinearGradient(cx - R * 0.3, cy - R * 0.3, cx + R, cy + R);
    gr.addColorStop(0, "rgba(2,8,28,0)");
    gr.addColorStop(1, "rgba(2,8,28,0.38)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.fill();
    gr = g.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
    gr.addColorStop(0, "rgba(80,190,255,0)");
    gr.addColorStop(1, "rgba(110,205,255,0.45)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.fill();

    // arcs from HQ with travelling comets
    const hq = v3(...HQ);
    const grow = seg(t, 0.3, 2.4);
    g.lineCap = "round";
    CITIES.forEach((c, k) => {
      const b = v3(...c);
      const dist = Math.acos(clamp(hq[0] * b[0] + hq[1] * b[1] + hq[2] * b[2], -1, 1));
      const lift = 0.06 + dist * 0.13;
      const lim = clamp(grow * 1.5 - k * 0.07);
      if (lim <= 0) return;
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const u = (i / 64) * lim;
        const hh = 1 + lift * Math.sin(Math.PI * u);
        const v = slerp(hq, b, u);
        const [x, y, z] = rotate(v[0] * hh, v[1] * hh, v[2] * hh, cr, sr, ct, stt);
        pts.push([cx + x * R, cy - y * R, z]);
      }
      g.beginPath();
      let pen = false;
      pts.forEach(([x, y, z]) => {
        if (z < -0.05) { pen = false; return; }
        if (!pen) { g.moveTo(x, y); pen = true; } else g.lineTo(x, y);
      });
      g.strokeStyle = "rgba(90,190,255,0.32)";
      g.lineWidth = 1.4;
      g.stroke();
      if (lim >= 1) {
        const head = (t * 0.32 + k * 0.137) % 1;
        const tail = 0.18;
        for (let s = 0; s < 10; s++) {
          const u0 = head - (tail * s) / 10;
          const u1 = head - (tail * (s + 1)) / 10;
          if (u1 < 0) break;
          const a0 = pts[Math.round(u0 * 64)];
          const a1 = pts[Math.round(u1 * 64)];
          if (!a0 || !a1 || a0[2] < -0.05 || a1[2] < -0.05) continue;
          g.strokeStyle = `rgba(170,230,255,${(1 - s / 10) * 0.95})`;
          g.lineWidth = 2.6 * (1 - s / 12);
          g.beginPath();
          g.moveTo(a0[0], a0[1]);
          g.lineTo(a1[0], a1[1]);
          g.stroke();
        }
        const end = pts[64];
        if (end[2] > 0) {
          const ph = (t * 0.8 + k * 0.3) % 1;
          g.strokeStyle = `rgba(120,210,255,${0.7 * (1 - ph)})`;
          g.lineWidth = 1.2;
          g.beginPath();
          g.arc(end[0], end[1], 3 + ph * 12, 0, 7);
          g.stroke();
          g.fillStyle = "#bfeaff";
          g.beginPath();
          g.arc(end[0], end[1], 2.4, 0, 7);
          g.fill();
        }
      }
    });
    const [hx, hy, hz] = rotate(hq[0], hq[1], hq[2], cr, sr, ct, stt);
    if (hz > 0) {
      const px = cx + hx * R, py = cy - hy * R;
      const glow = g.createRadialGradient(px, py, 0, px, py, 26);
      glow.addColorStop(0, "rgba(255,255,255,0.9)");
      glow.addColorStop(0.25, "rgba(120,210,255,0.5)");
      glow.addColorStop(1, "rgba(120,210,255,0)");
      g.fillStyle = glow;
      g.beginPath();
      g.arc(px, py, 26, 0, 7);
      g.fill();
      g.strokeStyle = "rgba(255,255,255,.55)";
      g.lineWidth = 1.2;
      g.beginPath();
      g.arc(px, py, 10 + 5 * Math.sin(t * 3), 0, 7);
      g.stroke();
      g.fillStyle = "#fff";
      g.font = `600 ${small ? 10 : 13}px Poppins, sans-serif`;
      g.fillText("LAHORE HQ", px + 16, py - 12);
    }
    g.restore();
  }
  if (conv > 0 && conv < 1) {
    const span = Math.max(w, h) * 0.6;
    for (let k = 0; k < 48; k++) {
      const ang = (k / 48) * Math.PI * 2 + t * 0.6;
      const r0 = lerp(span, 30, eio(conv)) + ((k * 37) % 60);
      const r1 = r0 + lerp(span * 0.25, 10, conv);
      const lg = g.createLinearGradient(ccx + Math.cos(ang) * r0, ccy + Math.sin(ang) * r0, ccx + Math.cos(ang) * r1, ccy + Math.sin(ang) * r1);
      lg.addColorStop(0, `rgba(160,225,255,${0.9 * (1 - conv) + 0.2})`);
      lg.addColorStop(1, "rgba(38,175,237,0)");
      g.strokeStyle = lg;
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(ccx + Math.cos(ang) * r0, ccy + Math.sin(ang) * r0);
      g.lineTo(ccx + Math.cos(ang) * r1, ccy + Math.sin(ang) * r1);
      g.stroke();
    }
  }
  if (flash > 0) {
    const gr = g.createRadialGradient(ccx, ccy, 0, ccx, ccy, Math.max(w, h) * 0.3);
    gr.addColorStop(0, `rgba(255,255,255,${flash})`);
    gr.addColorStop(0.3, `rgba(38,175,237,${flash * 0.6})`);
    gr.addColorStop(1, "rgba(38,175,237,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
  }
}

let resolveGlobe;
export const globeReady = typeof window !== "undefined"
  ? new Promise((r) => { resolveGlobe = r; })
  : Promise.resolve();

export default function HeroScene() {
  const ref = useRef(null);
  const cv = useRef(null);
  const textWrap = useRef(null);

  useScene(ref, {
    name: "hero",
    length: 2.2,
    ambient: true,
    staticP: 0,
    render(p, t, mode) {
      const c = cv.current;
      if (!c) return;
      const { g, w, h } = fitCanvas(c);
      if (mode === "anim") {
        const m = getMetrics();
        const z = eio(seg(p, 0.15, 0.5));
        const mob = m.mobile;
        const [gx, gy] = mob
          ? toView(ax(215, 0.5), lerp(655, 430, z))
          : toView(lerp(ax(1390, 0.9), ax(960, 0.5), z), lerp(470, 424, z));
        const [ccx, ccy] = mob ? toView(ax(215, 0.5), 430) : toView(ax(960, 0.5), 424);
        drawGlobe(g, w, h, {
          cx: gx,
          cy: gy,
          R: (mob ? lerp(175, 300, z) : lerp(380, 640, z)) * m.s,
          small: mob,
          rot: -1.05 + t * 0.045 + p * 0.9,
          t,
          fade: 1 - seg(p, 0.42, 0.6),
          conv: seg(p, 0.35, 0.58),
          flash: seg(p, 0.5, 0.58) * (1 - seg(p, 0.58, 0.75)),
          ccx,
          ccy,
        });

        resolveGlobe?.();

        const out = 1 - seg(p, 0.04, 0.3);
        if (textWrap.current) {
          css(textWrap.current, {
            opacity: out,
            transform: `translateY(${-(1 - out) * 90}px)`,
          });
        }
      } else {
        const small = w < 600;
        drawGlobe(g, w, h, {
          cx: w / 2,
          cy: h / 2,
          R: Math.min(w, h) * 0.4,
          rot: -1.05 + t * 0.045,
          t: t + 3,
          fade: 1,
          conv: 0,
          flash: 0,
          ccx: 0,
          ccy: 0,
          small,
        });

        resolveGlobe?.();
      }
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-dark hs-hero" aria-label="Introduction">
      <div className="hs-hero-globe">
        <canvas ref={cv} className="hs-canvas" aria-hidden="true" />
      </div>
      <div className="hs-stage">
        <div ref={textWrap} className="hs-hero-text">
          <div className="hs-pill">
            <span className="hs-dot" />
            BLOCKCHAIN · FINTECH · AI
          </div>
          <h1 className="hs-h1">
            <span className="hs-line">Transform Your Ideas</span>{" "}
            <span className="hs-line">
              Into <em className="hs-grad">Intelligent</em>
            </span>{" "}
            <span className="hs-line">
              <em className="hs-grad">Solutions.</em>
            </span>
          </h1>
          <p className="hs-tagline">YOUR VISION, OUR CODE.</p>
          <div className="hs-btns">
            <Link href="/portfolio" className="hs-btn">View Our Work →</Link>
            <Link href="#contact" className="hs-btn hs-btn-ghost">Talk to Sales</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
