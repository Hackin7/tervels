#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const postsRoot = join(root, 'src/content/posts');
const write = process.argv.includes('--write');
const paths = (await findPostFiles(postsRoot)).sort();
const posts = [];

for (const path of paths) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) continue;
  const frontmatter = match[1].replace(/\r\n/g, '\n');
  const body = text.slice(match[0].length).trim().replace(/\s+/g, ' ');
  const messageId = frontmatter.match(/^\s+message_id:\s*(\d+)/m)?.[1];
  const title = frontmatter.match(/^title:\s*(.*)$/m)?.[1] ?? '';
  const timestamp = frontmatter.match(/^timestamp:\s*([^\s]+)/m)?.[1] ?? '';
  const locationsBlock = frontmatter.match(/^locations:\n(?:^[ \t].*\n?)*/m)?.[0]?.trimEnd();
  if (!locationsBlock) continue;
  const contentHash = hash(`${title}\n${timestamp.slice(0, 10)}\n${body}`);
  const key = messageId ? `message:${messageId}:${contentHash}` : `content:${contentHash}`;
  posts.push({ path, text: text.replace(/\r\n/g, '\n'), key, locationsBlock, score: scoreLocations(locationsBlock) });
}

const groups = new Map();
for (const post of posts) {
  const group = groups.get(post.key) ?? [];
  group.push(post);
  groups.set(post.key, group);
}
let groupsMatched = 0;
let updates = 0;
for (const group of groups.values()) {
  if (group.length < 2) continue;
  const best = [...group].sort((a, b) => b.score - a.score)[0];
  if (best.score <= 0) continue;
  groupsMatched += 1;
  for (const post of group) {
    if (post.score >= best.score || post.locationsBlock === best.locationsBlock) continue;
    const next = post.text.replace(post.locationsBlock, best.locationsBlock);
    if (write) await writeFile(post.path, next);
    updates += 1;
  }
}

console.log(`${write ? 'Updated' : 'Would update'} ${updates} article(s) across ${groupsMatched} duplicate group(s).`);

function scoreLocations(block) {
  const unresolved = /^\s+country:\s*["']?(?:XX|Unknown)/m.test(block) || /^\s+city_slug:\s*["']?unknown/m.test(block);
  const nullGps = /^\s+gps:\s*null/m.test(block);
  const names = [...block.matchAll(/^\s+- name:\s*(.*)$/gm)].map(match => parseScalar(match[1]));
  const cities = [...block.matchAll(/^\s+city:\s*(.*)$/gm)].map(match => parseScalar(match[1]));
  const specific = names.some((name, index) => name && name !== 'Unknown' && normalize(name) !== normalize(cities[index]));
  return (unresolved ? 0 : 8) + (nullGps ? 0 : 5) + (specific ? 3 : 0) + Math.max(0, names.length - 1) * 2;
}

function parseScalar(raw) {
  try { return JSON.parse(raw); } catch { return raw.replace(/^['"]|['"]$/g, ''); }
}

function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

async function findPostFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await findPostFiles(path));
    else if (entry.isFile() && entry.name === 'index.md') out.push(path);
  }
  return out;
}
