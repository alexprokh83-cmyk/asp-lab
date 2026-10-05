import type { ProjectCopy, Architecture, Localized } from "../types";
/** The case-study fields a repository README (or owner brief) can actually supply, per locale. */
export type CaseDetail = Pick<ProjectCopy, "potentialValue" | "context" | "implementation" | "verification" | "results" | "limitations" | "pilotRequirements" | "materials">;
export interface CaseData {
  sourceRepository: string;
  dates: { experiment: string | null; contentUpdated: string | null };
  architecture: Architecture | null;
  metricIds: string[];
  evidenceIds: string[];
  detail: Localized<CaseDetail>;
  /** fields still unknown after reading the repository */
  missingFields: string[];
}
export const REPO = (name: string) => `https://github.com/alexprokh-asp/${name}`;
