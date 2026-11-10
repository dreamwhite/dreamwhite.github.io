import type { ReactNode } from 'react';
import { PageToc, type PageTocItem } from '../components/page-toc';

type ProjectCaseStudyLayoutProps = {
  toc: PageTocItem[];
  children: ReactNode;
  className?: string;
};

/** Shared content shell for project case studies, including the sticky table of contents. */
export function ProjectCaseStudyLayout({ toc, children, className = '' }: ProjectCaseStudyLayoutProps) {
  return (
    <div className={`project-case-study-layout w-full ${className}`.trim()}>
      <aside className="project-case-study-aside"><PageToc items={toc} /></aside>
      <div className="project-case-study-content">{children}</div>
    </div>
  );
}
