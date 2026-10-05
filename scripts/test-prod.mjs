#!/usr/bin/env node
/** Builds a throw-away PRODUCTION-mode site into .dist-prod with placeholder values (example.org, a dummy t.me link)
 *  and verifies canonical / hreflang / sitemap / robots. Cross-platform (no inline env vars). Nothing here is deployed. */
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
const env = { ...process.env, SITE_MODE: "production", PUBLIC_SITE_URL: "https://example.org", PUBLIC_TELEGRAM_URL: "https://t.me/example_bot", PUBLIC_GITHUB_URL: "https://github.com/alexprokh-asp" };
rmSync(".dist-prod", { recursive: true, force: true });
const b = spawnSync("npx", ["astro", "build", "--outDir", ".dist-prod"], { stdio: "pipe", env, shell: true, encoding: "utf8" });
if (!/page\(s\) built/.test(b.stdout + b.stderr)) { console.log(b.stdout + b.stderr); process.exit(1); }
const v = spawnSync(process.execPath, ["scripts/verify-seo.mjs", ".dist-prod", "https://example.org"], { stdio: "inherit" });
rmSync(".dist-prod", { recursive: true, force: true });
process.exit(v.status ?? 1);
