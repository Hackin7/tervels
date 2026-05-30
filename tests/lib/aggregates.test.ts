import { describe, it, expect } from 'vitest';
import {
  postUrlSlug,
  publishedPosts,
  postsByCountry,
  citiesInCountry,
  postsInCity,
  mapPins,
  isLocationResolved,
  postsByTrip,
  postsByEvent,
  tripDisplayName,
  parseTripFromId,
  type Post,
} from '../../src/lib/aggregates';

function fakePost(id: string, data: {
  title?: string;
  date?: Date;
  country?: string;
  city?: string;
  city_slug?: string;
  coords?: [number, number] | null;
  draft?: boolean;
  events?: string[];
} = {}): Post {
  return {
    id,
    slug: id,
    body: '',
    collection: 'posts',
    data: {
      title: data.title ?? 'A post',
      date: data.date ?? new Date('2025-01-01'),
      visited: { start: new Date('2025-01-01'), end: new Date('2025-01-02') },
      location: {
        name: 'X',
        country: data.country ?? 'JP',
        city: data.city ?? 'Kyoto',
        city_slug: data.city_slug ?? 'kyoto',
        ...(data.coords === null ? {} : { coords: data.coords ?? [0, 0] as [number, number] }),
      },
      events: data.events ?? [],
      tags: [],
      draft: data.draft ?? false,
    },
  } as unknown as Post;
}

describe('postUrlSlug', () => {
  it('builds country/city/YYYY-MM-title slug', () => {
    const p = fakePost('2025/spring-japan/kyoto-temples', {
      title: 'Three days in Kyoto',
      date: new Date('2025-04-12T00:00:00Z'),
      country: 'JP', city_slug: 'kyoto',
    });
    expect(postUrlSlug(p)).toBe('jp/kyoto/2025-04-three-days-kyoto');
  });

  it('lowercases the country code', () => {
    const p = fakePost('any/folder/here', {
      title: 'X',
      date: new Date('2024-08-22T00:00:00Z'),
      country: 'IT', city_slug: 'rome',
    });
    expect(postUrlSlug(p).startsWith('it/rome/')).toBe(true);
  });

  it('slugifies full country names', () => {
    const p = fakePost('any/folder/here', {
      title: 'X',
      date: new Date('2024-08-22T00:00:00Z'),
      country: 'United States', city_slug: 'las-vegas',
    });
    expect(postUrlSlug(p).startsWith('united-states/las-vegas/')).toBe(true);
  });

  it('falls back to untitled when title slugifies empty', () => {
    const p = fakePost('any/path', {
      title: 'a',
      date: new Date('2024-08-22T00:00:00Z'),
    });
    expect(postUrlSlug(p)).toMatch(/2024-08-untitled/);
  });
});

describe('isLocationResolved', () => {
  it('true when country and city_slug are real', () => {
    const p = fakePost('a/b/c', { country: 'JP', city_slug: 'kyoto' });
    expect(isLocationResolved(p)).toBe(true);
  });
  it('false when country is XX', () => {
    const p = fakePost('a/b/c', { country: 'XX', city_slug: 'kyoto' });
    expect(isLocationResolved(p)).toBe(false);
  });
  it('false when country is Unknown', () => {
    const p = fakePost('a/b/c', { country: 'Unknown', city_slug: 'kyoto' });
    expect(isLocationResolved(p)).toBe(false);
  });
  it('false when city_slug is unknown', () => {
    const p = fakePost('a/b/c', { country: 'JP', city_slug: 'unknown' });
    expect(isLocationResolved(p)).toBe(false);
  });
});

describe('publishedPosts', () => {
  it('drops drafts and unresolved-location posts, sorts newest first', () => {
    const a = fakePost('2025/sp/x', { date: new Date('2025-04-01'), country: 'JP', city_slug: 'kyoto' });
    const b = fakePost('2024/su/y', { date: new Date('2024-08-01'), country: 'IT', city_slug: 'rome' });
    const c = fakePost('2025/sp/z', { date: new Date('2025-05-01'), draft: true });
    const d = fakePost('2025/sp/w', { date: new Date('2025-06-01'), country: 'XX', city_slug: 'unknown' });
    const out = publishedPosts([a, b, c, d]);
    expect(out.map(p => p.id)).toEqual(['2025/sp/x', '2024/su/y']);
  });
});

describe('postsByCountry', () => {
  it('groups by frontmatter country', () => {
    const a = fakePost('2025/sp/x', { country: 'JP', city_slug: 'kyoto' });
    const b = fakePost('2025/sp/y', { country: 'JP', city_slug: 'tokyo' });
    const c = fakePost('2024/su/z', { country: 'IT', city_slug: 'rome' });
    const m = postsByCountry([a, b, c]);
    expect(m.get('jp')!.length).toBe(2);
    expect(m.get('it')!.length).toBe(1);
  });
});

describe('citiesInCountry', () => {
  it('groups by frontmatter city_slug, ignores other countries', () => {
    const a = fakePost('2025/sp/x', { country: 'JP', city: 'Kyoto', city_slug: 'kyoto' });
    const b = fakePost('2024/au/y', { country: 'JP', city: 'Kyoto', city_slug: 'kyoto' });
    const c = fakePost('2025/sp/z', { country: 'JP', city: 'Tokyo', city_slug: 'tokyo' });
    const d = fakePost('2024/su/w', { country: 'IT', city: 'Rome', city_slug: 'rome' });
    const m = citiesInCountry([a, b, c, d], 'jp');
    expect(m.get('kyoto')!.length).toBe(2);
    expect(m.get('tokyo')!.length).toBe(1);
    expect(m.has('rome')).toBe(false);
  });
});

describe('postsInCity', () => {
  it('filters by both country and city_slug', () => {
    const a = fakePost('a', { country: 'JP', city_slug: 'kyoto' });
    const b = fakePost('b', { country: 'JP', city_slug: 'tokyo' });
    const c = fakePost('c', { country: 'IT', city_slug: 'kyoto' }); // contrived
    const out = postsInCity([a, b, c], 'jp', 'kyoto');
    expect(out.map(p => p.id)).toEqual(['a']);
  });
});

describe('parseTripFromId', () => {
  it('extracts year and trip from year/trip/post ids', () => {
    expect(parseTripFromId('2025/spring-japan/kyoto-temples')).toEqual({
      year: '2025', trip: 'spring-japan',
    });
  });
  it('returns null for too-short ids', () => {
    expect(parseTripFromId('2025/spring-japan')).toBeNull();
  });
});

describe('tripDisplayName', () => {
  it('title-cases hyphenated slug', () => {
    expect(tripDisplayName('spring-japan')).toBe('Spring Japan');
  });
  it('renders _unsorted as "Unsorted"', () => {
    expect(tripDisplayName('_unsorted')).toBe('Unsorted');
  });
});

describe('postsByTrip', () => {
  it('groups by year/trip and computes date range, countries, cities', () => {
    const a = fakePost('2025/spring-japan/kyoto-temples', {
      title: 'Kyoto', country: 'JP', city: 'Kyoto', city_slug: 'kyoto',
      date: new Date('2025-04-12'),
    });
    a.data.visited = { start: new Date('2025-04-10'), end: new Date('2025-04-12') };
    const b = fakePost('2025/spring-japan/shibuya-night', {
      title: 'Tokyo', country: 'JP', city: 'Tokyo', city_slug: 'tokyo',
      date: new Date('2025-04-15'),
    });
    b.data.visited = { start: new Date('2025-04-14'), end: new Date('2025-04-15') };
    const c = fakePost('2024/summer-italy/rome-forum', {
      title: 'Rome', country: 'IT', city: 'Rome', city_slug: 'rome',
      date: new Date('2024-08-22'),
    });
    c.data.visited = { start: new Date('2024-08-21'), end: new Date('2024-08-23') };

    const trips = postsByTrip([a, b, c]);
    expect(trips.length).toBe(2);

    expect(trips[0].year).toBe('2025');
    expect(trips[0].trip).toBe('spring-japan');
    expect(trips[0].displayName).toBe('Spring Japan');
    expect(trips[0].posts.length).toBe(2);
    expect(trips[0].countries).toEqual(['jp']);
    expect(trips[0].cities.sort()).toEqual(['Kyoto', 'Tokyo']);
    expect(trips[0].earliest.toISOString().slice(0, 10)).toBe('2025-04-10');
    expect(trips[0].latest.toISOString().slice(0, 10)).toBe('2025-04-15');

    expect(trips[1].trip).toBe('summer-italy');
  });

  it('sorts by most-recent post date descending', () => {
    const old = fakePost('2024/summer-italy/x', { date: new Date('2024-08-22') });
    old.data.visited = { start: new Date('2024-08-21'), end: new Date('2024-08-23') };
    const newer = fakePost('2025/spring-japan/y', { date: new Date('2025-04-12') });
    newer.data.visited = { start: new Date('2025-04-10'), end: new Date('2025-04-12') };
    const trips = postsByTrip([old, newer]);
    expect(trips[0].trip).toBe('spring-japan');
    expect(trips[1].trip).toBe('summer-italy');
  });
});

describe('postsByEvent', () => {
  it('groups by event slug with metadata and chronological notes', () => {
    const older = fakePost('2025/defcon33-us/a', {
      title: 'DEF CON day',
      date: new Date('2025-08-08'),
      events: ['defcon33-2025'],
    });
    const newer = fakePost('2026/exchange-main-lausanne/b', {
      title: 'LakeCTF',
      date: new Date('2026-05-02'),
      events: ['lakectf-2026'],
    });
    const earlierLake = fakePost('2026/exchange-main-lausanne/c', {
      title: 'LakeCTF start',
      date: new Date('2026-04-30'),
      events: ['lakectf-2026'],
    });

    const events = postsByEvent([older, newer, earlierLake]);
    expect(events.map(event => event.slug)).toEqual(['lakectf-2026', 'defcon33-2025']);
    expect(events[0].meta).toMatchObject({ name: 'LakeCTF', year: 2026 });
    expect(events[0].posts.map(post => post.id)).toEqual([
      '2026/exchange-main-lausanne/c',
      '2026/exchange-main-lausanne/b',
    ]);
  });
});

describe('mapPins', () => {
  it('skips posts with no coords and emits display slug', () => {
    const a = fakePost('2025/sp/x', {
      title: 'Hello world',
      date: new Date('2025-04-12T00:00:00Z'),
      country: 'JP', city: 'Kyoto', city_slug: 'kyoto',
      coords: [35, 135],
    });
    const b = fakePost('2025/sp/y', {
      country: 'JP', city: 'Tokyo', city_slug: 'tokyo',
      coords: null,
    });
    const pins = mapPins([a, b]);
    expect(pins.length).toBe(1);
    expect(pins[0].slug).toBe('jp/kyoto/2025-04-hello-world');
    expect(pins[0].coords).toEqual([35, 135]);
  });
});
