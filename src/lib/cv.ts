import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from '../i18n/ui';
import { site } from '../data/site';
import { toolbar, toolbarCss } from './toolbar';

/** Inlines the Twemoji drawing of every emoji, so they render (and print to PDF) without an emoji font. */
function inlineEmoji(html: string): string {
  return html.replace(/\p{Extended_Pictographic}️?/gu, (match) => {
    const code = [...match]
      .map((c) => c.codePointAt(0)!.toString(16))
      .filter((c) => c !== 'fe0f')
      .join('-');
    try {
      const svg = readFileSync(join(process.cwd(), 'node_modules/@twemoji/svg', `${code}.svg`));
      const src = `data:image/svg+xml;base64,${svg.toString('base64')}`;
      return `<img src="${src}" alt="${match}" style="display:inline-block;width:1.1em;height:1.1em;vertical-align:-0.15em;margin:0 .05em">`;
    } catch {
      return match;
    }
  });
}

/**
 * The resume written by hand in `cv.html` or `cv.en.html` (repository root), unchanged except for:
 * - emojis drawn as images (see above);
 * - a `noindex` tag, since it contains personal contact details;
 * - a small toolbar (back to the site, other language, download as PDF), hidden when printing.
 * The PDF itself is generated after the build by scripts/postbuild.mjs.
 */
export function renderCv(lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cv = site.cv[lang];
  const raw = readFileSync(join(process.cwd(), cv.file), 'utf8');

  // Only the <body> may contain emojis worth replacing (the <head> holds base64 fonts).
  const html = raw.replace(/(<body[^>]*>)([\s\S]*)(<\/body>)/i, (_, open, body, close) => open + inlineEmoji(body) + close);

  const head = `<meta name="robots" content="noindex">
<link rel="icon" href="${base}/favicon.ico" sizes="32x32">
<style>
${toolbarCss}
  /* On screens narrower than an A4 page, the page is scaled down to fit (never when printing). */
  @media screen and (max-width:809px){
    html .page{transform:scale(var(--cv-zoom,1));transform-origin:top left;
      margin-top:8px;margin-left:max(8px, calc((100vw - 210mm * var(--cv-zoom,1)) / 2));
      margin-bottom:calc(8px + 297mm * (var(--cv-zoom,1) - 1))}
  }
</style>
<script>
  (function () {
    var A4 = 210 * 96 / 25.4; // page width in CSS pixels
    function fit() {
      var width = Math.min(document.documentElement.clientWidth, screen.width || Infinity);
      if (width >= A4 + 16) return document.documentElement.style.removeProperty('--cv-zoom');
      var zoom = Math.min(1, (width - 16) / A4);
      document.documentElement.style.setProperty('--cv-zoom', String(zoom));
    }
    fit();
    addEventListener('resize', fit);
  })();
</script>`;

  return html.replace(/<head>/i, `<head>\n${head}`).replace(/<\/body>/i, `${toolbar(lang, 'CV', { fr: site.cv.fr.page, en: site.cv.en.page }, cv.pdf)}\n</body>`);
}
