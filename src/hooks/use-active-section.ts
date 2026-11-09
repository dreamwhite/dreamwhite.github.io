'use client';

import { useEffect, useMemo, useState } from 'react';

export type ActiveSectionTarget = {
  id: string;
};

/** Tracks the last section whose heading has crossed the reading position. */
export function useActiveSection(items: readonly ActiveSectionTarget[], threshold = 170) {
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const [activeId, setActiveId] = useState(itemIds[0] ?? '');

  useEffect(() => {
    const updateActiveSection = () => {
      const current = itemIds.reduce((visibleId, id) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= threshold ? id : visibleId;
      }, itemIds[0] ?? '');

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [itemIds, threshold]);

  return activeId;
}
