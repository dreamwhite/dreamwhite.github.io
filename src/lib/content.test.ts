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
