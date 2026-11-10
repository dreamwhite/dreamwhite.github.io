'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getCarouselState, getNextCarouselIndex, type CarouselState } from '../lib/carousel';

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

    const containerLeft = carousel.getBoundingClientRect().left;
    const offsets = cards.map((card) => card.getBoundingClientRect().left - containerLeft + carousel.scrollLeft);
    setState(getCarouselState(offsets, carousel.scrollLeft, carousel.clientWidth, carousel.scrollWidth));
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
    const cards = carouselRef.current?.querySelectorAll<HTMLElement>('[data-project-card]');
    const nextIndex = getNextCarouselIndex(state.activeIndex, cards?.length ?? itemCount, direction);
    const card = cards?.[nextIndex];
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [itemCount, state.activeIndex]);

  return { carouselRef, ...state, setActiveIndex: (activeIndex: number) => setState((current) => ({ ...current, activeIndex })), move };
}
