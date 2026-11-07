import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, Boxes, Check, Code2, Cpu, Database, Server } from 'lucide-react';
import { featuredProjects } from '@/content/projects';
import { skillCatalog } from '@/content/skill-catalog';
import { PageToc } from '@/components/page-toc';

export const metadata = { title: 'Skills', description: 'Skills and working areas demonstrated across Ivan Cafiero’s software and systems projects.' };

const skillIcons = {
  code: Code2,
  web: Boxes,
  data: Database,
  systems: Server,
  embedded: Cpu,
  quality: Check,
  teaching: BriefcaseBusiness,
};

export default function SkillsPage() {
  return (
    <section className="skills-page shell">
      <div className="skills-page-layout">
      <aside className="internal-page-sidebar"><PageToc items={[{ id: 'skills-catalog', label: 'Skill catalog' }, { id: 'skills-evidence', label: 'Seen in practice' }]} /></aside>
      <div className="skills-page-main">
      <header className="skills-header">
        <div>
          <p className="skills-kicker">Skills</p>
          <h1>What I bring to a system.</h1>
          <p className="skills-intro">A practical map of the languages, tools, and engineering habits that show up across my work. No arbitrary percentages — each area is tied to a project, a role, or a real problem I have worked on.</p>
        </div>
        <p className="skills-note">Based on PRG32, Emporion, MQTT integrations, self-hosted infrastructure, software QA, teaching, and independent development.</p>
      </header>

      <div className="skills-catalog" id="skills-catalog">
        {skillCatalog.map((group) => {
          const Icon = skillIcons[group.icon];

          return (
            <section className="skill-category" key={group.title}>
              <div className="skill-category-heading">
                <Icon size={19} strokeWidth={1.7} />
                <div><h2>{group.title}</h2><p>{group.description}</p></div>
              </div>
              <ul className="skill-catalog-list">
                {group.skills.map((skill) => <li key={skill.name}><strong>{skill.name}</strong><span>{skill.context}</span></li>)}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="skills-evidence" id="skills-evidence">
        <div><p className="skills-kicker">Seen in practice</p><h2>The projects are the proof.</h2></div>
        <div className="skills-evidence-list">
          {featuredProjects.map((project) => <Link className="skills-evidence-link" href={`/projects/${project.slug}/`} key={project.slug}><span><strong>{project.title}</strong><small>{project.eyebrow}</small></span><ArrowUpRight size={17} /></Link>)}
          <Link className="skills-evidence-link" href="/hackintosh/"><span><strong>Hackintosh systems work</strong><small>Firmware, ACPI, diagnostics and OpenCore tooling</small></span><ArrowUpRight size={17} /></Link>
        </div>
      </section>
      </div>
      </div>
    </section>
  );
}
