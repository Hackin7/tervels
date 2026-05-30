#!/usr/bin/env node
import { loadExport } from './lib/load-export.mjs';
import { groupMessages } from './lib/group-messages.mjs';
import { flattenText, extractHashtags } from './lib/parse-text.mjs';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node scripts/peek-export.mjs <export-dir>'); process.exit(1); }

const result = await loadExport(dir);
const messages = result.messages;
const groups = groupMessages(messages, 30);

const tagCount = new Map();
let groupsWithText = 0;
let groupsWithHashtag = 0;
let groupsWithPhotos = 0;
let totalPhotos = 0;

const sampleTexts = [];

for (const g of groups) {
  const text = g.messages.map(m => flattenText(m.text)).filter(Boolean).join('\n');
  const tags = g.messages.flatMap(m => extractHashtags(m.text));
  const photos = g.messages.filter(m => m.photo).length;

  if (text) groupsWithText++;
  if (tags.length) groupsWithHashtag++;
  if (photos) groupsWithPhotos++;
  totalPhotos += photos;
  for (const t of tags) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);

  if (sampleTexts.length < 8 && text && text.length > 20) {
    sampleTexts.push(text.slice(0, 160).replace(/\n/g, ' '));
  }
}

console.log('## Peek report');
console.log(`- Total groups: ${groups.length}`);
console.log(`- Groups with text: ${groupsWithText}`);
console.log(`- Groups with hashtags: ${groupsWithHashtag}`);
console.log(`- Groups with photos: ${groupsWithPhotos}`);
console.log(`- Total photos referenced: ${totalPhotos}`);
console.log('\n## Top 30 hashtags');
const top = [...tagCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
for (const [tag, n] of top) console.log(`  ${n.toString().padStart(4)}  #${tag}`);
console.log('\n## Sample texts');
sampleTexts.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));

const dates = groups.map(g => new Date(g.first));
const min = new Date(Math.min(...dates.map(d => d.getTime())));
const max = new Date(Math.max(...dates.map(d => d.getTime())));
console.log(`\n## Date range\n  ${min.toISOString().slice(0,10)} → ${max.toISOString().slice(0,10)}`);
