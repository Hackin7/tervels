import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argument = (name) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const contentRoot = path.resolve(argument('--content-root') ?? path.join(projectRoot, 'src/content/posts'));
const markerPath = path.resolve(argument('--marker') ?? path.join(projectRoot, '.astro/generated-image-placeholders.json'));
const cleanupOnly = process.argv.includes('--cleanup');
const imageReference = /(?:^cover:\s*|^\s*-\s*)["']?(\.{1,2}\/[^\s"'#]+\.(?:avif|gif|jpe?g|png|webp))["']?\s*$/gim;

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');
const isWithin = (parent, candidate) => candidate === parent || candidate.startsWith(`${parent}${path.sep}`);

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function cleanupGenerated() {
  if (!(await exists(markerPath))) return 0;

  const marker = JSON.parse(await readFile(markerPath, 'utf8'));
  let removed = 0;
  for (const item of marker.files ?? []) {
    const target = path.resolve(projectRoot, item.path);
    if (!isWithin(contentRoot, target) || !(await exists(target))) continue;
    const current = await readFile(target);
    if (sha256(current) !== item.sha256) continue;
    await unlink(target);
    removed += 1;
  }
  await rm(markerPath, { force: true });
  return removed;
}

async function markdownFiles(directory) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await markdownFiles(target));
    else if (entry.isFile() && entry.name === 'index.md') results.push(target);
  }
  return results;
}

const placeholderBuffers = new Map();
async function placeholderFor(extension) {
  const format = extension.toLowerCase().replace(/^jpeg$/, 'jpg');
  if (placeholderBuffers.has(format)) return placeholderBuffers.get(format);

  const svg = Buffer.from(`
    <svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <rect width="1280" height="720" fill="#111827"/>
      <text x="640" y="350" text-anchor="middle" fill="#94a3b8"
        font-family="Arial, sans-serif" font-size="48">Image not included</text>
      <text x="640" y="414" text-anchor="middle" fill="#64748b"
        font-family="Arial, sans-serif" font-size="26">Local media is unavailable in this build</text>
    </svg>`);
  let pipeline = sharp(svg);
  if (format === 'jpg') pipeline = pipeline.jpeg({ quality: 78 });
  else if (format === 'png') pipeline = pipeline.png({ compressionLevel: 9 });
  else if (format === 'webp') pipeline = pipeline.webp({ quality: 78 });
  else if (format === 'avif') pipeline = pipeline.avif({ quality: 50 });
  else if (format === 'gif') pipeline = pipeline.gif();
  const buffer = await pipeline.toBuffer();
  placeholderBuffers.set(format, buffer);
  return buffer;
}

async function ensureImages() {
  await cleanupGenerated();
  const created = [];

  for (const markdown of await markdownFiles(contentRoot)) {
    const source = await readFile(markdown, 'utf8');
    const frontmatter = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    for (const match of frontmatter.matchAll(imageReference)) {
      const target = path.resolve(path.dirname(markdown), match[1]);
      if (!isWithin(contentRoot, target) || await exists(target)) continue;
      const extension = path.extname(target).slice(1);
      const buffer = await placeholderFor(extension);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, buffer, { flag: 'wx' });
      created.push({
        path: path.relative(projectRoot, target).split(path.sep).join('/'),
        sha256: sha256(buffer),
      });
    }
  }

  if (created.length > 0) {
    await mkdir(path.dirname(markerPath), { recursive: true });
    await writeFile(markerPath, `${JSON.stringify({ files: created }, null, 2)}\n`);
  }
  return created.length;
}

if (cleanupOnly) {
  const removed = await cleanupGenerated();
  console.log(`Removed ${removed} generated content-image placeholder${removed === 1 ? '' : 's'}.`);
} else {
  const created = await ensureImages();
  console.log(`Generated ${created} content-image placeholder${created === 1 ? '' : 's'}.`);
}
