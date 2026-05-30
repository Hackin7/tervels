import { describe, it, expect } from 'vitest';
import { parseHtmlExport, parseTelegramDate } from '../../scripts/lib/parse-telegram-html.mjs';

describe('parseTelegramDate', () => {
  it('parses DD.MM.YYYY HH:MM:SS UTC+HH:MM', () => {
    expect(parseTelegramDate('06.05.2025 14:32:15 UTC+02:00'))
      .toBe('2025-05-06T14:32:15+02:00');
  });
  it('parses negative offset', () => {
    expect(parseTelegramDate('06.05.2025 14:32:15 UTC-05:00'))
      .toBe('2025-05-06T14:32:15-05:00');
  });
  it('parses without offset (UTC implied)', () => {
    expect(parseTelegramDate('06.05.2025 14:32:15 UTC'))
      .toBe('2025-05-06T14:32:15Z');
  });
  it('returns null on garbage', () => {
    expect(parseTelegramDate('not a date')).toBeNull();
  });
});

const SINGLE_MSG = `
<html><body>
<div class="message default clearfix" id="message1">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="06.05.2025 14:32:15 UTC+02:00">14:32</div>
    <div class="text">Three days in #kyoto, was wonderful</div>
  </div>
</div>
</body></html>
`;

const PHOTO_MSG = `
<html><body>
<div class="message default clearfix" id="message2">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="06.05.2025 14:32:15 UTC+00:00">14:32</div>
    <div class="text">Single photo post</div>
    <a class="photo_wrap clearfix pull_left" href="photos/photo_1@06-05-2025_14-32-15.jpg">
      <img class="photo" src="photos/photo_1@06-05-2025_14-32-15.jpg" />
    </a>
  </div>
</div>
</body></html>
`;

const ALBUM_MSG = `
<html><body>
<div class="message default clearfix" id="message3">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="07.05.2025 09:00:00 UTC+00:00">09:00</div>
    <div class="text">Album of three</div>
    <a class="photo_wrap" href="photos/a.jpg"><img src="photos/a.jpg"/></a>
    <a class="photo_wrap" href="photos/b.jpg"><img src="photos/b.jpg"/></a>
    <a class="photo_wrap" href="photos/c.jpg"><img src="photos/c.jpg"/></a>
  </div>
</div>
</body></html>
`;

const JOINED_MSG = `
<html><body>
<div class="message default clearfix" id="message4">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="07.05.2025 10:00:00 UTC+00:00">10:00</div>
    <div class="text">First in thread</div>
  </div>
</div>
<div class="message default joined clearfix" id="message5">
  <div class="body">
    <div class="text">Continuation, no header</div>
  </div>
</div>
</body></html>
`;

const SERVICE_MSG = `
<html><body>
<div class="message service" id="messageS">
  <div class="body details">Channel created</div>
</div>
<div class="message default clearfix" id="message6">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="01.01.2025 00:00:00 UTC+00:00">00:00</div>
    <div class="text">First real post</div>
  </div>
</div>
</body></html>
`;

const FORMATTED_TEXT = `
<html><body>
<div class="message default clearfix" id="message7">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="08.05.2025 12:00:00 UTC+00:00">12:00</div>
    <div class="text">Visit <a href="https://example.com">this site</a> for <b>great</b> <i>views</i>.</div>
  </div>
</div>
</body></html>
`;

const LOCATION_MSG = `
<html><body>
<div class="message default clearfix" id="message8">
  <div class="body">
    <div class="from_name">Travel Channel</div>
    <div class="pull_right date details" title="09.05.2025 12:00:00 UTC+00:00">12:00</div>
    <div class="media_wrap clearfix">
      <a class="media clearfix pull_left block_link media_location" href="https://maps.google.com/?q=35.0394,135.7292">
        <div class="title">Kinkaku-ji</div>
      </a>
    </div>
  </div>
</div>
</body></html>
`;

describe('parseHtmlExport', () => {
  it('parses a single text message', () => {
    const msgs = parseHtmlExport(SINGLE_MSG);
    expect(msgs.length).toBe(1);
    expect(msgs[0]).toMatchObject({
      id: 1,
      type: 'message',
      from_id: 'Travel Channel',
      date: '2025-05-06T14:32:15+02:00',
      text: 'Three days in #kyoto, was wonderful',
      photo: null,
    });
  });

  it('parses a single-photo message', () => {
    const msgs = parseHtmlExport(PHOTO_MSG);
    expect(msgs.length).toBe(1);
    expect(msgs[0].photo).toBe('photos/photo_1@06-05-2025_14-32-15.jpg');
    expect(msgs[0].text).toBe('Single photo post');
  });

  it('splits albums into N messages with shared grouped_id', () => {
    const msgs = parseHtmlExport(ALBUM_MSG);
    expect(msgs.length).toBe(3);
    expect(msgs.map(m => m.photo)).toEqual([
      'photos/a.jpg', 'photos/b.jpg', 'photos/c.jpg',
    ]);
    expect(new Set(msgs.map(m => m.grouped_id)).size).toBe(1);
    expect(msgs[0].text).toBe('Album of three');
    expect(msgs[1].text).toBe('');
    expect(msgs[2].text).toBe('');
  });

  it('inherits author and date for joined continuation messages', () => {
    const msgs = parseHtmlExport(JOINED_MSG);
    expect(msgs.length).toBe(2);
    expect(msgs[1].from_id).toBe('Travel Channel');
    expect(msgs[1].date).toBe('2025-05-07T10:00:00+00:00');
    expect(msgs[1].text).toBe('Continuation, no header');
  });

  it('skips service messages', () => {
    const msgs = parseHtmlExport(SERVICE_MSG);
    expect(msgs.length).toBe(1);
    expect(msgs[0].text).toBe('First real post');
  });

  it('flattens links and bold/italic to markdown', () => {
    const msgs = parseHtmlExport(FORMATTED_TEXT);
    expect(msgs[0].text).toBe('Visit [this site](https://example.com) for **great** *views*.');
  });

  it('extracts location coords from maps link', () => {
    const msgs = parseHtmlExport(LOCATION_MSG);
    expect(msgs[0].location_information).toEqual({
      latitude: 35.0394,
      longitude: 135.7292,
    });
  });
});
