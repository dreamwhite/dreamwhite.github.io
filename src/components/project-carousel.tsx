'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ProjectCardData } from '../content/projects';
import { ProjectCard } from '../components/project-card';
import { useCarousel } from '../hooks/use-carousel';

type ProjectCarouselProps = {
  projects: ProjectCardData[];
  remainingProjects?: number;
};

/** Accessible, manually controlled project rail shared by the homepage selection. */
export function ProjectCarousel({ projects, remainingProjects = 0 }: ProjectCarouselProps) {
  const itemCount = projects.length + 1;
  const { carouselRef, activeIndex, canMovePrevious, canMoveNext, setActiveIndex, move } = useCarousel(itemCount);

  return (
    <div className="project-carousel-shell">
      <div className="project-carousel" ref={carouselRef} aria-label="Selected projects" role="region">
        {projects.map((project, index) => (
          <div className="project-carousel-item" data-project-card key={project.slug} onFocus={() => setActiveIndex(index)} onMouseEnter={() => setActiveIndex(index)}>
            <ProjectCard project={project} />
          </div>
        ))}
        <Link className="project-carousel-more project-carousel-item" data-project-card href="/projects/" onFocus={() => setActiveIndex(projects.length)} onMouseEnter={() => setActiveIndex(projects.length)}>
          <span className="project-carousel-more-kicker">Beyond this selection</span>
          <span className="project-carousel-more-title">The full project archive <ArrowUpRight size={18} /></span>
          <span className="project-carousel-more-copy">More work across infrastructure, platforms, tooling and the PRG32 ecosystem.</span>
          <span className="project-carousel-more-list" aria-hidden="true">
            <span><b>01</b> Open-source systems</span>
            <span><b>02</b> Linux infrastructure</span>
            <span><b>03</b> Apple platform work</span>
          </span>
          <span className="project-carousel-more-footer"><span>+{String(remainingProjects).padStart(2, '0')} more projects</span><ArrowUpRight size={15} /></span>
        </Link>
      </div>
      <div className="project-carousel-controls">
        <span className="project-carousel-count" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} / {String(itemCount).padStart(2, '0')}
        </span>
        <div className="project-carousel-buttons">
          <button className="project-carousel-button" type="button" onClick={() => move(-1)} disabled={!canMovePrevious} aria-label="Previous project">
            <ArrowLeft size={16} />
          </button>
          <button className="project-carousel-button" type="button" onClick={() => move(1)} disabled={!canMoveNext} aria-label="Next project">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
