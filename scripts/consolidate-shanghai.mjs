import { consolidatePosts } from './lib/post-consolidation.mjs';
import { readFile, writeFile } from 'node:fs/promises';

const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');
const sourceRoot = '../content_old/posts/2025';
const outputRoot = 'src/content/posts/2025/intern-main-shanghai';

const groups = [
  group('2025-09-14-arrival-in-shanghai', 'Arrival in Shanghai', '2025-09-14', [
    'intern-main-shanghai/2025-09-14-thanks-guess-china-safety',
    'intern-main-shanghai/2025-09-14-flight-entertainment-mainly-chinese',
    'intern-main-shanghai/2025-09-14-welcome-china-s-internet',
  ]),
  group('2025-09-15-settling-in', 'Settling In in Shanghai', '2025-09-15', [
    'intern-main-shanghai/2025-09-15-hotel-buffet-ok-fried',
    'intern-main-shanghai/2025-09-15-apartment',
  ]),
  group('2025-09-16-first-mall-visit', 'First Mall Visit in Shanghai', '2025-09-16', [
    'intern-main-shanghai/2025-09-16-some-merch-stuff-yesterday',
  ]),
  group('2025-09-18-morning-walk', 'Morning Walk in Shanghai', '2025-09-18', [
    'intern-main-shanghai/2025-09-18-morning-walk',
  ]),
  group('2025-09-19-ikea', 'IKEA Shanghai', '2025-09-19', [
    'intern-main-shanghai/2025-09-19-btw-ikea-s-just',
  ]),
  group('2025-09-20-anime-and-peoples-square', "Nanjing Road Anime and People's Square", '2025-09-20', [
    'intern-main-shanghai/2025-09-20-exploring-malls-nearby',
    'intern-main-shanghai/2025-09-20-other-things-along-way',
  ]),
  group('2025-09-21-xintiandi-and-yuyuan', 'Xintiandi and Yuyuan', '2025-09-21', [
    'sep/2025-09-21-today-long-day',
    'sep/2025-09-21-rocklife',
  ]),
  group('2025-09-28-night-walk', 'Shanghai Night Walk', '2025-09-28', [
    'intern-main-shanghai/2025-09-28-walked-around-night-vibes',
  ]),
  group('2025-10-01-bailian-zx-zaoquchang', 'Bailian ZX Zaoquchang', '2025-10-01', [
    'oct/2025-10-01-so-thinking-after-library',
  ]),
  group('2025-10-08-saizeriya', 'Saizeriya in Shanghai', '2025-10-08', [
    'intern-main-shanghai/2025-10-08-saizeriya-here-disappointing-menu',
  ]),
  group('2025-10-12-shanghai-disneyland', 'Shanghai Disneyland', '2025-10-12', [
    'oct/2025-10-12-disneyland-shanghai-7am-queue',
    'oct/2025-10-12-love-winnie-pooh-winnie',
    'oct/2025-10-12-castle-eh-ok',
    'oct/2025-10-12-furry-haven',
    'oct/2025-10-12-pooh-pooh-land',
    'oct/2025-10-12-furry-haven-ride',
    'oct/2025-10-13-other-rides-camp',
    'oct/2025-10-13-mickie-mouse-show',
    'oct/2025-10-13-disney-castle-actually-really',
  ]),
  group('2025-10-15-arcade', 'Shanghai Arcade', '2025-10-15', [
    'oct/2025-10-15-some-good-scores-arcade',
  ]),
  group('2025-10-17-badminton', 'Espressif Badminton — 17 October', '2025-10-17', [
    'oct/2025-10-17-espressif-badminton',
  ]),
  group('2025-10-18-tianzifang-and-electronics', 'Tianzifang and Electronics', '2025-10-18', [
    'oct/2025-10-18-afterwards-decided-go',
  ]),
  group('2025-10-24-arcade-and-metro', 'Shanghai Arcade and Metro', '2025-10-24', [
    'oct/2025-10-24-minor-travels-arcade-sped',
  ]),
  group('2025-10-25-music-china', 'Music China 2025', '2025-10-25', [
    'oct/2025-10-25-cycling-around-area-today',
    'oct/2025-10-25-no-way-s-actually',
    'oct/2025-10-25-some-live-stages-outside',
  ]),
  group('2025-11-02-maker-faire-shanghai', 'Maker Faire Shanghai 2025', '2025-11-02', [
    'intern-main-shanghai/2025-11-02-shanghai-maker-faire-s',
  ]),
  group('2025-11-07-badminton', 'Espressif Badminton — 7 November', '2025-11-07', [
    'nov/2025-11-08-badminton',
  ]),
  group('2025-11-08-central-shanghai', 'Central Shanghai with a Senior', '2025-11-08', [
    'intern-main-shanghai/2025-11-08-back-time',
    'intern-main-shanghai/2025-11-08-dropped-by-anime-mall',
  ]),
  group('2025-11-21-badminton', 'Espressif Badminton — 21 November', '2025-11-21', [
    'nov/2025-11-22-don-t-want-know',
  ]),
  group('2025-11-22-final-shanghai-weekend', 'Final Shanghai Weekend', '2025-11-22', [
    'intern-main-shanghai/2025-11-22-thurs-night-went-back',
    'intern-main-shanghai/2025-11-22-so-weekend-last',
  ]),
  group('2025-11-23-final-tourism-day', 'Final Shanghai Tourism Day', '2025-11-23', [
    'nov/2025-11-23-just-nice-dropped-by',
    'intern-main-shanghai/2025-11-23-some-interesting-things-nearby',
    'intern-main-shanghai/2025-11-23-ok-tried-10rmb',
    'intern-main-shanghai/2025-11-23-pcb',
  ]),
];

let postCount = 0;
let assetCount = 0;

for (const item of groups) {
  const result = await consolidatePosts({
    inputDirs: item.inputs,
    outputDir: `${outputRoot}/${item.slug}`,
    title: item.title,
    timestamp: `${item.date}T00:00:00Z`,
    sort: 'message-id',
    dryRun,
    force,
  });

  if (!dryRun) {
    await normalizeShanghaiCountry(`${outputRoot}/${item.slug}/index.md`);
  }

  postCount += result.posts;
  assetCount += result.assets;
  console.log(`${item.slug}: ${result.posts} post(s), ${result.locations} location(s), ${result.assets} asset(s)`);
}

console.log(`${dryRun ? 'Would consolidate' : 'Consolidated'} ${groups.length} Shanghai day(s), ${postCount} source post(s), and ${assetCount} asset(s).`);

function group(slug, title, date, inputs) {
  return {
    slug,
    title,
    date,
    inputs: inputs.map(input => `${sourceRoot}/${input}`),
  };
}

async function normalizeShanghaiCountry(path) {
  const text = await readFile(path, 'utf8');
  const normalized = text.replace(/^(\s+country:) "CN"$/gm, '$1 "China"');
  if (normalized !== text) await writeFile(path, normalized, 'utf8');
}
