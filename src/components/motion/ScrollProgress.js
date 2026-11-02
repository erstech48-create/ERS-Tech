import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function ScrollProgress({
  color = "#26AFED",
  height = "3px",
  targetRef = null,
  className = "",
}) {
  const barRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !barRef.current) return;

    const bar = barRef.current;
    const triggerTarget = targetRef?.current || document.body;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: triggerTarget,
            start: targetRef ? "top top" : "top top",
            end: targetRef ? "bottom bottom" : "bottom bottom",
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [targetRef]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      className={className}
    >
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color,
          transformOrigin: "left center",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

