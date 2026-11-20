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
    // Without this flag, Chromium on Linux (CI) hints fonts and rounds glyph widths: the text gets wider
    // than on macOS, reflows, and the bottom of the A4 resume is cut off.
    return await chromium.launch({ args: ['--font-render-hinting=none'] });
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

/**
 * Waits for the embedded Inter font, then makes sure the resume still fits on its A4 page:
 * `.page { overflow: hidden }` would otherwise silently cut off whatever runs past the bottom.
 * Fails the build (rather than publishing a truncated PDF) if the font is missing or content overflows.
 */
async function assertCvLayout(page, path) {
  const report = await page.evaluate(async () => {
    const weights = [400, 600, 700, 800];
    await Promise.all(weights.map((w) => document.fonts.load(`${w} 12px InterCV`)));
    await document.fonts.ready;
    const missing = weights.filter((w) => !document.fonts.check(`${w} 12px InterCV`));
    const pageBox = document.querySelector('.page').getBoundingClientRect();
    const overflow = [...document.querySelectorAll('.page header, .page aside > *, .page main > *')]
      .map((el) => el.getBoundingClientRect().bottom - pageBox.bottom)
      .filter((d) => d > 2); // a line box may graze the edge by a pixel without clipping any glyph
    return { missing, overflow: overflow.length ? Math.max(...overflow) : 0 };
  });
  if (report.missing.length) throw new Error(`[postbuild] ${path}: InterCV font not loaded (weights ${report.missing.join(', ')})`);
  if (report.overflow) throw new Error(`[postbuild] ${path}: content overflows the A4 page by ${report.overflow.toFixed(1)}px`);
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
      await assertCvLayout(page, path);
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
