const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const PLAYLIST_ID = /^[A-Za-z0-9_-]{12,}$/;

export function parseYouTubeTime(value) {
  if (value == null || value === '') return undefined;
  if (/^\d+$/.test(String(value))) return Number(value);
  const match = String(value).match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return undefined;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

export function parseYouTubeUrl(raw) {
  if (!raw) return null;
  let value = String(raw).trim();
  if (value.startsWith('<') && value.endsWith('>')) value = value.slice(1, -1);
  let url;
  try { url = new URL(value); } catch { return null; }
  const host = url.hostname.toLowerCase().replace(/^(www\.|m\.)/, '');
  if (!['youtube.com', 'youtube-nocookie.com', 'youtu.be'].includes(host)) return null;

  if (host === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    if (!VIDEO_ID.test(id ?? '')) return null;
    return { kind: 'video', id, start: parseYouTubeTime(url.searchParams.get('t') ?? url.searchParams.get('start')) };
  }

  const parts = url.pathname.split('/').filter(Boolean);
  let id = url.searchParams.get('v');
  if (['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1];
  if (VIDEO_ID.test(id ?? '')) {
    return { kind: 'video', id, start: parseYouTubeTime(url.searchParams.get('t') ?? url.searchParams.get('start')) };
  }

  const playlistId = url.searchParams.get('list');
  if (PLAYLIST_ID.test(playlistId ?? '')) return { kind: 'playlist', id: playlistId };
  return null;
}

export function youtubeItemKey(item) {
  return item.kind === 'video'
    ? `video:${item.id}:${item.start ?? 0}`
    : `playlist:${item.id}`;
}

export function youtubeEmbedUrl(item) {
  if (item.kind === 'playlist') {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(item.id)}`;
  }
  const params = item.start ? `?start=${item.start}` : '';
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.id)}${params}`;
}

export function youtubeWatchUrl(item) {
  if (item.kind === 'playlist') return `https://www.youtube.com/playlist?list=${encodeURIComponent(item.id)}`;
  const start = item.start ? `&t=${item.start}s` : '';
  return `https://www.youtube.com/watch?v=${encodeURIComponent(item.id)}${start}`;
}

export function youtubeThumbnailUrl(videoId) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

export function standaloneYouTubeItems(markdown) {
  const out = [];
  for (const line of String(markdown ?? '').replace(/\r\n/g, '\n').split('\n')) {
    const item = parseYouTubeUrl(line.trim());
    if (item) out.push(item);
  }
  return out;
}

export const youtubeIdPatterns = { video: VIDEO_ID, playlist: PLAYLIST_ID };
