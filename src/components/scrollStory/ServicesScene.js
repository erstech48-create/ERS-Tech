import React, { useRef } from "react";
import Link from "next/link";
import Icon from "./icons";
import { useScene, seg, eo, rv, css } from "./engine";

const SERVICES = [
  {
    icon: "web",
    badge: "01",
    title: "Web Development",
    desc: "High-performance web apps built for speed, SEO, and enterprise scale.",
    features: ["Next.js & React Apps", "Scalable Cloud Architecture", "Modern API Integration"],
  },
  {
    icon: "uiux",
    badge: "02",
    title: "UI/UX Design",
    desc: "Intuitive product design turning complex flows into seamless journeys.",
    features: ["Interactive Prototypes", "Scalable Design Systems", "User Research & Testing"],
  },
  {
    icon: "mobile",
    badge: "03",
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile apps for iOS & Android with fluid UX.",
    features: ["iOS & Android Native", "Flutter & React Native", "Real-Time Push & Sync"],
  },
  {
    icon: "code",
    badge: "04",
    title: "Software Development",
    desc: "Custom enterprise software, bespoke APIs, and reliable ERP/CRM solutions.",
    features: ["Enterprise Architecture", "Secure Microservices", "CI/CD & DevOps Automation"],
  },
  {
    icon: "ai",
    badge: "05",
    title: "AI / Robotics",
    desc: "Intelligent automation, autonomous LLM workflows, and predictive models.",
    features: ["LLMs & Custom Agents", "Workflow Automation", "Predictive Analytics"],
  },
  {
    icon: "chain",
    badge: "06",
    title: "Blockchain",
    desc: "Audited smart contracts, Web3 protocols, tokens, and multi-chain crypto wallets.",
    features: ["Audited Smart Contracts", "DeFi Protocols & Tokens", "Web3 Non-Custodial Wallets"],
  },
];

export default function ServicesScene() {
  const ref = useRef(null);
  const eyebrow = useRef(null);
  const h2 = useRef(null);
  const cards = useRef([]);

  useScene(ref, {
    name: "services",
    length: 1.4,
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
              key={s.title}
              ref={(n) => (cards.current[i] = n)}
              className={`hs-svc ${i === 5 ? "hs-svc-hl" : ""}`}
            >
              <div className="hs-svc-top">
                <span className="hs-svc-ic">
                  <Icon name={s.icon} size={32} />
                </span>
                <span className="hs-svc-badge">{s.badge}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="hs-svc-features">
                {s.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="hs-svc-bullet" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <span className="hs-svc-more">
                Learn more <span className="hs-svc-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
