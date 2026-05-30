import type { CollectionEntry } from 'astro:content';
import { slugify } from './slugify';
import { eventMeta, type EventMeta } from './events';

export type Post = CollectionEntry<'posts'>;

const UNRESOLVED_COUNTRY = 'XX';
const UNRESOLVED_COUNTRY_NAME = 'Unknown';
const UNRESOLVED_CITY = 'unknown';

export function countrySlug(country: string): string {
  return slugify(country, 8) || country.toLowerCase();
}

export function isLocationResolved(post: Post): boolean {
  const c = post.data.location.country;
  const cs = post.data.location.city_slug;
  return c !== UNRESOLVED_COUNTRY && c !== UNRESOLVED_COUNTRY_NAME && cs !== UNRESOLVED_CITY;
}

/** Build the display URL slug for a post: <country>/<city_slug>/<YYYY-MM-title>. */
export function postUrlSlug(post: Post): string {
  const country = countrySlug(post.data.location.country);
  const city = post.data.location.city_slug;
  const date = post.data.date;
  const ym = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
  const title = slugify(post.data.title) || 'untitled';
  return `${country}/${city}/${ym}-${title}`;
}

export function publishedPosts(all: Post[]): Post[] {
  return all
    .filter(p => !p.data.draft && isLocationResolved(p))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** All non-draft posts, including those with unresolved location. */
export function navigablePosts(all: Post[]): Post[] {
  return all
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Posts whose location couldn't be resolved (need manual triage). */
export function unresolvedPosts(all: Post[]): Post[] {
  return all
    .filter(p => !p.data.draft && !isLocationResolved(p))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function postsByCountry(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    const country = countrySlug(p.data.location.country);
    const arr = map.get(country) ?? [];
    arr.push(p);
    map.set(country, arr);
  }
  return map;
}

export function citiesInCountry(posts: Post[], country: string): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    if (countrySlug(p.data.location.country) !== country) continue;
    const slug = p.data.location.city_slug;
    const arr = map.get(slug) ?? [];
    arr.push(p);
    map.set(slug, arr);
  }
  return map;
}

export function postsInCity(posts: Post[], country: string, city: string): Post[] {
  return posts.filter(p =>
    countrySlug(p.data.location.country) === country &&
    p.data.location.city_slug === city
  );
}

export interface MapPin {
  slug: string;            // display URL slug
  title: string;
  country: string;
  city: string;
  city_display: string;
  date: string;
  coords: [number, number];
}

export function parseTripFromId(id: string): { year: string; trip: string } | null {
  const parts = id.split('/').filter(Boolean);
  if (parts.length < 3) return null;
  return { year: parts[0], trip: parts[1] };
}

export function tripDisplayName(slug: string): string {
  if (slug === '_unsorted') return 'Unsorted';
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export interface TripGroup {
  year: string;
  trip: string;
  displayName: string;
  posts: Post[];
  earliest: Date;
  latest: Date;
  countries: string[];
  cities: string[];
}

export interface EventGroup {
  slug: string;
  meta: EventMeta;
  posts: Post[];
  earliest: Date;
  latest: Date;
}

export function postsByTrip(posts: Post[]): TripGroup[] {
  const buckets = new Map<string, Post[]>();
  for (const p of posts) {
    const seg = parseTripFromId(p.id);
    if (!seg) continue;
    const key = `${seg.year}/${seg.trip}`;
    const arr = buckets.get(key) ?? [];
    arr.push(p);
    buckets.set(key, arr);
  }
  const out: TripGroup[] = [];
  for (const [key, arr] of buckets) {
    const [year, trip] = key.split('/');
    const starts = arr.map(p => p.data.visited.start.getTime());
    const ends = arr.map(p => p.data.visited.end.getTime());
    const earliest = new Date(Math.min(...starts));
    const latest = new Date(Math.max(...ends));
    const countries = [...new Set(arr.map(p => countrySlug(p.data.location.country)))];
    const cities = [...new Set(arr.map(p => p.data.location.city))];
    out.push({
      year, trip, displayName: tripDisplayName(trip),
      posts: arr, earliest, latest, countries, cities,
    });
  }
  out.sort((a, b) => b.latest.getTime() - a.latest.getTime());
  return out;
}

export function postsByEvent(posts: Post[]): EventGroup[] {
  const buckets = new Map<string, Post[]>();
  for (const p of posts) {
    for (const event of p.data.events) {
      const arr = buckets.get(event) ?? [];
      arr.push(p);
      buckets.set(event, arr);
    }
  }

  const out: EventGroup[] = [];
  for (const [slug, arr] of buckets) {
    const sorted = [...arr].sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
    const starts = sorted.map(p => p.data.visited.start.getTime());
    const ends = sorted.map(p => p.data.visited.end.getTime());
    out.push({
      slug,
      meta: eventMeta(slug),
      posts: sorted,
      earliest: new Date(Math.min(...starts)),
      latest: new Date(Math.max(...ends)),
    });
  }

  out.sort((a, b) =>
    b.meta.year - a.meta.year ||
    b.latest.getTime() - a.latest.getTime() ||
    a.meta.name.localeCompare(b.meta.name)
  );
  return out;
}

export function mapPins(posts: Post[]): MapPin[] {
  const out: MapPin[] = [];
  for (const p of posts) {
    if (!p.data.location.coords) continue;
    out.push({
      slug: postUrlSlug(p),
      title: p.data.title,
      country: countrySlug(p.data.location.country),
      city: p.data.location.city_slug,
      city_display: p.data.location.city,
      date: p.data.date.toISOString().slice(0, 10),
      coords: p.data.location.coords,
    });
  }
  return out;
}
