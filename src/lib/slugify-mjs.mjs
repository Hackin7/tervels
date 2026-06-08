const STOP = new Set(['the','a','an','and','or','but','of','in','on','at','to','for','with','from','this','that','it','is','was','are','were','be','i','we','my','our','you','your','they','their']);
export function slugify(text, max = 4) {
  return (text || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(w => w && !STOP.has(w)).slice(0, max)
    .join('-').replace(/-+/g,'-').replace(/^-|-$/g,'');
}
export function postSlug(date, keyword) {
  const ymd = `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
  const kw = slugify(keyword) || 'untitled';
  return `${ymd}-${kw}`;
}
