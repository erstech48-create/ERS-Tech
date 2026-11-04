import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function CountUp({
  value, // string or number, e.g. "600+", "97%", "50+", "10"
  duration = 1.6,
  start = "top 65%",
  className = "",
  as: Component = "span",
  ...props
}) {
  const spanRef = useRef(null);
  const rawString = String(value);

  useEffect(() => {
    if (prefersReducedMotion() || !spanRef.current) return;

    const el = spanRef.current;
    // Match optional prefix, numeric part (with optional decimal), and suffix
    const match = rawString.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      // Non-numeric string, just do fade-in
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");
    const decimalPlaces = isDecimal ? match[2].split(".")[1].length : 0;

    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      // Set to 0 at start of animation
      el.textContent = `${prefix}0${suffix}`;

      gsap.to(counter, {
        val: targetNum,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
        onUpdate: () => {
          const currentVal = isDecimal
            ? counter.val.toFixed(decimalPlaces)
            : Math.floor(counter.val);
          el.textContent = `${prefix}${currentVal}${suffix}`;
        },
        onComplete: () => {
          el.textContent = rawString;
        },
      });
    }, spanRef);

    return () => ctx.revert();
  }, [rawString, duration, start]);

  return (
    <Component ref={spanRef} className={className} {...props}>
      {rawString}
    </Component>
  );
}

