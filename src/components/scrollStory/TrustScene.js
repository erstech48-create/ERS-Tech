import React, { useRef } from "react";
import Image from "next/image";
import { useScene, seg, eo, rv, css } from "./engine";
import CLD1 from "@/../public/assets/images/CLD-01.png";
import CLD2 from "@/../public/assets/images/CLD-02.png";
import CLD3 from "@/../public/assets/images/CLD-03.png";
import CLD4 from "@/../public/assets/images/CLD-04.png";
import CLD5 from "@/../public/assets/images/CLD-05.png";
import CLD6 from "@/../public/assets/images/CLD-06.png";
import CLD7 from "@/../public/assets/images/CLD-07.png";
import CLD8 from "@/../public/assets/images/CLD-08.png";
import CLD9 from "@/../public/assets/images/CLD-09.png";
import CLD10 from "@/../public/assets/images/CLD-10.png";

const LOGOS = [
  { src: CLD1, alt: "JS Bank logo" },
  { src: CLD2, alt: "GSK Pakistan logo" },
  { src: CLD3, alt: "Alkaram Studio logo" },
  { src: CLD4, alt: "Euro Oil logo" },
  { src: CLD5, alt: "Bakri International Energy logo" },
  { src: CLD6, alt: "QuikiPay logo" },
  { src: CLD7, alt: "Fintech Cashier logo" },
  { src: CLD8, alt: "FocusMonk logo" },
  { src: CLD9, alt: "Salharo logo" },
  { src: CLD10, alt: "LiftSplit logo" },
];
const STATS = [
  { to: 600, suf: "+", label: "Projects delivered" },
  { to: 100, suf: "+", label: "Global clients" },
  { to: 97, suf: "%", label: "Satisfaction rate" },
  { to: 10, suf: "+", label: "Years of experience" },
];
const HEADLINE =
  "We engineer secure, scalable software for fintech, blockchain and the businesses of tomorrow.";

export default function TrustScene() {
  const ref = useRef(null);
  const words = useRef([]);
  const stats = useRef([]);
  const nums = useRef([]);
  const eyebrow = useRef(null);
  const mqLabel = useRef(null);
  const mq = useRef(null);
  const track = useRef(null);

  useScene(ref, {
    name: "trust",
    length: 1.3,
    ambient: true,
    render(p, t, mode) {
      if (mode === "anim") {
        words.current.forEach((s, i) =>
          css(s, { opacity: 0.12 + 0.88 * seg(p, 0.02 + i * 0.026, 0.1 + i * 0.026) })
        );
        rv(eyebrow.current, eo(seg(p, 0, 0.06)), 20);
        stats.current.forEach((s, i) => {
          rv(s, eo(seg(p, 0.38 + i * 0.05, 0.55 + i * 0.05)), 40);
          const n = nums.current[i];
          if (n) n.textContent = Math.round(STATS[i].to * eo(seg(p, 0.42 + i * 0.05, 0.8)));
        });
        rv(mqLabel.current, eo(seg(p, 0.5, 0.62)), 20);
        css(mq.current, { opacity: eo(seg(p, 0.5, 0.65)) });
      } else {
        nums.current.forEach((n, i) => n && (n.textContent = STATS[i].to));
      }
      const tw = track.current ? track.current.scrollWidth / 3 : 2000;
      css(track.current, { transform: `translateX(${-((t * 70) % tw)}px)` });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-light hs-trust" aria-label="Who we are">
      <div className="hs-stage">
        <div ref={eyebrow} className="hs-eyebrow hs-trust-eyebrow">WHO WE ARE</div>
        <h2 className="hs-h2 hs-trust-h2">
          {HEADLINE.split(" ").map((w, i) => (
            <span key={i} ref={(n) => (words.current[i] = n)}>
              {w}{" "}
            </span>
          ))}
        </h2>
        <div className="hs-stats">
          {STATS.map((s, i) => (
            <div key={s.label} ref={(n) => (stats.current[i] = n)} className="hs-stat">
              <b>
                <span ref={(n) => (nums.current[i] = n)}>{s.to}</span>
                <sup>{s.suf}</sup>
              </b>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
        <div ref={mqLabel} className="hs-mq-label">TRUSTED BY</div>
        <div ref={mq} className="hs-marquee">
        <div ref={track} className="hs-marquee-track">
          {[0, 1, 2].flatMap((r) =>
            LOGOS.map((l, i) => (
              <div key={`${r}-${i}`} className="hs-logo-pill" aria-hidden={r > 0}>
                <Image src={l.src} alt={r === 0 ? l.alt : ""} height={56} width={150} />
              </div>
            ))
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
