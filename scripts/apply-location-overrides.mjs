#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const postsRoot = join(root, 'src/content/posts');
const overrides = JSON.parse(await readFile(join(root, 'scripts/data/location-overrides.json'), 'utf8'));
const write = process.argv.includes('--write');
let changed = 0;

for (const item of overrides) {
  const path = join(postsRoot, ...item.path.split('/'));
  const text = await readFile(path, 'utf8');
  const block = text.match(/^locations:\r?\n(?:^[ \t].*\r?\n?)*/m)?.[0]?.trimEnd();
  if (!block) throw new Error(`Missing locations block: ${item.path}`);
  const nextBlock = renderLocations(item.locations);
  if (block === nextBlock) continue;
  if (write) await writeFile(path, text.replace(block, nextBlock).replace(/\r\n/g, '\n'));
  changed += 1;
}

console.log(`${write ? 'Updated' : 'Would update'} ${changed}/${overrides.length} curated article(s).`);

function renderLocations(locations) {
  if (!Array.isArray(locations) || !locations.length) throw new Error('Each override requires at least one location');
  const lines = ['locations:'];
  for (const location of locations) {
    lines.push(`  - name: ${JSON.stringify(location.name)}`);
    lines.push(`    country: ${JSON.stringify(location.country)}`);
    lines.push(`    city: ${JSON.stringify(location.city)}`);
    lines.push(`    city_slug: ${JSON.stringify(location.city_slug)}`);
    lines.push(`    gps: ${location.gps ? `[${location.gps[0]}, ${location.gps[1]}]` : 'null'}`);
    if (location.gps_source) lines.push(`    gps_source: ${location.gps_source}`);
    if (location.gps_granularity) lines.push(`    gps_granularity: ${location.gps_granularity}`);
    if (location.gps_confidence) lines.push(`    gps_confidence: ${location.gps_confidence}`);
    if (location.gps_query) lines.push(`    gps_query: ${JSON.stringify(location.gps_query)}`);
  }
  return lines.join('\n');
}
