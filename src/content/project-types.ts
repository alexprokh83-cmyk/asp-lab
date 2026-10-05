/** Projects = real, working solutions shown as a showcase. One text block per locale; names of technologies are not translated. */
import type { Locale, Localized } from "./types";
import type { SlugKey } from "../lib/routes";

/** The 8 solution directions (same taxonomy as /solutions). */
export type CategoryId = "documents" | "requests" | "voice" | "assistants" | "knowledge" | "integrations" | "qa" | "evaluation";

export interface ProjectText {
  /** full title (page H1, metadata) */
  title: string;
  /** short name used on cards and in breadcrumbs when the full title is long */
  name?: string;
  /** one strong sentence with the main value */
  subtitle: string;
  /** the task it solves, in one line (catalogue card) */
  task: string;
  /** "About the project": short paragraphs */
  about: string[];
  /** process as "step → step → step" */
  flow: string;
  /** optional second flow, e.g. an additional scenario */
  flowExtra?: string;
  /** features; "Lead § text" renders the lead in bold */
  features: string[];
  /** possible areas of application */
  uses: string[];
  /** optional closing note under the applications (e.g. how to develop the solution) */
  note?: { title?: string; text: string };
  /** technologies separated by " · " */
  tech: string;
  /** a real result stated in the source, shown prominently */
  result?: string;
}

export interface Project {
  id: string;
  slug: string;
  routeKey: SlugKey;
  categories: CategoryId[]; // 1–2
  featuredOrder: number | null;
  /** public repository, shown as a link only when set */
  repo: string | null;
  text: Localized<ProjectText>;
}

export type { Locale, Localized };
export const P = (
  title: string, subtitle: string, task: string, about: string[], flow: string, features: string[], uses: string[], tech: string,
  opt: { name?: string; flowExtra?: string; note?: { title?: string; text: string }; result?: string } = {},
): ProjectText => ({ title, subtitle, task, about, flow, features, uses, tech, ...opt });
