import exifr from 'exifr';
import { readFile } from 'node:fs/promises';

/**
 * Compute the effective date for a message group.
 * mode: 'capture' (default) — earliest EXIF date among photos, fallback to telegram message date
 *       'telegram' — always telegram message date
 *       'exif-strict' — earliest EXIF date among photos, return null if none
 *
 * Returns { date: Date|null, basis: 'capture' | 'telegram' | null }.
 */
export async function effectiveDate(group, mode = 'capture', exifReader = readExif) {
  const tgDate = new Date(group.first);
  if (mode === 'telegram') return { date: tgDate, basis: 'telegram' };
  const exif = await earliestExif(group, exifReader);
  if (mode === 'exif-strict') {
    return exif ? { date: exif, basis: 'capture' } : { date: null, basis: null };
  }
  return exif ? { date: exif, basis: 'capture' } : { date: tgDate, basis: 'telegram' };
}

async function earliestExif(group, exifReader) {
  let best = null;
  for (const msg of group.messages) {
    const path = msg.photo;
    if (!path) continue;
    try {
      const d = await exifReader(path);
      if (d && (!best || d < best)) best = d;
    } catch { /* missing EXIF, skip */ }
  }
  return best;
}

async function readExif(path) {
  const buf = await readFile(path);
  const tags = await exifr.parse(buf, ['DateTimeOriginal', 'CreateDate']);
  if (!tags) return null;
  const t = tags.DateTimeOriginal ?? tags.CreateDate;
  return t ? new Date(t) : null;
}
