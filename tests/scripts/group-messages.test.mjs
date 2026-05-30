import { describe, it, expect } from 'vitest';
import { groupMessages } from '../../scripts/lib/group-messages.mjs';

const m = (id, date, text = '', extra = {}) => ({
  id, type: 'message', from_id: 'channel1', date, text, ...extra,
});

describe('groupMessages', () => {
  it('groups album by grouped_id', () => {
    const msgs = [
      m(1, '2025-04-12T10:00:00', '', { grouped_id: 'g1' }),
      m(2, '2025-04-12T10:00:01', '', { grouped_id: 'g1' }),
      m(3, '2025-04-12T11:30:00', 'unrelated'),
    ];
    const g = groupMessages(msgs);
    expect(g.length).toBe(2);
    expect(g[0].messages.length).toBe(2);
    expect(g[1].messages.length).toBe(1);
  });

  it('merges within window', () => {
    const msgs = [
      m(1, '2025-04-12T10:00:00', 'a'),
      m(2, '2025-04-12T10:15:00', 'b'),
      m(3, '2025-04-12T11:00:00', 'c'),
    ];
    const g = groupMessages(msgs, 30);
    expect(g.length).toBe(2);
    expect(g[0].messages.length).toBe(2);
  });

  it('does not merge across the window', () => {
    const msgs = [
      m(1, '2025-04-12T10:00:00'),
      m(2, '2025-04-12T11:00:00'),
    ];
    const g = groupMessages(msgs, 30);
    expect(g.length).toBe(2);
  });

  it('does not merge album messages with normal ones', () => {
    const msgs = [
      m(1, '2025-04-12T10:00:00', '', { grouped_id: 'g1' }),
      m(2, '2025-04-12T10:00:30', 'separate'),
    ];
    const g = groupMessages(msgs, 30);
    expect(g.length).toBe(2);
  });

  it('skips non-message types', () => {
    const msgs = [
      { id: 1, type: 'service', date: '2025-04-12T10:00:00' },
      m(2, '2025-04-12T10:01:00', 'real'),
    ];
    const g = groupMessages(msgs);
    expect(g.length).toBe(1);
  });
});
