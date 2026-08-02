import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { consolidatePosts, normalizeHeadings } from '../../scripts/lib/post-consolidation.mjs';

const tempDirs = [];

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map(path => rm(path, { recursive: true, force: true })));
});

describe('post consolidation', () => {
  it('sorts posts, merges schema fields, deduplicates locations, and normalizes headings', async () => {
    const root = await tempRoot();
    const first = await makePost(root, 'later', {
      title: 'Later note',
      timestamp: '2026-02-02T10:00:00Z',
      locations: [location('Museum', [1.2, 3.4]), location('Trail', [5.6, 7.8])],
      tags: ['travel', 'museum'],
      events: ['event-two'],
      youtube: { items: [{ kind: 'video', id: 'later-video' }, { kind: 'playlist', id: 'trip-playlist' }], cover: 'later-video' },
      body: '# Later note\n\n## Details\nLater body.',
    });
    const second = await makePost(root, 'earlier', {
      title: 'Earlier note',
      timestamp: '2026-01-01T08:30:00+01:00',
      locations: [location('Museum', [1.2, 3.4])],
      tags: ['travel'],
      events: ['event-one'],
      youtube: { items: [{ kind: 'video', id: 'later-video' }, { kind: 'video', id: 'earlier-video', start: 42 }] },
      body: '# Earlier note\n\n# Start\nEarlier body.',
    });
    const output = join(root, 'combined');

    const result = await consolidatePosts({ inputDirs: [first, second], outputDir: output, title: 'Combined', cwd: root });
    const text = await readFile(join(output, 'index.md'), 'utf8');

    expect(result).toMatchObject({ posts: 2, locations: 2, assets: 0 });
    expect(text).toContain('timestamp: 2026-01-01T07:30:00.000Z');
    expect(text.match(/  - name: "Museum"/g)).toHaveLength(1);
    expect(text).toContain('tags: ["travel","museum"]');
    expect(text).toContain('  - kind: event\n    slug: "event-one"');
    expect(text).toContain('  - kind: event\n    slug: "event-two"');
    expect(text.match(/id: "later-video"/g)).toHaveLength(1);
    expect(text).toContain('id: "earlier-video"\n      start: 42');
    expect(text).toContain('id: "trip-playlist"');
    expect(text).toContain('cover: "later-video"');
    expect(text.indexOf('## Earlier note')).toBeLessThan(text.indexOf('## Later note'));
    expect(text).toContain('### Start');
    expect(text).toContain('#### Details');
    expect(text).not.toContain('### Earlier note');
  });

  it('copies local images and attachments while preserving page links', async () => {
    const root = await tempRoot();
    const input = await makePost(root, 'media', {
      title: 'Media note',
      body: '![Photo](photo%20one.jpg)\n\n[PDF](guide.pdf)\n\n[Another post](../other/index.md)',
    });
    await writeFile(join(input, 'photo one.jpg'), 'image');
    await writeFile(join(input, 'guide.pdf'), 'pdf');
    const output = join(root, 'combined');

    const result = await consolidatePosts({ inputDirs: [input], outputDir: output, cwd: root });
    const text = await readFile(join(output, 'index.md'), 'utf8');

    expect(result.assets).toBe(2);
    expect(text).toContain('![Photo](./assets/01-media-note/photo%20one.jpg)');
    expect(text).toContain('[PDF](./assets/01-media-note/guide.pdf)');
    expect(text).toContain('[Another post](../other/index.md)');
    expect(await readFile(join(output, 'assets/01-media-note/photo one.jpg'), 'utf8')).toBe('image');
  });

  it('validates a dry run without creating output', async () => {
    const root = await tempRoot();
    const input = await makePost(root, 'one', { title: 'One' });
    const output = join(root, 'combined');
    const result = await consolidatePosts({ inputDirs: [input], outputDir: output, dryRun: true, cwd: root });
    await expect(readFile(join(output, 'index.md'))).rejects.toThrow();
    expect(result.dryRun).toBe(true);
    expect(result.outputText).toContain('title: "combined"');
  });

  it('can order an explicitly selected day by Telegram message ID', async () => {
    const root = await tempRoot();
    const later = await makePost(root, 'filed-earlier', { title: 'Later message', timestamp: '2026-04-07T00:00:00Z', messageId: 200 });
    const earlier = await makePost(root, 'filed-later', { title: 'Earlier message', timestamp: '2026-04-09T00:00:00Z', messageId: 100 });
    const output = join(root, 'combined');
    await consolidatePosts({ inputDirs: [later, earlier], outputDir: output, sort: 'message-id', cwd: root });
    const text = await readFile(join(output, 'index.md'), 'utf8');
    expect(text.indexOf('## Earlier message')).toBeLessThan(text.indexOf('## Later message'));
  });

  it('refuses overwrite unless force is enabled and replaces only the output directory', async () => {
    const root = await tempRoot();
    const input = await makePost(root, 'one', { title: 'One' });
    const output = join(root, 'combined');
    await mkdir(output);
    await writeFile(join(output, 'old.txt'), 'old');

    await expect(consolidatePosts({ inputDirs: [input], outputDir: output, cwd: root })).rejects.toThrow('Pass --force');
    await consolidatePosts({ inputDirs: [input], outputDir: output, force: true, cwd: root });
    await expect(readFile(join(output, 'old.txt'))).rejects.toThrow();
    expect(await readFile(join(output, 'index.md'), 'utf8')).toContain('## One');
  });

  it('reports missing assets and unsafe output placement', async () => {
    const root = await tempRoot();
    const input = await makePost(root, 'one', { title: 'One', body: '![Missing](missing.jpg)' });
    await expect(consolidatePosts({ inputDirs: [input], outputDir: join(root, 'combined'), cwd: root })).rejects.toThrow('Missing asset');
    await expect(consolidatePosts({ inputDirs: [input], outputDir: join(input, 'combined'), cwd: root })).rejects.toThrow('inside an input');
  });
});

describe('heading normalization', () => {
  it('does not rewrite headings inside fenced code', () => {
    expect(normalizeHeadings('```md\n# Keep me\n```\n# Change me', 'Other')).toBe('```md\n# Keep me\n```\n### Change me');
  });
});

async function tempRoot() {
  const path = await mkdtemp(join(tmpdir(), 'tervels-consolidate-'));
  tempDirs.push(path);
  return path;
}

async function makePost(root, name, options = {}) {
  const dir = join(root, name);
  await mkdir(dir, { recursive: true });
  const locations = options.locations ?? [location('Example', [1, 2])];
  const lines = [
    '---',
    `title: ${JSON.stringify(options.title ?? name)}`,
    `timestamp: ${options.timestamp ?? '2026-01-01T00:00:00Z'}`,
    'locations:',
    ...locations.flatMap(item => [
      `  - name: ${JSON.stringify(item.name)}`,
      `    country: ${JSON.stringify(item.country)}`,
      `    city: ${JSON.stringify(item.city)}`,
      `    city_slug: ${JSON.stringify(item.city_slug)}`,
      `    gps: ${JSON.stringify(item.gps)}`,
      '    gps_source: manual',
    ]),
    `events: ${JSON.stringify(options.events ?? [])}`,
    ...(options.youtube ? [
      'youtube:',
      ...(options.youtube.items?.length ? [
        '  items:',
        ...options.youtube.items.flatMap(item => [
          `    - kind: ${item.kind}`,
          `      id: ${JSON.stringify(item.id)}`,
          ...(item.start == null ? [] : [`      start: ${item.start}`]),
        ]),
      ] : []),
      ...(options.youtube.cover ? [`  cover: ${JSON.stringify(options.youtube.cover)}`] : []),
    ] : []),
    `tags: ${JSON.stringify(options.tags ?? [])}`,
    `draft: ${options.draft ?? false}`,
    ...(options.messageId == null ? [] : ['source:', '  kind: telegram', `  message_id: ${options.messageId}`]),
    '---',
    '',
    options.body ?? 'Body.',
    '',
  ];
  await writeFile(join(dir, 'index.md'), lines.join('\n'));
  return dir;
}

function location(name, gps) {
  return { name, country: 'Exampleland', city: 'Example City', city_slug: 'example-city', gps };
}
