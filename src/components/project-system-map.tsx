'use client';

import { useState } from 'react';
import { Boxes, Cpu, Laptop, Server, Smartphone, Wrench } from 'lucide-react';
import type { ProjectCardData, ProjectCategory } from '../content/projects';

type MapNode = {
  id: ProjectCategory;
  label: string;
  detail: string;
  icon: typeof Boxes;
};

const nodes: MapNode[] = [
  { id: 'product', label: 'Product', detail: 'Interfaces, platforms and the services behind them.', icon: Boxes },
  { id: 'embedded', label: 'Embedded', detail: 'Hardware boundaries, firmware and low-level runtimes.', icon: Cpu },
  { id: 'mobile', label: 'Mobile', detail: 'Client applications built around real-world data.', icon: Smartphone },
  { id: 'systems', label: 'Systems', detail: 'Infrastructure, integrations and operational tooling.', icon: Server },
  { id: 'platform', label: 'Platform', detail: 'macOS, firmware, ACPI and device behaviour.', icon: Laptop },
  { id: 'tooling', label: 'Tooling', detail: 'Small tools that make technical work repeatable.', icon: Wrench },
];

/** Interactive overview of the disciplines represented in the project archive. */
export function ProjectSystemMap({ projects }: { projects: ProjectCardData[] }) {
  const [activeId, setActiveId] = useState<ProjectCategory>('product');
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];
  const countFor = (id: ProjectCategory) => projects.filter((project) => project.categories.includes(id)).length;

  return (
    <div className="project-system-map" aria-label="Project system map">
      <div className="project-system-map-topline"><span>Project map</span><span>{projects.length} projects</span></div>
      <div className="project-system-map-core">
        <div className="project-system-map-center"><span>DW</span><strong>Software<br />&amp; systems</strong></div>
        <div className="project-system-map-nodes">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isActive = activeId === node.id;
            return (
              <button className={`project-system-map-node${isActive ? ' active' : ''}`} key={node.id} type="button" aria-pressed={isActive} onClick={() => setActiveId(node.id)}>
                <span className="project-system-map-node-icon"><Icon size={16} strokeWidth={1.7} /></span>
                <span><strong>{node.label}</strong><small>{String(countFor(node.id)).padStart(2, '0')} projects</small></span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="project-system-map-detail"><span>{activeNode.label}</span><p>{activeNode.detail}</p></div>
    </div>
  );
}
