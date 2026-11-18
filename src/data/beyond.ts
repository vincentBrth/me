import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/Icon.astro';
import type { Lang } from '../i18n/ui';

type Item = {
  icon: IconName;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
  link?: { href: string; label: Record<Lang, string> };
};

/** "What drives me" section of the home page. Taken from the interests listed in the resume. */
export const beyond: Item[] = [
  {
    icon: 'volleyball',
    title: { en: 'Sport', fr: 'Sport' },
    text: {
      en: 'Volleyball, motorbike, sailing, canyoning, diving and HIIT.',
      fr: 'Volley, moto, voile, canyoning, plongée et HIIT.',
    },
  },
  {
    icon: 'dices',
    title: { en: 'Strategy', fr: 'Stratégie' },
    text: {
      en: 'Board games and video games.',
      fr: 'Jeux de société et jeux vidéo.',
    },
  },
  {
    icon: 'wrench',
    title: { en: 'DIY', fr: 'Bricolage' },
    text: {
      en: 'Various and miscellaneous.',
      fr: 'Divers & variés.',
    },
  },
  {
    icon: 'film',
    title: { en: 'Art & culture', fr: 'Art & culture' },
    text: {
      en: 'Documentaries, history, sci-fi and animation, punk/rock music.',
      fr: 'Documentaires, histoire, SF et animation, musique punk/rock.',
    },
  },
  {
    icon: 'chef-hat',
    title: { en: 'Cooking', fr: 'Cuisine' },
    text: {
      en: 'Everything. No exceptions.',
      fr: 'Tout. Sans exception.',
    },
  },
  {
    icon: 'brain',
    title: { en: 'Psychology', fr: 'Psychologie' },
    text: {
      en: 'Social and positive psychology, understanding how people think, act and work together.',
      fr: 'Sociale et positive, comprendre comment on pense, agit et interagit ensemble.',
    },
  },
];

import canyoning from '../assets/beyond/canyoning.webp';
import bivouac from '../assets/beyond/bivouac.webp';
import plongee from '../assets/beyond/plongee.webp';
import chantier from '../assets/beyond/chantier.webp';
import moto from '../assets/beyond/moto.webp';
import roadTrip from '../assets/beyond/road-trip.webp';
import plage from '../assets/beyond/plage.webp';
import pause from '../assets/beyond/pause.webp';

type Photo = {
  src: ImageMetadata;
  /** Shown over the photo; leave empty for none. */
  caption: Record<Lang, string>;
  alt: Record<Lang, string>;
  /** CSS object-position, to keep the subject in the square crop. */
  position?: string;
};

/** Photo strip under the "What drives me" cards. Sources in src/assets/beyond/ (resized, metadata stripped). */
export const photos: Photo[] = [
  {
    src: canyoning,
    caption: { en: '', fr: '' },
    alt: { en: 'Abseiling down a cliff above a turquoise pool', fr: 'En rappel au-dessus d’un bassin turquoise' },
    position: '50% 60%',
  },
  {
    src: bivouac,
    caption: { en: '', fr: '' },
    alt: { en: 'A tent on a mountain pasture at sunset', fr: 'Une tente sur un alpage au coucher du soleil' },
  },
  {
    src: plongee,
    caption: { en: '', fr: '' },
    alt: { en: 'Scuba diving above a reef', fr: 'En plongée au-dessus d’un récif' },
  },
  {
    src: chantier,
    caption: { en: '', fr: '' },
    alt: { en: 'On a stonework site, mountains in the background', fr: 'Sur un chantier de maçonnerie, montagnes en arrière-plan' },
    position: '50% 70%',
  },
  {
    src: moto,
    caption: { en: '', fr: '' },
    alt: { en: 'Sitting on a motorbike facing the sea', fr: 'Assis sur une moto face à la mer' },
  },
  {
    src: roadTrip,
    caption: { en: '', fr: '' },
    alt: { en: 'A car with a roof tent set up in a mountain valley', fr: 'Une voiture avec tente de toit dépliée dans une vallée' },
  },
  {
    src: plage,
    caption: { en: '', fr: '' },
    alt: { en: 'Walking along a beach', fr: 'Marche le long d’une plage' },
    position: '50% 65%',
  },
  {
    src: pause,
    caption: { en: '', fr: '' },
    alt: { en: 'Selfie by the sea', fr: 'Selfie au bord de la mer' },
    position: '30% 50%',
  },
];
