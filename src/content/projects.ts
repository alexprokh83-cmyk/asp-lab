/** Projects showcase: 13 working solutions (src/content/project-data). Text per locale; routes from src/lib/routes.ts. */
import type { Project, CategoryId } from "./project-types";
import { group1 } from "./project-data/group1";
import { group2 } from "./project-data/group2";
import { group3 } from "./project-data/group3";
import { group4 } from "./project-data/group4";

/** Catalogue order: as delivered by the owner. */
export const projects: Project[] = [...group1, ...group2, ...group3, ...group4];

export const CATEGORY_IDS: CategoryId[] = ["documents", "requests", "voice", "assistants", "knowledge", "integrations", "qa", "evaluation"];

export const featuredProjects = projects
  .filter((p) => p.featuredOrder !== null)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));

export const projectByRouteKey = (key: string) => projects.find((p) => p.routeKey === key) ?? null;
export const projectById = (id: string) => projects.find((p) => p.id === id) ?? null;
/** Categories that actually have projects (empty ones are never offered as a filter). */
export const usedCategories = CATEGORY_IDS.filter((c) => projects.some((p) => p.categories.includes(c)));
/** Projects that state a concrete result, for the homepage results strip. */
export const projectsWithResult = projects.filter((p) => p.text.en.result);
