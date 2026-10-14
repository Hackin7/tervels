export interface EventMeta {
  slug: string;
  name: string;
  year: number;
  location?: string;
}

export const EVENT_CATALOG: EventMeta[] = [
  { slug: 'intel-embedded-cup-2026', name: 'Intel Embedded Cup', year: 2026, location: 'Shanghai, China' },
  { slug: 'defcon34-2026', name: 'DEF CON 34', year: 2026, location: 'Las Vegas, United States' },
  { slug: 'off-by-one-2026', name: 'Off By One', year: 2026, location: 'Singapore' },
  { slug: 'nice-hack-2026', name: 'Nice Hack', year: 2026 },
  { slug: 'nus-career-fest-2026', name: 'NUS Career Fest', year: 2026 },
  { slug: 'japan-expo-paris-2026', name: 'Japan Expo Paris', year: 2026, location: 'Villepinte, France' },
  { slug: 'dokomi-2026', name: 'DoKomi', year: 2026, location: 'Dusseldorf, Germany' },
  { slug: 'midnight-sun-ctf-2026', name: 'Midnight Sun CTF & Conference', year: 2026, location: 'Stockholm, Sweden' },
  { slug: 'lakectf-2026', name: 'LakeCTF', year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'balelec-2026', name: 'Balelec', year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'polymanga-2026', name: 'PolyManga', year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'hackaday-europe-2026', name: 'Hackaday Europe', year: 2026, location: 'Lecco, Italy' },
  { slug: 'insomnihack-2026', name: "Insomni'hack", year: 2026, location: 'Lausanne, Switzerland' },
  { slug: 'ph0wn-2026', name: 'ph0wn', year: 2026, location: 'Nice, France' },
  { slug: 'embedded-world-2026', name: 'Embedded World', year: 2026, location: 'Nuremberg, Germany' },
  { slug: 'cysat-2026', name: 'CySAT', year: 2026, location: 'Singapore' },
  { slug: 'maker-faire-shenzhen-2025', name: 'Maker Faire Shenzhen', year: 2025, location: 'Shenzhen, China' },
  { slug: 'kicon-asia-2025', name: 'KiCon Asia', year: 2025, location: 'Shenzhen, China' },
  { slug: 'shanghai-maker-faire-2025', name: 'Shanghai Maker Faire', year: 2025, location: 'Shanghai, China' },
  { slug: 'defcon33-2025', name: 'DEF CON 33', year: 2025, location: 'Las Vegas, United States' },
  { slug: 'robosub-2025', name: 'RoboSub', year: 2025, location: 'Irvine, United States' },
  { slug: 'black-hat-usa-2025', name: 'Black Hat USA', year: 2025, location: 'Las Vegas, United States' },
  { slug: 'isitdtu-ctf-finals-2023', name: 'ISITDTU CTF Finals', year: 2023, location: 'Da Nang, Vietnam' },
  { slug: 'lakectf-2025', name: 'LakeCTF', year: 2025, location: 'Lausanne, Switzerland' },
  { slug: 'balelec-2025', name: 'Balelec', year: 2025, location: 'Lausanne, Switzerland' },
  { slug: 'music-china-2025', name: 'Music China', year: 2025, location: 'Shanghai, China' },
  { slug: 'china-hi-tech-fair-2025', name: 'China Hi-Tech Fair', year: 2025, location: 'Shenzhen, China' },
  { slug: 'open-hardware-summit-2026', name: 'Open Hardware Summit', year: 2026, location: 'Berlin, Germany' },
];

export const EVENTS_BY_SLUG = new Map(EVENT_CATALOG.map(event => [event.slug, event]));

export function eventMeta(slug: string): EventMeta {
  return EVENTS_BY_SLUG.get(slug) ?? {
    slug,
    name: slug,
    year: Number(slug.match(/-(\d{4})$/)?.[1] ?? 0),
  };
}
