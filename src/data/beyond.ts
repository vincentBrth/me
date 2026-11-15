import type { IconName } from '../components/Icon.astro';
import type { Lang } from '../i18n/ui';

type Item = {
  icon: IconName;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
  link?: { href: string; label: Record<Lang, string> };
};

/** "Beyond code" section of the home page. Taken from the interests listed in the resume. */
export const beyond: Item[] = [
  {
    icon: 'wrench',
    title: { en: 'DIY & motorbike mechanics', fr: 'DIY & mécanique moto' },
    text: {
      en: 'Taking things apart to understand how they work, then (usually) putting them back together.',
      fr: 'Démonter pour comprendre comment ça marche, puis (en général) tout remonter.',
    },
  },
  {
    icon: 'guitar',
    title: { en: 'Electric guitar', fr: 'Guitare électrique' },
    text: {
      en: 'Another kind of signal processing.',
      fr: 'Une autre forme de traitement du signal.',
    },
  },
  {
    icon: 'waves',
    title: { en: 'Sailing, canyoning & diving', fr: 'Voile, canyoning & plongée' },
    text: {
      en: 'Anything with water, wind or a bit of altitude. Diving is where Ekko started.',
      fr: 'Tout ce qui se pratique avec de l’eau, du vent ou un peu de dénivelé. C’est sous l’eau qu’est né Ekko.',
    },
  },
  {
    icon: 'dices',
    title: { en: 'Strategy games', fr: 'Jeux de stratégie' },
    text: {
      en: 'Board or screen, as long as it takes some planning.',
      fr: 'Sur plateau ou sur écran, tant qu’il faut réfléchir à plusieurs coups.',
    },
  },
  {
    icon: 'camera',
    title: { en: 'Photography', fr: 'Photographie' },
    text: { en: 'A few shots along the way.', fr: 'Quelques images en chemin.' },
    link: { href: 'https://www.instagram.com/vincent_berthet', label: { en: 'Instagram', fr: 'Instagram' } },
  },
  {
    icon: 'clapperboard',
    title: { en: 'Video', fr: 'Vidéo' },
    text: {
      en: 'Editing and trailers, like the one for the ESIR Game Jam.',
      fr: 'Montage et trailers, comme celui de la Game Jam de l’ESIR.',
    },
    link: { href: 'https://www.youtube.com/channel/UC1zTh8-gfUpfaW8xvRnYHXw', label: { en: 'YouTube', fr: 'YouTube' } },
  },
];
