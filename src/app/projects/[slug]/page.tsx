import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ExternalLink } from '../../../components/external-link';
import { ProjectVisual } from '../../../components/project-visual';
import { ProjectCaseStudyLayout } from '../../../components/project-case-study-layout';
import { getProject, projects, type Project } from '../../../content/projects';
import { projectPageRegistry } from '../../../components/project-page-registry';
import { createPageMetadata } from '../../../lib/metadata';

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? createPageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}/` }) : {};
}

function GenericProjectPage({ project }: { project: Project }) {
  return (
    <>
      <section className="project-generic-hero" id="project-overview">
        <div className="shell">
          <Link className="text-link project-generic-back-link" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="project-generic-hero-grid">
            <div className="project-generic-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>
            <ProjectVisual project={project} compact />
          </div>
        </div>
      </section>
      <ProjectCaseStudyLayout toc={[{ id: 'project-details', label: 'The challenge' }, { id: 'project-links', label: 'External links' }]}>
      <section className="page-content shell project-detail-content" id="project-details">
        <div className="statement project-detail-statement"><p className="statement-label">The challenge</p><p>{project.challenge}</p></div>
        <div className="detail-grid project-detail-grid"><div><p className="eyebrow">Role</p><p className="detail-copy">{project.role}</p></div><div><p className="eyebrow">Technologies</p><ul className="tech-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div></div>
        {project.media && <div className="project-media-grid">{project.media.map((media) => <figure key={media.src}><Image src={media.src} alt={media.alt} width={media.width} height={media.height} unoptimized /><figcaption>{media.label}</figcaption></figure>)}</div>}
        {project.draft && <div className="editorial-note"><span>EDITORIAL TODO</span><p>This case study is intentionally honest about its current state. Add architecture, screenshots, implementation details, and verified outcomes when the project documentation is ready.</p></div>}
        <div className="project-links project-detail-links" id="project-links">{project.links.length > 0 ? project.links.map((link) => <ExternalLink className="contact-link" href={link.href} key={link.href}><span>External link</span><span>{link.label}</span></ExternalLink>) : <p className="detail-copy">Public project link to be added after verification.</p>}</div>
      </section>
      </ProjectCaseStudyLayout>
    </>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const ProjectPage = project.renderer ? projectPageRegistry[project.renderer] : undefined;
  if (ProjectPage) return <ProjectPage project={project} />;

  return <GenericProjectPage project={project} />;
}
