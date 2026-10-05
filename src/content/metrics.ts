/**
 * Numerical results are intentionally NOT published on the site (owner decision): test counts, pass/fail counts,
 * Garak attempt counts and scores, benchmark sizes and speed statements have all been removed.
 * The Metric model, MetricTable and the validator stay in place so a figure can be added later, together with its
 * source, date, run conditions and interpretation limit. Until then this list is empty and pages describe method and limits in words.
 */
import type { Metric } from "./types";

export const metrics: Metric[] = [];
export const metricById = (id: string) => metrics.find((m) => m.id === id);
