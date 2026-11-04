import React, { useRef } from "react";
import Image from "next/image";
import { useScene, fitCanvas, seg, eio, eo, lerp, clamp, rv, css } from "./engine";
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
const CL = Array.from({ length: 70 }, (_, i) => ({
  x: ((i * 7331) % 1000) / 1000,
  y: ((i * 4421) % 1000) / 1000,
  r: 0.6 + ((i * 13) % 10) / 10,
  z: ((i * 271) % 1000) / 1000,
}));

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
    length: 2.0,
    render(p, t, mode) {
      if (mode !== "anim") return;
      const c = cv.current;
      if (c) {
        const { g, w, h } = fitCanvas(c);
        const q = seg(p, 0, 0.55);
        g.clearRect(0, 0, w, h);
        const sc0 = Math.max(w, h) / 1920;
        for (const cl of CL) {
          const z = (cl.z + q * 1.1 + t * 0.01) % 1.25;
          const sc = 0.3 + z * z * 3.2;
          const x = w / 2 + (cl.x - 0.5) * w * 1.3 * sc * 0.6;
          const y = h / 2 + (cl.y - 0.5) * h * 1.2 * sc * 0.6;
          const r = cl.r * 120 * sc * sc0;
          const a = clamp(z * 1.4) * 0.85;
          const gr = g.createRadialGradient(x, y, 0, x, y, r);
          gr.addColorStop(0, `rgba(255,255,255,${a})`);
          gr.addColorStop(0.6, `rgba(255,255,255,${a * 0.5})`);
          gr.addColorStop(1, "rgba(255,255,255,0)");
          g.fillStyle = gr;
          g.beginPath();
          g.arc(x, y, r, 0, 7);
          g.fill();
        }
      }
      css(white.current, { opacity: seg(p, 0.36, 0.52) });
      const f = eio(seg(p, 0, 0.5));
      const st = eio(seg(p, 0.5, 0.72));
      const X = lerp(lerp(-300, 780, f), 1330, st);
      const Y = lerp(lerp(1004, 234, f), 150, st);
      const Sc = lerp(lerp(0.45, 1.35, f), 0.85, st);
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
