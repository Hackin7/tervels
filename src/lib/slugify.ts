const STOP = new Set([
  'the','a','an','and','or','but','of','in','on','at','to','for',
  'with','from','this','that','it','is','was','are','were','be',
  'i','we','my','our','you','your','they','their',
]);

export function slugify(text: string, max = 4): string {
  return text
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w && !STOP.has(w))
    .slice(0, max)
    .join('-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function postSlug(date: Date, keyword: string): string {
  const ym = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
  const kw = slugify(keyword) || 'untitled';
  return `${ym}-${kw}`;
}
