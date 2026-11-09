'use client';

import type { WritingHeading } from '@/lib/content';
import { useActiveSection } from '@/hooks/use-active-section';

export function ArticleToc({ headings }: { headings: WritingHeading[] }) {
  const activeId = useActiveSection(headings, 150);

  return (
    <nav className="article-toc" aria-label="On this page">
      <p className="article-toc-title">On this page</p>
      <ol className="article-toc-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a className={`article-toc-link toc-level-${heading.level}${activeId === heading.id ? ' active' : ''}`} href={`#${heading.id}`}>
              {heading.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
