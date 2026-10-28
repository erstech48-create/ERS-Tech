import https from "https";

// In-memory module-level cache (60 seconds TTL)
// Ensures multiple calls during the same build or revalidation share a single request.
let cachedPosts = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000;

// Flag to log the TLS warning only once per Node process
let tlsWarningLogged = false;

/**
 * Safely fetches posts from WordPress REST API.
 *
 * TLS Verification:
 * - Verification is ON by default (rejectUnauthorized: true).
 * - Bypassed ONLY if process.env.WP_INSECURE_TLS === '1'.
 *   (Temporary workaround until the blogs.erstech.org SSL certificate is renewed).
 *
 * Failure Handling:
 * - Returns Array<Post> on success.
 * - Returns null when WordPress is unreachable, timed out, or returns invalid data.
 *   This signals to callers (e.g. getStaticProps) that WordPress failed, so they can
 *   throw an error during ISR to keep serving the last good page instead of caching
 *   a 404 or an empty page.
 *
 * @param {number} timeoutMs
 * @returns {Promise<Array|null>}
 */
export function fetchAllPosts(timeoutMs = 4000) {
  const now = Date.now();
  if (cachedPosts !== null && now - cacheTimestamp < CACHE_TTL_MS) {
    return Promise.resolve(cachedPosts);
  }

  return new Promise((resolve) => {
    // TLS verification is ON by default; disabled ONLY when WP_INSECURE_TLS === "1"
    const isInsecureTls = process.env.WP_INSECURE_TLS === "1";

    if (isInsecureTls && !tlsWarningLogged) {
      console.warn(
        "[WP] WP_INSECURE_TLS=1 is active: TLS certificate verification disabled (temporary until blogs.erstech.org certificate is renewed)."
      );
      tlsWarningLogged = true;
    }

    // TLS verification is ON by default; disabled ONLY when WP_INSECURE_TLS === '1'
    const agent = new https.Agent({
      rejectUnauthorized: !isInsecureTls,
    });

    const url = "https://blogs.erstech.org/wp-json/custom/v1/posts/?page=1&per_page=100";

    const req = https.get(url, { agent, timeout: timeoutMs }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const json = JSON.parse(data);
            if (Array.isArray(json)) {
              cachedPosts = json;
              cacheTimestamp = Date.now();
              resolve(json);
              return;
            }
          }
          console.error(`WordPress API responded with status ${res.statusCode}`);
          resolve(null);
        } catch {
          console.error("WordPress API JSON parse failed");
          resolve(null);
        }
      });
    });

    req.on("error", (err) => {
      console.error(`WordPress API network error: ${err.message}`);
      resolve(null);
    });

    req.on("timeout", () => {
      req.destroy();
      console.error(`WordPress API request timed out after ${timeoutMs}ms`);
      resolve(null);
    });
  });
}
