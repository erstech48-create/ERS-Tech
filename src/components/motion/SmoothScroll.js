import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const LenisContext = createContext({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
  const router = useRouter();
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Add js-motion class to html to activate initial hidden states cleanly
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("js-motion");
    }

    if (prefersReducedMotion()) {
      return () => {
        document.documentElement.classList.remove("js-motion");
      };
    }

    // Calmer, more controlled scrolling: smaller distance per wheel/touchpad
    // tick and a softer catch-up so pinned scenes never "jump".
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.7,
      touchMultiplier: 1,
      syncTouch: false,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);

    const handleRouteChangeStart = () => {
      // Pause or prepare for transition
    };

    const handleRouteChangeComplete = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("js-motion");
    };
  }, [router.events]);

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof window !== "undefined") {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset + (options.offset || 0);
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

