/** Phase 4 data model. Four concepts stay separate: project type, capability maturity,
 *  editorial status, evidence verification. null = unknown → rendered as TODO, never 0 / today. */
import type { Locale, Localized } from "../lib/i18n";
import type { SlugKey } from "../lib/routes";

export type ProjectCategory = "processAutomation" | "documentsAndSpeech" | "localModels" | "aiEvaluation";
export type ProjectType = "laboratory-experiment" | "engineering-prototype" | "client-pilot" | "production-system";
export type Maturity = "confirmed" | "developing" | "planned" | "concept"; // "concept" = demonstration concept: illustrates what could be built, not what exists
export type Publication = "draft" | "published";
export type Verification = "owner-reported" | "source-reviewed";

export type Boundary = "local" | "external" | "unknown";
export type NodeStatus = "documented" | "conceptual" | "proposed";
export interface ArchNode { id: string; label: Localized<string>; boundary: Boundary; status: NodeStatus }
export interface Architecture { nodes: ArchNode[]; edges: [string, string][] }

export interface ProjectCopy {
  title: string;
  positioning: string;
  summary: string;
  potentialValue: string | null;
  context: { problem: string | null; inputs: string[]; scope: string[]; exclusions: string[] };
  implementation: { summary: string | null; technologies: string[]; decisions: string[] };
  verification: { summary: string | null; scenarios: string[]; criteria: string[]; conditions: string[] };
  results: { summary: string | null; whatItProves: string[]; whatItDoesNotProve: string[] };
  limitations: string[];
  pilotRequirements: string[];
  /** compact process sequence + available-materials line for cards */
  flow: string[];
  materials: string;
}

export interface Project {
  id: string;
  slug: string;
  routeKey: SlugKey;
  originalName: string;
  categories: ProjectCategory[]; // max 2
  featuredOrder: number | null;
  projectType: ProjectType;
  capabilityMaturity: Maturity;
  publicationStatus: Publication;
  sourceRepository: string | null;
  dates: { experiment: string | null; contentUpdated: string | null };
  copy: Localized<ProjectCopy>;
  architecture: Architecture | null;
  metricIds: string[];
  evidenceIds: string[];
  relatedProjectIds: string[];
  missingFields: string[];
}

export interface Metric {
  id: string;
  projectId: string; // a project id or a supporting-project id
  runKey: string;    // internal content key, not an external run ID
  externalRunId: string | null;
  name: Localized<string>;
  value: number | null;
  unit: Localized<string>;
  definition: Localized<string>;
  date: string | null;
  conditions: Localized<string[]> | null;
  sourceIds: string[];
  interpretationLimit: Localized<string>;
}

export type Provenance = "owner-supplied-brief" | "repository" | "report" | "configuration" | "workflow-export" | "real-screenshot" | "anonymized-example";
export interface Evidence {
  id: string;
  title: Localized<string>;
  type: "brief" | "report" | "configuration" | "workflow" | "screenshot" | "example" | "repository";
  source: string | null; // URL or local artifact path
  date: string | null;
  version: string | null; // version or commit
  provenance: Provenance;
  verification: Verification;
  supports: Localized<string>;
  limits: Localized<string>;
}

export const L = (en: string, uk: string, ru: string): Localized<string> => ({ en, uk, ru });
export type { Locale, Localized };
