/** Shared content types: maturity labels, architecture diagrams (boundary + status per node) and localized strings. */
import type { Locale, Localized } from "../lib/i18n";

export type Maturity = "confirmed" | "developing" | "planned" | "concept"; // "concept" = demonstration concept: illustrates what could be built, not what exists
export type Boundary = "local" | "external" | "unknown";
export type NodeStatus = "documented" | "conceptual" | "proposed";
export interface ArchNode { id: string; label: Localized<string>; boundary: Boundary; status: NodeStatus }
export interface Architecture { nodes: ArchNode[]; edges: [string, string][] }

export const L = (en: string, uk: string, ru: string): Localized<string> => ({ en, uk, ru });
export type { Locale, Localized };
