import assert from 'node:assert/strict';
import test from 'node:test';
import { extractCssUrlReferences, extractSrcsetCandidates, extractAttributeValues, outputPathForAsset, outputPathForHref } from './static-output';

test('extracts local HTML assets from src and srcset attributes', () => {
  const html = '<img src="/images/portrait.webp" srcset="/images/portrait.webp 1x, /images/portrait@2x.webp 2x">';

  assert.deepEqual(extractAttributeValues(html, 'src'), ['/images/portrait.webp']);
  assert.deepEqual(extractSrcsetCandidates(extractAttributeValues(html, 'srcset')[0]), ['/images/portrait.webp', '/images/portrait@2x.webp']);
});

test('resolves static output routes and relative CSS assets', () => {
  assert.equal(outputPathForHref('/tmp/out', '/projects/prg32/'), '/tmp/out/projects/prg32/index.html');
  assert.equal(outputPathForHref('/tmp/out', '/documents/paper.pdf'), '/tmp/out/documents/paper.pdf');
  assert.equal(outputPathForAsset('/tmp/out', '/tmp/out/_next/static/css/app.css', '../media/icon.svg'), '/tmp/out/_next/static/media/icon.svg');
});

test('extracts CSS url references without treating data URLs as local assets', () => {
  assert.deepEqual(extractCssUrlReferences('.icon { background: url("/images/icon.svg") } .font { src: url(data:font/woff2;base64,abc) }'), ['/images/icon.svg', 'data:font/woff2;base64,abc']);
});
