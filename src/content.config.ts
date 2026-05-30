import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    timestamp: z.coerce.date().optional(),
    date: z.coerce.date(),
    visited: z.object({
      start: z.coerce.date(),
      end: z.coerce.date(),
    }),
    location: z.object({
      name: z.string(),
      country: z.string().min(1),
      city: z.string(),
      city_slug: z.string().regex(/^[a-z0-9-]+$/),
      location_or_event: z.string().default('Unknown'),
      coords: z.union([z.tuple([z.number(), z.number()]), z.null()]).optional(),
      coord_source: z.enum(['manual', 'geocoded-building', 'geocoded-venue', 'geocoded-street', 'geocoded-area', 'geocoded-city', 'old-frontmatter']).optional(),
      coord_granularity: z.enum(['building', 'venue', 'street', 'area', 'city']).optional(),
      coord_confidence: z.enum(['high', 'medium', 'low']).optional(),
      coord_query: z.string().optional(),
      zoom: z.number().int().min(1).max(20).optional(),
    }),
    cover: image().optional(),
    events: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    source: z.object({
      kind: z.enum(['telegram', 'manual']).default('manual'),
      message_id: z.number().optional(),
      imported_at: z.coerce.date().optional(),
      date_basis: z.enum(['capture', 'telegram']).optional(),
    }).optional(),
  }),
});

export const collections = { posts };
