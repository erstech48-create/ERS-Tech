import Head from "next/head";
import { useRouter } from "next/router";
import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://erstech.org";
const DEFAULT_TITLE = "ERS TECH - Custom Software & Blockchain Solutions";
const DEFAULT_DESCRIPTION =
  "ERS TECH is a leading software development company specializing in custom Fintech and blockchain solutions. Empower your business with robust digital innovation.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Build a BreadcrumbList schema from an array of { name, item } objects.
 * item is the full URL. The last breadcrumb may omit item (current page).
 */
function buildBreadcrumb(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      ...(crumb.item ? { item: crumb.item } : {}),
    })),
  };
}

const Default = ({
  title = "",
  description = "",
  image = "",
  canonicalUrl = "",
  noindex = false,
  publishedTime = "",
  breadcrumbs = null, // array of { name, item? }
  extraJsonLd = null, // any additional schema object (BlogPosting, FAQPage, etc.)
}) => {
  const router = useRouter();

  const finalTitle = (title && title.trim()) || DEFAULT_TITLE;
  const finalDescription = (description && description.trim()) || DEFAULT_DESCRIPTION;

  // Auto-build canonical URL when not passed or invalid
  let finalCanonical = canonicalUrl && !canonicalUrl.includes("undefined") ? canonicalUrl.trim() : "";
  if (!finalCanonical && router && router.asPath) {
    const cleanPath = router.asPath.split("?")[0].split("#")[0];
    if (cleanPath === "/" || cleanPath === "") {
      finalCanonical = `${SITE_URL}/`;
    } else {
      finalCanonical = `${SITE_URL}${cleanPath.replace(/\/+$/, "")}`;
    }
  } else if (finalCanonical) {
    if (finalCanonical === `${SITE_URL}` || finalCanonical === `${SITE_URL}/`) {
      finalCanonical = `${SITE_URL}/`;
    } else {
      finalCanonical = finalCanonical.replace(/\/+$/, "");
    }
  } else {
    finalCanonical = `${SITE_URL}/`;
  }

  // Determine Open Graph image
  let finalImage = DEFAULT_IMAGE;
  if (image && image.trim()) {
    finalImage = image.startsWith("http") ? image.trim() : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image.trim()}`;
  }

  // Determine Open Graph type
  const isBlogPost = router?.pathname?.startsWith("/blogs/") && router?.pathname !== "/blogs";
  const ogType = isBlogPost ? "article" : "website";

  const robotsDirective = noindex ? "noindex, nofollow" : "index, follow";

  // Auto-generate breadcrumbs if not provided (for pages other than home)
  let breadcrumbSchema = null;
  const crumbs = breadcrumbs;
  if (crumbs && crumbs.length > 0) {
    breadcrumbSchema = buildBreadcrumb(crumbs);
  }

  // Determine if current page uses the .hero-bg component
  const currentPath = router?.pathname || "";
  const usesHeroBg = ["/", "/home", "/about-us", "/services", "/portfolio", "/careers"].includes(currentPath);

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="author" content="ERS TECH" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="ERS TECH RSS Feed"
        href={`${SITE_URL}/rss.xml`}
      />

      {/* Preload Hero Background Image for LCP only on pages that use .hero-bg */}
      {usesHeroBg && (
        <>
          <link
            rel="preload"
            as="image"
            href="/assets/images/hero-mobile.webp"
            media="(max-width: 600px)"
            type="image/webp"
          />
          <link
            rel="preload"
            as="image"
            href="/assets/images/new-hero.webp"
            media="(min-width: 601px)"
            type="image/webp"
          />
        </>
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="ERS TECH" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {/* Touch Icons */}
      <link rel="apple-touch-icon" href="/assets/icons/og.png" />
      <meta name="apple-mobile-web-app-title" content="ERS TECH" />

      {/* Structured Data */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {extraJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(extraJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </Head>
  );
};

export default Default;

