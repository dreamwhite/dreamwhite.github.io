import { experience } from '@/content/experience';
import { PageToc } from '@/components/page-toc';

export const metadata = { title: 'Experience', description: 'Education, collaborative projects, and engineering practice.' };

export default function ExperiencePage() {
  return (
    <>
      <section className="page-intro shell"><p className="eyebrow"><span className="eyebrow-dot" />Experience / 03</p><h1>A timeline, not a performance score.</h1><p>Independent development, teaching, software quality, and the education that shaped how I approach engineering.</p></section>
      <section className="page-content internal-page-body shell"><aside className="internal-page-sidebar"><PageToc items={[{ id: 'experience-timeline', label: 'Timeline' }]} /></aside><div className="internal-page-main"><div className="timeline" id="experience-timeline">{experience.map((item) => <div className="timeline-item" key={item.title}><span className="timeline-period">{item.period}</span><div><h2>{item.title}</h2><p className="timeline-org">{item.organization}</p></div><div><p className="timeline-description">{item.description}</p><span className="timeline-tag">{item.tag}</span></div></div>)}</div></div></section>
    </>
  );
}
