import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScene, fitCanvas, radial, getMetrics, toView, ax, seg, eio, eo, lerp, rv, css } from "./engine";
import Aconomy from "@/../public/assets/projects/aconomy.webp";
import BCCOIN from "@/../public/assets/projects/bccoin.webp";
import ABot from "@/../public/assets/projects/a-bot.webp";

const NB = 22;
const PITCH = 300; // block 220 + bridge 80
const HL = {
  10: { name: "Aconomy", desc: "Crypto exchange, payments & debit cards", href: "/portfolio/aconomy", img: Aconomy, tag: "EXCHANGE" },
  12: { name: "BlackCardCoin", desc: "BCCOIN staking & personal crypto card", href: "/portfolio/bccoin", img: BCCOIN, tag: "STAKING" },
  14: { name: "A-Bot", desc: "AI crypto agent on Telegram with AML checks", href: "/portfolio/a-bot", img: ABot, tag: "AI AGENT" },
};
const TONES = ["blue", "cyan", "violet", "teal"];
const hash = (i) => `0x${((i * 2654435761) >>> 0).toString(16).padStart(8, "0").slice(0, 4)}…${((i * 40503 + 7) >>> 0).toString(16).slice(-4)}`;
const BARS = (i) => Array.from({ length: 9 }, (_, k) => 30 + (((i + 3) * (k + 5) * 37) % 70));

/* background: drifting constellation + upward data particles hugging the chain */
const NODES = Array.from({ length: 70 }, (_, i) => ({
  x: ((i * 9301 + 49297) % 233280) / 233280,
  y: ((i * 7919 + 12345) % 104729) / 104729,
  v: 0.2 + ((i * 31) % 100) / 300,
}));
const PARTS = Array.from({ length: 160 }, (_, i) => ({
  side: i % 2 ? 1 : -1,
  off: ((i * 37) % 100) / 100,
  y: ((i * 7919) % 1000) / 1000,
  v: 0.5 + ((i * 13) % 10) / 10,
  s: 1 + ((i * 17) % 10) / 6,
}));

let bgFrame = 0;
let cachedLines = [];

function drawBg(g, w, h, t, cx, spread, speed) {
  let gr = radial(g, cx, h * 0.5, 0, cx, h * 0.5, Math.max(w, h) * 0.75);
  gr.addColorStop(0, "#0b2c7a");
  gr.addColorStop(0.45, "#061844");
  gr.addColorStop(1, "#020818");
  g.fillStyle = gr;
  g.fillRect(0, 0, w, h);
  // soft colour glows
  [[0.15, 0.25, "rgba(110,75,255,0.18)"], [0.85, 0.75, "rgba(38,175,237,0.16)"]].forEach(([x, y, c], k) => {
    const px = w * x + Math.sin(t * 0.2 + k) * 60;
    const py = h * y + Math.cos(t * 0.17 + k) * 40;
    const r = Math.max(w, h) * 0.45;
    const gg = radial(g, px, py, 0, px, py, r);
    gg.addColorStop(0, c);
    gg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gg;
    g.fillRect(0, 0, w, h);
  });
  // constellation: limit to 40 nodes on phones, recompute pairs every 3rd frame
  const numNodes = getMetrics().mobile ? 40 : 70;
  const pts = NODES.slice(0, numNodes).map((n) => [
    ((n.x + t * 0.004 * n.v) % 1) * w,
    ((n.y + Math.sin(t * 0.1 + n.x * 6) * 0.01) % 1) * h,
  ]);
  bgFrame++;
  if (bgFrame % 3 === 0 || cachedLines.length === 0) {
    cachedLines = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const d = Math.hypot(dx, dy);
        if (d < 150) {
          cachedLines.push([pts[i][0], pts[i][1], pts[j][0], pts[j][1], 0.12 * (1 - d / 150)]);
        }
      }
    }
  }
  const lineBuckets = [new Path2D(), new Path2D(), new Path2D()];
  for (let l = 0; l < cachedLines.length; l++) {
    const line = cachedLines[l];
    const b = Math.min(2, Math.floor(line[4] / 0.04));
    lineBuckets[b].moveTo(line[0], line[1]);
    lineBuckets[b].lineTo(line[2], line[3]);
  }
  g.lineWidth = 1;
  const lineAlphas = [0.04, 0.08, 0.12];
  for (let b = 0; b < 3; b++) {
    g.strokeStyle = `rgba(120,180,255,${lineAlphas[b]})`;
    g.stroke(lineBuckets[b]);
  }
  g.fillStyle = "rgba(160,210,255,0.5)";
  pts.forEach(([x, y]) => g.fillRect(x - 1, y - 1, 2, 2));

  // data particles flowing up beside the chain (batched by alpha bucket, no per-particle gradients)
  const partBuckets = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
  for (let p = 0; p < PARTS.length; p++) {
    const q = PARTS[p];
    const x = cx + q.side * (spread * 0.35 + q.off * spread);
    const y = h - (((q.y * h + t * q.v * 90 * speed) % (h + 60)) - 30);
    const a = 0.25 + 0.6 * (1 - q.off);
    const bucket = Math.min(4, Math.max(0, Math.floor((a - 0.2) / 0.15)));
    partBuckets[bucket].rect(x - q.s / 2, y, q.s, 26 * q.s);
  }
  const partAlphas = [0.25, 0.4, 0.55, 0.7, 0.85];
  for (let b = 0; b < 5; b++) {
    g.fillStyle = `rgba(170,230,255,${partAlphas[b]})`;
    g.fill(partBuckets[b]);
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
    length: 3.2,
    tail: 1,
    ambient: true,
    live: true,
    render(p, t, mode) {
      const c = cv.current;
      if (!c) return;
      const fc = fitCanvas(c);
      if (!fc) return;
      const { g, w, h } = fc;
      if (mode !== "anim") {
        drawBg(g, w, h, t, w / 2, Math.min(w, 900) * 0.4, 0.8);
        return;
      }
      const m = getMetrics();
      const mob = m.mobile;
      const zk = eio(seg(p, 0, 0.55));
      const s = mob ? lerp(1.5, 0.42, zk) : lerp(2.2, 0.5, zk);
      // chain centre: desktop middle of the stage; phones slide it to the left edge for the callouts
      const CX = mob ? lerp(ax(215, 0.5), 80, zk) : ax(960, 0.5);
      const CY = mob ? 575 : 492;
      const endC = 12 * PITCH + 110;
      const cy = endC - 600 * (1 - eo(seg(p, 0, 0.72)));
      css(chain.current, { left: `${CX}px`, top: `${CY}px`, transform: `translate3d(0, ${-cy * s}px, 0) scale(${s})` });
      const [vcx] = toView(CX, 0);
      drawBg(g, w, h, t, vcx, (mob ? lerp(120, 90, zk) : lerp(260, 380, zk)) * m.s, 0.6 + s * 0.4);

      ["h1", "h2", "h3"].forEach((k, i) => rv(r.current[k], eo(seg(p, 0.3 + i * 0.06, 0.46 + i * 0.06)), 60));
      const headK = eo(seg(p, 0.28, 0.42));          // same timing as the first headline line
      const headEl = r.current.eyebrow?.parentElement; // the .hs-chain-head element
      if (headEl) headEl.style.setProperty("--hs-head-bg", m.mobile ? String(headK) : "1");
      rv(r.current.eyebrow, eo(seg(p, m.mobile ? 0.28 : 0.25, m.mobile ? 0.42 : 0.38)), 20);
      rv(r.current.sub, eo(seg(p, 0.5, 0.62)), 20);
      rv(r.current.stats, eo(seg(p, 0.56, 0.68)), 20);
      const hlOn = seg(p, 0.6, 0.7);
      blocks.current.forEach((b, i) => b && b.classList.toggle("hs-lit", !!HL[i] && hlOn > 0.5));
      Object.keys(HL).forEach((key) => {
        const i = +key;
        const k = eo(seg(p, 0.62 + (i - 10) * 0.01, 0.74 + (i - 10) * 0.01));
        const y = CY + (i * PITCH + 110 - cy) * s;
        const callY = y - (mob ? 44 : 70);
        css(calls.current[i], {
          top: "0px",
          opacity: k,
          transform: `translate3d(${(1 - k) * 60}px, ${callY}px, 0)`,
        });
        const x0 = CX + 110 * s + (mob ? 6 : 14);
        const x1 = mob ? 166 : ax(1250, 0.65);
        const maxW = Math.max(0, x1 - x0);
        css(lines.current[i], {
          left: `${x0}px`,
          top: "0px",
          width: `${maxW}px`,
          transformOrigin: "left",
          transform: `translate3d(0, ${y}px, 0) scaleX(${k})`,
        });
      });
    },
  });

  return (
    <section ref={ref} className="hs-scene hs-dark hs-chain-scene" aria-label="Blockchain and fintech">
      <canvas ref={cv} className="hs-canvas hs-chain-bg" aria-hidden="true" />
      <div className="hs-stage">
        <div ref={chain} className="hs-chain" aria-hidden="true">
          {Array.from({ length: NB }, (_, i) => {
            const hl = HL[i];
            return (
              <React.Fragment key={i}>
                <div
                  ref={(n) => (blocks.current[i] = n)}
                  className={`hs-blk hs-tone-${TONES[(i * 3) % 4]} ${hl ? "hs-blk-hl" : ""}`}
                  style={{ "--y": `${i * PITCH}px` }}
                >
                  <div className="hs-blk-depth" />
                  <div className="hs-blk-face">
                    <div className="hs-blk-head">
                      <b>#{1030 + i}</b>
                      <span className="hs-blk-ok">
                        <i />
                        {hl ? hl.tag : "VERIFIED"}
                      </span>
                    </div>
                    {hl ? (
                      <div className="hs-blk-name">{hl.name}</div>
                    ) : (
                      <div className="hs-blk-bars">
                        {BARS(i).map((v, k) => (
                          <i key={k} style={{ height: `${v}%` }} />
                        ))}
                      </div>
                    )}
                    <div className="hs-blk-hash">{hash(i)}</div>
                    <div className="hs-blk-foot">
                      <span>{120 + ((i * 53) % 280)} TX</span>
                      <span>0.{40 + ((i * 7) % 50)}s</span>
                    </div>
                  </div>
                </div>
                {i < NB - 1 && (
                  <div className="hs-bridge" style={{ "--y": `${i * PITCH + 220}px` }}>
                    <i />
                  </div>
                )}
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
            Exchanges, wallets, staking, crypto cards and AI agents, engineered secure by design.
          </p>
          <div ref={set("stats")} className="hs-chain-stats">
            <div>
              <b>Web3</b>
              <span>Smart contracts &amp; tokens</span>
            </div>
            <div>
              <b>KYC/AML</b>
              <span>Compliance built in</span>
            </div>
          </div>
        </div>
        <div className="hs-calls">
          {Object.entries(HL).map(([i, x]) => (
            <React.Fragment key={i}>
              <div ref={(n) => (lines.current[i] = n)} className="hs-cline" aria-hidden="true" />
              <Link href={x.href} ref={(n) => (calls.current[i] = n)} className="hs-call">
                <span className="hs-call-img">
                  <Image src={x.img} alt={`${x.name} preview`} fill sizes="160px" decoding="async" />
                </span>
                <span className="hs-call-txt">
                  <small>{x.tag}</small>
                  <span className="hs-call-name">{x.name}</span>
                  <span className="hs-call-desc">{x.desc}</span>
                </span>
                <span className="hs-call-go">→</span>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
