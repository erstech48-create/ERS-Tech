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

export const STAGE_W = 1920; // desktop design width
export const STAGE_H = 984; // desktop design height (viewport minus navbar)
const MAX_STAGE_W = 2500; // wider than this, the stage is centred again
// Phones (< 768px) use a portrait stage with their own layout
export const STAGE_W_M = 430;
export const STAGE_H_M = 860;
const MAX_STAGE_W_M = 560;
export const DESKTOP_MQ = "(min-width: 768px)";
// Higher = scroll animations follow the scrollbar more tightly.
const FOLLOW = 7;

/* ---------------- inline style helpers (tracked so they can be undone) ---------------- */
const kebab = (k) => k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
export function roundVal(k, v) {
  if (typeof v === "number") {
    if (k === "opacity") return Math.round(v * 1000) / 1000;
    if (k === "transform" || k.includes("scale")) return Math.round(v * 10000) / 10000;
    return Math.round(v * 10) / 10;
  }
  return v;
}
/** Set inline styles; only the properties set here are removed on teardown. */
export function css(node, styles) {
  if (!node) return;
  if (!node.__hsKeys) node.__hsKeys = new Set();
  if (!node.__hsLast) node.__hsLast = {};
  for (const k in styles) {
    let v = styles[k];
    if (typeof v === "number") v = roundVal(k, v);
    if (node.__hsLast[k] !== v) {
      node.__hsLast[k] = v;
      node.__hsKeys.add(k);
      node.style[k] = v;
    }
  }
  node.dataset.hs = "1";
}
/** Fade + slide helper: k = 0 hidden, 1 visible. */
export function rv(node, k, dy = 40, dx = 0, extra = "") {
  const op = Math.round(k * 1000) / 1000;
  const tx = Math.round(dx * (1 - k) * 10) / 10;
  const ty = Math.round(dy * (1 - k) * 10) / 10;
  css(node, {
    opacity: op,
    transform: `translate3d(${tx}px, ${ty}px, 0) ${extra}`.trim(),
  });
}
function clearNode(n) {
  if (n.__hsKeys) {
    n.__hsKeys.forEach((k) => n.style.removeProperty(kebab(k)));
    n.__hsKeys = null;
    n.__hsLast = null;
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
let metrics = { s: 1, sw: STAGE_W, dx: 0, ox: 0, oy: 0, W: 1920, H: 1080, nav: 82, mobile: false };
/** true when the portrait (phone/tablet) stage is active */
export const isMobile = () => metrics.mobile;
/** pick a value for desktop or mobile stage */
export const MV = (desktop, mobile) => (metrics.mobile ? mobile : desktop);
export const getMetrics = () => metrics;

function updateMetrics() {
  if (typeof window === "undefined") return;
  const W = window.innerWidth;
  let H = window.innerHeight;
  const mobile = W < 768;
  // On phones the address bar changes the height while scrolling; ignore that
  if (mobile && metrics.mobile && W === metrics.W && Math.abs(H - metrics.H) < 160) H = metrics.H;
  const navVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"));
  const navRaw = isNaN(navVar) ? 82 : navVar;
  let nav = clamp(navRaw, 56, 130);
  if (Math.abs(nav - metrics.nav) <= 2) {
    nav = metrics.nav;
  }
  if (!W || !H || H - nav < 120) {   // viewport not ready yet (DevTools / first frame)
    requestAnimationFrame(updateMetrics);
    return;                           // keep the previous metrics
  }
  const SW = mobile ? STAGE_W_M : STAGE_W;
  const SH = mobile ? STAGE_H_M : STAGE_H;
  const s = Math.max(0.05, Math.min(W / SW, (H - nav) / SH));
  const sw = clamp(W / s, SW, mobile ? MAX_STAGE_W_M : MAX_STAGE_W);
  const ox = (W - sw * s) / 2;
  const oy = nav + (H - nav - SH * s) / 2;
  metrics = { s, sw, dx: sw - SW, ox, oy, W, H, nav, mobile };
  document.documentElement.classList.toggle("hs-m", mobile);
  const r = document.documentElement.style;
  r.setProperty("--hs-scale", String(s));
  r.setProperty("--hs-ox", `${ox}px`);
  r.setProperty("--hs-oy", `${oy}px`);
  r.setProperty("--hs-sw", `${sw}px`);
  r.setProperty("--hs-dx", `${sw - SW}px`);
  r.setProperty("--hs-vh", `${H}px`);
}

let metricsBound = false;
function bindMetrics() {
  if (metricsBound || typeof window === "undefined") return;
  metricsBound = true;
  ScrollTrigger.config({ ignoreMobileResize: true });
  updateMetrics();
  let lastW = window.innerWidth, lastH = window.innerHeight, lastMobile = window.innerWidth < 768, rT;
  const onResize = () => {
    clearTimeout(rT);
    rT = setTimeout(() => {
      const W = window.innerWidth, H = window.innerHeight, mobile = W < 768;
      const breakpointChanged = mobile !== lastMobile;
      const sizeChanged = W !== lastW || Math.abs(H - lastH) > 30;

      if (breakpointChanged || sizeChanged) {
        lastMobile = mobile;
        lastW = W;
        lastH = H;
        updateMetrics();
        ScrollTrigger.refresh(true);
      }
    }, 100);
  };
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);
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
let isTabVisible = true;
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    isTabVisible = document.visibilityState === "visible";
  });
}
let lastScrollTime = 0;
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    lastScrollTime = performance.now();
  }, { passive: true });
}
export const isUserScrolling = () => (performance.now() - lastScrollTime) < 180;

function bindTicker() {
  if (tickerBound) return;
  tickerBound = true;
  gsap.ticker.add(() => {
    if (!isTabVisible) return;
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
  return r.st.start + p * r.len * metrics.H;
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

    // Animated mode on every screen size; re-runs when crossing the 768px breakpoint
    mm.add({ d: DESKTOP_MQ, m: "(max-width: 767px)" }, () => {
      if (reduced) return undefined;
      enterAnim();
      updateMetrics();
      const len = opts.length;
      const tail = opts.tail || 0;
      let target = 0;
      let shown = 0;
      const wrap = opts.wipeIn ? (el.closest(".hs-wipe-wrap") || el) : null;
      const lead = wrap ? wrap.querySelector(".hs-wipe-lead") : null;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => "+=" + metrics.H * (len + tail),
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = clamp((self.progress * (len + tail)) / len);
        },
        onRefresh: (self) => {
          target = clamp((self.progress * (len + tail)) / len);
          shown = target;
          opts.render(shown, performance.now() / 1000, "anim", el);
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
          trigger: wrap || el,
          start: "top bottom",
          end: "top top",
          invalidateOnRefresh: true,
          onUpdate: (self) => setClip(self.progress),
          onRefresh: (self) => {
            if (self.progress >= 1) setClip(1);
            else if (self.progress <= 0) setClip(0);
            else setClip(self.progress);
          },
          onLeave: () => setClip(1),
          onEnterBack: (self) => setClip(self.progress),
          onLeaveBack: () => setClip(0),
        });
      }

      let lastRendered = -999;
      let idleFrame = 0;
      const remove = addTicker((t, dt) => {
        const y = window.scrollY;
        const H = window.innerHeight;
        if (y < st.start - H * 1.05 || y > st.end + H * 1.05) {
          shown = target;
          return;
        }
        // ease the shown progress toward the scroll target (frame-rate independent)
        const follow = metrics.mobile ? 16 : 12;
        shown += (target - shown) * (1 - Math.exp(-dt * follow));
        if (Math.abs(target - shown) < 0.0005) shown = target;

        const isMoving = Math.abs(shown - lastRendered) >= 0.0001;
        if (!isMoving && !opts.live) {
          return;
        }

        lastRendered = shown;
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
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!reduced) return undefined;
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

export function radial(g, x0, y0, r0, x1, y1, r1) {
  return g.createRadialGradient(x0, y0, Math.max(0, r0), x1, y1, Math.max(0.01, r1));
}

/** Size a canvas to its CSS box (capped DPR) and return the 2D context + size. */
export function fitCanvas(cv) {
  if (!cv || cv.clientWidth < 2 || cv.clientHeight < 2) return null;
  const maxDpr = metrics.mobile ? 1 : 1.25;
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = cv.clientWidth;
  const h = cv.clientHeight;
  const pw = Math.round(w * dpr);
  const ph = Math.round(h * dpr);
  if (cv.width !== pw || cv.height !== ph) {
    cv.width = pw;
    cv.height = ph;
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
