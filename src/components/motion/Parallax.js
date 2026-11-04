import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Parallax({
  children,
  speed = 0.2, // 0.2 means moves ~20% of scroll
  yOffset = 40, // max pixel displacement
  className = "",
  as: Component = "div",
  ...props
}) {
  const elRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !elRef.current) return;

    const el = elRef.current;
    const distance = yOffset || speed * 150;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [speed, yOffset]);

  return (
    <Component ref={elRef} className={className} {...props}>
      {children}
    </Component>
  );
}

