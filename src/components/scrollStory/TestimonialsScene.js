import React, { useRef } from "react";
import Image from "next/image";
import { useScene, fitCanvas, toView, getMetrics, ax, seg, eio, eo, lerp, rv, css } from "./engine";
import { CubeSVG } from "./Cube";
import ClientImg from "@/../public/assets/icons/CLIENT-IMG.png";
import Client2 from "@/../public/assets/icons/client-2-opt.webp";

const TESTIMONIALS = [
  {
    name: "Arie Amir",
    role: "Onboarding Officer, Fintech Cashier",
    img: ClientImg,
    text: "My name is Arie Amir and I am the onboarding officer and customer support at FINTECHCASHIER, & as such appreciate ERS TECH's expertise in developing & maintaining sophisticated APIs for our LATAM Fintech markets. They maintain high professional responsiveness & cooperation to guarantee our business success in those markets. I warmly recommend a partnership with ERS TECH for all potential customers.",
  },
  {
    name: "Faiqa Anwer",
    role: "Owner, LiftSplit App",
    img: Client2,
    text: "My name is Faiqa, and I am the founder of the LiftSplit app. ERS TECH has developed an application for my business that was top-notch in quality. I am satisfied with the company's services as their team is highly cooperative and expert in their domain. Highly recommended!",
  },
];
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
  const tcards = useRef([]);

  useScene(ref, {
    name: "testimonials",
    length: 2.8,
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
      const k = [0, 1, 2, 3].map((i) => eo(seg(p, 0.5 + i * 0.06, 0.66 + i * 0.06)));
      rv(eyebrow.current, k[0], 20);
      rv(h2.current, k[1], 40);
      tcards.current.forEach((n, i) => rv(n, k[2 + i], 60));
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-sky hs-testimonials" aria-label="Client testimonials">
      <canvas ref={cv} className="hs-canvas hs-sky-canvas" aria-hidden="true" />
      <div ref={white} className="hs-whiteout" />
      <div className="hs-stage">
        <div ref={eyebrow} className="hs-eyebrow hs-t-eyebrow">CLIENT STORIES</div>
        <h2 ref={h2} className="hs-h2 hs-t-h2">
          Trusted by businesses <em className="hs-grad">across the globe.</em>
        </h2>
        <div className="hs-tcards">
          {TESTIMONIALS.map((x, i) => (
            <figure key={x.name} ref={(n) => (tcards.current[i] = n)} className="hs-tcard">
              <div className="hs-q" aria-hidden="true">“</div>
              <blockquote>{x.text}</blockquote>
              <figcaption className="hs-who">
                <Image src={x.img} alt={x.name} width={58} height={58} />
                <div>
                  <b>{x.name}</b>
                  <span>{x.role}</span>
                </div>
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
