import type { Lang } from '../i18n/ui';

type Entry = {
  period: string;
  role: Record<Lang, string>;
  org: string;
  url?: string;
  text: Record<Lang, string>;
  /** Related project page (slug), if any. */
  project?: string;
  /** Draft entries are not displayed. */
  draft?: boolean;
};

/** Most recent first. */
export const experience: Entry[] = [
  // TODO: add the current position and the 2020 → today path here.
  // {
  //   period: '2021 — today',
  //   role: { en: '…', fr: '…' },
  //   org: '…',
  //   text: { en: '…', fr: '…' },
  // },
  {
    period: '2019 — 2020',
    role: { en: 'R&D engineer (work-study)', fr: 'Ingénieur R&D (alternance)' },
    org: 'IRT b<>com',
    url: 'https://b-com.com/',
    text: {
      en: 'Immersive Medical Technologies lab. Contributed to SolAR, an open-source C++17 computer vision framework: Unity plugin for Android, continuous integration, modules and samples for Intel RealSense depth cameras.',
      fr: 'Laboratoire Immersive Medical Technologies. Contribution à SolAR, framework open source C++17 de vision par ordinateur : plugin Unity pour Android, intégration continue, modules et samples pour les caméras de profondeur Intel RealSense.',
    },
    project: 'bcom',
  },
  {
    period: '2019',
    role: { en: 'Software engineering intern', fr: 'Stagiaire ingénieur logiciel' },
    org: 'Askelys',
    url: 'http://askelys.com/',
    text: {
      en: '4-month internship in a semantic web startup. Built a Unity WebGL prototype on top of the company’s JavaScript library.',
      fr: 'Stage de 4 mois dans une startup du web sémantique. Développement d’un prototype WebGL sous Unity s’appuyant sur la librairie JavaScript de l’entreprise.',
    },
    project: 'askelys',
  },
  {
    period: '2016',
    role: { en: 'Software developer intern', fr: 'Stagiaire développeur' },
    org: 'Mu-Test',
    url: 'http://www.mu-test.com/',
    text: {
      en: '4-month internship in automated test equipment (ATE): Java GUI development, unit testing and bug fixing.',
      fr: 'Stage de 4 mois dans le test automatisé (ATE) : développement d’interfaces Java, tests unitaires et correction de bugs.',
    },
    project: 'mutest',
  },
  {
    // TODO: check the degree and dates, then remove `draft`.
    draft: true,
    period: '— 2020',
    role: { en: 'Engineering degree, digital imaging', fr: 'Diplôme d’ingénieur, imagerie numérique' },
    org: 'ESIR — Université de Rennes',
    url: 'https://esir.univ-rennes.fr/',
    text: { en: '', fr: '' },
  },
];
