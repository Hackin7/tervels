import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, relative } from 'node:path';

const NOMINATIM_SEARCH = 'https://nominatim.openstreetmap.org/search';
const DEFAULT_USER_AGENT = 'tervels-coordinate-enricher/0.1';
const RATE_MS = 1100;

const COUNTRY_HINTS = new Map([
  ['United States', ['United States', 'USA', 'US']],
  ['China', ['China']],
  ['Japan', ['Japan']],
  ['Singapore', ['Singapore']],
  ['Malaysia', ['Malaysia']],
  ['Switzerland', ['Switzerland']],
  ['France', ['France']],
  ['Germany', ['Germany']],
  ['Austria', ['Austria']],
  ['Poland', ['Poland']],
  ['Spain', ['Spain']],
]);

const KNOWN_PLACE_QUERIES = [
  q('DEF CON venue', 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  q('DEF CON / LiveOverflow session area', 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  q('DEF CON day 2 / badge-life area', 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  q('DEF CON day 3', 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  q('Mandalay Bay / DEF CON area', 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'medium'),
  q('Black Hat USA venue / conference floor', 'Mandalay Bay Convention Center, Las Vegas, United States', 'venue', 'high'),
  q('Black Hat USA booths and Arsenal area', 'Mandalay Bay Convention Center, Las Vegas, United States', 'venue', 'high'),
  q('Griffith Observatory', 'Griffith Observatory, Los Angeles, United States', 'building', 'high'),
  q('Santa Monica Pier and beach', 'Santa Monica Pier, Santa Monica, United States', 'venue', 'high'),
  q('Venice Beach', 'Venice Beach, Los Angeles, United States', 'area', 'medium'),
  q('LAX Airport', 'Los Angeles International Airport, Los Angeles, United States', 'venue', 'high'),
  q('Las Vegas airport food area', 'Harry Reid International Airport, Las Vegas, United States', 'venue', 'medium'),
  q('Vegas Loop', 'Las Vegas Convention Center Loop, Las Vegas, United States', 'venue', 'medium'),
  q('IKEA Singapore / lunch', 'IKEA Alexandra, Singapore', 'building', 'medium'),
  q('CySAT event venue', 'NUS School of Computing, Singapore', 'building', 'medium'),
  q('Funan booth / JC student event context', 'Funan, Singapore', 'building', 'medium'),
  q('Jewel L1 / Changi Airport Terminal 1', 'Jewel Changi Airport, Singapore', 'building', 'high'),
  q('KSL Mall', 'KSL City Mall, Johor Bahru, Malaysia', 'building', 'high'),
  q('IKEA', 'IKEA, Shanghai, China', 'building', 'medium'),
  q('Shanghai Maker Faire', 'Maker Faire Shanghai, Shanghai, China', 'venue', 'medium'),
  q('Nanjing East Road and The Bund', 'The Bund, Shanghai, China', 'area', 'medium'),
  q('KiCon venue', 'KiCon Asia, Shenzhen, China', 'venue', 'medium'),
  q('Embedded World venue', 'NürnbergMesse, Nuremberg, Germany', 'venue', 'high'),
  q('Marienplatz', 'Marienplatz, Munich, Germany', 'area', 'high'),
  q('BMW Museum', 'BMW Museum, Munich, Germany', 'building', 'high'),
  q('Salzburg Fortress', 'Hohensalzburg Fortress, Salzburg, Austria', 'building', 'high'),
  q('Frankfurt train station', 'Frankfurt Hauptbahnhof, Frankfurt, Germany', 'building', 'high'),
  q('ph0wn event / Nice and Antibes walk', 'Sophia Antipolis, Valbonne, France', 'area', 'medium'),
  q("Insomni'hack venue", 'SwissTech Convention Center, Lausanne, Switzerland', 'venue', 'high'),
  q('LakeCTF / PolyLAN area', 'SwissTech Convention Center, Lausanne, Switzerland', 'venue', 'high'),
  q('Balelec venue', 'EPFL, Lausanne, Switzerland', 'venue', 'medium'),
  q('PolyManga venue', '2m2c Montreux Music & Convention Centre, Montreux, Switzerland', 'venue', 'high'),
  q('EPFL campus / hike to school', 'EPFL, Lausanne, Switzerland', 'venue', 'high'),
  q('EPFL Rocket Team', 'EPFL, Lausanne, Switzerland', 'venue', 'high'),
  q('UNIL / University of Lausanne', 'University of Lausanne, Lausanne, Switzerland', 'venue', 'high'),
  q('Palais de Rumine / science and animal museums', 'Palais de Rumine, Lausanne, Switzerland', 'building', 'high'),
  q('Lausanne bus station / FlixBus', 'Lausanne Bus Station, Lausanne, Switzerland', 'street', 'medium'),
  q('Toy shop near Bessieres', 'Bessières, Lausanne, Switzerland', 'area', 'low'),
  q('Mix Cafe', 'Mix Cafe, Lausanne, Switzerland', 'building', 'medium'),
  q('KFC', 'KFC, Lausanne, Switzerland', 'building', 'medium'),
  q('Cathedrale Saint-Pierre', 'St Pierre Cathedral, Geneva, Switzerland', 'building', 'high'),
  q("Jet d'Eau / Geneva walking route", "Jet d'Eau, Geneva, Switzerland", 'venue', 'high'),
  q('Maison Tavel', 'Maison Tavel, Geneva, Switzerland', 'building', 'high'),
  q('Basel cathedral', 'Basel Minster, Basel, Switzerland', 'building', 'high'),
  q('Kunstmuseum Basel / museum stops', 'Kunstmuseum Basel, Basel, Switzerland', 'building', 'high'),
  q('Basel streets / Rhine crossing', 'Middle Bridge, Basel, Switzerland', 'venue', 'medium'),
  q('Chase-away-winter festival', 'Basel, Switzerland', 'city', 'low'),
  q('Park Guell', 'Park Güell, Barcelona, Spain', 'venue', 'high'),
  q('Barceloneta Beach', 'Barceloneta Beach, Barcelona, Spain', 'area', 'high'),
  q('Restaurant Colom / paella place', 'Restaurant Colom, Barcelona, Spain', 'building', 'medium'),
  q('FC Barcelona / stadium or club area', 'Camp Nou, Barcelona, Spain', 'venue', 'medium'),
  q('Nagashima Spa Land', 'Nagashima Spa Land, Kuwana, Japan', 'venue', 'high'),
  q('Atsuta Jingu', 'Atsuta Jingu, Nagoya, Japan', 'venue', 'high'),
  q('Osu Shopping Street', 'Osu Shopping Street, Nagoya, Japan', 'area', 'high'),
  q('Inuyama Castle', 'Inuyama Castle, Inuyama, Japan', 'building', 'high'),
  q('Shibori Tie-Dyeing Museum', 'Arimatsu Narumi Shibori Kaikan, Nagoya, Japan', 'building', 'high'),
  q('Nagoya airport', 'Chubu Centrair International Airport, Nagoya, Japan', 'venue', 'high'),
  q('Airport / observatory', 'Chubu Centrair International Airport Sky Deck, Tokoname, Japan', 'venue', 'medium'),
  q('Zermatt town / Matterhorn area', 'Zermatt, Switzerland', 'city', 'low'),
  q('Grindelwald', 'Grindelwald, Switzerland', 'city', 'low'),
  q('Interlaken and Lauterbrunnen', 'Lauterbrunnen, Switzerland', 'city', 'low'),
  q('Huangshan queue / mountain area', 'Huangshan Scenic Area, Huangshan, China', 'area', 'medium'),
  q('Nanjing day trip', 'Nanjing, China', 'city', 'low'),
];

const COORD_OVERRIDES = [
  o('DEF CON venue', [36.131903, -115.151966], 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  o('DEF CON / LiveOverflow session area', [36.131903, -115.151966], 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  o('DEF CON day 2 / badge-life area', [36.131903, -115.151966], 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  o('DEF CON day 3', [36.131903, -115.151966], 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'high'),
  o('Mandalay Bay / DEF CON area', [36.131903, -115.151966], 'Las Vegas Convention Center, Las Vegas, United States', 'venue', 'medium'),
  o('Black Hat USA venue / conference floor', [36.090857, -115.175084], 'Mandalay Bay Convention Center, Las Vegas, United States', 'venue', 'high'),
  o('Black Hat USA booths and Arsenal area', [36.090857, -115.175084], 'Mandalay Bay Convention Center, Las Vegas, United States', 'venue', 'high'),
  o('KiCon venue', [22.576868, 113.938783], 'Atour Hotel Shenzhen Nanshan Vanke Yuncheng, Shenzhen, China', 'building', 'high'),
  o('Hotel / Maker Faire return', [22.576868, 113.938783], 'Vanke Design Commune / Vanke Cloud City, Shenzhen, China', 'venue', 'medium'),
  o('Embedded World venue', [49.416511, 11.118636], 'NürnbergMesse, Nuremberg, Germany', 'venue', 'high'),
  o('ph0wn event / Nice and Antibes walk', [43.61479, 7.07164], 'Learning Centre SophiaTech, Sophia Antipolis, France', 'building', 'high'),
  o("Insomni'hack venue", [46.522545, 6.565605], 'SwissTech Convention Center, Lausanne, Switzerland', 'venue', 'high'),
  o('LakeCTF / PolyLAN area', [46.522545, 6.565605], 'SwissTech Convention Center, Lausanne, Switzerland', 'venue', 'high'),
  o('PolyManga venue', [46.529306, 6.613318], 'Beaulieu Lausanne, Avenue de Bergières 10, Lausanne, Switzerland', 'venue', 'high'),
  o('CySAT event venue', [1.283596, 103.860859], '10 Bayfront Avenue, Singapore', 'building', 'high'),
  o('Jewel L1 / Changi Airport Terminal 1', [1.360214, 103.989451], 'Jewel Changi Airport, Singapore', 'building', 'high'),
  o('EPFL campus / hike to school', [46.519124, 6.566757], 'EPFL campus, Lausanne, Switzerland', 'venue', 'high'),
  o('EPFL campus / MATLAB group / apero', [46.519124, 6.566757], 'EPFL campus, Lausanne, Switzerland', 'venue', 'medium'),
  o('EPFL IC apero / cotton candy spinner', [46.519124, 6.566757], 'EPFL campus, Lausanne, Switzerland', 'building', 'medium'),
  o('EPFL Rocket Team', [46.519124, 6.566757], 'EPFL campus, Lausanne, Switzerland', 'venue', 'high'),
  o('EPFL student project storeroom', [46.519124, 6.566757], 'EPFL campus, Lausanne, Switzerland', 'building', 'medium'),
  o('Balelec venue', [46.519124, 6.566757], 'EPFL campus, Lausanne, Switzerland', 'venue', 'medium'),
  o('Nagoya airport', [34.858414, 136.805408], 'Chubu Centrair International Airport, Tokoname, Japan', 'venue', 'high'),
  o('Airport / observatory', [34.858414, 136.805408], 'Chubu Centrair International Airport, Tokoname, Japan', 'venue', 'high'),
  o('Basel cathedral', [47.556405, 7.592572], 'Basel Minster, Basel, Switzerland', 'building', 'high'),
  o('Shibori Tie-Dyeing Museum', [35.066431, 136.971327], 'Arimatsu Narumi Shibori Kaikan, Nagoya, Japan', 'building', 'high'),
];

export function splitFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) throw new Error('missing frontmatter');
  return { frontmatter: match[1], body: text.slice(match[0].length), fullMatch: match[0] };
}

export function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.*)$`, 'm'));
  if (!match) return null;
  return parseScalar(match[1].trim());
}

export function nestedScalar(frontmatter, parent, key) {
  const lines = frontmatter.split('\n');
  const start = lines.findIndex(line => line === `${parent}:`);
  if (start === -1) return null;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\S/.test(lines[i])) break;
    const match = lines[i].match(new RegExp(`^\\s+${escapeRegExp(key)}:\\s*(.*)$`));
    if (match) return parseScalar(match[1].trim());
  }
  return null;
}

export function parsePost(text, path) {
  const { frontmatter, body, fullMatch } = splitFrontmatter(text);
  return {
    path,
    text,
    fullMatch,
    frontmatter,
    body,
    title: scalar(frontmatter, 'title') ?? '',
    date: scalar(frontmatter, 'date') ?? '',
    country: nestedScalar(frontmatter, 'location', 'country') ?? 'Unknown',
    city: nestedScalar(frontmatter, 'location', 'city') ?? 'Unknown',
    locationOrEvent: nestedScalar(frontmatter, 'location', 'location_or_event') ?? 'Unknown',
    coordsRaw: nestedScalar(frontmatter, 'location', 'coords'),
  };
}

export function buildCandidateQueries(post) {
  const candidates = [];
  const add = (query, granularity, confidence, reason) => {
    if (!query || query.includes('Unknown')) return;
    const normalized = normalizeQuery(query);
    if (candidates.some(c => normalizeQuery(c.query) === normalized)) return;
    candidates.push({ query, granularity, confidence, reason });
  };

  const known = knownPlace(post.locationOrEvent) ?? knownPlace(post.title);
  if (known) add(known.query, known.granularity, known.confidence, 'known-place');

  for (const clue of extractNameClues(`${post.title}\n${post.locationOrEvent}`)) {
    add(`${clue}, ${post.city}, ${post.country}`, 'building', 'medium', 'content-clue');
  }

  if (!isVagueLocation(post.locationOrEvent)) {
    add(`${post.locationOrEvent}, ${post.city}, ${post.country}`, 'venue', 'medium', 'location-or-event');
  }
  add(`${post.city}, ${post.country}`, 'city', 'low', 'city-fallback');

  return candidates;
}

export class ForwardGeocoder {
  constructor({ cachePath, fetcher = fetch, sleeper = sleep, userAgent = DEFAULT_USER_AGENT } = {}) {
    this.cachePath = cachePath;
    this.fetcher = fetcher;
    this.sleeper = sleeper;
    this.userAgent = userAgent;
    this.cache = new Map();
    this.lastCall = 0;
  }

  async load() {
    if (!this.cachePath || !existsSync(this.cachePath)) return;
    const txt = await readFile(this.cachePath, 'utf8');
    for (const [key, value] of Object.entries(JSON.parse(txt))) this.cache.set(key, value);
  }

  async save() {
    if (!this.cachePath) return;
    await mkdir(dirname(this.cachePath), { recursive: true });
    await writeFile(this.cachePath, JSON.stringify(Object.fromEntries(this.cache), null, 2));
  }

  async search(query) {
    const key = normalizeQuery(query);
    if (this.cache.has(key)) return this.cache.get(key);
    const wait = Math.max(0, RATE_MS - (Date.now() - this.lastCall));
    if (wait) await this.sleeper(wait);
    this.lastCall = Date.now();
    const url = `${NOMINATIM_SEARCH}?format=jsonv2&limit=5&addressdetails=1&accept-language=en&q=${encodeURIComponent(query)}`;
    const res = await this.fetcher(url, { headers: { 'User-Agent': this.userAgent } });
    if (!res.ok) throw new Error(`Nominatim ${res.status} for ${query}`);
    const json = await res.json();
    this.cache.set(key, json);
    return json;
  }
}

export async function resolvePost(post, geocoder, { overwrite = false } = {}) {
  if (!overwrite && post.coordsRaw && post.coordsRaw !== 'null') return { status: 'skipped-existing' };
  const override = coordOverride(post.locationOrEvent) ?? coordOverride(post.title);
  if (override) {
    return {
      status: 'resolved',
      candidate: { query: override.query, granularity: override.granularity, confidence: override.confidence, reason: 'coord-override' },
      coords: override.coords,
      displayName: override.displayName,
      source: 'manual',
      granularity: override.granularity,
      confidence: override.confidence,
    };
  }
  const candidates = buildCandidateQueries(post);
  for (const candidate of candidates) {
    const results = await geocoder.search(candidate.query);
    const result = pickResult(results, post);
    if (!result) continue;
    return {
      status: 'resolved',
      candidate,
      coords: [roundCoord(Number(result.lat)), roundCoord(Number(result.lon))],
      displayName: result.display_name,
      source: sourceFor(candidate.granularity),
      granularity: candidate.granularity,
      confidence: candidate.confidence,
    };
  }
  return { status: 'unresolved', candidates };
}

export function updatePostFrontmatter(post, resolution) {
  if (resolution.status !== 'resolved') return post.text;
  const lines = post.frontmatter.split('\n');
  const out = [];
  let inLocation = false;
  let wroteCoords = false;

  for (const line of lines) {
    if (line === 'location:') {
      inLocation = true;
      out.push(line);
      continue;
    }
    if (inLocation && /^\S/.test(line)) {
      if (!wroteCoords) out.push(...coordLines(resolution));
      inLocation = false;
    }
    if (inLocation && /^\s+coord_(source|granularity|confidence|query):/.test(line)) continue;
    if (inLocation && /^\s+coords:/.test(line)) {
      out.push(...coordLines(resolution));
      wroteCoords = true;
      continue;
    }
    out.push(line);
  }
  if (inLocation && !wroteCoords) out.push(...coordLines(resolution));
  const nextFrontmatter = out.join('\n');
  return post.text.replace(post.fullMatch, `---\n${nextFrontmatter}\n---\n`);
}

export function renderReport({ resolved, skipped, unresolved }) {
  const byGranularity = countBy(resolved, item => item.resolution.granularity);
  const byConfidence = countBy(resolved, item => item.resolution.confidence);
  return [
    '# Coordinate Enrichment Report',
    '',
    `- Resolved posts: ${resolved.length}`,
    `- Skipped existing coords: ${skipped.length}`,
    `- Unresolved posts: ${unresolved.length}`,
    '',
    '## Resolved By Granularity',
    '',
    ...mapCounts(byGranularity),
    '',
    '## Resolved By Confidence',
    '',
    ...mapCounts(byConfidence),
    '',
    '## Building / Venue Matches',
    '',
    ...resolved
      .filter(item => ['building', 'venue'].includes(item.resolution.granularity))
      .map(item => `- \`${relative(process.cwd(), item.post.path)}\` -> ${item.resolution.granularity}, ${item.resolution.confidence}: ${item.resolution.displayName}`),
    '',
    '## Lower Granularity Matches',
    '',
    ...resolved
      .filter(item => !['building', 'venue'].includes(item.resolution.granularity))
      .map(item => `- \`${relative(process.cwd(), item.post.path)}\` -> ${item.resolution.granularity}, ${item.resolution.confidence}: ${item.resolution.displayName}`),
    '',
    '## Unresolved',
    '',
    ...(unresolved.length ? unresolved.map(item => `- \`${relative(process.cwd(), item.post.path)}\`: ${item.post.locationOrEvent}`) : ['None']),
    '',
  ].join('\n');
}

function q(match, query, granularity, confidence) {
  return { match: normalizeQuery(match), query, granularity, confidence };
}

function o(match, coords, displayName, granularity, confidence) {
  return { match: normalizeQuery(match), coords, query: displayName, displayName, granularity, confidence };
}

function knownPlace(text) {
  const n = normalizeQuery(text);
  return KNOWN_PLACE_QUERIES.find(item => n.includes(item.match) || item.match.includes(n));
}

function coordOverride(text) {
  const n = normalizeQuery(text);
  return COORD_OVERRIDES.find(item => n.includes(item.match));
}

function extractNameClues(text) {
  const clues = new Set();
  const patterns = [
    /\b([A-Z][A-Za-z0-9'&.-]+(?:\s+[A-Z][A-Za-z0-9'&.-]+){1,5}\s+(?:Airport|Museum|Centre|Center|Convention Center|Mall|Station|Castle|Cathedral|Fortress|Observatory|Pier|Beach|Campus|University|Stadium|Tower|Temple|Shrine|Jingu|Cafe|Restaurant|Hall|Hotel))\b/g,
    /\b(EPFL|UNIL|NürnbergMesse|Mandalay Bay|Las Vegas Convention Center|SwissTech Convention Center|Palais de Rumine|Maison Tavel|Park Güell|Park Guell|Camp Nou|Jewel Changi Airport|KSL City Mall)\b/g,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) clues.add(match[1].trim());
  }
  return [...clues].slice(0, 4);
}

function pickResult(results, post) {
    const countryNames = COUNTRY_HINTS.get(post.country) ?? [post.country];
  return results.find(result => {
    const haystack = normalizeQuery(`${result.display_name ?? ''} ${result.address?.country ?? ''}`);
    return countryNames.some(country => haystack.includes(normalizeQuery(country)));
  }) ?? null;
}

function coordLines(resolution) {
  return [
    `  coords: [${resolution.coords[0]}, ${resolution.coords[1]}]`,
    `  coord_source: ${resolution.source}`,
    `  coord_granularity: ${resolution.granularity}`,
    `  coord_confidence: ${resolution.confidence}`,
    `  coord_query: ${JSON.stringify(resolution.candidate.query)}`,
  ];
}

function sourceFor(granularity) {
  return {
    building: 'geocoded-building',
    venue: 'geocoded-venue',
    street: 'geocoded-street',
    area: 'geocoded-area',
    city: 'geocoded-city',
  }[granularity] ?? 'geocoded-area';
}

function isVagueLocation(text) {
  const n = normalizeQuery(text);
  return ['unknown', 'hotel', 'breakfast', 'restaurant', 'market', 'castle / museum', 'lunch', 'dinner', 'walk route', 'nearby', 'arrival', 'train ride'].some(term => n.includes(term));
}

function parseScalar(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    try { return JSON.parse(value); } catch { return value.slice(1, -1); }
  }
  return value.replace(/`/g, '');
}

function normalizeQuery(value) {
  return String(value ?? '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function roundCoord(value) {
  return Number(value.toFixed(6));
}

function countBy(items, keyFn) {
  const map = new Map();
  for (const item of items) map.set(keyFn(item), (map.get(keyFn(item)) ?? 0) + 1);
  return map;
}

function mapCounts(map) {
  return [...map.entries()].sort(([a], [b]) => String(a).localeCompare(String(b))).map(([key, count]) => `- ${key}: ${count}`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
