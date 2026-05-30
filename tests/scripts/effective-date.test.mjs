import { describe, it, expect } from 'vitest';
import { effectiveDate } from '../../scripts/lib/effective-date.mjs';

const grp = (first, photos) => ({
  first: new Date(first).getTime(),
  messages: photos.map(p => ({ photo: p })),
});

describe('effectiveDate', () => {
  it('capture mode prefers earliest EXIF', async () => {
    const g = grp('2025-04-15T10:00:00', ['a.jpg', 'b.jpg']);
    const reader = async p => p === 'a.jpg' ? new Date('2025-04-12T08:00:00Z') : new Date('2025-04-13T09:00:00Z');
    const r = await effectiveDate(g, 'capture', reader);
    expect(r.basis).toBe('capture');
    expect(r.date.toISOString()).toBe('2025-04-12T08:00:00.000Z');
  });

  it('capture mode falls back to telegram when no EXIF', async () => {
    const g = grp('2025-04-15T10:00:00Z', ['a.jpg']);
    const reader = async () => null;
    const r = await effectiveDate(g, 'capture', reader);
    expect(r.basis).toBe('telegram');
    expect(r.date.toISOString()).toBe('2025-04-15T10:00:00.000Z');
  });

  it('telegram mode always uses message date', async () => {
    const g = grp('2025-04-15T10:00:00Z', ['a.jpg']);
    const reader = async () => new Date('2020-01-01');
    const r = await effectiveDate(g, 'telegram', reader);
    expect(r.basis).toBe('telegram');
    expect(r.date.toISOString()).toBe('2025-04-15T10:00:00.000Z');
  });

  it('exif-strict returns null when no EXIF', async () => {
    const g = grp('2025-04-15T10:00:00Z', ['a.jpg']);
    const reader = async () => null;
    const r = await effectiveDate(g, 'exif-strict', reader);
    expect(r.basis).toBeNull();
    expect(r.date).toBeNull();
  });

  it('handles groups with no photos', async () => {
    const g = { first: new Date('2025-04-15T10:00:00Z').getTime(), messages: [{}] };
    const reader = async () => new Date('2020-01-01');
    const r = await effectiveDate(g, 'capture', reader);
    expect(r.basis).toBe('telegram');
  });
});
