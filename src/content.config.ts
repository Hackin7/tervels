import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { EVENTS_BY_SLUG } from './lib/events';

const gps = z.union([
  z.tuple([
    z.number().min(-90).max(90),
    z.number().min(-180).max(180),
  ]),
  z.null(),
]);

const location = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  city_slug: z.string().regex(/^[a-z0-9-]+$/),
  gps,
  context: z.enum(['visited', 'mentioned', 'planned', 'comparison', 'skipped', 'retrospective', 'calendar']).optional(),
  review_note: z.string().optional(),
  gps_source: z.enum(['telegram', 'exif', 'manual', 'openstreetmap', 'official', 'old-frontmatter']).optional(),
  gps_granularity: z.enum(['building', 'venue', 'street', 'area', 'city']).optional(),
  gps_confidence: z.enum(['high', 'medium', 'low']).optional(),
  gps_query: z.string().optional(),
  zoom: z.number().int().min(1).max(20).optional(),
});

const experience = z.discriminatedUnion('kind', [
  z.object({
    kind: z.enum(['museum', 'trail', 'food', 'market']),
    name: z.string().min(1),
  }),
  z.object({
    kind: z.literal('event'),
    slug: z.string().regex(/^[a-z0-9-]+$/),
  }),
]);

const youtubeVideoId = z.string().regex(/^[A-Za-z0-9_-]{11}$/);
const youtubePlaylistId = z.string().regex(/^[A-Za-z0-9_-]{12,}$/);
const youtubeItem = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('video'),
    id: youtubeVideoId,
    start: z.number().int().nonnegative().optional(),
  }),
  z.object({
    kind: z.literal('playlist'),
    id: youtubePlaylistId,
  }),
]);

const posts = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    timestamp: z.coerce.date(),
    locations: z.array(location).min(1),
    cover: image().optional(),
    gallery: z.array(image()).default([]),
    youtube: z.object({
      items: z.array(youtubeItem).default([]),
      cover: youtubeVideoId.optional(),
    }).optional(),
    experiences: z.array(experience).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    source: z.object({
      kind: z.enum(['telegram', 'manual']).default('manual'),
      message_id: z.number().optional(),
      message_ids: z.array(z.number().int()).optional(),
      channel_id: z.number().int().optional(),
      telegram_timestamp: z.coerce.date().optional(),
      imported_at: z.coerce.date().optional(),
      date_basis: z.enum(['capture', 'telegram', 'calendar']).optional(),
    }).optional(),
  }).superRefine((post, ctx) => {
    if (post.cover && post.youtube?.cover) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Use either cover or youtube.cover, not both.',
        path: ['youtube', 'cover'],
      });
    }
  }),
});

const hauls = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/haul' }),
  schema: ({ image }) => z.object({
    title: z.string().optional(),
    event: z.string().refine(slug => EVENTS_BY_SLUG.has(slug), 'Event must exist in the event catalog.'),
    date: z.coerce.date(),
    locations: z.array(location).default([]),
    photos: z.array(z.object({
      src: image(),
      alt: z.string().min(1),
      caption: z.string().optional(),
    })).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, hauls };
