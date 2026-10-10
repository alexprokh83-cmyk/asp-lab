import { normalizeContactPayload } from '../src/components/pages/contact-form-validation.js';

const ALLOWED_WEBHOOK_URLS = new Set([
  'https://n8n.pravkazak.org.ua/webhook-test/asp-contact',
  'https://n8n.pravkazak.org.ua/webhook/asp-contact',
]);
const REQUIRED_FIELDS = ['name', 'email', 'phone', 'message'];

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function parseBody(body) {
  if (typeof body === 'string') {
    try { return JSON.parse(body); } catch { return null; }
  }
  return body;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { status: 'error', error: { code: 'method_not_allowed' } });
  }

  const contentType = String(req.headers['content-type'] || '').split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return sendJson(res, 415, { status: 'error', error: { code: 'unsupported_media_type' } });
  }

  // Keep browser submissions same-origin, including Vercel preview deployments.
  const origin = req.headers.origin;
  const requestHost = req.headers.host;
  if (origin && requestHost) {
    try {
      if (new URL(origin).host.toLowerCase() !== String(requestHost).toLowerCase()) {
        return sendJson(res, 403, { status: 'error', error: { code: 'origin_not_allowed' } });
      }
    } catch {
      return sendJson(res, 403, { status: 'error', error: { code: 'origin_not_allowed' } });
    }
  }

  const webhookUrl = process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
  const key = process.env.ASP_FINDER_N8N_HEADER_KEY;
  if (!webhookUrl || !ALLOWED_WEBHOOK_URLS.has(webhookUrl)) {
    return sendJson(res, 503, { status: 'error', error: { code: 'contact_webhook_not_configured' } });
  }
  if (!key || /[\r\n]/.test(key)) {
    return sendJson(res, 503, { status: 'error', error: { code: 'contact_auth_not_configured' } });
  }

  const source = parseBody(req.body);
  if (!source || typeof source !== 'object' || Array.isArray(source) ||
      REQUIRED_FIELDS.some((field) => typeof source[field] !== 'string')) {
    return sendJson(res, 400, { status: 'error', error: { code: 'invalid_request' } });
  }

  const { payload, valid } = normalizeContactPayload(source);
  if (!valid) {
    return sendJson(res, 400, { status: 'error', error: { code: 'invalid_request' } });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ASP-Finder-Key': key,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const responseText = (await upstream.text()).split(key).join('[redacted]');
    res.statusCode = upstream.status;
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    return res.end(responseText);
  } catch (error) {
    return sendJson(res, error?.name === 'AbortError' ? 504 : 502, {
      status: 'error',
      error: { code: error?.name === 'AbortError' ? 'upstream_timeout' : 'upstream_unavailable' },
    });
  } finally {
    clearTimeout(timeout);
  }
}
