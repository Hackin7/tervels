#!/usr/bin/env node

const queries = process.argv.slice(2);
if (!queries.length) {
  console.error('Usage: node scripts/geocode-pois.mjs "Place, City, Country" [...]');
  process.exit(1);
}

const out = [];
for (const query of queries) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=3&addressdetails=1&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, { headers: { 'User-Agent': 'tervels-location-research/0.1' } });
  if (!response.ok) throw new Error(`Nominatim ${response.status}: ${query}`);
  const results = await response.json();
  out.push({
    query,
    results: results.map(result => ({
      name: result.display_name,
      gps: [Number(result.lat), Number(result.lon)],
      type: result.type,
      category: result.category,
    })),
  });
  await new Promise(resolve => setTimeout(resolve, 1100));
}
console.log(JSON.stringify(out, null, 2));
