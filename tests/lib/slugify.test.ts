import { describe, it, expect } from 'vitest';
import { slugify, postSlug } from '../../src/lib/slugify';

describe('slugify', () => {
  it('lowercases and joins with hyphens', () => {
    expect(slugify('Three Days in Kyoto')).toBe('three-days-kyoto');
  });
  it('strips diacritics', () => {
    expect(slugify('São Paulo café')).toBe('sao-paulo-cafe');
  });
  it('drops stop words', () => {
    expect(slugify('A walk on the beach')).toBe('walk-beach');
  });
  it('returns empty for all-stopwords', () => {
    expect(slugify('the and a')).toBe('');
  });
  it('caps to max words', () => {
    expect(slugify('one two three four five six', 3)).toBe('one-two-three');
  });
});

describe('postSlug', () => {
  it('formats YYYY-MM prefix from date', () => {
    expect(postSlug(new Date('2025-04-12T00:00:00Z'), 'Kyoto temples'))
      .toBe('2025-04-kyoto-temples');
  });
  it('falls back to untitled when keyword empty', () => {
    expect(postSlug(new Date('2025-04-12T00:00:00Z'), ''))
      .toBe('2025-04-untitled');
  });
});
