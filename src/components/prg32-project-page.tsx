import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Code2, Gamepad2, MonitorCog, Store, Wrench } from 'lucide-react';
import type { Project } from '../content/projects';
import { prg32Media } from '../content/project-media';
import { ProjectCaseStudyLayout } from '../components/project-case-study-layout';
import { ProjectMediaGallery } from '../components/project-media-gallery';
import { CaseStudySection } from '../components/case-study-section';

const facts = [
  ['Runtime', 'Native RV32IMAC machine code with a small init / update / draw cartridge loop.'],
  ['Hardware', 'ESP32-C6 board, ILI9341 display, joystick, buttons, and optional audio.'],
  ['Desktop path', 'An Espressif QEMU target for testing the runtime and cartridges without the physical board.'],
  ['Web workflow', 'Cartridge Store and Construction Kit deployments through the browser Web Serial API.'],
];

const credits = [
  ['Raffaele Montella', 'Academic supervisor / project lead'],
  ['Simone Boscaglia', 'BSc Computer Science student'],
  ['Ivan Cafiero', 'BSc Computer Science student'],
  ['Dario Caramiello', 'MSc Computer Science student'],
  ['Giuseppe Coviello', 'Contributor'],
];

const contribution = [
  ['QEMU runtime', 'Made the desktop/emulator path usable for development and testing when the physical board was not available.'],
  ['Documentation', 'Improved the project documentation around setup, workflows and the relationship between the runtime, cartridges and tools.'],
  ['Testing', 'Tested the runtime, QEMU path, cartridges, hardware flows and web tooling across the parts of the platform that need to agree.'],
  ['Cartridge Store rewrite', 'Reworked the Store in the development branch from its earlier Flask path to a Fastify service and Next.js PWA surface.'],
];

const appearances = [
  {
    event: 'IEEE eScience 2026',
    format: 'Poster + live demo',
    text: 'PRG32 was presented as part of the Poster & Demo programme in Naples, alongside the paper “A Retro-Gaming Platform for Teaching RISC-V Programming in Higher Education.”',
    href: 'https://www.escience-conference.org/2026/timetable',
  },
  {
    event: 'Maker Faire Rome 2026',
    format: 'Live demo session',
    text: 'A public, hands-on demonstration of the platform, its runtime and the games running on the hardware.',
  },
];

const publicationAuthors = 'Raffaele Montella, Simone Boscaglia, Ivan Cafiero, Dario Caramiello, Paola Barra, Iacopo Colonnelli, Marco Lapegna';

const workflow = [
  { number: '01', title: 'Build', text: 'Write a cartridge in RISC-V assembly or C, then package it as a portable .prg32 artifact.', icon: Code2 },
  { number: '02', title: 'Explore', text: 'Use the Construction Kit to make games with blocks, C or assembly, sprites, and sound in the browser.', icon: Wrench },
  { number: '03', title: 'Run', text: 'Install cartridges from the Store or the Kit onto a console over native USB and start them on the board.', icon: Gamepad2 },
  { number: '04', title: 'Test', text: 'Use the QEMU workflow and the runtime tooling to validate cartridges before taking them to hardware.', icon: MonitorCog },
];

const linkDetails = [
  {
    label: 'Project repository',
    description: 'Read the runtime, cartridge format, firmware, and emulator code behind the platform.',
    icon: Code2,
  },
  {
    label: 'Cartridge Store',
    description: 'Browse published games and see how cartridges move from a built artifact to the hardware.',
    icon: Store,
  },
  {
    label: 'Construction Kit',
    description: 'Build and package cartridges from the browser before taking them to a PRG32 board.',
    icon: Wrench,
  },
];

const toc = [
  { id: 'prg32-overview', label: 'What it is' },
  { id: 'prg32-contribution', label: 'My contribution' },
  { id: 'prg32-credits', label: 'Credits & appearances' },
  { id: 'prg32-platform', label: 'Inside the platform' },
  { id: 'prg32-media', label: 'The system in use' },
  { id: 'prg32-links', label: 'Continue with PRG32' },
];

export function Prg32ProjectPage({ project }: { project: Project }) {
  return (
    <>
      <section className="prg32-hero">
        <div className="shell">
          <Link className="text-link prg32-back-link" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="prg32-hero-grid">
            <div className="prg32-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />PRG32 / embedded education</p>
              <p className="prg32-official-name">Platform for RISC-V Gaming Development (32-bit)</p>
              <h1>Learn systems<br /><em>by building games.</em></h1>
              <p className="prg32-hero-lede">{project.summary}</p>
              <div className="prg32-hero-actions">
                {project.links.map((link, index) => (
                  <Link className={`button ${index > 0 ? 'secondary' : ''}`} href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="prg32-hero-visual"><Image src="/images/projects/prg32/logo.png" alt="PRG32 logo" fill priority sizes="(max-width: 860px) 100vw, 460px" /><span>ESP32-C6 / RV32IMAC</span></div>
          </div>
        </div>
      </section>

      <ProjectCaseStudyLayout toc={toc}>
      <CaseStudySection id="prg32-overview" className="prg32-section" headingClassName="prg32-section-heading" labelClassName="prg32-label" label="What it is" title="An educational runtime with a real hardware boundary." shell>
          <div className="prg32-overview-grid">
            <p className="prg32-lede">PRG32 is an open-source platform for teaching RISC-V assembly and C through retro-game cartridges. The code runs on an ESP32-C6 board, or through the project&apos;s desktop QEMU path, with the hardware and software boundary kept visible.</p>
            <div className="prg32-facts">{facts.map(([label, text]) => <div className="prg32-fact" key={label}><span>{label}</span><p>{text}</p></div>)}</div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="prg32-contribution" className="prg32-section" headingClassName="prg32-section-heading compact" labelClassName="prg32-label" label="My contribution" title="The parts I helped make work." shell intro={
        <p className="prg32-gallery-note">My contribution was mostly on the edges where the project becomes usable: getting the emulator path into shape, making the work easier to follow, testing the pieces together and rebuilding the Store surface.</p>
      }>
          <div className="prg32-contribution-grid">
            {contribution.map(([title, text], index) => (
              <div className="prg32-contribution-row" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
      </CaseStudySection>

      <CaseStudySection id="prg32-credits" className="prg32-section prg32-credits-section" headingClassName="prg32-section-heading compact" labelClassName="prg32-label" label="Credits & public work" title="A shared project, with a visible contribution." shell intro={
        <p className="prg32-gallery-note">PRG32 is an open-source, open-hardware, non-profit research prototype developed at the University of Naples Parthenope. My work sits inside a broader team effort, so the people and the public moments belong in the case study too.</p>
      }>
          <div className="prg32-credits-grid">
            <div className="prg32-credit-list">
              <div className="prg32-credit-heading"><span>Project credits</span><strong>University of Naples Parthenope</strong></div>
              {credits.map(([name, role]) => <div className="prg32-credit-row" key={name}><strong>{name}</strong><span>{role}</span></div>)}
            </div>
            <div className="prg32-appearances">
              {appearances.map((appearance) => (
                <div className="prg32-appearance" key={appearance.event}>
                  <div className="prg32-appearance-top"><span>{appearance.format}</span>{appearance.href ? <Link href={appearance.href} target="_blank" rel="noreferrer"><ArrowUpRight size={15} /></Link> : null}</div>
                  <h3>{appearance.event}</h3>
                  <p>{appearance.text}</p>
                </div>
              ))}
              <div className="prg32-publication"><span>eScience paper authors</span><p>{publicationAuthors}</p><Link className="text-link" href="https://www.escience-conference.org/2026/papers" target="_blank" rel="noreferrer">View the accepted paper list <ArrowUpRight size={15} /></Link></div>
            </div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="prg32-platform" className="prg32-section prg32-surface-section" headingClassName="prg32-section-heading compact" labelClassName="prg32-label" label="Inside the platform" title="From source code to a running cartridge." shell>
          <div className="prg32-workflow-grid">
            {workflow.map(({ number, title, text, icon: Icon }) => (
              <div className="prg32-workflow-card" key={number}>
                <div className="prg32-workflow-top"><span>{number}</span><Icon size={20} strokeWidth={1.7} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
      </CaseStudySection>

      <CaseStudySection id="prg32-media" className="prg32-section" headingClassName="prg32-section-heading compact" labelClassName="prg32-label" label="The system in use" title="The platform is easier to understand when you can see it running." shell intro={
        <p className="prg32-gallery-note">Public screens from the official <Link href="https://github.com/riscv-prg32/prg32" target="_blank" rel="noreferrer">PRG32 repository</Link>: the firmware menus, the runtime, the cartridge catalogue and the wider ecosystem around the board.</p>
      }>
          <ProjectMediaGallery items={prg32Media} className="prg32-gallery-grid" />
      </CaseStudySection>

      <CaseStudySection id="prg32-links" className="prg32-section prg32-links-section" headingClassName="prg32-section-heading compact" labelClassName="prg32-label" label="Continue with PRG32" title="Three ways into the platform." shell intro={
        <p className="prg32-links-description">The project is intentionally split across the code, the distribution surface, and the browser-based toolchain. Start with the layer that interests you.</p>
      }>
          <div className="prg32-link-grid">
            {project.links.map((link) => {
              const detail = linkDetails.find((item) => item.label === link.label);
              const Icon = detail?.icon ?? ArrowUpRight;

              return (
                <Link className="prg32-link-card" href={link.href} key={link.href} target="_blank" rel="noreferrer">
                  <div className="prg32-link-card-top"><span className="prg32-link-card-icon"><Icon size={18} /></span><ArrowUpRight className="prg32-link-card-arrow" size={18} /></div>
                  <strong>{link.label}</strong>
                  <p>{detail?.description ?? 'Open the public project surface and continue exploring the PRG32 ecosystem.'}</p>
                </Link>
              );
            })}
          </div>
      </CaseStudySection>
      </ProjectCaseStudyLayout>
    </>
  );
}
