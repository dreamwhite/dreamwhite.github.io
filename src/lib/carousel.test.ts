import assert from 'node:assert/strict';
import test from 'node:test';
import { getCarouselState, getNextCarouselIndex } from './carousel';

test('tracks the closest snapped card and disables controls at both ends', () => {
  assert.deepEqual(getCarouselState([0, 220, 440], 220, 600, 1040), { activeIndex: 1, canMovePrevious: true, canMoveNext: true });
  assert.deepEqual(getCarouselState([0, 220, 440], 440, 600, 1040), { activeIndex: 2, canMovePrevious: true, canMoveNext: false });
  assert.deepEqual(getCarouselState([0, 220], 0, 600, 600), { activeIndex: 0, canMovePrevious: false, canMoveNext: false });
});

test('clamps carousel movement to the available cards', () => {
  assert.equal(getNextCarouselIndex(0, 4, -1), 0);
  assert.equal(getNextCarouselIndex(2, 4, 1), 3);
  assert.equal(getNextCarouselIndex(8, 4, 1), 3);
  assert.equal(getNextCarouselIndex(0, 0, 1), 0);
});
