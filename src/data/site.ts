/**
 * Global settings for the site. Edit this file to update personal details.
 */
export const site = {
  name: 'Vincent Berthet',
  github: 'vincentBrth',
  repo: 'me',
  email: 'vincent.berthet@protonmail.com',
  /** Set `show` to false to hide the phone number from the site. */
  phone: { show: true, display: '+33 6 58 65 90 33', href: 'tel:+33658659033' },
  /** Shows the "Open to opportunities" badge in the hero. */
  available: true,
  /** Shows the ASCII portrait in the hero and in the sharing image (off until the photo is updated). */
  showPortrait: false,
  /** Shows the "What drives me" section of the home page and its menu link. */
  showBeyond: true,
  /**
   * The resume is written by hand at the repository root: `cv.html` (French), served at /cv/,
   * and `cv.en.html` (English), served at /cv/en/. Both are exported to PDF at build time
   * (scripts/postbuild.mjs).
   */
  cv: {
    fr: { file: 'cv.html', page: '/cv/', pdf: '/cv/CV_BERTHET_Vincent.pdf' },
    en: { file: 'cv.en.html', page: '/cv/en/', pdf: '/cv/CV_BERTHET_Vincent_EN.pdf' },
  },
  /** Contact card (email signature), also exported to PDF at build time (scripts/postbuild.mjs) and as a .vcf file. */
  card: {
    fr: { page: '/card/', pdf: '/card/Carte_BERTHET_Vincent.pdf', vcf: '/card/vincent-berthet.vcf' },
    en: { page: '/card/en/', pdf: '/card/Card_BERTHET_Vincent_EN.pdf', vcf: '/card/en/vincent-berthet.vcf' },
  },
  /**
   * Privacy-friendly audience statistics (no cookies, no personal data) with GoatCounter.
   * Create a free account on https://www.goatcounter.com and put its code here (e.g. 'vincentberthet').
   * Empty = no statistics script at all.
   */
  goatcounter: '',
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vincent-berthet' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/vincentBrth' },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UC1zTh8-gfUpfaW8xvRnYHXw' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vincent_berthet' },
    { id: 'x', label: 'X', href: 'https://x.com/_Sissouu' },
  ],
} as const;

/** Base URL of the public files (reports, archives) hosted in the Workspace repository. */
export const publicFiles = 'https://github.com/vincentBrth/Workspace/raw/master/Public/';
