import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function PinnedScene({
  children,
  onSetupTimeline, // (timeline, context) => void
  end = "+=250%",
  scrub = 0.8,
  className = "",
  pinSpacing = true,
  ...props
}) {
  const triggerRef = useRef(null);
  const pinTargetRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !triggerRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop only >= 1024px
    mm.add("(min-width: 1024px)", (context) => {
      const pinElement = pinTargetRef.current || triggerRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: pinElement,
          start: "top top",
          end,
          scrub,
          pinSpacing,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (onSetupTimeline) {
        onSetupTimeline(tl, context);
      }
    });

    return () => mm.revert();
  }, [end, scrub, pinSpacing, onSetupTimeline]);

  return (
    <div ref={triggerRef} className={className} {...props}>
      <div ref={pinTargetRef} className="pinned-content-inner w-full">
        {children}
      </div>
    </div>
  );
}

