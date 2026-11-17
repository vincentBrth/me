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
  available: false,
  /** Shows the "Beyond code" section of the home page and its menu link. */
  showBeyond: false,
  /**
   * The resume is the `cv.html` file at the repository root. It is served at /cv/ and
   * exported to PDF at build time (scripts/postbuild.mjs).
   */
  cv: { page: '/cv/', pdf: '/cv/CV_BERTHET_Vincent.pdf' },
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
