import { describe, it, expect } from 'vitest';
import { countryFlag, countryName } from '../../src/lib/countries';
import { countrySlug } from '../../src/lib/aggregates';

describe('country listings', () => {
  it.each([
    ['DK', 'Denmark', '🇩🇰'],
    ['SE', 'Sweden', '🇸🇪'],
    ['VA', 'Vatican City', '🇻🇦'],
    ['CH', 'Switzerland', '🇨🇭'],
    ['CZ', 'Czechia', '🇨🇿'],
    ['AU', 'Australia', '🇦🇺'],
    ['CA', 'Canada', '🇨🇦'],
    ['SK', 'Slovakia', '🇸🇰'],
  ])('resolves %s by code, name, or URL slug', (code, name, flag) => {
    for (const value of [code, code.toLowerCase(), name, countrySlug(name), ` ${name.toUpperCase()} `]) {
      expect(countryName(value)).toBe(name);
      expect(countryFlag(value)).toBe(flag);
      expect(countrySlug(value)).toBe(countrySlug(name));
    }
  });

  it.each(['Czech', 'Czech Republic', 'czech-republic'])('normalizes the legacy name %s', value => {
    expect(countryName(value)).toBe('Czechia');
    expect(countryFlag(value)).toBe('🇨🇿');
    expect(countrySlug(value)).toBe('czechia');
  });

  it('preserves the fallback for unrecognized countries', () => {
    expect(countryName('Unknown')).toBe('Unknown');
    expect(countryFlag('Unknown')).toBe('🏳️');
    expect(countrySlug('Unknown')).toBe('unknown');
  });
});
