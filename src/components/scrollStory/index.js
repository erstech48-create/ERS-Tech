import React, { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import TravelCube from "./Cube";
import HeroScene from "./HeroScene";
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
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <div className="hs-root">
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
