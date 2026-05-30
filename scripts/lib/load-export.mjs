import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { parseHtmlExport } from './parse-telegram-html.mjs';

/**
 * Load a Telegram Desktop export. Auto-detects format:
 *   - JSON: result.json present (preferred — structured + reliable)
 *   - HTML: messages.html (and messages2.html, …) present
 *
 * Returns the canonical shape: { messages: [...] }
 * matching the JSON export schema, so downstream pipeline is format-agnostic.
 */
export async function loadExport(exportDir) {
  if (existsSync(join(exportDir, 'result.json'))) {
    const txt = await readFile(join(exportDir, 'result.json'), 'utf8');
    return { format: 'json', ...JSON.parse(txt) };
  }
  const entries = await readdir(exportDir);
  const htmlFiles = entries
    .filter(f => /^messages(\d+)?\.html$/.test(f))
    .sort((a, b) => htmlSeq(a) - htmlSeq(b));
  if (htmlFiles.length === 0) {
    throw new Error(`No result.json or messages*.html found in ${exportDir}`);
  }
  const allMessages = [];
  for (const f of htmlFiles) {
    const html = await readFile(join(exportDir, f), 'utf8');
    allMessages.push(...parseHtmlExport(html));
  }
  return { format: 'html', messages: allMessages };
}

function htmlSeq(name) {
  const m = name.match(/^messages(\d+)?\.html$/);
  return m && m[1] ? parseInt(m[1], 10) : 1;
}
