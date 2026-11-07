'use client';

import { useEffect, useState } from 'react';
import type { WritingHeading } from '@/lib/content';

export function ArticleToc({ headings }: { headings: WritingHeading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    const updateActiveHeading = () => {
      const current = headings.reduce((visibleId, heading) => {
        const element = document.getElementById(heading.id);
        return element && element.getBoundingClientRect().top <= 150 ? heading.id : visibleId;
      }, headings[0]?.id ?? '');

      setActiveId(current);
    };

    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading);

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
    };
  }, [headings]);

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
