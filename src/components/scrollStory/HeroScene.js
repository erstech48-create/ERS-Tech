import React, { useRef } from "react";
import Link from "next/link";
import { useScene, fitCanvas, toView, getMetrics, seg, eio, eo, lerp, clamp, rv, css } from "./engine";

const D2R = Math.PI / 180;
const LAND = [
  [48, -100, 20, 32], [62, -120, 10, 30], [-15, -60, 22, 13], [52, 15, 11, 22],
  [60, 40, 10, 40], [5, 20, 28, 18], [45, 90, 20, 48], [22, 78, 10, 8],
  [5, 110, 9, 15], [-25, 134, 11, 17], [25, 45, 10, 12], [72, -40, 8, 18],
];
const isLand = (la, lo) => LAND.some(([a, b, r1, r2]) => ((la - a) / r1) ** 2 + ((lo - b) / r2) ** 2 < 1);
const PTS = (() => {
  const N = 4200;
  const ga = Math.PI * (3 - Math.sqrt(5));
  const out = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N;
    const lat = Math.asin(y);
    const lon = ((i * ga) % (Math.PI * 2)) - Math.PI;
    out.push([lat, lon, isLand(lat / D2R, lon / D2R)]);
  }
  return out;
})();
const LHR = [31.5, 74.3];
const DEST = [[51.5, -0.1], [25.2, 55.3], [40.7, -74], [1.35, 103.8], [-23.5, -46.6], [-33.9, 151.2], [35.7, 139.7]];
const v3 = (la, lo) => [Math.cos(la * D2R) * Math.sin(lo * D2R), Math.sin(la * D2R), Math.cos(la * D2R) * Math.cos(lo * D2R)];
const v3r = (la, lo) => [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
function proj(v, rot, cx, cy, R) {
  let [x, y, z] = v;
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  [x, z] = [x * c + z * s, -x * s + z * c];
  const tl = 0.32;
  const ct = Math.cos(tl);
  const st = Math.sin(tl);
  [y, z] = [y * ct - z * st, y * st + z * ct];
  return [cx + x * R, cy - y * R, z];
}
function slerp(a, b, u) {
  const d = Math.acos(clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1));
  const s = Math.sin(d);
  const k1 = Math.sin((1 - u) * d) / s;
  const k2 = Math.sin(u * d) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

function drawGlobe(g, w, h, { cx, cy, R, rot, t, fade, conv, flash, ccx, ccy, small }) {
  g.clearRect(0, 0, w, h);
  g.globalAlpha = fade;
  if (fade > 0.01) {
    let gr = g.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
    gr.addColorStop(0, "rgba(38,175,237,0)");
    gr.addColorStop(0.35, "rgba(38,175,237,0.28)");
    gr.addColorStop(1, "rgba(38,175,237,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R * 1.25, 0, 7);
    g.fill();
    gr = g.createRadialGradient(cx - R * 0.3, cy - R * 0.35, 0, cx, cy, R);
    gr.addColorStop(0, "#123a8a");
    gr.addColorStop(1, "#061538");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.fill();
    const dot = Math.max(1.4, R / 220);
    const step = small ? 2 : 1;
    for (let i = 0; i < PTS.length; i += step) {
      const [la, lo, land] = PTS[i];
      const [x, y, zz] = proj(v3r(la, lo), rot, cx, cy, R);
      if (zz < 0) continue;
      if (land) {
        g.fillStyle = `rgba(120,210,255,${0.35 + 0.65 * zz})`;
        g.fillRect(x - dot, y - dot, dot * 2, dot * 2);
      } else {
        g.fillStyle = `rgba(90,140,230,${0.18 * zz})`;
        g.fillRect(x - dot * 0.6, y - dot * 0.6, dot * 1.2, dot * 1.2);
      }
    }
    g.strokeStyle = "rgba(38,175,237,.6)";
    g.lineWidth = 2;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.stroke();

    const a = v3(...LHR);
    const grow = seg(t, 0.4, 2.4);
    DEST.forEach((d, k) => {
      const b = v3(...d);
      const lim = clamp(grow * 1.4 - k * 0.08);
      g.beginPath();
      let started = false;
      for (let i = 0; i <= 60; i++) {
        const u = (i / 60) * lim;
        const hh = 1 + 0.22 * Math.sin(Math.PI * u);
        const v = slerp(a, b, u).map((q) => q * hh);
        const [x, y, zz] = proj(v, rot, cx, cy, R);
        if (zz < -0.15) {
          started = false;
          continue;
        }
        if (!started) {
          g.moveTo(x, y);
          started = true;
        } else g.lineTo(x, y);
      }
      g.strokeStyle = "rgba(38,175,237,.85)";
      g.lineWidth = 2.2;
      g.shadowColor = "#26AFED";
      g.shadowBlur = 12;
      g.stroke();
      g.shadowBlur = 0;
      if (lim >= 1) {
        const u = (t * 0.45 + k * 0.19) % 1;
        const hh = 1 + 0.22 * Math.sin(Math.PI * u);
        const v = slerp(a, b, u).map((q) => q * hh);
        const [x, y, zz] = proj(v, rot, cx, cy, R);
        if (zz > -0.1) {
          g.fillStyle = "#fff";
          g.shadowColor = "#fff";
          g.shadowBlur = 16;
          g.beginPath();
          g.arc(x, y, 4, 0, 7);
          g.fill();
          g.shadowBlur = 0;
        }
      }
    });
    const [lx, ly, lz] = proj(a, rot, cx, cy, R);
    if (lz > 0) {
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(lx, ly, 6, 0, 7);
      g.fill();
      g.strokeStyle = "rgba(255,255,255,.5)";
      g.beginPath();
      g.arc(lx, ly, 12 + 6 * Math.sin(t * 4), 0, 7);
      g.stroke();
      g.font = `600 ${small ? 11 : 14}px Poppins, sans-serif`;
      g.fillText("LAHORE HQ", lx + 16, ly - 10);
    }
  }
  g.globalAlpha = 1;
  if (conv > 0 && conv < 1) {
    const span = Math.max(w, h) * 0.6;
    for (let k = 0; k < 40; k++) {
      const ang = (k / 40) * Math.PI * 2 + t;
      const r0 = lerp(span, 30, eio(conv)) + ((k * 37) % 60);
      const r1 = r0 + lerp(span * 0.3, 10, conv);
      g.strokeStyle = `rgba(38,175,237,${0.6 * (1 - conv) + 0.2})`;
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

export default function HeroScene() {
  const ref = useRef(null);
  const cv = useRef(null);
  const els = useRef({});
  const set = (k) => (n) => {
    els.current[k] = n;
  };

  useScene(ref, {
    name: "hero",
    length: 1.6,
    ambient: true,
    staticP: 0,
    render(p, t, mode) {
      const c = cv.current;
      if (!c) return;
      const { g, w, h } = fitCanvas(c);
      if (mode === "anim") {
        const m = getMetrics();
        const z = eio(seg(p, 0.15, 0.5));
        const [gx, gy] = toView(lerp(1370, 960, z), lerp(470, 424, z));
        const [ccx, ccy] = toView(960, 424);
        drawGlobe(g, w, h, {
          cx: gx,
          cy: gy,
          R: lerp(370, 640, z) * m.s,
          rot: -1.6 + t * 0.22 + p * 0.8,
          t,
          fade: 1 - seg(p, 0.42, 0.6),
          conv: seg(p, 0.35, 0.58),
          flash: seg(p, 0.5, 0.58) * (1 - seg(p, 0.58, 0.75)),
          ccx,
          ccy,
        });
        const out = 1 - seg(p, 0.04, 0.3);
        ["pill", "l1", "l2", "l3", "tag", "btns"].forEach((k, i) => {
          const n = els.current[k];
          const kin = eo(seg(t, 0.15 + i * 0.12, 0.75 + i * 0.12));
          css(n, {
            opacity: kin * out,
            transform: `translateY(${(1 - kin) * 50 - (1 - out) * 90}px)`,
          });
        });
        rv(els.current.hint, seg(t, 1.4, 1.9) * (1 - seg(p, 0.02, 0.08)), 0);
        css(els.current.wheel, { transform: `translateY(${((t * 1.2) % 1) * 12}px)` });
      } else {
        const small = w < 600;
        drawGlobe(g, w, h, {
          cx: w / 2,
          cy: h / 2,
          R: Math.min(w, h) * 0.42,
          rot: -1.6 + t * 0.22,
          t: t + 3,
          fade: 1,
          conv: 0,
          flash: 0,
          ccx: 0,
          ccy: 0,
          small,
        });
      }
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-dark hs-hero" aria-label="Introduction">
      <div className="hs-hero-globe">
        <canvas ref={cv} className="hs-canvas" aria-hidden="true" />
      </div>
      <div className="hs-stage">
        <div className="hs-hero-text">
          <div ref={set("pill")} className="hs-pill">
            <span className="hs-dot" />
            BLOCKCHAIN · FINTECH · AI
          </div>
          <h1 className="hs-h1">
            <span ref={set("l1")} className="hs-line">Transform Your Ideas</span>{" "}
            <span ref={set("l2")} className="hs-line">
              Into <em className="hs-grad">Intelligent</em>
            </span>{" "}
            <span ref={set("l3")} className="hs-line">
              <em className="hs-grad">Solutions.</em>
            </span>
          </h1>
          <p ref={set("tag")} className="hs-tagline">YOUR VISION, OUR CODE.</p>
          <div ref={set("btns")} className="hs-btns">
            <Link href="/portfolio" className="hs-btn">View Our Work →</Link>
            <Link href="#contact" className="hs-btn hs-btn-ghost">Talk to Sales</Link>
          </div>
        </div>
      </div>
      <div ref={set("hint")} className="hs-scroll-hint" aria-hidden="true">
        <div className="hs-mouse">
          <i ref={set("wheel")} />
        </div>
        SCROLL
      </div>
    </section>
  );
}
