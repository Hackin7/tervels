import { describe, expect, it } from 'vitest';
import {
  parseYouTubeTime,
  parseYouTubeUrl,
  standaloneYouTubeItems,
  youtubeEmbedUrl,
  youtubeItemKey,
  youtubeListingVideoId,
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

  it('prefers the selected cover, then the first frontmatter video for listings', () => {
    const youtube = {
      cover: 'dQw4w9WgXcQ',
      items: [
        { kind: 'playlist', id: 'PL123456789012' },
        { kind: 'video', id: 'M7lc1UVf-VE' },
        { kind: 'video', id: '0JsNdM1kgB0' },
      ],
    };
    expect(youtubeListingVideoId(youtube, 'https://youtu.be/0JsNdM1kgB0')).toBe('dQw4w9WgXcQ');
    expect(youtubeListingVideoId({ items: youtube.items }, 'https://youtu.be/0JsNdM1kgB0')).toBe('M7lc1UVf-VE');
  });

  it('uses linked body videos across Markdown and HTML URL formats', () => {
    for (const body of [
      'https://youtu.be/dQw4w9WgXcQ',
      '[Watch](https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s)',
      '<https://www.youtube.com/shorts/dQw4w9WgXcQ>',
      '<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe>',
      'See https://youtu.be/dQw4w9WgXcQ.',
    ]) {
      expect(youtubeListingVideoId(undefined, body)).toBe('dQw4w9WgXcQ');
    }
  });

  it('does not select playlists or non-video URLs as listing thumbnails', () => {
    expect(youtubeListingVideoId(undefined, 'https://www.youtube.com/playlist?list=PL123456789012\n[Video](https://youtu.be/M7lc1UVf-VE)')).toBe('M7lc1UVf-VE');
    expect(youtubeListingVideoId({ items: [{ kind: 'playlist', id: 'PL123456789012' }] }, 'https://example.com/watch?v=dQw4w9WgXcQ')).toBeUndefined();
    expect(youtubeListingVideoId(undefined, undefined)).toBeUndefined();
  });
});
