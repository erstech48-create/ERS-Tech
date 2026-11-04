import React, { useRef } from "react";
import Icon from "./icons";
import { useScene, seg, eio, css, clamp } from "./engine";

/* ---------- mini product visuals, one per industry ---------- */
function ShopVisual() {
  return (
    <div className="hs-vis hs-vis-shop" aria-hidden="true">
      {[["#FFB257", "Smart Watch", "$249"], ["#6E8BFF", "Headphones", "$189"], ["#2ED3B7", "Sneakers", "$129"]].map(([c, n, pr], i) => (
        <div key={n} className="hs-vis-prod" style={{ left: 40 + i * 190 }}>
          <div className="hs-vis-img" style={{ background: `linear-gradient(135deg, ${c}, ${c}99)` }} />
          <b>{n}</b>
          <span>{pr}</span>
          <i className="hs-vis-add">Add</i>
        </div>
      ))}
      <div className="hs-vis-chip hs-vis-chip-r" style={{ top: 34 }}>
        <Icon name="cart" size={18} /> 3 items · $567
      </div>
      <div className="hs-vis-chip hs-vis-chip-g" style={{ top: 92 }}>▲ 38% conversion</div>
      <div className="hs-vis-pay" style={{ top: 160 }}>
        <span>Checkout</span>
        <b>Stripe · PayPal</b>
      </div>
    </div>
  );
}
function FintechVisual() {
  return (
    <div className="hs-vis hs-vis-fin" aria-hidden="true">
      <div className="hs-vis-card">
        <span>ERS PAY</span>
        <i />
        <b>4821 •••• 2026</b>
      </div>
      <div className="hs-vis-bal">
        <span>Total balance</span>
        <b>$128,450.00</b>
        <svg viewBox="0 0 220 60" preserveAspectRatio="none">
          <path d="M0 50 C30 40 45 20 75 28 S120 10 150 18 S195 4 220 8" fill="none" stroke="#26AFED" strokeWidth="3" />
        </svg>
      </div>
      <div className="hs-vis-tx">
        {[["#12B76A", "Received", "+$2,400"], ["#F5A623", "Card payment", "-$84.90"], ["#6E8BFF", "Transfer", "-$560"]].map(([c, n, v]) => (
          <div key={n}>
            <i style={{ background: c }} />
            <span>{n}</span>
            <b>{v}</b>
          </div>
        ))}
      </div>
      <div className="hs-vis-chip hs-vis-chip-g hs-vis-kyc">
        <Icon name="check" size={16} /> KYC / AML verified
      </div>
    </div>
  );
}
function TravelVisual() {
  return (
    <div className="hs-vis hs-vis-travel" aria-hidden="true">
      <svg className="hs-vis-route" viewBox="0 0 560 200">
        <path d="M40 160 Q280 -30 520 150" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2.5" strokeDasharray="8 10" />
        <circle cx="40" cy="160" r="8" fill="#fff" />
        <circle cx="520" cy="150" r="8" fill="#fff" />
      </svg>
      <span className="hs-vis-plane">
        <Icon name="plane" size={30} />
      </span>
      <div className="hs-vis-ap" style={{ left: 20, top: 186 }}>
        <b>LHE</b>Lahore
      </div>
      <div className="hs-vis-ap" style={{ left: 488, top: 176 }}>
        <b>DXB</b>Dubai
      </div>
      <div className="hs-vis-book">
        <span>Economy · 1 adult</span>
        <b>12 Dec — 19 Dec</b>
        <div>
          <em>$412</em>
          <i>Book now</i>
        </div>
      </div>
    </div>
  );
}
function EduVisual() {
  return (
    <div className="hs-vis hs-vis-edu" aria-hidden="true">
      <div className="hs-vis-ring">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,.25)" strokeWidth="10" fill="none" />
          <circle cx="60" cy="60" r="50" stroke="#fff" strokeWidth="10" fill="none" strokeDasharray="226 314" strokeLinecap="round" transform="rotate(-90 60 60)" />
        </svg>
        <b>72%</b>
        <span>Course progress</span>
      </div>
      <div className="hs-vis-lessons">
        {["Intro to Blockchain", "Smart Contracts 101", "Building a dApp"].map((l, i) => (
          <div key={l}>
            <i className={i < 2 ? "done" : ""}>{i < 2 ? "✓" : i + 1}</i>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <div className="hs-vis-chip hs-vis-chip-r hs-vis-live">● Live class · 248 students</div>
    </div>
  );
}

const INDUSTRIES = [
  {
    icon: "cart",
    name: "E-Commerce",
    desc: "Storefronts, checkout and payment flows that stay fast on your busiest sales day.",
    points: ["Headless storefronts", "Stripe & PayPal checkout", "Inventory & order sync", "Conversion analytics"],
    bg: "linear-gradient(135deg,#ff8a3d,#ff5e62)",
    Visual: ShopVisual,
  },
  {
    icon: "card",
    name: "Fintech",
    desc: "Wallets, payment gateways and banking APIs built for compliance from day one.",
    points: ["Digital wallets & cards", "KYC / AML onboarding", "Payment gateways", "Open banking APIs"],
    bg: "linear-gradient(135deg,#2e66f6,#26AFED)",
    Visual: FintechVisual,
  },
  {
    icon: "globe",
    name: "Travel & Tourism",
    desc: "Booking engines with real-time pricing, availability and multi-currency checkout.",
    points: ["Flight & hotel booking", "Live availability", "Multi-currency pricing", "Maps & itineraries"],
    bg: "linear-gradient(135deg,#0ea5a4,#38bdf8)",
    Visual: TravelVisual,
  },
  {
    icon: "edu",
    name: "Education",
    desc: "Learning platforms, LMS and student apps that keep learners engaged.",
    points: ["LMS & course builder", "Live classes", "Progress tracking", "Certificates"],
    bg: "linear-gradient(135deg,#7b5cff,#c084fc)",
    Visual: EduVisual,
  },
];

export default function IndustriesScene() {
  const ref = useRef(null);
  const cnt = useRef(null);
  const big = useRef(null);
  const cards = useRef([]);
  const segs = useRef([]);
  const names = useRef([]);

  useScene(ref, {
    name: "industries",
    length: 3.0,
    wipeIn: true,
    render(p, t, mode) {
      if (mode !== "anim") return;
      const a = 3 * eio(seg(p, 0.1, 0.9));
      const ai = Math.round(a);
      if (cnt.current) cnt.current.textContent = `0${ai + 1}`;
      if (big.current) big.current.textContent = `0${ai + 1}`;
      segs.current.forEach((s, i) => css(s, { transform: `scaleX(${clamp(a - i + 1)})` }));
      names.current.forEach((n, i) => n?.classList.toggle("hs-on", i === ai));
      cards.current.forEach((c, i) => {
        const d = i - a;
        let y;
        let sc;
        let o;
        let rot = 0;
        if (d <= 0) {
          // leaving card: tips back and fades behind the new one
          y = d * 110;
          sc = 1 + d * 0.1;
          o = clamp(1 + (d + 0.3) * 2.4);
          rot = d * -2;
        } else {
          // upcoming cards wait stacked below the active one
          y = Math.min(d, 2.5) * 44;
          sc = 1 - Math.min(d, 2.5) * 0.06;
          o = clamp(1 - (d - 1) * 0.6, 0, 1) * (d > 2.6 ? 0 : 1);
        }
        css(c, {
          transform: `translateY(${y}px) scale(${sc}) rotate(${rot}deg)`,
          opacity: o,
          zIndex: String(100 - Math.round(Math.abs(d) * 10)),
        });
        c.classList.toggle("hs-on", Math.abs(d) < 0.5);
      });
    },
  });

  return (
    <div className="hs-wipe-wrap">
      <div className="hs-wipe-lead" aria-hidden="true" />
      <section ref={ref} className="hs-scene hs-white hs-industries" aria-label="Industries we serve">
        <div className="hs-ind-bg" aria-hidden="true">
          <div className="hs-orb hs-orb-c" />
        </div>
        <div className="hs-stage">
          <div ref={big} className="hs-ind-big" aria-hidden="true">01</div>
          <div className="hs-ind-left">
            <div className="hs-eyebrow">INDUSTRIES WE SERVE</div>
            <h2 className="hs-h2">
              Built for every <em className="hs-grad">industry.</em>
            </h2>
            <p className="hs-ind-lead">
              From regulated fintech to high-traffic commerce, we ship platforms tuned to the rules and the
              users of your market.
            </p>
            <div className="hs-ind-nav">
              {INDUSTRIES.map((x, i) => (
                <div key={x.name} ref={(n) => (names.current[i] = n)} className={`hs-ind-name ${i === 0 ? "hs-on" : ""}`}>
                  <span className="hs-ind-seg">
                    <i ref={(n) => (segs.current[i] = n)} />
                  </span>
                  {x.name}
                </div>
              ))}
            </div>
            <div className="hs-ind-cnt">
              <b ref={cnt}>01</b>/ 04
            </div>
          </div>
          <div className="hs-ind-deck">
            {INDUSTRIES.map((x, i) => (
              <article key={x.name} ref={(n) => (cards.current[i] = n)} className={`hs-ind ${i === 0 ? "hs-on" : ""}`}>
                <div className="hs-ind-visual" style={{ background: x.bg }}>
                  <x.Visual />
                </div>
                <div className="hs-ind-body">
                  <div className="hs-ind-title">
                    <span className="hs-ind-ic">
                      <Icon name={x.icon} size={30} />
                    </span>
                    <h3>{x.name}</h3>
                  </div>
                  <p>{x.desc}</p>
                  <ul>
                    {x.points.map((pt) => (
                      <li key={pt}>
                        <Icon name="check" size={16} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
