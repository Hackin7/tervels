import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publishedPosts, mapPins } from '../../lib/aggregates';

export const GET: APIRoute = async () => {
  const posts = publishedPosts(await getCollection('posts'));
  const pins = mapPins(posts);
  return new Response(JSON.stringify(pins), {
    headers: { 'Content-Type': 'application/json' },
  });
};
