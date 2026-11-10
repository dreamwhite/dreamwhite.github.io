'use client';

import { useActiveSection } from '../hooks/use-active-section';

export type PageTocItem = {
  id: string;
  label: string;
};

/** Accessible, scroll-aware table of contents for long internal pages. */
export function PageToc({ items }: { items: PageTocItem[] }) {
  const activeId = useActiveSection(items);

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
