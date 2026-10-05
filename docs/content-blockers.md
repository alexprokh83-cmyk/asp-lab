# Content blockers (real values required before production)

`npm run check:release` lists these and exits 1 while any remain. Everything below is configuration, not project content:
the 13 projects are published as working solutions.

| Missing value | Variable | Consequence while missing |
|---|---|---|
| Production domain | `PUBLIC_SITE_URL` (+ `SITE_MODE=production`) | pages are `noindex`; no canonical/hreflang/og:url; sitemap empty |
| Operator, privacy contact, hosting provider | `PUBLIC_OPERATOR_NAME`, `PUBLIC_PRIVACY_CONTACT`, `PUBLIC_HOSTING_PROVIDER` | /privacy shows only the facts about the site; the contact block appears once these are set |
| Legal identity, retention, processors, legal basis, policy wording and date | write into `src/content/pages/privacy.ts` once approved | not shown until written |

Telegram: `https://t.me/ASP_Lab_Bot` is the built-in default (public link only; never a bot token). No TODO markers are shown on any page; missing values are tracked here and by `npm run check:release`.

## Projects section
Source of truth: the owner's project descriptions (13 projects, ru source, en/uk translations) in `src/content/project-data/`.
No test counts, pass/fail numbers or benchmark sizes are published. Stated results (migration: almost 500 tasks in about 4 hours;
transcription: about 60 hours of lectures in about 5 hours on a GPU) are shown prominently. `repo` links are set only for the
projects whose public GitHub repository is known (8 of 13); the other five have no link until one is provided.
`UniBooks Translator` is not in the delivered list and is therefore not on the site.

## Not yet reworked (agreed to follow separately)
`/solutions` (8 directions), the homepage direction tiles, `/local-ai`, `/approach` and the audience pages still carry the earlier
wording ("prototype output", "demonstration concept", "possible applications, not completed deployments").
