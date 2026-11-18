/**
 * Runs after `astro build`. Opens the built site in headless Chromium to produce:
 * - dist/cv/CV_BERTHET_Vincent.pdf from /cv/ (the hand-written cv.html) and
 *   dist/cv/CV_BERTHET_Vincent_EN.pdf from /cv/en/ (cv.en.html);
 * - dist/card/*.pdf, the contact card alone, from /card/ and /card/en/;
 * - dist/og/<lang>.png, the social sharing images, from /og/<lang>/.
 *
 * On a machine where Chromium cannot start, the step is skipped with a warning,
 * except in CI where it must succeed.
 */
import { join } from 'node:path';
import { DIST, serve } from './serve.mjs';

const CV_PDFS = { '/cv/': 'cv/CV_BERTHET_Vincent.pdf', '/cv/en/': 'cv/CV_BERTHET_Vincent_EN.pdf' };
const CARD_PDFS = { '/card/': 'card/Carte_BERTHET_Vincent.pdf', '/card/en/': 'card/Card_BERTHET_Vincent_EN.pdf' };
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
    // Resumes → PDF (A4, as defined by the @page rule of cv.html).
    for (const [path, pdf] of Object.entries(CV_PDFS)) {
      const page = await browser.newPage();
      await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
      await page.emulateMedia({ media: 'print' });
      await page.pdf({ path: join(DIST, pdf), printBackground: true, preferCSSPageSize: true });
      console.log(`[postbuild] ${pdf}`);
    }

    // Contact cards → PDF, on a page cut to the size of the card.
    for (const [path, pdf] of Object.entries(CARD_PDFS)) {
      const page = await browser.newPage();
      await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
      await page.emulateMedia({ media: 'print' });
      const box = await page.locator('#card > table').boundingBox();
      await page.pdf({
        path: join(DIST, pdf),
        printBackground: true,
        width: `${Math.ceil(box.width)}px`,
        height: `${Math.ceil(box.height) + 1}px`,
        pageRanges: '1',
      });
      console.log(`[postbuild] ${pdf}`);
    }

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
