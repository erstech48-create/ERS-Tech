import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Pen from "@/../public/assets/images/pen.png";
import Search from "@/../public/assets/images/search.png";
import Avatar from "@/../public/assets/images/avatar.png";
import Graph from "@/../public/assets/images/graph.png";
import Menu from "@/../public/assets/images/menu.png";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import CountUp from "@/components/motion/CountUp";

export default function OurStats() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = rootRef.current.querySelectorAll(".stat-card-item");
      const centerCard = rootRef.current.querySelector(".stat-center-card");
      const ring = rootRef.current.querySelector(".stats-svg-ring");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1) Center card pop + ring draw
      if (centerCard) {
        tl.fromTo(
          centerCard,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
        );
      }

      if (ring) {
        tl.fromTo(
          ring,
          { strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 1, ease: "power2.out" },
          "<0.1"
        );
      }

      // 2) Staggered outer cards fade-up
      if (cards.length) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="our-stats-section w-full bg-[#F7F9FC] border-y border-slate-200/60 py-12 lg:py-16 my-0 relative overflow-hidden select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px]">
        {/* Header Block */}
        <div className="text-center flex flex-col items-center mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100 text-[11px] xl:text-[12px] font-semibold text-ersPrimary mb-2 font-poppins uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-ersPrimary animate-pulse"></span>
            Proven Track Record
          </div>
          <Typography
            variant="h2"
            component="h2"
            className="capitalize !font-[700] font-poppins text-slate-900 tracking-tight !text-2xl sm:!text-3xl lg:!text-4xl !mb-2"
          >
            Our <span className="bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent">Numbers & Impact</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="!font-[400] font-poppins text-slate-500 max-w-xl mx-auto !text-xs sm:!text-sm lg:!text-base"
          >
            A decade of technical excellence, enterprise delivery, and global client trust.
          </Typography>
        </div>

        {/* Desktop Bento / Hub Layout (>= 1024px) */}
        <div className="hidden lg:grid grid-cols-12 gap-5 items-stretch">
          {/* Left Column (3.5 cols): 2 stacked cards */}
          <div className="col-span-3 flex flex-col justify-between gap-5">
            {/* 600+ Projects */}
            <div className="stat-card-item bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col justify-between hover:border-ersPrimary/50 transition-all duration-300 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2.5">
                  <Image src={Pen} alt="Projects" width={28} height={28} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Metric 01</span>
              </div>
              <div>
                <Typography className="!font-[800] font-poppins bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent leading-none !text-3xl xl:!text-4xl !mb-1">
                  <CountUp value="600+" />
                </Typography>
                <div className="font-semibold text-slate-900 font-poppins text-base leading-tight mb-1">
                  Projects Completed
                </div>
                <div className="text-xs text-slate-500 font-poppins leading-relaxed">
                  Web, mobile, blockchain & fintech solutions delivered globally.
                </div>
              </div>
            </div>

            {/* 100+ Reviews */}
            <div className="stat-card-item bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col justify-between hover:border-ersPrimary/50 transition-all duration-300 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2.5">
                  <Image src={Search} alt="Reviews" width={28} height={28} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Metric 02</span>
              </div>
              <div>
                <Typography className="!font-[800] font-poppins bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent leading-none !text-3xl xl:!text-4xl !mb-1">
                  <CountUp value="100+" />
                </Typography>
                <div className="font-semibold text-slate-900 font-poppins text-base leading-tight mb-1">
                  Positive Reviews
                </div>
                <div className="text-xs text-slate-500 font-poppins leading-relaxed">
                  Top-rated customer satisfaction across global enterprise clients.
                </div>
              </div>
            </div>
          </div>

          {/* Center Column (6 cols): The Showcase "10 Glorious Years" Hub Card */}
          <div className="col-span-6 flex flex-col">
            <div className="stat-center-card bg-gradient-to-b from-white via-white to-blue-50/50 rounded-3xl p-8 border border-blue-100 shadow-[0_20px_40px_-15px_rgba(38,175,237,0.12)] flex flex-col items-center justify-between text-center relative overflow-hidden h-full">
              {/* Top pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-ersPrimary font-poppins mb-4">
                ⭐ Major Milestone
              </div>

              {/* Radiant Ring with "10" */}
              <div className="relative w-44 h-44 xl:w-48 xl:h-48 my-2 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3.5"
                  />
                  <circle
                    className="stats-svg-ring"
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="url(#blue-grad)"
                    strokeWidth="3.5"
                    strokeDasharray="400"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#26AFED" />
                      <stop offset="100%" stopColor="#115BD0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner content */}
                <div className="flex flex-col items-center justify-center z-10">
                  <Typography className="!font-[800] font-poppins text-slate-900 leading-none !text-5xl xl:!text-6xl tracking-tight">
                    <CountUp value={10} />
                  </Typography>
                  <span className="text-xs xl:text-sm font-semibold text-ersPrimary font-poppins mt-1 tracking-wide uppercase">
                    Glorious Years
                  </span>
                </div>
              </div>

              {/* Text underneath circle */}
              <div className="max-w-md mx-auto mt-3">
                <div className="font-bold text-slate-900 font-poppins text-lg xl:text-xl mb-1.5">
                  A Decade of Software Innovation
                </div>
                <div className="text-xs xl:text-sm text-slate-600 font-poppins leading-relaxed mb-4">
                  Transforming bold ideas into intuitive, high-performance systems with modern architectures and 24/7 reliability.
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active Since 2014 · 100% In-House Team
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (3 cols): 2 stacked cards */}
          <div className="col-span-3 flex flex-col justify-between gap-5">
            {/* 97% Satisfaction */}
            <div className="stat-card-item bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col justify-between hover:border-ersPrimary/50 transition-all duration-300 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2.5">
                  <Image src={Menu} alt="Satisfaction" width={28} height={28} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Metric 03</span>
              </div>
              <div>
                <Typography className="!font-[800] font-poppins bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent leading-none !text-3xl xl:!text-4xl !mb-1">
                  <CountUp value="97%" />
                </Typography>
                <div className="font-semibold text-slate-900 font-poppins text-base leading-tight mb-1">
                  Satisfaction Rate
                </div>
                <div className="text-xs text-slate-500 font-poppins leading-relaxed">
                  Repeat business and long-term client retention across all projects.
                </div>
              </div>
            </div>

            {/* 100+ Clients */}
            <div className="stat-card-item bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex flex-col justify-between hover:border-ersPrimary/50 transition-all duration-300 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2.5">
                  <Image src={Graph} alt="Clients" width={28} height={28} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">Metric 04</span>
              </div>
              <div>
                <Typography className="!font-[800] font-poppins bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent leading-none !text-3xl xl:!text-4xl !mb-1">
                  <CountUp value="100+" />
                </Typography>
                <div className="font-semibold text-slate-900 font-poppins text-base leading-tight mb-1">
                  Happy Clients
                </div>
                <div className="text-xs text-slate-500 font-poppins leading-relaxed">
                  Powering high-growth startups, scale-ups, and established brands.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card (Desktop): Team Members (50+) */}
        <div className="hidden lg:block mt-5">
          <div className="stat-card-item bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.04)] flex items-center justify-between hover:border-ersPrimary/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2.5 flex-shrink-0">
                <Image src={Avatar} alt="Team" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-slate-900 font-poppins text-base">
                  50+ Dedicated In-House Engineers & Architects
                </div>
                <div className="text-xs text-slate-500 font-poppins">
                  Full-stack developers, UI/UX designers, blockchain specialists, and QA engineers working as your extended team.
                </div>
              </div>
            </div>
            <Typography className="!font-[800] font-poppins bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent !text-3xl xl:!text-4xl leading-none flex-shrink-0 ml-4">
              <CountUp value="50+" />
            </Typography>
          </div>
        </div>

        {/* Tablet & Mobile Layout (< 1024px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {/* Center Card Mobile (Spans 2 cols on tablet) */}
          <div className="sm:col-span-2 bg-gradient-to-b from-white via-white to-blue-50/50 rounded-2xl p-6 border border-blue-100 text-center shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-ersPrimary font-poppins mb-3">
              ⭐ Major Milestone
            </div>
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="#26AFED" strokeWidth="4" strokeDasharray="400" strokeDashoffset="0" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center justify-center">
                <Typography className="!font-[800] font-poppins text-slate-900 !text-4xl leading-none">
                  <CountUp value={10} />
                </Typography>
                <span className="text-[11px] font-semibold text-ersPrimary font-poppins uppercase mt-0.5">
                  Glorious Years
                </span>
              </div>
            </div>
            <div className="font-bold text-slate-900 font-poppins text-base mt-2">
              A Decade of Software Innovation
            </div>
            <div className="text-xs text-slate-500 font-poppins mt-1">
              Building reliable digital systems and scaling modern businesses worldwide.
            </div>
          </div>

          {/* 600+ Projects */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center p-2 flex-shrink-0">
              <Image src={Pen} alt="Projects" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <Typography className="!font-[800] font-poppins text-ersPrimary !text-2xl leading-none">
                <CountUp value="600+" />
              </Typography>
              <div className="text-xs font-semibold text-slate-900 font-poppins mt-0.5">Projects Completed</div>
            </div>
          </div>

          {/* 100+ Reviews */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center p-2 flex-shrink-0">
              <Image src={Search} alt="Reviews" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <Typography className="!font-[800] font-poppins text-ersPrimary !text-2xl leading-none">
                <CountUp value="100+" />
              </Typography>
              <div className="text-xs font-semibold text-slate-900 font-poppins mt-0.5">Positive Reviews</div>
            </div>
          </div>

          {/* 97% Satisfaction */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center p-2 flex-shrink-0">
              <Image src={Menu} alt="Satisfaction" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <Typography className="!font-[800] font-poppins text-ersPrimary !text-2xl leading-none">
                <CountUp value="97%" />
              </Typography>
              <div className="text-xs font-semibold text-slate-900 font-poppins mt-0.5">Customer Satisfaction</div>
            </div>
          </div>

          {/* 100+ Clients */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center p-2 flex-shrink-0">
              <Image src={Graph} alt="Clients" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <Typography className="!font-[800] font-poppins text-ersPrimary !text-2xl leading-none">
                <CountUp value="100+" />
              </Typography>
              <div className="text-xs font-semibold text-slate-900 font-poppins mt-0.5">Happy Clients</div>
            </div>
          </div>

          {/* 50+ Team Members (Spans 2 cols on tablet) */}
          <div className="sm:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center p-2 flex-shrink-0">
              <Image src={Avatar} alt="Team" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <Typography className="!font-[800] font-poppins text-ersPrimary !text-2xl leading-none">
                <CountUp value="50+" />
              </Typography>
              <div className="text-xs font-semibold text-slate-900 font-poppins mt-0.5">Team of Experts & Engineers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
