import type { CollectionEntry } from 'astro:content';
import { eventMeta, EVENTS_BY_SLUG } from './events';

export type Haul = CollectionEntry<'hauls'>;

/** Fail the build if albums reference an unknown event or repeat an event slug. */
export function validateHauls(hauls: Haul[]): void {
  const seen = new Set<string>();
  for (const haul of hauls) {
    const event = haul.data.event;
    if (!EVENTS_BY_SLUG.has(event)) {
      throw new Error(`Haul "${haul.id}" references unknown event "${event}".`);
    }
    const expectedId = `${eventMeta(event).year}/${event}`;
    if (haul.id !== expectedId) {
      throw new Error(`Haul "${haul.id}" must be stored at "src/content/haul/${expectedId}/index.md".`);
    }
    if (seen.has(event)) {
      throw new Error(`More than one haul album references event "${event}".`);
    }
    seen.add(event);
  }
}

export function publishedHauls(hauls: Haul[]): Haul[] {
  validateHauls(hauls);
  return hauls
    .filter(haul => !haul.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
