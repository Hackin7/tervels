import { readFile, readdir, writeFile, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { youtubeListingVideoId } from '../src/lib/youtube-core.mjs';

const roots = [
  path.resolve('src/content/posts/2026/intel-embedded-cup-shanghai'),
];
const write = process.argv.includes('--write');
async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(file));
    else result.push(file);
  }
  return result;
}
function parse(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error('Invalid article frontmatter');
  return { data: yaml.load(match[1]), front: match[1], body: text.slice(match[0].length) };
}
const pathPattern = /\.{1,2}\/[^\s"'<>)]*?\.(?:jpe?g|png|webp|avif|gif)\b/gi;
function references(text, file) {
  return [...text.matchAll(pathPattern)].map(match => path.resolve(path.dirname(file), match[0]));
}
const articles = [];
const metadataFiles = [];
const imageFiles = new Set();
for (const root of roots) {
  for (const file of await walk(root)) {
    if (file.endsWith('index.md')) {
      const text = await readFile(file, 'utf8');
      const post = parse(text);
      articles.push({ file, text, ...post, video: !!youtubeListingVideoId(post.data.youtube, post.body) });
    }
    if (file.endsWith('telegram-sources.json')) metadataFiles.push(file);
    if (/\.(jpe?g|png|webp|avif|gif)$/i.test(file)) imageFiles.add(file);
  }
}
const videoArticles = articles.filter(article => article.video);
const candidates = new Set();
const videoMessageIds = new Set();
const updates = new Map();
for (const article of videoArticles) {
  for (const id of article.data.source?.message_ids ?? [article.data.source?.message_id]) {
    if (id != null) videoMessageIds.add(id);
  }
  for (const ref of references(article.text, article.file)) if (imageFiles.has(ref)) candidates.add(ref);
  for (const file of imageFiles) {
    if (file.startsWith(path.dirname(article.file) + path.sep)) candidates.add(file);
  }
  // Remove only top-level image fields; nested youtube.cover stays intact.
  const lines = article.front.split(/\r?\n/);
  const kept = [];
  let skipping = false;
  for (const line of lines) {
    if (/^(?:cover|gallery):/.test(line)) { skipping = true; continue; }
    if (skipping && /^(?:\s|$)/.test(line)) continue;
    skipping = false;
    kept.push(line);
  }
  const body = article.body.replace(/!\[[^\]]*\]\((\.{1,2}\/[^)]+)\)/g, (match, ref) =>
    /\.(jpe?g|png|webp|avif|gif)(?:\s+["'][^"']*["'])?$/i.test(ref) ? '' : match);
  const updated = `---\n${kept.join('\n')}\n---\n${body}`;
  if (updated.replace(/\r\n/g, '\n') !== article.text.replace(/\r\n/g, '\n')) updates.set(article.file, updated);
}
// Find photos belonging to source posts that were merged and whose old Markdown was removed.
const metadata = [];
for (const file of metadataFiles) {
  const data = JSON.parse((await readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
  metadata.push({ file, data });
  for (const photo of data.linked_photos ?? []) {
    if (!photo.local || !photo.message_ids?.length) continue;
    if (!photo.message_ids.every(id => videoMessageIds.has(id))) continue;
    const local = path.resolve(path.dirname(file), photo.local);
    if (imageFiles.has(local)) candidates.add(local);
  }
}
// Protect every remaining local image reference, including references outside Shanghai.
const protectedImages = new Set();
for (const file of await walk(path.resolve('src/content/posts'))) {
  if (!file.endsWith('.md')) continue;
  const text = updates.get(file) ?? await readFile(file, 'utf8');
  for (const ref of references(text, file)) protectedImages.add(ref);
}
const deletions = [...candidates].filter(file => !protectedImages.has(file));
let bytes = 0;
for (const file of deletions) bytes += (await stat(file)).size;
if (write) {
  for (const [file, text] of updates) await writeFile(file, text);
  const deletionSet = new Set(deletions);
  for (const { file, data } of metadata) {
    let changed = false;
    for (const photo of data.linked_photos ?? []) {
      if (!photo.local) continue;
      if (deletionSet.has(path.resolve(path.dirname(file), photo.local))) {
        photo.local_deleted = true;
        photo.deletion_reason = 'YouTube video replaces article photos';
        changed = true;
      }
    }
    if (changed) await writeFile(file, JSON.stringify(data, null, 2) + '\n');
  }
  await mkdir('.astro', { recursive: true });
  await writeFile('.astro/shanghai-photo-deletions.json', JSON.stringify({ roots, files: deletions }, null, 2));
}
console.log(JSON.stringify({
  videoArticles: videoArticles.map(article => article.data.title),
  articlesUpdated: updates.size, imagesToDelete: deletions.length,
  bytesToReclaim: bytes, protectedCandidates: candidates.size - deletions.length,
  remainingShanghaiImages: imageFiles.size - deletions.length, write,
}, null, 2));
