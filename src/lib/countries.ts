const TABLE: Record<string, { name: string; flag: string }> = {
  vn: { name: 'Vietnam', flag: '🇻🇳' },
  jp: { name: 'Japan', flag: '🇯🇵' },
  it: { name: 'Italy', flag: '🇮🇹' },
  sg: { name: 'Singapore', flag: '🇸🇬' },
  us: { name: 'United States', flag: '🇺🇸' },
  fr: { name: 'France', flag: '🇫🇷' },
  de: { name: 'Germany', flag: '🇩🇪' },
  gb: { name: 'United Kingdom', flag: '🇬🇧' },
  kr: { name: 'South Korea', flag: '🇰🇷' },
  th: { name: 'Thailand', flag: '🇹🇭' },
  my: { name: 'Malaysia', flag: '🇲🇾' },
  cn: { name: 'China', flag: '🇨🇳' },
  ch: { name: 'Switzerland', flag: '🇨🇭' },
  at: { name: 'Austria', flag: '🇦🇹' },
  pl: { name: 'Poland', flag: '🇵🇱' },
  es: { name: 'Spain', flag: '🇪🇸' },
  cz: { name: 'Czechia', flag: '🇨🇿' },
  ae: { name: 'United Arab Emirates', flag: '🇦🇪' },
  dk: { name: 'Denmark', flag: '🇩🇰' },
  se: { name: 'Sweden', flag: '🇸🇪' },
  va: { name: 'Vatican City', flag: '🇻🇦' },
};

const NAME_TO_KEY = new Map(Object.entries(TABLE).flatMap(([key, value]) => [
  [key, key] as const,
  [slug(value.name), key] as const,
]));
NAME_TO_KEY.set('czech', 'cz');
NAME_TO_KEY.set('czech-republic', 'cz');

function keyFor(codeOrName: string): string {
  return NAME_TO_KEY.get(slug(codeOrName)) ?? '';
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function countryName(codeOrName: string): string {
  return TABLE[keyFor(codeOrName)]?.name ?? codeOrName;
}

export function countryFlag(codeOrName: string): string {
  return TABLE[keyFor(codeOrName)]?.flag ?? '🏳️';
}
