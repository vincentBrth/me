/**
 * Runs after `astro build`. Opens the built site in headless Chromium to produce:
 * - dist/cv/CV_BERTHET_Vincent.pdf from /cv/ (the hand-written cv.html);
 * - dist/og/<lang>.png, the social sharing images, from /og/<lang>/.
 *
 * On a machine where Chromium cannot start, the step is skipped with a warning,
 * except in CI where it must succeed.
 */
import { join } from 'node:path';
import { DIST, serve } from './serve.mjs';

const CV_PDF = 'cv/CV_BERTHET_Vincent.pdf';
const LANGS = ['en', 'fr'];

async function launch() {
  try {
    const { chromium } = await import('playwright');
    return await chromium.launch();
  } catch (error) {
    if (process.env.CI) throw error;
    console.warn(
      `\n[postbuild] Chromium could not start, CV PDF and sharing images were NOT generated.\n` +
        `            Run "npx playwright install --with-deps chromium" to enable them locally.\n` +
        `            (${String(error.message).split('\n')[0]})\n`,
    );
    return null;
  }
}

const browser = await launch();
if (browser) {
  const { origin, close } = await serve();
  try {
    // Resume → PDF (A4, as defined by the @page rule of cv.html).
    const page = await browser.newPage();
    await page.goto(`${origin}/cv/`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: join(DIST, CV_PDF), printBackground: true, preferCSSPageSize: true });
    console.log(`[postbuild] ${CV_PDF}`);

    // Sharing images.
    for (const lang of LANGS) {
      const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
      await og.emulateMedia({ reducedMotion: 'reduce' });
      await og.goto(`${origin}/og/${lang}/`, { waitUntil: 'networkidle' });
      await og.waitForSelector('.ascii-ready');
      await og.waitForTimeout(300);
      await og.screenshot({ path: join(DIST, 'og', `${lang}.png`) });
      console.log(`[postbuild] og/${lang}.png`);
    }
  } finally {
    await browser.close();
    close();
  }
}
