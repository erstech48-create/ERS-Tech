import React, { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Preloader from "./Preloader";
import TravelCube from "./Cube";
import HeroScene, { globeReady } from "./HeroScene";
import TrustScene from "./TrustScene";
import BuildScene from "./BuildScene";
import ServicesScene from "./ServicesScene";
import IndustriesScene from "./IndustriesScene";
import ChainScene from "./ChainScene";
import PortfolioScene from "./PortfolioScene";
import TestimonialsScene from "./TestimonialsScene";
import ValuesCtaScene from "./ValuesCtaScene";

/** The full home page scroll story (9 scenes + travelling cube). */
export default function ScrollStory() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 150);
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh);

    const root = document.documentElement;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      root.classList.add("hs-ready"); // NEVER remove this class anywhere
      root.classList.remove("hs-loading");
      ScrollTrigger.refresh();
      const r = parseFloat(sessionStorage.getItem("hs-scroll-ratio") || "");
      if (!isNaN(r)) {
        sessionStorage.removeItem("hs-scroll-ratio");
        window.scrollTo(0, r * document.documentElement.scrollHeight);
      }
      // after the last intro line has finished (.55s delay + .8s) - no end jump
      setTimeout(() => {
        root.classList.add("hs-entered");
      }, 1500);
    };

    if (root.classList.contains("hs-ready")) {
      root.classList.add("hs-entered");
      finish();
    } else {
      // Wait for the real Poppins files, not just document.fonts.ready: on a first
      // (uncached) production visit "ready" can resolve before the font request
      // starts, so the intro played in the fallback font and then visibly
      // re-drew when Poppins arrived (the hero text looked like it loaded twice).
      const fam = getComputedStyle(root).getPropertyValue("--font-poppins").trim();
      const fontsLoaded =
        fam && document.fonts?.load
          ? Promise.all(
              ["400", "500", "600", "700"].map((w) =>
                document.fonts.load(`${w} 40px ${fam}`, "Transform Your Ideas").catch(() => null)
              )
            ).then(() => document.fonts.ready)
          : document.fonts?.ready ?? Promise.resolve();
      Promise.race([
        Promise.all([fontsLoaded, globeReady, wait(600)]),
        wait(3000), // safety: never block longer than 3s
      ]).then(finish);
    }

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <div className="hs-root">
      <Preloader />
      <TravelCube />
      <HeroScene />
      <TrustScene />
      <BuildScene />
      <ServicesScene />
      <IndustriesScene />
      <ChainScene />
      <PortfolioScene />
      <TestimonialsScene />
      <ValuesCtaScene />
    </div>
  );
}
