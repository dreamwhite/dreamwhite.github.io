import type { ReactNode } from 'react';
import { ProjectSectionHeading } from '../components/project-section-heading';

type CaseStudySectionProps = {
  id: string;
  label: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  headingClassName?: string;
  labelClassName?: string;
  shell?: boolean;
  headingLayout?: 'stacked' | 'split';
};

/** Shared semantic section for project pages, keeping the heading and body composition consistent. */
export function CaseStudySection({
  id,
  label,
  title,
  intro,
  children,
  className = '',
  headingClassName = '',
  labelClassName,
  shell = false,
  headingLayout = 'stacked',
}: CaseStudySectionProps) {
  const content = (
    <>
      <ProjectSectionHeading layout={headingLayout} className={headingClassName} labelClassName={labelClassName} label={label} title={title}>
        {intro}
      </ProjectSectionHeading>
      {children}
    </>
  );

  return (
    <section id={id} className={`case-study-section w-full ${className}`.trim()}>
      {shell ? <div className="shell">{content}</div> : content}
    </section>
  );
}
