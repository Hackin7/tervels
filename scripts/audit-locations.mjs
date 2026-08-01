#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const root = process.cwd();
const postsRoot = join(root, 'src/content/posts');
const reportPath = join(root, 'docs/location-audit.md');
const check = process.argv.includes('--check');
const paths = (await findPostFiles(postsRoot)).sort();
const stats = {
  articles: paths.length,
  locations: 0,
  multi: 0,
  nullGps: [],
  unresolved: [],
  generic: [],
  deprecated: [],
  invalidSchema: [],
  bySource: new Map(),
  byGranularity: new Map(),
  byConfidence: new Map(),
};

for (const path of paths) {
  const text = await readFile(path, 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const title = parseScalar(frontmatter.match(/^title:\s*(.*)$/m)?.[1] ?? 'Untitled');
  const id = relative(root, path).replaceAll('\\', '/');
  const deprecated = ['date', 'visited', 'location'].filter(key => new RegExp(`^${key}:`, 'm').test(frontmatter));
  if (deprecated.length) stats.deprecated.push({ id, fields: deprecated });
  const locations = parseLocations(frontmatter);
  const timestampCount = (frontmatter.match(/^timestamp:/gm) ?? []).length;
  if (timestampCount !== 1 || locations.length < 1) {
    stats.invalidSchema.push({ id, timestampCount, locationCount: locations.length });
  }
  stats.locations += locations.length;
  if (locations.length > 1) stats.multi += 1;
  for (const location of locations) {
    if (!location.gps || location.gps === 'null') stats.nullGps.push({ id, title, name: location.name });
    if (['XX', 'Unknown'].includes(location.country) || location.city_slug === 'unknown') {
      stats.unresolved.push({ id, title, name: location.name });
    }
    const normalizedName = normalize(location.name);
    if (normalizedName === normalize(location.city) || normalizedName === normalize(`${location.city}, ${location.country}`)) {
      stats.generic.push({ id, title, name: location.name });
    }
    count(stats.bySource, location.gps_source ?? 'unspecified');
    count(stats.byGranularity, location.gps_granularity ?? 'unspecified');
    count(stats.byConfidence, location.gps_confidence ?? 'unspecified');
  }
}

const report = [
  '# Location Audit',
  '',
  `- Articles: ${stats.articles}`,
  `- Location links: ${stats.locations}`,
  `- Multi-location articles: ${stats.multi}`,
  `- Locations without GPS: ${stats.nullGps.length}`,
  `- Unresolved locations: ${stats.unresolved.length}`,
  `- Generic city-level names requiring review: ${stats.generic.length}`,
  `- Articles with deprecated schema fields: ${stats.deprecated.length}`,
  `- Articles missing one canonical timestamp or a location: ${stats.invalidSchema.length}`,
  '',
  '## GPS Sources', '', ...counts(stats.bySource), '',
  '## Granularity', '', ...counts(stats.byGranularity), '',
  '## Confidence', '', ...counts(stats.byConfidence), '',
  '## Missing GPS', '', ...rows(stats.nullGps), '',
  '## Unresolved', '', ...rows(stats.unresolved), '',
  '## Generic Names', '', ...rows(stats.generic), '',
  '## Deprecated Fields', '',
  ...(stats.deprecated.length ? stats.deprecated.map(item => `- \`${item.id}\`: ${item.fields.join(', ')}`) : ['None']),
  '',
  '## Invalid Core Schema', '',
  ...(stats.invalidSchema.length ? stats.invalidSchema.map(item => `- \`${item.id}\`: timestamps=${item.timestampCount}, locations=${item.locationCount}`) : ['None']),
  '',
].join('\n');

await mkdir(dirname(reportPath), { recursive: true });
await writeFile(reportPath, report);
console.log(`Audited ${stats.articles} articles and ${stats.locations} location links.`);
console.log(`Multi-location: ${stats.multi}; missing GPS: ${stats.nullGps.length}; unresolved: ${stats.unresolved.length}.`);
console.log(`Report: ${relative(root, reportPath)}`);
if (check && (stats.deprecated.length || stats.invalidSchema.length)) process.exitCode = 1;

function parseLocations(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  const start = lines.indexOf('locations:');
  if (start < 0) return [];
  const out = [];
  let current = null;
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\S/.test(line)) break;
    const first = line.match(/^  - name:\s*(.*)$/);
    if (first) {
      current = { name: parseScalar(first[1]) };
      out.push(current);
      continue;
    }
    const field = line.match(/^    ([a-z_]+):\s*(.*)$/);
    if (current && field) current[field[1]] = parseScalar(field[2]);
  }
  return out;
}

function parseScalar(raw) {
  try { return JSON.parse(raw); } catch { return raw.replace(/^['"]|['"]$/g, ''); }
}

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function count(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function counts(map) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([key, value]) => `- ${key}: ${value}`);
}

function rows(items) {
  return items.length ? items.map(item => `- \`${item.id}\` — ${item.title}: ${item.name}`) : ['None'];
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
