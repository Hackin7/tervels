export interface EventMeta {
  slug: string;
  name: string;
  year: number;
  location?: string;
}

export const EVENT_CATALOG: EventMeta[] = [
  { slug: 'lakectf-2026', name: 'LakeCTF', year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'balelec-2026', name: 'Balelec', year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'polymanga-2026', name: 'PolyManga', year: 2026, location: 'Montreux, Switzerland' },
  { slug: 'insomnihack-2026', name: "Insomni'hack", year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'ph0wn-2026', name: 'ph0wn', year: 2026, location: 'Nice, France' },
  { slug: 'embedded-world-2026', name: 'Embedded World', year: 2026, location: 'Nuremberg, Germany' },
  { slug: 'cysat-2026', name: 'CySAT', year: 2026, location: 'Singapore' },
  { slug: 'maker-faire-shenzhen-2025', name: 'Maker Faire Shenzhen', year: 2025, location: 'Shenzhen, China' },
  { slug: 'kicon-asia-2025', name: 'KiCon Asia', year: 2025, location: 'Shenzhen, China' },
  { slug: 'shanghai-maker-faire-2025', name: 'Shanghai Maker Faire', year: 2025, location: 'Shanghai, China' },
  { slug: 'defcon33-2025', name: 'DEF CON 33', year: 2025, location: 'Las Vegas, United States' },
  { slug: 'black-hat-usa-2025', name: 'Black Hat USA', year: 2025, location: 'Las Vegas, United States' },
];

export const EVENTS_BY_SLUG = new Map(EVENT_CATALOG.map(event => [event.slug, event]));

export function eventMeta(slug: string): EventMeta {
  return EVENTS_BY_SLUG.get(slug) ?? {
    slug,
    name: slug, //.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    year: Number(slug.match(/-(\d{4})$/)?.[1] ?? 0),
  };
}
