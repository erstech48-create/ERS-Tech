import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudy, getAllCaseStudySlugs } from "@/data/caseStudies";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CountUp from "@/components/motion/CountUp";

export default function CaseStudyPage({ study }) {
  const { scrollTo } = useLenis();
  const [activeSectionId, setActiveSectionId] = useState("");
  const pageContainerRef = useRef(null);
  const heroImageRef = useRef(null);

  if (!study) return null;

  const {
    theme,
    hero,
    sections,
    cta,
    slug,
    name,
    seoTitle,
    seoDescription,
    ogImage,
  } = study;
  const canonicalUrl = `https://erstech.org/portfolio/${slug}`;
  const fullOgImage = ogImage?.startsWith("http")
    ? ogImage
    : `https://erstech.org${ogImage || "/assets/images/white-logo.png"}`;

  // Helper to check if image is valid and not a TODO placeholder
  const isValidImage = (img) => {
    return Boolean(img && img.src && !img.src.startsWith("TODO"));
  };

  // ChapterNav scroll-spy with IntersectionObserver
  useEffect(() => {
    if (!sections || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Attribute-driven GSAP Animations across all 10 studies
  useEffect(() => {
    if (prefersReducedMotion() || !pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 1) Hero kicker fade + H1 words reveal
      gsap.fromTo(
        ".case-kicker",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      const h1El = pageContainerRef.current.querySelector(".case-h1-heading");
      if (h1El) {
        const text = h1El.innerText || "";
        const words = text.trim().split(/\s+/);
        h1El.innerHTML = words
          .map(
            (w) =>
              `<span class="word-mask-wrapper"><span class="word-mask-inner">${w}</span></span>`
          )
          .join(" ");

        const wordInners = h1El.querySelectorAll(".word-mask-inner");
        gsap.fromTo(
          wordInners,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      // Hero image scale 1.06 -> 1 + clip-path reveal
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.06, clipPath: "inset(6% round 16px)" },
          {
            scale: 1,
            clipPath: "inset(0% round 16px)",
            duration: 1,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      }

      // Ambient radial glow slow drift
      gsap.to(".ambient-glow-layer", {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero-container",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 4) Each Section animations
      const secElements = pageContainerRef.current.querySelectorAll(".case-study-section");
      secElements.forEach((secEl) => {
        // Section index + title mask reveal
        const titleWords = secEl.querySelectorAll(".section-title-word");
        if (titleWords.length) {
          gsap.fromTo(
            titleWords,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: { trigger: secEl, start: "top 85%", once: true },
            }
          );
        }

        // Section blocks (p, h3, h4, ul) batch fade-up
        const blocks = secEl.querySelectorAll(".case-block-item");
        if (blocks.length) {
          gsap.fromTo(
            blocks,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: secEl, start: "top 80%", once: true },
            }
          );
        }

        // Result blocks accent bar scaleY draw
        const resultBars = secEl.querySelectorAll(".result-accent-bar");
        if (resultBars.length) {
          gsap.fromTo(
            resultBars,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: secEl, start: "top 80%", once: true },
            }
          );
        }

        // Layout 'cards': stagger .08
        const cards = secEl.querySelectorAll(".case-layout-card");
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: secEl, start: "top 80%", once: true },
            }
          );
        }

        // Layout 'tools': chips pop stagger .03
        const toolChips = secEl.querySelectorAll(".case-tool-chip");
        if (toolChips.length) {
          gsap.fromTo(
            toolChips,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: "back.out(1.8)",
              scrollTrigger: { trigger: secEl, start: "top 80%", once: true },
            }
          );
        }

        // Section images: clip-path inset reveal + inner parallax y +-6%
        const secImgWrapper = secEl.querySelector(".section-image-wrapper");
        const secImg = secEl.querySelector(".section-image-el");
        if (secImgWrapper) {
          gsap.fromTo(
            secImgWrapper,
            { clipPath: "inset(8% round 12px)" },
            {
              clipPath: "inset(0% round 12px)",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: secImgWrapper, start: "top 85%", once: true },
            }
          );
        }
        if (secImg) {
          gsap.fromTo(
            secImg,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: secImgWrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }
      });

      // 7) CTA block popup scale .95->1
      const ctaBox = pageContainerRef.current.querySelector(".case-cta-box");
      if (ctaBox) {
        gsap.fromTo(
          ctaBox,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaBox,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, [slug]);

  // JSON-LD structured data: BreadcrumbList + Article
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://erstech.org/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: "https://erstech.org/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: name,
        item: canonicalUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: hero?.h1 || `${name} Case Study`,
    description: seoDescription,
    image: [fullOgImage],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "ERS TECH",
      url: "https://erstech.org",
      logo: {
        "@type": "ImageObject",
        url: "https://erstech.org/assets/images/white-logo.png",
      },
    },
  };

  return (
    <>
      <Head>
        <title>{seoTitle || `${name} Case Study | ERS TECH`}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle || `${name} Case Study`} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:site_name" content="ERS TECH" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle || `${name} Case Study`} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={fullOgImage} />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </Head>

      {/* Reading Progress Top Bar matching case study theme accent */}
      <ScrollProgress color={theme?.accent || "#26AFED"} />

      <main
        ref={pageContainerRef}
        className="min-h-screen text-slate-800 font-poppins selection:bg-ersPrimary selection:text-white"
        style={{
          backgroundColor: theme?.sectionBg || "#ffffff",
          color: theme?.textColor || "#263238",
        }}
      >
        {/* Ambient Radial Glow Effect */}
        <div className="case-hero-container relative overflow-hidden w-full">
          <div
            className="ambient-glow-layer absolute inset-0 pointer-events-none will-change-transform"
            style={{
              background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${
                theme?.accent || "#ff5c16"
              }18, transparent 70%)`,
            }}
          />

          {/* Hero Section */}
          <section className="relative z-10 w-[90%] max-w-[1240px] mx-auto pt-28 md:pt-36 pb-16 md:pb-24">
            <div className="max-w-4xl">
              {/* Optional Client / Project Logo */}
              {isValidImage(hero?.logo) && (
                <div className="mb-6 h-12 w-auto relative">
                  <img
                    src={hero.logo.src}
                    alt={hero.logo.alt || `${name} Logo`}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              )}

              {/* Slogan / Kicker */}
              {hero?.kicker && (
                <p
                  className="case-kicker text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-3"
                  style={{ color: theme?.accent || "#ff5c16" }}
                >
                  {hero.kicker}
                </p>
              )}

              {/* Exactly one H1 for SEO with visually-hidden semantic prefix */}
              <h1
                className="case-h1-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.15]"
                style={{ color: theme?.headingColor || "#111827" }}
              >
                {hero?.h1?.includes(name) ? (
                  hero.h1
                ) : (
                  <>
                    <span className="sr-only">{name}: </span>
                    {hero?.h1 || hero?.title || name}
                  </>
                )}
              </h1>

              {hero?.subtitle && (
                <p
                  className="text-base md:text-lg leading-relaxed max-w-3xl"
                  style={{ color: theme?.textColor || "#555555" }}
                >
                  {hero.subtitle}
                </p>
              )}
            </div>

            {/* Hero Main Mockup (Video or Image) */}
            {hero?.video?.src ? (
              <div
                ref={heroImageRef}
                className="mt-12 rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-black will-change-transform relative"
              >
                <video
                  src={hero.video.src}
                  poster={hero.video.poster || hero.image?.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-auto block rounded-2xl"
                />
              </div>
            ) : isValidImage(hero?.image) ? (
              <div
                ref={heroImageRef}
                className="mt-12 rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white will-change-transform"
              >
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt || `${name} Platform Mockup`}
                  width={1400}
                  height={800}
                  priority
                  unoptimized
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : null}
          </section>
        </div>

        {/* Dynamic Sections with Desktop Sticky ChapterNav (>= 1280px) */}
        <div className="w-[90%] max-w-[1240px] mx-auto pb-24">
          <div className="flex gap-12 items-start">
            {/* Main Content Sections Column */}
            <div className="flex-1 min-w-0 space-y-20 md:space-y-28">
              {sections &&
                sections.map((section, idx) => {
                  const secNum = String(idx + 1).padStart(2, "0");
                  const totalSec = String(sections.length).padStart(2, "0");
                  return (
                    <section
                      key={section.id || idx}
                      id={section.id}
                      className="case-study-section scroll-mt-28"
                    >
                      {/* Section Title with Index '01 / 0N' */}
                      {section.title && (
                        <div className="mb-8">
                          <span
                            className="text-xs uppercase tracking-widest font-bold block mb-1"
                            style={{ color: theme?.accent || "#ff5c16" }}
                          >
                            {secNum} / {totalSec}
                          </span>
                          <h2
                            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight pb-3 inline-block relative"
                            style={{ color: theme?.headingColor || "#ffffff" }}
                          >
                            <span className="section-title-word">
                              {section.title}
                            </span>
                            <span
                              className="block h-1 w-12 rounded-full mt-2"
                              style={{
                                backgroundColor: theme?.accent || "#ff5c16",
                              }}
                            />
                          </h2>
                        </div>
                      )}

                      {/* Layout: CARDS */}
                      {section.layout === "cards" && section.cards && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {section.cards.map((card, cIdx) => {
                            const isLastSingle =
                              section.cards.length % 3 === 1 &&
                              cIdx === section.cards.length - 1;
                            return (
                              <div
                                key={cIdx}
                                className={`case-layout-card p-6 sm:p-7 rounded-[12px] transition-transform duration-200 hover:-translate-y-1.5 ${
                                  isLastSingle ? "lg:col-start-2" : ""
                                }`}
                                style={{
                                  backgroundColor: theme?.cardBg || "#f8f9fa",
                                  boxShadow:
                                    theme?.cardShadow ||
                                    "0px 4px 16px rgba(0,0,0,0.06)",
                                }}
                              >
                                <h3
                                  className="text-lg sm:text-xl font-bold mb-3"
                                  style={{
                                    color: theme?.headingColor || "#111827",
                                  }}
                                >
                                  {card.title}
                                </h3>
                                <p
                                  className="text-sm leading-relaxed"
                                  style={{
                                    color: theme?.textColor || "#263238",
                                  }}
                                >
                                  {card.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Layout: STATS */}
                      {section.layout === "stats" && section.stats && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                          {section.stats.map((stat, sIdx) => (
                            <div
                              key={sIdx}
                              className="case-block-item p-6 rounded-[12px] text-center border border-slate-200/80 shadow-sm"
                              style={{
                                backgroundColor: theme?.cardBg || "#f8f9fa",
                              }}
                            >
                              <div
                                className="text-3xl sm:text-4xl font-extrabold mb-2"
                                style={{ color: theme?.accent || "#ff5c16" }}
                              >
                                <CountUp value={stat.value} />
                              </div>
                              <div
                                className="text-xs sm:text-sm font-medium"
                                style={{
                                  color: theme?.textColor || "#555555",
                                }}
                              >
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout: TOOLS / SPECS */}
                      {section.layout === "tools" && section.tools && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {section.tools.map((tool, tIdx) => (
                            <div
                              key={tIdx}
                              className="case-tool-chip p-4 rounded-[12px] flex items-center gap-3 border border-slate-200/80 shadow-sm"
                              style={{
                                backgroundColor: theme?.cardBg || "#f8f9fa",
                              }}
                            >
                              {tool.icon && !tool.icon.startsWith("TODO") && (
                                <img
                                  src={tool.icon}
                                  alt=""
                                  aria-hidden="true"
                                  className="w-6 h-6 object-contain"
                                />
                              )}
                              <span
                                className="text-sm font-medium"
                                style={{
                                  color: theme?.headingColor || "#111827",
                                }}
                              >
                                {typeof tool === "string" ? tool : tool.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Standard Blocks (text, h3, h4, ul, result) */}
                      {section.blocks && section.blocks.length > 0 && (
                        <div className="space-y-6 max-w-4xl">
                          {section.blocks.map((block, bIdx) => {
                            if (block.type === "p") {
                              return (
                                <p
                                  key={bIdx}
                                  className="case-block-item text-base sm:text-[17px] leading-[1.8]"
                                  style={{
                                    color: theme?.textColor || "#bbbbbb",
                                  }}
                                >
                                  {block.text}
                                </p>
                              );
                            }

                            if (block.type === "h3") {
                              return (
                                <h3
                                  key={bIdx}
                                  className="case-block-item text-xl sm:text-2xl font-bold pt-4 pb-1"
                                  style={{
                                    color: theme?.headingColor || "#ffffff",
                                  }}
                                >
                                  {block.text}
                                </h3>
                              );
                            }

                            if (block.type === "h4") {
                              return (
                                <h4
                                  key={bIdx}
                                  className="case-block-item text-lg font-semibold pt-2"
                                  style={{
                                    color: theme?.headingColor || "#ffffff",
                                  }}
                                >
                                  {block.text}
                                </h4>
                              );
                            }

                            if (block.type === "ul") {
                              return (
                                <ul
                                  key={bIdx}
                                  className="case-block-item space-y-3 pl-2 sm:pl-4"
                                >
                                  {block.items.map((item, iIdx) => {
                                    const isLabelled =
                                      typeof item === "object" && item.label;
                                    return (
                                      <li
                                        key={iIdx}
                                        className="flex items-start gap-3 text-sm sm:text-base leading-relaxed"
                                        style={{
                                          color: theme?.textColor || "#bbbbbb",
                                        }}
                                      >
                                        <span
                                          className="inline-block mt-2 w-2 h-2 rounded-full flex-shrink-0"
                                          style={{
                                            backgroundColor:
                                              theme?.accent || "#ff5c16",
                                          }}
                                        />
                                        <div>
                                          {isLabelled ? (
                                            <>
                                              <strong
                                                style={{
                                                  color:
                                                    theme?.headingColor ||
                                                    "#ffffff",
                                                }}
                                              >
                                                {item.label}:
                                              </strong>{" "}
                                              <span>{item.text}</span>
                                            </>
                                          ) : (
                                            <span>{item}</span>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              );
                            }

                            if (block.type === "result") {
                              return (
                                <div
                                  key={bIdx}
                                  className="case-block-item relative p-5 rounded-lg border-l-4 my-4 overflow-hidden"
                                  style={{
                                    backgroundColor:
                                      theme?.cardBg || "#1c1c1c",
                                    borderColor: theme?.accent || "#ff5c16",
                                  }}
                                >
                                  <div
                                    className="result-accent-bar absolute left-0 top-0 bottom-0 w-1"
                                    style={{
                                      backgroundColor:
                                        theme?.accent || "#ff5c16",
                                    }}
                                  />
                                  <div className="flex items-center gap-2 mb-1">
                                    <span
                                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                                      style={{
                                        backgroundColor: `${
                                          theme?.accent || "#ff5c16"
                                        }33`,
                                        color: theme?.accent || "#ff5c16",
                                      }}
                                    >
                                      Result
                                    </span>
                                  </div>
                                  <p
                                    className="text-sm sm:text-base font-medium"
                                    style={{
                                      color: theme?.headingColor || "#ffffff",
                                    }}
                                  >
                                    {block.text}
                                  </p>
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}

                      {/* Section Bottom Image with clip-path + inner parallax */}
                      {isValidImage(section.image) && (
                        <div className="section-image-wrapper mt-8 rounded-xl overflow-hidden border border-slate-200/80 shadow-xl bg-white relative">
                          <img
                            src={section.image.src}
                            alt={
                              section.image.alt ||
                              `${section.title} illustration`
                            }
                            loading="lazy"
                            className="section-image-el w-full h-auto object-contain will-change-transform"
                          />
                        </div>
                      )}
                    </section>
                  );
                })}
            </div>

            {/* Chapter Nav Sidebar (Desktop >= 1280px) */}
            <aside className="hidden xl:block w-72 flex-shrink-0">
              <div className="sticky top-28 p-5 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-md shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                  Table of Contents
                </p>
                <nav className="space-y-1">
                  {sections &&
                    sections.map((section, idx) => {
                      const isActive = activeSectionId === section.id;
                      return (
                        <button
                          key={section.id || idx}
                          type="button"
                          onClick={() =>
                            scrollTo(`#${section.id}`, { offset: -100 })
                          }
                          className={`block w-full text-left text-xs font-medium py-2 px-3 rounded-lg transition-all ${
                            isActive
                              ? "font-semibold text-white shadow-sm"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          }`}
                          style={
                            isActive
                              ? { backgroundColor: theme?.accent || "#26AFED" }
                              : {}
                          }
                        >
                          <span className="opacity-70 mr-1.5">
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          {section.title}
                        </button>
                      );
                    })}
                </nav>
              </div>
            </aside>
          </div>

          {/* Bottom Call to Action */}
          <section className="pt-16">
            <div
              className="case-cta-box p-8 sm:p-12 md:p-16 rounded-2xl text-center relative overflow-hidden border border-slate-200/80 shadow-sm"
              style={{
                backgroundColor: theme?.cardBg || "#f8f9fa",
                background: `radial-gradient(circle at 50% 50%, ${
                  theme?.accent || "#ff5c16"
                }12 0%, ${theme?.cardBg || "#f8f9fa"} 100%)`,
              }}
            >
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                style={{ color: theme?.headingColor || "#111827" }}
              >
                {cta?.title || "Have a Project in Mind? Let's Discuss!"}
              </h2>
              <p
                className="text-sm sm:text-base max-w-xl mx-auto mb-8"
                style={{ color: theme?.textColor || "#555555" }}
              >
                Let our engineering and blockchain experts help you build
                scalable, enterprise-ready digital solutions.
              </p>
              <Link
                href={cta?.href || "/services#contact"}
                className="inline-block px-8 py-3.5 rounded-full font-semibold text-white transition-all transform hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: theme?.accent || "#ff5c16",
                  boxShadow: `0 10px 25px -5px ${theme?.accent || "#ff5c16"}66`,
                }}
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllCaseStudySlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const study = getCaseStudy(params?.slug);

  if (!study) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      study,
    },
  };
}
