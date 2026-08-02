#!/usr/bin/env node
import { consolidatePosts } from './lib/post-consolidation.mjs';

const HELP = `Consolidate directories of Markdown posts into one post.

Usage:
  node scripts/consolidate-posts.mjs --output <directory> [options] <input-directory...>

Options:
  --output, -o <directory>  Output post directory (required; writes index.md)
  --title, -t <title>       Consolidated title (defaults to output directory name)
  --timestamp <ISO value>  Override the earliest source timestamp
  --sort <mode>            timestamp (default) or message-id
  --dry-run                 Validate and print a summary without writing
  --force                   Replace the exact output directory if it exists
  --help, -h                Show this help
`;

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(HELP);
    process.exit(0);
  }
  const result = await consolidatePosts(options);
  console.log(`${result.dryRun ? 'Would consolidate' : 'Consolidated'} ${result.posts} post(s).`);
  console.log(`Locations: ${result.locations}; copied assets: ${result.assets}.`);
  console.log(`Timestamp: ${result.timestamp}`);
  console.log(`Output: ${result.outputFile}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}

export function parseArgs(args) {
  const options = { inputDirs: [], force: false, dryRun: false, help: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--force') options.force = true;
    else if (arg === '--output' || arg === '-o') options.outputDir = nextValue(args, ++index, arg);
    else if (arg === '--title' || arg === '-t') options.title = nextValue(args, ++index, arg);
    else if (arg === '--timestamp') options.timestamp = nextValue(args, ++index, arg);
    else if (arg === '--sort') options.sort = nextValue(args, ++index, arg);
    else if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}`);
    else options.inputDirs.push(arg);
  }
  return options;
}

function nextValue(args, index, option) {
  const value = args[index];
  if (value == null || value.startsWith('-')) throw new Error(`Missing value for ${option}`);
  return value;
}
