# Content Structure Spec

Travel notes are stored as Markdown under:

```text
src/content/posts/<year>/<trip>/<note>/index.md
```

The path controls trip grouping only. Article chronology and place membership
come from frontmatter.

## Article metadata

```yaml
---
title: "Example note"
timestamp: 2025-07-27T14:30:00+09:00
locations:
  - name: "Fushimi Inari Taisha"
    country: "Japan"
    city: "Kyoto"
    city_slug: "kyoto"
    gps: [34.9671402, 135.7726717]
    gps_source: openstreetmap
    gps_granularity: building
    gps_confidence: high
    gps_query: "Fushimi Inari Taisha, Kyoto, Japan"
  - name: "Kyoto Station"
    country: "Japan"
    city: "Kyoto"
    city_slug: "kyoto"
    gps: [34.985849, 135.7587667]
    gps_source: openstreetmap
    gps_granularity: building
    gps_confidence: high
experiences:
  - kind: museum
    name: "Kyoto Railway Museum"
  - kind: trail
    name: "Fushimi Inari summit trail"
  - kind: event
    slug: "example-event-2025"
youtube:
  items:
    - kind: video
      id: "dQw4w9WgXcQ"
      start: 42
    - kind: playlist
      id: "PL123456789012"
  cover: "dQw4w9WgXcQ"
tags: []
draft: false
---
```

- `timestamp` is the single canonical article time. Keep the source timezone
  offset when known. Sorting, display dates, URL months, and trip/event ranges
  are derived from it.
- `locations` is an ordered, non-empty list. The first item is the primary
  location used for the article URL and breadcrumb. Every resolved item links
  the article to its place page and may create a map pin.
- `name` identifies the specific venue, landmark, route stop, or area.
- `country`, `city`, and `city_slug` support stable place navigation.
- `gps` is `[latitude, longitude]`, or `null` when unresolved. Latitude must be
  between -90 and 90 and longitude between -180 and 180.
- `gps_source` records where the values came from: `telegram`, `exif`,
  `official`, `openstreetmap`, `manual`, or `old-frontmatter`.
- `gps_granularity` is `building`, `venue`, `street`, `area`, or `city`.
- `gps_confidence` is `high`, `medium`, or `low`.
- `gps_query` records the lookup or clue used for reproducibility.
- `experiences` controls the Explore page. Museum and trail entries store the
  exact editorial label shown on post cards. Event entries reference a stable
  slug in `src/lib/events.ts`, which supplies the shared event name, year, and
  location. A post may contain multiple entries of any kind.
- `youtube.items` is the ordered video gallery for the post. Video entries use
  an 11-character YouTube ID and may include a non-negative `start` time in
  seconds. Playlist entries use the playlist ID and do not take a start time.
- `youtube.cover` uses a video thumbnail as the post and card cover. It may
  point to a gallery video or any other YouTube video. Do not set both the
  local `cover` field and `youtube.cover` on the same post.

A YouTube watch, share, Shorts, live, embed, or playlist URL on its own line in
the Markdown body is also rendered as a responsive embed. Use frontmatter when
the video belongs in the post's gallery or should supply its cover image.

Coordinate digits must be preserved from the source. Do not pad a coarse match
with zeroes: decimal places represent storage precision, while granularity and
confidence describe real-world accuracy.

## Unresolved locations

```yaml
locations:
  - name: "Unknown"
    country: "Unknown"
    city: "Unknown"
    city_slug: "unknown"
    gps: null
```

An article whose primary location is unresolved remains available through trip
and triage views but is excluded from published place views. A location with
`gps: null` does not create a map pin.

## Derived presentation

- Trip membership comes from the storage path.
- Museum, trail, and event membership comes from `experiences`.
- Country/city membership comes from every resolved `locations` entry, with an
  article listed only once per city even if it has several stops there.
- Trip and event ranges are the minimum and maximum article timestamps.
- Public article URLs use the primary location, timestamp month, and title.
- The map emits one pin per resolved location with GPS.

The deprecated `date`, `visited`, singular `location`, `coords`, and `events`
fields must not be added to article frontmatter.
