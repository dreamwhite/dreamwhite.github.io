'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getActiveSectionId } from '../lib/active-section';

export type ActiveSectionTarget = {
  id: string;
};

/** Tracks the last section whose heading has crossed the reading position. */
export function useActiveSection(items: readonly ActiveSectionTarget[], threshold = 170) {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const [activeId, setActiveId] = useState(itemIds[0] ?? '');
  const frameRef = useRef<number | null>(null);

  const updateActiveSection = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const positions = itemIds.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY);
      const current = getActiveSectionId(itemIds, positions, threshold);
      setActiveId((previous) => previous === current ? previous : current);
      frameRef.current = null;
    });
  }, [itemIds, threshold]);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [updateActiveSection]);

  return activeId;
}
