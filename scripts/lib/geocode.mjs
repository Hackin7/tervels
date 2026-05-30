import { readFile, writeFile } from 'node:fs/promises';

const DEFAULT_USER_AGENT = 'tervels-importer/0.1 (https://github.com/yourname/tervels)';
const NOMINATIM = 'https://nominatim.openstreetmap.org/reverse';
const RATE_MS = 1100;

export class Geocoder {
  constructor({ cachePath, userAgent = DEFAULT_USER_AGENT, fetcher = fetch, sleeper = sleep } = {}) {
    this.cachePath = cachePath;
    this.userAgent = userAgent;
    this.fetcher = fetcher;
    this.sleeper = sleeper;
    this.cache = new Map();
    this.lastCall = 0;
  }
  async load() {
    if (!this.cachePath) return;
    try {
      const txt = await readFile(this.cachePath, 'utf8');
      for (const [k, v] of Object.entries(JSON.parse(txt))) this.cache.set(k, v);
    } catch { /* fresh */ }
  }
  async save() {
    if (!this.cachePath) return;
    await writeFile(this.cachePath, JSON.stringify(Object.fromEntries(this.cache), null, 2));
  }
  key(lat, lng) {
    return `${lat.toFixed(4)},${lng.toFixed(4)}`;
  }
  async reverse(lat, lng) {
    const k = this.key(lat, lng);
    if (this.cache.has(k)) return this.cache.get(k);
    const wait = Math.max(0, RATE_MS - (Date.now() - this.lastCall));
    if (wait) await this.sleeper(wait);
    this.lastCall = Date.now();
    const url = `${NOMINATIM}?lat=${lat}&lon=${lng}&format=json&accept-language=en&zoom=10`;
    const res = await this.fetcher(url, { headers: { 'User-Agent': this.userAgent } });
    if (!res.ok) throw new Error(`Nominatim ${res.status}`);
    const json = await res.json();
    const a = json.address ?? {};
    const result = {
      country: (a.country_code ?? '').toLowerCase() || null,
      city: a.city ?? a.town ?? a.village ?? a.municipality ?? null,
    };
    this.cache.set(k, result);
    return result;
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
