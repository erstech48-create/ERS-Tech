// Shared engine for the home page scroll story.
// Each scene is a 100vh section that gets pinned on desktop and driven by a
// render(p, t, mode) function, where p = eased scroll progress (0..1) of the pin.
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (p, a, b) => clamp((p - a) / (b - a));
export const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eo = (x) => 1 - Math.pow(1 - x, 3);
export const lerp = (a, b, t) => a + (b - a) * t;

export const STAGE_W = 1920; // design width
export const STAGE_H = 984; // design height (viewport minus navbar)
const MAX_STAGE_W = 2500; // wider than this, the stage is centred again
export const DESKTOP_MQ = "(min-width: 1024px)";
// Higher = scroll animations follow the scrollbar more tightly.
const FOLLOW = 7;

/* ---------------- inline style helpers (tracked so they can be undone) ---------------- */
const kebab = (k) => k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
/** Set inline styles; only the properties set here are removed on teardown. */
export function css(node, styles) {
  if (!node) return;
  if (!node.__hsKeys) node.__hsKeys = new Set();
  Object.keys(styles).forEach((k) => {
    node.__hsKeys.add(k);
    node.style[k] = styles[k];
  });
  node.dataset.hs = "1";
}
/** Fade + slide helper: k = 0 hidden, 1 visible. */
export function rv(node, k, dy = 40, dx = 0, extra = "") {
  css(node, {
    opacity: k,
    transform: `translate(${dx * (1 - k)}px, ${dy * (1 - k)}px) ${extra}`,
  });
}
function clearNode(n) {
  if (n.__hsKeys) {
    n.__hsKeys.forEach((k) => n.style.removeProperty(kebab(k)));
    n.__hsKeys = null;
  }
  delete n.dataset.hs;
}
function clearMarked(root) {
  root.querySelectorAll("[data-hs]").forEach(clearNode);
  if (root.dataset.hs) clearNode(root);
}

/* ---------------- stage metrics ---------------- */
// s  = scale, sw = stage width in design px (>= 1920 on wide screens),
// dx = sw - 1920 (extra width), ox/oy = stage offset in the viewport.
let metrics = { s: 1, sw: STAGE_W, dx: 0, ox: 0, oy: 0, W: 1920, H: 1080, nav: 88 };
export const getMetrics = () => metrics;

function updateMetrics() {
  if (typeof window === "undefined") return;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const navVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"));
  const nav = clamp(isNaN(navVar) ? 88 : navVar, 56, 130);
  const s = Math.min(W / STAGE_W, (H - nav) / STAGE_H);
  const sw = clamp(W / s, STAGE_W, MAX_STAGE_W);
  const ox = (W - sw * s) / 2;
  const oy = nav + (H - nav - STAGE_H * s) / 2;
  metrics = { s, sw, dx: sw - STAGE_W, ox, oy, W, H, nav };
  const r = document.documentElement.style;
  r.setProperty("--hs-scale", String(s));
  r.setProperty("--hs-ox", `${ox}px`);
  r.setProperty("--hs-oy", `${oy}px`);
  r.setProperty("--hs-sw", `${sw}px`);
  r.setProperty("--hs-dx", `${sw - STAGE_W}px`);
}

let metricsBound = false;
function bindMetrics() {
  if (metricsBound || typeof window === "undefined") return;
  metricsBound = true;
  updateMetrics();
  window.addEventListener("resize", updateMetrics);
  ScrollTrigger.addEventListener("refreshInit", updateMetrics);
}

/** x in design px anchored left (f=0), centre (f=0.5) or right (f=1). */
export const ax = (x, f = 0) => x + metrics.dx * f;

/* ---------------- animated-mode flag on <html> ---------------- */
let animUsers = 0;
function enterAnim() {
  animUsers += 1;
  document.documentElement.classList.add("hs-anim");
}
function leaveAnim() {
  animUsers = Math.max(0, animUsers - 1);
  if (animUsers === 0) document.documentElement.classList.remove("hs-anim");
}

/* ---------------- registry + shared ticker ---------------- */
export const registry = {}; // name -> { st, len }
const tickers = new Set();
let tickerBound = false;
const T0 = typeof performance !== "undefined" ? performance.now() : 0;
let lastT = 0;
function bindTicker() {
  if (tickerBound) return;
  tickerBound = true;
  gsap.ticker.add(() => {
    const t = (performance.now() - T0) / 1000;
    const dt = Math.min(0.1, Math.max(0, t - lastT));
    lastT = t;
    tickers.forEach((fn) => fn(t, dt));
  });
}
export function addTicker(fn) {
  bindTicker();
  tickers.add(fn);
  return () => tickers.delete(fn);
}

/** Absolute scroll position for a scene's animation progress p. */
export function scenePos(name, p) {
  const r = registry[name];
  if (!r) return null;
  return r.st.start + p * r.len * window.innerHeight;
}

/**
 * useScene(ref, {
 *   name, length,          // pinned scroll distance, in viewport heights
 *   tail,                  // extra pinned vh after the animation (next scene wipes over it)
 *   render(p, t, mode, el) // mode: "anim" (desktop pinned) | "static" (mobile / reduced motion)
 *   ambient,               // also tick render in static mode (for canvases)
 *   staticP,               // progress used in static mode (default 1)
 *   wipeIn,                // this scene enters with a curved clip-path wipe
 * })
 */
export function useScene(ref, opts) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    bindMetrics();
    const reduced = prefersReducedMotion();
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MQ, () => {
      if (reduced) return undefined;
      enterAnim();
      updateMetrics();
      const len = opts.length;
      const tail = opts.tail || 0;
      let target = 0;
      let shown = 0;
      const lead = opts.wipeIn ? el.parentElement?.querySelector(":scope > .hs-wipe-lead") : null;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => "+=" + window.innerHeight * (len + tail),
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = clamp((self.progress * (len + tail)) / len);
        },
        onRefresh: (self) => {
          target = clamp((self.progress * (len + tail)) / len);
          shown = target;
        },
      });
      registry[opts.name] = { st, len };

      let wipe = null;
      if (opts.wipeIn) {
        const setClip = (q) => {
          const a = eio(clamp(q * 1.15));
          const b = eio(clamp(q * 1.15 - 0.15));
          const shape = (k) => (k >= 1 ? "none" : `ellipse(${k * 110}% ${k * 160}% at 50% 125%)`);
          if (lead) css(lead, { clipPath: shape(a), opacity: q > 0 && q < 1 ? 1 : 0 });
          css(el, { clipPath: shape(b) });
        };
        setClip(0);
        wipe = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => setClip(self.progress),
          onLeave: () => setClip(1),
          onEnterBack: (self) => setClip(self.progress),
          onLeaveBack: () => setClip(0),
        });
      }

      const remove = addTicker((t, dt) => {
        const y = window.scrollY;
        const H = window.innerHeight;
        if (y < st.start - H * 1.05 || y > st.end + H * 1.05) {
          shown = target;
          return;
        }
        // ease the shown progress toward the scroll target (frame-rate independent)
        shown += (target - shown) * (1 - Math.exp(-dt * FOLLOW));
        if (Math.abs(target - shown) < 0.0005) shown = target;
        opts.render(shown, t, "anim", el);
      });
      opts.render(0, 0, "anim", el);

      return () => {
        remove();
        st.kill();
        wipe?.kill();
        delete registry[opts.name];
        clearMarked(el);
        if (lead) clearMarked(lead);
        leaveAnim();
      };
    });

    // Static mode: mobile, or desktop with reduced motion.
    mm.add(`(max-width: 1023px), (prefers-reduced-motion: reduce)`, () => {
      if (!reduced && window.matchMedia(DESKTOP_MQ).matches) return undefined;
      const sp = opts.staticP ?? 1;
      opts.render(sp, 0, "static", el);
      let remove = null;
      if (opts.ambient && !reduced) {
        remove = addTicker((t) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          opts.render(sp, t, "static", el);
        });
      }
      return () => {
        remove?.();
        clearMarked(el);
      };
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Size a canvas to its CSS box (capped DPR) and return the 2D context + size. */
export function fitCanvas(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const w = cv.clientWidth;
  const h = cv.clientHeight;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
  }
  const g = cv.getContext("2d");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { g, w, h };
}

/** Convert stage coordinates to viewport pixels (anim mode). */
export function toView(x, y) {
  const m = metrics;
  return [m.ox + x * m.s, m.oy + y * m.s];
}
