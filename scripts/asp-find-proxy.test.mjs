import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/asp-automation-finder.js';

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.headers['content-type'] = 'application/json'; this.body = JSON.stringify(value); return this; },
    end(value = '') { this.body = value; },
  };
}

const payload = {
  version: '1.0.0',
  session_id: 'test-session',
  locale: 'en',
  answers: { primary_pain: 'pain_docs', data_type: ['data_scans_pdf'] },
  free_text: '',
  meta: { source: 'asp-automation-finder' },
};

async function withEnv(values, callback) {
  const keys = ['ASP_FINDER_N8N_WEBHOOK_URL', 'ASP_FINDER_N8N_HEADER_KEY'];
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  for (const key of keys) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  try { await callback(); }
  finally {
    for (const key of keys) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
  }
}

test('rejects unsupported methods without calling n8n', async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => assert.fail('fetch must not run');
  try {
    const res = responseRecorder();
    await handler({ method: 'GET' }, res);
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.allow, 'POST');
  } finally { globalThis.fetch = previousFetch; }
});

test('rejects missing key and invalid Finder payloads', async () => {
  await withEnv({ ASP_FINDER_N8N_WEBHOOK_URL: undefined, ASP_FINDER_N8N_HEADER_KEY: undefined }, async () => {
    const res = responseRecorder();
    await handler({ method: 'POST', body: payload }, res);
    assert.equal(res.statusCode, 503);
    assert.match(res.body, /proxy_not_configured/);
  });

  await withEnv({ ASP_FINDER_N8N_WEBHOOK_URL: undefined, ASP_FINDER_N8N_HEADER_KEY: 'test-only-secret' }, async () => {
    const res = responseRecorder();
    await handler({ method: 'POST', body: { ...payload, answers: [] } }, res);
    assert.equal(res.statusCode, 400);
    assert.doesNotMatch(res.body, /test-only-secret/);
  });
});

test('rejects payloads larger than the standalone server request limit', async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => assert.fail('oversized payload must not reach n8n');
  try {
    await withEnv({ ASP_FINDER_N8N_WEBHOOK_URL: undefined, ASP_FINDER_N8N_HEADER_KEY: 'test-only-secret' }, async () => {
      const res = responseRecorder();
      await handler({ method: 'POST', body: { ...payload, free_text: 'x'.repeat(128 * 1024) } }, res);
      assert.equal(res.statusCode, 413);
      assert.match(res.body, /request_too_large/);
    });
  } finally { globalThis.fetch = previousFetch; }
});

test('forwards the Finder contract and server-only header, then relays upstream response without leaking key', async () => {
  const previousFetch = globalThis.fetch;
  let captured;
  const key = 'test-only-secret';
  await withEnv({ ASP_FINDER_N8N_WEBHOOK_URL: 'https://n8n.pravkazak.org.ua/webhook/asp-automation-finder', ASP_FINDER_N8N_HEADER_KEY: key }, async () => {
    globalThis.fetch = async (url, options) => {
      captured = { url, options };
      return new Response(JSON.stringify({ status: 'ok', echo: key }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    };
    try {
      const res = responseRecorder();
      await handler({ method: 'POST', body: payload }, res);
      assert.equal(captured.url, process.env.ASP_FINDER_N8N_WEBHOOK_URL);
      assert.equal(captured.options.headers['X-ASP-Finder-Key'], key);
      assert.deepEqual(JSON.parse(captured.options.body), payload);
      assert.equal(res.statusCode, 200);
      assert.deepEqual(JSON.parse(res.body), { status: 'ok', echo: '[redacted]' });
      assert.equal(res.headers['cache-control'], 'no-store');
    } finally { globalThis.fetch = previousFetch; }
  });
});

test('maps upstream network and timeout failures to safe gateway errors', async () => {
  const previousFetch = globalThis.fetch;
  await withEnv({ ASP_FINDER_N8N_WEBHOOK_URL: undefined, ASP_FINDER_N8N_HEADER_KEY: 'test-only-secret' }, async () => {
    globalThis.fetch = async () => { throw new Error('network detail test-only-secret'); };
    try {
      const res = responseRecorder();
      await handler({ method: 'POST', body: payload }, res);
      assert.equal(res.statusCode, 502);
      assert.match(res.body, /upstream_unavailable/);
      assert.doesNotMatch(res.body, /test-only-secret|network detail/);

      globalThis.fetch = async () => { throw Object.assign(new Error('timeout'), { name: 'AbortError' }); };
      const timeoutRes = responseRecorder();
      await handler({ method: 'POST', body: payload }, timeoutRes);
      assert.equal(timeoutRes.statusCode, 504);
      assert.match(timeoutRes.body, /upstream_timeout/);
    } finally { globalThis.fetch = previousFetch; }
  });
});
