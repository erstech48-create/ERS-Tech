import React, { useEffect, useRef } from "react";
import { useScene, ax, isMobile, seg, eo, eio, lerp, css } from "./engine";

const STEPS = [
  ["STEP 01", "UI/UX Design", "Wireframes, user flows and design systems"],
  ["STEP 02", "Web & Mobile Apps", "Dashboards, wallets and native apps"],
  ["STEP 03", "Launch & Scale", "Secure cloud deploys, monitoring and support"],
];
const BARS = Array.from({ length: 14 }, (_, i) => 60 + ((i * 53) % 150));
const DOTS = ["#ff5f57", "#febc2e", "#28c840"];

function Dashboard({ wire }) {
  if (wire) {
    return (
      <div className="hs-dash-wire" aria-hidden="true">
        <i style={{ left: 0, top: 44, width: "100%", height: 2, background: "#b4c2db", borderRadius: 0 }} />
        <i style={{ left: 0, top: 46, width: 170, height: 452, borderRight: "2px dashed #b4c2db", borderRadius: 0 }} />
        {[0, 1, 2].map((i) => (
          <i key={i} style={{ left: 196 + i * 204, top: 72, width: 188, height: 96, border: "2px dashed #b4c2db" }} />
        ))}
        <i style={{ left: 196, top: 190, width: 600, height: 286, border: "2px dashed #b4c2db" }} />
      </div>
    );
  }
  return (
    <div className="hs-dash-col" aria-hidden="true">
      <i style={{ left: 0, top: 0, width: "100%", height: 46, borderRadius: 0, background: "#F1F5FB", borderBottom: "1px solid #e3e9f3" }} />
      {DOTS.map((c, i) => (
        <i key={c} style={{ left: 20 + i * 20, top: 17, width: 12, height: 12, borderRadius: "50%", background: c }} />
      ))}
      <i style={{ left: 0, top: 46, width: 170, height: 454, borderRadius: 0, background: "#0B1530" }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} style={{ left: 24, top: 84 + i * 44, width: i ? 100 : 122, height: 14, background: i ? "rgba(255,255,255,.18)" : "#26AFED" }} />
      ))}
      {[0, 1, 2].map((i) => (
        <i key={i} style={{ left: 196 + i * 204, top: 72, width: 188, height: 96, background: i ? "#F1F5FB" : "linear-gradient(135deg,#2e66f6,#26AFED)" }}>
          <i style={{ left: 18, top: 20, width: 80, height: 10, background: i ? "#cfd9ea" : "rgba(255,255,255,.6)" }} />
          <i style={{ left: 18, top: 44, width: 120, height: 24, background: i ? "#0B1530" : "#fff" }} />
        </i>
      ))}
      <i style={{ left: 196, top: 190, width: 600, height: 286, background: "#F7F9FD", border: "1px solid #e6ecf5" }}>
        {BARS.map((h, i) => (
          <i
            key={i}
            className="hs-bar"
            data-h={h}
            style={{ left: 28 + i * 40, bottom: 24, top: "auto", width: 22, height: h, borderRadius: 6, background: i % 3 === 2 ? "#26AFED" : "#2e66f6" }}
          />
        ))}
      </i>
    </div>
  );
}

function Wallet() {
  return (
    <div className="hs-phone-scr" aria-hidden="true">
      <i style={{ left: 18, top: 34, width: 90, height: 10, background: "#cfd9ea" }} />
      <div className="hs-wallet-card">
        <span>BALANCE</span>
        <b>$24,580</b>
        <small>+4.2% this week</small>
      </div>
      <i style={{ left: 14, top: 196, width: 94, height: 40, borderRadius: 12, background: "#2e66f6" }} />
      <i style={{ left: 118, top: 196, width: 94, height: 40, borderRadius: 12, background: "#E3ECFB" }} />
      {["#26AFED", "#F5A623", "#12B76A", "#7B5CFF"].map((c, i) => (
        <i key={c} style={{ left: 14, top: 254 + i * 52, width: 198, height: 42, borderRadius: 12, background: "#fff", border: "1px solid #e6ecf5" }}>
          <i style={{ left: 10, top: 9, width: 24, height: 24, borderRadius: "50%", background: c }} />
          <i style={{ left: 44, top: 15, width: 70 + i * 12, height: 10, background: "#d5deec" }} />
        </i>
      ))}
    </div>
  );
}

export default function BuildScene() {
  const ref = useRef(null);
  const box = useRef(null);
  const scaler = useRef(null);
  const r = useRef({});
  const steps = useRef([]);
  const shards = useRef([]);
  const set = (k) => (n) => {
    r.current[k] = n;
  };

  // Static mode: scale the 900x600 device group to the available width.
  useEffect(() => {
    const b = box.current;
    const s = scaler.current;
    if (!b || !s || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => {
      if (document.documentElement.classList.contains("hs-anim")) {
        s.style.transform = "";
        return;
      }
      s.style.transform = `scale(${Math.min(1, b.clientWidth / 900)})`;
    });
    ro.observe(b);
    return () => ro.disconnect();
  }, []);

  useScene(ref, {
    name: "build",
    length: 3.2,
    render(p, t, mode) {
      if (mode !== "anim") return;
      const R = r.current;
      const act = p < 0.36 ? 0 : p < 0.62 ? 1 : 2;
      steps.current.forEach((s, i) =>
        css(s, { opacity: i <= act ? 1 : 0.32, transform: `translateX(${i === act ? 8 : 0}px)` })
      );
      css(R.bar, { height: `${lerp(0, 100, seg(p, 0, 0.85))}%` });

      // Desktop uses stage coordinates; phones use the 900x620 device group (scaled in CSS)
      const mob = isMobile();
      const L = mob
        ? { dx: 80, dy0: -1100, dy1: 10, crane: -900, sx: 490, sy: 260, px0: -300, py0: 900, px1: 0, py1: 110, depY: 540, liveX: 790, liveY: -10 }
        : { dx: ax(930, 0.7), dy0: -640, dy1: 204, crane: -120, sx: ax(1300, 0.7), sy: 464, py0: 1000, py1: 354, depY: 764, liveY: 174 };
      if (!mob) {
        L.px0 = L.dx - 370;
        L.px1 = L.dx - 80;
        L.liveX = L.dx + 740;
      }
      const ex = seg(p, 0.06, 0.2);
      shards.current.forEach((s, i) => {
        const a = (i / 14) * Math.PI * 2;
        const d = eo(ex) * lerp(160, 320, ((i * 7) % 5) / 5);
        css(s, {
          left: `${L.sx - 13 + Math.cos(a) * d}px`,
          top: `${L.sy - 13 + Math.sin(a) * d}px`,
          opacity: ex > 0 ? 1 - seg(p, 0.15, 0.24) : 0,
          transform: `rotate(${ex * 300 + i * 20}deg) scale(${1 - ex * 0.4})`,
        });
      });

      const dx = L.dx;
      const dy = lerp(L.dy0, L.dy1, eo(seg(p, 0.13, 0.33)));
      const on = seg(p, 0.12, 0.14);
      css(R.dash, { left: `${dx}px`, top: `${dy}px`, opacity: on });
      const ret = seg(p, 0.34, 0.42);
      css(R.crane, {
        left: `${dx + 410}px`,
        top: `${L.crane}px`,
        height: `${Math.max(0, lerp(dy - L.crane, 0, eio(ret)))}px`,
        opacity: on * (1 - seg(p, 0.4, 0.43)),
      });
      const col = seg(p, 0.36, 0.5);
      css(R.col, { opacity: col });
      css(R.wire, { opacity: 1 - col * 0.9 });
      R.dash?.querySelectorAll(".hs-bar").forEach((b, i) => {
        b.dataset.hs = "1";
        b.style.height = `${+b.dataset.h * eo(seg(p, 0.42 + i * 0.008, 0.56 + i * 0.008))}px`;
      });

      const ph = eo(seg(p, 0.48, 0.62));
      css(R.phone, {
        left: `${lerp(L.px0, L.px1, ph)}px`,
        top: `${lerp(L.py0, L.py1, ph)}px`,
        transform: `rotate(${lerp(-14, -4, ph)}deg)`,
        opacity: seg(p, 0.48, 0.5),
      });

      const dk = eo(seg(p, 0.6, 0.66));
      css(R.deploy, { left: `${dx}px`, top: `${L.depY + (1 - dk) * 40}px`, opacity: dk });
      const pr = eio(seg(p, 0.64, 0.8));
      css(R.fill, { width: `${pr * 100}%` });
      if (R.pct) R.pct.textContent = `${Math.round(pr * 100)}%`;
      if (R.dtxt) R.dtxt.textContent = pr >= 1 ? "Deployed to production" : "Deploying to production";
      const lv = seg(p, 0.8, 0.86);
      css(R.live, {
        left: `${L.liveX}px`,
        top: `${L.liveY}px`,
        opacity: lv,
        transform: `scale(${lerp(0.4, 1, eo(lv)) + 0.06 * Math.sin(seg(lv * 3, 0, 1) * Math.PI)})`,
      });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-light hs-build" aria-label="How we build">
      <div className="hs-stage">
        <div className="hs-build-left">
          <div ref={set("eyebrow")} className="hs-eyebrow">HOW WE BUILD</div>
          <h2 className="hs-h2">
            From a single idea to a <em className="hs-grad">live product.</em>
          </h2>
          <div className="hs-steps">
            <div ref={set("bar")} className="hs-steps-bar" />
            {STEPS.map((s, i) => (
              <div key={s[0]} ref={(n) => (steps.current[i] = n)} className="hs-step">
                <small>{s[0]}</small>
                <div>{s[1]}</div>
                <p>{s[2]}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref={box} className="hs-build-devices">
          <div ref={scaler} className="hs-build-scaler">
            <div ref={set("crane")} className="hs-crane" aria-hidden="true" />
            <div ref={set("dash")} className="hs-dash">
              <div ref={set("wire")} className="hs-dash-layer hs-dash-layer-wire">
                <Dashboard wire />
              </div>
              <div ref={set("col")} className="hs-dash-layer">
                <Dashboard />
              </div>
            </div>
            <div ref={set("phone")} className="hs-phone">
              <Wallet />
            </div>
            <div ref={set("deploy")} className="hs-deploy">
              <span ref={set("dtxt")}>Deployed to production</span>
              <div className="hs-deploy-track">
                <i ref={set("fill")} />
              </div>
              <span ref={set("pct")}>100%</span>
            </div>
            <div ref={set("live")} className="hs-live">Live</div>
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i} ref={(n) => (shards.current[i] = n)} className="hs-shard" aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
