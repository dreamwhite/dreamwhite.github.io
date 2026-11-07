'use client';

import { useEffect, useState } from 'react';

export type PageTocItem = {
  id: string;
  label: string;
};

/** Accessible, scroll-aware table of contents for long internal pages. */
export function PageToc({ items }: { items: PageTocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const updateActiveHeading = () => {
      const current = items.reduce((visibleId, item) => {
        const element = document.getElementById(item.id);
        return element && element.getBoundingClientRect().top <= 170 ? item.id : visibleId;
      }, items[0]?.id ?? '');

      setActiveId(current);
    };

    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading);

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
    };
  }, [items]);

  return (
    <nav className="page-toc" aria-label="On this page">
      <p className="page-toc-title">On this page</p>
      <ol className="page-toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a className={`page-toc-link${activeId === item.id ? ' active' : ''}`} href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
