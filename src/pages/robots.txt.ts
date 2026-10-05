import type { APIRoute } from "astro";
import { IS_PREVIEW, SITE_URL } from "../config/site";

/** Preview: discourage indexing (not access control). Production: allow, and point at the sitemap only when a real domain exists. */
export const GET: APIRoute = () => {
  const body = IS_PREVIEW || !SITE_URL
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
