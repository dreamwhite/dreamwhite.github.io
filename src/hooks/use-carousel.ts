'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type CarouselState = {
  activeIndex: number;
  canMovePrevious: boolean;
  canMoveNext: boolean;
};

/** Provides scroll state and keyboard-friendly controls for a horizontal card rail. */
export function useCarousel(itemCount: number) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CarouselState>({
    activeIndex: 0,
    canMovePrevious: false,
    canMoveNext: itemCount > 1,
  });

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll<HTMLElement>('[data-project-card]'));
    if (cards.length === 0) return;

    const currentOffset = carousel.scrollLeft;
    const closestIndex = cards.reduce((closest, card, index) => {
      const closestDistance = Math.abs(cards[closest].offsetLeft - currentOffset);
      const distance = Math.abs(card.offsetLeft - currentOffset);
      return distance < closestDistance ? index : closest;
    }, 0);

    setState({
      activeIndex: closestIndex,
      canMovePrevious: currentOffset > 2,
      canMoveNext: currentOffset < carousel.scrollWidth - carousel.clientWidth - 2,
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState);
    updateCarouselState();

    return () => {
      carousel.removeEventListener('scroll', updateCarouselState);
      window.removeEventListener('resize', updateCarouselState);
    };
  }, [updateCarouselState]);

  const move = useCallback((direction: -1 | 1) => {
    const nextIndex = Math.max(0, Math.min(itemCount - 1, state.activeIndex + direction));
    const card = carouselRef.current?.querySelectorAll<HTMLElement>('[data-project-card]')[nextIndex];
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [itemCount, state.activeIndex]);

  return { carouselRef, ...state, setActiveIndex: (activeIndex: number) => setState((current) => ({ ...current, activeIndex })), move };
}
