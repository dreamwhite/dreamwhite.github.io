import { ArrowUpRight, GitBranch, Server, Terminal } from 'lucide-react';
import type { Project } from '@/content/projects';

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const icon = project.slug === 'prg32' ? <Server size={18} /> : project.slug === 'open-source-systems' ? <Terminal size={18} /> : <GitBranch size={18} />;

  return (
    <div className={compact ? 'project-visual compact' : 'project-visual'} aria-label={`${project.title} editorial project placeholder`}>
      <div className="visual-grid" />
      <div className="visual-topline"><span>{project.eyebrow}</span><ArrowUpRight size={15} /></div>
      <div className="visual-core">
        <div className="visual-icon">{icon}</div>
        <div className="visual-title">{project.title}</div>
        <div className="visual-line" />
        <div className="visual-line short" />
      </div>
      <div className="visual-bottomline"><span>CASE STUDY</span><span className="visual-signal" /></div>
    </div>
  );
}
