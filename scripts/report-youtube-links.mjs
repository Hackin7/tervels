import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseYouTubeUrl } from '../src/lib/youtube-core.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const postsRoot = resolve(repo, 'src/content/posts');
const catalog = JSON.parse(await readFile(resolve(repo, 'src/data/youtube.json'), 'utf8'));
const posts = await loadPosts(postsRoot);
const assigned = new Map();
for (const post of posts) {
  for (const id of post.youtubeIds) {
    const paths = assigned.get(id) ?? [];
    paths.push(post.id);
    assigned.set(id, paths);
  }
}

const gamingPlaylist = catalog.playlists.find(playlist => normalize(playlist.title) === 'gaming')?.id;
const rows = catalog.videos.map(video => {
  const existing = assigned.get(video.id) ?? [];
  if (existing.length) return { video, status: 'linked', matches: existing.map(id => ({ id, score: 999 })) };
  if (gamingPlaylist && video.playlist_ids?.includes(gamingPlaylist)) return { video, status: 'excluded', matches: [] };
  const matches = posts
    .map(post => ({ id: post.id, score: matchScore(video.title, post.searchText) }))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, 3);
  const best = matches[0]?.score ?? 0;
  return { video, status: best >= 9 ? 'high confidence' : best >= 4 ? 'review' : 'unassigned', matches };
});

const sections = ['linked', 'high confidence', 'review', 'unassigned', 'excluded'];
const lines = [
  '# YouTube link report',
  '',
  `Channel: ${catalog.channel}`,
  '',
  `Videos: ${catalog.videos.length} · Posts: ${posts.length}`,
  '',
];
for (const status of sections) {
  const items = rows.filter(row => row.status === status);
  lines.push(`## ${titleCase(status)} (${items.length})`, '');
  if (!items.length) {
    lines.push('_None._', '');
    continue;
  }
  for (const row of items) {
    const candidates = row.matches.map(match => `${match.id}${match.score === 999 ? '' : ` (${match.score})`}`).join('; ');
    lines.push(`- [${row.video.title}](https://www.youtube.com/watch?v=${row.video.id})${candidates ? ` — ${candidates}` : ''}`);
  }
  lines.push('');
}
const outputPath = resolve(repo, 'docs/youtube-link-report.md');
await writeFile(outputPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${outputPath}`);

async function loadPosts(root) {
  const files = await findFiles(root);
  return Promise.all(files.map(async path => {
    const text = await readFile(path, 'utf8');
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const body = text.slice((text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)?.[0] ?? '').length);
    const title = scalar(frontmatter, 'title');
    const descriptive = [
      title,
      ...[...frontmatter.matchAll(/^\s+(?:name|city):\s*["']?(.*?)["']?\s*$/gm)].map(match => match[1]),
      ...[...frontmatter.matchAll(/^\s+name:\s*["']?(.*?)["']?\s*$/gm)].map(match => match[1]),
    ].join(' ');
    const youtubeIds = new Set([
      ...[...frontmatter.matchAll(/^\s+id:\s*["']?([A-Za-z0-9_-]+)["']?\s*$/gm)].map(match => match[1]),
      ...extractUrls(body).map(item => item.id),
      ...[...body.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})/g)].map(match => match[1]),
    ]);
    return {
      id: relative(root, path).replace(/\\/g, '/').replace(/\/index\.md$/, ''),
      searchText: normalize(descriptive),
      youtubeIds,
    };
  }));
}

async function findFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await findFiles(path));
    else if (entry.isFile() && entry.name === 'index.md') out.push(path);
  }
  return out;
}

function extractUrls(text) {
  return [...text.matchAll(/https?:\/\/[^\s)>]+/g)].map(match => parseYouTubeUrl(match[0])).filter(Boolean);
}

function scalar(frontmatter, key) {
  const raw = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1]?.trim() ?? '';
  return raw.replace(/^['"]|['"]$/g, '');
}

function matchScore(videoTitle, postText) {
  const video = normalize(videoTitle);
  const videoTokens = tokens(video);
  const postTokens = new Set(tokens(postText));
  let score = videoTokens.filter(token => postTokens.has(token)).length * 2;
  const bracketed = videoTitle.match(/^\[([^\]]+)\]/)?.[1];
  if (bracketed && postText.includes(normalize(bracketed))) score += 4;
  if (video.length > 5 && postText.includes(video)) score += 8;
  return score;
}

function tokens(value) {
  const stop = new Set(['the', 'and', 'day', 'part', 'trip', 'travel', 'around', 'vibes', 'video', '2026', '2025']);
  return normalize(value).split(' ').filter(token => token.length > 2 && !stop.has(token));
}

function normalize(value) {
  return String(value ?? '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim();
}

function titleCase(value) {
  return value.replace(/\b\w/g, char => char.toUpperCase());
}
