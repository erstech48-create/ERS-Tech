import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScene, fitCanvas, toView, getMetrics, ax, seg, eio, eo, lerp, rv, css } from "./engine";
import { CubeSVG } from "./Cube";
import { REVIEWS } from "@/data/reviews";


const initials = (n) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
const CARD_W = 580;
const CARD_GAP = 32;
const BLOBS = [
  { c: [46, 102, 246], x: 0.25, y: 0.3, r: 0.75, sp: 0.21 },
  { c: [38, 175, 237], x: 0.75, y: 0.35, r: 0.65, sp: 0.17 },
  { c: [110, 75, 255], x: 0.55, y: 0.8, r: 0.7, sp: 0.13 },
  { c: [20, 200, 200], x: 0.15, y: 0.85, r: 0.55, sp: 0.19 },
];
const WARP = Array.from({ length: 260 }, (_, i) => ({
  a: ((i * 137.508) % 360) * (Math.PI / 180),
  z: ((i * 7919) % 1000) / 1000,
  v: 0.6 + ((i * 31) % 100) / 120,
}));

function drawAurora(g, w, h, t, q, warp, cx, cy) {
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#040a22";
  g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = "lighter";
  const D = Math.max(w, h);
  BLOBS.forEach((b, i) => {
    const x = (b.x + Math.sin(t * b.sp + i) * 0.12 + (cx / w - 0.5) * q * 0.3) * w;
    const y = (b.y + Math.cos(t * b.sp * 1.3 + i * 2) * 0.1) * h;
    const r = b.r * D * (0.8 + q * 0.5);
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(${b.c.join(",")},0.36)`);
    gr.addColorStop(0.5, `rgba(${b.c.join(",")},0.1)`);
    gr.addColorStop(1, `rgba(${b.c.join(",")},0)`);
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
  });
  // light rays from the card
  g.save();
  g.translate(cx, cy);
  g.rotate(t * 0.05);
  for (let k = 0; k < 14; k++) {
    g.rotate((Math.PI * 2) / 14);
    const lg = g.createLinearGradient(0, 0, D, 0);
    lg.addColorStop(0, `rgba(160,220,255,${0.06 + 0.08 * q})`);
    lg.addColorStop(1, "rgba(160,220,255,0)");
    g.fillStyle = lg;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(D, -D * 0.035);
    g.lineTo(D, D * 0.035);
    g.closePath();
    g.fill();
  }
  g.restore();
  // warp streaks
  if (warp > 0) {
    g.lineCap = "round";
    for (const s of WARP) {
      const z = (s.z + t * 0.25 * s.v * (0.4 + warp * 2.2)) % 1;
      const r0 = Math.pow(z, 2.2) * D * 0.75;
      const r1 = r0 + 6 + z * 120 * warp;
      const ca = Math.cos(s.a), sa = Math.sin(s.a);
      g.strokeStyle = `rgba(200,235,255,${z * 0.7 * warp})`;
      g.lineWidth = 0.6 + z * 2;
      g.beginPath();
      g.moveTo(cx + ca * r0, cy + sa * r0);
      g.lineTo(cx + ca * r1, cy + sa * r1);
      g.stroke();
    }
  }
  g.globalCompositeOperation = "source-over";
}

export default function TestimonialsScene() {
  const ref = useRef(null);
  const cv = useRef(null);
  const white = useRef(null);
  const card = useRef(null);
  const eyebrow = useRef(null);
  const h2 = useRef(null);
  const meta = useRef(null);
  const track = useRef(null);
  const tcards = useRef([]);
  const cnt = useRef(null);
  const bar = useRef(null);
  const [idx, setIdx] = useState(0); // static mode (mobile) carousel position

  // Static mode: keep the counter in sync with the swipe position
  useEffect(() => {
    const tr = track.current;
    if (!tr) return undefined;
    const onScroll = () => {
      if (document.documentElement.classList.contains("hs-anim")) return;
      const first = tr.children[0];
      const step = first ? first.getBoundingClientRect().width + 16 : 1;
      setIdx(Math.max(0, Math.min(REVIEWS.length - 1, Math.round(tr.scrollLeft / step))));
    };
    tr.addEventListener("scroll", onScroll, { passive: true });
    return () => tr.removeEventListener("scroll", onScroll);
  }, []);
  const go = (d) => {
    const tr = track.current;
    if (!tr) return;
    const first = tr.children[0];
    const step = first ? first.getBoundingClientRect().width + 16 : 300;
    tr.scrollBy({ left: d * step, behavior: "smooth" });
  };

  useScene(ref, {
    name: "testimonials",
    length: 3.8,
    render(p, t, mode) {
      if (mode !== "anim") return;
      const f = eio(seg(p, 0, 0.5));
      const st = eio(seg(p, 0.5, 0.72));
      const X = lerp(lerp(-300, ax(780, 0.5), f), ax(1330, 1), st);
      const Y = lerp(lerp(1004, 234, f), 96, st);
      const Sc = lerp(lerp(0.45, 1.35, f), 0.7, st);
      const [vx, vy] = toView(X + 260, Y + 164);
      const c = cv.current;
      if (c && p < 0.62) {
        const { g, w, h } = fitCanvas(c);
        drawAurora(g, w, h, t, seg(p, 0, 0.5), seg(p, 0.05, 0.3) * (1 - seg(p, 0.38, 0.5)), vx, vy);
      }
      const m = getMetrics();
      const rr = eio(seg(p, 0.36, 0.56)) * Math.hypot(m.W, m.H) * 1.05;
      css(white.current, {
        opacity: p > 0.36 ? 1 : 0,
        clipPath: `circle(${rr}px at ${vx}px ${vy}px)`,
      });
      const RY = lerp(lerp(-50, -20, f), -18, st);
      const RX = lerp(lerp(55, 10, f), 8, st);
      const RZ = lerp(lerp(-30, -6, f), 6, st) + Math.sin(t * 1.5) * 1.5;
      css(card.current, {
        transform: `translate(${X}px, ${Y + Math.sin(t * 2) * 6}px) perspective(1400px) rotateX(${RX}deg) rotateY(${RY}deg) rotateZ(${RZ}deg) scale(${Sc})`,
      });
      const k = [0, 1, 2].map((i) => eo(seg(p, 0.5 + i * 0.05, 0.64 + i * 0.05)));
      rv(eyebrow.current, k[0], 20);
      rv(h2.current, k[1], 40);
      rv(meta.current, k[2], 20);
      // cards rise in, then the track slides through all reviews
      const total = REVIEWS.length * (CARD_W + CARD_GAP) - CARD_GAP;
      const slide = eio(seg(p, 0.64, 0.97));
      const x = lerp(140, Math.min(140, ax(1780, 1) - total), slide);
      css(track.current, { transform: `translateX(${x}px)` });
      tcards.current.forEach((n, i) => {
        const ki = eo(seg(p, 0.56 + Math.min(i, 3) * 0.03, 0.68 + Math.min(i, 3) * 0.03));
        rv(n, ki, 70);
      });
      const shown = Math.min(REVIEWS.length, Math.max(1, Math.round(slide * (REVIEWS.length - 1)) + 1));
      if (cnt.current) cnt.current.textContent = String(shown).padStart(2, "0");
      css(bar.current, { transform: `scaleX(${0.125 + slide * 0.875})` });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-sky hs-testimonials" aria-label="Client testimonials">
      <canvas ref={cv} className="hs-canvas hs-sky-canvas" aria-hidden="true" />
      <div ref={white} className="hs-whiteout" />
      <div className="hs-stage">
        <div ref={eyebrow} className="hs-eyebrow hs-t-eyebrow">CLIENT STORIES</div>
        <h2 ref={h2} className="hs-h2 hs-t-h2">
          What our <em className="hs-grad">clients say.</em>
        </h2>
        <div ref={meta} className="hs-t-meta">
          <span className="hs-t-count">
            <b ref={cnt}>{String(idx + 1).padStart(2, "0")}</b> / {String(REVIEWS.length).padStart(2, "0")}
          </span>
          <span className="hs-t-bar">
            <i ref={bar} style={{ transform: `scaleX(${(idx + 1) / REVIEWS.length})` }} />
          </span>
          <span className="hs-t-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" disabled={idx === 0}>
              ←
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" disabled={idx === REVIEWS.length - 1}>
              →
            </button>
          </span>
        </div>
        <div ref={track} className="hs-tcards">
          {REVIEWS.map((x, i) => (
            <figure key={x.name} ref={(n) => (tcards.current[i] = n)} className="hs-tcard">
              <div className="hs-t-top">
                <span className="hs-t-proj">
                  <i />
                  {x.project}
                </span>
                <span className="hs-t-kind">{x.kind}</span>
              </div>
              <div className="hs-q" aria-hidden="true">“</div>
              <blockquote>{x.text}</blockquote>
              <figcaption className="hs-who">
                <span className="hs-av" aria-hidden="true">
                  {initials(x.name)}
                </span>
                <span className="hs-who-txt">
                  <b>{x.name}</b>
                  <span>Client · {x.project}</span>
                </span>
                <Link href={x.href} className="hs-t-link" aria-label={`Read the ${x.project} case study`}>
                  Case study →
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
        <div ref={card} className="hs-ccard" aria-hidden="true">
          <div className="hs-ccard-lg">
            <CubeSVG className="hs-ccard-cube" />
            ERS PAY
          </div>
          <div className="hs-ccard-chip" />
          <div className="hs-ccard-num">4821 •••• •••• 2026</div>
          <div className="hs-ccard-row">
            <span>DIGITAL ASSET CARD</span>
            <span>12/29</span>
          </div>
        </div>
      </div>
    </section>
  );
}
