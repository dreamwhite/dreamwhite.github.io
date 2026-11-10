export type CarouselState = {
  activeIndex: number;
  canMovePrevious: boolean;
  canMoveNext: boolean;
};

export function getCarouselState(offsets: readonly number[], scrollLeft: number, clientWidth: number, scrollWidth: number): CarouselState {
  if (offsets.length === 0) return { activeIndex: 0, canMovePrevious: false, canMoveNext: false };

  const activeIndex = offsets.reduce((closestIndex, offset, index) => {
    return Math.abs(offset - scrollLeft) < Math.abs(offsets[closestIndex] - scrollLeft) ? index : closestIndex;
  }, 0);
  const maxScroll = Math.max(0, scrollWidth - clientWidth);

  return {
    activeIndex,
    canMovePrevious: scrollLeft > 2,
    canMoveNext: scrollLeft < maxScroll - 2,
  };
}

export function getNextCarouselIndex(activeIndex: number, itemCount: number, direction: -1 | 1) {
  if (itemCount <= 0) return 0;
  return Math.max(0, Math.min(itemCount - 1, activeIndex + direction));
}
