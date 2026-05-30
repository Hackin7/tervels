import { describe, it, expect, vi } from 'vitest';
import { Geocoder } from '../../scripts/lib/geocode.mjs';

const fakeFetch = (payload) => async () => ({
  ok: true,
  json: async () => payload,
});

describe('Geocoder', () => {
  it('returns country_code lowercased and best city field', async () => {
    const g = new Geocoder({
      fetcher: fakeFetch({ address: { country_code: 'JP', city: 'Kyoto' } }),
      sleeper: () => Promise.resolve(),
    });
    const r = await g.reverse(35.0, 135.7);
    expect(r).toEqual({ country: 'jp', city: 'Kyoto' });
  });

  it('falls back through city/town/village', async () => {
    const g = new Geocoder({
      fetcher: fakeFetch({ address: { country_code: 'IT', village: 'Tiny Place' } }),
      sleeper: () => Promise.resolve(),
    });
    const r = await g.reverse(0, 0);
    expect(r.city).toBe('Tiny Place');
  });

  it('caches by rounded coords', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ address: { country_code: 'JP', city: 'Kyoto' } }) });
    const g = new Geocoder({ fetcher, sleeper: () => Promise.resolve() });
    await g.reverse(35.0001, 135.7001);
    await g.reverse(35.0001, 135.7001);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('throws on non-ok response', async () => {
    const g = new Geocoder({
      fetcher: async () => ({ ok: false, status: 503 }),
      sleeper: () => Promise.resolve(),
    });
    await expect(g.reverse(0, 0)).rejects.toThrow('Nominatim 503');
  });
});
