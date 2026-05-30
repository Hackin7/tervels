/**
 * Group Telegram messages into post-candidates.
 * Albums (same `grouped_id`) are always one group.
 * Consecutive same-author messages within mergeWindowMin minutes also merge.
 */
export function groupMessages(messages, mergeWindowMin = 30) {
  const sorted = [...messages].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const groups = [];
  let current = null;
  for (const msg of sorted) {
    if (msg.type !== 'message') continue;
    const t = parseDate(msg.date);
    if (!current) {
      current = newGroup(msg, t);
      continue;
    }
    if (msg.grouped_id && current.grouped_id === msg.grouped_id) {
      append(current, msg, t);
      continue;
    }
    const sameAuthor = msg.from_id === current.from_id;
    const within = (t - current.last) <= mergeWindowMin * 60 * 1000;
    if (sameAuthor && within && !msg.grouped_id && !current.grouped_id) {
      append(current, msg, t);
      continue;
    }
    groups.push(current);
    current = newGroup(msg, t);
  }
  if (current) groups.push(current);
  return groups;
}

function newGroup(msg, t) {
  return {
    grouped_id: msg.grouped_id ?? null,
    from_id: msg.from_id,
    first: t, last: t,
    messages: [msg],
  };
}
function append(group, msg, t) {
  group.messages.push(msg);
  group.last = t;
}
function parseDate(s) {
  return new Date(s).getTime();
}
