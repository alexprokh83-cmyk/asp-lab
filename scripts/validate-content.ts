/**
 * Content validation.
 *   tsx scripts/validate-content.ts            structural errors → exit 1 (part of `npm run check`)
 *   tsx scripts/validate-content.ts --release  prints "BLOCKER: …" lines for missing real content (used by check:release)
 */
import { projects, featuredProjects, usedCategories, CATEGORY_IDS } from "../src/content/projects";
import { projectsSectionCopy } from "../src/content/pages/projects-section";
import { capabilities } from "../src/content/capabilities";
import { SLUGS } from "../src/lib/routes";
import { LOCALES, type Locale } from "../src/lib/i18n";
import { translations } from "../src/lib/translations/index";
import { solutionsCopy } from "../src/content/pages/solutions";
import { localAiCopy } from "../src/content/pages/local-ai";
import { audiencesCopy } from "../src/content/pages/audiences";
import { approachCopy } from "../src/content/pages/approach";
import { aboutCopy } from "../src/content/pages/about";
import { privacyCopy } from "../src/content/pages/privacy";
import { strategyCopy } from "../src/content/pages/strategy";
import { scenarios } from "../src/content/scenarios";

const errors: string[] = [];
const blockers: string[] = [];
const err = (m: string) => errors.push(m);

const CATS = new Set<string>(CATEGORY_IDS);
const projectIds = new Set(projects.map((p) => p.id));
const filled = (s: unknown) => typeof s === "string" && s.trim().length > 0;
const isoOk = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d)) && Date.parse(d) <= Date.now();


// ---- localized completeness for content records ----
const loc = (label: string, v: Record<string, string> | undefined) => {
  for (const l of LOCALES) if (!filled(v?.[l])) err(`${label}: missing "${l}" text`);
};

// ---- projects: 13 working solutions, text in every locale ----
const orders = new Set<number>();
const slugs = new Set<string>();
if (projects.length !== 13) err(`expected 13 projects, found ${projects.length}`);
const BANNED: Record<string, RegExp> = {
  ru: /лабораторн|эксперимент|(?<![а-яё])черновик(?![а-яё])|прототип|не доказан|не задокументирован|что потребовал|доступные материалы|измерений нет|заявленн/i,
  uk: /лабораторн|експеримент|(?<![а-яіїєґ])чернетка(?![а-яіїєґ])|прототип|не доведено|не задокументовано|що потребував|доступні матеріали|вимірювань немає|заявлен/i,
  en: /laboratory experiment|\bdraft\b|prototype|not documented|not proven|available materials|no measurements|stated objective/i,
};
for (const p of projects) {
  const at = `project ${p.id}`;
  if (projectIds.size !== projects.length) err("duplicate project id");
  if (slugs.has(p.slug)) err(`${at}: duplicate slug`); slugs.add(p.slug);
  if (SLUGS[p.routeKey] !== `/lab/${p.slug}`) err(`${at}: slug "${p.slug}" does not match route ${SLUGS[p.routeKey]}`);
  if (p.categories.length < 1 || p.categories.length > 2) err(`${at}: needs 1–2 categories`);
  p.categories.forEach((c) => !CATS.has(c) && err(`${at}: unknown category ${c}`));
  if (p.featuredOrder !== null) { if (orders.has(p.featuredOrder)) err(`${at}: duplicate featuredOrder`); orders.add(p.featuredOrder); }
  if (p.repo !== null && !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(p.repo)) err(`${at}: repo must be a github.com URL or null`);
  const en = p.text.en;
  for (const l of LOCALES) {
    const t = p.text[l];
    for (const k of ["title", "subtitle", "task", "flow", "tech"] as const) if (!filled(t[k])) err(`${at}.${l}: ${k} is empty`);
    if (t.about.length < 1 || t.about.length !== en.about.length) err(`${at}.${l}: about paragraphs differ from en`);
    if (t.features.length < 3 || t.features.length !== en.features.length) err(`${at}.${l}: features count differs from en`);
    if (t.uses.length < 2 || t.uses.length !== en.uses.length) err(`${at}.${l}: uses count differs from en`);
    if (t.flow.split("→").length < 3 || t.flow.split("→").length !== en.flow.split("→").length) err(`${at}.${l}: flow steps differ from en`);
    if (!!t.flowExtra !== !!en.flowExtra) err(`${at}.${l}: flowExtra presence differs from en`);
    if (!!t.result !== !!en.result) err(`${at}.${l}: result presence differs from en`);
    if (!!t.note !== !!en.note) err(`${at}.${l}: note presence differs from en`);
    if (t.tech.split(" · ").length !== en.tech.split(" · ").length) err(`${at}.${l}: technology count differs from en`);
    const b = BANNED[l]; const all = JSON.stringify(t);
    if (b && b.test(all)) err(`${at}.${l}: contains wording that presents the project as unfinished (${all.match(b)![0]})`);
  }
}
usedCategories.forEach((c) => LOCALES.forEach((l) => !filled(projectsSectionCopy[l].categories[c]) && err(`projects section: missing label ${c}.${l}`)));
if (featuredProjects.length < 4) err("the homepage needs at least 4 featured projects");

// the language switcher carries a catalogue direction only if it is one of the real directions
import { readFileSync } from "node:fs";
{
  const sw = readFileSync("src/components/LanguageSwitcher.astro", "utf8");
  const m = sw.match(/const CATS = \[([^\]]*)\]/);
  const listed = m ? [...m[1]!.matchAll(/"([a-z]+)"/g)].map((x) => x[1]) : [];
  if (JSON.stringify([...listed].sort()) !== JSON.stringify([...CATEGORY_IDS].sort())) err("LanguageSwitcher: category whitelist differs from the project directions");
}

// ---- no test/benchmark figures in public copy (owner decision) ----
const FORBIDDEN = /\b(1[, ]?038|519|0\.121|0\.977)\b|\b48 (of|passed|із|из)|\b12 (failed|не пройдено)|\b6 (local )?(models|моделей)\b|\b449\b/i;
for (const [name, obj] of Object.entries({ projects, section: projectsSectionCopy, solutions: solutionsCopy, localAi: localAiCopy, audiences: audiencesCopy })) {
  if (FORBIDDEN.test(JSON.stringify(obj))) err(`${name}: contains a removed test/benchmark figure`);
}

// ---- capabilities ----
for (const c of capabilities) {
  loc(`capability ${c.id}`, c.label);
  c.projectIds.forEach((id) => !projectIds.has(id) && err(`capability ${c.id}: unknown project ${id}`));
  if (c.maturity !== "confirmed" && c.projectIds.length) err(`capability ${c.id}: only "confirmed" capabilities may cite projects`);
}

// ---- translations: same shape in every locale (arrays included), no empty strings, no TODO leakage ----
const walk = (v: unknown, path: string, out: Map<string, string>) => {
  if (typeof v === "string") out.set(path, v);
  else if (Array.isArray(v)) { out.set(`${path}.length`, String(v.length)); v.forEach((x, i) => walk(x, `${path}[${i}]`, out)); }
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k, out);
};
const flat = {} as Record<Locale, Map<string, string>>;
for (const l of LOCALES) { const m = new Map<string, string>(); walk(translations[l], "", m); flat[l] = m; }
for (const l of LOCALES) {
  if (l === "en") continue;
  for (const k of flat.en.keys()) if (!flat[l].has(k)) err(`translations.${l}: missing key ${k}`);
  for (const k of flat[l].keys()) if (!flat.en.has(k)) err(`translations.${l}: extra key ${k}`);
  for (const [k, v] of flat[l]) if (k.endsWith(".length") && flat.en.get(k) !== v) err(`translations.${l}: list length differs at ${k}`);
}
for (const l of LOCALES) for (const [k, v] of flat[l]) if (!k.endsWith(".length") && !filled(v)) err(`translations.${l}: empty string at ${k}`);

// ---- page copy (solutions, local-ai): same shape and lengths in all locales ----
for (const [name, copy] of [["solutions", solutionsCopy], ["local-ai", localAiCopy], ["projects", projectsSectionCopy], ["audiences", audiencesCopy], ["approach", approachCopy], ["about", aboutCopy], ["privacy", privacyCopy], ["strategy", strategyCopy]] as const) {
  const maps = {} as Record<Locale, Map<string, string>>;
  for (const l of LOCALES) { const m = new Map<string, string>(); walk(copy[l], "", m); maps[l] = m; }
  for (const l of LOCALES) {
    if (l === "en") continue;
    for (const k of maps.en.keys()) if (!maps[l].has(k)) err(`${name}.${l}: missing ${k}`);
    for (const k of maps[l].keys()) if (!maps.en.has(k)) err(`${name}.${l}: extra ${k}`);
    for (const [k, v] of maps[l]) if (k.endsWith(".length") && maps.en.get(k) !== v) err(`${name}.${l}: list length differs at ${k}`);
  }
  for (const l of LOCALES) for (const [k, v] of maps[l]) if (!k.endsWith(".length") && !filled(v)) err(`${name}.${l}: empty string at ${k}`);
}
const capIds = new Set(capabilities.map((c) => c.id));
for (const l of LOCALES) {
  for (const [aid, a] of Object.entries(audiencesCopy[l].pages)) {
    a.projectIds.forEach((id) => !projectIds.has(id) && err(`audiences.${l}.${aid}: unknown project ${id}`));
    a.capabilityIds.forEach((id) => !capIds.has(id) && err(`audiences.${l}.${aid}: unknown capability ${id}`));
    if (a.scenarios.length !== 3) err(`audiences.${l}.${aid}: needs exactly 3 scenario groups`);
    if (a.projectIds.length !== 2) err(`audiences.${l}.${aid}: needs exactly 2 related projects`);
  }
}
if (solutionsCopy.en.directions.map((d) => d.id).join() !== "automation,documents,model-selection,evaluation") err("solutions: anchors must be automation, documents, model-selection, evaluation (in that order)");
if (solutionsCopy.en.related.ids.some((id) => !projectIds.has(id))) err("solutions: a related project does not exist");
for (const l of LOCALES) {
  solutionsCopy[l].directions.forEach((d, i) => d.id !== solutionsCopy.en.directions[i]!.id && err(`solutions.${l}: direction ${i} id differs`));
  solutionsCopy[l].directions.forEach((d) => !projectIds.has(d.projectId) && err(`solutions.${l}: unknown project ${d.projectId}`));
  localAiCopy[l].chain.stages.forEach((st, i) => st.maturity !== localAiCopy.en.chain.stages[i]!.maturity && err(`local-ai.${l}: stage ${i} maturity differs from en`));
}
if (localAiCopy.en.chain.stages.length !== 8) err("local-ai: the AI Model Engineering chain must have 8 stages");

// ---- strategic addendum: scenarios A–H, implementation path, conceptual boundaries ----
if (scenarios.map((x) => x.letter).join("") !== "ABCDEFGH") err("scenarios must be A–H in order");
if (new Set(scenarios.map((x) => x.id)).size !== scenarios.length) err("scenario ids must be unique");
for (const sc of scenarios) {
  if (sc.maturity !== "concept") err(`scenario ${sc.id}: must be a demonstration concept, never a project claim`);
  if (!sc.audiences.length) err(`scenario ${sc.id}: needs at least one audience`);
  for (const l of LOCALES) {
    for (const k of ["title", "text", "example", "boundary"] as const) if (!filled(sc.copy[l][k])) err(`scenario ${sc.id}.${l}.${k} is empty`);
    if (sc.copy[l].flow.length !== sc.copy.en.flow.length) err(`scenario ${sc.id}: flow length differs in ${l}`);
  }
}
for (const l of LOCALES) {
  const c = strategyCopy[l];
  if (c.path.stages.length !== 6) err(`strategy.${l}: the path needs 6 stages`);
  if (c.model.nodes.length !== 6) err(`strategy.${l}: the conceptual model needs 6 nodes`);
  if (c.demonstrate.outcomes.length !== 7) err(`strategy.${l}: 7 possible outcomes expected`);
  if (c.deployModels.items.length !== 6) err(`strategy.${l}: 6 deployment models expected`);
}
// The laboratory infrastructure is a concept: no hardware, capacity, performance or uptime may be stated.
const HW = /\b\d+\s?(GB|TB|GiB|VRAM|vCPU|cores?|tokens?|ms|req\/s|%|x)\b|\b(RTX|A100|H100|RAM|uptime\s+of|SLA\s+of)\b/i;
if (HW.test(JSON.stringify({ strategyCopy, scenarios }).replace(/Hardware specifications, GPU models[^"]*/g, ""))) err("strategy/scenarios copy states a hardware, performance or uptime figure");

// ---- release blockers (missing real content) ----
// ---- release blockers (missing real content) ----
// Projects are published as working solutions; nothing project-related blocks a release.

if (process.argv.includes("--release")) {
  blockers.forEach((b) => console.log("BLOCKER: " + b));
  process.exit(0);
}
if (errors.length) {
  console.error(`✗ content validation failed (${errors.length}):\n` + errors.map((e) => "  • " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ content validation passed (${projects.length} projects, ${capabilities.length} capabilities, ${flat.en.size} translation keys × ${LOCALES.length} locales)`);
