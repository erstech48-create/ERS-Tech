import React, { useRef } from "react";
import Icon from "./icons";
import { useScene, seg, eio, rv, css, clamp } from "./engine";

const INDUSTRIES = [
  ["cart", "E-Commerce", "Storefronts, checkout and payments that scale with your traffic.", ["Stripe", "PayPal", "Inventory"]],
  ["card", "Fintech", "Wallets, payment gateways, KYC/AML and banking APIs.", ["Payments", "KYC/AML", "Open Banking"]],
  ["globe", "Travel & Tourism", "Booking engines with real-time pricing and availability.", ["Bookings", "Maps", "Multi-currency"]],
  ["edu", "Education", "Learning platforms, LMS and student apps.", ["LMS", "Live classes", "Analytics"]],
];

export default function IndustriesScene() {
  const ref = useRef(null);
  const left = useRef(null);
  const cnt = useRef(null);
  const cards = useRef([]);

  useScene(ref, {
    name: "industries",
    length: 1.8,
    wipeIn: true,
    render(p, t, mode) {
      if (mode !== "anim") return;
      rv(left.current, 1, 0);
      const a = 3 * eio(seg(p, 0.12, 0.88));
      if (cnt.current) cnt.current.textContent = `0${Math.round(a) + 1}`;
      cards.current.forEach((c, i) => {
        const d = i - a;
        const on = Math.abs(d) < 0.5;
        c.classList.toggle("hs-on", on);
        css(c, {
          top: `${299 + d * 330}px`,
          opacity: clamp(1 - Math.abs(d) * 0.55, 0.15, 1),
          transform: `scale(${1 - Math.min(Math.abs(d), 1) * 0.06})`,
        });
      });
    },
  });

  return (
    <div className="hs-wipe-wrap">
      <div className="hs-wipe-lead" aria-hidden="true" />
      <section ref={ref} className="hs-scene hs-white hs-industries" aria-label="Industries we serve">
        <div className="hs-stage">
          <div ref={left} className="hs-ind-left">
            <div className="hs-eyebrow">INDUSTRIES WE SERVE</div>
            <h2 className="hs-h2">
              Built for every <em className="hs-grad">industry.</em>
            </h2>
            <div className="hs-ind-cnt">
              <b ref={cnt}>01</b>/ 04
            </div>
          </div>
          <div className="hs-ind-list">
            {INDUSTRIES.map((x, i) => (
              <div key={x[1]} ref={(n) => (cards.current[i] = n)} className="hs-ind">
                <span className="hs-ind-ic">
                  <Icon name={x[0]} size={44} />
                </span>
                <div>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                  <div className="hs-tags">
                    {x[3].map((tg) => (
                      <span key={tg}>{tg}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
