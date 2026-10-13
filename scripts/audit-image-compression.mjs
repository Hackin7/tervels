import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Read-only benchmark: encodes a size-stratified sample in memory.
const root = path.resolve(process.argv[2] ?? 'src/content/posts');
async function collect(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await collect(file));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      files.push({ file, size: (await stat(file)).size });
    }
  }
  return files;
}
const files = (await collect(root)).sort((a, b) => a.size - b.size);
const profiles = [
  { name: 'JPEG 1600px quality 75', edge: 1600, format: 'jpeg', quality: 75 },
  { name: 'WebP 1600px quality 80', edge: 1600, format: 'webp', quality: 80 },
  { name: 'WebP 1280px quality 75', edge: 1280, format: 'webp', quality: 75 },
];
const count = Math.min(30, files.length);
const totals = profiles.map(() => ({ sampledBytes: 0, estimatedBytes: 0 }));
let sampledOriginalBytes = 0;
for (let i = 0; i < count; i++) {
  const start = Math.floor(i * files.length / count);
  const end = Math.floor((i + 1) * files.length / count);
  const sample = files[Math.floor((start + end - 1) / 2)];
  const bucketBytes = files.slice(start, end).reduce((sum, item) => sum + item.size, 0);
  sampledOriginalBytes += sample.size;
  for (let j = 0; j < profiles.length; j++) {
    const profile = profiles[j];
    let pipeline = sharp(sample.file).rotate().resize({
      width: profile.edge, height: profile.edge, fit: 'inside', withoutEnlargement: true,
    });
    pipeline = profile.format === 'jpeg'
      ? pipeline.jpeg({ quality: profile.quality, mozjpeg: true })
      : pipeline.webp({ quality: profile.quality, effort: 4 });
    const buffer = await pipeline.toBuffer();
    totals[j].sampledBytes += buffer.length;
    totals[j].estimatedBytes += bucketBytes * buffer.length / sample.size;
  }
}
const originalBytes = files.reduce((sum, item) => sum + item.size, 0);
console.log(JSON.stringify({
  imageCount: files.length, originalBytes, sampleCount: count, sampledOriginalBytes,
  profiles: profiles.map((profile, index) => ({
    ...profile, ...totals[index],
    estimatedReductionPercent: 100 * (1 - totals[index].estimatedBytes / originalBytes),
  })),
}, null, 2));
