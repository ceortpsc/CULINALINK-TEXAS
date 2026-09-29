import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = (process.env.CULINALINK_LIVE_URL || 'https://culinalink-texas-mcczce.v2.appdeploy.ai/').replace(/\/?$/, '/');
const checks = [];
const startedAt = new Date().toISOString();

function pass(name, detail = '') {
  checks.push({ name, status: 'PASS', detail });
  console.log(`PASS: ${name}${detail ? ` — ${detail}` : ''}`);
}

async function apiCheck(name, path, expectedStatus, init) {
  const response = await fetch(new URL(path.replace(/^\//, ''), base), init);
  assert.equal(response.status, expectedStatus, `${name}: expected HTTP ${expectedStatus}, received ${response.status}`);
  let body = null;
  const text = await response.text();
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  pass(name, `HTTP ${response.status}`);
  return body;
}

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));

  let response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.ok(response?.ok(), `Homepage returned ${response?.status()}`);
  await page.getByRole('heading', { name: /Local culinary talent\. One marketplace\./i }).waitFor({ timeout: 20000 });
  pass('Homepage renders branded marketplace shell');

  response = await page.goto(new URL('discover/', base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.ok(response?.ok(), `Discover returned ${response?.status()}`);
  await page.getByText('Chef Jordan', { exact: true }).first().waitFor({ timeout: 20000 });
  await page.getByRole('button', { name: /Map/i }).click();
  await page.locator('.map-shell').waitFor();
  await page.getByRole('button', { name: /List/i }).click();
  await page.getByRole('button', { name: /Save Chef Jordan to Favorites/i }).first().click();
  await page.getByText(/Sign in to save culinary professionals to Favorites/i).waitFor();
  pass('Discovery views and signed-out Favorites guard work');

  response = await page.goto(new URL('gigs/', base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.ok(response?.ok(), `Gigs returned ${response?.status()}`);
  await page.getByRole('button', { name: /Run compliance preflight/i }).click();
  await page.getByText('PRELIMINARY_ELIGIBLE', { exact: true }).waitFor({ timeout: 15000 });
  await page.getByText(/not a government permit or legal determination/i).waitFor();
  pass('Public gig compliance preflight remains advisory');

  response = await page.goto(new URL('release-center/', base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.ok(response?.ok(), `Release Center returned ${response?.status()}`);
  await page.getByRole('heading', { name: 'Release & Execution Center' }).waitFor();
  await page.getByText('EXTERNAL_DISPATCH', { exact: true }).first().waitFor({ timeout: 15000 });
  pass('Release governance surface renders');

  response = await page.goto(new URL('delivery/', base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.ok(response?.ok(), `Delivery returned ${response?.status()}`);
  await page.getByRole('heading', { name: /DoorDash Drive delivery worker/i }).waitFor();
  await page.getByText(/Sandbox credentials are for development and do not dispatch a real Dasher/i).waitFor();
  pass('DoorDash delivery surface preserves sandbox/production truth boundary');

  const health = await apiCheck('Health endpoint', '/api/health', 200);
  assert.equal(health?.data?.status, 'HEALTHY');
  const ready = await apiCheck('Readiness endpoint', '/api/health/ready', 200);
  assert.equal(ready?.data?.status, 'READY');
  pass('Health payloads report HEALTHY and READY');

  await apiCheck('Favorites requires authentication', '/api/v1/favorites', 401);
  await apiCheck('Orders requires authentication', '/api/v1/orders', 401);
  await apiCheck('DoorDash records require authentication', '/api/doordash/me', 401);
  await apiCheck('Rapid Pay records require authentication', '/api/rapidpay/me', 401);
  await apiCheck('Private realtime subscription requires authentication', '/api/subscriptions', 401, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ entity_type: 'delivery', entity_id: 'qa-not-owned', connection_id: 'qa-e2e-12345678' }),
  });
  await apiCheck('Public realtime endpoint rejects private entities', '/api/subscriptions/public', 403, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ entity_type: 'delivery', entity_id: 'qa-private', connection_id: 'qa-e2e-12345678' }),
  });

  await page.setViewportSize({ width: 390, height: 844 });
  response = await page.goto(new URL('verified-professionals/', base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.ok(response?.ok(), `Verified Professionals returned ${response?.status()}`);
  await page.getByRole('heading', { name: /Verified professionals, with verification you can inspect/i }).waitFor();
  await page.getByText(/Verification is not a government endorsement/i).waitFor();
  const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }));
  assert.ok(widths.scroll <= widths.inner + 2, `Mobile page overflows horizontally: ${widths.scroll} > ${widths.inner}`);
  pass('Mobile verification surface is responsive and truth-preserving');

  assert.equal(pageErrors.length, 0, `Browser page errors detected: ${pageErrors.join(' | ')}`);
  pass('No browser page exceptions observed in tested production flows');

  await context.close();
} finally {
  await browser.close();
}

const report = {
  product: 'CulinaLinkTX',
  liveUrl: base,
  startedAt,
  completedAt: new Date().toISOString(),
  status: 'PASS',
  scope: 'independent live production public-flow, responsive and authentication-boundary E2E',
  appdeployNativeE2E: 'NOT_EXECUTED_BY_APPDEPLOY_HARNESS',
  authenticatedOAuthSuccessPath: 'NOT_AUTOMATED_NO_NON_HUMAN_TEST_IDENTITY',
  checks,
};
fs.mkdirSync('evidence', { recursive: true });
fs.writeFileSync('evidence/live-e2e-latest.json', JSON.stringify(report, null, 2) + '\n');
console.log(`LIVE E2E PASSED: ${checks.length} checks`);
