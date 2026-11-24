/**
 * Records the README demo (docs/demo.gif): a scripted tour of the built site in headless Chromium.
 * Usage: npm run build && npm run demo
 */
import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { serve } from './serve.mjs';

const OUT = 'docs/demo.gif';
const VIEWPORT = { width: 1280, height: 800 };
const SCALE = 0.75; // output size: 960×600
const FRAME_MS = 100; // 10 fps

const { origin, close } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT, locale: 'en-US', colorScheme: 'light' });

/** Frames as PNG buffers with their duration; identical consecutive frames are merged. */
const frames = [];
let lastHash = '';
async function capture(count = 1) {
  for (let i = 0; i < count; i++) {
    const png = await page.screenshot();
    const hash = createHash('sha1').update(png).digest('hex');
    if (hash === lastHash) frames.at(-1).delay += FRAME_MS;
    else frames.push({ png, delay: FRAME_MS });
    lastHash = hash;
    await page.waitForTimeout(FRAME_MS / 2);
  }
}
const hold = async (ms) => {
  await capture(1);
  frames.at(-1).delay += ms;
};
async function scrollTo(selector, offset = -70, steps = 12) {
  const from = await page.evaluate(() => scrollY);
  const to = await page.evaluate(
    ([s, o]) => document.querySelector(s).getBoundingClientRect().top + scrollY + o,
    [selector, offset],
  );
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), from + (to - from) * eased);
    await capture();
  }
}

try {
  // 1. Hero: the ASCII portrait decodes, then the lens reveals the photo.
  await page.goto(`${origin}/`, { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await capture(16);
  // The portrait can be hidden (site.showPortrait).
  const box = (await page.locator('.ascii-stage').count()) ? await page.locator('.ascii-stage').boundingBox() : null;
  if (box) {
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      await page.mouse.move(box.x + box.width * (0.25 + 0.4 * t), box.y + box.height * (0.25 + 0.3 * Math.sin(t * Math.PI)));
      await capture();
    }
    await page.mouse.move(10, 400);
  }
  await hold(600);

  // 2. About and experience.
  await scrollTo('#about');
  await hold(1200);
  await scrollTo('#experience');
  await hold(1000);

  // 3. Projects and filters.
  await scrollTo('#projects');
  await hold(600);
  for (const filter of ['featured', 'games', 'all']) {
    await page.click(`[data-filter="${filter}"]`);
    await capture(3);
    await hold(900);
  }

  // 4. A project page, in dark mode.
  await page.click('h3 a[href$="/projects/luna-and-helios"]');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await hold(1200);
  await page.click('#theme-toggle');
  await capture(2);
  await hold(1500);

  // 5. Switch to French, then back to the home page.
  await page.click('a.lang');
  await page.waitForLoadState('networkidle');
  await hold(1000);
  await page.click('.brand');
  await page.waitForLoadState('domcontentloaded');
  await capture(16);
  await hold(1500);
} finally {
  await browser.close();
  close();
}

// Encode: resize every frame, then join them into one animated GIF.
const width = Math.round(VIEWPORT.width * SCALE);
const height = Math.round(VIEWPORT.height * SCALE);
const raw = await Promise.all(frames.map((f) => sharp(f.png).resize(width, height).png().toBuffer()));
mkdirSync('docs', { recursive: true });
const info = await sharp(raw, { join: { animated: true } })
  .gif({ delay: frames.map((f) => f.delay), loop: 0, colours: 128, effort: 8, dither: 0.6 })
  .toFile(OUT);
console.log(`${OUT}: ${frames.length} frames, ${(info.size / 1024 / 1024).toFixed(1)} MB`);
