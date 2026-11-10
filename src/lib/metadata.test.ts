import test from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, normalizeDescription } from './metadata';

test('normalizes canonical URLs with a single trailing slash', () => {
  assert.equal(absoluteUrl(''), 'https://dreamwhite.dev/');
  assert.equal(absoluteUrl('/projects/prg32/'), 'https://dreamwhite.dev/projects/prg32/');
});

test('turns Markdown excerpts into short metadata descriptions', () => {
  const description = normalizeDescription('Read the [case study](/projects/prg32/) with `runtime` details and **clear boundaries**.');
  assert.equal(description, 'Read the case study with runtime details and clear boundaries.');
  assert.ok(normalizeDescription('A'.repeat(300)).length <= 160);
});
