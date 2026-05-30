#!/usr/bin/env node
// Usage: node scripts/optimize-photos.mjs <dir>
// Resamples every .jpg/.jpeg/.png/.heic in <dir> to <=2400px JPEG q82 in place.
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const TARGET_LONG = 2400;
const QUALITY = 82;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif']);

async function* walk(dir) {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function optimize(p) {
  const ext = extname(p).toLowerCase();
  if (!EXTS.has(ext)) return null;
  const before = (await stat(p)).size;
  const tmp = join(dirname(p), '.tmp-' + basename(p) + '.jpg');
  const img = sharp(p, { failOn: 'none' });
  const meta = await img.metadata();
  const w = meta.width ?? 0, h = meta.height ?? 0;
  const long = Math.max(w, h);
  const pipeline = long > TARGET_LONG
    ? img.resize({
        width: w >= h ? TARGET_LONG : null,
        height: h > w ? TARGET_LONG : null,
        fit: 'inside',
        withoutEnlargement: true,
      })
    : img;
  await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);

  const finalPath = ext === '.jpg' || ext === '.jpeg'
    ? p
    : p.replace(new RegExp(`\\${ext}$`, 'i'), '.jpg');
  if (finalPath !== p) await unlink(p).catch(() => {});
  await rename(tmp, finalPath);
  const after = (await stat(finalPath)).size;
  return { path: finalPath, before, after };
}

const root = process.argv[2];
if (!root) {
  console.error('Usage: node scripts/optimize-photos.mjs <dir>');
  process.exit(1);
}
let totalBefore = 0, totalAfter = 0, n = 0;
for await (const p of walk(root)) {
  const r = await optimize(p);
  if (!r) continue;
  totalBefore += r.before;
  totalAfter += r.after;
  n++;
  console.log(`${r.path}  ${(r.before/1024).toFixed(0)}K → ${(r.after/1024).toFixed(0)}K`);
}
console.log(`\n${n} files. ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB.`);
