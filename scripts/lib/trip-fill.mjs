import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { slugify } from '../../src/lib/slugify-mjs.mjs';

export const COUNTRY_NAMES = [
  'Unknown',
  'United States',
  'China',
  'Japan',
  'Singapore',
  'Malaysia',
  'Switzerland',
  'France',
  'Germany',
  'Austria',
  'Poland',
  'Spain',
];

const EXPLICIT_FOLDERS = new Map([
  ['US DEFCON 34', 'defcon33-us'],
]);

const INTERN_SUBTRIPS = new Map([
  ['Nagoya', 'intern-01-nagoya'],
  ['Nanjing', 'intern-02-nanjing'],
  ['Shenzhen KiCon Asia', 'intern-03-shenzhen-kicon-asia'],
]);

const EXCHANGE_SUBTRIPS = new Map([
  ['Basel', 'exchange-01-basel'],
  ['Geneva France Ski Trip 1', 'exchange-02-geneva-france-ski-trip-1'],
  ['Nuremburg-Munich-Salzburg', 'exchange-03-nuremburg-munich-salzburg'],
  ['Ph0wn Nice Trip', 'exchange-04-ph0wn-nice-trip'],
  ['Gureyes', 'exchange-05-gureyes'],
  ['Krakow Ski Trip', 'exchange-06-krakow-ski-trip'],
  ['Barcelona', 'exchange-07-barcelona'],
  ['Kingsley GenevaInterlakenv2', 'exchange-08-kingsley-genevainterlakenv2'],
]);

export function parsePlacesRef(markdown) {
  return markdown.split('\n')
    .filter(line => /^\| \d{4}-\d{2}-\d{2}/.test(line))
    .map(line => {
      const cols = splitMarkdownTableRow(line);
      const sourcePosts = [...cols[5].matchAll(/`([^`]+)`/g)].map(m => m[1]);
      return {
        dateRange: cols[0].trim(),
        country: cols[1].trim(),
        city: cols[2].trim(),
        locationOrEvent: cols[3].trim(),
        confidence: cols[4].trim(),
        sourcePosts,
      };
    });
}

export function parseTrips(markdown) {
  const rows = [];
  let currentTrip = null;
  let currentSubtrip = null;
  let explicitFolder = null;

  for (const line of markdown.split('\n')) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      currentTrip = h2[1].trim();
      currentSubtrip = null;
      explicitFolder = null;
      continue;
    }
    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      currentSubtrip = h3[1].trim();
      explicitFolder = null;
      continue;
    }
    const folder = line.match(/^Folder:\s*`([^`]+)`/);
    if (folder) {
      explicitFolder = folder[1].trim();
      continue;
    }
    const bullet = line.match(/^- (\d{4}-\d{2}-\d{2}(?: to \d{4}-\d{2}-\d{2})?) - (.+?) - (.+?) - coords: (.+)$/);
    if (!bullet || !currentTrip) continue;
    const [country, city] = splitCountryCity(bullet[2].trim());
    rows.push({
      dateRange: bullet[1],
      country,
      city,
      locationOrEvent: bullet[3].trim(),
      coords: bullet[4].trim(),
      trip: currentTrip,
      subtrip: currentSubtrip,
      folder: explicitFolder ?? folderForTrip(currentTrip, currentSubtrip),
    });
  }
  return rows;
}

export function folderForTrip(trip, subtrip = null) {
  if (EXPLICIT_FOLDERS.has(trip)) return EXPLICIT_FOLDERS.get(trip);
  if (trip === 'Unassigned / Pre-Trip Planning') return '_unsorted';
  if (trip === 'Shanghai Intern') {
    if (subtrip && INTERN_SUBTRIPS.has(subtrip)) return INTERN_SUBTRIPS.get(subtrip);
    return 'intern-main-shanghai';
  }
  if (trip === 'Lausanne EPFL Exchange') {
    if (subtrip && EXCHANGE_SUBTRIPS.has(subtrip)) return EXCHANGE_SUBTRIPS.get(subtrip);
    return 'exchange-main-lausanne';
  }
  return slugify(trip, 8) || '_unsorted';
}

export function joinTripRows(placeRows, tripRows) {
  if (placeRows.length !== tripRows.length) {
    throw new Error(`places/trips row count mismatch: ${placeRows.length} vs ${tripRows.length}`);
  }
  const tripRowsByKey = new Map();
  const tripRowsByLooseKey = new Map();
  for (const tripRow of tripRows) {
    const key = rowKey(tripRow);
    if (!tripRowsByKey.has(key)) tripRowsByKey.set(key, []);
    tripRowsByKey.get(key).push(tripRow);
    const loose = looseRowKey(tripRow);
    if (!tripRowsByLooseKey.has(loose)) tripRowsByLooseKey.set(loose, []);
    tripRowsByLooseKey.get(loose).push(tripRow);
  }
  return placeRows.map(place => {
    let matches = tripRowsByKey.get(rowKey(place)) ?? [];
    if (matches.length === 0) {
      const looseMatches = tripRowsByLooseKey.get(looseRowKey(place)) ?? [];
      if (looseMatches.length === 1) matches = looseMatches;
    }
    if (matches.length === 0) {
      throw new Error(`no trip row matched place row: ${rowKey(place)}`);
    }
    return { ...place, tripRow: matches.shift() };
  });
}

export async function migrateFromTripDocs({
  placesRefPath,
  tripsPath,
  oldRoot,
  outRoot,
  reportPath,
}) {
  const placeRows = parsePlacesRef(await readFile(placesRefPath, 'utf8'));
  const tripRows = parseTrips(await readFile(tripsPath, 'utf8'));
  const joined = joinTripRows(placeRows, tripRows);

  const seen = new Set();
  const duplicates = [];
  const missing = [];
  const migrated = [];

  for (const row of joined) {
    for (const sourcePost of row.sourcePosts) {
      if (seen.has(sourcePost)) {
        duplicates.push({ sourcePost, firstUseKept: true });
        continue;
      }
      seen.add(sourcePost);
      const oldPath = join(oldRoot, sourcePost.replace(/^src\/content\/posts\//, ''));
      if (!existsSync(oldPath)) {
        missing.push(sourcePost);
        continue;
      }

      const oldText = await readFile(oldPath, 'utf8');
      const migratedPost = migratePost(oldText, sourcePost, row, row.tripRow);
      const dest = join(outRoot, migratedPost.year, migratedPost.folder, migratedPost.note, 'index.md');
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, migratedPost.text);
      migrated.push({ sourcePost, dest, trip: row.tripRow.trip, subtrip: row.tripRow.subtrip, folder: migratedPost.folder });
    }
  }

  const report = renderReport({ placeRows, tripRows, migrated, duplicates, missing });
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, report);
  return { placeRows, tripRows, migrated, duplicates, missing, report };
}

export function migratePost(oldText, sourcePost, placeRow, tripRow) {
  const { frontmatter, body } = splitFrontmatter(oldText);
  const source = sourceBlock(frontmatter);
  const title = scalar(frontmatter, 'title') ?? titleFromPath(sourcePost);
  const date = firstDate(placeRow.dateRange) ?? scalar(frontmatter, 'date');
  const endDate = lastDate(placeRow.dateRange) ?? date;
  const country = countryName(placeRow.country);
  const city = normalizeCity(placeRow.city);
  const citySlug = slugify(city, 6) || 'unknown';
  const locationName = [city, country === 'Unknown' ? null : country].filter(Boolean).join(', ') || 'Unknown';
  const year = date.slice(0, 4);
  const note = basename(dirname(sourcePost));
  const folder = tripRow.folder;
  const tags = [...new Set([folder, slugify(country, 4), citySlug].filter(Boolean))];

  const lines = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `timestamp: ${date}T00:00:00Z`,
    `date: ${date}`,
    'visited:',
    `  start: ${date}`,
    `  end: ${endDate}`,
    'location:',
    `  name: ${JSON.stringify(locationName)}`,
    `  country: ${JSON.stringify(country)}`,
    `  city: ${JSON.stringify(city)}`,
    `  city_slug: ${JSON.stringify(citySlug)}`,
    `  location_or_event: ${JSON.stringify(placeRow.locationOrEvent)}`,
    '  coords: null',
    `tags: [${tags.map(t => JSON.stringify(t)).join(', ')}]`,
    `draft: ${scalar(frontmatter, 'draft') ?? 'false'}`,
  ];
  if (source.length) lines.push(...source);
  lines.push('---');
  return {
    year,
    folder,
    note,
    text: `${lines.join('\n')}\n${body.trimStart()}`,
  };
}

export function renderReport({ placeRows, tripRows, migrated, duplicates, missing }) {
  const folders = [...new Set(migrated.map(m => m.folder))].sort();
  return [
    '# Trip Fill Migration Report',
    '',
    `- Place rows: ${placeRows.length}`,
    `- Trip rows: ${tripRows.length}`,
    `- Migrated posts: ${migrated.length}`,
    `- Duplicate source posts skipped: ${duplicates.length}`,
    `- Missing source posts: ${missing.length}`,
    '',
    '## Folders',
    '',
    ...folders.map(folder => `- \`${folder}\`: ${migrated.filter(m => m.folder === folder).length} post(s)`),
    '',
    '## Missing Sources',
    '',
    ...(missing.length ? missing.map(p => `- \`${p}\``) : ['None']),
    '',
    '## Duplicate Sources',
    '',
    ...(duplicates.length ? duplicates.map(d => `- \`${d.sourcePost}\``) : ['None']),
    '',
  ].join('\n');
}

function splitMarkdownTableRow(line) {
  return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
}

function splitCountryCity(value) {
  const countries = [...COUNTRY_NAMES].sort((a, b) => b.length - a.length);
  for (const country of countries) {
    if (value === country) return [country, 'Unknown'];
    if (value.startsWith(`${country} / `)) return [country, value.slice(country.length + 3)];
  }
  const parts = value.split(' / ');
  return [parts[0] ?? 'Unknown', parts.slice(1).join(' / ') || 'Unknown'];
}

function rowKey(row) {
  return [
    row.dateRange,
    normalizeForMatch(row.country),
    normalizeForMatch(row.city),
    normalizeForMatch(row.locationOrEvent),
  ].join('|');
}

function looseRowKey(row) {
  return [
    row.dateRange,
    normalizeForMatch(row.country),
    normalizeForMatch(row.city),
  ].join('|');
}

function normalizeForMatch(value) {
  return String(value ?? '')
    .replace(/[`()]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function splitFrontmatter(text) {
  if (!text.startsWith('---\n')) return { frontmatter: '', body: text };
  const end = text.indexOf('\n---', 4);
  if (end === -1) return { frontmatter: '', body: text };
  return {
    frontmatter: text.slice(4, end),
    body: text.slice(end + 4).replace(/^\n/, ''),
  };
}

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return null;
  const raw = match[1].trim();
  try {
    return JSON.parse(raw);
  } catch {
    return raw.replace(/^['"]|['"]$/g, '');
  }
}

function sourceBlock(frontmatter) {
  const lines = frontmatter.split('\n');
  const start = lines.findIndex(line => line === 'source:');
  if (start === -1) return [];
  const out = [];
  for (let i = start; i < lines.length; i++) {
    if (i > start && /^\S/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out;
}

function firstDate(dateRange) {
  return dateRange.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
}

function lastDate(dateRange) {
  const dates = dateRange.match(/\d{4}-\d{2}-\d{2}/g);
  return dates?.at(-1) ?? null;
}

function countryName(country) {
  return COUNTRY_NAMES.includes(country) ? country : 'Unknown';
}

function normalizeCity(city) {
  if (!city || city === 'Unknown') return 'Unknown';
  return city.trim();
}

function titleFromPath(sourcePost) {
  return basename(dirname(sourcePost)).replace(/^\d{4}-\d{2}-/, '').replace(/-/g, ' ') || 'Untitled';
}
