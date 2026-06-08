#!/usr/bin/env node
/**
 * Usage: node scripts/import-telegram.mjs <export-dir> [flags]
 * See spec 07-2-travel-blog.md for flag list.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { groupMessages } from './lib/group-messages.mjs';
import { effectiveDate } from './lib/effective-date.mjs';
import { Geocoder } from './lib/geocode.mjs';
import { compressImage } from './lib/compress-image.mjs';
import { flattenText, extractHashtags } from './lib/parse-text.mjs';
import { loadExport } from './lib/load-export.mjs';
import { postSlug, slugify } from '../src/lib/slugify-mjs.mjs';

const args = parseArgs(process.argv.slice(2));
const exportDir = args._[0];
if (!exportDir) {
  console.error('Usage: node scripts/import-telegram.mjs <export-dir> [--trip <slug>] [--since YYYY-MM-DD] [--until YYYY-MM-DD] [--year YYYY] [--month YYYY-MM] [--date-source capture|telegram|exif-strict] [--photos-per-post N|--all-photos] [--merge-window N] [--no-geocode] [--dry-run] [--out PATH]');
  process.exit(1);
}

const OUT_ROOT = resolve(args.out ?? 'src/content/posts');
const DATE_SOURCE = args['date-source'] ?? 'capture';
const MERGE_WINDOW = parseInt(args['merge-window'] ?? '30', 10);
const DRY = !!args['dry-run'];
const NO_GEOCODE = !!args['no-geocode'];
const TRIP = (typeof args.trip === 'string' && args.trip) ? slugify(args.trip, 8) : '_unsorted';
const PHOTOS_PER_POST = args['all-photos']
  ? Infinity
  : Math.max(0, parseInt(args['photos-per-post'] ?? '1', 10) || 0);

const range = resolveRange(args);

const result = await loadExport(exportDir);
const messages = (result.messages ?? []).map(msg => ({
  ...msg,
  photo: resolveExportedPhoto(exportDir, msg.photo),
}));
console.log(`Loaded ${messages.length} messages from ${result.format ?? 'json'} export.`);

const groups = groupMessages(messages, MERGE_WINDOW);

const geo = new Geocoder({ cachePath: '.import-cache.json' });
await geo.load();

const report = {
  range, dateSource: DATE_SOURCE, trip: TRIP, total: groups.length,
  imported: 0, skippedDup: 0, unresolved: 0,
  exifFallback: 0, divergent: 0, photosOut: 0,
};

for (const group of groups) {
  const eff = await effectiveDate(group, DATE_SOURCE);
  if (!eff.date) { report.unresolved++; continue; }
  if (range.since && eff.date < range.since) continue;
  if (range.until && eff.date > range.until) continue;
  if (eff.basis === 'telegram' && DATE_SOURCE === 'capture') report.exifFallback++;
  const tgDate = new Date(group.first);
  if (Math.abs(tgDate - eff.date) > 30 * 86400 * 1000) report.divergent++;

  const text = group.messages.map(m => flattenText(m.text)).filter(Boolean).join('\n\n');
  const hashtags = group.messages.flatMap(m => extractHashtags(m.text));
  const tgLoc = group.messages.find(m => m.location_information)?.location_information;
  const photos = group.messages.map(m => m.photo).filter(Boolean);

  const coords = tgLoc
    ? [tgLoc.latitude, tgLoc.longitude]
    : await firstExifGps(photos);

  let country = null, cityDisplay = null, citySlug = null, locName = null;
  if (coords && !DRY && !NO_GEOCODE) {
    try {
      const g = await geo.reverse(coords[0], coords[1]);
      country = g.country;
      cityDisplay = g.city;
      citySlug = cityDisplay ? slugify(cityDisplay, 4) : null;
      locName = [cityDisplay, country?.toUpperCase()].filter(Boolean).join(', ');
    } catch (e) {
      console.warn('geocode failed for', coords, e.message);
    }
  }
  if (coords && DRY) report.coordsSeen = (report.coordsSeen ?? 0) + 1;

  const messageId = group.messages[0].id;
  const title = firstTextLine(text) ?? hashtags[0] ?? `Untitled ${messageId}`;
  const keyword = hashtags[0] ?? title;
  const slug = postSlug(eff.date, keyword);

  const year = String(eff.date.getUTCFullYear());
  const { dir: baseDir, duplicate } = await resolvePostDir(OUT_ROOT, year, TRIP, slug, messageId);

  if (duplicate) { report.skippedDup++; continue; }

  if (!DRY) {
    const keepPhotos = photos.slice(0, PHOTOS_PER_POST);
    if (keepPhotos.length) await mkdir(join(baseDir, 'images'), { recursive: true });
    else await mkdir(baseDir, { recursive: true });
    let imgIdx = 0;
    let cover = null;
    for (const src of keepPhotos) {
      const dest = join(baseDir, 'images', `${String(imgIdx).padStart(2, '0')}.jpg`);
      await compressImage(src, dest);
      if (!cover) cover = `./images/${basename(dest)}`;
      imgIdx++;
      report.photosOut++;
    }
    if (photos.length > keepPhotos.length) {
      report.photosDropped = (report.photosDropped ?? 0) + (photos.length - keepPhotos.length);
    }
    const fm = buildFrontmatter({
      title,
      eff, country, cityDisplay, citySlug, locName, coords, cover,
      hashtags, messageId, basis: eff.basis,
    });
    await writeFile(join(baseDir, 'index.md'), `${fm}\n${text}\n`);
    report.imported++;
    if (!country || !citySlug) report.unresolved++;
  }
}

await geo.save();
const reportTxt = renderReport(report);
console.log(reportTxt);
if (!DRY) await writeFile('import-report.md', reportTxt);

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) out[k] = true;
      else { out[k] = next; i++; }
    } else out._.push(a);
  }
  return out;
}
function resolveRange(args) {
  let since = null, until = null;
  if (args.year) {
    since = new Date(`${args.year}-01-01T00:00:00Z`);
    until = new Date(`${args.year}-12-31T23:59:59Z`);
  } else if (args.month) {
    since = new Date(`${args.month}-01T00:00:00Z`);
    const d = new Date(since); d.setUTCMonth(d.getUTCMonth() + 1); d.setUTCSeconds(-1);
    until = d;
  } else {
    if (args.since) since = parseDateArg(args.since, false);
    if (args.until) until = parseDateArg(args.until, true);
  }
  return { since, until };
}
function parseDateArg(s, endOfDay) {
  if (/^\d{4}-\d{2}$/.test(s)) {
    const d = new Date(`${s}-01T00:00:00Z`);
    if (endOfDay) { d.setUTCMonth(d.getUTCMonth() + 1); d.setUTCSeconds(-1); }
    return d;
  }
  return new Date(`${s}T${endOfDay ? '23:59:59Z' : '00:00:00Z'}`);
}
async function firstExifGps(photos) {
  const exifr = (await import('exifr')).default;
  for (const p of photos) {
    try {
      const t = await exifr.parse(await readFile(p), ['GPSLatitude', 'GPSLongitude']);
      if (t?.latitude && t?.longitude) return [t.latitude, t.longitude];
    } catch {}
  }
  return null;
}
function resolveExportedPhoto(exportDir, photo) {
  if (!photo || typeof photo !== 'string') return null;
  if (photo.startsWith('(')) return null;
  const full = join(exportDir, photo);
  return existsSync(full) ? full : null;
}
function firstTextLine(text) {
  return text.split(/\r?\n/).map(cleanTitle).find(Boolean) || null;
}
function cleanTitle(line) {
  return line.trim().replace(/^#+\s*/, '').trim();
}
async function resolvePostDir(outRoot, year, trip, slug, messageId) {
  const baseDir = join(outRoot, year, trip, slug);
  if (!existsSync(join(baseDir, 'index.md'))) return { dir: baseDir, duplicate: false };
  if (await dirHasMessageId(baseDir, messageId)) return { dir: baseDir, duplicate: true };

  let n = 0;
  while (true) {
    const suffix = n === 0 ? String(messageId) : `${messageId}-${n + 1}`;
    const dir = join(outRoot, year, trip, `${slug}-${suffix}`);
    if (!existsSync(join(dir, 'index.md'))) return { dir, duplicate: false };
    if (await dirHasMessageId(dir, messageId)) return { dir, duplicate: true };
    n++;
  }
}
async function dirHasMessageId(dir, id) {
  const idx = join(dir, 'index.md');
  if (!existsSync(idx)) return false;
  const txt = await readFile(idx, 'utf8');
  return txt.includes(`message_id: ${id}`);
}
function buildFrontmatter({ title, eff, country, cityDisplay, citySlug, locName, coords, cover, hashtags, messageId, basis }) {
  const visit = eff.date.toISOString().slice(0, 10);
  const lines = [
    '---',
    `title: ${JSON.stringify(title || 'Untitled')}`,
    `date: ${visit}`,
    'visited:',
    `  start: ${visit}`,
    `  end: ${visit}`,
    'location:',
    `  name: ${JSON.stringify(locName || 'Unknown')}`,
    `  country: ${JSON.stringify((country || 'XX').toUpperCase())}`,
    `  city: ${JSON.stringify(cityDisplay || 'Unknown')}`,
    `  city_slug: ${JSON.stringify(citySlug || 'unknown')}`,
  ];
  if (coords) lines.push(`  coords: [${coords[0]}, ${coords[1]}]`);
  if (cover) lines.push(`cover: ${JSON.stringify(cover)}`);
  if (hashtags.length) lines.push(`tags: [${hashtags.map(t => JSON.stringify(t)).join(', ')}]`);
  lines.push('source:');
  lines.push('  kind: telegram');
  lines.push(`  message_id: ${messageId}`);
  lines.push(`  imported_at: ${new Date().toISOString()}`);
  lines.push(`  date_basis: ${basis ?? 'telegram'}`);
  lines.push('---');
  return lines.join('\n');
}
function renderReport(r) {
  const range = r.range.since || r.range.until
    ? `${r.range.since?.toISOString().slice(0, 10) ?? '∞'} → ${r.range.until?.toISOString().slice(0, 10) ?? '∞'}`
    : 'all';
  return [
    `# Import report`,
    ``,
    `- Date range: ${range}`,
    `- Date source: ${r.dateSource}`,
    `- Trip folder: ${r.trip}`,
    `- Groups seen: ${r.total}`,
    `- Posts imported: ${r.imported}`,
    `- Skipped (duplicate): ${r.skippedDup}`,
    `- Unresolved location (frontmatter has XX/unknown): ${r.unresolved}`,
    `- EXIF→Telegram fallbacks: ${r.exifFallback}`,
    `- Divergent (>30d capture vs post): ${r.divergent}`,
    `- Photos written: ${r.photosOut}`,
    ...(r.photosDropped ? [`- Photos dropped (over --photos-per-post limit): ${r.photosDropped}`] : []),
    ...(r.coordsSeen != null ? [`- Coords seen (would geocode if not --dry-run): ${r.coordsSeen}`] : []),
  ].join('\n');
}
