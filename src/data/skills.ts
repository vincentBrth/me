import type { Lang } from '../i18n/ui';

type Group = { title: Record<Lang, string>; items: string[] };

export const skills: Group[] = [
  {
    title: { en: 'Imaging & computer vision', fr: 'Imagerie & vision' },
    items: ['OpenCV', 'Python', 'C++', 'Pose estimation', 'Point clouds / ICP', 'HDR'],
  },
  {
    title: { en: '3D, rendering & games', fr: '3D, rendu & jeux' },
    items: ['Unity / C#', 'Unreal Engine', 'Ray & path tracing', 'WebGL', 'Augmented reality'],
  },
  {
    title: { en: 'Web', fr: 'Web' },
    items: ['JavaScript / TypeScript', 'React', 'Vue', 'Svelte', 'Firebase', 'Supabase'],
  },
  {
    title: { en: 'Engineering', fr: 'Ingénierie' },
    items: ['Continuous integration', 'Qt', 'Java', 'Git', 'Open source'],
  },
];
