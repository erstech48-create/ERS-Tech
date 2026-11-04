import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Reveal({
  children,
  direction = "up", // 'up' | 'left' | 'right' | 'fade'
  distance,
  duration = 0.8,
  delay = 0,
  className = "",
  start = "top 82%",
  once = true,
  as: Component = "div",
  ...props
}) {
  const elRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !elRef.current) return;

    const el = elRef.current;
    const isMobile = window.innerWidth < 768;
    const defaultDistance = distance !== undefined ? distance : isMobile ? 24 : 40;

    let initialX = 0;
    let initialY = 0;

    if (direction === "up") initialY = defaultDistance;
    else if (direction === "down") initialY = -defaultDistance;
    else if (direction === "left") initialX = defaultDistance;
    else if (direction === "right") initialX = -defaultDistance;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          x: initialX,
          y: initialY,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, start, once]);

  return (
    <Component ref={elRef} className={`motion-init-hidden ${className}`} {...props}>
      {children}
    </Component>
  );
}

