# ASP Find frontend integration

ASP Lab embeds the existing ASP Lab Automation Finder client in the homepage Hero. The client is kept in `src/components/asp-find/` and is built with the Astro site; it does not read files from the source project path at build or runtime.

## Reused source and adaptations

- `app.js` and `styles.css` were brought over from `C:\ASP_FIND_FORM\ASP-Lab-Automation-Finder`.
- The standalone `index.html`, `server.js`, and `api/asp-automation-finder.js` are not included in the static site. They are a standalone host and server-side proxy, not browser assets.
- No image or font assets are referenced by the Finder. Its icons are inline SVG and it otherwise uses the host font stack. The original project has no `LICENSE`, `PROMPT.md`, or `CHECKPOINT.md`; no license or third-party code notices were present in the inspected files. DOMPurify was loaded from a CDN by the standalone HTML; in this integration custom summaries are displayed as escaped text, so the page does not add a remote script dependency.
- The Finder language buttons were removed. The component receives the current `en`, `uk`, or `ru` locale from Astro as `data-locale`; that same locale is used in the diagnostic payload. The result CTA is localized to the current ASP Lab `/contact` route.
- Heading levels were adjusted for embedding under the page H1.

## API contract and current state

The client preserves the existing contract and sends a JSON `POST` to the URL in `data-proxy-url`. The request includes version, session ID, locale, diagnostic answers, optional free text, and browser metadata. The static ASP Lab site does not provide this endpoint and does not call n8n directly.

Set the **public endpoint URL only** as `PUBLIC_ASP_FIND_PROXY_URL` at build time. Accepted values are a same-origin path (for example `/api/asp-automation-finder`) or an HTTPS URL for a trusted proxy. A remote origin must allow the ASP Lab origin with CORS. The setting is empty by default, so the existing localized error state is shown if a visitor tries to submit. It is not a fake success.

The separate server-side proxy must implement the contract in the ASP Find source `docs/contract.md`, use one of its approved test/production webhook URLs, and obtain `ASP_FINDER_N8N_HEADER_KEY` from the server runtime's secret store. The inspected Finder proxy sends it as `X-ASP-Finder-Key`. Never place that credential in ASP Lab environment variables prefixed `PUBLIC_`, browser code, HTML, or GitHub. The Contact API route now reuses this server-side key/header convention without changing Finder behavior; whether the separate `asp-contact` n8n workflow validates it remains unverified until that workflow is inspected.

For the local build, no proxy URL or secret is configured. A real submission remains unavailable until an owner-selected API endpoint is deployed and configured separately.
