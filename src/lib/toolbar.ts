import { localePath, withBase, type Lang } from '../i18n/ui';

/**
 * Floating toolbar of the standalone pages (resume, contact card): back to the site,
 * same page in the other language, download as PDF. Hidden when printing.
 */
export const toolbarCss = `
  .page-toolbar{position:fixed;top:16px;right:16px;z-index:10;display:flex;gap:8px;font:500 14px/1 system-ui,sans-serif}
  .page-toolbar a{box-sizing:border-box;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:10px 16px;border-radius:999px;
    text-decoration:none;background:#fff;color:#151515;border:1px solid #d5d9d6;box-shadow:0 4px 16px rgba(0,0,0,.12)}
  .page-toolbar a.pdf{background:#138a45;border-color:#138a45;color:#fff}
  .page-toolbar a:hover{transform:translateY(-1px)}
  .page-toolbar svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  @media (max-width:640px){
    .page-toolbar{top:auto;bottom:12px;left:12px;right:12px;justify-content:center;font-size:13px}
    .page-toolbar a{padding:10px 14px}
    body{padding-bottom:64px}
  }
  @media print{.page-toolbar{display:none}}`;

const labels = {
  fr: { back: 'Retour au site', other: 'English', pdf: 'Télécharger en PDF' },
  en: { back: 'Back to the site', other: 'Français', pdf: 'Download as PDF' },
};

/** `pages` and `pdf` are paths without the base, as written in src/data/site.ts. */
export function toolbar(lang: Lang, label: string, pages: Record<Lang, string>, pdf: string): string {
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  const l = labels[lang];
  return `<nav class="page-toolbar" aria-label="${label}">
  <a href="${localePath(lang)}"><svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7M19 12H5"/></svg>${l.back}</a>
  <a href="${withBase(pages[other])}" hreflang="${other}"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>${l.other}</a>
  <a class="pdf" href="${withBase(pdf)}" download="${pdf.split('/').pop()}"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>${l.pdf}</a>
</nav>`;
}
