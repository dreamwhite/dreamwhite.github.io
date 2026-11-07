import { ProjectsBrowser } from '@/components/projects-browser';
import { ProjectSystemMap } from '@/components/project-system-map';
import { projectCards } from '@/content/projects';

export const metadata = { title: 'Projects', description: 'Selected software, embedded systems, and infrastructure work by dreamwhite.' };

export default function ProjectsPage() {
  return (
    <>
      <section className="page-intro project-page-intro shell" id="projects-overview"><div className="project-page-intro-grid"><div><p className="eyebrow"><span className="eyebrow-dot" />Project index</p><h1>Things I built, maintained, and learned from.</h1><p>A working map of product software, embedded systems, mobile experiments, infrastructure and platform tooling. Filter it by the kind of problem, not by a framework list.</p></div><ProjectSystemMap projects={projectCards} /></div></section>
      <section className="page-content projects-index shell"><ProjectsBrowser projects={projectCards} /></section>
    </>
  );
}
