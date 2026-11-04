import React, { useRef } from "react";
import Link from "next/link";
import Icon from "./icons";
import { useScene, seg, eo, rv, css } from "./engine";

const SERVICES = [
  ["web", "Web Development", "High-performance web platforms"],
  ["uiux", "UI/UX Design", "Interfaces people love to use"],
  ["mobile", "Mobile Apps", "Native iOS & Android apps"],
  ["code", "Software Development", "Custom enterprise systems"],
  ["ai", "AI / Robotics", "Intelligent automation"],
  ["chain", "Blockchain", "Web3, tokens, DeFi & wallets"],
];

export default function ServicesScene() {
  const ref = useRef(null);
  const eyebrow = useRef(null);
  const h2 = useRef(null);
  const cards = useRef([]);

  useScene(ref, {
    name: "services",
    length: 0.9,
    tail: 1,
    render(p, t, mode) {
      if (mode !== "anim") return;
            cards.current.forEach((c, i) => {
        const k = eo(seg(p, 0.1 + i * 0.08, 0.36 + i * 0.08));
        css(c, { opacity: k, transform: `translateY(${(1 - k) * 120}px) rotate(${(1 - k) * 4}deg)` });
      });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-dark hs-services" aria-label="Our services">
      <div className="hs-stage">
        <div ref={eyebrow} className="hs-eyebrow hs-services-eyebrow">OUR SERVICES</div>
        <h2 ref={h2} className="hs-h2 hs-services-h2">
          Everything you need, <em className="hs-grad">under one roof.</em>
        </h2>
        <div className="hs-svc-row">
          {SERVICES.map((s, i) => (
            <Link
              href="/services"
              key={s[1]}
              ref={(n) => (cards.current[i] = n)}
              className={`hs-svc ${i === 5 ? "hs-svc-hl" : ""}`}
            >
              <span className="hs-svc-ic">
                <Icon name={s[0]} size={34} />
              </span>
              <h3>{s[1]}</h3>
              <p>{s[2]}</p>
              <span className="hs-svc-more">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
