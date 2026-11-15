export const languages = { en: 'English', fr: 'Français' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const categories = {
  vision: { en: 'Imaging & vision', fr: 'Imagerie & vision' },
  '3d': { en: '3D & rendering', fr: '3D & rendu' },
  games: { en: 'Games', fr: 'Jeux' },
  web: { en: 'Web', fr: 'Web' },
  pro: { en: 'Professional', fr: 'Professionnel' },
  initiatives: { en: 'Initiatives', fr: 'Initiatives' },
} as const;
export type Category = keyof typeof categories;

export const ui = {
  en: {
    'meta.title': 'Vincent Berthet — Engineer, imaging, 3D & web',
    'meta.description':
      'Portfolio of Vincent Berthet, a French engineer working across digital imaging, computer vision, 3D, games and the web.',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.beyond': 'Beyond code',
    'nav.menu': 'Menu',
    'nav.theme': 'Toggle dark mode',
    'nav.lang': 'Lire en français',
    'nav.skip': 'Skip to content',
    'hero.hello': 'Hi, I’m',
    'hero.role': 'Engineer — digital imaging, 3D & web',
    'hero.more': 'and much more',
    'hero.pitch':
      'I build things where pixels meet code: computer vision, rendering engines, games and web apps. Curious by nature, I love learning, experimenting, failing and eventually mastering.',
    'hero.available': 'Open to opportunities',
    'hero.cta.projects': 'See my work',
    'hero.cta.cv': 'My resume',
    'hero.hint.hover': 'hover me',
    'hero.hint.touch': 'tap me',
    'hero.portrait': 'Portrait of Vincent Berthet rendered as ASCII art. Move the pointer over it to reveal the photo.',
    'about.title': 'About',
    'about.text': [
      'I’m Vincent, a French engineer with a background in digital imaging. Thanks for taking the time to get to know me!',
      'I’m passionate about a wide range of topics, in the real world as much as in virtual ones. Here you’ll find projects I’ve been involved in over time: they reflect my curiosity, my passions and part of my skill set, from the most serious to the most eccentric.',
      'Deeply attached to freedom and sharing, I keep most of my sources open. Feel free to reach out to chat, collaborate or simply share an idea.',
    ],
    'skills.title': 'Toolbox',
    'experience.title': 'Experience',
    'experience.more': 'Read the report',
    'projects.title': 'Projects',
    'projects.lead': 'From R&D in computer vision to game jams, experiments and side projects.',
    'projects.filter': 'Filter projects',
    'projects.filter.all': 'All',
    'projects.filter.featured': 'Selection',
    'projects.archives': 'Archives',
    'projects.archivesLead': 'Older projects, kept for the record.',
    'projects.count': 'projects',
    'project.back': 'Back to projects',
    'project.source': 'Source code',
    'project.demo': 'Live demo',
    'project.website': 'Website',
    'project.download': 'Download',
    'project.play': 'Play in the browser',
    'project.playHint': 'Opens the WebGL build (may be heavy on mobile).',
    'project.video': 'Video',
    'project.playVideo': 'Play the video',
    'project.videoHint': 'Loads the YouTube player.',
    'project.wip': 'Work in progress',
    'project.featured': 'Selection',
    'project.openSource': 'Open source',
    'project.has.play': 'Playable in the browser',
    'project.has.video': 'Video',
    'project.has.demo': 'Live demo',
    'project.has.download': 'Files to download',
    'project.archived': 'Archived',
    'project.gallery': 'Gallery',
    'project.mobile': 'Designed for mobile. On a computer, use your browser’s responsive mode.',
    'project.stack': 'Stack',
    'project.year': 'Year',
    'project.categories': 'Domains',
    'project.links': 'Links',
    'project.prev': 'Previous',
    'project.next': 'Next',
    'project.docLang': 'Document in French',
    'contact.title': 'Let’s talk',
    'contact.lead': 'A role, a project, a question or just an idea to share: my inbox is open.',
    'contact.email': 'Send me an email',
    'contact.cv': 'My resume',
    'contact.phone': 'Call me',
    'contact.copy': 'Copy the address',
    'contact.copied': 'Copied!',
    'beyond.title': 'Beyond code',
    'beyond.lead': 'What keeps me busy away from the keyboard.',
    '404.title': 'Page not found',
    '404.text': 'This page does not exist, or not anymore.',
    '404.back': 'Back to home',
  },
  fr: {
    'meta.title': 'Vincent Berthet — Ingénieur, imagerie, 3D & web',
    'meta.description':
      'Portfolio de Vincent Berthet, ingénieur français entre imagerie numérique, vision par ordinateur, 3D, jeux vidéo et web.',
    'nav.about': 'À propos',
    'nav.experience': 'Parcours',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.beyond': 'Hors code',
    'nav.menu': 'Menu',
    'nav.theme': 'Basculer le mode sombre',
    'nav.lang': 'Read in English',
    'nav.skip': 'Aller au contenu',
    'hero.hello': 'Salut, moi c’est',
    'hero.role': 'Ingénieur — imagerie numérique, 3D & web',
    'hero.more': 'et bien plus',
    'hero.pitch':
      'Je construis des choses à la frontière entre pixels et code : vision par ordinateur, moteurs de rendu, jeux et applications web. Curieux de nature, j’aime apprendre, expérimenter, me casser les dents et finir par maîtriser.',
    'hero.available': 'Ouvert aux opportunités',
    'hero.cta.projects': 'Voir mes projets',
    'hero.cta.cv': 'Mon CV',
    'hero.hint.hover': 'survolez-moi',
    'hero.hint.touch': 'touchez-moi',
    'hero.portrait': 'Portrait de Vincent Berthet rendu en ASCII art. Survolez-le pour révéler la photo.',
    'about.title': 'À propos',
    'about.text': [
      'Moi c’est Vincent, ingénieur français de formation en imagerie numérique. Merci de prendre le temps de me découvrir !',
      'Passionné par une multitude de sujets, aussi bien dans le réel que dans le virtuel, vous trouverez ici les projets sur lesquels je me suis impliqué au fil du temps. Ils reflètent mes curiosités, mes passions et une partie de mes compétences, des plus sérieux aux plus farfelus.',
      'Attaché à la liberté et au partage, la plupart de mes sources sont ouvertes. N’hésitez pas à me contacter pour échanger, collaborer ou simplement partager une idée.',
    ],
    'skills.title': 'Boîte à outils',
    'experience.title': 'Parcours',
    'experience.more': 'Lire le rapport',
    'projects.title': 'Projets',
    'projects.lead': 'De la R&D en vision par ordinateur aux game jams, en passant par les expérimentations et projets perso.',
    'projects.filter': 'Filtrer les projets',
    'projects.filter.all': 'Tous',
    'projects.filter.featured': 'Sélection',
    'projects.archives': 'Archives',
    'projects.archivesLead': 'Des projets plus anciens, gardés pour la mémoire.',
    'projects.count': 'projets',
    'project.back': 'Retour aux projets',
    'project.source': 'Code source',
    'project.demo': 'Démo en ligne',
    'project.website': 'Site web',
    'project.download': 'Télécharger',
    'project.play': 'Jouer dans le navigateur',
    'project.playHint': 'Ouvre la version WebGL (peut être lourd sur mobile).',
    'project.video': 'Vidéo',
    'project.playVideo': 'Lire la vidéo',
    'project.videoHint': 'Charge le lecteur YouTube.',
    'project.wip': 'En cours de développement',
    'project.featured': 'Sélection',
    'project.openSource': 'Open source',
    'project.has.play': 'Jouable dans le navigateur',
    'project.has.video': 'Vidéo',
    'project.has.demo': 'Démo en ligne',
    'project.has.download': 'Fichiers à télécharger',
    'project.archived': 'Archivé',
    'project.gallery': 'Galerie',
    'project.mobile': 'Conçu pour mobile. Sur ordinateur, utilisez le mode responsive de votre navigateur.',
    'project.stack': 'Stack',
    'project.year': 'Année',
    'project.categories': 'Domaines',
    'project.links': 'Liens',
    'project.prev': 'Précédent',
    'project.next': 'Suivant',
    'project.docLang': 'Document en français',
    'contact.title': 'On en parle ?',
    'contact.lead': 'Un poste, un projet, une question ou juste une idée à partager : ma boîte mail est ouverte.',
    'contact.email': 'M’envoyer un e-mail',
    'contact.cv': 'Mon CV',
    'contact.phone': 'M’appeler',
    'contact.copy': 'Copier l’adresse',
    'contact.copied': 'Copié !',
    'beyond.title': 'Hors code',
    'beyond.lead': 'Ce qui m’occupe loin du clavier.',
    '404.title': 'Page introuvable',
    '404.text': 'Cette page n’existe pas, ou plus.',
    '404.back': 'Retour à l’accueil',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return function t<K extends UIKey>(key: K): (typeof ui)['en'][K] {
    return (ui[lang][key] ?? ui[defaultLang][key]) as (typeof ui)['en'][K];
  };
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Builds a localized, base-prefixed URL. `path` must start with `/`. */
export function localePath(lang: Lang, path = '/') {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${base}${prefix}${path}`;
}

/** Base-prefixed URL for a non-localized asset or page. */
export function withBase(path: string) {
  return `${base}${path}`;
}
