import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const channel = 'https://www.youtube.com/@tervel5';
const videosData = fetchFlat(`${channel}/videos`);
const playlistsData = fetchFlat(`${channel}/playlists`);
const playlistMembership = new Map();
const playlists = [];

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
}

const videos = (videosData.entries ?? [])
  .filter(video => video.id)
  .map(video => ({
    id: video.id,
    title: video.title ?? video.id,
    playlist_ids: playlistMembership.get(video.id) ?? [],
  }));

const output = { channel, videos, playlists };
const outputPath = resolve(repo, 'src/data/youtube.json');
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`Wrote ${videos.length} videos and ${playlists.length} playlists to ${outputPath}`);

function fetchFlat(url) {
  const executable = process.env.YT_DLP || 'yt-dlp';
  const result = spawnSync(executable, [
    '--no-warnings',
    '--flat-playlist',
    '--dump-single-json',
    url,
  ], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || `yt-dlp exited with ${result.status}`);
  return JSON.parse(result.stdout);
}
