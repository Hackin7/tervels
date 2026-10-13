import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const root = path.resolve('src/content/posts/2026/intel-embedded-cup-shanghai');
const campus = [31.0275548, 121.4323084];
const hotel = {
  name: 'Shanghai Platinum Hanjue Hotel', gps: [31.0292181, 121.4134202],
  granularity: 'building', query: '上海闵行白金汉爵大酒店',
  note: 'Author confirmed Shanghai Platinum Hanjue Hotel, 1577 Humin Road, Minhang District.',
};
const pins = {
  'Unnamed Shanghai hotel': hotel,
  Hotel: hotel,
  'Espressif office': {
    name: 'Espressif new headquarters — 235 Yubei Road', gps: [31.1606641, 121.5571289],
    granularity: 'street', confidence: 'low', query: '御北路, 上海',
    note: 'Author confirmed the new HQ. Official address: Building 3, Lane 235, Yubei Road. Approximate street-level pin only; exact building coordinates remain unresolved.',
  },
  'Nearby mall': {
    name: '96 Plaza', gps: [31.22962, 121.5197664], granularity: 'building', query: '96广场, 上海',
    note: 'Author confirmed 96 Plaza at 796 Dongfang Road. Mall-level pin.',
  },
  'Espressif lunch venue': {
    name: 'Friday lunch — 96 Plaza', gps: [31.22962, 121.5197664], granularity: 'building', query: '96广场, 上海',
    note: 'Author confirmed Friday lunch was in 96 Plaza, 796 Dongfang Road. Restaurant name/unit not specified.',
  },
  'SJTU banquet venue': {
    name: 'SJTU Academic Activity Center — second floor', gps: [31.0210009, 121.4280109],
    granularity: 'building', confidence: 'medium', query: '学术活动中心 上海',
    note: 'Attached Intel Cup schedule confirms July 22 banquet, 17:00–19:00, second floor of the Academic Activity Center. Building-level pin.',
  },
  'Bookshop and maimai arcade': {
    name: 'Maimai arcade near Xujiahui', gps: [31.1955404, 121.4343816],
    granularity: 'area', confidence: 'medium', query: '徐家汇, 上海',
    note: 'Author confirmed the D3 arcade was near Xujiahui. Area-level pin only; branch not specified. Bookshop is separately listed without GPS as requested.',
  },
  Shanghai: { gps: [31.2312707, 121.4700152], granularity: 'city', query: 'Shanghai, China' },
  'Changi Airport': { gps: [1.3510921, 103.9949824], granularity: 'venue', query: '[aeroway=aerodrome] Changi, Singapore' },
  'Shanghai arrival airport': {
    name: 'Shanghai Pudong International Airport', gps: [31.1427359, 121.8041131], granularity: 'venue',
    query: '[aeroway=aerodrome] Shanghai Pudong International Airport, China',
    note: 'Arrival airport confirmed by the author as Pudong. Airport-level pin; terminal unspecified.',
  },
  'Shanghai airport': {
    name: 'Shanghai Pudong International Airport', gps: [31.1427359, 121.8041131], granularity: 'venue',
    query: '[aeroway=aerodrome] Shanghai Pudong International Airport, China',
    note: 'Departure airport confirmed by the author as Pudong. Airport-level pin; terminal unspecified.',
  },
  'Joy City': {
    gps: [31.2459874, 121.467506], granularity: 'venue', query: 'Joy City, Shanghai, China', context: 'visited',
    note: 'Author confirmed the D5 anime mall as Joy City.',
  },
  'Anime event / shops': {
    gps: [31.2459874, 121.467506], granularity: 'venue', query: 'Joy City, Shanghai, China',
    note: 'Author confirmed these shops and the anime event were inside Joy City. Mall-level pin.',
  },
  'Animate Cafe': {
    gps: [31.2459874, 121.467506], granularity: 'venue', query: 'Joy City, Shanghai, China',
    note: 'Author confirmed Animate Cafe was inside Joy City. Mall-level pin; unit unspecified.',
  },
  'Woodworking workshop': {
    gps: [31.2459874, 121.467506], granularity: 'venue', query: 'Joy City, Shanghai, China',
    note: 'Author confirmed the woodworking workshop was inside Joy City. Mall-level pin; unit unspecified.',
  },
  'Shanghai Jiao Tong University': {
    gps: campus, granularity: 'area', query: '上海交通大学（闵行校区）, China',
    note: 'Minhang campus, confirmed by the official 2026 Intel Cup report. Campus-level pin.',
  },
  'Registration venue': {
    name: 'SJTU SEIEE Building 3 — Room 3-100',
    gps: [31.0271677, 121.4370569], granularity: 'building', query: '电信群楼3号楼', overwrite: true,
    note: 'Attached schedule confirms July 20 registration and pre-meeting in SEIEE Building 3, room 3-100. Building-level pin.',
  },
  'Intel Embedded Cup venue': {
    name: 'SJTU SEIEE Building 4 — E Valley',
    gps: [31.02633, 121.4370197], granularity: 'building', query: '电信群楼4号楼', overwrite: true,
    note: 'Attached schedule confirms July 21–22 appraisal in TED Theatre, E-Camp and Geeker Space, SEIEE Building 4 (E Valley), 600 Dongchuan Road. Building-level pin.',
  },
  'Award ceremony / poster venue': {
    gps: campus, granularity: 'area', confidence: 'medium', query: '上海交通大学（闵行校区）, China',
    note: 'Official report locates the ceremony in the Microelectronics Building auditorium. Pin is campus-level; exact building coordinate and poster location need confirmation.',
  },
  "People's Square": { gps: [31.2314784, 121.470047], granularity: 'area', query: "People's Square, Shanghai (pedestrian square, not metro station)" },
  'D Mall': { gps: [31.2306916, 121.4688531], granularity: 'venue', query: '迪美购物中心, Shanghai, China', note: 'Identified as D Mall / 迪美购物中心 near People’s Square.' },
  'ZX Mall / GiGO': { gps: [31.2391749, 121.4787799], granularity: 'building', query: '百联ZX', note: 'Bailian ZX, Nanjing East Road. Mall-level pin; GiGO floor is not separately geotagged.' },
  'Oriental Pearl Tower': { gps: [31.2419464, 121.4952604], granularity: 'building', query: 'Oriental Pearl Tower, Shanghai, China' },
};
const hash = value => createHash('sha256').update(value).digest('hex');
let added = 0;
const reports = [];
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(root, entry.name, 'index.md');
  let text;
  try { text = await readFile(file, 'utf8'); } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  const split = text.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)([\s\S]*)$/);
  if (!split) throw new Error(`Invalid frontmatter: ${file}`);
  const beforeBody = hash(split[4]);
  const newline = split[1].includes('\r') ? '\r\n' : '\n';
  const front = split[2].replace(/^  - name:.*(?:\r?\n(?: {4}.*|[ \t]*$))*/gm, block => {
    const name = yaml.load(`locations:\n${block}`).locations[0].name;
    const pin = pins[name];
    if (!pin || (!pin.overwrite && !/^    gps: null\r?$/m.test(block))) return block;
    added++;
    const cleaned = block.replace(/^    gps_(?:source|granularity|confidence|query):.*\r?\n?/gm, '');
    let updated = cleaned.replace(/^    gps: (?:null|\[[^\]]+\])\r?$/m,
      `    gps: [${pin.gps.join(', ')}]${newline}` +
      `    gps_source: "openstreetmap"${newline}` +
      `    gps_granularity: "${pin.granularity}"${newline}` +
      `    gps_confidence: "${pin.confidence ?? 'high'}"${newline}` +
      `    gps_query: ${JSON.stringify(pin.query)}`);
    if (pin.name) updated = updated.replace(/^  - name:.*\r?$/m, `  - name: ${JSON.stringify(pin.name)}`);
    if (pin.context) updated = updated.replace(/^    context:.*\r?$/m, `    context: ${JSON.stringify(pin.context)}`);
    if (pin.note) {
      updated = updated.replace(/^    review_note:.*\r?\n?/m, '');
      updated = updated.trimEnd() + newline + `    review_note: ${JSON.stringify(pin.note)}` + newline;
    }
    if (name === 'Bookshop and maimai arcade') {
      updated = updated.trimEnd() + newline + [
        '  - name: "Bookshop"', '    country: "China"', '    city: "Shanghai"',
        '    city_slug: "shanghai"', '    gps: null', '    context: "visited"',
        '    review_note: "No GPS tag requested by the author."',
      ].join(newline) + newline;
    }
    return updated;
  });
  const updated = split[1] + front + split[3] + split[4];
  if (hash(updated.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/)[1]) !== beforeBody) {
    throw new Error(`Body changed: ${file}`);
  }
  const data = yaml.load(front);
  await writeFile(file, updated);
  reports.push({ title: data.title, path: file, locations: data.locations });
  const sourceFile = path.join(root, entry.name, 'telegram-sources.json');
  try {
    const provenance = JSON.parse((await readFile(sourceFile, 'utf8')).replace(/^\uFEFF/, ''));
    provenance.published_locations = data.locations;
    provenance.geotag_note = 'Published location pins updated from WGS84 OpenStreetMap lookups. Campus-level inferences are explicitly marked; unresolved venues retain null GPS. Original source locations and captions are retained.';
    await writeFile(sourceFile, JSON.stringify(provenance, null, 2) + '\n');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
const lines = [
  '# Shanghai 2026 geotag review', '',
  'Coordinates use WGS84. Article bodies were verified unchanged by SHA-256.', '',
  'Sources:',
  '- [OpenStreetMap / Nominatim](https://nominatim.openstreetmap.org/)',
  '- [SJTU official 2026 Intel Cup report](https://news.sjtu.edu.cn/zhxw/20260728/225092.html)',
  '- [Bailian ZX address, Shanghai government](https://japanese.shanghai.gov.cn/ja-ShoppingCenters/20240320/9f991649efb247b9a75caa69a2d0f154.html)',
  '- [Espressif current published address](https://www.espressif.com/en/node/1) — new HQ confirmed by the author; exact building pin remains unresolved.', '',
  'Author clarifications: Pudong Airport; hotel at 1577 Humin Road; Espressif new HQ; 96 Plaza at 796 Dongfang Road; Friday lunch in 96 Plaza; D3 arcade near Xujiahui; GiGO in Bailian ZX on Nanjing Road; bookshop intentionally has no GPS. The attached SJTU schedule identifies registration, judging and banquet rooms.', '',
];
for (const report of reports) {
  lines.push(`## ${report.title}`, '', '| Location | Coordinates | Precision / clarification |', '|---|---|---|');
  for (const loc of report.locations) {
    lines.push(`| ${loc.name} | ${loc.gps?.join(', ') ?? 'Unresolved'} | ${loc.review_note ?? loc.gps_granularity ?? 'Name/address needed'}${loc.context === 'skipped' ? '; considered, not visited' : ''} |`);
  }
  lines.push('');
}
await writeFile('docs/shanghai-2026-geotags.md', lines.join('\n') + '\n');
console.log(JSON.stringify({ articles: reports.length, addedCoordinates: added,
  locationsWithCoordinates: reports.reduce((sum, report) => sum + report.locations.filter(loc => loc.gps).length, 0),
  bodyHashesUnchanged: true }, null, 2));
