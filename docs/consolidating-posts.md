# Consolidating Markdown posts

Use the consolidator to combine one or more directories of Markdown posts into a single schema-valid post directory. Source files are never changed.

```powershell
npm run posts:consolidate -- `
  --output src/content/posts/2026/combined-trip `
  --title "Combined Trip" `
  path/to/post-directory-1 `
  path/to/post-directory-2
```

The script recursively discovers `.md` files, orders them by their canonical `timestamp`, merges and deduplicates their locations, and places each body beneath an `h2` section. It copies referenced local images and attachments into namespaced `assets` directories and rewrites their links. Links to other Markdown or HTML pages remain unchanged.

The output timestamp defaults to the earliest source timestamp. Override it with `--timestamp <ISO value>`. Tags and experiences (events, museums, and trails) are combined in first-seen order, and the output is a draft if any source post is a draft. Legacy `events` arrays are converted to event experiences. Per-post `source` provenance is represented by `consolidated-from` comments instead of being incorrectly applied to the combined post.

Posts with equal timestamps use Telegram `source.message_id` as a chronological tie-breaker. For archives whose day assignment is being corrected while consolidating, use `--sort message-id` to order every selected post by its Telegram sequence before falling back to timestamp and path.

Preview without writing:

```powershell
npm run posts:consolidate -- --dry-run --output path/to/output path/to/input
```

The command refuses to write when the output directory exists. Pass `--force` to replace that exact directory after the complete result has been staged successfully. The output cannot contain an input directory or be nested inside one.
