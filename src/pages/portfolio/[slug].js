import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
} from "@/data/caseStudies";

export default function CaseStudyPage({ study }) {
  if (!study) return null;

  const { theme, hero, sections, cta, slug, name, seoTitle, seoDescription, ogImage } = study;
  const canonicalUrl = `https://erstech.org/portfolio/${slug}`;
  const fullOgImage = ogImage?.startsWith("http")
    ? ogImage
    : `https://erstech.org${ogImage || "/assets/images/white-logo.png"}`;

  // Helper to check if image is valid and not a TODO placeholder
  const isValidImage = (img) => {
    return Boolean(img && img.src && !img.src.startsWith("TODO"));
  };

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

      <main
        className="min-h-screen text-slate-800 font-poppins selection:bg-[#ff5c16] selection:text-white"
        style={{
          backgroundColor: theme?.sectionBg || "#ffffff",
          color: theme?.textColor || "#263238",
        }}
      >
        {/* Ambient Radial Glow Effect */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${theme?.accent || "#ff5c16"}15, transparent 70%)`,
          }}
        >
          {/* Hero Section */}
          <section className="w-[90%] max-w-[1240px] mx-auto pt-28 md:pt-36 pb-16 md:pb-24">
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
                  className="text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-3"
                  style={{ color: theme?.accent || "#ff5c16" }}
                >
                  {hero.kicker}
                </p>
              )}

              {/* Exactly one H1 for SEO with visually-hidden semantic prefix if needed */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.15]"
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

            {/* Hero Main Mockup Image */}
            {isValidImage(hero?.image) && (
              <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white">
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
            )}
          </section>
        </div>

        {/* Dynamic Sections */}
        <div className="w-[90%] max-w-[1240px] mx-auto pb-24 space-y-20 md:space-y-28">
          {sections &&
            sections.map((section, idx) => {
              return (
                <section
                  key={section.id || idx}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  {/* Section Title */}
                  {section.title && (
                    <div className="mb-8">
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight pb-3 inline-block relative"
                        style={{ color: theme?.headingColor || "#ffffff" }}
                      >
                        {section.title}
                        <span
                          className="block h-1 w-12 rounded-full mt-2"
                          style={{ backgroundColor: theme?.accent || "#ff5c16" }}
                        />
                      </h2>
                    </div>
                  )}

                  {/* Layout: CARDS (e.g. Challenges / Key Features) */}
                  {section.layout === "cards" && section.cards && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.cards.map((card, cIdx) => {
                        const isLastSingle =
                          section.cards.length % 3 === 1 &&
                          cIdx === section.cards.length - 1;
                        return (
                          <div
                            key={cIdx}
                            className={`p-6 sm:p-7 rounded-[12px] transition-transform duration-200 hover:-translate-y-1 ${
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
                              style={{ color: theme?.headingColor || "#111827" }}
                            >
                              {card.title}
                            </h3>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: theme?.textColor || "#263238" }}
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
                          className="p-6 rounded-[12px] text-center border border-slate-200/80 shadow-sm"
                          style={{ backgroundColor: theme?.cardBg || "#f8f9fa" }}
                        >
                          <div
                            className="text-3xl sm:text-4xl font-extrabold mb-2"
                            style={{ color: theme?.accent || "#ff5c16" }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="text-xs sm:text-sm font-medium"
                            style={{ color: theme?.textColor || "#555555" }}
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
                          className="p-4 rounded-[12px] flex items-center gap-3 border border-slate-200/80 shadow-sm"
                          style={{ backgroundColor: theme?.cardBg || "#f8f9fa" }}
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
                            style={{ color: theme?.headingColor || "#111827" }}
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
                              className="text-base sm:text-[17px] leading-[1.8]"
                              style={{ color: theme?.textColor || "#bbbbbb" }}
                            >
                              {block.text}
                            </p>
                          );
                        }

                        if (block.type === "h3") {
                          return (
                            <h3
                              key={bIdx}
                              className="text-xl sm:text-2xl font-bold pt-4 pb-1"
                              style={{ color: theme?.headingColor || "#ffffff" }}
                            >
                              {block.text}
                            </h3>
                          );
                        }

                        if (block.type === "h4") {
                          return (
                            <h4
                              key={bIdx}
                              className="text-lg font-semibold pt-2"
                              style={{ color: theme?.headingColor || "#ffffff" }}
                            >
                              {block.text}
                            </h4>
                          );
                        }

                        if (block.type === "ul") {
                          return (
                            <ul key={bIdx} className="space-y-3 pl-2 sm:pl-4">
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
                                                theme?.headingColor || "#ffffff",
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
                              className="p-5 rounded-lg border-l-4 my-4"
                              style={{
                                backgroundColor: theme?.cardBg || "#1c1c1c",
                                borderColor: theme?.accent || "#ff5c16",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                                  style={{
                                    backgroundColor: `${theme?.accent || "#ff5c16"}33`,
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

                  {/* Section Bottom Image (if specified and valid) */}
                  {isValidImage(section.image) && (
                    <div className="mt-8 rounded-xl overflow-hidden border border-slate-200/80 shadow-xl bg-white">
                      <img
                        src={section.image.src}
                        alt={section.image.alt || `${section.title} illustration`}
                        loading="lazy"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                </section>
              );
            })}

          {/* Bottom Call to Action */}
          <section className="pt-8">
            <div
              className="p-8 sm:p-12 md:p-16 rounded-2xl text-center relative overflow-hidden border border-slate-200/80 shadow-sm"
              style={{
                backgroundColor: theme?.cardBg || "#f8f9fa",
                background: `radial-gradient(circle at 50% 50%, ${theme?.accent || "#ff5c16"}12 0%, ${theme?.cardBg || "#f8f9fa"} 100%)`,
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
                Let our engineering and blockchain experts help you build scalable,
                enterprise-ready digital solutions.
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
    fallback: false, // Unknown slug returns a 404 page
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
