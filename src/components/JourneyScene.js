import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    num: "01",
    label: "Phase 01",
    shortTitle: "Discovery",
    title: "Discovery & Strategy",
    desc: "Understanding business goals, user requirements, technical feasibility, and architecting the product roadmap.",
    deliverables: ["Feasibility Analysis", "Architecture Blueprint", "Tech Stack Strategy"],
  },
  {
    num: "02",
    label: "Phase 02",
    shortTitle: "Design",
    title: "UI / UX Design",
    desc: "Crafting intuitive user experiences, design systems, interactive wireframes, and production-ready high-fidelity prototypes.",
    deliverables: ["User Journey Maps", "Interactive Wireframes", "Design System & Tokens"],
  },
  {
    num: "03",
    label: "Phase 03",
    shortTitle: "Development",
    title: "Agile Development",
    desc: "Writing clean, scalable code with modern full-stack architectures, microservices, and robust API integrations.",
    deliverables: ["Sprint-based Coding", "API & Microservices", "CI/CD Pipeline Setup"],
  },
  {
    num: "04",
    label: "Phase 04",
    shortTitle: "QA Testing",
    title: "Quality Assurance & Testing",
    desc: "Comprehensive testing suites, automated regression, stress testing, security audits, and cross-device validation.",
    deliverables: ["Automated Test Suites", "Security Audits", "Cross-Platform QA"],
  },
  {
    num: "05",
    label: "Phase 05",
    shortTitle: "Review",
    title: "Review & Refinement",
    desc: "Collaborative milestone walkthroughs, stakeholder demos, performance tuning, and final pre-flight checks.",
    deliverables: ["Stakeholder Demo", "Performance Benchmarks", "Pre-Launch Audits"],
  },
  {
    num: "06",
    label: "Phase 06",
    shortTitle: "Launch",
    title: "Deployment & Launch",
    desc: "Seamless zero-downtime production deployment, cloud infrastructure orchestration, and continuous 24/7 monitoring.",
    deliverables: ["Zero-Downtime Deploy", "Cloud Orchestration", "24/7 Monitoring"],
  },
];

export default function JourneyScene() {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current || !pinWrapRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned Scene with scrub (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      const pinEl = pinWrapRef.current;
      const stepScenes = containerRef.current.querySelectorAll(".stage-scene");
      const stepTexts = containerRef.current.querySelectorAll(".step-text-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinEl,
          start: "top 80px",
          end: "+=180%",
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * steps.length),
              steps.length - 1
            );
            setActiveStep(index);
          },
        },
      });

      // Animate through the 6 steps sequentially
      steps.forEach((_, i) => {
        if (i > 0) {
          const prevScene = stepScenes[i - 1];
          const currScene = stepScenes[i];
          const prevText = stepTexts[i - 1];
          const currText = stepTexts[i];

          tl.to(
            [prevScene, prevText],
            { autoAlpha: 0, y: -16, duration: 0.35, ease: "power2.inOut" },
            `step-${i}`
          );
          tl.fromTo(
            [currScene, currText],
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.inOut" },
            `step-${i}+=0.08`
          );

          // Animate SVG draw lines
          const paths = currScene?.querySelectorAll(".draw-path");
          if (paths && paths.length) {
            tl.fromTo(
              paths,
              { strokeDashoffset: 300 },
              { strokeDashoffset: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
              `step-${i}+=0.12`
            );
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="journey-scene-section relative w-full my-6 lg:my-10"
    >
      {/* Desktop Pinned Container (>= 1024px) */}
      <div
        ref={pinWrapRef}
        className="hidden lg:flex flex-col justify-center w-full max-w-[1240px] mx-auto px-6 py-6 relative"
      >
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-ersPrimary mb-2 font-poppins uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-ersPrimary animate-pulse"></span>
            End-To-End Execution
          </div>
          <Typography
            variant="h2"
            component="h2"
            className="capitalize !text-3xl lg:!text-4xl !font-[700] font-poppins text-slate-900"
          >
            From Idea to <span className="bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent">Launch</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="!text-sm lg:!text-base !font-[400] font-poppins text-slate-500 mt-2 max-w-xl mx-auto"
          >
            Our proven, transparent engineering lifecycle turns bold concepts into high-scale digital realities.
          </Typography>
        </div>

        {/* Master Card Frame */}
        <div className="bg-white rounded-[24px] p-8 lg:p-10 border border-slate-200/90 shadow-[0_20px_50px_-20px_rgba(38,175,237,0.15),0_10px_30px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden">
          
          {/* Top Segmented Step Progress Bar */}
          <div className="border-b border-slate-100 pb-6 mb-8">
            <div className="grid grid-cols-6 gap-2 relative">
              {steps.map((st, i) => {
                const isActive = i === activeStep;
                const isPassed = i < activeStep;
                return (
                  <div
                    key={st.num}
                    className={`flex flex-col items-center text-center transition-all duration-300 relative ${
                      isActive ? "scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-center w-full mb-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-[#26AFED] to-[#115BD0] text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-100"
                            : isPassed
                            ? "bg-blue-100 text-ersPrimary"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isPassed ? "✓" : st.num}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold font-poppins transition-colors duration-200 line-clamp-1 ${
                        isActive ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {st.shortTitle}
                    </span>
                    {/* Active highlight pill line */}
                    <div
                      className={`h-0.5 w-12 rounded-full mt-2 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#26AFED] to-[#115BD0]"
                          : isPassed
                          ? "bg-blue-200"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main 2-Column Stage */}
          <div className="grid grid-cols-12 gap-10 items-center min-h-[380px]">
            {/* Left Column: Step Content */}
            <div className="col-span-5 flex flex-col justify-center relative min-h-[340px]">
              {steps.map((st, idx) => (
                <div
                  key={st.num}
                  className={`step-text-item absolute inset-0 flex flex-col justify-center transition-all duration-300 ${
                    idx === 0 ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  style={{ pointerEvents: idx === activeStep ? "auto" : "none" }}
                >
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-50 text-ersPrimary border border-blue-100 tracking-wider uppercase font-mono">
                      {st.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Step {st.num} of 06
                    </span>
                  </div>

                  <Typography
                    variant="h3"
                    className="!text-2xl xl:!text-3xl !font-[700] font-poppins text-slate-900 mb-3 tracking-tight"
                  >
                    {st.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    className="!text-sm xl:!text-base font-poppins text-slate-600 leading-relaxed mb-6"
                  >
                    {st.desc}
                  </Typography>

                  {/* Concrete Deliverables Badges */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-poppins">
                      Key Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {st.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/80 font-poppins"
                        >
                          <svg className="w-3.5 h-3.5 text-ersPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Visual Stage Terminal */}
            <div className="col-span-7 flex justify-center items-center">
              <div className="w-full bg-gradient-to-br from-[#0b1426] via-[#0d1d3a] to-[#091122] rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
                {/* Ambient glow accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Terminal Window Header Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm inline-block" />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/50">
                    ERS Platform // {steps[activeStep].shortTitle.toLowerCase()}.stage
                  </span>
                </div>

                {/* SVG Visual Stage Canvas */}
                <div className="relative w-full aspect-[16/10] flex items-center justify-center">
                  <svg
                    viewBox="0 0 540 340"
                    className="w-full h-full rounded-xl overflow-visible"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="ersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#26AFED" />
                        <stop offset="50%" stopColor="#2e66f6" />
                        <stop offset="100%" stopColor="#115BD0" />
                      </linearGradient>
                      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>

                    {/* Scene 1: Discovery & Strategy */}
                    <g
                      className="stage-scene"
                      style={{ opacity: 1, transition: "opacity 0.3s ease" }}
                    >
                      {/* Radar Rings */}
                      <circle cx="270" cy="170" r="110" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="270" cy="170" r="75" stroke="#26AFED" strokeOpacity="0.25" strokeWidth="1.5" />
                      <circle cx="270" cy="170" r="40" fill="#26AFED" fillOpacity="0.12" />

                      {/* Central Strategy Hub */}
                      <circle cx="270" cy="170" r="22" fill="url(#ersGradient)" />
                      <path d="M264 163 L276 163 M270 160 L270 178 M265 174 L275 174" stroke="white" strokeWidth="2" strokeLinecap="round" />

                      {/* Connecting Nodes */}
                      <line x1="270" y1="170" x2="150" y2="100" stroke="#26AFED" strokeWidth="1.5" strokeDasharray="4 3" />
                      <line x1="270" y1="170" x2="390" y2="100" stroke="#2e66f6" strokeWidth="1.5" strokeDasharray="4 3" />
                      <line x1="270" y1="170" x2="170" y2="240" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" />
                      <line x1="270" y1="170" x2="370" y2="240" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />

                      {/* Satellite Node Cards */}
                      <rect x="90" y="75" width="120" height="50" rx="8" fill="url(#cardGrad)" stroke="#26AFED" strokeWidth="1.5" />
                      <text x="105" y="96" fill="#93C5FD" fontSize="11" fontWeight="700" fontFamily="sans-serif">ROADMAP</text>
                      <text x="105" y="112" fill="#64748B" fontSize="9" fontFamily="sans-serif">Scope & Milestones</text>

                      <rect x="330" y="75" width="120" height="50" rx="8" fill="url(#cardGrad)" stroke="#2e66f6" strokeWidth="1.5" />
                      <text x="345" y="96" fill="#A5B4FC" fontSize="11" fontWeight="700" fontFamily="sans-serif">FEASIBILITY</text>
                      <text x="345" y="112" fill="#64748B" fontSize="9" fontFamily="sans-serif">Tech Architecture</text>

                      <rect x="110" y="215" width="120" height="50" rx="8" fill="url(#cardGrad)" stroke="#10B981" strokeWidth="1.5" />
                      <text x="125" y="236" fill="#86EFAC" fontSize="11" fontWeight="700" fontFamily="sans-serif">KPIS & GOALS</text>
                      <text x="125" y="252" fill="#64748B" fontSize="9" fontFamily="sans-serif">Metric Targets</text>

                      <rect x="310" y="215" width="120" height="50" rx="8" fill="url(#cardGrad)" stroke="#F59E0B" strokeWidth="1.5" />
                      <text x="325" y="236" fill="#FDE68A" fontSize="11" fontWeight="700" fontFamily="sans-serif">RESOURCES</text>
                      <text x="325" y="252" fill="#64748B" fontSize="9" fontFamily="sans-serif">Team Allocation</text>
                    </g>

                    {/* Scene 2: UI / UX Design */}
                    <g
                      className="stage-scene"
                      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    >
                      {/* Wireframe Canvas Window */}
                      <rect x="90" y="45" width="360" height="250" rx="12" fill="url(#cardGrad)" stroke="#26AFED" strokeWidth="2" />
                      <line x1="90" y1="80" x2="450" y2="80" stroke="#334155" strokeWidth="1.5" />
                      <rect x="110" y="60" width="60" height="10" rx="4" fill="#334155" />

                      {/* Left Sidebar Layout */}
                      <rect x="110" y="95" width="70" height="180" rx="6" fill="#0f172a" stroke="#1e293b" />
                      <rect x="120" y="110" width="50" height="8" rx="3" fill="#26AFED" fillOpacity="0.4" />
                      <rect x="120" y="125" width="40" height="6" rx="2" fill="#334155" />
                      <rect x="120" y="137" width="45" height="6" rx="2" fill="#334155" />

                      {/* Main Canvas Blocks */}
                      <rect x="195" y="95" width="240" height="70" rx="8" fill="#0f172a" stroke="#26AFED" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="270" y="135" fill="#26AFED" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Hero Section Wireframe</text>

                      {/* Card Grid in Prototype */}
                      <rect x="195" y="180" width="115" height="95" rx="6" fill="#0f172a" stroke="#1e293b" />
                      <circle cx="225" cy="205" r="12" fill="#26AFED" fillOpacity="0.3" />
                      <rect x="245" y="200" width="55" height="7" rx="2" fill="#64748B" />
                      <rect x="205" y="230" width="95" height="5" rx="2" fill="#334155" />
                      <rect x="205" y="242" width="70" height="5" rx="2" fill="#334155" />

                      <rect x="320" y="180" width="115" height="95" rx="6" fill="#0f172a" stroke="#1e293b" />
                      <circle cx="350" cy="205" r="12" fill="#2e66f6" fillOpacity="0.3" />
                      <rect x="370" y="200" width="55" height="7" rx="2" fill="#64748B" />
                      <rect x="330" y="230" width="95" height="5" rx="2" fill="#334155" />
                      <rect x="330" y="242" width="70" height="5" rx="2" fill="#334155" />

                      {/* Vector Pen Tool Indicator */}
                      <path d="M430 70 L410 110 L415 125 L400 120 Z" fill="#26AFED" />
                    </g>

                    {/* Scene 3: Agile Development */}
                    <g
                      className="stage-scene"
                      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    >
                      {/* Code Editor Window */}
                      <rect x="80" y="45" width="380" height="250" rx="12" fill="#0a0f1d" stroke="#1e293b" strokeWidth="2" />
                      <line x1="80" y1="80" x2="460" y2="80" stroke="#1e293b" strokeWidth="1" />
                      <text x="105" y="68" fill="#64748B" fontSize="11" fontFamily="monospace">App.tsx — ERS NextEngine</text>

                      {/* Code Lines with Syntax Colors */}
                      <text x="105" y="110" fill="#26AFED" fontSize="12" fontFamily="monospace">const <tspan fill="#F59E0B">createEnterpriseSolution</tspan> = async () =&gt; &#123;</text>
                      <text x="125" y="132" fill="#64748B" fontSize="12" fontFamily="monospace">// Initialize secure microservices &amp; DB</text>
                      <text x="125" y="154" fill="#93C5FD" fontSize="12" fontFamily="monospace">const cluster = <tspan fill="#26AFED">await</tspan> Orchestrator.<tspan fill="#34D399">deploy</tspan>(&#123;</text>
                      <text x="145" y="176" fill="#F472B6" fontSize="12" fontFamily="monospace">runtime: <tspan fill="#FDE68A">&quot;cloud-native&quot;</tspan>,</text>
                      <text x="145" y="198" fill="#F472B6" fontSize="12" fontFamily="monospace">security: <tspan fill="#34D399">&quot;zero-trust-v2&quot;</tspan>,</text>
                      <text x="145" y="220" fill="#F472B6" fontSize="12" fontFamily="monospace">scale: <tspan fill="#60A5FA">&quot;auto-elastic&quot;</tspan></text>
                      <text x="125" y="242" fill="#93C5FD" fontSize="12" fontFamily="monospace">&#125;);</text>
                      <text x="125" y="264" fill="#34D399" fontSize="12" fontFamily="monospace">return cluster.status === 200 &amp;&amp; READY;</text>
                      <text x="105" y="286" fill="#26AFED" fontSize="12" fontFamily="monospace">&#125;;</text>

                      {/* Cursor */}
                      <rect x="420" y="274" width="8" height="14" fill="#26AFED" className="animate-pulse" />
                    </g>

                    {/* Scene 4: QA Testing & Security */}
                    <g
                      className="stage-scene"
                      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    >
                      {/* Central Shield */}
                      <path
                        d="M270 55 L370 95 L370 185 C370 240 270 285 270 285 C270 285 170 240 170 185 L170 95 Z"
                        fill="url(#cardGrad)"
                        stroke="#10B981"
                        strokeWidth="2.5"
                      />
                      <circle cx="270" cy="165" r="45" fill="#10B981" fillOpacity="0.1" />
                      <path
                        className="draw-path"
                        d="M245 165 L263 183 L298 148"
                        stroke="#10B981"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Floating Test Result Badges */}
                      <rect x="60" y="90" width="130" height="42" rx="8" fill="#0f172a" stroke="#10B981" strokeWidth="1.5" />
                      <circle cx="80" cy="111" r="5" fill="#10B981" />
                      <text x="95" y="115" fill="#86EFAC" fontSize="11" fontWeight="700" fontFamily="sans-serif">TESTS: 248 PASS</text>

                      <rect x="350" y="90" width="130" height="42" rx="8" fill="#0f172a" stroke="#26AFED" strokeWidth="1.5" />
                      <circle cx="370" cy="111" r="5" fill="#26AFED" />
                      <text x="385" y="115" fill="#93C5FD" fontSize="11" fontWeight="700" fontFamily="sans-serif">SECURITY: 100%</text>

                      <rect x="60" y="210" width="130" height="42" rx="8" fill="#0f172a" stroke="#3B82F6" strokeWidth="1.5" />
                      <circle cx="80" cy="231" r="5" fill="#3B82F6" />
                      <text x="95" y="235" fill="#93C5FD" fontSize="11" fontWeight="700" fontFamily="sans-serif">STRESS: 0 ERRORS</text>

                      <rect x="350" y="210" width="130" height="42" rx="8" fill="#0f172a" stroke="#10B981" strokeWidth="1.5" />
                      <circle cx="370" cy="231" r="5" fill="#10B981" />
                      <text x="385" y="235" fill="#86EFAC" fontSize="11" fontWeight="700" fontFamily="sans-serif">AUDIT: VERIFIED</text>
                    </g>

                    {/* Scene 5: Review & Refinement */}
                    <g
                      className="stage-scene"
                      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    >
                      {/* Sprint Demo Dashboard */}
                      <rect x="80" y="45" width="380" height="250" rx="12" fill="url(#cardGrad)" stroke="#2e66f6" strokeWidth="2" />
                      <line x1="80" y1="80" x2="460" y2="80" stroke="#334155" strokeWidth="1" />
                      <text x="105" y="68" fill="#94A3B8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Stakeholder Demo &amp; Sign-off</text>

                      {/* Approval Status Card */}
                      <rect x="110" y="105" width="320" height="60" rx="8" fill="#0f172a" stroke="#10B981" strokeWidth="1.5" />
                      <circle cx="140" cy="135" r="14" fill="#10B981" fillOpacity="0.2" />
                      <path d="M133 135 L138 140 L148 130" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="165" y="131" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="sans-serif">Client Milestone Approved</text>
                      <text x="165" y="148" fill="#64748B" fontSize="11" fontFamily="sans-serif">All Acceptance Criteria Met (100%)</text>

                      {/* Performance Scores Row */}
                      <rect x="110" y="185" width="95" height="85" rx="8" fill="#0f172a" stroke="#1e293b" />
                      <text x="157" y="222" fill="#10B981" fontSize="22" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">99</text>
                      <text x="157" y="245" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="sans-serif">PERFORMANCE</text>

                      <rect x="222" y="185" width="95" height="85" rx="8" fill="#0f172a" stroke="#1e293b" />
                      <text x="269" y="222" fill="#26AFED" fontSize="22" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">100</text>
                      <text x="269" y="245" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="sans-serif">ACCESSIBILITY</text>

                      <rect x="335" y="185" width="95" height="85" rx="8" fill="#0f172a" stroke="#1e293b" />
                      <text x="382" y="222" fill="#F59E0B" fontSize="22" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">100</text>
                      <text x="382" y="245" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="sans-serif">SEO &amp; BEST PRAC</text>
                    </g>

                    {/* Scene 6: Deployment & Launch */}
                    <g
                      className="stage-scene"
                      style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    >
                      {/* Orbital Launch Pad */}
                      <circle cx="270" cy="180" r="110" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="270" cy="180" r="60" fill="#26AFED" fillOpacity="0.08" />

                      {/* Rocket Body */}
                      <path
                        className="draw-path"
                        d="M270 50 C245 105 245 170 250 205 L290 205 C295 170 295 105 270 50 Z"
                        fill="url(#ersGradient)"
                        stroke="#26AFED"
                        strokeWidth="2"
                      />
                      <circle cx="270" cy="115" r="14" fill="#0b1426" stroke="#FFFFFF" strokeWidth="2.5" />
                      
                      {/* Rocket Wings */}
                      <path d="M250 165 L220 200 L250 200 Z" fill="#2e66f6" />
                      <path d="M290 165 L320 200 L290 200 Z" fill="#2e66f6" />

                      {/* Thruster Flame */}
                      <path d="M258 205 Q270 250 282 205 Z" fill="#F59E0B" />
                      <path d="M263 205 Q270 235 277 205 Z" fill="#FCD34D" />

                      {/* Cloud Puffs */}
                      <ellipse cx="270" cy="245" rx="55" ry="16" fill="#334155" fillOpacity="0.4" />
                      <ellipse cx="230" cy="240" rx="35" ry="12" fill="#1e293b" fillOpacity="0.6" />
                      <ellipse cx="310" cy="240" rx="35" ry="12" fill="#1e293b" fillOpacity="0.6" />

                      {/* LIVE Badge */}
                      <rect x="220" y="270" width="100" height="32" rx="16" fill="#10B981" />
                      <circle cx="238" cy="286" r="4" fill="white" className="animate-ping" />
                      <circle cx="238" cy="286" r="4" fill="white" />
                      <text x="250" y="291" fill="white" fontSize="13" fontWeight="800" fontFamily="sans-serif">LIVE 24/7</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Stepper (< 1024px, No Pin) */}
      <div className="block lg:hidden px-6 py-10 max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Typography
            variant="h2"
            component="h2"
            className="capitalize !text-2xl sm:!text-3xl !font-[700] font-poppins text-slate-900"
          >
            From Idea to <span className="bg-gradient-to-r from-[#26AFED] to-[#115BD0] bg-clip-text text-transparent">Launch</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="!text-xs sm:!text-sm !font-[400] font-poppins text-slate-500 mt-2"
          >
            Our proven, transparent engineering lifecycle.
          </Typography>
        </div>

        <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-6">
          {steps.map((st, i) => (
            <Reveal key={st.num} direction="up" distance={20} delay={i * 0.04}>
              <div className="relative bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
                <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-gradient-to-r from-[#26AFED] to-[#115BD0] text-white text-xs font-bold flex items-center justify-center shadow">
                  {i + 1}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-ersPrimary font-mono">
                  {st.label}
                </span>
                <Typography
                  variant="h3"
                  className="!text-base !font-bold font-poppins text-slate-900 mt-1 mb-1.5"
                >
                  {st.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-xs sm:!text-sm font-poppins text-slate-600 leading-relaxed mb-3"
                >
                  {st.desc}
                </Typography>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {st.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2 py-0.5 rounded-full bg-blue-50 text-slate-700 text-[10px] font-medium border border-blue-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
