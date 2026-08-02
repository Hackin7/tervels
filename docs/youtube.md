# YouTube workflow

The site can embed YouTube links in article text, show several videos or
playlists in one post, and use a video thumbnail as the cover. The content
schema is documented in `docs/content-spec.md`.

## Add videos to a post

Put a URL on its own line for an embed at that point in the article:

```md
https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s
```

Use frontmatter for an ordered gallery and optional YouTube cover:

```yaml
youtube:
  items:
    - kind: video
      id: "dQw4w9WgXcQ"
      start: 42
    - kind: video
      id: "M7lc1UVf-VE"
    - kind: playlist
      id: "PL123456789012"
  cover: "dQw4w9WgXcQ"
```

The cover ID controls only the thumbnail. Add the same ID to `items` if the
video should also appear in the gallery. A post cannot have both `cover` (a
local image) and `youtube.cover`.

## Sync Tervel's channel

The checked-in catalogue lets the site display channel titles and lets the
matching report compare uploads with posts:

```sh
npm run youtube:sync
npm run youtube:report
```

`youtube:sync` reads `https://www.youtube.com/@tervel5` with `yt-dlp` and writes
`src/data/youtube.json`. It records channel videos, playlists, and playlist
membership. Run it after new uploads or playlist changes.

`youtube:report` writes `docs/youtube-link-report.md`. It separates videos that
are already linked, strong title/location matches that are safe to review, and
unassigned uploads. Apply only associations confirmed by the post content;
generic city and travel clips can plausibly belong to more than one note.
