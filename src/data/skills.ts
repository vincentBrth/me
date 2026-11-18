import type { Lang } from '../i18n/ui';

type Group = { title: Record<Lang, string>; items: string[] };

export const skills: Group[] = [
  {
    title: { en: 'Languages & systems', fr: 'Langages & systèmes' },
    items: ['C/C++17', 'Python', 'Rust', 'Go', 'Linux', 'Docker', 'Kubernetes', 'Git'],
  },
  {
    title: { en: 'Imaging & computer vision', fr: 'Imagerie & vision' },
    items: ['OpenCV', '3D sensors', 'Pose estimation', 'Point clouds / ICP', 'Augmented reality', 'HDR'],
  },
  {
    title: { en: '3D, rendering & games', fr: '3D, rendu & jeux' },
    items: ['OpenGL', 'Ray & path tracing', 'Unity / C#', 'Unreal Engine', 'WebGL'],
  },
  {
    title: { en: 'Web & cloud', fr: 'Web & cloud' },
    items: ['TypeScript', 'React / React Native', 'Vue', 'Svelte', 'SQL / PostgreSQL', 'Microservices', 'Firebase'],
  },
  {
    title: { en: 'Engineering', fr: 'Ingénierie' },
    items: ['Solution architecture', 'Embedded systems', 'Electronics', 'Continuous integration', 'LLM / AI agents', 'Qt', 'Open source'],
  },
];
