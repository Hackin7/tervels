import type { CollectionEntry } from 'astro:content';
import { slugify } from './slugify';
import { eventMeta, type EventMeta } from './events';

export type Post = CollectionEntry<'posts'>;
export type Location = Post['data']['locations'][number];
export type Experience = Post['data']['experiences'][number];
export type NamedExperienceKind = 'museum' | 'trail' | 'food' | 'market';
export type NamedExperience = Extract<Experience, { kind: NamedExperienceKind }>;

const UNRESOLVED_COUNTRY = 'XX';
const UNRESOLVED_COUNTRY_NAME = 'Unknown';
const UNRESOLVED_CITY = 'unknown';

export function countrySlug(country: string): string {
  return slugify(country, 8) || country.toLowerCase();
}

export function primaryLocation(post: Post): Location {
  return post.data.locations[0];
}

export function isLocationValueResolved(location: Location): boolean {
  return location.country !== UNRESOLVED_COUNTRY &&
    location.country !== UNRESOLVED_COUNTRY_NAME &&
    location.city_slug !== UNRESOLVED_CITY;
}

export function isLocationResolved(post: Post): boolean {
  return isLocationValueResolved(primaryLocation(post));
}

/** Build the display URL slug for a post: <country>/<city_slug>/<YYYY-MM-title>. */
export function postUrlSlug(post: Post): string {
  const location = primaryLocation(post);
  const country = countrySlug(location.country);
  const city = location.city_slug;
  const timestamp = post.data.timestamp;
  const ym = `${timestamp.getUTCFullYear()}-${String(timestamp.getUTCMonth() + 1).padStart(2, '0')}`;
  const title = slugify(post.data.title) || 'untitled';
  return `${country}/${city}/${ym}-${title}`;
}

export function publishedPosts(all: Post[]): Post[] {
  return all
    .filter(p => !p.data.draft && isLocationResolved(p))
    .sort((a, b) => b.data.timestamp.getTime() - a.data.timestamp.getTime());
}

/** All non-draft posts, including those with unresolved location. */
export function navigablePosts(all: Post[]): Post[] {
  return all
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.timestamp.getTime() - a.data.timestamp.getTime());
}

/** Posts whose location couldn't be resolved (need manual triage). */
export function unresolvedPosts(all: Post[]): Post[] {
  return all
    .filter(p => !p.data.draft && !isLocationResolved(p))
    .sort((a, b) => b.data.timestamp.getTime() - a.data.timestamp.getTime());
}

export function postsByCountry(posts: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    for (const country of new Set(p.data.locations.filter(isLocationValueResolved).map(l => countrySlug(l.country)))) {
      const arr = map.get(country) ?? [];
      arr.push(p);
      map.set(country, arr);
    }
  }
  return map;
}

export function citiesInCountry(posts: Post[], country: string): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    const citySlugs = new Set(p.data.locations
      .filter(l => isLocationValueResolved(l) && countrySlug(l.country) === country)
      .map(l => l.city_slug));
    for (const slug of citySlugs) {
      const arr = map.get(slug) ?? [];
      arr.push(p);
      map.set(slug, arr);
    }
  }
  return map;
}

export function postsInCity(posts: Post[], country: string, city: string): Post[] {
  return posts.filter(p => p.data.locations.some(l =>
    countrySlug(l.country) === country && l.city_slug === city
  ));
}

export function namedExperiences(post: Post, kind: NamedExperienceKind): NamedExperience[] {
  return post.data.experiences.filter(
    (experience): experience is NamedExperience => experience.kind === kind
  );
}

/** Filter an already-sorted post list without changing its order. */
export function postsWithExperience(posts: Post[], kind: NamedExperienceKind): Post[] {
  return posts.filter(post => namedExperiences(post, kind).length > 0);
}

export function locationInCity(post: Post, country: string, city: string): Location | undefined {
  return post.data.locations.find(l => countrySlug(l.country) === country && l.city_slug === city);
}

export interface MapPin {
  slug: string;            // display URL slug
  title: string;
  country: string;
  city: string;
  city_display: string;
  location_name: string;
  timestamp: string;
  gps: [number, number];
}

export function parseTripFromId(id: string): { year: string; trip: string } | null {
  const parts = id.split('/').filter(Boolean);
  if (parts.length < 3) return null;
  return { year: parts[0], trip: parts[1] };
}

export function tripDisplayName(slug: string): string {
  if (slug === '_unsorted') return 'Unsorted';
  return slug;
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
    const times = arr.map(p => p.data.timestamp.getTime());
    const earliest = new Date(Math.min(...times));
    const latest = new Date(Math.max(...times));
    const countries = [...new Set(arr.flatMap(p => p.data.locations.filter(isLocationValueResolved).map(l => countrySlug(l.country))))];
    const cities = [...new Set(arr.flatMap(p => p.data.locations.filter(isLocationValueResolved).map(l => l.city)))];
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
    const eventSlugs = new Set(p.data.experiences
      .filter((experience): experience is Extract<Experience, { kind: 'event' }> => experience.kind === 'event')
      .map(experience => experience.slug));
    for (const slug of eventSlugs) {
      const arr = buckets.get(slug) ?? [];
      arr.push(p);
      buckets.set(slug, arr);
    }
  }

  const out: EventGroup[] = [];
  for (const [slug, arr] of buckets) {
    const sorted = [...arr].sort((a, b) => a.data.timestamp.getTime() - b.data.timestamp.getTime());
    const times = sorted.map(p => p.data.timestamp.getTime());
    out.push({
      slug,
      meta: eventMeta(slug),
      posts: sorted,
      earliest: new Date(Math.min(...times)),
      latest: new Date(Math.max(...times)),
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
    for (const location of p.data.locations) {
      if (!location.gps || !isLocationValueResolved(location)) continue;
      out.push({
        slug: postUrlSlug(p),
        title: p.data.title,
        country: countrySlug(location.country),
        city: location.city_slug,
        city_display: location.city,
        location_name: location.name,
        timestamp: p.data.timestamp.toISOString(),
        gps: location.gps,
      });
    }
  }
  return out;
}
