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
      setTimeout(() => {
        root.classList.add("hs-entered");
      }, 1200);
    };

    if (root.classList.contains("hs-ready")) {
      root.classList.add("hs-entered");
      finish();
    } else {
      Promise.race([
        Promise.all([document.fonts?.ready ?? Promise.resolve(), globeReady, wait(600)]),
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
