import { fetchAllPosts } from "@/utils/fetchWordPress";

const SITE_URL = "https://erstech.org";

const STATIC_PAGES = [
  { loc: "/", lastmod: "2024-12-16" },
  { loc: "/about-us", lastmod: "2024-12-16" },
  { loc: "/services", lastmod: "2024-12-16" },
  { loc: "/portfolio", lastmod: "2024-12-16" },
  { loc: "/blogs", lastmod: "2024-12-16" },
  { loc: "/careers", lastmod: "2024-12-16" },
  { loc: "/pricing", lastmod: "2024-12-16" },
];

// In-memory cache for sitemap XML (10 minutes TTL)
let cachedSitemapXml = null;
let lastSitemapFetchTime = 0;
const SITEMAP_CACHE_TTL_MS = 10 * 60 * 1000;

// Holds the last successful sitemap generated with blog posts
let lastGoodSitemapXml = null;

function toW3CDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr.replace(" ", "T") + "Z");
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
  } catch {
    return null;
  }
}

function buildXml(posts) {
  const staticUrls = STATIC_PAGES.map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  ).join("\n");

  const blogUrls = (posts || [])
    .map((post) => {
      const lastmod = toW3CDate(post.date);
      return lastmod
        ? `  <url>\n    <loc>${SITE_URL}/blogs/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
        : `  <url>\n    <loc>${SITE_URL}/blogs/${post.slug}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;
}

export default async function handler(req, res) {
  // Add X-Robots-Tag: noindex on /api/sitemap responses
  res.setHeader("X-Robots-Tag", "noindex");
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "s-maxage=3600, stale-while-revalidate=86400"
  );

  const now = Date.now();
  if (cachedSitemapXml && now - lastSitemapFetchTime < SITEMAP_CACHE_TTL_MS) {
    return res.status(200).send(cachedSitemapXml);
  }

  try {
    const posts = await fetchAllPosts(4000);
    if (Array.isArray(posts) && posts.length > 0) {
      const xml = buildXml(posts);
      cachedSitemapXml = xml;
      lastGoodSitemapXml = xml;
      lastSitemapFetchTime = now;
      return res.status(200).send(xml);
    }
  } catch (err) {
    console.error("Sitemap generation error:", err.message);
  }

  // If WordPress is unreachable / failed and last good sitemap exists, serve that
  if (lastGoodSitemapXml) {
    return res.status(200).send(lastGoodSitemapXml);
  }

  // Only if none exists, serve the static URLs
  const fallbackXml = buildXml([]);
  return res.status(200).send(fallbackXml);
}
