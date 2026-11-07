import type { ReactNode } from 'react';

type ProjectSectionHeadingProps = {
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
  labelClassName?: string;
  layout?: 'stacked' | 'split';
};

/** Shared label/title block for project case-study sections. */
export function ProjectSectionHeading({ label, title, children, className = '', labelClassName = 'project-section-label', layout = 'stacked' }: ProjectSectionHeadingProps) {
  return (
    <div className={`project-section-heading block w-full project-section-heading-${layout} ${className}`.trim()}>
      <p className={labelClassName}>{label}</p>
      <div className="project-section-heading-content">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
