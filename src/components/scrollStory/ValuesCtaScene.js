import React, { useRef } from "react";
import Link from "next/link";
import Icon from "./icons";
import { CubeSVG } from "./Cube";
import { useScene, ax, isMobile, seg, eio, eo, lerp, rv, css } from "./engine";

const VALUES = [
  ["bulb", "Innovation", "Creative solutions for modern challenges."],
  ["shield", "Sincerity", "Transparency you can trust."],
  ["team", "Teamwork", "Collaboration drives our success."],
  ["star", "Excellence", "Delivering beyond expectations."],
  ["bolt", "Fast Delivery", "Timely solutions, every time."],
  ["head", "Dedicated Support", "Reliable assistance, always."],
];

export default function ValuesCtaScene() {
  const ref = useRef(null);
  const eyebrow = useRef(null);
  const vals = useRef([]);
  const rings = useRef([]);
  const parts = useRef([]);
  const btn = useRef(null);

  useScene(ref, {
    name: "values",
    length: 2.2,
    render(p, t, mode) {
      if (mode !== "anim") return;
      const out = eio(seg(p, 0.34, 0.46));
      css(eyebrow.current, {
        opacity: 1 - out,
        transform: "translateX(-50%)",
      });
      const mob = isMobile();
      vals.current.forEach((v, i) => {
        const col = mob ? i % 2 : i % 3;
        const row = mob ? Math.floor(i / 2) : Math.floor(i / 3);
        const k = eo(seg(p, 0.02 + i * 0.035, 0.16 + i * 0.035));
        const X = mob
          ? lerp(ax(24 + col * 197, 0.5), ax(122, 0.5), out)
          : lerp(ax(330 + col * 440, 0.5), ax(750, 0.5), out);
        const Y = mob ? lerp(84 + row * 132, 190, out) : lerp(204 + row * 230, 134, out);
        css(v, {
          left: `${X}px`,
          top: `${Y + (1 - k) * 60}px`,
          opacity: k * (1 - out),
          transform: `scale(${1 - out * 0.5})`,
        });
      });
      const rk = eo(seg(p, 0.42, 0.6));
      (mob ? [[190, t * 40], [290, -t * 25]] : [[300, t * 40], [460, -t * 25]]).forEach(([d, rot], i) => {
        const sc = lerp(0.3, 1, rk);
        css(rings.current[i], {
          width: `${d}px`,
          height: `${d}px`,
          marginLeft: `${-d / 2}px`,
          marginTop: `${-d / 2}px`,
          opacity: rk,
          transform: `scale(${sc}) rotate(${rot}deg)`,
        });
      });
      parts.current.forEach((n, i) => rv(n, eo(seg(p, 0.5 + i * 0.05, 0.64 + i * 0.05)), 40));
      const pulse = 0.5 + 0.5 * Math.sin(t * 4);
      const kb = eo(seg(p, 0.65, 0.79));
      css(btn.current, { boxShadow: `0 0 ${20 + 30 * pulse * kb}px rgba(38,175,237,${0.5 * kb})` });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-dark hs-values" aria-label="Our core values">
      <div className="hs-stage">
        <div ref={eyebrow} className="hs-eyebrow hs-v-eyebrow">OUR CORE VALUES</div>
        <div className="hs-vals">
          {VALUES.map((v, i) => (
            <div key={v[1]} ref={(n) => (vals.current[i] = n)} className="hs-val">
              <span className="hs-val-ic">
                <Icon name={v[0]} size={32} />
              </span>
              <div>
                <h3>{v[1]}</h3>
                <p>{v[2]}</p>
              </div>
            </div>
          ))}
        </div>
        <div ref={(n) => (rings.current[0] = n)} className="hs-ring" aria-hidden="true"><i /></div>
        <div ref={(n) => (rings.current[1] = n)} className="hs-ring" aria-hidden="true"><i /></div>
        <div className="hs-cta">
          <CubeSVG className="hs-cta-cube" />
          <div ref={(n) => (parts.current[0] = n)} className="hs-wm">ERS TECH</div>
          <h2 ref={(n) => (parts.current[1] = n)} className="hs-cta-h2">
            Have an idea? <em className="hs-grad">Let&apos;s build it.</em>
          </h2>
          <div ref={(n) => (parts.current[2] = n)} className="hs-tagline">YOUR VISION, OUR CODE.</div>
          <div ref={(n) => (parts.current[3] = n)} className="hs-btns hs-cta-btns">
            <Link ref={btn} href="#contact" className="hs-btn">Contact Us →</Link>
            <Link href="/portfolio" className="hs-btn hs-btn-ghost">View Portfolio</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
