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
  {
    period: '2026 — today',
    role: { en: 'Founder', fr: 'Fondateur' },
    org: 'Ekko',
    url: 'https://ekkoapp.org/',
    text: {
      en: '“Your view of the ocean.” A community platform that turns every experience into exploration, learning and sharing for ocean preservation.',
      fr: '« Votre regard sur l’océan. » Plateforme communautaire qui transforme chaque expérience en exploration, apprentissage et partage pour la préservation des océans.',
    },
    project: 'ekko',
  },
  {
    period: '2021 — 2026',
    role: { en: 'R&D engineer, OTT & cloud DVR', fr: 'Ingénieur R&D, OTT & cloud DVR' },
    org: 'ATEME',
    url: 'https://www.ateme.com/',
    text: {
      en: 'Development of a video delivery product used by France TV, Canal+, Arte, Netflix… Architecture of a microservices solution and quality oversight. Proxy manager: team workflow and onboarding of newcomers.',
      fr: 'Développement d’un produit de diffusion vidéo utilisé par France TV, Canal+, Arte, Netflix… Architecture d’une solution microservices, encadrement de la qualité. Proxy-manager : workflow d’équipe et encadrement des nouveaux arrivants.',
    },
  },
  {
    period: '2019 — 2020',
    role: {
      en: 'R&D engineer, vision & augmented reality (work-study)',
      fr: 'Ingénieur R&D, vision & réalité augmentée (alternance)',
    },
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
    period: '2017 — 2020',
    role: { en: 'Engineering degree, digital imaging', fr: 'Diplôme d’ingénieur, imagerie numérique' },
    org: 'ESIR, Université de Rennes',
    url: 'https://esir.univ-rennes.fr/',
    text: {
      en: 'Computer vision, image processing, video compression, management.',
      fr: 'Vision par ordinateur, traitement d’images, compression vidéo, management.',
    },
  },
  {
    period: '2016 — 2017',
    role: { en: 'BSc Computer Games Development', fr: 'BSc Computer Games Development' },
    org: 'University of the West of Scotland',
    url: 'https://www.uws.ac.uk/',
    text: {
      en: 'One year in Glasgow: project management, game design, GUI design, level design and 3D development.',
      fr: 'Un an à Glasgow : gestion de projet, game design, conception d’interfaces, level design et développement 3D.',
    },
  },
  {
    period: '2016',
    role: { en: 'Software & electronic test intern', fr: 'Stagiaire développeur logiciel et test électronique' },
    org: 'Mu-Test',
    url: 'http://www.mu-test.com/',
    text: {
      en: '4-month internship in automated test equipment (ATE): improvement and experimentation of validation procedures for electronic components, Java GUI development, unit testing.',
      fr: 'Stage de 4 mois dans le test automatisé (ATE) : amélioration et expérimentation de procédures de validation de composants électroniques, développement d’interfaces Java, tests unitaires.',
    },
    project: 'mutest',
  },
  {
    period: '2014 — 2016',
    role: {
      en: 'Technical degree (DUT), electrical engineering & industrial computing',
      fr: 'DUT Génie Électrique et Informatique Industrielle',
    },
    org: 'IUT, Université Jean-Monnet',
    url: 'https://iut.univ-st-etienne.fr/',
    text: {
      en: 'Saint-Étienne: electronics, robotics, energy, electrical engineering, automation, embedded systems.',
      fr: 'Saint-Étienne : électronique, robotique, énergie, électrotechnique, automatisme, systèmes embarqués.',
    },
  },
];
