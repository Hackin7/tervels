# tervels

A static travel blog with map view + country→city listing. Built with Astro, Leaflet, and a Telegram-export importer.

Spec: `C:\Users\zunmun\Documents\Stuff\Workspace\2026\ai_experiments\proj_ideas\specs\07-2-travel-blog.md`
Plan: `C:\Users\zunmun\Documents\Stuff\Workspace\2026\ai_experiments\proj_ideas\specs\plans\2026-05-06-tervels.md`

## Running locally

```sh
npm install
npm run dev
```

Visit http://localhost:4321/tervels/.

## Authoring

### Folder structure vs URLs

**Storage** is by year/trip: `src/content/posts/<year>/<trip>/<post>/`.
**Display** on the site is by country/city/place — derived from each post's frontmatter, not from the folder.

So a post at `src/content/posts/2025/spring-japan/kyoto-temples/index.md` whose frontmatter has `location.country: "JP"` and `location.city_slug: "kyoto"` shows up under **Places → Japan → Kyoto** on the site, with URL `/posts/jp/kyoto/2025-04-<title-slug>/`.

The `trip` folder is purely for your organization — it's not a browse axis on the site.

### Hand-add a post

1. Create `src/content/posts/<year>/<trip>/<post-folder>/`. Example: `src/content/posts/2025/spring-japan/arashiyama/`.
2. Drop photos into `images/`.
3. `npm run optimize -- src/content/posts/<year>/<trip>/<post-folder>/images`
4. Write `index.md` (see existing posts for frontmatter shape — `location.country` and `location.city_slug` drive the display).
5. Preview with `npm run dev`.

### Import from Telegram

```sh
# Telegram Desktop → channel → ⋯ → Export chat history → JSON or HTML, photos on.
npm run import -- /path/to/telegram-export --trip spring-japan
npm run import -- /path/to/telegram-export --trip italy --year 2024
npm run import -- /path/to/telegram-export --since 2025-04-01 --dry-run
npm run import -- /path/to/telegram-export --month 2024-12 --trip italy
```

The importer accepts **either format**: JSON (`result.json`) or HTML (`messages.html`, `messages2.html`, …). If both are present in the export folder, JSON wins (it carries more structured data — albums via `grouped_id`, location shares, etc.). HTML is parsed via DOM walk; albums are detected by multiple `<a class="photo_wrap">` siblings inside one message.

CLI flags:

| Flag | Default | Notes |
|---|---|---|
| `--trip <slug>` | `_unsorted` | Trip folder name. Posts land in `<year>/<trip>/<post>/`. Year is auto-derived from each post's effective date. |
| `--since <date>` | none | Skip messages before this date (inclusive). ISO-8601 or YYYY-MM. |
| `--until <date>` | none | Skip messages after this date (inclusive). |
| `--year <YYYY>` | none | Convenience for that year. |
| `--month <YYYY-MM>` | none | Convenience for that calendar month. |
| `--date-source <mode>` | `capture` | `capture` (EXIF first, Telegram fallback), `telegram`, `exif-strict`. |
| `--photos-per-post <N>` | `1` | How many photos to keep per post (cover only by default). Pass `0` for text-only (no photos). |
| `--all-photos` | off | Keep every photo (no cap). Overrides `--photos-per-post`. |
| `--merge-window <minutes>` | 30 | Merge window for consecutive same-author messages. |
| `--dry-run` | off | Don't write any files; just preview. |
| `--out <path>` | `src/content/posts` | Override output root. |

Date filtering and post frontmatter dates default to **EXIF capture date**, falling back to the Telegram message date when no EXIF is present.

Posts whose location can't be geo-resolved still get a folder under `<year>/<trip>/`, but their frontmatter is filled with placeholders (`country: XX`, `city_slug: unknown`). The site filters those out of all listings until you fill in real values. Run with `--dry-run` first to see how many will land unresolved.

The script is **idempotent** — re-running over the same export skips already-imported posts (matched by `source.message_id`).

## Tests

```sh
npm test
```

Covers slugify, post aggregations, Telegram message grouping, effective-date resolution, and the geocoder cache.

## Deploying to GitHub Pages

1. Push the repo to GitHub.
2. Settings → Pages → Source: GitHub Actions.
3. Update `site` in `astro.config.mjs` to `https://<your-user>.github.io`.
4. (Optional) For a custom domain, create `public/CNAME` with the domain and configure DNS; remove `base` from `astro.config.mjs` if using a root domain.
5. Push to `main` — `.github/workflows/deploy.yml` builds and deploys.

## Repo size note

GH Pages has a 1 GB soft limit. Photos optimized by the Telegram importer typically land at 250–500 KB each, comfortably allowing several hundred posts. If you exceed that, options include moving image hosting to GitHub Releases, Cloudflare R2 (free tier 10 GB), or migrating to Cloudflare Pages.
