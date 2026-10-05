/**
 * Route registry.
 *
 * Single source of truth for all site slugs.
 * Localized equivalents are generated automatically from these slugs.
 *
 * Rule:
 *   – Locale home routes end with /
 *   – All other canonical paths do NOT end with /
 */

import { localePath, allLocalePaths, type Locale, type Localized } from "./i18n";

// ---------------------------------------------------------------------------
// Slug registry
// ---------------------------------------------------------------------------

export const SLUGS = {
  home: "/",
  solutions: "/solutions",
  localAi: "/local-ai",
  business: "/business",
  education: "/education",
  publicSector: "/public-sector",
  lab: "/lab",
  approach: "/approach",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",

  // Project pages (one per project in src/content/project-data)
  labOpenaiApiDesk: "/lab/openai-api-desk",
  labQaLlmLab: "/lab/qa-llm-lab",
  labAutoLlmBenchmark: "/lab/auto-llm-benchmark",
  labJiraBugSummary: "/lab/jira-bug-summary",
  labCalendarAiChronos: "/lab/calendar-ai-chronos",
  labLocalTranscription: "/lab/local-transcription",
  labVoiceBugReport: "/lab/voice-bug-report",
  labTelegramBotTesting: "/lab/telegram-bot-testing",
  labJiraToGithubMigration: "/lab/jira-to-github-migration",
  labYoutubeToText: "/lab/youtube-to-text",
  labAiDictation: "/lab/ai-dictation",
  labTelegramSecretary: "/lab/telegram-secretary",
  labFeedbackRouting: "/lab/feedback-routing",
} as const;

export type SlugKey = keyof typeof SLUGS;

// ---------------------------------------------------------------------------
// Typed route helpers
// ---------------------------------------------------------------------------

/**
 * Returns the canonical path for a slug in a given locale.
 * English paths have no prefix; Ukrainian paths start with /uk/; Russian with /ru/.
 */
export function route(slug: string, locale: Locale): string {
  return localePath(slug, locale);
}

/**
 * Returns an object with the canonical path for every locale for a slug.
 * Useful for generating hreflang tags and language switcher links.
 */
export function allRoutes(slug: string): Localized<string> {
  return allLocalePaths(slug);
}

/**
 * Returns the route for a named slug key and locale.
 */
export function namedRoute(key: SlugKey, locale: Locale): string {
  return route(SLUGS[key], locale);
}

// ---------------------------------------------------------------------------
// Static-path generation helpers (for Astro getStaticPaths)
// ---------------------------------------------------------------------------

/**
 * Returns all locale variants as static-path params for a given slug.
 * Used in [...locale] catch-all pages.
 */
export function staticLocaleParams() {
  return [
    { params: { locale: undefined } },   // en (default, no prefix)
    { params: { locale: "uk" } },
    { params: { locale: "ru" } },
  ];
}

// ---------------------------------------------------------------------------
// Static-path generation: one registry → every localized route
// ---------------------------------------------------------------------------

import { LOCALES } from "./i18n";

/** All (slug key × locale) combinations for the single `[...slug].astro` page. */
export function allStaticRoutes(): { key: SlugKey; locale: Locale; param: string | undefined }[] {
  return (Object.keys(SLUGS) as SlugKey[]).flatMap((key) =>
    LOCALES.map((locale) => {
      const p = localePath(SLUGS[key], locale).replace(/^\/|\/$/g, "");
      return { key, locale, param: p === "" ? undefined : p };
    }),
  );
}
