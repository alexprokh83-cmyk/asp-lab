# Hosting notes

The deployment target is not decided. Verify these on the real host before launch:

1. **Clean URLs.** Pages are emitted as `dir/index.html`. The host must serve `/solutions` and `/uk/solutions` without `.html`, and `/`, `/uk/`, `/ru/` for locale homes.
2. **Trailing-slash policy.** Canonical: locale homes end with `/`, all other pages do not. The host should redirect the non-canonical form (or serve both). Not yet verified on a real host.
3. **Genuine 404.** `dist/404.html` must be returned with HTTP status 404 (Netlify, Cloudflare Pages and Vercel pick it up automatically; for nginx use `error_page 404 /404.html;`). It shows all three languages because a static 404 cannot know the visitor's language.
4. **Preview vs production.** Without `SITE_MODE=production` and a real `PUBLIC_SITE_URL` the build is noindex, robots disallow, and the sitemap is empty. Set both only for the real launch.
5. **Contact API on Vercel.** The static Astro build is paired with `api/asp-contact.js`, which Vercel deploys as a Node Function at `/api/asp-contact`. Set `ASP_CONTACT_N8N_WEBHOOK_URL` to the test endpoint in Preview and the production endpoint in Production. Set the existing `ASP_FINDER_N8N_HEADER_KEY` as a server-only Vercel variable. The n8n Contact workflow must validate `X-ASP-Finder-Key`; that workflow configuration still needs verification. Other static hosts need an equivalent server-side route and must not restore direct browser-to-webhook submission.
