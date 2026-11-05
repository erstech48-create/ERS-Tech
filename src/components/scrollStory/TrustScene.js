import React, { useRef } from "react";
import Image from "next/image";
import Icon from "./icons";
import { useScene, seg, eo, rv, css } from "./engine";
import C1 from "@/../public/assets/images/clients/client-01.webp";
import C2 from "@/../public/assets/images/clients/client-02.webp";
import C3 from "@/../public/assets/images/clients/client-03.webp";
import C4 from "@/../public/assets/images/clients/client-04.webp";
import C5 from "@/../public/assets/images/clients/client-05.webp";
import C6 from "@/../public/assets/images/clients/client-06.webp";
import C7 from "@/../public/assets/images/clients/client-07.webp";
import C8 from "@/../public/assets/images/clients/client-08.webp";
import C9 from "@/../public/assets/images/clients/client-09.webp";
import C10 from "@/../public/assets/images/clients/client-10.webp";
import C11 from "@/../public/assets/images/clients/client-11.webp";

const LOGOS = [
  { src: C4, alt: "JS Bank" },
  { src: C3, alt: "GSK" },
  { src: C2, alt: "Alkaram Studio" },
  { src: C1, alt: "Euro Oil" },
  { src: C5, alt: "QuikiPay" },
  { src: C7, alt: "Bakri International Energy" },
  { src: C6, alt: "Pakistan Catalyst Fund" },
  { src: C11, alt: "WingleSoft" },
  { src: C10, alt: "Digital Signage UK" },
  { src: C8, alt: "Mukaf Learning Campus" },
  { src: C9, alt: "Alkaram SEO" },
];
const STATS = [
  { to: 600, suf: "+", label: "Projects delivered", icon: "rocket", fill: 0.92 },
  { to: 100, suf: "+", label: "Global clients", icon: "globe", fill: 0.78 },
  { to: 97, suf: "%", label: "Satisfaction rate", icon: "smile", fill: 0.97 },
  { to: 10, suf: "+", label: "Years of experience", icon: "calendar", fill: 0.66 },
];
const HEADLINE =
  "We engineer secure, scalable software for fintech, blockchain and the businesses of tomorrow.";

export default function TrustScene() {
  const ref = useRef(null);
  const words = useRef([]);
  const stats = useRef([]);
  const nums = useRef([]);
  const bars = useRef([]);
  const r = useRef({});
  const track = useRef(null);
  const set = (k) => (n) => {
    r.current[k] = n;
  };

  useScene(ref, {
    name: "trust",
    length: 1.9,
    ambient: true,
    live: true,
    render(p, t, mode) {
      const R = r.current;
      if (mode === "anim") {
        words.current.forEach((s, i) =>
          css(s, { opacity: 0.14 + 0.86 * seg(p, 0.02 + i * 0.024, 0.1 + i * 0.024) })
        );
        stats.current.forEach((s, i) => {
          const k = eo(seg(p, 0.36 + i * 0.05, 0.56 + i * 0.05));
          css(s, { opacity: k, transform: `translate3d(0, ${(1 - k) * 70}px, 0)` });
          const c = eo(seg(p, 0.42 + i * 0.05, 0.82));
          if (nums.current[i]) nums.current[i].textContent = Math.round(STATS[i].to * c);
          css(bars.current[i], { transform: `scaleX(${STATS[i].fill * c})` });
        });
        rv(R.mqHead, eo(seg(p, 0.55, 0.68)), 20);
        css(R.mq, { opacity: eo(seg(p, 0.58, 0.72)) });
        css(R.rings, { transform: `rotate(${t * 12}deg)` });
        css(R.orbA, { transform: `translate3d(${Math.sin(t * 0.4) * 40}px, ${Math.cos(t * 0.3) * 30}px, 0)` });
      } else {
        nums.current.forEach((n, i) => n && (n.textContent = STATS[i].to));
        bars.current.forEach((b, i) => css(b, { transform: `scaleX(${STATS[i].fill})` }));
      }
      const tw = track.current ? track.current.scrollWidth / 2 : 2000;
      css(track.current, { transform: `translate3d(${-((t * 60) % tw)}px, 0, 0)` });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-light hs-trust" aria-label="Who we are">
      <div className="hs-trust-bg" aria-hidden="true">
        <div ref={set("orbA")} className="hs-orb hs-orb-a" />
        <div className="hs-orb hs-orb-b" />
        <div className="hs-gridfade" />
      </div>
      <div className="hs-stage">
        <div ref={set("rings")} className="hs-trust-rings" aria-hidden="true">
          <i />
          <i />
        </div>
        <div className="hs-eyebrow hs-trust-eyebrow">WHO WE ARE</div>
        <h2 className="hs-h2 hs-trust-h2">
          {HEADLINE.split(" ").map((w, i) => (
            <span key={i} ref={(n) => (words.current[i] = n)} className={i >= 5 && i <= 7 ? "hs-trust-key" : ""}>
              {w}{" "}
            </span>
          ))}
        </h2>
        <div className="hs-stats">
          {STATS.map((s, i) => (
            <div key={s.label} ref={(n) => (stats.current[i] = n)} className="hs-stat">
              <span className="hs-stat-ic">
                <Icon name={s.icon} size={26} />
              </span>
              <b>
                <span ref={(n) => (nums.current[i] = n)}>{s.to}</span>
                <sup>{s.suf}</sup>
              </b>
              <p>{s.label}</p>
              <div className="hs-stat-bar">
                <i ref={(n) => (bars.current[i] = n)} />
              </div>
            </div>
          ))}
        </div>
        <div ref={set("mqHead")} className="hs-mq-head">
          <span />
          TRUSTED BY BUSINESSES WORLDWIDE
          <span />
        </div>
        <div ref={set("mq")} className="hs-marquee">
          <div ref={track} className="hs-marquee-track">
            {[0, 1].flatMap((rr) =>
              LOGOS.map((l, i) => (
                <div key={`${rr}-${i}`} className="hs-logo-pill" aria-hidden={rr > 0}>
                  <Image src={l.src} alt={rr === 0 ? `${l.alt} logo` : ""} sizes="240px" decoding="async" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
