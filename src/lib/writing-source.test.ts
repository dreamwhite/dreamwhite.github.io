import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { readWritingSourceDocuments, validateWritingSourceDocuments } from './writing-source';

test('reads Markdown frontmatter and validates local references', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dreamwhite-writing-'));
  const writingDirectory = path.join(root, 'writing');
  const publicDirectory = path.join(root, 'public');
  fs.mkdirSync(writingDirectory, { recursive: true });
  fs.mkdirSync(path.join(publicDirectory, 'images', 'writing'), { recursive: true });
  fs.writeFileSync(path.join(publicDirectory, 'images', 'writing', 'demo.png'), 'image');
  fs.writeFileSync(path.join(writingDirectory, 'demo.md'), '---\ntitle: Demo\ndate: 2026-01-01\ncategories: notes\n---\n\n![Demo](/images/writing/demo.png)');

  const documents = readWritingSourceDocuments(writingDirectory);
  assert.equal(documents[0]?.slug, 'demo');
  assert.deepEqual(validateWritingSourceDocuments(documents, { publicDirectory }), []);
  fs.rmSync(root, { recursive: true, force: true });
});

test('reports invalid frontmatter, duplicate slugs and missing local routes', () => {
  const errors = validateWritingSourceDocuments([
    { fileName: 'Bad.md', slug: 'Bad_slug', data: { title: '', date: 'not-a-date', categories: [] }, content: '[Missing](/writing/unknown/) ![Missing](/images/missing.png)' },
    { fileName: 'Bad-copy.md', slug: 'Bad_slug', data: { title: 'Copy', date: '2026-01-01', categories: 'notes' }, content: '' },
  ], { publicDirectory: '/tmp/dreamwhite-missing-public', writingSlugs: new Set(['Bad_slug']) });

  assert.ok(errors.some((error) => error.includes('slug must contain')));
  assert.ok(errors.some((error) => error.includes('frontmatter title')));
  assert.ok(errors.some((error) => error.includes('frontmatter date')));
  assert.ok(errors.some((error) => error.includes('duplicate slug')));
  assert.ok(errors.some((error) => error.includes('missing local media')));
  assert.ok(errors.some((error) => error.includes('missing writing route')));
});
