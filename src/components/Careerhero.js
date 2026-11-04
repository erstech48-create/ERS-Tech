import React, { useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

function Careerhero({
  btnText,
  Mainheading,
  subHeading,
  img,
  top,
  subHeading2,
  width,
}) {
  const rootRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      // 1) Pill button fade + scale 0.9 -> 1
      gsap.fromTo(
        ".career-hero-pill",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", delay: 0 }
      );

      // 2) H1 words mask-reveal, preserving <br/>
      if (headingRef.current && Mainheading) {
        const segments = Mainheading.split(/(<br\s*\/?>)/gi);
        const splitHTML = segments
          .map((seg) => {
            if (seg.match(/<br\s*\/?>/i)) return seg;
            const words = seg.trim().split(/\s+/);
            if (!words.length || (words.length === 1 && words[0] === "")) return "";
            return words
              .map(
                (w) =>
                  `<span class="word-mask-wrapper"><span class="word-mask-inner">${w}</span></span>`
              )
              .join(" ");
          })
          .join(" ");

        headingRef.current.innerHTML = splitHTML;

        const words = headingRef.current.querySelectorAll(".word-mask-inner");
        gsap.fromTo(
          words,
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

      // 3) Subheadings fade-up
      const subheadings = rootRef.current.querySelectorAll(".career-subheading");
      if (subheadings.length) {
        gsap.fromTo(
          subheadings,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.35,
          }
        );
      }

      // 4) Right card slide in + idle float
      const card = rootRef.current.querySelector(".career-visual-card");
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.25,
            onComplete: () => {
              const floatTween = gsap.to(card, {
                y: "+=6",
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });

              ScrollTrigger.create({
                trigger: rootRef.current,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => floatTween.resume(),
                onLeave: () => floatTween.pause(),
                onEnterBack: () => floatTween.resume(),
                onLeaveBack: () => floatTween.pause(),
              });
            },
          }
        );
      }

      // 5) Blue border box draw-in with scale from corner
      const border = rootRef.current.querySelector(".career-visual-border");
      if (border) {
        gsap.fromTo(
          border,
          { opacity: 0, scale: 0, transformOrigin: "top left" },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.45,
          }
        );
      }

      // Scroll parallax (>=1024px only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(".hero-component-multi", {
          y: -40,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        if (card) {
          gsap.to(card, {
            y: -60,
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
  }, [Mainheading]);

  return (
    <>
      <Box
        ref={rootRef}
        className={`hero-bg ${btnText === "Services" ? "!mb-12" : "!mb-[0rem]"} `}
      >
        <Box className="container lg:px-0 px-10">
          <Box className="relative xl:h-[700px] lg:h-[700px] md:h-[700px] sm:h-[650px] xsm:h-[650px] xxs:h-[600px] xxxs:h-[600px]">
            <Box className="hero-component-multi z-[2]">
              <Button className="career-hero-pill shadow-xl !w-[160px] !rounded-[50px] !bg-white !text-small !text-[#3CB7EE] !capitalize !mb-8 lg:!mb-9 hover:!bg-ersPrimary hover:!text-white !text-base !font-[500] font-poppins leading-[140%] !py-2">
                {btnText}
              </Button>
              <Typography
                className="career-hero-heading !text-white 2xl:!text-[3.5rem] xl:!text-[2.85rem] lg:!text-[2.35rem] md:!text-5xl sm:!text-4xl xsm:!text-3xl xxs:!text-3xl xxxs:!text-2xl !font-[600] uppercase font-poppins !mb-6 xl:!leading-[125%]"
                variant="h1"
                component="h1"
                gutterBottom
              >
                <div
                  ref={headingRef}
                  dangerouslySetInnerHTML={{ __html: Mainheading }}
                />
              </Typography>
              <Typography
                variant="subtitle1"
                component={"p"}
                className="career-subheading text-white xl:!text-base lg:!text-sm md:!text-[14px] sm:!text-[14px] xsm:!text-[14px] xxs:!text-[13px] xxxs:!text-[12px] !font-[400] font-poppins xl:!leading-[160%] !mb-4 max-w-[95%] sm:max-w-full"
              >
                {subHeading}
              </Typography>
              {subHeading2 ? (
                <Typography
                  variant="subtitle1"
                  component={"p"}
                  className="career-subheading text-white xl:!text-base lg:!text-sm md:!text-[14px] sm:!text-[14px] xsm:!text-[13px] xxs:!text-[12px] xxxs:!text-[12px] !font-[400] font-poppins !leading-[150%] !tracking-[-0.16px] max-w-[95%] sm:max-w-full"
                >
                  {subHeading2}
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box className="xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
              <Box className="career-visual-border xl:h-[400px] lg:h-[350px] md:h-[150px] xl:w-[380px] lg:w-[330px] md:w-[220px] border-2 border-white"></Box>
              <Box className="career-visual-card shadow-xl xl:h-[400px] lg:h-[340px] md:h-[260px] xl:w-[420px] lg:w-[360px] md:w-[280px] bg-white border-[3px] border-[rgba(41,188,241,0.6)] rounded-[10px] right-one-visual flex justify-center items-center z-[1] xl:!top-[51%] lg:!top-[51%] md:!top-[45%] xl:!right-[1.5%] lg:!right-[1.5%] md:!-right-[3%]">
                <Image
                  src={img}
                  className={
                    width ? `w-${width} object-cover` : "w-[80%] object-cover"
                  }
                  priority
                  alt={
                    btnText
                      ? `${btnText} banner illustration`
                      : "ERS TECH banner illustration"
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Careerhero;
