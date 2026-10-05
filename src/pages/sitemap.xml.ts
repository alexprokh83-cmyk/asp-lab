import type { APIRoute } from "astro";
import { IS_PREVIEW, SITE_URL } from "../config/site";
import { SLUGS, type SlugKey } from "../lib/routes";
import { localePath } from "../lib/i18n";
import { LOCALES } from "../lib/i18n";

/**
 * Production only: every route (all projects are published) with reciprocal hreflang (x-default → English).
 * Excludes drafts, the 404 page and catalogue filter variants (those are query strings, never routes).
 * In preview, or without a real domain, the sitemap is empty (no production URLs are generated).
 */
export const GET: APIRoute = () => {
  const headers = { "Content-Type": "application/xml; charset=utf-8" };
  const open = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  if (IS_PREVIEW || !SITE_URL) return new Response(`${open}\n</urlset>\n`, { headers });

  const keys = Object.keys(SLUGS) as SlugKey[];
  const url = (k: SlugKey, l: (typeof LOCALES)[number]) => SITE_URL + localePath(SLUGS[k], l);
  const entries = keys.flatMap((k) =>
    LOCALES.map((l) =>
      `  <url>\n    <loc>${url(k, l)}</loc>\n` +
      LOCALES.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${url(k, a)}"/>`).join("\n") +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url(k, "en")}"/>\n  </url>`,
    ),
  );
  return new Response(`${open}\n${entries.join("\n")}\n</urlset>\n`, { headers });
};
