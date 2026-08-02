# Website UX Structure Spec

This spec describes the current website experience for `tervels`: what page
types exist, how users move through them, and which content appears in each
view. It complements `docs/content-spec.md`, which defines the Markdown storage
and metadata model.

## Overview

`tervels` is a static Astro travel log. The site is organized around several
ways to browse the same post collection:

- A reverse-chronological home feed with a map preview.
- Geographic browsing by country and city.
- Trip browsing from the storage folder structure.
- Museum, trail, and event browsing from post frontmatter experiences.
- A full map for coordinate-based exploration.
- A triage workflow for posts whose location metadata is incomplete.

Individual posts are the destination for all browse paths. Their public URLs are
generated from the primary resolved location, timestamp, and title rather than from the
storage folder path.

## Global UX Shell

All pages use the shared base layout. The page shell includes:

- A simple top navigation bar with links to `tervels`, `map`, `places`, `trips`,
  and `explore`.
- A centered main content container with a maximum width suited to reading and
  card grids.
- A quiet visual system: white cards, light borders, muted metadata text, and a
  single accent link color.
- Responsive card grids using auto-filled columns with a minimum card width.

The site is primarily a browse-and-read experience. Most interaction happens
through links, map panning/zooming, map marker popups, and post cards.

## Page Types

### Home

Route: `/`

The home page is the broad entry point. It shows:

- A Leaflet map preview using the same map data as the full map page.
- The site title and total count of published posts.
- A grid of post cards for all published posts, sorted newest first.

Published posts are non-draft posts with resolved location metadata. Unresolved
posts do not appear on the home feed.

### Post Detail

Route: `/posts/<country>/<city>/<YYYY-MM-title>/`

Post pages render a single Markdown note inside the post layout. They show:

- A context line above the title.
- The post title.
- The post date derived from `timestamp` and all resolved location names.
- An optional cover image.
- The rendered Markdown article body.
- Responsive YouTube embeds for standalone video links in the article.
- An optional ordered video/playlist gallery after the article.

A post may use either a local image or a YouTube thumbnail as its cover. The
same YouTube cover treatment is used on post cards. Gallery entries already
embedded as standalone links in the body are omitted from the gallery to avoid
showing the same video twice.

For resolved posts, the context line acts as a breadcrumb:

```text
places -> country -> city
```

For unresolved posts, the context line points to triage and displays a
`needs location` badge. The page also shows a publishing note explaining which
frontmatter fields need to be fixed.

### Places Index

Route: `/places`

The places index is the top-level geographic browse page. It lists countries
that have published posts, sorted by country display name. Each country row
shows:

- A flag/name link to the country page.
- The number of posts in that country.

Unresolved posts are excluded because places are built only from published
posts.

### Country Page

Route: `/places/<country>/`

Country pages list the cities in a selected country. They show:

- A back link to all places.
- The country flag/name as the page heading.
- A list of city links with post counts.

Cities are derived from every entry in post `locations` metadata and sorted alphabetically by
their city slug.

### City Page

Route: `/places/<country>/<city>/`

City pages show all published posts for one city. They include:

- A breadcrumb back to `places` and the country page.
- The city name as the page heading.
- A grid of post cards.

This is the deepest geographic browse page before opening an individual post.

### Trips Index

Route: `/trips`

The trips index groups non-draft posts by storage folder:

```text
src/content/posts/<year>/<trip>/<note>/index.md
```

Each trip card shows:

- A generated display name from the trip slug.
- The trip year.
- The number of posts.
- The timestamp range derived from the trip's articles.
- Country flags and city chips when available.
- A `need triage` badge when any posts in the trip have unresolved location.

Trips are sorted by most recent trip end date.

### Trip Detail

Route: `/trips/<year>/<trip>/`

Trip detail pages show one trip group. They include:

- A back link to all trips.
- The trip display name.
- Year, date range, post count, and unresolved-location count.
- Country and city chips when resolved metadata exists.
- A grid of trip posts sorted oldest first.

Trip pages include non-draft posts even when their location is unresolved, so
they can act as a working browse view while metadata is being cleaned up.

### Explore

Route: `/explore`

Explore contains three anchored sections in order: Museums, Trails, and Events.
Museum and trail sections show published posts newest first. Each card includes
chips naming the matching museum or trail from the post's `experiences`
frontmatter.

The Events section groups non-draft posts by event experience slug. Each group
shows its catalog name, year, date range, optional location, note count, and a
grid of post cards labeled with the event name. Events remain sorted by most
recent event metadata/date and do not have detail routes.

The legacy `/events` route redirects to `/explore#events`.

### Map

Route: `/map`

The map page is the full geographic exploration view. It shows:

- A short instruction line.
- A large Leaflet map with OpenStreetMap tiles.
- Clustered markers for every published article location that has GPS.

Clicking a marker opens a popup with the post title, location name, timestamp date, and a link to
read the post.

### Triage

Route: `/triage`

The triage page is an internal cleanup view for non-draft posts whose location
is unresolved. It shows:

- The number of posts needing location metadata.
- Instructions for setting country, city, city slug, and coordinates.
- Posts grouped by `year/trip` for easier source-file lookup.
- Each unresolved post title, date, and content id.

Triage is linked from the global navigation and from unresolved post pages.

### Map Data API

Route: `/api/map-data.json`

This is supporting infrastructure for the map views rather than a user-facing
page. It returns JSON pins for published posts that have coordinates. Each pin
includes the post slug, title, country, city, location name, timestamp, and GPS.

## Navigation And User Flows

The primary user flows are:

- Home feed: `home -> post card -> post`.
- Geographic browse: `places -> country -> city -> post`.
- Trip browse: `trips -> trip -> post`.
- Explore browse: `explore -> museum, trail, or event section -> post`.
- Map exploration: `home map` or `map -> marker popup -> post`.
- Cleanup flow: `triage -> unresolved post/source id -> edit Markdown metadata`.

The same post can appear in several views depending on its metadata. For
example, a resolved event post with coordinates can appear on the home feed, in
places, in its trip, in Explore, and on the map.

## Visibility And Data Rules

The current implementation uses these content sets:

- Published posts: non-draft posts with resolved location metadata. These appear
  on home, places, city pages, and the map data source.
- Navigable posts: all non-draft posts, including unresolved posts. These appear
  in trips, Explore event groups, and generated post routes. Museum and trail
  sections use the published set.
- Unresolved posts: non-draft posts whose country or city slug is still a
  placeholder. These appear in triage and can show `needs triage` badges.
- Map pins: published posts with non-null coordinates.

A post without coordinates can still appear in non-map published views if its
country and city metadata are resolved. A post with unresolved location metadata
is kept out of public geographic listings until the metadata is corrected.

## Current UX Notes

- Places are metadata-driven; trips are folder-driven. This is intentional and
  lets the storage structure differ from public browsing.
- Post cards are the shared preview unit across home, city, trip, and Explore
  views. Explore cards can add typed experience chips.
- The map is embedded on the home page at a shorter height and has a dedicated
  taller page at `/map`.
- Museums, trails, and events are consolidated on Explore; none has a separate
  detail route.
- Triage is exposed in the main nav because metadata cleanup is part of the
  current operating workflow.
