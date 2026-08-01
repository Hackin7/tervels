#!/usr/bin/env node
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const postsRoot = join(root, 'src/content/posts');
const write = process.argv.includes('--write');
const paths = (await findPostFiles(postsRoot)).sort();
const stats = { posts: 0, changed: 0, timestampFallbacks: 0, missingGps: 0 };

for (const path of paths) {
  const before = await readFile(path, 'utf8');
  const after = migratePost(before, path);
  stats.posts += 1;
  if (after !== before) {
    stats.changed += 1;
    if (write) await writeFile(path, after);
  }
}

console.log(`${write ? 'Migrated' : 'Would migrate'} ${stats.changed}/${stats.posts} article(s).`);
console.log(`Timestamp fallbacks from date: ${stats.timestampFallbacks}.`);
console.log(`Locations without GPS: ${stats.missingGps}.`);

function migratePost(text, path) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Missing frontmatter: ${relative(root, path)}`);
  const lines = match[1].replace(/\r\n/g, '\n').split('\n');
  if (lines.some(line => line === 'locations:')) return text.replace(/\r\n/g, '\n');

  const blocks = topLevelBlocks(lines);
  const title = scalarBlock(blocks, 'title') ?? 'Untitled';
  const existingTimestamp = scalarBlock(blocks, 'timestamp');
  const date = scalarBlock(blocks, 'date');
  const timestamp = existingTimestamp ?? (date ? `${date}T00:00:00Z` : null);
  if (!timestamp) throw new Error(`Missing timestamp and date: ${relative(root, path)}`);
  if (!existingTimestamp) stats.timestampFallbacks += 1;

  const oldLocation = blocks.get('location') ?? [];
  const locationOrEvent = nestedValue(oldLocation, 'location_or_event');
  const oldName = nestedValue(oldLocation, 'name');
  const name = usableName(locationOrEvent) ? locationOrEvent : usableName(oldName) ? oldName : 'Unknown';
  const country = nestedValue(oldLocation, 'country') ?? 'Unknown';
  const city = nestedValue(oldLocation, 'city') ?? 'Unknown';
  const citySlug = nestedValue(oldLocation, 'city_slug') ?? 'unknown';
  const gpsRaw = nestedRaw(oldLocation, 'coords') ?? 'null';
  if (gpsRaw === 'null') stats.missingGps += 1;

  const oldSource = nestedValue(oldLocation, 'coord_source');
  const oldGranularity = nestedValue(oldLocation, 'coord_granularity');
  const oldConfidence = nestedValue(oldLocation, 'coord_confidence');
  const oldQuery = nestedValue(oldLocation, 'coord_query');
  const zoom = nestedRaw(oldLocation, 'zoom');

  const out = [
    `title: ${JSON.stringify(title)}`,
    `timestamp: ${timestamp}`,
    'locations:',
    `  - name: ${JSON.stringify(name)}`,
    `    country: ${JSON.stringify(country)}`,
    `    city: ${JSON.stringify(city)}`,
    `    city_slug: ${JSON.stringify(citySlug)}`,
    `    gps: ${gpsRaw}`,
  ];
  if (gpsRaw !== 'null') {
    out.push(`    gps_source: ${mapSource(oldSource)}`);
    if (oldGranularity) out.push(`    gps_granularity: ${oldGranularity}`);
    if (oldConfidence) out.push(`    gps_confidence: ${oldConfidence}`);
    if (oldQuery) out.push(`    gps_query: ${JSON.stringify(oldQuery)}`);
  }
  if (zoom) out.push(`    zoom: ${zoom}`);

  for (const [key, block] of blocks) {
    if (['title', 'timestamp', 'date', 'visited', 'location'].includes(key)) continue;
    out.push(...block);
  }

  const body = text.slice(match[0].length).replace(/\r\n/g, '\n');
  return `---\n${out.join('\n')}\n---\n${body}`;
}

function topLevelBlocks(lines) {
  const blocks = new Map();
  let key = null;
  for (const line of lines) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):(?:\s|$)/);
    if (match) {
      key = match[1];
      blocks.set(key, [line]);
    } else if (key) {
      blocks.get(key).push(line);
    }
  }
  return blocks;
}

function scalarBlock(blocks, key) {
  const line = blocks.get(key)?.[0];
  if (!line) return null;
  return parseScalar(line.slice(line.indexOf(':') + 1).trim());
}

function nestedRaw(block, key) {
  const line = block.find(item => new RegExp(`^\\s+${key}:`).test(item));
  return line ? line.slice(line.indexOf(':') + 1).trim() : null;
}

function nestedValue(block, key) {
  const raw = nestedRaw(block, key);
  return raw == null ? null : parseScalar(raw);
}

function parseScalar(raw) {
  try { return JSON.parse(raw); } catch { return raw.replace(/^['"]|['"]$/g, ''); }
}

function usableName(value) {
  return value && value !== 'Unknown' && !/^unknown$/i.test(value);
}

function mapSource(source) {
  if (!source) return 'old-frontmatter';
  if (source === 'manual' || source === 'old-frontmatter') return source;
  return 'openstreetmap';
}

async function findPostFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await findPostFiles(path));
    else if (entry.isFile() && entry.name === 'index.md') out.push(path);
  }
  return out;
}
