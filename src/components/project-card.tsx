import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Boxes, Laptop, Package, Radio, Server, TrainFront } from 'lucide-react';
import type { ProjectCardData } from '@/content/projects';

function ProjectCardArt({ project }: { project: ProjectCardData }) {
  if (project.slug === 'prg32') {
    return <div className="project-card-art project-card-art-prg32"><Image src="/images/projects/prg32/logo.png" alt="" fill sizes="(max-width: 860px) 100vw, 33vw" /></div>;
  }

  if (project.slug === 'event-driven-mqtt') {
    return <div className="project-card-art project-card-art-event-bridge"><Radio size={54} strokeWidth={1.5} /><span>EVENTS / MQTT</span></div>;
  }

  if (project.slug === 'spotted-train') {
    return <div className="project-card-art project-card-art-spotted-train"><TrainFront size={54} strokeWidth={1.5} /><span>IOS / TRANSIT</span></div>;
  }

  if (project.slug === 'linux-server-playbook') {
    return <div className="project-card-art project-card-art-server-playbook"><Server size={54} strokeWidth={1.5} /><span>OPS / SECURITY</span></div>;
  }

  if (project.slug === 'cartridge-store') {
    return <div className="project-card-art project-card-art-cartridge-store"><Package size={54} strokeWidth={1.5} /><span>CATALOG / PRG32</span></div>;
  }

  if (project.slug === 'hackintosh-work') {
    return <div className="project-card-art project-card-art-hackintosh"><Laptop size={54} strokeWidth={1.5} /><span>APPLE / PLATFORM</span></div>;
  }

  return <div className="project-card-art project-card-art-emporion"><Boxes size={54} strokeWidth={1.5} /><span>PRODUCT / SYSTEM</span></div>;
}

/** Compact project card shared by the homepage and project index. */
export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link className="project-card" href={project.href} aria-label={`Open ${project.title} project`}>
      <ProjectCardArt project={project} />
      <div className="project-card-body">
        <div className="project-card-meta"><span>{project.eyebrow}</span>{project.draft && <span>In progress</span>}</div>
        <div className="project-card-content"><h3>{project.title}</h3>
        <p>{project.summary}</p>
        </div>
        <div className="project-card-footer">
        {project.technologies.length > 0 && <ul className="tech-list tech-list-nowrap" title={project.technologies.join(' / ')}>{project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}</ul>}
          <span className="project-card-hint">Read case study <ArrowUpRight size={15} /></span>
        </div>
      </div>
    </Link>
  );
}
