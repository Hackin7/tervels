import {
  access,
  copyFile,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

const LOCATION_OPTIONAL_FIELDS = [
  'gps_source',
  'gps_granularity',
  'gps_confidence',
  'gps_query',
  'zoom',
];

export async function consolidatePosts(options) {
  const cwd = resolve(options.cwd ?? process.cwd());
  const inputDirs = await resolveInputs(options.inputDirs ?? [], cwd);
  const outputDir = resolve(cwd, required(options.outputDir, 'An output directory is required.'));
  validateOutputPath(outputDir, inputDirs, cwd);

  const files = await discoverPostFiles(inputDirs);
  if (files.length === 0) throw new Error('No Markdown posts were found in the input directories.');

  const posts = [];
  for (const path of files) {
    const text = await readFile(path, 'utf8');
    posts.push(parsePostText(text, path));
  }
  const sort = options.sort ?? 'timestamp';
  if (!['timestamp', 'message-id'].includes(sort)) throw new Error(`Invalid sort mode: ${sort}`);
  posts.sort(sort === 'message-id' ? compareByMessageId : compareByTimestamp);

  const timestamp = resolveTimestamp(options.timestamp, posts);
  const title = String(options.title || basename(outputDir)).trim();
  if (!title) throw new Error('The consolidated title cannot be empty.');

  const locations = mergeLocations(posts.flatMap(post => post.locations));
  if (locations.length === 0) throw new Error('The consolidated post must contain at least one location.');

  const assetCopies = new Map();
  const sections = [];
  let cover = null;
  let youtubeCover = null;
  for (const [index, post] of posts.entries()) {
    const sectionId = `${String(index + 1).padStart(2, '0')}-${slugify(post.title)}`;
    const registerAsset = (raw, settings) => registerLocalAsset(raw, post.path, sectionId, assetCopies, settings);
    const body = rewriteAssetReferences(normalizeHeadings(post.body, post.title), registerAsset).trim();
    if (!cover && post.cover) cover = registerAsset(post.cover, { force: true });
    if (!youtubeCover && post.youtube?.cover) youtubeCover = post.youtube.cover;
    const source = displayPath(post.path, cwd);
    sections.push([
      `<!-- consolidated-from: ${source} -->`,
      body,
    ].filter(Boolean).join('\n\n'));
  }

  await validateAssets(assetCopies);
  const outputText = serializePost({
    title,
    timestamp,
    locations,
    cover,
    youtube: {
      items: mergeYouTubeItems(posts.flatMap(post => post.youtube?.items ?? [])),
      cover: cover ? null : youtubeCover,
    },
    experiences: mergeExperiences(posts.flatMap(post => post.experiences)),
    tags: unique(posts.flatMap(post => post.tags)),
    draft: posts.some(post => post.draft),
    body: sections.join('\n\n---\n\n'),
  });

  const exists = await pathExists(outputDir);
  if (exists && !options.force) {
    throw new Error(`Output already exists: ${outputDir}. Pass --force to replace it.`);
  }

  const summary = {
    outputDir,
    outputFile: join(outputDir, 'index.md'),
    posts: posts.length,
    locations: locations.length,
    assets: assetCopies.size,
    timestamp,
    dryRun: Boolean(options.dryRun),
    sort,
  };
  if (options.dryRun) return { ...summary, outputText };

  const outputParent = dirname(outputDir);
  const stagingDir = join(outputParent, `.consolidate-${basename(outputDir)}-${process.pid}-${Date.now()}`);
  const backupDir = join(outputParent, `.consolidate-backup-${basename(outputDir)}-${process.pid}-${Date.now()}`);
  let backedUp = false;
  try {
    await mkdir(outputParent, { recursive: true });
    await mkdir(stagingDir, { recursive: false });
    await writeFile(join(stagingDir, 'index.md'), outputText, 'utf8');
    for (const asset of assetCopies.values()) {
      const destination = join(stagingDir, ...asset.destination.split('/'));
      await mkdir(dirname(destination), { recursive: true });
      await copyFile(asset.source, destination);
    }
    if (exists) {
      await rename(outputDir, backupDir);
      backedUp = true;
    }
    await rename(stagingDir, outputDir);
    if (backedUp) {
      await rm(backupDir, { recursive: true, force: false });
      backedUp = false;
    }
  } catch (error) {
    await rm(stagingDir, { recursive: true, force: true });
    if (backedUp && !await pathExists(outputDir)) await rename(backupDir, outputDir);
    throw error;
  }

  return summary;
}

export function parsePostText(text, path = 'index.md') {
  const normalized = text.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) throw new Error(`Missing or malformed frontmatter: ${path}`);
  const blocks = topLevelBlocks(match[1].split('\n'));
  const title = scalarBlock(blocks, 'title');
  if (!title) throw new Error(`Missing title: ${path}`);
  const timestamp = scalarBlock(blocks, 'timestamp');
  const timestampMs = Date.parse(timestamp);
  if (!timestamp || Number.isNaN(timestampMs)) throw new Error(`Missing or invalid timestamp: ${path}`);
  const locations = parseLocations(blocks.get('locations') ?? [], path);
  if (locations.length === 0) throw new Error(`Missing locations: ${path}`);

  return {
    path: resolve(path),
    title: String(title),
    timestamp: String(timestamp),
    timestampMs,
    messageId: nestedScalar(blocks.get('source') ?? [], 'message_id'),
    locations,
    cover: scalarBlock(blocks, 'cover'),
    youtube: parseYouTube(blocks.get('youtube') ?? [], path),
    experiences: [
      ...parseExperiences(blocks.get('experiences') ?? [], path),
      ...parseStringList(blocks.get('events') ?? []).map(slug => ({ kind: 'event', slug })),
    ],
    tags: parseStringList(blocks.get('tags') ?? []),
    draft: scalarBlock(blocks, 'draft') === true || scalarBlock(blocks, 'draft') === 'true',
    body: normalized.slice(match[0].length).trim(),
  };
}

export function normalizeHeadings(body, title) {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let fence = null;
  let removedTitle = false;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!fence) fence = marker;
      else if (fence === marker) fence = null;
      out.push(line);
      continue;
    }
    if (fence) {
      out.push(line);
      continue;
    }

    const atx = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (atx) {
      const headingText = atx[2].trim();
      if (!removedTitle && normalizeText(headingText) === normalizeText(title)) {
        removedTitle = true;
        continue;
      }
      out.push(`${'#'.repeat(Math.min(6, atx[1].length + 2))} ${headingText}`);
      continue;
    }

    const next = lines[index + 1];
    if (line.trim() && next && /^\s*(=+|-+)\s*$/.test(next)) {
      if (!removedTitle && normalizeText(line) === normalizeText(title)) {
        removedTitle = true;
        index += 1;
        continue;
      }
      out.push(`${next.trim().startsWith('=') ? '###' : '####'} ${line.trim()}`);
      index += 1;
      continue;
    }
    out.push(line);
  }
  return out.join('\n').replace(/^\s+|\s+$/g, '');
}

export function mergeLocations(locations) {
  const merged = [];
  const indexes = new Map();
  for (const location of locations) {
    const key = locationKey(location);
    if (!indexes.has(key)) {
      indexes.set(key, merged.length);
      merged.push({ ...location });
      continue;
    }
    const current = merged[indexes.get(key)];
    for (const [field, value] of Object.entries(location)) {
      if ((current[field] == null || current[field] === '') && value != null && value !== '') current[field] = value;
    }
  }
  return merged;
}

export function mergeExperiences(experiences) {
  const out = [];
  const seen = new Set();
  for (const experience of experiences) {
    const value = experience.kind === 'event' ? experience.slug : experience.name;
    const key = `${experience.kind}:${normalizeText(value)}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ ...experience });
    }
  }
  return out;
}

export function mergeYouTubeItems(items) {
  const out = [];
  const seen = new Set();
  for (const item of items) {
    const key = `${item.kind}:${item.id}:${item.start ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ ...item });
  }
  return out;
}

export function rewriteAssetReferences(body, registerAsset) {
  let out = body.replace(/(!?\[[^\]]*\]\()(<[^>]+>|[^\s)]+)([^)]*\))/g, (_, start, target, end) => {
    return `${start}${registerAsset(target, { force: start.startsWith('!') })}${end}`;
  });
  out = out.replace(/^(\s*\[[^\]]+\]:\s*)(<[^>]+>|\S+)/gm, (_, start, target) => {
    return `${start}${registerAsset(target)}`;
  });
  out = out.replace(/\b(src|href)=(['"])([^'"]+)\2/gi, (_, attribute, quote, target) => {
    return `${attribute}=${quote}${registerAsset(target, { force: attribute.toLowerCase() === 'src' })}${quote}`;
  });
  return out;
}

function parseLocations(block, path) {
  const out = [];
  let current = null;
  for (const line of block.slice(1)) {
    const first = line.match(/^  - name:\s*(.*)$/);
    if (first) {
      current = { name: parseScalar(first[1]) };
      out.push(current);
      continue;
    }
    const field = line.match(/^    ([a-z_]+):\s*(.*)$/);
    if (current && field) current[field[1]] = parseScalar(field[2]);
  }
  for (const location of out) {
    for (const field of ['name', 'country', 'city', 'city_slug']) {
      if (!location[field]) throw new Error(`Location is missing ${field}: ${path}`);
    }
    if (!Object.hasOwn(location, 'gps')) throw new Error(`Location is missing gps: ${path}`);
    if (location.gps !== null && (!Array.isArray(location.gps) || location.gps.length !== 2 || location.gps.some(value => typeof value !== 'number'))) {
      throw new Error(`Location has invalid gps: ${path}`);
    }
  }
  return out;
}

function parseExperiences(block, path) {
  const out = [];
  let current = null;
  for (const line of block.slice(1)) {
    const first = line.match(/^  - kind:\s*(.*)$/);
    if (first) {
      current = { kind: String(parseScalar(first[1])) };
      out.push(current);
      continue;
    }
    const field = line.match(/^    (name|slug):\s*(.*)$/);
    if (current && field) current[field[1]] = parseScalar(field[2]);
  }
  for (const experience of out) {
    if (experience.kind === 'event' && !experience.slug) throw new Error(`Event experience is missing slug: ${path}`);
    if (['museum', 'trail'].includes(experience.kind) && !experience.name) throw new Error(`${experience.kind} experience is missing name: ${path}`);
    if (!['event', 'museum', 'trail'].includes(experience.kind)) throw new Error(`Invalid experience kind '${experience.kind}': ${path}`);
  }
  return out;
}

function parseYouTube(block, path) {
  const youtube = { items: [], cover: null };
  let current = null;
  for (const line of block.slice(1)) {
    const first = line.match(/^    - kind:\s*(.*)$/);
    if (first) {
      current = { kind: String(parseScalar(first[1])) };
      youtube.items.push(current);
      continue;
    }
    const field = line.match(/^      (id|start):\s*(.*)$/);
    if (current && field) current[field[1]] = parseScalar(field[2]);
    const cover = line.match(/^  cover:\s*(.*)$/);
    if (cover) youtube.cover = String(parseScalar(cover[1]));
  }
  for (const item of youtube.items) {
    if (!['video', 'playlist'].includes(item.kind) || !item.id) throw new Error(`Invalid YouTube item: ${path}`);
    if (item.kind === 'playlist' && item.start != null) throw new Error(`YouTube playlist cannot have a start time: ${path}`);
    if (item.start != null && (!Number.isInteger(item.start) || item.start < 0)) throw new Error(`Invalid YouTube start time: ${path}`);
  }
  return youtube;
}

function topLevelBlocks(lines) {
  const blocks = new Map();
  let key = null;
  for (const line of lines) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):(?:\s|$)/);
    if (match) {
      key = match[1];
      blocks.set(key, [line]);
    } else if (key) {
      blocks.get(key).push(line);
    }
  }
  return blocks;
}

function scalarBlock(blocks, key) {
  const line = blocks.get(key)?.[0];
  if (!line) return null;
  return parseScalar(line.slice(line.indexOf(':') + 1).trim());
}

function parseStringList(block) {
  if (block.length === 0) return [];
  const inline = block[0].slice(block[0].indexOf(':') + 1).trim();
  if (inline) {
    const value = parseScalar(inline);
    if (!Array.isArray(value)) throw new Error(`Expected a list, received: ${inline}`);
    return value.map(item => String(item));
  }
  return block.slice(1).map(line => line.match(/^\s+-\s*(.*)$/)?.[1]).filter(value => value != null).map(parseScalar).map(String);
}

function nestedScalar(block, key) {
  const line = block.find(item => new RegExp(`^\\s+${key}:`).test(item));
  return line ? parseScalar(line.slice(line.indexOf(':') + 1).trim()) : null;
}

function parseScalar(raw) {
  if (raw === '') return null;
  try { return JSON.parse(raw); } catch { return raw.replace(/^['"]|['"]$/g, ''); }
}

function serializePost(post) {
  const lines = [
    '---',
    `title: ${JSON.stringify(post.title)}`,
    `timestamp: ${post.timestamp}`,
    'locations:',
  ];
  for (const location of post.locations) {
    lines.push(
      `  - name: ${JSON.stringify(String(location.name))}`,
      `    country: ${JSON.stringify(String(location.country))}`,
      `    city: ${JSON.stringify(String(location.city))}`,
      `    city_slug: ${JSON.stringify(String(location.city_slug))}`,
      `    gps: ${location.gps === null ? 'null' : JSON.stringify(location.gps)}`,
    );
    for (const field of LOCATION_OPTIONAL_FIELDS) {
      if (location[field] == null || location[field] === '') continue;
      const value = ['gps_query'].includes(field) ? JSON.stringify(String(location[field])) : location[field];
      lines.push(`    ${field}: ${value}`);
    }
  }
  if (post.cover) lines.push(`cover: ${JSON.stringify(post.cover)}`);
  if (post.youtube.items.length > 0 || post.youtube.cover) {
    lines.push('youtube:');
    if (post.youtube.items.length > 0) {
      lines.push('  items:');
      for (const item of post.youtube.items) {
        lines.push(`    - kind: ${item.kind}`, `      id: ${JSON.stringify(String(item.id))}`);
        if (item.start != null) lines.push(`      start: ${item.start}`);
      }
    }
    if (post.youtube.cover) lines.push(`  cover: ${JSON.stringify(post.youtube.cover)}`);
  }
  if (post.experiences.length === 0) lines.push('experiences: []');
  else {
    lines.push('experiences:');
    for (const experience of post.experiences) {
      lines.push(`  - kind: ${experience.kind}`);
      if (experience.kind === 'event') lines.push(`    slug: ${JSON.stringify(String(experience.slug))}`);
      else lines.push(`    name: ${JSON.stringify(String(experience.name))}`);
    }
  }
  lines.push(`tags: ${JSON.stringify(post.tags)}`);
  lines.push(`draft: ${post.draft}`);
  lines.push('---', '', post.body.trim(), '');
  return lines.join('\n');
}

function registerLocalAsset(rawTarget, postPath, sectionId, assetCopies, settings = {}) {
  const wrapped = rawTarget.startsWith('<') && rawTarget.endsWith('>');
  const target = wrapped ? rawTarget.slice(1, -1) : rawTarget;
  if (!isLocalReference(target) || (!settings.force && !isAttachmentReference(target))) return rawTarget;
  const suffixAt = target.search(/[?#]/);
  const pathPart = suffixAt >= 0 ? target.slice(0, suffixAt) : target;
  const suffix = suffixAt >= 0 ? target.slice(suffixAt) : '';
  let decoded;
  try { decoded = decodeURIComponent(pathPart); } catch { decoded = pathPart; }
  const source = resolve(dirname(postPath), decoded.replace(/\//g, sep));
  const safeSegments = decoded.replace(/\\/g, '/').split('/').filter(segment => segment && segment !== '.').map(segment => segment === '..' ? '_up' : segment);
  const destination = ['assets', sectionId, ...safeSegments].join('/');
  const existing = assetCopies.get(destination);
  if (existing && existing.source !== source) throw new Error(`Asset destination collision: ${destination}`);
  assetCopies.set(destination, { source, destination, referencedBy: postPath });
  const encoded = destination.split('/').map(encodeURIComponent).join('/');
  return `./${encoded}${suffix}`;
}

function isLocalReference(target) {
  if (!target || target.startsWith('#') || target.startsWith('/') || target.startsWith('\\') || target.startsWith('//')) return false;
  if (isAbsolute(target) || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(target)) return false;
  return true;
}

function isAttachmentReference(target) {
  const path = target.split(/[?#]/, 1)[0].toLowerCase();
  if (path.endsWith('/') || !/\.[a-z0-9]{1,10}$/.test(path)) return false;
  return !/\.(?:md|markdown|mdx|html?|astro)$/.test(path);
}

async function validateAssets(assetCopies) {
  const errors = [];
  for (const asset of assetCopies.values()) {
    try {
      const details = await stat(asset.source);
      if (!details.isFile()) errors.push(`Referenced asset is not a file: ${asset.source}`);
    } catch {
      errors.push(`Missing asset referenced by ${asset.referencedBy}: ${asset.source}`);
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
}

async function resolveInputs(values, cwd) {
  if (values.length === 0) throw new Error('At least one input directory is required.');
  const inputs = [];
  const seen = new Set();
  for (const value of values) {
    const candidate = resolve(cwd, value);
    let canonical;
    try { canonical = await realpath(candidate); } catch { throw new Error(`Input directory does not exist: ${candidate}`); }
    const details = await stat(canonical);
    if (!details.isDirectory()) throw new Error(`Input is not a directory: ${canonical}`);
    const key = canonical.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      inputs.push(canonical);
    }
  }
  return inputs;
}

async function discoverPostFiles(inputDirs) {
  const files = new Map();
  for (const input of inputDirs) {
    for (const path of await findMarkdownFiles(input)) {
      const canonical = await realpath(path);
      files.set(canonical.toLowerCase(), canonical);
    }
  }
  return [...files.values()].sort();
}

async function findMarkdownFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await findMarkdownFiles(path));
    else if (entry.isFile() && /\.md$/i.test(entry.name)) out.push(path);
  }
  return out;
}

function validateOutputPath(outputDir, inputDirs, cwd) {
  if (outputDir === cwd) throw new Error('The output directory cannot be the working directory.');
  const outputKey = withTrailingSeparator(outputDir.toLowerCase());
  for (const input of inputDirs) {
    const inputKey = withTrailingSeparator(input.toLowerCase());
    if (outputKey.startsWith(inputKey)) throw new Error(`Output cannot be inside an input directory: ${outputDir}`);
    if (inputKey.startsWith(outputKey)) throw new Error(`An input directory cannot be inside the output directory: ${input}`);
  }
}

function resolveTimestamp(override, posts) {
  if (!override) return new Date(posts[0].timestampMs).toISOString();
  const parsed = Date.parse(override);
  if (Number.isNaN(parsed)) throw new Error(`Invalid --timestamp value: ${override}`);
  return new Date(parsed).toISOString();
}

function locationKey(location) {
  const named = [location.name, location.city, location.country].map(normalizeText).join('|');
  if (named.replace(/\|/g, '')) return `name:${named}`;
  return `gps:${JSON.stringify(location.gps)}`;
}

function normalizeText(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function slugify(value) {
  return normalizeText(value).replace(/\s+/g, '-') || 'post';
}

function unique(values) {
  return [...new Set(values.map(value => String(value).trim()).filter(Boolean))];
}

function displayPath(path, cwd) {
  const rel = relative(cwd, path);
  const fallback = join(basename(dirname(path)), basename(path));
  return (rel && !rel.startsWith('..') && !isAbsolute(rel) ? rel : fallback).replace(/\\/g, '/');
}

function compareByTimestamp(a, b) {
  return a.timestampMs - b.timestampMs || compareMessageIds(a, b) || a.path.localeCompare(b.path);
}

function compareByMessageId(a, b) {
  return compareMessageIds(a, b) || a.timestampMs - b.timestampMs || a.path.localeCompare(b.path);
}

function compareMessageIds(a, b) {
  const aId = Number(a.messageId);
  const bId = Number(b.messageId);
  const aValid = Number.isFinite(aId);
  const bValid = Number.isFinite(bId);
  if (aValid && bValid) return aId - bId;
  if (aValid) return -1;
  if (bValid) return 1;
  return 0;
}

function withTrailingSeparator(path) {
  return path.endsWith(sep) ? path : `${path}${sep}`;
}

function required(value, message) {
  if (value == null || String(value).trim() === '') throw new Error(message);
  return String(value);
}

async function pathExists(path) {
  try { await access(path); return true; } catch { return false; }
}
