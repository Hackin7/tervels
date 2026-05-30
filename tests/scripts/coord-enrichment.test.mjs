import { describe, expect, it } from 'vitest';
import {
  buildCandidateQueries,
  parsePost,
  resolvePost,
  updatePostFrontmatter,
} from '../../scripts/lib/coord-enrichment.mjs';

function postWith(locationOrEvent, title = 'A note') {
  return parsePost(`---
title: ${JSON.stringify(title)}
date: 2026-01-01
visited:
  start: 2026-01-01
  end: 2026-01-01
location:
  name: "Singapore, Singapore"
  country: "Singapore"
  city: "Singapore"
  city_slug: "singapore"
  location_or_event: ${JSON.stringify(locationOrEvent)}
  coords: null
tags: []
draft: false
---
Body text
`, '/tmp/post/index.md');
}

describe('coordinate enrichment', () => {
  it('uses exact known building overrides before online geocoding', async () => {
    const geocoder = { search: async () => { throw new Error('should not geocode overrides'); } };
    const result = await resolvePost(postWith('Jewel L1 / Changi Airport Terminal 1'), geocoder);
    expect(result).toMatchObject({
      status: 'resolved',
      source: 'manual',
      granularity: 'building',
      confidence: 'high',
      coords: [1.360214, 103.989451],
    });
  });

  it('does not match short titles against unrelated airport overrides', async () => {
    const queries = [];
    const geocoder = {
      search: async query => {
        queries.push(query);
        return [{ lat: '1.3521', lon: '103.8198', display_name: 'Singapore', address: { country: 'Singapore' } }];
      },
    };
    const result = await resolvePost(postWith('Unknown airport context', 'Airport'), geocoder);
    expect(result.status).toBe('resolved');
    expect(result.coords).toEqual([1.3521, 103.8198]);
    expect(queries).not.toContain('Chubu Centrair International Airport, Tokoname, Japan');
  });

  it('writes coordinate metadata inside the location block', () => {
    const post = postWith('Jewel L1 / Changi Airport Terminal 1');
    const text = updatePostFrontmatter(post, {
      status: 'resolved',
      coords: [1.360214, 103.989451],
      source: 'manual',
      granularity: 'building',
      confidence: 'high',
      candidate: { query: 'Jewel Changi Airport, Singapore' },
    });
    expect(text).toContain('  coord_granularity: building');
    expect(text).toContain('  coord_query: "Jewel Changi Airport, Singapore"');
  });

  it('builds city fallback queries for vague notes', () => {
    expect(buildCandidateQueries(postWith('Hotel breakfast')).at(-1)).toMatchObject({
      query: 'Singapore, Singapore',
      granularity: 'city',
      confidence: 'low',
    });
  });
});
