import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories } from './i18n/ui';

const localized = z.object({ en: z.string(), fr: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: localized,
      /** One or two sentences shown on cards. Inline Markdown allowed. */
      summary: localized,
      /** Longer text shown on the project page. Markdown allowed. */
      description: localized.optional(),
      cover: image().optional(),
      categories: z.array(z.enum(Object.keys(categories) as [keyof typeof categories])).min(1),
      stack: z.array(z.string()).default([]),
      year: z.string().optional(),
      /** Highlighted with a badge and the "Selection" filter. */
      featured: z.boolean().default(false),
      /** Moved out of the main grid, into the collapsed "Archives" list. */
      archived: z.boolean().default(false),
      /** Chronological position: lower = more recent. */
      order: z.number(),
      wip: z.boolean().default(false),
      mobileOnly: z.boolean().default(false),
      links: z
        .object({
          source: z.url().optional(),
          /** Official website of a product (rather than a demo). */
          website: z.url().optional(),
          demo: z.url().optional(),
          download: z.object({ url: z.url(), name: z.string(), lang: z.enum(['en', 'fr']).optional() }).optional(),
        })
        .default({}),
      /** YouTube video id. */
      video: z.string().optional(),
      /** URL of a playable WebGL build, loaded on demand. */
      webgl: z.url().optional(),
      /** Extra screenshots shown on the project page. */
      gallery: z.array(z.object({ src: image(), alt: localized.optional() })).default([]),
    }),
});

export const collections = { projects };
