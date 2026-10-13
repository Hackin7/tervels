import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { loadExport } from './lib/load-export.mjs';
import { flattenText } from './lib/parse-text.mjs';

const exportRoot = process.argv.find(arg => arg.startsWith('--export='))?.slice(9)
  ?? 'C:/Users/zunmun/Downloads/Telegram Desktop/ChatExport_2026-10-13';
const write = process.argv.includes('--write');
const tripRoot = 'src/content/posts/2026/exchange-06-krakow-ski-trip';
const reviewRoot = 'docs/imports/poland-2026-10-13';
const hash = value => createHash('sha256').update(value).digest('hex');
const location = (name, city, gps = null, granularity = 'venue', review_note) => ({
  name, country: 'Poland', city,
  city_slug: city === 'Białka Tatrzańska' ? 'bialka-tatrzanska' : city === 'Kraków' ? 'krakow' : 'zakopane',
  gps, context: 'visited',
  ...(gps ? { gps_source: 'openstreetmap', gps_granularity: granularity,
    gps_confidence: 'high', gps_query: `${name}, ${city}, Poland` } : {}),
  ...(review_note ? { review_note } : {}),
});
const krakow = () => location('Kraków', 'Kraków', [50.0619474, 19.9368564], 'city');
const bialka = () => location('Białka Tatrzańska', 'Białka Tatrzańska', [49.3946417, 20.1050528], 'area');
const resort = () => location('Kotelnica Białczańska', 'Białka Tatrzańska', [49.3762266, 20.0808984], 'area',
  'Resort confirmed by the author. Resort-area pin; individual slopes and connected mountains are not separately identified.');
const hotel = () => location('Willa Nad Białką — Środkowa 127', 'Białka Tatrzańska', [49.383968, 20.1085128], 'building',
  'Hotel confirmed by the author through the Booking.com link.');
const restaurant = () => location('Staro Izba — Środkowa 160', 'Białka Tatrzańska', [49.3854782, 20.1062538], 'building',
  'Confirmed by the author’s Google Maps screenshot and https://share.google/DMznLli3lpmrN67VT. Coordinates identify the mapped street address. Original caption spelling retained.');
const days = [
  { day: 1, date: '2026-03-23', slug: 'arrival-krakow', title: 'Poland D1: Arrival in Kraków',
    select: id => id === 5910, videos: ['mniYQ0W16cA'], locations: [krakow(),
      { name: 'Geneva–Kraków journey', country: 'Switzerland', city: 'Geneva', city_slug: 'geneva', gps: null,
        context: 'visited', review_note: 'Journey identified by the linked video; route has no single GPS pin.' },
      location('Kraków arrival airport', 'Kraków', null, 'venue', 'Exact airport/terminal needs confirmation.')],
  },
  { day: 2, date: '2026-03-24', slug: 'bialka-ski-day-1', title: 'Poland D2: Białka Tatrzańska — Ski Day 1',
    select: id => id >= 5911 && id <= 5960, videos: ['V1Xs2g3cwLk'],
    locations: [bialka(), resort(), hotel(), krakow(), restaurant(),
      location("McDonald's", 'Kraków', null, 'venue', 'Branch not identifiable from the caption.')],
  },
  { day: 3, date: '2026-03-25', slug: 'bialka-ski-day-2', title: 'Poland D3: Białka Tatrzańska — Ski Day 2',
    select: id => id >= 5962 && id <= 5987, videos: ['woBlGbluosg', 'NvwAMFa5We0'],
    locations: [bialka(), resort(), hotel(), restaurant()],
  },
  { day: 4, date: '2026-03-26', slug: 'zakopane-gubalowka', title: 'Poland D4: Zakopane + Gubałówka',
    select: id => id >= 5988 && id <= 6110, videos: ['imWbfpTrvPQ', 'ewNUhiFqHVc', 'Mpkn9r-wcUc'],
    locations: [location('Zakopane', 'Zakopane', [49.2969114, 19.9504753], 'city'), hotel(), resort(),
      location('Gubałówka / PKL funicular', 'Zakopane', [49.3077926, 19.9359329], 'area',
        'Identified from the PKL Gubałówka ticket dated March 26. Pin represents the mountain area, not the precise boarding station.'),
      location('Zakopane museum', 'Zakopane', null, 'venue',
        'Tatra Museum main building at Krupówki 10 is a candidate; exact branch requires confirmation.'),
      ...['Cheese stall', 'Shopping streets and streams', 'Arcades', 'Shopping mall', 'Tourist food street', 'Chimney cake vendor']
        .map(name => location(name, 'Zakopane', null, 'venue', 'Exact venue/street not established from the caption.'))],
  },
  { day: 5, date: '2026-03-27', slug: 'krakow-reflections', title: 'Poland D5: Kraków + Trip Reflections',
    select: id => id === 5961 || id >= 6111, videos: ['V7U_4I69SZ8'],
    locations: [krakow(),
      location('Wawel Castle', 'Kraków', [50.0539422, 19.9351513], 'venue'),
      location('Wawel Dragon / Smok Wawelski', 'Kraków', [50.0530165, 19.9335881], 'venue'),
      location('Galeria Kazimierz', 'Kraków', [50.0534938, 19.9560442], 'building',
        'Identified from the Galeria Kazimierz sign in photo_5215, associated with message 6141.'),
      ...['Shopping streets', 'Pizza-style bread vendor', 'Tram playground / exhibition beneath tracks', 'Final large shopping mall']
        .map(name => location(name, 'Kraków', null, 'venue', 'Exact venue not established; do not assume this is Galeria Kazimierz.'))],
  },
];
const data = await loadExport(exportRoot);
const messages = data.messages.filter(message => message.type === 'message' && ![5907, 5908].includes(message.id));
const assigned = new Set();
const activityHeadings = new Map([
  [5911, 'Food in Kraków'], [5931, 'Skiing'], [5951, 'Dinner'],
  [5962, 'Hotel breakfast'], [5972, 'Skiing across the resort'], [5982, 'Dinner'], [5986, 'Night skiing'],
  [5988, 'Breakfast and the resort'], [5998, 'Zakopane'], [6018, 'Museum'],
  [6058, 'Shopping streets and arcades'], [6066, 'Gubałówka'], [6076, 'Shopping mall'],
  [6086, 'Snow'], [6096, 'Food street'], [6104, 'Chimney cake'],
  [5961, 'Trip introduction'], [6111, 'Kraków streets'], [6112, 'Wawel Castle and Dragon'],
  [6131, 'Food'], [6141, 'Galeria Kazimierz'], [6151, 'Exploring the area'],
  [6161, 'Another shopping mall'], [6171, 'Trip reflections'],
]);
const importedAt = new Date().toISOString();
const pending = [];
const report = { export: exportRoot, channel_id: data.id, excluded_ids: [5907, 5908], days: [] };
function add(file, text) { pending.push({ file, text }); }
for (const day of days) {
  const selected = messages.filter(message => day.select(message.id)).sort((a, b) => a.id - b.id);
  if (!selected.length) throw new Error(`Empty day ${day.day}`);
  for (const message of selected) {
    if (assigned.has(message.id)) throw new Error(`Duplicate assignment: ${message.id}`);
    assigned.add(message.id);
  }
  const dir = `${tripRoot}/${day.date}-${day.slug}`;
  const bodies = [];
  const captions = [];
  const records = [];
  let activeCaption;
  for (const message of selected) {
    const caption = flattenText(message.text);
    const telegramUTC = new Date(Number(message.date_unixtime) * 1000).toISOString();
    if (caption.trim()) {
      activeCaption = { id: message.id, caption, message_ids: [], telegram_timestamp: telegramUTC };
      captions.push(activeCaption);
      bodies.push(`${activityHeadings.has(message.id) ? `### ${activityHeadings.get(message.id)}\n\n` : ''}<!-- telegram-message: ${message.id} -->\n${caption}`);
    }
    activeCaption?.message_ids.push(message.id);
    records.push({ id: message.id, telegram_date_exported: message.date, telegram_timestamp: telegramUTC,
      raw_text: message.text, rendered_text_sha256: hash(caption),
      source_caption_id: activeCaption?.id ?? null,
      ...(message.photo ? { photo: message.photo } : {}),
      ...(message.media_type ? { media_type: message.media_type } : {}),
      ...(message.file ? { file: message.file } : {}),
    });
  }
  const frontmatter = {
    title: day.title, timestamp: `${day.date}T12:00:00+01:00`, locations: day.locations,
    experiences: [], tags: ['telegram-import'], draft: false,
    source: { kind: 'telegram', message_id: selected[0].id, message_ids: selected.map(m => m.id),
      channel_id: data.id, telegram_timestamp: records[0].telegram_timestamp,
      imported_at: importedAt, date_basis: 'calendar' },
    youtube: { items: day.videos.map(id => ({ kind: 'video', id })) },
  };
  const body = `## ${day.title.replace(/^Poland D\d+: /, '')}\n\n${bodies.join('\n\n---\n\n')}\n`;
  for (const caption of captions) if (!body.includes(caption.caption)) throw new Error('Caption changed');
  add(`${dir}/index.md`, `---\n${yaml.dump(frontmatter, { lineWidth: -1, noRefs: true, quotingType: '"' })}---\n${body}`);
  const missingMedia = records.filter(record => record.media_type === 'video_file');
  const provenance = { source_export: exportRoot, source_channel_id: data.id,
    visit_date: day.date, visit_timezone: 'Europe/Warsaw', date_basis: 'author-confirmed itinerary',
    source_message_ids: selected.map(m => m.id), body_sha256: hash(body),
    source_messages: records, source_caption_ids: captions.map(c => c.id),
    photos_not_imported: records.filter(record => record.photo).map(record => ({ id: record.id, path: record.photo })),
    missing_media: missingMedia, youtube_ids: day.videos, published_locations: day.locations,
    photo_policy: 'Videos replace article photos; source export remains untouched.',
  };
  add(`${dir}/telegram-sources.json`, JSON.stringify(provenance, null, 2) + '\n');
  add(`${reviewRoot}/days/d${day.day}.json`, JSON.stringify(provenance, null, 2) + '\n');
  for (const caption of captions) {
    add(`${reviewRoot}/messages/${caption.id}.md`, `---\n${yaml.dump({
      message_id: caption.id, message_ids: caption.message_ids, channel_id: data.id,
      telegram_timestamp: caption.telegram_timestamp, assigned_day: day.day,
      visit_date: day.date, rendered_text_sha256: hash(caption.caption),
    }, { lineWidth: -1, noRefs: true })}---\n${caption.caption}`);
  }
  report.days.push({ day: day.day, title: day.title, visit_date: day.date,
    article: `${dir}/index.md`, message_ids: selected.map(m => m.id),
    captions: captions.length, photos: provenance.photos_not_imported.length,
    omitted_video_files: missingMedia.length, youtube_ids: day.videos });
}
if (messages.length !== 271 || assigned.size !== 271 || messages.some(m => !assigned.has(m.id))) {
  throw new Error(`Incomplete import: ${assigned.size}/${messages.length}`);
}
if (report.days.reduce((sum, day) => sum + day.photos, 0) !== 163
  || report.days.reduce((sum, day) => sum + day.omitted_video_files, 0) !== 107) {
  throw new Error('Unexpected media accounting');
}
add(`${reviewRoot}/manifest.json`, JSON.stringify(report, null, 2) + '\n');
const review = ['# Poland geotag review', '',
  'Visit dates confirmed by the author. Coordinates are WGS84; photo/video publication dates are not visit dates.', '',
  'Confirmed ski resort: https://bialkatatrzanska.pl/',
  'Confirmed hotel: https://www.booking.com/hotel/pl/willa-nad-bialka-bialka-tatrzanska.html',
  'Coordinate source: https://nominatim.openstreetmap.org/', '',
];
for (const day of days) {
  review.push(`## ${day.title}`, '', '| Location | GPS | Precision / note |', '|---|---|---|');
  for (const loc of day.locations) review.push(`| ${loc.name} | ${loc.gps?.join(', ') ?? 'Unresolved'} | ${loc.review_note ?? loc.gps_granularity ?? ''} |`);
  review.push('');
}
add(`${reviewRoot}/geotags.md`, review.join('\n'));
const rankingFile = 'src/content/posts/2026/_unsorted/2026-07-19-exchange-locations-ranking/index.md';
const ranking = await readFile(rankingFile, 'utf8');
const rankingSplit = ranking.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)([\s\S]*)$/);
const movedVideos = new Set(days.flatMap(day => day.videos));
const rankingFront = rankingSplit[2].replace(/^[ \t]+- kind: ["']?video["']?\r?\n[ \t]+id: ["']?([\w-]+)["']?\r?\n?/gm,
  (block, id) => movedVideos.has(id) ? '' : block);
const rankingData = yaml.load(rankingFront);
if (rankingData.youtube && !rankingData.youtube.items?.length && !rankingData.youtube.cover) {
  add(rankingFile, rankingSplit[1] + rankingFront.replace(/^youtube:\r?\n  items:\s*$/m, '').trimEnd()
    + rankingSplit[3] + rankingSplit[4]);
} else if (rankingFront !== rankingSplit[2]) {
  add(rankingFile, rankingSplit[1] + rankingFront + rankingSplit[3] + rankingSplit[4]);
}
// Refuse to overwrite articles containing different source IDs or captions.
for (const item of pending.filter(item => item.file.startsWith(tripRoot) && item.file.endsWith('index.md'))) {
  try {
    const existing = await readFile(item.file, 'utf8');
    const oldData = yaml.load(existing.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
    const newData = yaml.load(item.text.match(/^---\n([\s\S]*?)\n---/)[1]);
    const oldProvenance = JSON.parse(await readFile(item.file.replace('index.md', 'telegram-sources.json'), 'utf8'));
    const oldBody = existing.slice(existing.indexOf('\n---\n', 4) + 5);
    if (JSON.stringify(oldData.source?.message_ids) !== JSON.stringify(newData.source.message_ids)
      || hash(oldBody) !== oldProvenance.body_sha256) {
      throw new Error(`Conflicting existing article: ${item.file}`);
    }
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
if (write) {
  for (const item of pending) {
    await mkdir(path.dirname(item.file), { recursive: true });
    await writeFile(item.file, item.text);
  }
}
console.log(JSON.stringify({ write, articles: days.length, messages: assigned.size,
  photosLeftInExport: 163, omittedVideoFilesRecorded: 107,
  videos: days.reduce((sum, day) => sum + day.videos.length, 0),
  generatedSourceMarkdown: pending.filter(item => item.file.startsWith(reviewRoot) && item.file.endsWith('.md')).length - 1,
  outputFiles: pending.length }, null, 2));
