#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  ForwardGeocoder,
  parsePost,
  renderReport,
  resolvePost,
  updatePostFrontmatter,
} from './lib/coord-enrichment.mjs';

const root = process.cwd();
const postsRoot = join(root, 'src/content/posts');
const cachePath = join(root, 'docs/trips/coord-cache.json');
const reportPath = join(root, 'docs/trips/coord-enrichment-report.md');
const dryRun = process.argv.includes('--dry-run');
const overwrite = process.argv.includes('--overwrite');
const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;

const geocoder = new ForwardGeocoder({ cachePath });
await geocoder.load();

const paths = (await findPostFiles(postsRoot)).sort();
const resolved = [];
const skipped = [];
const unresolved = [];
let attempted = 0;

for (const path of paths) {
  const text = await readFile(path, 'utf8');
  const post = parsePost(text, path);
  if (attempted >= limit) {
    unresolved.push({ post, resolution: { status: 'not-attempted-limit' } });
    continue;
  }
  attempted += 1;
  const resolution = await resolvePost(post, geocoder, { overwrite });
  if (resolution.status === 'resolved') {
    resolved.push({ post, resolution });
    if (!dryRun) await writeFile(path, updatePostFrontmatter(post, resolution));
  } else if (resolution.status === 'skipped-existing') {
    skipped.push({ post, resolution });
  } else {
    unresolved.push({ post, resolution });
  }
}

await geocoder.save();
const report = renderReport({ resolved, skipped, unresolved });
await mkdir(dirname(reportPath), { recursive: true });
await writeFile(reportPath, report);

console.log(`Resolved ${resolved.length} post(s), skipped ${skipped.length}, unresolved ${unresolved.length}.`);
console.log(`Report: ${reportPath}`);

async function findPostFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...await findPostFiles(path));
    } else if (entry.isFile() && entry.name === 'index.md') {
      out.push(path);
    }
  }
  return out;
}
