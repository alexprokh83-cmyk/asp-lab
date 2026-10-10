/**
 * Central site configuration (single validated interface).
 *
 * Real values come from environment variables (see .env.example), so preview
 * development works without them. Anything missing stays null and is rendered
 * as an honest unavailable state / TODO in preview. `npm run check:release`
 * reports the missing values as release blockers.
 */

export const TODO = "TODO — REAL VALUE REQUIRED";

export type SiteMode = "preview" | "production";

const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
const read = (key: string): string | null => {
  const v = (env[key] ?? "").trim();
  return v === "" ? null : v;
};

function httpsUrl(value: string | null, hostRe?: RegExp): string | null {
  if (!value) return null;
  try {
    const u = new URL(value);
    if (u.protocol !== "https:") return null;
    if (hostRe && !hostRe.test(u.hostname)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

/** A preview origin or localhost is never a production canonical domain. */
function canonicalOrigin(value: string | null): string | null {
  const u = httpsUrl(value);
  if (!u) return null;
  const host = new URL(u).hostname;
  if (host === "localhost" || /\.(vercel\.app|netlify\.app|pages\.dev)$/.test(host)) return null;
  return u.replace(/\/$/, "");
}

export const BRAND_NAME = "ASP Lab";

/** preview (default) | production — production is set only via SITE_MODE=production. */
export const SITE_MODE: SiteMode = read("SITE_MODE") === "production" ? "production" : "preview";
export const IS_PREVIEW = SITE_MODE === "preview";
export const IS_RELEASE = SITE_MODE === "production";

export const SITE_URL: string | null = canonicalOrigin(read("PUBLIC_SITE_URL"));
export const SITE_URL_READY = SITE_URL !== null;

/** Public link of the project bot (not a secret). Override with PUBLIC_TELEGRAM_URL; never put a bot token here. */
const DEFAULT_TELEGRAM_URL = "https://t.me/ASP_Lab_Bot";
export const TELEGRAM_URL: string | null = httpsUrl(read("PUBLIC_TELEGRAM_URL") ?? DEFAULT_TELEGRAM_URL, /^(t\.me|telegram\.me)$/);
export const TELEGRAM_READY = TELEGRAM_URL !== null;
/** null → the link is not rendered at all. */
const DEFAULT_GITHUB_URL = "https://github.com/alexprokh-asp";
export const GITHUB_URL: string | null = httpsUrl(read("PUBLIC_GITHUB_URL") ?? DEFAULT_GITHUB_URL, /^github\.com$/);

/** Public endpoint only; credentials belong in the proxy's server-side secret store. */
function apiProxyUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return value;
  return httpsUrl(value);
}

/** Finder always has a same-origin API route; the public env var only overrides it. */
export const ASP_FIND_PROXY_URL: string =
  apiProxyUrl(read("PUBLIC_ASP_FIND_PROXY_URL")) ?? "/api/asp-automation-finder";

/** Privacy page facts — all unknown until supplied by the owner. */
export const OPERATOR_NAME: string | null = read("PUBLIC_OPERATOR_NAME");
export const PRIVACY_CONTACT: string | null = read("PUBLIC_PRIVACY_CONTACT");
export const HOSTING_PROVIDER: string | null = read("PUBLIC_HOSTING_PROVIDER");

export const features = { contactForm: true, analytics: false } as const;

/** Full canonical URL for a pathname; the bare path while no real domain is configured. */
export function canonicalUrl(pathname: string): string {
  return SITE_URL ? SITE_URL + pathname : pathname;
}
