import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageToc } from '../../components/page-toc';
import { Portrait } from '../../components/portrait';
import { profile, socials } from '../../content/profile';
import { skillGroups } from '../../content/skills';

export const metadata = { title: 'About', description: 'About Ivan Cafiero, the developer behind dreamwhite.' };

const toc = [
  { id: 'about-story', label: 'A bit about me' },
  { id: 'about-now', label: 'Right now' },
  { id: 'about-tools', label: 'Tools I use' },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero shell">
        <div className="about-overline"><span>About</span><span>{profile.location}</span></div>
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <h1>Software developer interested in what happens underneath.</h1>
            <p className="about-hero-lede">{profile.intro}</p>
            <div className="about-links">
              <Link className="text-link" href="/experience/">Experience <ArrowUpRight size={15} /></Link>
              <Link className="text-link" href="/hackintosh/">Hackintosh work <ArrowUpRight size={15} /></Link>
              <Link className="text-link" href="/resume/">Resume <ArrowUpRight size={15} /></Link>
              <Link className="text-link" href={socials[1].href} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></Link>
            </div>
          </div>
          <Portrait compact />
        </div>
      </section>

      <div className="internal-page-body shell">
        <aside className="internal-page-sidebar"><PageToc items={toc} /></aside>
        <section className="about-content internal-page-main">
        <div className="about-story-grid" id="about-story">
          <p className="about-label">A bit about me</p>
          <div className="about-story">
            <p className="about-story-lede">I like software most when it makes you curious about what is underneath it.</p>
            <p>{profile.philosophy}</p>
            <p>I move between web applications, backend services, embedded computing, Linux, and the infrastructure that keeps those things useful. I learn by building, debugging, documenting, and asking better questions.</p>
          </div>
        </div>

        <div className="about-now-grid" id="about-now">
          <p className="about-label">Right now</p>
          <div className="about-now-content">
            <div className="about-now-summary"><strong>{profile.status}</strong><span>{profile.location}</span></div>
            <ul>{profile.currentFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul>
          </div>
        </div>

        <div className="about-tools" id="about-tools">
          <div className="about-tools-heading">
            <p className="about-label">Tools I use</p>
            <h2>Enough range to follow a problem across layers.</h2>
          </div>
          <div className="about-skill-list">
            {skillGroups.map((group) => (
              <div className="about-skill-row" key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
