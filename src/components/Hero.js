import React, { useEffect, useRef } from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import Link from "next/link";
import ROneImg from "@/../public/assets/images/hero-graphic.webp";
import RTwoImg from "@/../public/assets/images/hero-graphic-two.webp";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

function Hero() {
  const rootRef = useRef(null);
  const mainLineRef = useRef(null);
  const glyphsRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // 1) Top badge & View Our Work button fade + scale
      gsap.fromTo(
        ".hero-badge-pill",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0 }
      );

      gsap.fromTo(
        ".hero-action-btn",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );

      // 2) H1 words mask-reveal
      if (mainLineRef.current) {
        const text = mainLineRef.current.innerText || "";
        const words = text.trim().split(/\s+/);
        mainLineRef.current.innerHTML = words
          .map(
            (w) =>
              `<span class="word-mask-wrapper"><span class="word-mask-inner">${w}</span></span>`
          )
          .join(" ");

        const wordElements = mainLineRef.current.querySelectorAll(".word-mask-inner");
        gsap.fromTo(
          wordElements,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      // 3) Subline & overline fade-up
      gsap.fromTo(
        [".hero-subline", ".hero-overline"],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // 4) Right side visuals slide in x:60->0 preserving CSS transform percentages
      const rOne = rootRef.current.querySelector(".right-one-visual");
      const rTwo = rootRef.current.querySelector(".right-two-visual");
      const border = rootRef.current.querySelector(".backward-border");

      if (rOne) {
        gsap.fromTo(
          rOne,
          { opacity: 0, x: 60, yPercent: -50 },
          {
            opacity: 1,
            x: 0,
            yPercent: -50,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      if (rTwo) {
        gsap.fromTo(
          rTwo,
          { opacity: 0, x: 60, xPercent: -50, yPercent: -50 },
          {
            opacity: 1,
            x: 0,
            xPercent: -50,
            yPercent: -50,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.45,
          }
        );
      }

      // 5) Border draw-in from corner
      if (border) {
        gsap.fromTo(
          border,
          { opacity: 0, scale: 0, yPercent: -50, transformOrigin: "top left" },
          {
            opacity: 1,
            scale: 1,
            yPercent: -50,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }

      // 6) Idle float on the inner image elements (isolated from card coordinate positioning)
      const imgOne = rOne?.querySelector("img");
      const imgTwo = rTwo?.querySelector("img");
      if (imgOne && imgTwo) {
        const floatOne = gsap.to(imgOne, {
          y: -6,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.1,
        });
        const floatTwo = gsap.to(imgTwo, {
          y: 6,
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.2,
        });

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            floatOne.resume();
            floatTwo.resume();
          },
          onLeave: () => {
            floatOne.pause();
            floatTwo.pause();
          },
          onEnterBack: () => {
            floatOne.resume();
            floatTwo.resume();
          },
          onLeaveBack: () => {
            floatOne.pause();
            floatTwo.pause();
          },
        });
      }

      // Floating code glyph layer slow drift parallax
      if (glyphsRef.current) {
        gsap.to(".code-glyph-item", {
          y: (i) => (i % 2 === 0 ? -40 : 40),
          x: (i) => (i % 3 === 0 ? 25 : -25),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Desktop scroll parallax (>=1024px)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(".home-content-box", {
          y: -40,
          yPercent: -50,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        const rightVisual = rootRef.current.querySelector(".right-side-visual");
        if (rightVisual) {
          gsap.to(rightVisual, {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Box ref={rootRef} className="hero-bg relative">
        {/* Decorative Floating Code Glyphs Layer (~6% opacity) */}
        <div
          ref={glyphsRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        >
          <svg className="w-full h-full absolute inset-0 opacity-[0.06] text-white">
            <text x="12%" y="22%" className="code-glyph-item font-mono text-3xl font-bold" fill="currentColor">&lt;/&gt;</text>
            <text x="82%" y="18%" className="code-glyph-item font-mono text-4xl font-bold" fill="currentColor">&#123;&nbsp;&#125;</text>
            <text x="48%" y="78%" className="code-glyph-item font-mono text-2xl font-semibold" fill="currentColor">=&gt;</text>
            <text x="90%" y="65%" className="code-glyph-item font-mono text-3xl font-bold" fill="currentColor">&lt;div /&gt;</text>
            <text x="6%" y="82%" className="code-glyph-item font-mono text-3xl font-semibold" fill="currentColor">const&nbsp;app;</text>
            <text x="35%" y="15%" className="code-glyph-item font-mono text-2xl" fill="currentColor">&#40;&nbsp;&#41;</text>
          </svg>
        </div>

        <Box className="container lg:px-0 px-10 relative">
          <Box className="relative xxl:h-[700px] xl:h-[600px] lg:h-[560px] md:h-[500px] sm:h-[600px] xsm:h-[600px] xxs:h-[600px] xxxs:h-[600px]">
            <Box className="home-content-box max-w-[55%] xl:max-w-[58%] lg:max-w-[55%]">
              <Box className="hero-badge-pill flex items-center justify-content-start gap-[0.5rem] mb-3">
                <Divider className="bg-white w-[20px] !border-[1px]opacity-80 " />
                <Typography
                  className="text-white !text-lg !font-[400] !leading-[140%] !tracking-[-0.16px] !mb-0 opacity-80 font-poppins"
                  variant="subtitle"
                  component="p"
                  gutterBottom
                >
                  ERS TECH
                </Typography>
              </Box>
              <Typography
                component="h1"
                gutterBottom
                className="!mb-3"
              >
                <span className="hero-subline block xxl:!text-2xl xl:!text-xl lg:!text-lg md:!text-lg sm:!text-lg xsm:!text-lg xxs:!text-base xxxs:!text-base !font-medium !leading-[150%] !tracking-[-0.16px] text-white !mb-2 font-poppins">
                  Transform Your Ideas Into
                </span>
                <span
                  ref={mainLineRef}
                  className="hero-mainline block !text-white xxl:!text-[4.2rem] xl:!text-[2.85rem] lg:!text-[2.35rem] md:!text-4xl sm:!text-3xl xsm:!text-3xl xxs:!text-2xl xxxs:!text-2xl !font-[600] !leading-[120%] !tracking-[-0.16px] uppercase font-poppins"
                >
                  Intelligent Solutions
                </span>
              </Typography>
              <Typography
                variant="overline"
                className="hero-overline font-poppins text-white xxl:!text-xl xl:!text-base lg:!text-sm !font-[400] leading-[140%] tracking-[-0.16px]"
              >
                YOUR VISION, OUR CODE.
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/portfolio"
              className="hero-action-btn font-poppins shadow-xl !normal-case !w-[160px] !rounded-[50px] !bg-white !text-base !py-2 !px-4 font-medium !leading-[140%] !text-[#3CB7EE] !absolute xxl:top-[70%] xl:top-[74%] lg:top-[76%] top-[78%] left-[1%] hover:!bg-[#29bcf1] hover:!text-[#fff]"
            >
              View Our Work
            </Button>
            <Box className="right-side-visual absolute inset-0 xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden pointer-events-none">
              <Box className="xxl:h-[350px] xxl:w-[350px] xl:h-[265px] xl:w-[265px] lg:h-[240px] lg:w-[240px] md:h-[200px] md:w-[200px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-one-visual flex justify-center items-center z-[1] pointer-events-auto shadow-lg">
                <Image
                  src={ROneImg}
                  className="w-[80%] object-cover transition-transform"
                  priority
                  unoptimized
                  placeholder="blur"
                  alt="Software development showcase graphic"
                />
              </Box>
              <Box className="xxl:h-[210px] xxl:w-[300px] xl:h-[160px] xl:w-[225px] lg:h-[145px] lg:w-[205px] md:h-[125px] md:w-[170px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-two-visual flex justify-center items-center z-[1] pointer-events-auto shadow-md">
                <Image
                  src={RTwoImg}
                  className="w-[70%] object-cover transition-transform"
                  priority
                  unoptimized
                  placeholder="blur"
                  alt="Fintech dashboard illustration"
                />
              </Box>
              <Box className="backward-border xxl:h-[460px] xxl:w-[340px] xl:h-[350px] xl:w-[255px] lg:h-[320px] lg:w-[230px] md:h-[260px] md:w-[190px]"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
