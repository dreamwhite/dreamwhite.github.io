import Link from 'next/link';
import { ArrowUpRight, Boxes, BriefcaseBusiness, Mail, MapPin, Wrench } from 'lucide-react';
import { DownloadCvButton } from '@/components/download-cv-button';
import { Portrait } from '@/components/portrait';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { featuredProjects } from '@/content/projects';
import { skillGroups } from '@/content/skills';

export const metadata = { title: 'Resume', description: 'Interactive and print-friendly CV for Ivan Cafiero.' };

function GithubMark() {
  return <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.292-1.552 3.297-1.23 3.297-1.23.647 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.575C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
}

function LinkedinMark() {
  return <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.75h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.536zM5.337 7.189a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.555 8.75h3.564v11.702H3.555V8.75zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 .774 24 1.729V22.27C24 23.227 23.2 24 22.225 24" /></svg>;
}

export default function ResumePage() {
  return (
    <section className="resume-page shell">
      <div className="resume-toolbar"><p className="resume-kicker">Curriculum vitae</p><DownloadCvButton /></div>

      <header className="resume-profile" id="resume-profile">
        <div className="resume-profile-photo"><Portrait compact /></div>
        <div className="resume-profile-main">
          <p className="resume-profile-label">Ivan Cafiero · dreamwhite</p>
          <h1>Independent software developer.</h1>
          <p className="resume-role">Computer Science student · web applications · systems · infrastructure</p>
          <p className="resume-intro">{profile.intro} I care about system boundaries, correctness, maintainability, and the reasoning behind implementation choices.</p>
          <div className="resume-contact">
            <span><MapPin size={15} /><span>{profile.location}</span></span>
            <a href="mailto:ivancafiero@gmail.com"><Mail size={15} /><span><strong>Email</strong><small>ivancafiero@gmail.com</small></span></a>
            <a href="https://github.com/dreamwhite" target="_blank" rel="noreferrer"><GithubMark /><span><strong>GitHub</strong><small>@dreamwhite</small></span></a>
            <a href="https://www.linkedin.com/in/dreamwhite" target="_blank" rel="noreferrer"><LinkedinMark /><span><strong>LinkedIn</strong><small>/in/dreamwhite</small></span></a>
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
