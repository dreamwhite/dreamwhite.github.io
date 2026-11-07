import Link from 'next/link';
import { ArrowUpRight, Boxes, BriefcaseBusiness, Code2, Mail, MapPin, Wrench } from 'lucide-react';
import { PrintButton } from '@/components/print-button';
import { PageToc } from '@/components/page-toc';
import { Portrait } from '@/components/portrait';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { featuredProjects } from '@/content/projects';
import { skillGroups } from '@/content/skills';

export const metadata = { title: 'Resume', description: 'Interactive and print-friendly CV for Ivan Cafiero.' };

export default function ResumePage() {
  return (
    <section className="resume-page shell">
      <div className="resume-toolbar"><p className="resume-kicker">Curriculum vitae</p><PrintButton /></div>

      <header className="resume-profile" id="resume-profile">
        <div className="resume-profile-photo"><Portrait compact /></div>
        <div className="resume-profile-main">
          <p className="resume-profile-label">Ivan Cafiero · dreamwhite</p>
          <h1>Independent software developer.</h1>
          <p className="resume-role">Computer Science student · web applications · systems · infrastructure</p>
          <p className="resume-intro">{profile.intro} I care about system boundaries, correctness, maintainability, and the reasoning behind implementation choices.</p>
          <div className="resume-contact">
            <span><MapPin size={15} />{profile.location}</span>
            <a href="mailto:ivancafiero@gmail.com"><Mail size={15} />ivancafiero@gmail.com</a>
            <a href="https://github.com/dreamwhite" target="_blank" rel="noreferrer"><Code2 size={15} />github.com/dreamwhite</a>
            <a href="https://www.linkedin.com/in/dreamwhite" target="_blank" rel="noreferrer"><BriefcaseBusiness size={15} />linkedin.com/in/dreamwhite</a>
          </div>
        </div>
      </header>

      <div className="resume-layout">
        <main className="resume-main">
          <section className="resume-section" id="resume-experience">
            <div className="resume-section-heading"><div className="resume-section-label"><BriefcaseBusiness size={16} strokeWidth={1.7} /><span>Experience</span></div><h2>Where I have worked and learned.</h2></div>
          <div className="resume-timeline">
            {experience.map((item) => (
              <article className="resume-timeline-item" key={item.title}>
                <p className="resume-period">{item.period}</p>
                <div><h3>{item.title}</h3><p className="resume-organization">{item.organization}</p><p className="resume-description">{item.description}</p><span className="resume-tag">{item.tag}</span></div>
              </article>
            ))}
          </div>
          </section>

          <section className="resume-section" id="resume-projects">
            <div className="resume-section-heading"><div className="resume-section-label"><Boxes size={16} strokeWidth={1.7} /><span>Selected work</span></div><h2>Projects that show the range.</h2></div>
          <div className="resume-project-list">
            {featuredProjects.map((project) => (
              <article className="resume-project" key={project.slug}>
                <div><h3>{project.title}</h3><p>{project.summary}</p></div>
                <Link className="text-link" href={`/projects/${project.slug}/`}>View case study <ArrowUpRight size={15} /></Link>
              </article>
            ))}
          </div>
          </section>
        </main>

        <aside className="resume-sidebar">
          <PageToc items={[{ id: 'resume-profile', label: 'Profile' }, { id: 'resume-experience', label: 'Experience' }, { id: 'resume-projects', label: 'Selected work' }, { id: 'resume-skills', label: 'Skills' }]} />
          <section className="resume-section resume-skills-section" id="resume-skills">
            <div className="resume-section-heading"><div className="resume-section-label"><Wrench size={16} strokeWidth={1.7} /><span>Skills</span></div><h2>Tools I work with.</h2></div>
          <div className="resume-skill-list">
            {skillGroups.map((group) => <div className="resume-skill-row" key={group.label}><h3>{group.label}</h3><p>{group.items.join(' · ')}</p></div>)}
          </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
