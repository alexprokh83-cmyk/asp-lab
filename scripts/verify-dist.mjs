#!/usr/bin/env node
/** Post-build checks on dist/: html lang, one <h1>, no /en/, unique <title>, no href="#", no external font hosts. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk("dist").filter((f) => f.endsWith("index.html") && !f.startsWith("dist/_astro"));
const fails = [];
const titles = new Map();
const langOf = (f) => (f.startsWith("dist/uk/") ? "uk" : f.startsWith("dist/ru/") ? "ru" : "en");

if (files.length !== 72) fails.push(`expected 54 pages (24 routes × 3 locales), found ${files.length}`);
if (walk("dist").some((f) => f.startsWith("dist/en/"))) fails.push("dist/en/ must not exist");

for (const f of files) {
  const h = readFileSync(f, "utf8");
  const lang = langOf(f);
  if (!h.includes(`<html lang="${lang}"`)) fails.push(`${f}: wrong <html lang> (expected ${lang})`);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fails.push(`${f}: ${h1} <h1> elements`);
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) fails.push(`${f}: missing <title>`);
  else if (titles.has(title)) fails.push(`${f}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, f);
  if (/href="#"/.test(h)) fails.push(`${f}: contains href="#"`);
  if (/fonts\.googleapis|fonts\.gstatic/.test(h)) fails.push(`${f}: external font host`);
  if (/href="\/en\//.test(h)) fails.push(`${f}: link to /en/`);
  if (!/name="robots" content="noindex/.test(h) && !/rel="canonical"/.test(h)) fails.push(`${f}: neither noindex nor canonical`);
}
import { existsSync } from "node:fs";
for (const f of ["dist/404.html", "dist/robots.txt", "dist/sitemap.xml"]) if (!existsSync(f)) fails.push(`${f} missing`);
if (existsSync("dist/robots.txt") && !/Disallow: \//.test(readFileSync("dist/robots.txt", "utf8")) && !/Sitemap:/.test(readFileSync("dist/robots.txt", "utf8"))) fails.push("robots.txt is neither preview-disallow nor production-sitemap");
if (existsSync("dist/sitemap.xml") && /noindex/.test(readFileSync("dist/robots.txt", "utf8"))) fails.push("unexpected robots content");
const nf = existsSync("dist/404.html") ? readFileSync("dist/404.html", "utf8") : "";
if (nf && (nf.match(/<h1[\s>]/g) || []).length !== 1) fails.push("404.html must have exactly one h1");
// internal references: every root-relative href must resolve to a built page or file
const known = new Set(files.map((f) => "/" + f.replace(/^dist\//, "").replace(/index\.html$/, "").replace(/\/$/, "")));
for (const f of files) {
  const h = readFileSync(f, "utf8");
  for (const m of h.matchAll(/href="(\/[^"#?]*)/g)) {
    const t = m[1].replace(/\/$/, "") || "/";
    if (t === "/" || known.has(t) || known.has(t.replace(/^\//, "")) || existsSync("dist" + m[1]) ) continue;
    fails.push(`${f}: broken internal link ${m[1]}`);
  }
}
// Brand and Telegram: the old names must not appear; every CTA page must link to the configured bot and only to it.
const envFile = existsSync(".env") ? readFileSync(".env", "utf8") : "";
const tg = (envFile.match(/^PUBLIC_TELEGRAM_URL=(.+)$/m) || [])[1]?.trim() || process.env.PUBLIC_TELEGRAM_URL || "";
const withCta = (f) => !/\/privacy\//.test(f) && !/dist\/(uk\/|ru\/)?privacy\//.test(f);
for (const f of files) {
  const h = readFileSync(f, "utf8");
  const text = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  if (/AI Automation Lab|AI Laboratory|Automation System Process|Automation Systems &amp; Processes|EMDULA|AI Studio Bot/i.test(text)) fails.push(`${f}: old brand or bot name present`);
  if (/\bTODO\b|REAL VALUE REQUIRED|missing-value/.test(h)) fails.push(`${f}: a TODO marker is rendered`);
  if (/class="[^"]*\btg--off\b/.test(h)) fails.push(`${f}: Telegram shown as unavailable (bot link not configured)`);
  if (!/dist\/(uk\/|ru\/)?privacy\//.test(f) && !/dist\/404/.test(f) && !/href="https:\/\/t\.me\/ASP_Lab_Bot"|href="https:\/\/t\.me\/[A-Za-z0-9_]+"/.test(h)) fails.push(`${f}: no Telegram CTA`);
  if (/>undefined<|undefined —|— undefined|\[object Object\]/.test(text)) fails.push(`${f}: unresolved value rendered`);
  if (!/<title>[^<]*ASP Lab/.test(h) && !/dist\/404\.html/.test(f)) fails.push(`${f}: title lacks "ASP Lab"`);
  if (!/<header[\s\S]*?<img src="\/logo\/asp-lab-logo\.png" alt="ASP Lab" width="\d+" height="\d+"/.test(h) && !/dist\/404\.html/.test(f)) fails.push(`${f}: header logo image missing or without alt/dimensions`);
  if (/favicon\.svg/.test(h)) fails.push(`${f}: still references the old SVG favicon`);
  if (tg) {
    const links = [...h.matchAll(/href="(https:\/\/t\.me\/[^"]*)"/g)].map((m) => m[1]);
    if (links.some((l) => l !== tg)) fails.push(`${f}: Telegram link differs from configured ${tg}`);
    const ctaPage = withCta(f) && !/dist\/404/.test(f);
    if (ctaPage && !links.length) fails.push(`${f}: no Telegram CTA`);
  }
}
for (const a of ["dist/logo/asp-lab-logo.png", "dist/favicon.ico", "dist/favicon-32.png", "dist/apple-touch-icon.png", "dist/og-image.jpg"]) if (!existsSync(a)) fails.push(`${a} missing`);
console.log(`checked ${files.length} pages`);
if (fails.length) { console.log("FAILED:\n" + fails.map((x) => "  • " + x).join("\n")); process.exit(1); }
console.log("✓ dist verification passed");
