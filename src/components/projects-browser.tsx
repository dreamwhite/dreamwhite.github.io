'use client';

import { ProjectCard } from '../components/project-card';
import { projectFilters, type ProjectCardData } from '../content/projects';
import { useProjectFilters } from '../hooks/use-project-filters';

/** Interactive project index that filters the compact card projection, not full case-study data. */
export function ProjectsBrowser({ projects }: { projects: ProjectCardData[] }) {
  const { activeFilter, filteredProjects, setActiveFilter } = useProjectFilters(projects);

  return (
    <div className="projects-browser">
      <div className="projects-browser-toolbar" id="project-filters">
        <div className="project-filter-list" aria-label="Filter projects by category" role="group">
          {projectFilters.map((filter) => (
            <button
              className={`project-filter${activeFilter === filter.id ? ' active' : ''}`}
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="projects-browser-count">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</p>
      </div>
      <div className="project-card-grid" id="project-list">
        {filteredProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}
      </div>
    </div>
  );
}
