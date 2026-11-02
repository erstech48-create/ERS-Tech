import React, { useEffect, useRef } from "react";
import { Box, ListItem, Typography, List } from "@mui/material";
import Meeting from "@/../public/assets/images/Meeting.png";
import desing from "@/../public/assets/images/desing.png";
import develop from "@/../public/assets/images/develop.png";
import test from "@/../public/assets/images/test.png";
import review from "@/../public/assets/images/review.png";
import live from "@/../public/assets/images/live.png";
import { isIphone } from "../utils/DetectDevice";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

const steps = [
  { img: Meeting, step: "step 1", title: "Discovery" },
  { img: desing, step: "step 2", title: "Design" },
  { img: develop, step: "step 3", title: "Develop" },
  { img: test, step: "step 4", title: "Test" },
  { img: review, step: "step 5", title: "Review" },
  { img: live, step: "step 6", title: "Launch" },
];

function HowWeDo() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop: Section-scoped scrub without pin (start 'top 70%', end 'bottom 45%', scrub .8)
    mm.add("(min-width: 1024px)", () => {
      const circles = rootRef.current.querySelectorAll(".how-circle-item");
      const connectorPaths = rootRef.current.querySelectorAll(".how-connector-path");
      const progressFill = rootRef.current.querySelector(".how-progress-fill");
      const labels = rootRef.current.querySelectorAll(".how-label-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          end: "bottom 45%",
          scrub: 0.8,
        },
      });

      // Fill progress bar from left to right
      if (progressFill) {
        tl.fromTo(
          progressFill,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, ease: "none", duration: 1 },
          0
        );
      }

      // Draw connector wave paths
      if (connectorPaths.length) {
        tl.fromTo(
          connectorPaths,
          { strokeDashoffset: 300 },
          { strokeDashoffset: 0, ease: "none", stagger: 0.15, duration: 0.9 },
          0
        );
      }

      // Activate circles in sequence: scale .85->1, gradient ring opacity
      circles.forEach((circle, i) => {
        tl.fromTo(
          circle,
          { scale: 0.85, opacity: 0.4 },
          { scale: 1, opacity: 1, ease: "power2.out", duration: 0.2 },
          i * 0.16
        );
      });

      // Labels fade up
      if (labels.length) {
        tl.fromTo(
          labels,
          { opacity: 0.3, y: 10 },
          { opacity: 1, y: 0, ease: "power2.out", stagger: 0.14, duration: 0.3 },
          0.1
        );
      }
    });

    // Mobile / Tablet (< 1024px): Simple staggered reveal
    mm.add("(max-width: 1023px)", () => {
      const items = rootRef.current.querySelectorAll(".how-step-col");
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <Box
        ref={rootRef}
        className="xl:!container lg:!container md:!container sm:max-w-full xsm:max-w-full xxs:max-w-full xxxs:max-w-full relative !mb-[5rem] overflow-hidden"
      >
        <Box className="block text-center py-6">
          <Reveal direction="up" distance={25}>
            <Typography
              className="capitalize !text-3xl !font-[600] font-poppins !leading-[140%] !tracking-[-0.16px] text-center"
              variant="h2"
              component={"h2"}
              gutterBottom
            >
              How We <span className="text-ersPrimary">Work</span>
            </Typography>
          </Reveal>
        </Box>

        <Box className="w-[90%] max-w-[1200px] mx-auto mt-5 pt-5 relative how-we-do-box">
          {/* Connector Paths Layer (Desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[60px] right-[60px] h-[40px] pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 40" fill="none">
              <path
                className="how-connector-path"
                d="M 60 20 Q 250 -10 500 20 T 940 20"
                stroke="url(#howWeDoGrad)"
                strokeWidth="2.5"
                strokeDasharray="300"
                strokeDashoffset="0"
              />
              <defs>
                <linearGradient id="howWeDoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#28B8EF" />
                  <stop offset="100%" stopColor="#115BD0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 6 Circles Row */}
          <List className="flex items-center justify-between relative w-full z-[1]">
            {steps.map((st, i) => (
              <ListItem key={i} className="!justify-center how-step-col !p-0">
                <Box className="how-circle-item bg-[#F6F6F4] w-[110px] h-[110px] xl:w-[120px] xl:h-[120px] flex justify-center items-center rounded-full transition-transform duration-300">
                  <Box className="bg-gradient-to-r from-[#28B8EF] to-[#115BD0] w-[90px] h-[90px] xl:w-[100px] xl:h-[100px] flex justify-center items-center rounded-full shadow-md">
                    <Image src={st.img} className="w-[50px] object-cover" alt={st.title} />
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>

          {/* Step Pill Bar with Fill Animation */}
          <div className="relative w-full !mt-[1.2rem] rounded-full overflow-hidden bg-gray-200 h-[36px] flex items-center">
            {/* The animated fill element */}
            <div
              className="how-progress-fill absolute inset-0 bg-gradient-to-r from-[#4CADEA] to-[#115AD0] rounded-full z-0"
              style={{ transformOrigin: "left center" }}
            />
            <div className="relative z-10 w-full grid grid-cols-6 text-center">
              {steps.map((st, i) => (
                <div key={i} className="flex justify-center items-center">
                  <Typography
                    variant="overline"
                    className="capitalize !text-xs xl:!text-sm !font-[600] font-poppins text-white"
                  >
                    {st.step}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* Labels Row */}
          <div className="w-full grid grid-cols-6 text-center !mt-[1rem]">
            {steps.map((st, i) => (
              <div key={i} className="how-label-item flex flex-col items-center">
                <Typography
                  variant="h6"
                  component="h3"
                  className={
                    isIphone()
                      ? "!text-xs xl:!text-sm !font-[500] font-poppins uppercase text-gray-800"
                      : "!text-sm xl:!text-base !font-[500] font-poppins uppercase text-gray-800"
                  }
                >
                  {st.title}
                </Typography>
                <span className="gradient-b-border mt-1"></span>
              </div>
            ))}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default HowWeDo;
