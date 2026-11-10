import assert from 'node:assert/strict';
import test from 'node:test';
import { renderMarkdown } from './content';

test('renders supported HTML while removing active content', async () => {
  const { html } = await renderMarkdown(
    '# Safe heading\n\nLine one<br>line two\n\n<script>alert(1)</script><a href="javascript:alert(1)">unsafe</a>',
  );

  assert.match(html, /<h1 id="safe-heading">Safe heading<\/h1>/);
  assert.match(html, /Line one<br>line two/);
  assert.doesNotMatch(html, /<script|javascript:/i);
  assert.match(html, /<a>unsafe<\/a>/);
});

test('keeps safe external and mail links', async () => {
  const { html } = await renderMarkdown('[External](https://example.com) [Mail](mailto:test@example.com)');

  assert.match(html, /href="https:\/\/example\.com"/);
  assert.match(html, /href="mailto:test@example\.com"/);
});

test('generates stable unique heading ids and ignores fenced headings', async () => {
  const { html, headings } = await renderMarkdown('## Same heading\n\n~~~md\n## Ignored heading\n~~~\n\n## Same heading');

  assert.deepEqual(headings.map((heading) => heading.id), ['same-heading', 'same-heading-2']);
  assert.match(html, /<h2 id="same-heading">Same heading<\/h2>/);
  assert.match(html, /<h2 id="same-heading-2">Same heading<\/h2>/);
  assert.doesNotMatch(html, /<h2[^>]*>Ignored heading<\/h2>/);
});
