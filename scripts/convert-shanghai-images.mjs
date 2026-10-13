import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Preserve originals; create WebP files and update only local image references.
const roots = [
  path.resolve('src/content/posts/2025/intern-main-shanghai'),
  path.resolve('src/content/posts/2026/intel-embedded-cup-shanghai'),
];
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else if (entry.isFile()) files.push(file);
  }
  return files;
}
const conversions = new Map();
let before = 0;
let after = 0;
for (const root of roots) {
  for (const file of await walk(root)) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const output = file.replace(/\.(jpe?g|png)$/i, '.webp');
    if (conversions.has(file)) continue;
    const buffer = await sharp(file).rotate()
      .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75, effort: 4 }).toBuffer();
    // Never overwrite an existing WebP with different content.
    try {
      const existing = await readFile(output);
      if (!existing.equals(buffer)) throw new Error(`WebP already exists with different content: ${output}`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await writeFile(output, buffer, { flag: 'wx' });
    }
    before += (await stat(file)).size;
    after += buffer.length;
    conversions.set(file, {
      output, sha256: createHash('sha256').update(buffer).digest('hex'),
    });
  }
}

let markdownChanged = 0;
// Include cross-post references to Shanghai images.
for (const file of await walk(path.resolve('src/content/posts'))) {
  if (!file.endsWith('.md')) continue;
  const text = await readFile(file, 'utf8');
  const updated = text.replace(/\.{1,2}\/[^\s"'<>)]*?\.(?:jpe?g|png)\b/gi, reference => {
    const conversion = conversions.get(path.resolve(path.dirname(file), reference));
    return conversion ? reference.replace(/\.(jpe?g|png)$/i, '.webp') : reference;
  });
  if (updated !== text) {
    await writeFile(file, updated);
    markdownChanged++;
  }
}

let provenanceChanged = 0;
for (const root of roots) {
  for (const file of await walk(root)) {
    if (!file.endsWith('telegram-sources.json')) continue;
    const data = JSON.parse((await readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
    let changed = false;
    function update(value) {
      if (!value || typeof value !== 'object') return;
      if (typeof value.local === 'string') {
        const conversion = conversions.get(path.resolve(path.dirname(file), value.local));
        if (conversion) {
          value.original_local ??= value.local;
          if (value.local_sha256) value.original_local_sha256 ??= value.local_sha256;
          value.local = value.local.replace(/\.(jpe?g|png)$/i, '.webp');
          value.local_sha256 = conversion.sha256;
          changed = true;
        }
      }
      for (const child of Object.values(value)) update(child);
    }
    update(data);
    if (changed) {
      await writeFile(file, JSON.stringify(data, null, 2) + '\n');
      provenanceChanged++;
    }
  }
}
console.log(JSON.stringify({
  convertedImages: conversions.size, originalBytes: before, webpBytes: after,
  reductionPercent: 100 * (1 - after / before), markdownChanged, provenanceChanged,
  originalsRetained: true,
}, null, 2));
