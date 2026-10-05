#!/usr/bin/env node
/** Production SEO verification for a build made with SITE_MODE=production + a real-looking domain (see test-prod.mjs).
 *  Checks canonical (self, per locale, slash policy), reciprocal hreflang + x-default, og tags, noindex on drafts,
 *  sitemap = indexable pages only, robots.txt. */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIR = process.argv[2] || ".dist-prod";
const SITE = process.argv[3] || "https://example.org";
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(DIR).filter((f) => f.endsWith("index.html") && !f.includes("_astro"));
const fails = [];
const urlPath = (f) => { const r = "/" + relative(DIR, f).split(sep).slice(0, -1).join("/"); return r === "/" ? "/" : r; };
const expectedCanonical = (path) => (/^\/(uk|ru)?$/.test(path) ? (path === "/" ? "/" : path + "/") : path);
const page = {};
for (const f of pages) page[urlPath(f)] = readFileSync(f, "utf8");
const tag = (h, re) => [...h.matchAll(re)].map((m) => m[1]);

const indexable = [];
for (const [path, h] of Object.entries(page)) {
  const lang = path.startsWith("/uk") ? "uk" : path.startsWith("/ru") ? "ru" : "en";
  const noindex = /name="robots" content="noindex/.test(h);
  if (noindex) fails.push(`${path}: published page unexpectedly noindex`);
  if (noindex) continue;
  indexable.push(path);
  const canon = tag(h, /<link rel="canonical" href="([^"]+)"/g);
  const want = SITE + expectedCanonical(path);
  if (canon.length !== 1 || canon[0] !== want) fails.push(`${path}: canonical ${canon} (expected ${want})`);
  if (!h.includes(`<html lang="${lang}"`)) fails.push(`${path}: wrong html lang`);
  const alts = Object.fromEntries([...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  for (const k of ["en", "uk", "ru", "x-default"]) if (!alts[k]) fails.push(`${path}: missing hreflang ${k}`);
  if (alts["x-default"] !== alts.en) fails.push(`${path}: x-default must equal the English URL`);
  if (alts[lang] !== want) fails.push(`${path}: hreflang ${lang} must be self (${alts[lang]})`);
  for (const l of ["en", "uk", "ru"]) {
    const target = (alts[l] || "").replace(SITE, "").replace(/(.)\/$/, "$1");
    const th = page[target];
    if (!th) { fails.push(`${path}: hreflang ${l} target ${alts[l]} does not exist`); continue; }
    const back = Object.fromEntries([...th.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
    if (back[lang] !== want) fails.push(`${path}: hreflang not reciprocal with ${target}`);
  }
  if (!new RegExp(`<meta property="og:url" content="${want}"`).test(h)) fails.push(`${path}: og:url mismatch`);
  if (!h.includes(`content="${SITE}/og-image.jpg"`)) fails.push(`${path}: og:image missing`);
  if (!/<meta property="og:title"/.test(h) || !/<meta name="description"/.test(h)) fails.push(`${path}: missing og:title/description`);
}
// Slash policy on every canonical emitted
for (const p of indexable) { const c = expectedCanonical(p); if (p !== "/" && !/^\/(uk|ru)$/.test(p) && c.endsWith("/")) fails.push(`${p}: non-home canonical must not end with /`); }

// Sitemap = exactly the indexable pages
const sm = readFileSync(join(DIR, "sitemap.xml"), "utf8");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const want = indexable.map((p) => SITE + expectedCanonical(p)).sort();
if (JSON.stringify([...locs].sort()) !== JSON.stringify(want)) fails.push(`sitemap differs from indexable pages (${locs.length} vs ${want.length})`);
if (locs.some((l) => l.includes("?"))) fails.push("sitemap contains a query string (filter variants must not be listed)");
const robots = readFileSync(join(DIR, "robots.txt"), "utf8");
if (!/Allow: \//.test(robots) || !robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fails.push("robots.txt must allow and point to the sitemap in production");
if (!existsSync(join(DIR, "og-image.jpg"))) fails.push("og-image.jpg missing");
const nf = readFileSync(join(DIR, "404.html"), "utf8");
if (!/noindex/.test(nf)) fails.push("404.html must be noindex");

console.log(`production SEO: ${Object.keys(page).length} pages, ${indexable.length} indexable, ${locs.length} sitemap URLs`);
if (fails.length) { console.log("FAILED:\n" + fails.map((x) => "  • " + x).join("\n")); process.exit(1); }
console.log("✓ production SEO verification passed");
