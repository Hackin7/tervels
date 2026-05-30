#!/usr/bin/env node
import { resolve } from 'node:path';
import { migrateFromTripDocs } from './lib/trip-fill.mjs';

const args = parseArgs(process.argv.slice(2));

const result = await migrateFromTripDocs({
  placesRefPath: resolve(args['places-ref'] ?? 'docs/trips/places_ref.md'),
  tripsPath: resolve(args.trips ?? 'docs/trips/trips.md'),
  oldRoot: resolve(args['old-root'] ?? '/root/Stuff/posts_tervels_old/content/posts'),
  outRoot: resolve(args.out ?? 'src/content/posts'),
  reportPath: resolve(args.report ?? 'docs/trips/migration-report.md'),
});

console.log(`Place rows: ${result.placeRows.length}`);
console.log(`Trip rows: ${result.tripRows.length}`);
console.log(`Migrated posts: ${result.migrated.length}`);
console.log(`Duplicate source posts skipped: ${result.duplicates.length}`);
console.log(`Missing source posts: ${result.missing.length}`);

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const k = a.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) out[k] = true;
    else { out[k] = next; i++; }
  }
  return out;
}
