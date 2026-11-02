import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function SplitHeading({
  children,
  html,
  as: Component = "h2",
  className = "",
  stagger = 0.07,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
  triggerOnScroll = true,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const el = containerRef.current;
    const originalContent =
      html !== undefined
        ? html
        : typeof children === "string"
        ? children
        : el.innerHTML;

    if (!originalContent) return;

    const segments = String(originalContent).split(/(<br\s*\/?>)/gi);

    const newHTML = segments
      .map((seg) => {
        if (seg.match(/<br\s*\/?>/i)) return seg;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = seg;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        const words = text.trim().split(/\s+/);
        if (!words || words.length === 0 || (words.length === 1 && words[0] === "")) {
          return "";
        }
        return words
          .map(
            (word) =>
              `<span class="word-mask-wrapper" style="overflow:hidden; display:inline-block; vertical-align:top; margin-right:0.26em;"><span class="word-mask-inner" style="display:inline-block; will-change:transform,opacity;">${word}</span></span>`
          )
          .join("");
      })
      .join("");

    el.innerHTML = newHTML;

    const inners = el.querySelectorAll(".word-mask-inner");
    if (!inners.length) return;

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 110, opacity: 0 });

      if (triggerOnScroll) {
        gsap.to(inners, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
      } else {
        gsap.to(inners, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [html, children, stagger, duration, delay, start, triggerOnScroll]);

  if (html !== undefined) {
    return (
      <Component
        ref={containerRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning
        {...props}
      />
    );
  }

  return (
    <Component
      ref={containerRef}
      className={className}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </Component>
  );
}
