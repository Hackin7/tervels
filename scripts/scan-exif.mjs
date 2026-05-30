#!/usr/bin/env node
/**
 * Scan every photo in a Telegram export's photos/ folder and report
 * which EXIF fields survived. Useful for deciding whether EXIF-based
 * location recovery is feasible.
 *
 * Usage: node scripts/scan-exif.mjs <export-dir>
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import exifr from 'exifr';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node scripts/scan-exif.mjs <export-dir>'); process.exit(1); }

const photosDir = join(dir, 'photos');
const files = (await readdir(photosDir))
  .filter(f => f.endsWith('.jpg') && !f.endsWith('_thumb.jpg'));

const stats = {
  total: 0,
  withAnyExif: 0,
  withGPS: 0,
  withDateTimeOriginal: 0,
  withCreateDate: 0,
  withMake: 0,
  withModel: 0,
};
const samplesGPS = [];
const samplesDate = [];
const makeModelCounts = new Map();

const TAGS = ['GPSLatitude', 'GPSLongitude', 'DateTimeOriginal', 'CreateDate', 'Make', 'Model'];

for (const f of files) {
  stats.total++;
  try {
    const buf = await readFile(join(photosDir, f));
    const tags = await exifr.parse(buf, TAGS);
    if (!tags) continue;
    stats.withAnyExif++;
    if (tags.latitude != null && tags.longitude != null) {
      stats.withGPS++;
      if (samplesGPS.length < 8) samplesGPS.push({ f, lat: tags.latitude, lng: tags.longitude });
    }
    if (tags.DateTimeOriginal) {
      stats.withDateTimeOriginal++;
      if (samplesDate.length < 4) samplesDate.push({ f, d: tags.DateTimeOriginal.toISOString?.() ?? String(tags.DateTimeOriginal) });
    }
    if (tags.CreateDate) stats.withCreateDate++;
    if (tags.Make) stats.withMake++;
    if (tags.Model) stats.withModel++;
    const mm = `${tags.Make ?? ''} ${tags.Model ?? ''}`.trim();
    if (mm) makeModelCounts.set(mm, (makeModelCounts.get(mm) ?? 0) + 1);
  } catch { /* corrupt or no EXIF */ }
  if (stats.total % 500 === 0) process.stderr.write(`scanned ${stats.total}\n`);
}

console.log('## EXIF scan');
console.log(`- Total non-thumb photos: ${stats.total}`);
console.log(`- Any EXIF metadata at all: ${stats.withAnyExif}`);
console.log(`- GPS coords: ${stats.withGPS}`);
console.log(`- DateTimeOriginal: ${stats.withDateTimeOriginal}`);
console.log(`- CreateDate: ${stats.withCreateDate}`);
console.log(`- Make: ${stats.withMake}`);
console.log(`- Model: ${stats.withModel}`);
console.log('\n## Sample GPS hits');
for (const s of samplesGPS) console.log(`  ${s.f}  →  ${s.lat}, ${s.lng}`);
console.log('\n## Sample date hits');
for (const s of samplesDate) console.log(`  ${s.f}  →  ${s.d}`);
console.log('\n## Top camera makes/models');
for (const [mm, n] of [...makeModelCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
  console.log(`  ${n.toString().padStart(4)}  ${mm}`);
}
