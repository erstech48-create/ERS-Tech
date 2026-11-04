import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudy, getAllCaseStudySlugs } from "@/data/caseStudies";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CountUp from "@/components/motion/CountUp";

export default function CaseStudyPage({ study, meta = null, review = null, more = [] }) {
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
  const accent = theme?.accent || "#26AFED";
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
      <ScrollProgress color={accent} />

      <article
        ref={pageContainerRef}
        className="cs-page font-poppins selection:bg-ersPrimary selection:text-white"
        style={{
          "--cs-accent": accent,
          "--cs-text": theme?.textColor || "#334155",
          "--cs-heading": theme?.headingColor || "#0f172a",
          "--cs-card": theme?.cardBg || "#f8fafc",
          backgroundColor: theme?.sectionBg || "#ffffff",
        }}
      >
        {/* ---------- Hero ---------- */}
        <header className="case-hero-container cs-hero">
          <div className="ambient-glow-layer cs-glow" aria-hidden="true" />
          <div className="cs-wrap cs-hero-inner">
            <nav className="cs-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/portfolio">Portfolio</Link>
              <span>/</span>
              <b>{name}</b>
            </nav>

            {isValidImage(hero?.logo) && (
              <img src={hero.logo.src} alt={hero.logo.alt || `${name} logo`} className="cs-logo" />
            )}
            {hero?.kicker && <p className="case-kicker cs-kicker">{hero.kicker}</p>}

            <h1 className="case-h1-heading cs-h1">
              {hero?.h1?.includes(name) ? (
                hero.h1
              ) : (
                <>
                  <span className="sr-only">{name}: </span>
                  {hero?.h1 || hero?.title || name}
                </>
              )}
            </h1>

            <p className="cs-sub">{hero?.subtitle || seoDescription}</p>

            {meta && (
              <dl className="cs-facts">
                <div>
                  <dt>Industry</dt>
                  <dd>{meta.industry}</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>{meta.platform}</dd>
                </div>
                <div>
                  <dt>Tech stack</dt>
                  <dd>{meta.stack}</dd>
                </div>
              </dl>
            )}

            {hero?.video?.src ? (
              <div ref={heroImageRef} className="cs-media cs-media-dark">
                <video
                  src={hero.video.src}
                  poster={hero.video.poster || hero.image?.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
            ) : isValidImage(hero?.image) ? (
              <div ref={heroImageRef} className="cs-media">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt || `${name} platform mockup`}
                  width={1400}
                  height={800}
                  priority
                  unoptimized
                />
              </div>
            ) : null}
          </div>
        </header>

        {/* ---------- Body: sticky contents + sections ---------- */}
        <div className="cs-wrap cs-body">
          <aside className="cs-toc" aria-label="On this page">
            <div className="cs-toc-box">
              <p>On this page</p>
              <nav>
                {sections?.map((section, idx) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <button
                      key={section.id || idx}
                      type="button"
                      onClick={() => scrollTo(`#${section.id}`, { offset: -100 })}
                      className={isActive ? "cs-toc-on" : ""}
                    >
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                      {section.title}
                    </button>
                  );
                })}
              </nav>
              <Link href={cta?.href || "/services#contact"} className="cs-toc-cta">
                Start a similar project →
              </Link>
            </div>
          </aside>

          <div className="cs-content">
            {sections?.map((section, idx) => {
              const secNum = String(idx + 1).padStart(2, "0");
              return (
                <section key={section.id || idx} id={section.id} className="case-study-section cs-section">
                  {section.title && (
                    <div className="cs-sec-head">
                      <span className="cs-sec-num">{secNum}</span>
                      <h2>
                        <span className="section-title-word">{section.title}</span>
                      </h2>
                    </div>
                  )}

                  {section.layout === "cards" && section.cards && (
                    <div className="cs-cards">
                      {section.cards.map((card, cIdx) => (
                        <div key={cIdx} className="case-layout-card cs-card">
                          <span className="cs-card-num">{String(cIdx + 1).padStart(2, "0")}</span>
                          <h3>{card.title}</h3>
                          <p>{card.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.layout === "stats" && section.stats && (
                    <div className="cs-stats">
                      {section.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="case-block-item cs-stat">
                          <b>
                            <CountUp value={stat.value} />
                          </b>
                          <span>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.layout === "tools" && section.tools && (
                    <div className="cs-tools">
                      {section.tools.map((tool, tIdx) => (
                        <div key={tIdx} className="case-tool-chip cs-tool">
                          {tool.icon && !tool.icon.startsWith("TODO") && (
                            <img src={tool.icon} alt="" aria-hidden="true" />
                          )}
                          <span>{typeof tool === "string" ? tool : tool.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.blocks && section.blocks.length > 0 && (
                    <div className="cs-blocks">
                      {section.blocks.map((block, bIdx) => {
                        if (block.type === "p")
                          return (
                            <p key={bIdx} className="case-block-item cs-p">
                              {block.text}
                            </p>
                          );
                        if (block.type === "h3")
                          return (
                            <h3 key={bIdx} className="case-block-item cs-h3">
                              {block.text}
                            </h3>
                          );
                        if (block.type === "h4")
                          return (
                            <h4 key={bIdx} className="case-block-item cs-h4">
                              {block.text}
                            </h4>
                          );
                        if (block.type === "ul")
                          return (
                            <ul key={bIdx} className="case-block-item cs-ul">
                              {block.items.map((item, iIdx) => {
                                const isLabelled = typeof item === "object" && item.label;
                                return (
                                  <li key={iIdx}>
                                    <span className="cs-dot" aria-hidden="true" />
                                    <div>
                                      {isLabelled ? (
                                        <>
                                          <strong>{String(item.label).replace(/:+\s*$/, "")}:</strong> <span>{item.text}</span>
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
                        if (block.type === "result")
                          return (
                            <div key={bIdx} className="case-block-item cs-result">
                              <div className="result-accent-bar" />
                              <span>Result</span>
                              <p>{block.text}</p>
                            </div>
                          );
                        return null;
                      })}
                    </div>
                  )}

                  {isValidImage(section.image) && (
                    <figure className="section-image-wrapper cs-figure">
                      <img
                        src={section.image.src}
                        alt={section.image.alt || `${section.title} illustration`}
                        loading="lazy"
                        className="section-image-el"
                      />
                    </figure>
                  )}
                </section>
              );
            })}

            {review && (
              <figure className="cs-review">
                <div className="cs-review-q" aria-hidden="true">“</div>
                <blockquote>{review.text}</blockquote>
                <figcaption>
                  <span className="cs-review-av" aria-hidden="true">
                    {review.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span>
                    <b>{review.name}</b>
                    <em>
                      Client · {review.project}, {review.kind}
                    </em>
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>

        {/* ---------- CTA + more case studies ---------- */}
        <div className="cs-wrap cs-end">
          <section className="case-cta-box cs-cta">
            <h2>{cta?.title || "Have a Project in Mind? Let's Discuss!"}</h2>
            <p>Let our engineering and blockchain experts help you build scalable, enterprise-ready digital solutions.</p>
            <div className="cs-cta-btns">
              <Link href={cta?.href || "/services#contact"} className="cs-btn">
                Get in Touch →
              </Link>
              <Link href="/portfolio" className="cs-btn cs-btn-ghost">
                All projects
              </Link>
            </div>
          </section>

          {more?.length > 0 && (
            <section className="cs-more" aria-label="More case studies">
              <h2>More case studies</h2>
              <div className="cs-more-grid">
                {more.map((m) => (
                  <Link key={m.slug} href={`/portfolio/${m.slug}`} className="cs-more-card">
                    {m.image && (
                      <span className="cs-more-img">
                        <img src={m.image} alt="" loading="lazy" />
                      </span>
                    )}
                    <span className="cs-more-txt">
                      <b>{m.name}</b>
                      <span>{m.title}</span>
                      <em>Read case study →</em>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
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

// Project facts shown under the hero (kept here so caseStudies.js stays content-only)
const CASE_META = {
  aconomy: { industry: "Fintech · Crypto", platform: "Web & Mobile", stack: "Next.js · Node.js · MongoDB" },
  salharo: { industry: "E-commerce", platform: "Web", stack: "Next.js · Node.js · MongoDB" },
  wise1ne: { industry: "HR Tech · SaaS", platform: "Web & Mobile", stack: "React · React Native · Node.js · MongoDB" },
  focusmonk: { industry: "Productivity · AI", platform: "Web, Mobile & Desktop", stack: "React · React Native · Electron · Node.js" },
  bccoin: { industry: "Fintech · Crypto", platform: "Web", stack: "Next.js · Node.js · MongoDB" },
  "a-bot": { industry: "AI · Crypto", platform: "Telegram Bot & Web", stack: "Next.js · Node.js · MongoDB" },
  quikipay: { industry: "Payments", platform: "Web", stack: "React · Laravel · MySQL" },
  liftsplit: { industry: "Mobility", platform: "iOS & Android", stack: "React Native · Node.js · MongoDB" },
  koker: { industry: "Fintech · Crypto", platform: "Web", stack: "React · Node.js · MongoDB" },
  "card-access": { industry: "Fintech · Crypto Cards", platform: "Web", stack: "React · Node.js · MongoDB" },
};

export async function getStaticProps({ params }) {
  const fs = await import("fs");
  const path = await import("path");
  const exists = (src) =>
    typeof src === "string" && src.startsWith("/") && fs.existsSync(path.join(process.cwd(), "public", src));

  const raw = getCaseStudy(params?.slug);
  if (!raw) {
    return { notFound: true };
  }

  // Drop images whose files are missing so the page never shows a broken image
  const study = JSON.parse(JSON.stringify(raw));
  if (study.hero?.image && !exists(study.hero.image.src)) delete study.hero.image;
  if (study.hero?.video && !exists(study.hero.video.src)) delete study.hero.video;
  if (study.hero?.logo && !exists(study.hero.logo.src)) delete study.hero.logo;
  (study.sections || []).forEach((sec) => {
    if (sec.image && !exists(sec.image.src)) delete sec.image;
  });

  const { reviewForSlug } = await import("@/data/reviews");
  const others = getAllCaseStudySlugs().filter((s) => s !== study.slug);
  const start = Math.max(0, getAllCaseStudySlugs().indexOf(study.slug)) % Math.max(1, others.length);
  const more = [0, 1, 2]
    .map((k) => others[(start + k) % others.length])
    .filter(Boolean)
    .map((s) => {
      const o = getCaseStudy(s);
      const img = o?.hero?.image?.src || o?.ogImage;
      return {
        slug: s,
        name: o?.name || s,
        title: o?.hero?.title || o?.seoTitle?.split("|")[0]?.trim() || "",
        image: exists(img) ? img : null,
      };
    });

  return {
    props: {
      study,
      meta: CASE_META[study.slug] || null,
      review: reviewForSlug(study.slug),
      more,
    },
  };
}
