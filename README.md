# ASP Lab

Static multilingual site (English default, Ukrainian, Russian). Astro + TypeScript, plain CSS design tokens, minimal vanilla JS. No analytics. Contact submissions use one small same-origin Vercel Function; the rest of the site remains static. The homepage includes the existing ASP Find browser wizard; diagnostic submission still requires a separately deployed secure API proxy (see `docs/asp-find-integration.md`).
Palette: white + blue + navy. Fonts: IBM Plex Sans/Mono, self-hosted (Latin + Cyrillic, SIL OFL licenses in `public/fonts/`).

## Setup and commands
```
npm install
npm run dev            # development (preview mode, noindex)
npm run build          # static site into dist/
npm run preview
npm run check          # astro check + tsc + content validation (typed translations: a missing uk/ru key fails)
npm test               # verifies dist/ after a build: lang, one H1, unique titles, no /en/, no href="#", internal links, 404/robots/sitemap
npm run test:prod      # throw-away production-mode build with placeholder values: canonical, reciprocal hreflang, x-default, og, sitemap, robots
npm run check:release  # separates CODE failures from CONTENT blockers; exits 1 while real values are missing
npm run audit:browser  # Playwright + axe-core: filters, menu focus, skip link, inert background, no-JS nav, targets, WCAG scan, print, lab vitals
npm run check:layout   # every page at 320/375/768/1024/1440/1920 px: no horizontal overflow, one H1
```
The two browser scripts need Python with `playwright` and a Chromium (`pip install playwright && playwright install chromium`); run them after `npm run build`.
Lab vitals are localhost measurements, not field data.

## Where things live
| What | Where |
|---|---|
| Configuration (single validated interface) | `src/config/site.ts`, values from `.env` (see `.env.example`) |
| Route registry; every page × locale comes from one file | `src/lib/routes.ts`, `src/pages/[...slug].astro` |
| Shared UI copy, nav, home, metadata (en/uk/ru) | `src/lib/translations/{en,uk,ru}.ts` (`en.ts` defines the shape) |
| Page copy | `src/content/pages/*.ts` (solutions, local-ai, audiences, approach, about, privacy) |
| Projects (13 working solutions) | `src/content/project-data/group*.ts` (ru source + en/uk), model in `project-types.ts`, catalogue UI strings in `src/content/pages/projects-section.ts` |
| Capability maturity | `src/content/capabilities.ts` |
| Palette and typography | `src/styles/tokens.css`; hero artwork `src/assets/hero-automation.jpg` (supplied, unmodified) |
| Blockers, hosting, future form | `docs/content-blockers.md`, `docs/hosting.md`, `docs/future-contact.md` |

## Common tasks
**Update a translation.** Edit the key in `en.ts`, then add it to `uk.ts` and `ru.ts` (TypeScript fails if one is missing). Page copy files are validated for identical structure and list lengths in all three languages by `npm run validate:content`. Production never falls back silently to English.

**Add a project.** Add a record (id, slug, `routeKey`, 1–2 directions, text in ru/en/uk) to a file in `src/content/project-data/` and register its route in `src/lib/routes.ts`. The project then appears in the catalogue, in the filter of its directions, on its own page and in the sitemap. The validator checks that all three languages have the same structure and that no wording presents a project as unfinished. Only a result stated by the owner is shown (`result`); nothing is invented.

**Telegram and the domain.** The bot (`https://t.me/ASP_Lab_Bot`) and the GitHub profile are built in as defaults, so the site works without a `.env`. To change them, or at launch, copy `.env.example` to `.env` and set `PUBLIC_TELEGRAM_URL`, `PUBLIC_SITE_URL` and `SITE_MODE=production`. The site only ever needs the public t.me link. **Never put a bot token in this project, in `.env` or in any URL.**

**Contact form (n8n).** `/contact` uses a localized form that posts to the same-origin Vercel Function `/api/asp-contact`; the function reads `ASP_CONTACT_N8N_WEBHOOK_URL` and the server-only `ASP_FINDER_N8N_HEADER_KEY` at runtime, then forwards only the validated contact fields. Set the test URL in Vercel Preview and the production URL in Vercel Production. The n8n Contact workflow must validate the `X-ASP-Finder-Key` header before this can be considered protected; see `docs/future-contact.md`. The live webhook and its auth contract have not been verified from this checkout.

**ASP Finder (n8n).** The homepage Finder posts to same-origin `/api/asp-automation-finder`. Set `PUBLIC_ASP_FIND_PROXY_URL=/api/asp-automation-finder` at build time, `ASP_FINDER_N8N_WEBHOOK_URL` to the Finder webhook per Vercel environment, and `ASP_FINDER_N8N_HEADER_KEY` as a server-only secret. It is a separate API contract from Contact; details and response schema are in `docs/asp-find-integration.md` and `C:\ASP_FIND_FORM\ASP-Lab-Automation-Finder\docs\contract.md`.

## Modes
Preview is the default: `noindex`, `Disallow: /`, empty sitemap, visible TODO markers for unknown values, no production canonical. Production (`SITE_MODE=production` plus a real `PUBLIC_SITE_URL`) emits canonical, reciprocal hreflang with an English x-default, og tags, the sitemap and an indexable robots.txt.

## Hosting
Not decided. Verify clean URLs, the slash policy (`/`, `/uk/`, `/ru/` end with `/`, other pages do not) and a real 404 status — see `docs/hosting.md`.

## Working state
`CHECKPOINT.md` records the last completed stage, what is in progress, the next step, what must not be repeated and open problems. Read it before continuing work; update it after every completed stage.
