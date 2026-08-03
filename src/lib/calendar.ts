export interface CalendarRange {
  earliest: Date;
  latest: Date;
}

export interface CalendarDay<T> {
  date: Date;
  key: string;
  day: number;
  ranges: T[];
}

export interface CalendarSegment<T> {
  range: T;
  startColumn: number;
  endColumn: number;
  startKey: string;
  endKey: string;
  lane: number;
  startsBefore: boolean;
  endsAfter: boolean;
}

export interface CalendarWeek<T> {
  days: Array<CalendarDay<T> | null>;
  segments: CalendarSegment<T>[];
  laneCount: number;
}

export interface CalendarMonth<T> {
  year: number;
  month: number;
  key: string;
  label: string;
  weeks: CalendarWeek<T>[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function utcDateKey(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

export function calendarMonthKeys(ranges: CalendarRange[]): string[] {
  if (ranges.length === 0) return [];
  const normalized = ranges.map(normalizedRange);
  const firstTime = Math.min(...normalized.map(range => range.earliest.getTime()));
  const lastTime = Math.max(...normalized.map(range => range.latest.getTime()));
  const cursor = new Date(firstTime);
  cursor.setUTCDate(1);
  const last = new Date(lastTime);
  last.setUTCDate(1);
  const keys: string[] = [];
  while (cursor <= last) {
    keys.push(utcDateKey(cursor).slice(0, 7));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return keys;
}

export function buildCalendarMonth<T extends CalendarRange>(year: number, month: number, ranges: T[]): CalendarMonth<T> {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 0 || month > 11) {
    throw new RangeError('Calendar month must use a valid year and zero-based month.');
  }
  const first = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const leading = (first.getUTCDay() + 6) % 7;
  const cells: Array<CalendarDay<T> | null> = Array.from({ length: leading }, () => null);
  const normalized = new Map(ranges.map(range => [range, normalizedRange(range)]));

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(Date.UTC(year, month, day));
    const time = date.getTime();
    cells.push({
      date,
      key: utcDateKey(date),
      day,
      ranges: ranges.filter(range => {
        const value = normalized.get(range)!;
        return value.earliest.getTime() <= time && value.latest.getTime() >= time;
      }),
    });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const preferredLanes = new Map<T, number>();
  const weeks: CalendarWeek<T>[] = [];
  for (let offset = 0; offset < cells.length; offset += 7) {
    const days = cells.slice(offset, offset + 7);
    const realDays = days.filter((day): day is CalendarDay<T> => day !== null);
    const weekStart = realDays[0].date.getTime();
    const weekEnd = realDays[realDays.length - 1].date.getTime();
    const candidates = ranges
      .map((range, rangeIndex) => ({ range, rangeIndex, normalized: normalized.get(range)! }))
      .filter(item => item.normalized.earliest.getTime() <= weekEnd && item.normalized.latest.getTime() >= weekStart)
      .map(item => {
        const startTime = Math.max(item.normalized.earliest.getTime(), weekStart);
        const endTime = Math.min(item.normalized.latest.getTime(), weekEnd);
        return {
          ...item,
          startColumn: days.findIndex(day => day?.date.getTime() === startTime) + 1,
          endColumn: days.findIndex(day => day?.date.getTime() === endTime) + 1,
          startTime,
          endTime,
        };
      })
      .sort((a, b) =>
        (preferredLanes.get(a.range) ?? Number.MAX_SAFE_INTEGER) - (preferredLanes.get(b.range) ?? Number.MAX_SAFE_INTEGER) ||
        a.rangeIndex - b.rangeIndex
      );

    const occupied: Array<Array<[number, number]>> = [];
    const segments: CalendarSegment<T>[] = candidates.map(item => {
      const preferred = preferredLanes.get(item.range);
      let lane = preferred !== undefined && laneIsFree(occupied[preferred], item.startColumn, item.endColumn)
        ? preferred
        : occupied.findIndex(intervals => laneIsFree(intervals, item.startColumn, item.endColumn));
      if (lane < 0) lane = occupied.length;
      occupied[lane] ??= [];
      occupied[lane].push([item.startColumn, item.endColumn]);
      preferredLanes.set(item.range, lane);
      return {
        range: item.range,
        startColumn: item.startColumn,
        endColumn: item.endColumn,
        startKey: utcDateKey(new Date(item.startTime)),
        endKey: utcDateKey(new Date(item.endTime)),
        lane,
        startsBefore: item.normalized.earliest.getTime() < item.startTime,
        endsAfter: item.normalized.latest.getTime() > item.endTime,
      };
    });
    weeks.push({ days, segments, laneCount: occupied.length });
  }

  return {
    year,
    month,
    key: `${year}-${String(month + 1).padStart(2, '0')}`,
    label: first.toLocaleDateString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
    weeks,
  };
}

export function calendarColorIndex(key: string, paletteSize = 8): number {
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return paletteSize > 0 ? hash % paletteSize : 0;
}

function laneIsFree(intervals: Array<[number, number]> | undefined, start: number, end: number): boolean {
  return !intervals?.some(([occupiedStart, occupiedEnd]) => start <= occupiedEnd && end >= occupiedStart);
}

function normalizedRange(range: CalendarRange): CalendarRange {
  const first = utcDay(range.earliest);
  const last = utcDay(range.latest);
  return first <= last ? { earliest: first, latest: last } : { earliest: last, latest: first };
}

function utcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function daysBetween(startKey: string, endKey: string): number {
  return Math.round((new Date(`${endKey}T00:00:00Z`).getTime() - new Date(`${startKey}T00:00:00Z`).getTime()) / DAY_MS);
}
