/**
 * Content validation helpers.
 * Used by check:release to identify launch blockers.
 */
import { IS_RELEASE } from "../config/site";

export type ValidationResult = {
  ok: boolean;
  blockers: string[];
  warnings: string[];
};

/** Marks a value as missing in preview mode. Returns the placeholder string. */
export function todo(description: string): string {
  return `TODO — ${description}`;
}

/** Returns true when a value is a real value, not a TODO placeholder. */
export function isReal(value: string | null | undefined): boolean {
  if (value == null) return false;
  if (value.startsWith("TODO")) return false;
  return value.trim().length > 0;
}

/**
 * In release mode, asserts that a required value is real.
 * In preview mode, logs a warning but does not throw.
 */
export function requireReal(value: string | null | undefined, fieldName: string): void {
  if (!isReal(value)) {
    const msg = `Missing required value: ${fieldName}`;
    if (IS_RELEASE) {
      throw new Error(`[RELEASE BLOCKER] ${msg}`);
    }
    // In preview, silently allow — check:release will catch these
  }
}
