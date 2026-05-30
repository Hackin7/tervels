import { describe, expect, it } from 'vitest';
import {
  folderForTrip,
  joinTripRows,
  migratePost,
  parsePlacesRef,
  parseTrips,
} from '../../scripts/lib/trip-fill.mjs';

describe('trip fill helpers', () => {
  it('uses requested folder naming for main trips and numbered subtrips', () => {
    expect(folderForTrip('US DEFCON 34')).toBe('defcon33-us');
    expect(folderForTrip('Shanghai Intern', 'Shanghai Base')).toBe('intern-main-shanghai');
    expect(folderForTrip('Shanghai Intern', 'Nagoya')).toBe('intern-01-nagoya');
    expect(folderForTrip('Lausanne EPFL Exchange', 'Lausanne Base')).toBe('exchange-main-lausanne');
    expect(folderForTrip('Lausanne EPFL Exchange', 'Barcelona')).toBe('exchange-07-barcelona');
  });

  it('parses place rows and source posts', () => {
    const rows = parsePlacesRef(`
| Date/time | Country | City | Specific building/location | Confidence | Source posts | Experience notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2025-10-01 | Japan | Nagoya | Library | estimated | \`src/content/posts/2025/oct/2025-10-so-went-library/index.md\`; \`src/content/posts/2025/oct/2025-10-so-thinking-after-library/index.md\` | TODO |
`);
    expect(rows).toHaveLength(1);
    expect(rows[0].locationOrEvent).toBe('Library');
    expect(rows[0].sourcePosts).toHaveLength(2);
  });

  it('parses trip bullets with derived folders', () => {
    const rows = parseTrips(`
## Shanghai Intern

### Nagoya

- 2025-10-01 - Japan / Nagoya - Library - coords: null
`);
    expect(rows).toEqual([expect.objectContaining({
      trip: 'Shanghai Intern',
      subtrip: 'Nagoya',
      folder: 'intern-01-nagoya',
      country: 'Japan',
      city: 'Nagoya',
      locationOrEvent: 'Library',
    })]);
  });

  it('rejects row count mismatches', () => {
    expect(() => joinTripRows([{}], [])).toThrow(/row count mismatch/);
  });

  it('rewrites frontmatter with timestamp, location_or_event, and null coords', () => {
    const oldText = `---
title: "So I went to the Atsuta"
date: 2025-10-02
location:
  name: "Nagoya, Japan"
source:
  kind: telegram
  message_id: 1145
---
Body text
`;
    const migrated = migratePost(
      oldText,
      'src/content/posts/2025/oct/2025-10-so-went-atsuta-jingu/index.md',
      { dateRange: '2025-10-02', country: 'Japan', city: 'Nagoya', locationOrEvent: 'Atsuta Jingu' },
      { folder: 'intern-01-nagoya' },
    );
    expect(migrated.year).toBe('2025');
    expect(migrated.folder).toBe('intern-01-nagoya');
    expect(migrated.text).toContain('timestamp: 2025-10-02T00:00:00Z');
    expect(migrated.text).toContain('country: "Japan"');
    expect(migrated.text).toContain('location_or_event: "Atsuta Jingu"');
    expect(migrated.text).toContain('coords: null');
    expect(migrated.text).not.toContain('cover:');
  });
});
