import assert from 'node:assert/strict';
import test from 'node:test';
import { projectCards, projects, projectSlugs } from '../content/projects';

test('the project catalog exposes unique route and card slugs', () => {
  assert.equal(new Set(projectSlugs).size, projectSlugs.length);
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  assert.equal(new Set(projectCards.map((project) => project.slug)).size, projectCards.length);
});

test('every case study is connected to a renderer or the generic layout', () => {
  assert.ok(projects.every((project) => project.renderer || project.slug === 'open-source-systems'));
});
