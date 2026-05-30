#!/usr/bin/env node
/**
 * One-off bulk frontmatter annotator: fills in location for date-based rules.
 * Only touches posts where country is currently "XX" (unresolved). Won't
 * overwrite anything you've already fixed by hand.
 *
 * Usage: node scripts/bulk-annotate.mjs [--dry-run] [--root <path>]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const rootIdx = args.indexOf('--root');
const ROOT = resolve(rootIdx >= 0 ? args[rootIdx + 1] : 'src/content/posts');

const LV = {
  name: 'Las Vegas, USA',
  country: 'US', city: 'Las Vegas', city_slug: 'las-vegas',
  coords: [36.1699, -115.1398],
};
const SH = {
  name: 'Shanghai, China',
  country: 'CN', city: 'Shanghai', city_slug: 'shanghai',
  coords: [31.2304, 121.4737],
};
const NG = {
  name: 'Nagoya, Japan',
  country: 'JP', city: 'Nagoya', city_slug: 'nagoya',
  coords: [35.1815, 136.9066],
};
const LAU = {
  name: 'Lausanne, Switzerland',
  country: 'CH', city: 'Lausanne', city_slug: 'lausanne',
  coords: [46.5197, 6.6323],
};

/** Returns location for a date, or null to leave unresolved. */
function locationFor(date) {
  const t = date.getTime();
  const start = (y, m, d) => Date.UTC(y, m - 1, d);
  const end = (y, m, d) => Date.UTC(y, m - 1, d, 23, 59, 59);

  // Aug 2025 → Las Vegas
  if (t >= start(2025, 8, 1) && t <= end(2025, 8, 31)) return LV;
  // Oct 1–7 2025 → Nagoya (China Golden Week, override Shanghai)
  if (t >= start(2025, 10, 1) && t <= end(2025, 10, 7)) return NG;
  // Sep, Oct (after Golden Week), Nov 2025 → Shanghai
  if (t >= start(2025, 9, 1) && t <= end(2025, 11, 30)) return SH;
  // Feb 2026 onwards → Lausanne
  if (t >= start(2026, 2, 1)) return LAU;
  return null;
}

async function* walkPosts(dir) {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) yield* walkPosts(p);
    else if (ent.name === 'index.md') yield p;
  }
}

const dateRe = /^date:\s*(\d{4}-\d{2}-\d{2})/m;

function rewriteLocation(text, loc) {
  // Replace the entire location block. The importer always emits this exact 4-line
  // unresolved location block, with optional 5th line for coords.
  const re = /location:\s*\n\s*name:.*\n\s*country:\s*"XX".*\n\s*city:.*\n\s*city_slug:.*\n(?:\s*coords:.*\n)?(\s*zoom:.*\n)?/;
  if (!re.test(text)) return null;
  const replacement =
    `location:\n` +
    `  name: ${JSON.stringify(loc.name)}\n` +
    `  country: ${JSON.stringify(loc.country)}\n` +
    `  city: ${JSON.stringify(loc.city)}\n` +
    `  city_slug: ${JSON.stringify(loc.city_slug)}\n` +
    `  coords: [${loc.coords[0]}, ${loc.coords[1]}]\n`;
  return text.replace(re, replacement);
}

const stats = { scanned: 0, alreadyResolved: 0, noRule: 0, updated: 0, missingDate: 0 };
const byCountry = new Map();

for await (const file of walkPosts(ROOT)) {
  stats.scanned++;
  const text = await readFile(file, 'utf8');
  if (!/country:\s*"XX"/.test(text)) { stats.alreadyResolved++; continue; }
  const dateMatch = text.match(dateRe);
  if (!dateMatch) { stats.missingDate++; continue; }
  const date = new Date(dateMatch[1] + 'T12:00:00Z');
  const loc = locationFor(date);
  if (!loc) { stats.noRule++; continue; }
  const out = rewriteLocation(text, loc);
  if (!out) { stats.missingDate++; continue; }
  if (!DRY) await writeFile(file, out);
  stats.updated++;
  byCountry.set(loc.country, (byCountry.get(loc.country) ?? 0) + 1);
}

console.log('## Bulk-annotate report');
console.log(`- Root: ${ROOT}`);
console.log(`- Mode: ${DRY ? 'DRY RUN' : 'WRITE'}`);
console.log(`- Posts scanned: ${stats.scanned}`);
console.log(`- Already resolved (skipped): ${stats.alreadyResolved}`);
console.log(`- Updated: ${stats.updated}`);
console.log(`- Skipped: no rule for date: ${stats.noRule}`);
console.log(`- Skipped: missing/unparseable date or location block: ${stats.missingDate}`);
console.log('## Updates by country');
for (const [c, n] of [...byCountry.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${n.toString().padStart(4)}  ${c}`);
}
