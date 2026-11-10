import { existsSync } from 'node:fs';
import path from 'node:path';
import { projectSlugs, projects, projectCards } from '../src/content/projects';

const errors: string[] = [];
const projectSlugSet = new Set(projects.map((project) => project.slug));

if (projectSlugSet.size !== projects.length) {
  errors.push('Project slugs must be unique.');
}

for (const slug of projectSlugs) {
  if (!projectSlugSet.has(slug)) errors.push(`Missing project data for route slug: ${slug}`);
}

for (const project of projects) {
  if (!project.title.trim()) errors.push(`${project.slug}: title is empty.`);
  if (!project.summary.trim()) errors.push(`${project.slug}: summary is empty.`);
  if (project.links.some((link) => !link.label.trim() || !link.href.trim())) {
    errors.push(`${project.slug}: contains an empty link label or href.`);
  }

  for (const media of project.media ?? []) {
    if (media.src.startsWith('/')) {
      const localPath = path.join(process.cwd(), 'public', media.src.slice(1));
      if (!existsSync(localPath)) errors.push(`${project.slug}: missing local media ${media.src}`);
    }
  }
}

if (new Set(projectCards.map((project) => project.slug)).size !== projectCards.length) {
  errors.push('Project card slugs must be unique.');
}

if (errors.length > 0) {
  console.error(errors.map((error) => `✖ ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ Validated ${projects.length} case studies and ${projectCards.length} project cards.`);
}
