# ASP Find frontend integration

ASP Lab embeds the existing ASP Lab Automation Finder client in the homepage Hero. The client is kept in `src/components/asp-find/` and is built with the Astro site; it does not read files from the source project path at build or runtime.

## Reused source and adaptations

- `app.js` and `styles.css` were brought over from `C:\ASP_FIND_FORM\ASP-Lab-Automation-Finder`.
- The standalone `index.html`, `server.js`, and `api/asp-automation-finder.js` are not included in the static site. They are a standalone host and server-side proxy, not browser assets.
- No image or font assets are referenced by the Finder. Its icons are inline SVG and it otherwise uses the host font stack. The original project has no `LICENSE`, `PROMPT.md`, or `CHECKPOINT.md`; no license or third-party code notices were present in the inspected files. DOMPurify was loaded from a CDN by the standalone HTML; in this integration custom summaries are displayed as escaped text, so the page does not add a remote script dependency.
- The Finder language buttons were removed. The component receives the current `en`, `uk`, or `ru` locale from Astro as `data-locale`; that same locale is used in the diagnostic payload. The result CTA is localized to the current ASP Lab `/contact` route.
- Heading levels were adjusted for embedding under the page H1.

## API contract and deployment configuration

The client sends a JSON `POST` to `data-proxy-url`. The request includes version, session ID, locale, diagnostic answers, optional free text, and browser metadata. The root Vercel Function `api/asp-automation-finder.js` receives this request and forwards it to n8n; the browser does not call n8n directly. The Finder route is separate from the Contact route and always targets an `asp-automation-finder` URL.

Set `PUBLIC_ASP_FIND_PROXY_URL=/api/asp-automation-finder` as a public build-time value in Vercel. It is the same-origin route only, not the n8n URL or a credential. Redeploy after changing it because Astro embeds it in static HTML. Same-origin browser traffic does not need CORS.

Set `ASP_FINDER_N8N_WEBHOOK_URL` in the Vercel server runtime: test URL in Preview and the production Finder URL in Production. Set `ASP_FINDER_N8N_HEADER_KEY` as a server-only secret in both environments. The function forwards it as `X-ASP-Finder-Key`, redacts it from the upstream body, and never logs it. Do not prefix it with `PUBLIC_`. The Contact API route and `ASP_CONTACT_N8N_WEBHOOK_URL` are separate and unchanged.

The server handler preserves the source proxy behavior: POST-only, allowlisted Finder test/production URLs, JSON/payload checks, required server credential, 30-second upstream timeout, 502/504 errors, and response status/content type/body passthrough with secret redaction. The standalone `server.js` is not copied because its other responsibility is serving the Finder's standalone HTML/CSS/JS; Astro already serves the site assets.
