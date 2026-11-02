import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function Stagger({
  children,
  selector = ":scope > *",
  duration = 0.8,
  stagger = 0.08,
  y = 40,
  start = "top 85%",
  className = "",
  as: Component = "div",
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      let items = [];
      const trimmed = (selector || "").trim();

      try {
        if (trimmed.startsWith(">")) {
          items = containerRef.current.querySelectorAll(`:scope ${trimmed}`);
        } else if (trimmed) {
          items = containerRef.current.querySelectorAll(trimmed);
        } else {
          items = Array.from(containerRef.current.children);
        }
      } catch (err) {
        items = Array.from(containerRef.current.children);
      }

      if (!items || items.length === 0) return;

      gsap.set(items, { opacity: 0, y });

      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, duration, stagger, y, start]);

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
}
