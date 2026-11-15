import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '../data/site';

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
 * The resume written by hand in `cv.html` (repository root), unchanged except for:
 * - emojis drawn as images (see above);
 * - a `noindex` tag, since it contains personal contact details;
 * - a small toolbar (back to the site, download as PDF), hidden when printing.
 * The PDF itself is generated after the build by scripts/postbuild.mjs.
 */
export function renderCv(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pdfName = site.cv.pdf.split('/').pop();
  const raw = readFileSync(join(process.cwd(), 'cv.html'), 'utf8');

  // Only the <body> may contain emojis worth replacing (the <head> holds base64 fonts).
  const html = raw.replace(/(<body[^>]*>)([\s\S]*)(<\/body>)/i, (_, open, body, close) => open + inlineEmoji(body) + close);

  const head = `<meta name="robots" content="noindex">
<link rel="icon" href="${base}/favicon.ico" sizes="32x32">
<style>
  .cv-toolbar{position:fixed;top:16px;right:16px;z-index:10;display:flex;gap:8px;font:500 14px/1 system-ui,sans-serif}
  .cv-toolbar a{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:10px 16px;border-radius:999px;
    text-decoration:none;background:#fff;color:#151515;border:1px solid #d5d9d6;box-shadow:0 4px 16px rgba(0,0,0,.12)}
  .cv-toolbar a.pdf{background:#138a45;border-color:#138a45;color:#fff}
  .cv-toolbar a:hover{transform:translateY(-1px)}
  .cv-toolbar svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  @media (max-width:640px){
    .cv-toolbar{top:auto;bottom:12px;left:12px;right:12px;justify-content:center;font-size:13px}
    .cv-toolbar a{padding:10px 14px}
    body{padding-bottom:64px}
  }
  /* On screens narrower than an A4 page, the page is scaled down to fit (never when printing). */
  @media screen and (max-width:809px){
    html .page{transform:scale(var(--cv-zoom,1));transform-origin:top left;
      margin-top:8px;margin-left:max(8px, calc((100vw - 210mm * var(--cv-zoom,1)) / 2));
      margin-bottom:calc(8px + 297mm * (var(--cv-zoom,1) - 1))}
  }
  @media print{.cv-toolbar{display:none}}
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

  const toolbar = `<nav class="cv-toolbar" aria-label="CV">
  <a href="${base}/fr/"><svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7M19 12H5"/></svg>Retour au site</a>
  <a class="pdf" href="${base}${site.cv.pdf}" download="${pdfName}"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Télécharger en PDF</a>
</nav>`;

  return html.replace(/<head>/i, `<head>\n${head}`).replace(/<\/body>/i, `${toolbar}\n</body>`);
}
