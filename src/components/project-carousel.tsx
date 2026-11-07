'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ProjectCardData } from '@/content/projects';
import { ProjectCard } from '@/components/project-card';

type ProjectCarouselProps = {
  projects: ProjectCardData[];
  remainingProjects?: number;
};

/** Accessible, manually controlled project rail shared by the homepage selection. */
export function ProjectCarousel({ projects, remainingProjects = 0 }: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canMovePrevious, setCanMovePrevious] = useState(false);
  const [canMoveNext, setCanMoveNext] = useState(true);
  const itemCount = projects.length + 1;

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll<HTMLElement>('[data-project-card]'));
    const currentOffset = carousel.scrollLeft;
    const closestIndex = cards.reduce((closest, card, index) => {
      const closestDistance = Math.abs(cards[closest].offsetLeft - currentOffset);
      const distance = Math.abs(card.offsetLeft - currentOffset);
      return distance < closestDistance ? index : closest;
    }, 0);

    setActiveIndex(closestIndex);
    setCanMovePrevious(currentOffset > 2);
    setCanMoveNext(currentOffset < carousel.scrollWidth - carousel.clientWidth - 2);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState);
    updateCarouselState();
    return () => {
      carousel.removeEventListener('scroll', updateCarouselState);
      window.removeEventListener('resize', updateCarouselState);
    };
  }, [updateCarouselState]);

  function move(direction: -1 | 1) {
    const nextIndex = Math.max(0, Math.min(itemCount - 1, activeIndex + direction));
    const card = carouselRef.current?.querySelectorAll<HTMLElement>('[data-project-card]')[nextIndex];
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

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
