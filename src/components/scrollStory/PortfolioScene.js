import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScene, ax, isMobile, seg, eio, lerp, rv, css } from "./engine";
import Aconomy from "@/../public/assets/projects/aconomy.webp";
import BCCOIN from "@/../public/assets/projects/bccoin.webp";
import Focusmonk from "@/../public/assets/projects/focusmonk.webp";
import Salharo from "@/../public/assets/projects/salharo.webp";
import Wise1HRM from "@/../public/assets/projects/wise1hrm.webp";
import ABot from "@/../public/assets/projects/a-bot.webp";

const PROJECTS = [
  { name: "Aconomy", img: Aconomy, desc: "Crypto trading, exchange, debit cards & payments.", tags: ["Blockchain", "Exchange", "Cards"], slug: "aconomy", url: "https://aconomy.com/" },
  { name: "BlackCardCoin", img: BCCOIN, desc: "Buy BCCOIN, earn staking rewards, get a crypto card.", tags: ["Crypto", "Staking"], slug: "bccoin", url: "https://blackcardcoin.com/" },
  { name: "FocusMonk", img: Focusmonk, desc: "AI-driven productivity with performance-based rewards.", tags: ["AI", "Productivity"], slug: "focusmonk", url: "https://focusmonk.io" },
  { name: "Salharo", img: Salharo, desc: "US e-commerce platform with Stripe & PayPal.", tags: ["E-commerce", "Payments"], slug: "salharo", url: "https://salharo.com/" },
  { name: "Wise1HRM", img: Wise1HRM, desc: "Full-featured HR management system.", tags: ["SaaS", "HRM"], slug: "wise1ne", url: "https://app.wise1ne.com" },
  { name: "A-Bot", img: ABot, desc: "AI crypto agent on Telegram with AML checks.", tags: ["AI", "Crypto", "Telegram"], slug: "a-bot", url: "https://t.me/vymopay_bot" },
];
const CARD = 640;
const GAP = 48;

export default function PortfolioScene() {
  const ref = useRef(null);
  const head = useRef(null);
  const track = useRef(null);
  const cards = useRef([]);
  const cnt = useRef(null);
  const ln = useRef(null);

  useScene(ref, {
    name: "portfolio",
    length: 3.4,
    wipeIn: true,
    render(p, t, mode) {
      if (mode !== "anim") return;
      rv(head.current, 1, 0);
      const k = eio(seg(p, 0.06, 0.88));
      const mob = isMobile();
      const cw = mob ? 340 : CARD;
      const gp = mob ? 18 : GAP;
      const total = PROJECTS.length * (cw + gp) - gp;
      const x = mob ? lerp(24, ax(406, 1) - total, k) : lerp(140, ax(1780, 1) - total, k);
      css(track.current, { transform: `translateX(${x}px)` });
      css(ln.current, { width: `${16.6 + k * 83.4}%` });
      if (cnt.current) cnt.current.textContent = `0${1 + Math.min(5, Math.floor(k * 6))}`;
      cards.current.forEach((c, i) => {
        const cx = x + i * (cw + gp) + cw / 2;
        const d = Math.min(Math.abs(cx - ax(mob ? 215 : 960, 0.5)) / (mob ? 400 : 1200), 1);
        css(c, { transform: `translateY(${d * (mob ? 16 : 30)}px)` });
      });
    },
  });

  return (
    <div className="hs-wipe-wrap">
      <div className="hs-wipe-lead" aria-hidden="true" />
      <section ref={ref} className="hs-scene hs-light hs-portfolio" aria-label="Our latest projects">
        <div className="hs-stage">
          <div ref={head} className="hs-pf-head">
            <div>
              <div className="hs-eyebrow">OUR LATEST PROJECTS</div>
              <h2 className="hs-h2">
                Shipped. Live. <em className="hs-grad">Scaling.</em>
              </h2>
            </div>
            <div className="hs-pf-cnt">
              <span ref={cnt}>01</span>
              <div className="hs-pf-ln">
                <i ref={ln} />
              </div>
              <span>06</span>
              <Link href="/portfolio" className="hs-pf-all">View all →</Link>
            </div>
          </div>
          <div ref={track} className="hs-pf-track">
            {PROJECTS.map((pr, i) => (
              <article key={pr.slug} ref={(n) => (cards.current[i] = n)} className="hs-pc">
                <Link href={`/portfolio/${pr.slug}`} className="hs-pc-top">
                  <Image src={pr.img} alt={`${pr.name} project mockup`} fill sizes="(min-width:1024px) 640px, 85vw" />
                </Link>
                <div className="hs-pc-body">
                  <h3>
                    <Link href={`/portfolio/${pr.slug}`}>{pr.name}</Link>
                    <a href={pr.url} target="_blank" rel="noopener noreferrer">
                      View Project →
                    </a>
                  </h3>
                  <p>{pr.desc}</p>
                  <div className="hs-tags">
                    {pr.tags.map((tg) => (
                      <span key={tg}>{tg}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
