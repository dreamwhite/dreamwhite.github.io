import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { Portrait } from '@/components/portrait';
import { ProjectCarousel } from '@/components/project-carousel';
import { homepageProjectCards } from '@/content/projects';
import { profile } from '@/content/profile';

export default function HomePage() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-identity"><span>Ivan Cafiero</span><span className="hero-identity-divider" aria-hidden="true">/</span><span>Software developer</span></p>
            <h1>I build things that<br /><em>have to work.</em></h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <Link className="button" href="#work">Explore selected work <ArrowDownRight size={16} /></Link>
              <Link className="button secondary" href="https://www.linkedin.com/in/dreamwhite" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="hero-side">
            <Portrait />
          </div>
        </div>
      </section>

      <section className="home-project-section" id="work">
        <div className="shell">
          <div className="home-project-heading"><div><p className="eyebrow"><span className="eyebrow-dot" />Selected projects</p><h2>Things I built and can explain.</h2></div></div>
          <ProjectCarousel projects={homepageProjectCards} remainingProjects={4} />
        </div>
      </section>

      <section className="home-contact-section">
        <div className="home-contact-panel">
          <div className="shell home-contact-inner">
            <div className="home-contact-copy">
              <p className="eyebrow home-contact-eyebrow"><span className="eyebrow-dot" />Get in touch</p>
              <h2>Tell me what<br /><em>you are building.</em></h2>
              <p>Have a project, a technical problem, or an interesting collaboration in mind? Send me a note.</p>
            </div>
            <div className="home-contact-card">
              <div className="home-contact-card-top"><span>Start a conversation</span><Mail size={18} strokeWidth={1.6} /></div>
              <a className="home-contact-email" href="mailto:ivancafiero@gmail.com">ivancafiero@gmail.com <ArrowUpRight size={17} /></a>
              <p className="home-contact-card-note">For project work, collaboration, or a technical problem worth unpacking.</p>
              <div className="home-contact-links">
                <a href="https://www.linkedin.com/in/dreamwhite" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
                <Link href="/contact/">Contact details <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
