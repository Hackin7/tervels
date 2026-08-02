import catalog from '../data/youtube.json';

export interface YouTubeVideoItem { kind: 'video'; id: string; start?: number; }
export interface YouTubePlaylistItem { kind: 'playlist'; id: string; }
export type YouTubeItem = YouTubeVideoItem | YouTubePlaylistItem;

const videos = new Map(catalog.videos.map(video => [video.id, video]));
const playlists = new Map(catalog.playlists.map(playlist => [playlist.id, playlist]));

export function youtubeItemTitle(item: YouTubeItem): string {
  if (item.kind === 'playlist') return playlists.get(item.id)?.title ?? 'YouTube playlist';
  return videos.get(item.id)?.title ?? 'YouTube video';
}

export function youtubeCatalogHas(item: YouTubeItem): boolean {
  return item.kind === 'playlist' ? playlists.has(item.id) : videos.has(item.id);
}
