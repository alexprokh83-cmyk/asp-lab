# Future contact form (not implemented in V1)

V1 is Telegram-first. There is no form, API route, webhook request, simulated success state or n8n credential in this repo.
The marked slot `FUTURE-CONTACT-FORM-SLOT` in `src/components/pages/ContactPage.astro` and `features.contactForm` in `src/config/site.ts` are the only extension points.

## Planned flow
Website → contact form → n8n webhook → validation / processing → Telegram notification → optional Google Sheets / CRM / email → optional AI classification.

## Payload (only necessary fields)
reply email · optional name · optional organization · task description · topic · optional organization type · optional systems and hosting requirements · locale · source page.

## Requirements before enabling
- Accessible labels and localized validation messages (en / uk / ru).
- Server-side validation in the receiving system; abuse protection and rate limiting outside the static frontend.
- No secret in frontend code; a public webhook URL is not a secret.
- Show success only after confirmed successful processing; handle field, network, server and rate-limit errors.
- Keep entered text in page memory after a failure; no automatic persistent storage of personal data.
- No PII in analytics or query strings; no file upload.
- Reviewed privacy information (see `/privacy`) before submission is enabled.
