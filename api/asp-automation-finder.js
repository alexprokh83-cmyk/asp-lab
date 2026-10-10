const ALLOWED_WEBHOOK_URLS = new Set([
  'https://n8n.pravkazak.org.ua/webhook-test/asp-automation-finder',
  'https://n8n.pravkazak.org.ua/webhook/asp-automation-finder',
]);
const MAX_REQUEST_BYTES = 128 * 1024;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      status: 'error',
      error: { code: 'method_not_allowed', message: 'Method not allowed.' },
    });
  }

  const webhookUrl = process.env.ASP_FINDER_N8N_WEBHOOK_URL ||
    'https://n8n.pravkazak.org.ua/webhook-test/asp-automation-finder';
  const key = process.env.ASP_FINDER_N8N_HEADER_KEY;

  if (!ALLOWED_WEBHOOK_URLS.has(webhookUrl)) {
    return res.status(500).json({
      status: 'error',
      error: { code: 'invalid_webhook_url', message: 'Webhook URL is not approved.' },
    });
  }

  if (!key) {
    return res.status(503).json({
      status: 'error',
      error: { code: 'proxy_not_configured', message: 'Webhook credential is missing.' },
    });
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({
        status: 'error',
        error: { code: 'invalid_request', message: 'Invalid JSON.' },
      });
    }
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload) ||
      !payload.answers || typeof payload.answers !== 'object' || Array.isArray(payload.answers) ||
      typeof payload.free_text !== 'string') {
    return res.status(400).json({
      status: 'error',
      error: { code: 'invalid_request', message: 'Invalid Finder payload.' },
    });
  }

  if (Buffer.byteLength(JSON.stringify(payload), 'utf8') > MAX_REQUEST_BYTES) {
    return res.status(413).json({
      status: 'error',
      error: { code: 'request_too_large', message: 'Finder request is too large.' },
    });
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

    const responseBody = (await upstream.text()).split(key).join('[redacted]');
    res.statusCode = upstream.status;
    res.setHeader(
      'Content-Type',
      upstream.headers.get('content-type') || 'application/json; charset=utf-8',
    );
    return res.end(responseBody);
  } catch (error) {
    const timedOut = error?.name === 'AbortError';
    return res.status(timedOut ? 504 : 502).json({
      status: 'error',
      error: {
        code: timedOut ? 'upstream_timeout' : 'upstream_unavailable',
        message: timedOut
          ? 'The recommendation service timed out.'
          : 'The recommendation service could not be reached.',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}
