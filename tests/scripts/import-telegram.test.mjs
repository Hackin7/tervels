import { describe, it, expect } from 'vitest';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const repoRoot = resolve(import.meta.dirname, '../..');
const importer = join(repoRoot, 'scripts/import-telegram.mjs');

describe('import-telegram CLI', () => {
  it('imports coordinates without reverse geocoding when --no-geocode is set', async () => {
    const root = await makeTempDir();
    const exportDir = join(root, 'export');
    const outDir = join(root, 'posts');
    const fetchBlocker = join(root, 'block-fetch.mjs');
    const fetchMarker = join(root, 'fetch-called');
    await mkdir(exportDir, { recursive: true });
    await writeFile(join(exportDir, 'result.json'), JSON.stringify({
      messages: [{
        id: 42,
        type: 'message',
        date: '2026-06-08T10:00:00',
        from_id: 'user1',
        text: 'Test place #local',
        location_information: { latitude: 52.52, longitude: 13.405 },
      }],
    }));
    await writeFile(fetchBlocker, [
      "import { writeFile } from 'node:fs/promises';",
      `const marker = ${JSON.stringify(fetchMarker)};`,
      "globalThis.fetch = async () => { await writeFile(marker, 'called'); throw new Error('fetch should not be called'); };",
      '',
    ].join('\n'));

    const { stdout } = await execFileAsync(process.execPath, [
      '--import', pathToFileURL(fetchBlocker).href,
      importer,
      exportDir,
      '--out', outDir,
      '--no-geocode',
    ], { cwd: root });

    expect(stdout).toContain('Posts imported: 1');
    expect(existsSync(fetchMarker)).toBe(false);
    const postPath = await findIndexMd(join(outDir, '2026/_unsorted'));
    const post = await readFile(postPath, 'utf8');
    expect(post).toContain('  coords: [52.52, 13.405]');
    expect(post).toContain('  country: "XX"');
    expect(post).toContain('  city: "Unknown"');
  });

  it('uses year-month-day in generated post folder names', async () => {
    const root = await makeTempDir();
    const exportDir = join(root, 'export');
    const outDir = join(root, 'posts');
    await mkdir(exportDir, { recursive: true });
    await writeFile(join(exportDir, 'result.json'), JSON.stringify({
      messages: [{
        id: 46,
        type: 'message',
        date: '2026-06-08T11:00:00',
        from_id: 'user1',
        text: 'Day precise folder',
      }],
    }));

    await execFileAsync(process.execPath, [
      importer,
      exportDir,
      '--out', outDir,
      '--no-geocode',
    ], { cwd: root });

    const post = await readFile(join(outDir, '2026/_unsorted/2026-06-08-day-precise-folder/index.md'), 'utf8');
    expect(post).toContain('message_id: 46');
  });

  it('skips Telegram photo placeholders when media was not exported', async () => {
    const root = await makeTempDir();
    const exportDir = join(root, 'export');
    const outDir = join(root, 'posts');
    await mkdir(exportDir, { recursive: true });
    await writeFile(join(exportDir, 'result.json'), JSON.stringify({
      messages: [{
        id: 43,
        type: 'message',
        date: '2026-06-08T11:00:00',
        from_id: 'user1',
        text: 'Text only post',
        photo: '(File not included. Change data exporting settings to download.)',
      }],
    }));

    const { stdout } = await execFileAsync(process.execPath, [
      importer,
      exportDir,
      '--out', outDir,
      '--no-geocode',
    ], { cwd: root });

    expect(stdout).toContain('Posts imported: 1');
    expect(stdout).toContain('Photos written: 0');
    const postPath = await findIndexMd(join(outDir, '2026/_unsorted'));
    const post = await readFile(postPath, 'utf8');
    expect(post).toContain('Text only post');
    expect(post).not.toContain('cover:');
  });

  it('keeps distinct messages when generated slugs collide', async () => {
    const root = await makeTempDir();
    const exportDir = join(root, 'export');
    const outDir = join(root, 'posts');
    await mkdir(exportDir, { recursive: true });
    await writeFile(join(exportDir, 'result.json'), JSON.stringify({
      messages: [
        {
          id: 44,
          type: 'message',
          date: '2026-06-08T11:00:00',
          from_id: 'user1',
          text: 'Same title',
        },
        {
          id: 45,
          type: 'message',
          date: '2026-06-08T12:00:00',
          from_id: 'user1',
          text: 'Same title',
        },
      ],
    }));

    const { stdout } = await execFileAsync(process.execPath, [
      importer,
      exportDir,
      '--out', outDir,
      '--merge-window', '0',
      '--no-geocode',
    ], { cwd: root });

    expect(stdout).toContain('Posts imported: 2');
    const posts = await findAllIndexMd(join(outDir, '2026/_unsorted'));
    expect(posts).toHaveLength(2);
    const bodies = await Promise.all(posts.map(p => readFile(p, 'utf8')));
    expect(bodies.join('\n')).toContain('message_id: 44');
    expect(bodies.join('\n')).toContain('message_id: 45');
  });
});

async function makeTempDir() {
  const dir = join(tmpdir(), `tervels-import-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  await mkdir(dir, { recursive: true });
  return dir;
}

async function findIndexMd(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findIndexMd(p);
      if (nested) return nested;
    } else if (entry.name === 'index.md') {
      return p;
    }
  }
  return null;
}

async function findAllIndexMd(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...await findAllIndexMd(p));
    } else if (entry.name === 'index.md') {
      found.push(p);
    }
  }
  return found;
}
