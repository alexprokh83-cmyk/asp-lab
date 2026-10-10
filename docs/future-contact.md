# ASP Contact form and n8n integration

The `/contact` page now contains a localized contact form for EN/UK/RU. It posts exactly `{ name, email, phone, message }` to the test endpoint configured in `src/components/pages/contact-form.js`. The client does not send `website`, a timestamp, credentials, or any ASP Find data.

## Server-side boundary and configuration

Astro still builds the pages as a static site. Vercel separately deploys `api/asp-contact.js` from the repository's `api/` directory as a same-origin Node Function; no Astro server adapter or new hosting service is introduced. The browser posts to `/api/asp-contact`, never to n8n. The function validates and normalizes the four fields, checks JSON and same-origin requests, and permits only the test or production Contact webhook URL.

Configure Vercel server environment variables (not `PUBLIC_` variables):

- `ASP_CONTACT_N8N_WEBHOOK_URL`: set to `https://n8n.pravkazak.org.ua/webhook-test/asp-contact` for Preview; set to `https://n8n.pravkazak.org.ua/webhook/asp-contact` for Production. The function allowlists exactly these two values, so switching Vercel environment configuration does not require a source edit.
- `ASP_FINDER_N8N_HEADER_KEY`: existing server-only key. The Finder proxy source and contract show that it sends this value to n8n as `X-ASP-Finder-Key`. The Contact function reuses the same environment variable and header; it does not create or expose a new secret.

**Authentication verification is still required.** The repository contains the Finder proxy implementation, but it does not contain the n8n `asp-contact` workflow or its Header Auth configuration. Therefore we cannot confirm that Contact checks `X-ASP-Finder-Key`, whether it uses the same credential, or that the key currently configured in Vercel is accepted by that workflow. Before enabling real Contact traffic, inspect the Contact workflow and verify its header-auth check matches the Finder convention. If it does not, stop and agree on the required server-side credential arrangement; do not weaken the workflow or expose a key in the browser. No n8n workflow or Vercel setting was changed by this code change.

The Astro static build does not run this function locally. `npm run dev` alone cannot submit Contact requests; use a Vercel Function runtime for end-to-end testing. The frontend still requires a successful HTTP response with JSON `{ "status": "ok" }` and no `error` property. No CORS permission is needed between browser and n8n because only the server function calls n8n.

## Request and response contract

- Method: `POST`; content type: `application/json`.
- JSON properties, in order: `name`, `email`, `phone`, `message`; all are normalized strings, and `phone` is `""` when omitted.
- No `website`, timestamp, locale, secret, or extra metadata is sent.
- The frontend treats a request as successful only when HTTP status is successful and the JSON body is an object with `status: "ok"` and no `error` property. Any other status, body, network failure, timeout, or CORS failure shows a generic localized error and does not start cooldown.
- The n8n workflow should return that response only after accepting the message. Its actual response and processing workflow have not yet been inspected or configured from this repository.

## Webhook mode

Webhook selection is server-side and deployment-environment-specific. `ASP_CONTACT_N8N_WEBHOOK_URL` is configured to the test URL in Vercel Preview and the production URL in Vercel Production. The browser bundle contains neither URL nor secret. Test and production values must remain separate in Vercel; do not put secrets in `.env.example` or Git.

## Client behavior and limits

The client validates and trims all fields before sending, silently discards honeypot submissions, prevents duplicate in-flight requests, preserves values after failure, and starts a 60-second cooldown only after a confirmed `{ "status": "ok" }` response. It stores only the success timestamp under `asp_contact_last_submit` in browser local storage; if storage is unavailable, the current page session still gets the cooldown but a reload cannot restore it. Honeypot and local cooldown are not server-side spam protection.

The privacy page describes the fields submitted and the local cooldown timestamp. The legal identity, recipients, retention, legal basis and final privacy wording still require owner review as listed there.

## Verification boundary

Local tests cover normalization, field constraints and payload keys. The Contact API route has not been invoked against a Vercel runtime or n8n from this change. The Contact workflow's header authentication, response contract, actual receipt, and production delivery remain unverified. Do not claim successful delivery until a controlled test submission is confirmed in n8n.
