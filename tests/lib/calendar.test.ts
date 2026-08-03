import { describe, expect, it } from 'vitest';
import { buildCalendarMonth, calendarColorIndex, calendarMonthKeys, daysBetween, utcDateKey } from '../../src/lib/calendar';

const range = (earliest: string, latest = earliest, name = earliest) => ({
  name,
  earliest: new Date(earliest),
  latest: new Date(latest),
});
const days = <T>(month: ReturnType<typeof buildCalendarMonth<T>>) => month.weeks.flatMap(week => week.days).filter(Boolean);

describe('trip calendar helpers', () => {
  it('normalizes timestamps to UTC calendar dates', () => {
    expect(utcDateKey(new Date('2026-07-03T23:30:00-07:00'))).toBe('2026-07-04');
    expect(daysBetween('2026-07-04', '2026-07-07')).toBe(3);
  });

  it('creates spanning segments across month and week boundaries', () => {
    const trip = range('2026-01-30T18:00:00Z', '2026-02-04T08:00:00Z', 'winter');
    const january = buildCalendarMonth(2026, 0, [trip]);
    const february = buildCalendarMonth(2026, 1, [trip]);
    expect(days(january).filter(day => day!.ranges.length).map(day => day!.key)).toEqual([
      '2026-01-30', '2026-01-31',
    ]);
    expect(january.weeks.flatMap(week => week.segments).map(segment => ({
      start: segment.startKey, end: segment.endKey, before: segment.startsBefore, after: segment.endsAfter,
    }))).toEqual([{ start: '2026-01-30', end: '2026-01-31', before: false, after: true }]);
    expect(february.weeks.flatMap(week => week.segments).map(segment => [segment.startKey, segment.endKey])).toEqual([
      ['2026-02-01', '2026-02-01'],
      ['2026-02-02', '2026-02-04'],
    ]);
  });

  it('supports leap day and assigns overlapping trips separate lanes', () => {
    const first = range('2024-02-28', '2024-03-01', 'first');
    const second = range('2024-02-29', '2024-02-29', 'second');
    const february = buildCalendarMonth(2024, 1, [first, second]);
    const leapDay = days(february).find(day => day?.key === '2024-02-29');
    expect(leapDay?.ranges.map(item => item.name)).toEqual(['first', 'second']);
    expect(days(february)).toHaveLength(29);
    const overlapping = february.weeks.find(week => week.segments.length === 2)!;
    expect(new Set(overlapping.segments.map(segment => segment.lane)).size).toBe(2);
    expect(overlapping.laneCount).toBe(2);
  });

  it('returns every month between the earliest and latest range', () => {
    expect(calendarMonthKeys([
      range('2023-12-31', '2024-01-02'),
      range('2024-03-01'),
    ])).toEqual(['2023-12', '2024-01', '2024-02', '2024-03']);
    expect(calendarMonthKeys([])).toEqual([]);
  });

  it('normalizes reversed ranges before building months', () => {
    expect(calendarMonthKeys([range('2026-03-02', '2026-01-30')])).toEqual(['2026-01', '2026-02', '2026-03']);
  });

  it('assigns a stable palette colour', () => {
    expect(calendarColorIndex('2026/exchange-london')).toBe(calendarColorIndex('2026/exchange-london'));
    expect(calendarColorIndex('anything', 1)).toBe(0);
  });
});
