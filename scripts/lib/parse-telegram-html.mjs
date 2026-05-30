import { parse } from 'node-html-parser';

/**
 * Parse one messages*.html file from a Telegram Desktop export.
 * Returns an array of message objects matching the JSON export shape:
 *   { id, type, from_id, date, text, photo, grouped_id?, location_information? }
 *
 * Joined continuation messages (class "joined") inherit author + date from
 * the previous non-joined message in document order.
 *
 * Albums (one message div with multiple .photo_wrap children) are split into
 * N message entries sharing a synthetic grouped_id, so the existing grouping
 * logic in group-messages.mjs treats them as one post.
 */
export function parseHtmlExport(html) {
  const root = parse(html);
  const out = [];
  let lastDate = null;
  let lastAuthor = null;

  for (const div of root.querySelectorAll('div.message')) {
    if (div.classList.contains('service')) continue;

    const id = parseMessageId(div.getAttribute('id'));

    const dateDiv = div.querySelector('.pull_right.date.details, .date.details, .date');
    let date = lastDate;
    if (dateDiv) {
      const titleAttr = dateDiv.getAttribute('title');
      if (titleAttr) {
        const parsed = parseTelegramDate(titleAttr);
        if (parsed) {
          date = parsed;
          lastDate = parsed;
        }
      }
    }

    const fromDiv = div.querySelector('.from_name');
    let author = lastAuthor;
    if (fromDiv) {
      author = fromDiv.text.trim();
      lastAuthor = author;
    }

    const textDiv = div.querySelector('.text');
    const text = textDiv ? domToMarkdown(textDiv).trim() : '';

    const locationLink = findLocationLink(div);
    const location_information = locationLink;

    const photoLinks = div.querySelectorAll('a.photo_wrap');
    const photoPaths = photoLinks
      .map(a => a.getAttribute('href'))
      .filter(Boolean);

    if (photoPaths.length > 1) {
      const grouped_id = `html-msg-${id ?? out.length}`;
      photoPaths.forEach((p, i) => {
        out.push({
          id: id != null ? `${id}-${i}` : `${out.length}-${i}`,
          type: 'message',
          from_id: author,
          date,
          text: i === 0 ? text : '',
          photo: p,
          grouped_id,
          ...(i === 0 && location_information ? { location_information } : {}),
        });
      });
    } else {
      out.push({
        id: id ?? out.length,
        type: 'message',
        from_id: author,
        date,
        text,
        photo: photoPaths[0] ?? null,
        ...(location_information ? { location_information } : {}),
      });
    }
  }
  return out;
}

function parseMessageId(idAttr) {
  if (!idAttr) return null;
  const m = idAttr.match(/message[-_]?(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/** "06.05.2025 14:32:15 UTC+02:00" → "2025-05-06T14:32:15+02:00" */
export function parseTelegramDate(s) {
  if (!s) return null;
  const m = s.match(/(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2}):(\d{2})\s*(?:UTC\s*([+-]\d{2}):?(\d{2})?)?/);
  if (!m) return null;
  const [, dd, mm, yyyy, hh, mi, ss, oh, om] = m;
  const offset = oh != null ? `${oh}:${om ?? '00'}` : 'Z';
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${offset}`;
}

/** Walk a node and emit a markdown string. */
function domToMarkdown(node) {
  let out = '';
  for (const c of node.childNodes) {
    if (c.nodeType === 3) {
      out += c.text;
      continue;
    }
    const tag = (c.tagName ?? '').toLowerCase();
    const inner = domToMarkdown(c);
    switch (tag) {
      case 'a':
        out += `[${inner}](${c.getAttribute('href') ?? ''})`;
        break;
      case 'b':
      case 'strong':
        out += `**${inner}**`;
        break;
      case 'i':
      case 'em':
        out += `*${inner}*`;
        break;
      case 'code':
        out += '`' + inner + '`';
        break;
      case 'pre':
        out += '\n```\n' + inner + '\n```\n';
        break;
      case 'br':
        out += '\n';
        break;
      default:
        out += inner;
    }
  }
  return out;
}

/**
 * Telegram HTML renders shared locations as a media block linking to maps.
 * Try to extract lat/lng from the link href.
 */
function findLocationLink(messageDiv) {
  const links = messageDiv.querySelectorAll('a.media_wrap, a.media, .media_location a');
  for (const link of links) {
    const href = link.getAttribute('href') ?? '';
    const m = href.match(/[?&](?:q|ll)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    if (m) {
      return { latitude: parseFloat(m[1]), longitude: parseFloat(m[2]) };
    }
  }
  return null;
}
