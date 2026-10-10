import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/asp-contact.js';

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    end(value = '') { this.body = value; },
  };
}

function request({ method = 'POST', body, headers = {} } = {}) {
  return { method, body, headers: { 'content-type': 'application/json', host: 'asp.example', origin: 'https://asp.example', ...headers } };
}

const validPayload = {
  name: 'Jean-Pierre',
  email: 'test+asp@example.co.uk',
  phone: '+380671234567',
  message: 'Please contact me about automation.',
};

test('Contact API rejects non-POST requests and does not call upstream', async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => assert.fail('fetch must not run');
  try {
    const res = responseRecorder();
    await handler(request({ method: 'GET' }), res);
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.allow, 'POST');
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test('Contact API requires server-side URL and key configuration', async () => {
  const previousUrl = process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
  const previousKey = process.env.ASP_FINDER_N8N_HEADER_KEY;
  delete process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
  delete process.env.ASP_FINDER_N8N_HEADER_KEY;
  try {
    const res = responseRecorder();
    await handler(request({ body: validPayload }), res);
    assert.equal(res.statusCode, 503);
  } finally {
    if (previousUrl === undefined) delete process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
    else process.env.ASP_CONTACT_N8N_WEBHOOK_URL = previousUrl;
    if (previousKey === undefined) delete process.env.ASP_FINDER_N8N_HEADER_KEY;
    else process.env.ASP_FINDER_N8N_HEADER_KEY = previousKey;
  }
});

test('Contact API validates same-origin payload and forwards only four normalized fields with server header', async () => {
  const previousUrl = process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
  const previousKey = process.env.ASP_FINDER_N8N_HEADER_KEY;
  const previousFetch = globalThis.fetch;
  process.env.ASP_CONTACT_N8N_WEBHOOK_URL = 'https://n8n.pravkazak.org.ua/webhook-test/asp-contact';
  process.env.ASP_FINDER_N8N_HEADER_KEY = 'test-only-placeholder';
  let observed;
  globalThis.fetch = async (url, options) => {
    observed = { url, options };
    return new Response('{"status":"ok"}', { status: 200, headers: { 'content-type': 'application/json' } });
  };
  try {
    const res = responseRecorder();
    await handler(request({ body: { ...validPayload, name: '  Jean-Pierre  ', website: 'ignored' } }), res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(observed.url, process.env.ASP_CONTACT_N8N_WEBHOOK_URL);
    assert.equal(observed.options.headers['X-ASP-Finder-Key'], 'test-only-placeholder');
    assert.deepEqual(JSON.parse(observed.options.body), validPayload);
    assert.deepEqual(Object.keys(JSON.parse(observed.options.body)), ['name', 'email', 'phone', 'message']);
    assert.equal(res.body, '{"status":"ok"}');
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
    else process.env.ASP_CONTACT_N8N_WEBHOOK_URL = previousUrl;
    if (previousKey === undefined) delete process.env.ASP_FINDER_N8N_HEADER_KEY;
    else process.env.ASP_FINDER_N8N_HEADER_KEY = previousKey;
  }
});

test('Contact API rejects cross-origin and invalid payloads before upstream request', async () => {
  const previousUrl = process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
  const previousKey = process.env.ASP_FINDER_N8N_HEADER_KEY;
  const previousFetch = globalThis.fetch;
  process.env.ASP_CONTACT_N8N_WEBHOOK_URL = 'https://n8n.pravkazak.org.ua/webhook-test/asp-contact';
  process.env.ASP_FINDER_N8N_HEADER_KEY = 'test-only-placeholder';
  globalThis.fetch = () => assert.fail('fetch must not run');
  try {
    const crossOrigin = responseRecorder();
    await handler(request({ body: validPayload, headers: { origin: 'https://attacker.example' } }), crossOrigin);
    assert.equal(crossOrigin.statusCode, 403);

    const invalidPayload = responseRecorder();
    await handler(request({ body: { ...validPayload, email: 'invalid' } }), invalidPayload);
    assert.equal(invalidPayload.statusCode, 400);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.ASP_CONTACT_N8N_WEBHOOK_URL;
    else process.env.ASP_CONTACT_N8N_WEBHOOK_URL = previousUrl;
    if (previousKey === undefined) delete process.env.ASP_FINDER_N8N_HEADER_KEY;
    else process.env.ASP_FINDER_N8N_HEADER_KEY = previousKey;
  }
});
