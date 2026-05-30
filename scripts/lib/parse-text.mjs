/**
 * Telegram's `text` is sometimes a string, sometimes an array of segments.
 * Flatten to plain markdown.
 */
export function flattenText(text) {
  if (!text) return '';
  if (typeof text === 'string') return text;
  if (Array.isArray(text)) {
    return text.map(seg => {
      if (typeof seg === 'string') return seg;
      if (seg.type === 'link' || seg.type === 'text_link') {
        return `[${seg.text}](${seg.href ?? seg.text})`;
      }
      if (seg.type === 'bold') return `**${seg.text}**`;
      if (seg.type === 'italic') return `*${seg.text}*`;
      if (seg.type === 'code') return `\`${seg.text}\``;
      if (seg.type === 'pre') return '```\n' + seg.text + '\n```';
      if (seg.type === 'hashtag') return seg.text;
      return seg.text ?? '';
    }).join('');
  }
  return '';
}

export function extractHashtags(text) {
  const flat = flattenText(text);
  return [...flat.matchAll(/#([\p{L}\p{N}_]+)/gu)].map(m => m[1].toLowerCase());
}
