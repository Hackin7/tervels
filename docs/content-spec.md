# Content Structure Spec

This project stores travel notes as Markdown content and presents them through
static Astro pages. The storage structure is organized by trip, while the public
views are derived from note metadata.

Images are intentionally out of scope for this spec. They may be stored in a
separate repository in the future and should not define the local content model.

## Storage Structure

Each note is stored at:

```text
src/content/posts/<year>/<trip>/<note>/index.md
```

The path parts mean:

- `<year>`: the calendar year for the note or trip.
- `<trip>`: an organizational grouping for related notes.
- `<note>`: the individual note folder.
- `index.md`: the Markdown note content and frontmatter metadata.

The folder path is used for trip grouping. It is not the source of truth for
country, city, or map placement.

## Note Metadata

Each note should include enough metadata to support chronological views, trip
views, place views, triage, and map display.

Recommended frontmatter:

```yaml
---
title: "Example note"
timestamp: 2025-07-27T14:30:00Z
date: 2025-07-27
visited:
  start: 2025-07-27
  end: 2025-07-27
location:
  country: "Japan"
  city: "Kyoto"
  city_slug: "kyoto"
  location_or_event: "Fushimi Inari visit"
  coords: [34.9671, 135.7727]
  coord_source: geocoded-venue
  coord_granularity: venue
  coord_confidence: high
  coord_query: "Fushimi Inari, Kyoto, Japan"
events: []
tags: []
draft: false
---
```

Field meanings:

- `title`: human-readable note title.
- `timestamp`: full date and time for when the note happened or was captured.
- `date`: date-only compatibility field used by current pages.
- `visited.start` and `visited.end`: date range used for trip summaries.
- `location.country`: full country name, such as `Japan`.
- `location.city`: human-readable city name.
- `location.city_slug`: URL-safe city identifier.
- `location.location_or_event`: specific place, venue, event, activity, or
  contextual label for the note.
- `location.coords`: `[latitude, longitude]` when known, otherwise `null`.
- `location.coord_source`: how coordinates were produced. Geocoded values
  should distinguish building, venue, street, area, and city-level matches.
- `location.coord_granularity`: precision label for the coordinate. Prefer
  `building` whenever the note content identifies a specific building.
- `location.coord_confidence`: confidence in the coordinate assignment.
- `location.coord_query`: query or clue used to resolve the coordinate.
- `events`: stable event slugs this note belongs to, such as
  `defcon33-2025` or `lakectf-2026`. Leave as an empty array when the note is
  not part of an event.
- `tags`: optional broad labels for filtering or future views.
- `draft`: whether the note should be hidden from public published views.

When coordinates are unknown, keep the field present with a null value:

```yaml
location:
  country: "Japan"
  city: "Kyoto"
  city_slug: "kyoto"
  location_or_event: "Dinner near station"
  coords: null
```

When the location itself is unresolved, use triage placeholders:

```yaml
location:
  country: "Unknown"
  city: "Unknown"
  city_slug: "unknown"
  location_or_event: "Unknown"
  coords: null
```

## Presentation Rules

Trip views are derived from the storage path:

```text
src/content/posts/<year>/<trip>/<note>/index.md
```

Place views are derived from frontmatter:

- `location.country`
- `location.city`
- `location.city_slug`

Event views are derived from frontmatter:

- `events`

Event slugs should include the year, so repeat attendance can be represented
without ambiguity. Display names, years, and optional locations are resolved
from the site event catalog.

Individual note URLs are generated from the note's country, city, date, and
title. The trip folder is not part of the public note URL.

Map pins require real coordinates. Notes with `location.coords: null` can still
appear in trip and place views, but they should not appear on the map.

Notes with unresolved country or city metadata should remain in triage-only
views until the metadata is corrected.

## Current Compatibility

The current Astro implementation already supports the year/trip/note storage
layout, country and city based place views, trip grouping from folder paths, and
map pins from coordinates.

The current implementation uses `date` as the primary date field. This spec
introduces `timestamp` as the intended full date-time field while keeping `date`
for compatibility with existing pages.

The current implementation supports optional coordinates. This spec standardizes
unknown coordinates as `coords: null`.

The current implementation does not yet require `location.location_or_event`.
Future schema and importer updates should add it as part of the note metadata.
