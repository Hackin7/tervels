import { describe, expect, it } from 'vitest';
import { publishedHauls, validateHauls, type Haul } from '../../src/lib/hauls';
import { eventMeta } from '../../src/lib/events';

function fakeHaul(event: string, date: string, draft = false): Haul {
  return {
    id: `${eventMeta(event).year}/${event}`,
    slug: event,
    body: '',
    collection: 'hauls',
    data: {
      event,
      date: new Date(date),
      title: undefined,
      locations: [],
      photos: [],
      draft,
    },
  } as unknown as Haul;
}

describe('hauls', () => {
  it('filters drafts and sorts published albums by attendance date', () => {
    const newer = fakeHaul('japan-expo-paris-2026', '2026-07-11');
    const older = fakeHaul('defcon33-2025', '2025-08-07');
    const draft = fakeHaul('defcon34-2026', '2026-08-06', true);
    expect(publishedHauls([older, draft, newer])).toEqual([newer, older]);
  });

  it('rejects multiple albums for one event edition', () => {
    expect(() => validateHauls([
      fakeHaul('japan-expo-paris-2026', '2026-07-11'),
      fakeHaul('japan-expo-paris-2026', '2026-07-12'),
    ])).toThrow(/More than one haul album/);
  });

  it('rejects an unknown event', () => {
    expect(() => validateHauls([fakeHaul('unlisted-event-2026', '2026-01-01')]))
      .toThrow(/unknown event/);
  });

  it('requires the year and event folder layout', () => {
    const haul = fakeHaul('japan-expo-paris-2026', '2026-07-11');
    haul.id = 'japan-expo-paris-2026';
    expect(() => validateHauls([haul])).toThrow(/src\/content\/haul\/2026\/japan-expo-paris-2026\/index\.md/);
  });
});
