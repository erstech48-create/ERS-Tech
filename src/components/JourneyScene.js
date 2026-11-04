import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";

const steps = [
  {
    num: "01",
    label: "PHASE 01",
    shortTitle: "Discovery",
    title: "Discovery & Strategy",
    desc: "We dig into your goals, users and market to define what success looks like. You get a clear roadmap, scope and tech direction before a single line of code.",
    deliverables: [
      { title: "Feasibility Analysis", sub: "Validate scope, risks and budget early" },
      { title: "Architecture Blueprint", sub: "High-level system and data design" },
      { title: "Tech Strategy", sub: "The right stack for scale and speed" },
    ],
    image: "/images/process/01_Discovery.jpg",
    objectPosition: "center 65%",
  },
  {
    num: "02",
    label: "PHASE 02",
    shortTitle: "Design",
    title: "UI / UX Design",
    desc: "We turn requirements into intuitive, on-brand interfaces. Every flow is mapped, prototyped and validated before development begins.",
    deliverables: [
      { title: "User Journey Maps", sub: "Clear paths for every user goal" },
      { title: "Interactive Prototypes", sub: "Clickable flows to validate early" },
      { title: "Design System", sub: "Reusable components for consistency" },
    ],
    image: "/images/process/02_Design.jpg",
    objectPosition: "center 65%",
  },
  {
    num: "03",
    label: "PHASE 03",
    shortTitle: "Development",
    title: "Agile Development",
    desc: "Our engineers build clean, scalable code in short sprints with regular demos. You see real progress every two weeks.",
    deliverables: [
      { title: "Sprint Coding", sub: "Two-week sprints with live demos" },
      { title: "API & Microservices", sub: "Modular, secure and scalable backend" },
      { title: "CI/CD Pipeline", sub: "Automated builds, tests and deploys" },
    ],
    image: "/images/process/03_Development.jpg",
    objectPosition: "center 60%",
  },
  {
    num: "04",
    label: "PHASE 04",
    shortTitle: "QA Testing",
    title: "Quality Assurance & Testing",
    desc: "Every release is tested for functionality, performance and security across devices and browsers. Issues are caught before your users ever see them.",
    deliverables: [
      { title: "Automated Tests", sub: "Regression suites on every release" },
      { title: "Security Audits", sub: "Vulnerability scans and penetration testing" },
      { title: "Cross-Platform QA", sub: "Verified on all devices and browsers" },
    ],
    image: "/images/process/04_QA_Testing.jpg",
    objectPosition: "center 70%",
  },
  {
    num: "05",
    label: "PHASE 05",
    shortTitle: "Review",
    title: "Review & Refinement",
    desc: "We walk through the product with you, collect feedback and polish every detail. Features are refined until they meet your expectations.",
    deliverables: [
      { title: "Stakeholder Demo", sub: "Live feature walkthroughs and approval" },
      { title: "Performance Tuning", sub: "Speed, accessibility and SEO benchmarks" },
      { title: "Pre-Launch Audits", sub: "Final sanity checks before release" },
    ],
    image: "/images/process/05_Review.jpg",
    objectPosition: "center 65%",
  },
  {
    num: "06",
    label: "PHASE 06",
    shortTitle: "Launch",
    title: "Deployment & Launch",
    desc: "We ship to production with zero downtime and monitor everything around the clock. Your product goes live stable and ready to scale.",
    deliverables: [
      { title: "Zero-Downtime Deploy", sub: "Seamless releases, no service interruption" },
      { title: "Cloud Orchestration", sub: "Auto-scaling infrastructure on demand" },
      { title: "24/7 Monitoring", sub: "Alerts and uptime tracking around the clock" },
    ],
    image: "/images/process/06_Launch.jpg",
    objectPosition: "center 45%",
  },
];

export default function JourneyScene() {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current || !pinWrapRef.current) return;

    // Desktop pinning for >= 1024px
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    const getNavHeight = () => {
      if (typeof document !== "undefined") {
        const header = document.querySelector(".header");
        if (header && header.offsetHeight > 0) {
          return header.offsetHeight;
        }
        const navHVar = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
        if (navHVar) {
          const parsed = parseInt(navHVar, 10);
          if (parsed > 0) return parsed;
        }
      }
      return 70;
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: pinWrapRef.current,
      pinSpacing: true,
      start: () => `top ${getNavHeight()}px`,
      end: () => `+=${window.innerHeight * 3.8}`, // ~75vh per step across 6 steps
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * steps.length),
          steps.length - 1
        );
        setActiveStep(index);
      },
    });

    scrollTriggerRef.current = st;

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Jump directly to any step when clicked
  const handleStepClick = (index) => {
    setActiveStep(index);
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetScroll = st.start + (st.end - st.start) * (index / (steps.length - 1));
      if (typeof window !== "undefined") {
        if (scrollTo) {
          scrollTo(targetScroll, { duration: 0.5 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="journey-scene-section relative w-full bg-[#F7F9FC] my-0 p-0 border-y border-slate-200/60"
    >
      {/* =========================================================================
          DESKTOP PINNED STAGE (>= 1024px)
          - Full-width clean section frame, no outer card-inside-card border
          - Stage height = calc(100svh - var(--nav-h))
          - Header block + Stepper take auto height, Content stage takes remaining (flex: 1)
          - 2-Column: 5fr left (clean typography) + 7fr right (full-frame visual)
      ========================================================================= */}
      <div
        ref={pinWrapRef}
        className="journey-pinned-stage hidden lg:flex flex-col justify-start items-center w-full max-w-[1280px] mx-auto px-6 xl:px-10 relative select-none"
      >
        {/* Top Header Block */}
        <div className="journey-header text-center flex flex-col items-center flex-shrink-0 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100 text-[11px] xl:text-[12px] font-semibold text-ersPrimary mb-1.5 font-poppins uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-ersPrimary animate-pulse"></span>
            End-To-End Execution
          </div>
          <Typography
            variant="h2"
            component="h2"
            className="journey-title capitalize !font-[700] font-poppins text-slate-900 tracking-tight"
          >
            From Idea to <span className="bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent">Launch</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="journey-subtitle !font-[400] font-poppins text-slate-500 max-w-2xl mx-auto"
          >
            Our proven engineering lifecycle turns bold concepts into high-scale digital realities.
          </Typography>
        </div>

        {/* 6-Step Progress Stepper */}
        <div className="journey-stepper-wrap relative w-full flex-shrink-0 max-w-[1080px] mx-auto">
          {/* Background track line */}
          <div className="journey-stepper-track-bg absolute top-[18px] xl:top-[20px] left-[7%] right-[7%] h-[2px] bg-slate-200 z-0" />
          {/* Active progress fill line */}
          <div
            className="journey-stepper-track-fill absolute top-[18px] xl:top-[20px] left-[7%] h-[2px] bg-gradient-to-r from-[#26AFED] to-[#115BD0] transition-all duration-300 z-0"
            style={{ width: `${(activeStep / (steps.length - 1)) * 86}%` }}
          />

          <div className="grid grid-cols-6 relative z-10">
            {steps.map((st, i) => {
              const isActive = i === activeStep;
              const isPassed = i < activeStep;
              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => handleStepClick(i)}
                  className="flex flex-col items-center text-center cursor-pointer group outline-none"
                >
                  {/* Circle 34–38px */}
                  <div
                    className={`journey-circle rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#26AFED] to-[#115BD0] text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100 scale-105"
                        : isPassed
                        ? "bg-gradient-to-r from-[#26AFED] to-[#115BD0] text-white shadow-sm"
                        : "bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-300 group-hover:text-slate-500"
                    }`}
                  >
                    {isPassed ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      st.num
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`journey-stepper-label font-semibold font-poppins transition-all duration-200 mt-1.5 ${
                      isActive
                        ? "text-slate-900 font-bold"
                        : isPassed
                        ? "text-slate-700"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {st.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Stage (5fr left text / 7fr right visual, fills remaining vertical height) */}
        <div className="journey-stage-grid w-full flex-1 min-h-0 grid grid-cols-12 items-center">
          {/* Left Column (5fr): Clean typography, no box wrapper */}
          <div className="journey-left-col col-span-5 h-full flex flex-col justify-center relative min-h-0 pr-2 xl:pr-6">
            {steps.map((st, idx) => {
              const isCurrent = idx === activeStep;
              const nextStep = steps[idx + 1];
              return (
                <div
                  key={st.num}
                  className="step-text-item absolute inset-0 flex flex-col justify-center transition-all duration-300 ease-out"
                  style={{
                    opacity: isCurrent ? 1 : 0,
                    zIndex: isCurrent ? 2 : 1,
                    transform: isCurrent ? "translateY(0)" : "translateY(12px)",
                    pointerEvents: isCurrent ? "auto" : "none",
                  }}
                >
                  {/* Big Number + Eyebrow Header */}
                  <div className="flex items-baseline gap-3 mb-1 xl:mb-2 flex-shrink-0">
                    <span className="journey-big-num font-extrabold font-poppins leading-none text-[#26AFED]/15 select-none">
                      {st.num}
                    </span>
                    <span className="text-[12px] xl:text-[13px] font-bold text-ersPrimary tracking-[0.08em] uppercase font-mono">
                      {st.label} · STEP {parseInt(st.num, 10)} OF 06
                    </span>
                  </div>

                  {/* Title */}
                  <Typography
                    variant="h3"
                    className="journey-step-title !font-[700] font-poppins text-slate-900 tracking-tight"
                  >
                    {st.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    className="journey-step-desc font-poppins text-slate-600 leading-[1.65] max-w-[50ch]"
                  >
                    {st.desc}
                  </Typography>

                  {/* Vertical Deliverables List */}
                  <div className="journey-deliverables-list flex flex-col flex-shrink-0">
                    {st.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="journey-deliverable-row flex items-start gap-3">
                        <div className="journey-check-circle w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-ersPrimary mt-0.5 shadow-sm">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="journey-deliv-title font-semibold text-slate-900 font-poppins leading-tight">
                            {item.title}
                          </span>
                          <span className="journey-deliv-sub text-slate-500 font-poppins leading-snug">
                            {item.sub}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Link / CTA */}
                  <div className="journey-footer-row flex items-center flex-shrink-0">
                    {nextStep ? (
                      <button
                        type="button"
                        onClick={() => handleStepClick(idx + 1)}
                        className="inline-flex items-center gap-2 text-ersPrimary font-semibold text-[14px] xl:text-[15px] hover:text-blue-700 transition-colors group cursor-pointer"
                      >
                        <span>Next: {nextStep.shortTitle}</span>
                        <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                      </button>
                    ) : (
                      <Link
                        href="/services#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#26AFED] to-[#115BD0] text-white font-semibold text-[14px] shadow-md shadow-blue-500/25 hover:shadow-lg hover:scale-[1.02] transition-all"
                      >
                        Start your project →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7fr): Visual Frame that FILLS the content stage */}
          <div className="journey-right-col col-span-7 h-full flex items-center justify-center min-h-0">
            <div className="journey-visual-frame relative w-full h-full rounded-[24px] overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),0_10px_20px_-10px_rgba(0,0,0,0.04)] bg-slate-100">
              {steps.map((st, idx) => {
                const isCurrent = idx === activeStep;
                return (
                  <div
                    key={st.num}
                    className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                    style={{
                      opacity: isCurrent ? 1 : 0,
                      zIndex: isCurrent ? 2 : 1,
                      pointerEvents: isCurrent ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={st.image}
                      alt={`${st.shortTitle} - ${st.title}`}
                      fill
                      quality={90}
                      priority={idx === 0}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      style={{ objectPosition: st.objectPosition }}
                      className="object-cover select-none"
                    />

                    {/* Glass label in the frame's bottom-left corner */}
                    <div className="absolute bottom-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/70 shadow-sm text-[13px] font-semibold text-slate-800 font-poppins">
                      {st.num} · {st.shortTitle}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TABLET & MOBILE NATURAL STACKED STAGE (< 1024px)
          - Pinning DISABLED: natural scrolling flow
          - Interactive step chips + card with 4:3 cover imagery
          - Zero horizontal overflow, clean responsive layout
      ========================================================================= */}
      <div className="block lg:hidden px-4 py-10 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-semibold text-ersPrimary mb-1.5 font-poppins uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-ersPrimary animate-pulse"></span>
            End-To-End Execution
          </div>
          <Typography
            variant="h2"
            component="h2"
            className="capitalize !text-2xl sm:!text-3xl !font-[700] font-poppins text-slate-900"
          >
            From Idea to <span className="bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent">Launch</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="!text-xs sm:!text-sm font-poppins text-slate-500 mt-1"
          >
            Our proven engineering lifecycle turns bold concepts into high-scale digital realities.
          </Typography>
        </div>

        {/* Mobile Horizontal Step Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 scrollbar-none">
          {steps.map((st, i) => {
            const isActive = i === activeStep;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold font-poppins transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#26AFED] to-[#115BD0] text-white shadow-sm"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {st.num}. {st.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Mobile Step Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-blue-50 text-ersPrimary border border-blue-100 tracking-wider uppercase font-mono">
              {steps[activeStep].label}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Step {steps[activeStep].num} of 06
            </span>
          </div>

          <Typography
            variant="h3"
            className="!text-xl !font-[700] font-poppins text-slate-900 mb-1.5"
          >
            {steps[activeStep].title}
          </Typography>

          <Typography
            variant="body2"
            className="!text-sm font-poppins text-slate-600 leading-relaxed mb-4"
          >
            {steps[activeStep].desc}
          </Typography>

          {/* Mobile Image: 4:3 Aspect Ratio with cover */}
          <div className="relative w-full aspect-[4/3] mb-5 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <Image
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              fill
              quality={90}
              priority
              sizes="100vw"
              style={{ objectPosition: steps[activeStep].objectPosition }}
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/70 text-xs font-semibold text-slate-800">
              {steps[activeStep].num} · {steps[activeStep].shortTitle}
            </div>
          </div>

          {/* Deliverables Vertical List */}
          <div className="space-y-3 mb-6">
            {steps[activeStep].deliverables.map((item, dIdx) => (
              <div key={dIdx} className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-ersPrimary mt-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 font-poppins">{item.title}</div>
                  <div className="text-[11px] text-slate-500 font-poppins">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg font-poppins transition-colors ${
                activeStep === 0
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              ← Previous
            </button>
            <div className="flex items-center gap-1">
              {steps.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    dotIdx === activeStep ? "w-4 bg-ersPrimary" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            {activeStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="text-xs font-bold text-ersPrimary hover:bg-blue-50 px-3 py-1.5 rounded-lg font-poppins transition-colors"
              >
                Next Step →
              </button>
            ) : (
              <Link
                href="/services#contact"
                className="text-xs font-bold text-white bg-ersPrimary px-3 py-1.5 rounded-lg font-poppins shadow-sm"
              >
                Start Project →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          FLUID RESPONSIVE SIZING & HEIGHT BREAKPOINTS
          - Pinned stage = calc(100svh - var(--nav-h))
          - Grid: 5fr left / 7fr right
          - Visual frame and left text both match content stage height
          - Fluid clamp typography and padding
          - Short screen rules: <= 700px and <= 640px
      ========================================================================= */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .journey-pinned-stage {
            height: calc(100vh - var(--nav-h, 70px));
            min-height: calc(100vh - var(--nav-h, 70px));
            max-height: calc(100vh - var(--nav-h, 70px));
            padding-top: clamp(10px, 2.2vh, 24px);
            padding-bottom: clamp(10px, 2.2vh, 24px);
            box-sizing: border-box;
          }

          @supports (height: 100svh) {
            .journey-pinned-stage {
              height: calc(100svh - var(--nav-h, 70px));
              min-height: calc(100svh - var(--nav-h, 70px));
              max-height: calc(100svh - var(--nav-h, 70px));
            }
          }

          @supports (height: 100dvh) {
            .journey-pinned-stage {
              height: calc(100dvh - var(--nav-h, 70px));
              min-height: calc(100dvh - var(--nav-h, 70px));
              max-height: calc(100dvh - var(--nav-h, 70px));
            }
          }

          .journey-header {
            margin-bottom: clamp(8px, 1.6vh, 18px);
          }

          .journey-title {
            font-size: clamp(26px, 2.8vw, 42px) !important;
            line-height: 1.15 !important;
            margin-bottom: 4px !important;
          }

          .journey-subtitle {
            font-size: clamp(13.5px, 1.05vw, 16px) !important;
            line-height: 1.4 !important;
          }

          .journey-stepper-wrap {
            margin-bottom: clamp(12px, 2vh, 24px);
          }

          .journey-circle {
            width: clamp(34px, 4vh, 38px);
            height: clamp(34px, 4vh, 38px);
            font-size: clamp(13px, 1.4vh, 15px);
          }

          .journey-stepper-label {
            font-size: clamp(13.5px, 1.35vh, 15px);
          }

          .journey-stage-grid {
            gap: clamp(24px, 3.5vw, 64px);
          }

          .journey-big-num {
            font-size: clamp(44px, 5.5vh, 80px);
          }

          .journey-step-title {
            font-size: clamp(26px, 2.4vw, 40px) !important;
            line-height: 1.15 !important;
            margin-bottom: clamp(6px, 1vh, 12px) !important;
          }

          .journey-step-desc {
            font-size: clamp(14px, 1.1vw, 17px) !important;
            line-height: 1.6 !important;
            margin-bottom: clamp(10px, 1.8vh, 20px) !important;
          }

          .journey-deliverables-list {
            gap: clamp(10px, 1.4vh, 16px);
            margin-bottom: clamp(12px, 2vh, 24px);
          }

          .journey-deliv-title {
            font-size: clamp(14px, 1vw, 15.5px);
          }

          .journey-deliv-sub {
            font-size: clamp(12.5px, 0.9vw, 14px);
          }
        }

        /* Short-height screen rules (e.g. <= 700px) */
        @media (min-width: 1024px) and (max-height: 700px) {
          .journey-pinned-stage {
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .journey-header {
            margin-bottom: 6px;
          }
          .journey-title {
            font-size: clamp(22px, 2.4vw, 28px) !important;
            margin-bottom: 2px !important;
          }
          .journey-subtitle {
            font-size: 13px !important;
          }
          .journey-stepper-wrap {
            margin-bottom: 10px;
          }
          .journey-circle {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }
          .journey-stepper-track-bg,
          .journey-stepper-track-fill {
            top: 16px;
          }
          .journey-stepper-label {
            font-size: 12.5px;
            margin-top: 2px;
          }
          .journey-stage-grid {
            gap: 24px;
          }
          .journey-big-num {
            font-size: 38px;
          }
          .journey-step-title {
            font-size: clamp(20px, 2vw, 24px) !important;
            margin-bottom: 4px !important;
          }
          .journey-step-desc {
            font-size: 13px !important;
            line-height: 1.45 !important;
            margin-bottom: 10px !important;
          }
          .journey-deliverables-list {
            gap: 8px;
            margin-bottom: 12px;
          }
          .journey-deliv-title {
            font-size: 13px;
          }
          .journey-deliv-sub {
            font-size: 12px;
          }
          .journey-check-circle {
            width: 24px;
            height: 24px;
          }
        }

        /* Extra short-height screen rules (e.g. <= 640px): Compact mode */
        @media (min-width: 1024px) and (max-height: 640px) {
          .journey-pinned-stage {
            padding-top: 6px;
            padding-bottom: 6px;
          }
          .journey-deliv-sub {
            display: none !important;
          }
          .journey-step-desc {
            margin-bottom: 8px !important;
          }
          .journey-deliverables-list {
            gap: 6px;
            margin-bottom: 10px;
          }
          .journey-big-num {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
