/**
 * Translation registry.
 * Import the `t()` helper to access localized strings in components.
 */
import { en } from "./en";
import { uk } from "./uk";
import { ru } from "./ru";
import type { Locale } from "../i18n";
export type { TranslationDictionary } from "./en";

export const translations = { en, uk, ru } as const;

/**
 * Returns the translation dictionary for the given locale.
 * There is no silent fallback to English — every locale must have its own complete dictionary.
 */
export function t(locale: Locale): typeof en {
  return translations[locale];
}
