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
      en: 'Volleyball, motorbike, sailing, canyoning, diving and HIIT. Diving is where Ekko started.',
      fr: 'Volley, moto, voile, canyoning, plongée et HIIT. C’est sous l’eau qu’est né Ekko.',
    },
  },
  {
    icon: 'dices',
    title: { en: 'Strategy', fr: 'Stratégie' },
    text: {
      en: 'Board games and video games, as long as it takes some planning.',
      fr: 'Jeux de société et jeux vidéo, tant qu’il faut réfléchir à plusieurs coups.',
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
      en: 'Documentaries, history, sci-fi and animation, with punk and rock in the background.',
      fr: 'Documentaires, histoire, SF et animation, avec du punk et du rock en fond sonore.',
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
      en: 'Social and positive psychology: understanding how people think, act and work together.',
      fr: 'Sociale et positive : comprendre comment on pense, agit et interagis ensemble.',
    },
  },
];
