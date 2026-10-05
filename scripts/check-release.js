#!/usr/bin/env node
/**
 * check:release — separates CODE failures from CONTENT blockers.
 *   Code failures    → run `npm run check` (astro check + tsc) and `npm test`.
 *   Content blockers → missing real values listed below. Exit 1 while any remain.
 * Values come from process.env and .env (same names as .env.example).
 */
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const env = { ...process.env };
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const get = (k) => (env[k] ?? "").trim();
const content = [];
const warnings = [];

if (get("SITE_MODE") !== "production") content.push('SITE_MODE is not "production" (the preview build is noindex)');

const site = get("PUBLIC_SITE_URL");
try {
  const u = new URL(site);
  if (u.protocol !== "https:" || u.hostname === "localhost" || /\.(vercel\.app|netlify\.app|pages\.dev)$/.test(u.hostname))
    content.push("PUBLIC_SITE_URL must be the real https production domain (not localhost or a preview origin)");
} catch { content.push("PUBLIC_SITE_URL is not set (canonical + hreflang need a real domain)"); }

try {
  const u = new URL(get("PUBLIC_TELEGRAM_URL"));
  if (u.protocol !== "https:" || !/^(t\.me|telegram\.me)$/.test(u.hostname)) content.push("PUBLIC_TELEGRAM_URL must be an https t.me link");
} catch { content.push("PUBLIC_TELEGRAM_URL is not set (production-release blocker: the Telegram CTA would be unavailable)"); }

for (const [k, why] of [["PUBLIC_OPERATOR_NAME", "site operator"], ["PUBLIC_PRIVACY_CONTACT", "privacy contact"], ["PUBLIC_HOSTING_PROVIDER", "hosting provider"]])
  if (!get(k)) content.push(`${k} is not set (privacy page: ${why})`);

if (!get("PUBLIC_GITHUB_URL")) warnings.push("PUBLIC_GITHUB_URL not set — GitHub link stays hidden (allowed)");

// Content-model blockers come from the validator (featured projects, reviewed evidence, run conditions).
try {
  const out = execSync("npx tsx scripts/validate-content.ts --release", { encoding: "utf8" });
  out.split(/\r?\n/).filter((l) => l.startsWith("BLOCKER: ")).forEach((l) => content.push(l.slice(9)));
} catch (e) { console.log("✗ content validator crashed (code failure)"); process.exitCode = 1; }

let code = 0;
try { execSync("npx astro check", { stdio: "pipe" }); console.log("✓ astro check passed"); }
catch { console.log("✗ astro check FAILED (code failure)"); code = 1; }
try { execSync("npx tsx scripts/validate-content.ts", { stdio: "pipe" }); console.log("✓ content structure valid"); }
catch (e) { console.log("✗ content structure INVALID (code failure):\n" + String(e.stderr || e.stdout)); code = 1; }

console.log("\nASP Lab — release check\n");
if (content.length) { console.log(`CONTENT BLOCKERS (${content.length}):`); content.forEach((b) => console.log("  • " + b)); }
if (warnings.length) { console.log(`\nWARNINGS (${warnings.length}):`); warnings.forEach((w) => console.log("  • " + w)); }
console.log(content.length || code ? "\nRelease BLOCKED." : "\nRelease checks passed.");
process.exit(content.length || code ? 1 : 0);
