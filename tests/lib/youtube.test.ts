import { describe, expect, it } from 'vitest';
import {
  parseYouTubeTime,
  parseYouTubeUrl,
  standaloneYouTubeItems,
  youtubeEmbedUrl,
  youtubeItemKey,
  youtubeWatchUrl,
} from '../../src/lib/youtube-core.mjs';

describe('YouTube URL helpers', () => {
  it('parses video URL variants and start times', () => {
    expect(parseYouTubeUrl('https://youtu.be/dQw4w9WgXcQ?t=1m30s')).toEqual({
      kind: 'video', id: 'dQw4w9WgXcQ', start: 90,
    });
    expect(parseYouTubeUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toEqual({
      kind: 'video', id: 'dQw4w9WgXcQ', start: undefined,
    });
    expect(parseYouTubeUrl('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?start=42')).toEqual({
      kind: 'video', id: 'dQw4w9WgXcQ', start: 42,
    });
  });

  it('parses playlists and rejects non-YouTube URLs', () => {
    expect(parseYouTubeUrl('https://www.youtube.com/playlist?list=PL123456789012')).toEqual({
      kind: 'playlist', id: 'PL123456789012',
    });
    expect(parseYouTubeUrl('https://example.com/watch?v=dQw4w9WgXcQ')).toBeNull();
  });

  it('creates privacy-enhanced embed and public watch URLs', () => {
    const item = { kind: 'video' as const, id: 'dQw4w9WgXcQ', start: 30 };
    expect(youtubeItemKey(item)).toBe('video:dQw4w9WgXcQ:30');
    expect(youtubeEmbedUrl(item)).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?start=30');
    expect(youtubeWatchUrl(item)).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s');
  });

  it('finds only standalone Markdown video lines', () => {
    expect(standaloneYouTubeItems('Intro\n\nhttps://youtu.be/dQw4w9WgXcQ\n\n[linked](https://youtu.be/dQw4w9WgXcQ)')).toEqual([
      { kind: 'video', id: 'dQw4w9WgXcQ', start: undefined },
    ]);
    expect(parseYouTubeTime('2h3m4s')).toBe(7384);
  });
});
