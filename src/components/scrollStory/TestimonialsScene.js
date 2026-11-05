import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScene, fitCanvas, canvasDue, radial, toView, getMetrics, ax, seg, eio, eo, lerp, rv, css } from "./engine";
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

let fanCanvas = null;
let fanD = 0;
// The faint light-ray fan is stored at half resolution and drawn 2x
// (soft 12%-alpha rays: same look, 4x fewer pixels to rotate every frame).
const FAN_RES = 0.5;
function getFanCanvas(D) {
  const size = Math.round(D * 2 * FAN_RES);
  if (!fanCanvas || Math.abs(fanD - D) > 20) {
    fanD = D;
    fanCanvas = document.createElement("canvas");
    fanCanvas.width = size;
    fanCanvas.height = size;
    const fg = fanCanvas.getContext("2d");
    fg.scale(size / (D * 2), size / (D * 2));
    fg.translate(D, D);
    for (let k = 0; k < 14; k++) {
      fg.rotate((Math.PI * 2) / 14);
      const lg = fg.createLinearGradient(0, 0, D, 0);
      lg.addColorStop(0, "rgba(160,220,255,0.12)");
      lg.addColorStop(1, "rgba(160,220,255,0)");
      fg.fillStyle = lg;
      fg.beginPath();
      fg.moveTo(0, 0);
      fg.lineTo(D, -D * 0.035);
      fg.lineTo(D, D * 0.035);
      fg.closePath();
      fg.fill();
    }
  }
  return fanCanvas;
}

let blobCanvas = null;
let blobW = 0, blobH = 0;
function getBlobCanvas(w, h, D) {
  const bw = Math.max(10, Math.round(w / 3));
  const bh = Math.max(10, Math.round(h / 3));
  const bD = D / 3;
  if (!blobCanvas || blobW !== bw || blobH !== bh) {
    blobW = bw;
    blobH = bh;
    blobCanvas = document.createElement("canvas");
    blobCanvas.width = bw;
    blobCanvas.height = bh;
    const bg = blobCanvas.getContext("2d");
    BLOBS.forEach((b) => {
      const bx = b.x * bw;
      const by = b.y * bh;
      const br = b.r * bD;
      const gr = radial(bg, bx, by, 0, bx, by, br);
      gr.addColorStop(0, `rgba(${b.c.join(",")},0.36)`);
      gr.addColorStop(0.5, `rgba(${b.c.join(",")},0.1)`);
      gr.addColorStop(1, `rgba(${b.c.join(",")},0)`);
      bg.fillStyle = gr;
      bg.fillRect(0, 0, bw, bh);
    });
  }
  return blobCanvas;
}

function drawAurora(g, w, h, t, q, warp, cx, cy) {
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#040a22";
  g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = "lighter";
  const D = Math.max(w, h);

  // Scaled pre-rendered blobs from 1/3 resolution offscreen canvas
  const bc = getBlobCanvas(w, h, D);
  g.drawImage(bc, 0, 0, w, h);

  // Pre-rendered light-ray fan rotated with drawImage
  const fan = getFanCanvas(D);
  g.save();
  g.translate(cx, cy);
  g.rotate(t * 0.05);
  g.globalAlpha = 0.5 + 0.5 * q;
  g.drawImage(fan, -D, -D, D * 2, D * 2);
  g.restore();

  // Batched warp streaks (3 alpha buckets)
  if (warp > 0) {
    g.lineCap = "round";
    const warpBuckets = [new Path2D(), new Path2D(), new Path2D()];
    for (let i = 0; i < WARP.length; i++) {
      const s = WARP[i];
      const z = (s.z + t * 0.25 * s.v * (0.4 + warp * 2.2)) % 1;
      const r0 = Math.pow(z, 2.2) * D * 0.75;
      const r1 = r0 + 6 + z * 120 * warp;
      const ca = Math.cos(s.a), sa = Math.sin(s.a);
      const b = Math.min(2, Math.floor(z * 3));
      warpBuckets[b].moveTo(cx + ca * r0, cy + sa * r0);
      warpBuckets[b].lineTo(cx + ca * r1, cy + sa * r1);
    }
    const warpAlphas = [0.2 * warp, 0.45 * warp, 0.7 * warp];
    for (let b = 0; b < 3; b++) {
      g.strokeStyle = `rgba(200,235,255,${warpAlphas[b]})`;
      g.lineWidth = 1 + b * 0.8;
      g.stroke(warpBuckets[b]);
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
    ambient: true,
    live: true,
    render(p, t, mode) {
      if (mode !== "anim") return;
      const f = eio(seg(p, 0, 0.5));
      const st = eio(seg(p, 0.5, 0.72));
      const mob = getMetrics().mobile;
      // card centre path; the card is 520x328 and scales around its centre
      const X = mob
        ? lerp(lerp(-150, ax(215, 0.5), f), ax(352, 1), st) - 260
        : lerp(lerp(-300, ax(780, 0.5), f), ax(1330, 1), st);
      const Y = mob ? lerp(lerp(900, 380, f), 192, st) - 164 : lerp(lerp(1004, 234, f), 96, st);
      const Sc = mob ? lerp(lerp(0.3, 0.72, f), 0.26, st) : lerp(lerp(0.45, 1.35, f), 0.7, st);
      const [vx, vy] = toView(X + 260, Y + 164);
      const c = cv.current;
      if (c && p < 0.62 && canvasDue(c)) {
        const fc = fitCanvas(c, 0.6); // soft aurora: 0.6x resolution is visually identical
        if (fc) {
          const { g, w, h } = fc;
          drawAurora(g, w, h, t, seg(p, 0, 0.5), seg(p, 0.05, 0.3) * (1 - seg(p, 0.38, 0.5)), vx, vy);
        }
      }
      const m = getMetrics();
      const rr = eio(seg(p, 0.36, 0.56)) * Math.hypot(m.W, m.H) * 1.05;
      css(white.current, {
        opacity: p > 0.36 ? 1 : 0,
        // once the circle covers the whole screen the clip is dropped (no repaint per frame)
        clipPath: seg(p, 0.36, 0.56) >= 1 ? "none" : `circle(${rr}px at ${vx}px ${vy}px)`,
      });
      const RY = lerp(lerp(-50, -20, f), -18, st);
      const RX = lerp(lerp(55, 10, f), 8, st);
      const RZ = lerp(lerp(-30, -6, f), 6, st) + Math.sin(t * 1.5) * 1.5;
      css(card.current, {
        opacity: mob ? 1 - seg(p, 0.56, 0.66) : 1,
        transform: `translate3d(${X}px, ${Y + Math.sin(t * 2) * 6}px, 0) perspective(1400px) rotateX(${RX}deg) rotateY(${RY}deg) rotateZ(${RZ}deg) scale(${Sc})`,
      });
      const k = [0, 1, 2].map((i) => eo(seg(p, 0.5 + i * 0.05, 0.64 + i * 0.05)));
      rv(eyebrow.current, k[0], 20);
      rv(h2.current, k[1], 40);
      rv(meta.current, k[2], 20);
      // cards rise in, then the track slides through all reviews
      const cw = mob ? 360 : CARD_W;
      const cg = mob ? 16 : CARD_GAP;
      const total = REVIEWS.length * (cw + cg) - cg;
      const slide = eio(seg(p, 0.64, 0.97));
      const x0 = mob ? 24 : 140;
      const x = lerp(x0, Math.min(x0, ax(mob ? 406 : 1780, 1) - total), slide);
      css(track.current, { transform: `translate3d(${x}px, 0, 0)` });
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
