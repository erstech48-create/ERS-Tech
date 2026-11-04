import React, { useRef } from "react";
import Link from "next/link";
import { useScene, fitCanvas, getMetrics, toView, seg, eio, eo, lerp, rv, css } from "./engine";

const NB = 26;
const PITCH = 250;
const HL = {
  9: ["ACONOMY", "Exchange, payments & debit cards", "/portfolio/aconomy"],
  12: ["BLACKCARDCOIN", "BCCOIN staking & crypto card", "/portfolio/bccoin"],
  15: ["A-BOT", "AI crypto agent on Telegram", "/portfolio/a-bot"],
};
const COLS = [["#2e66f6", "#0d3aa8"], ["#26AFED", "#1272c9"], ["#5B4BFF", "#2a1fa8"], ["#13C2C2", "#0b6e8f"], ["#2e66f6", "#26AFED"]];
const hash = (i) => `0x${((i * 2654435761) >>> 0).toString(16).slice(0, 4)}…${((i * 40503) >>> 0).toString(16).slice(0, 3)}`;
const SP = Array.from({ length: 520 }, (_, i) => ({
  x: ((i * 9301 + 49297) % 233280) / 233280,
  y: ((i * 7919 + 12345) % 104729) / 104729,
  v: 0.4 + ((i * 31) % 100) / 100,
  w: ((i * 17) % 100) / 100,
}));

function drawSea(g, w, h, t, cx, spread, speed) {
  const gr = g.createRadialGradient(cx, h / 2, 0, cx, h / 2, Math.max(w, h) * 0.7);
  gr.addColorStop(0, "#0a2a78");
  gr.addColorStop(1, "#020a24");
  g.fillStyle = gr;
  g.fillRect(0, 0, w, h);
  for (const q of SP) {
    const side = q.w < 0.5 ? -1 : 1;
    const off = Math.pow(q.x, 2.2) * spread * 2.2 + spread * 0.25;
    const x = cx + side * off + Math.sin(q.y * 20 + t) * 12;
    const y = ((q.y * h + t * q.v * 260 * speed) % (h + 80)) - 40;
    g.strokeStyle = `rgba(150,210,255,${0.08 + 0.45 * (1 - q.x)})`;
    g.lineWidth = 1 + q.w * 1.5;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + side * 4, y - 20 - q.v * 30);
    g.stroke();
  }
}

export default function ChainScene() {
  const ref = useRef(null);
  const cv = useRef(null);
  const chain = useRef(null);
  const blocks = useRef([]);
  const r = useRef({});
  const calls = useRef({});
  const lines = useRef({});
  const set = (k) => (n) => {
    r.current[k] = n;
  };

  useScene(ref, {
    name: "chain",
    length: 2.4,
    tail: 1,
    ambient: true,
    render(p, t, mode) {
      const c = cv.current;
      if (!c) return;
      const { g, w, h } = fitCanvas(c);
      if (mode !== "anim") {
        drawSea(g, w, h, t, w / 2, Math.min(w, 900) * 0.25, 0.7);
        return;
      }
      const m = getMetrics();
      const s = lerp(2.5, 0.5, eio(seg(p, 0, 0.55)));
      const endC = 12 * PITCH + 90;
      const cy = endC - 520 * (1 - eo(seg(p, 0, 0.72)));
      css(chain.current, { transform: `scale(${s}) translateY(${-cy}px)` });
      const [vcx] = toView(960, 0);
      drawSea(g, w, h, t, vcx, lerp(140, 520, eio(seg(p, 0, 0.55))) * m.s, 0.6 + s * 0.4);

      ["h1", "h2", "h3"].forEach((k, i) => rv(r.current[k], eo(seg(p, 0.3 + i * 0.06, 0.46 + i * 0.06)), 60));
      rv(r.current.eyebrow, eo(seg(p, 0.25, 0.38)), 20);
      rv(r.current.sub, eo(seg(p, 0.5, 0.62)), 20);
      blocks.current.forEach((b, i) => {
        if (!b) return;
        const on = HL[i] && p > 0.62;
        css(b, { boxShadow: on ? `0 0 ${60 * seg(p, 0.62, 0.7)}px rgba(38,175,237,.9)` : "none" });
      });
      Object.keys(HL).forEach((key) => {
        const i = +key;
        const k = eo(seg(p, 0.62 + (i - 9) * 0.015, 0.74 + (i - 9) * 0.015));
        const y = 492 + (i * PITCH + 90 - cy) * s;
        css(calls.current[i], { top: `${y - 62}px`, opacity: k, transform: `translateX(${(1 - k) * 60}px)` });
        const x0 = 960 + 90 * s + 12;
        css(lines.current[i], { left: `${x0}px`, top: `${y}px`, width: `${Math.max(0, (1260 - x0) * k)}px` });
      });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-dark hs-chain-scene" aria-label="Blockchain and fintech">
      <canvas ref={cv} className="hs-canvas hs-chain-bg" aria-hidden="true" />
      <div className="hs-stage">
        <div ref={chain} className="hs-chain" aria-hidden="true">
          {Array.from({ length: NB }, (_, i) => {
            const c = COLS[(i * 3) % 5];
            return (
              <React.Fragment key={i}>
                <div
                  ref={(n) => (blocks.current[i] = n)}
                  className={`hs-blk ${HL[i] ? "hs-blk-hl" : ""}`}
                  style={{ top: i * PITCH, background: `linear-gradient(135deg,${c[0]},${c[1]})` }}
                >
                  <b>BLOCK {1030 + i}</b>
                  <span>{hash(i)}</span>
                </div>
                {i < NB - 1 && <div className="hs-lnk" style={{ top: i * PITCH + 170 }} />}
              </React.Fragment>
            );
          })}
        </div>
        <div className="hs-chain-head">
          <div ref={set("eyebrow")} className="hs-eyebrow">BLOCKCHAIN &amp; FINTECH</div>
          <h2 className="hs-chain-h2">
            <span ref={set("h1")}>Fintech</span> <span ref={set("h2")}>that works</span>{" "}
            <span ref={set("h3")}>
              <em className="hs-grad">as hard as you.</em>
            </span>
          </h2>
          <p ref={set("sub")} className="hs-chain-sub">
            Exchanges, wallets, staking, crypto cards and AI agents, built secure by design.
          </p>
        </div>
        <div className="hs-calls">
          {Object.entries(HL).map(([i, [n, d, href]]) => (
            <React.Fragment key={i}>
              <div ref={(x) => (lines.current[i] = x)} className="hs-cline" aria-hidden="true" />
              <Link href={href} ref={(x) => (calls.current[i] = x)} className="hs-call">
                <small>PROJECT</small>
                <div>{n}</div>
                <p>{d}</p>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
