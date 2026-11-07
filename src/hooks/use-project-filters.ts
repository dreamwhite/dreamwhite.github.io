'use client';

import { useMemo, useState } from 'react';
import type { ProjectCategory } from '@/content/projects';

type FilterableProject = { categories: ProjectCategory[] };

/** Keeps project filter state and the derived project collection together. */
export function useProjectFilters<T extends FilterableProject>(projects: T[]) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const filteredProjects = useMemo(
    () => activeFilter === 'all' ? projects : projects.filter((project) => project.categories.includes(activeFilter)),
    [activeFilter, projects],
  );

  return { activeFilter, filteredProjects, setActiveFilter };
}
