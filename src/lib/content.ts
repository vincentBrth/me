import { getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';
import { site } from '../data/site';

export type Project = CollectionEntry<'projects'>;

/** All projects in chronological order (most recent first). */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  for (const p of all) {
    // The dev content cache can keep entries parsed before a field was added to the schema,
    // without its default value: fill them in again.
    p.data.gallery ??= [];
    p.data.stack ??= [];
    p.data.links ??= {};
    p.data.featured ??= false;
    p.data.archived ??= false;
  }
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** True when the source code is a public repository of mine on GitHub. */
export function isOpenSource(p: Project): boolean {
  return p.data.links.source?.startsWith(`https://github.com/${site.github}/`) ?? false;
}

/** Renders trusted Markdown from the content files. */
export function md(source: string | undefined, inline = false): string {
  if (!source) return '';
  return (inline ? marked.parseInline(source) : marked.parse(source)) as string;
}

/** Plain-text version of inline Markdown (for meta descriptions, alt texts). */
export function plain(source: string): string {
  return source.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
}
