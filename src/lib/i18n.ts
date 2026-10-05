/**
 * Locale types and helpers.
 *
 * English is the default public language (no /en/ prefix).
 * Ukrainian (/uk/) and Russian (/ru/) are full locales, not abbreviated translations.
 */

export type Locale = "en" | "uk" | "ru";

export type Localized<T> = Record<Locale, T>;

/** All supported locales in priority order. */
export const LOCALES: readonly Locale[] = ["en", "uk", "ru"] as const;

/** The default locale — rendered without a prefix in the URL. */
export const DEFAULT_LOCALE: Locale = "en";

/** Locale prefixes used in URLs (en has no prefix). */
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: "",
  uk: "/uk",
  ru: "/ru",
} as const;

/** Human-readable locale names (in the locale's own language). */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
} as const;

/** BCP-47 language tags for HTML lang attribute. */
export const LOCALE_LANG: Record<Locale, string> = {
  en: "en",
  uk: "uk",
  ru: "ru",
} as const;

/**
 * Returns the locale from a URL pathname, defaulting to "en".
 * Recognises /uk/... and /ru/... prefixes only.
 */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/uk" || pathname.startsWith("/uk/")) return "uk";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  return "en";
}

/**
 * Returns the pathname without its locale prefix.
 * e.g. "/uk/solutions" → "/solutions", "/" → "/", "/uk/" → "/"
 */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of (["uk", "ru"] as const)) {
    const prefix = `/${locale}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

/**
 * Returns the canonical pathname for a given slug and locale.
 * Locale home routes end with /; all other paths do not.
 */
export function localePath(slug: string, locale: Locale): string {
  const prefix = LOCALE_PREFIX[locale];
  if (slug === "/") {
    return `${prefix}/`;
  }
  // Ensure slug starts with /
  const normalised = slug.startsWith("/") ? slug : `/${slug}`;
  return `${prefix}${normalised}`;
}

/**
 * Returns the equivalent paths for all locales for a given slug.
 * Used by the LanguageSwitcher and hreflang generation.
 */
export function allLocalePaths(slug: string): Localized<string> {
  return {
    en: localePath(slug, "en"),
    uk: localePath(slug, "uk"),
    ru: localePath(slug, "ru"),
  };
}
