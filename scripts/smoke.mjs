/**
 * Smoke test of the built site (run `npm run build` first): every page is opened in headless
 * Chromium and the main features are exercised. Exits with an error code on the first problem,
 * so CI blocks the deployment.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { DIST, serve } from './serve.mjs';

const failures = [];
const check = (ok, message) => {
  if (ok) console.log(`  ✓ ${message}`);
  else {
    console.log(`  ✗ ${message}`);
    failures.push(message);
  }
};

const { origin, close } = await serve();
const browser = await chromium.launch();
// English browser by default, so that the English pages are not redirected to French.
const context = await browser.newContext({ locale: 'en-US' });

/** Opens a page and records JavaScript errors and failed same-site requests. */
async function open(path, ctx = context) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('requestfailed', (r) => r.url().startsWith(origin) && errors.push(`failed: ${r.url()}`));
  page.on('response', (r) => r.url().startsWith(origin) && r.status() >= 400 && errors.push(`${r.status()}: ${r.url()}`));
  const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
  return { page, errors, status: response?.status() };
}

try {
  console.log('Home pages');
  for (const lang of ['en', 'fr']) {
    const { page, errors, status } = await open(lang === 'en' ? '/' : '/fr/');
    check(status === 200 && errors.length === 0, `/${lang === 'en' ? '' : 'fr/'} loads without errors ${errors.join(' | ')}`);
    check((await page.getAttribute('html', 'lang')) === lang, `/${lang} has lang="${lang}"`);
    const cards = await page.$$eval('[data-grid] [data-categories]', (els) => els.length);
    check(cards > 0, `/${lang} lists ${cards} projects`);
    await page.click('[data-filter="featured"]');
    const featured = await page.$$eval('[data-grid] [data-categories]', (els) => els.filter((e) => !e.hidden).length);
    const expected = Number(await page.textContent('[data-filter="featured"] span'));
    check(featured === expected, `/${lang} "Selection" filter shows ${featured}/${expected} projects`);
    const egg = await page.evaluate(() => {
      const v = window.vincent;
      return v && v.help() === '🐙' && typeof v.projects() === 'string' && typeof v.squid() === 'string';
    });
    check(egg, `/${lang} console easter egg (vincent.help, projects, squid) works`);
    await page.close();
  }

  console.log('Project pages');
  for (const lang of ['', '/fr']) {
    const dir = join(DIST, lang, 'projects');
    for (const slug of readdirSync(dir).filter((d) => statSync(join(dir, d)).isDirectory())) {
      const { page, errors, status } = await open(`${lang}/projects/${slug}/`);
      if (status !== 200 || errors.length) check(false, `${lang}/projects/${slug} ${status} ${errors.join(' | ')}`);
      await page.close();
    }
    check(true, `${lang || '/'} project pages load without errors`);
  }

  console.log('Resume, card and sharing images');
  const cv = await open('/cv/');
  check(cv.status === 200 && (await cv.page.$('.cv-toolbar')) !== null, '/cv/ loads with its toolbar');
  const pdf = join(DIST, 'cv', 'CV_BERTHET_Vincent.pdf');
  check(existsSync(pdf) && statSync(pdf).size > 10_000, 'the resume PDF was generated');
  for (const lang of ['en', 'fr']) check(existsSync(join(DIST, 'og', `${lang}.png`)), `og/${lang}.png was generated`);
  const card = await open('/card/');
  check(card.status === 200, '/card/ loads');

  console.log('Redirects');
  const fr = await browser.newContext({ locale: 'fr-FR' });
  const home = await open('/', fr);
  check(home.page.url().endsWith('/me/fr/'), 'a French browser is redirected to /fr/');
  const legacy = await open('/get.html?id=lunaAndHelios', context);
  check(legacy.page.url().endsWith('/projects/luna-and-helios'), 'old get.html links are redirected');
  const missing = await open('/fr/does-not-exist', fr);
  await missing.page.waitForTimeout(500);
  check(missing.page.url().endsWith('/fr/does-not-exist'), 'the 404 page does not redirect in a loop');
} finally {
  await browser.close();
  close();
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll checks passed.');
