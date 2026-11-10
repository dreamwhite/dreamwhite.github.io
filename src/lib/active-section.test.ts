import assert from 'node:assert/strict';
import test from 'node:test';
import { getActiveSectionId } from './active-section';

test('keeps the last section that crossed the reading threshold active', () => {
  assert.equal(getActiveSectionId(['overview', 'work', 'credits'], [80, 210, 640], 170), 'overview');
  assert.equal(getActiveSectionId(['overview', 'work', 'credits'], [-20, 80, 640], 170), 'work');
  assert.equal(getActiveSectionId([], [], 170), '');
});
