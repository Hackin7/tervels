import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const channel = 'https://www.youtube.com/@tervel5';
const videosData = fetchFlat(`${channel}/videos`);
const shortsData = fetchOptionalTab(`${channel}/shorts`);
const playlistsData = fetchFlat(`${channel}/playlists`);
const playlistMembership = new Map();
const playlists = [];
const videoEntries = new Map();
for (const entry of [...(videosData.entries ?? []), ...(shortsData.entries ?? [])]) addVideo(entry);

for (const entry of playlistsData.entries ?? []) {
  if (!entry.id) continue;
  const details = fetchFlat(`https://www.youtube.com/playlist?list=${entry.id}`);
  const videoIds = (details.entries ?? []).map(video => video.id).filter(Boolean);
  playlists.push({ id: entry.id, title: entry.title ?? entry.id, video_ids: videoIds });
  for (const id of videoIds) {
    const ids = playlistMembership.get(id) ?? [];
    ids.push(entry.id);
    playlistMembership.set(id, ids);
  }
  for (const video of details.entries ?? []) addVideo(video);
}

const videos = [...videoEntries.values()]
  .map(video => ({
    id: video.id,
    title: video.title ?? video.id,
    playlist_ids: playlistMembership.get(video.id) ?? [],
  }));

const output = { channel, videos, playlists };
const outputPath = resolve(repo, 'src/data/youtube.json');
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`Wrote ${videos.length} videos and ${playlists.length} playlists to ${outputPath}`);

function addVideo(video) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(video.id ?? '') || !video.title) return;
  if (/^\[(?:private|deleted) video\]$/i.test(video.title)) return;
  if (!videoEntries.has(video.id)) videoEntries.set(video.id, video);
}

function fetchOptionalTab(url) {
  try { return fetchFlat(url); } catch (error) {
    if (/does not have a shorts tab/.test(error.message)) return { entries: [] };
    throw error;
  }
}

function fetchFlat(url) {
  const executable = process.env.YT_DLP || 'yt-dlp';
  const result = spawnSync(executable, [
    '--no-warnings',
    '--socket-timeout', '20',
    '--retries', '1',
    '--flat-playlist',
    '--dump-single-json',
    url,
  ], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || `yt-dlp exited with ${result.status}`);
  const data = JSON.parse(result.stdout);
  if (data.id?.startsWith('PL') && Number.isInteger(data.playlist_count) &&
      (data.entries?.length ?? 0) < data.playlist_count) {
    throw new Error(`Incomplete playlist ${data.id}: received ${data.entries?.length ?? 0} of ${data.playlist_count} entries. Update yt-dlp before syncing; the catalogue was not overwritten.`);
  }
  return data;
}
