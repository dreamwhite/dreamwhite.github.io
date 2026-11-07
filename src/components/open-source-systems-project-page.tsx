import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FileCode2,
  HardDrive,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';
import { CaseStudySection } from '@/components/case-study-section';

const toc = [
  { id: 'open-source-overview', label: 'What this is' },
  { id: 'open-source-workstreams', label: 'Workstreams' },
  { id: 'open-source-repositories', label: 'Public repositories' },
  { id: 'open-source-method', label: 'How I work' },
];

const workstreams = [
  {
    icon: HardDrive,
    label: '01 / Infrastructure',
    title: 'Servers that can be checked, not just provisioned.',
    text: 'The Linux Server Playbook turns a fresh Ubuntu host into a documented baseline: access, firewalling, Docker, Fail2Ban, DNS and validation all belong to the same operational sequence.',
  },
  {
    icon: ShieldCheck,
    label: '02 / Platform tooling',
    title: 'Tools for the boundary between firmware and macOS.',
    text: 'OpenCore validators, configuration sanitizers and small diagnostic utilities make platform work easier to inspect, share and repeat without exposing machine-specific data.',
  },
  {
    icon: BookOpen,
    label: '03 / Technical guides',
    title: 'Documentation for the parts that are usually implicit.',
    text: 'The public guides collect the reasoning around BIOS extraction, CFG Lock, ACPI and battery behaviour. They are practical references, not claims that every machine behaves the same way.',
  },
];

const repositories = [
  {
    group: 'Systems & operations',
    icon: HardDrive,
    items: [
      {
        title: 'Linux Server Playbook',
        detail: 'A repeatable Ubuntu server baseline with explicit hardening, validation and recovery paths.',
        technologies: 'Ubuntu · OpenSSH · UFW · Docker · Fail2Ban',
        href: 'https://github.com/dreamwhite/linux-server-playbook',
      },
      {
        title: 'dotfiles',
        detail: 'Personal shell, terminal and editor configuration collected as a practical working environment.',
        technologies: 'Zsh · macOS · iTerm2 · VS Code',
        href: 'https://github.com/dreamwhite/dotfiles',
      },
    ],
  },
  {
    group: 'Platform & diagnostics',
    icon: Wrench,
    items: [
      {
        title: 'OCValidamus',
        detail: 'Checks that an OpenCore support pack contains the expected ACPI, drivers, kexts and tools.',
        technologies: 'Python · OpenCore · EFI',
        href: 'https://github.com/dreamwhite/OCValidamus',
      },
      {
        title: 'OC-Anonymizer',
        detail: 'Removes machine-specific identifiers from an OpenCore config before it is shared online.',
        technologies: 'Python · config.plist · privacy',
        href: 'https://github.com/dreamwhite/OC-Anonymizer',
      },
      {
        title: 'ocvalidate-ci',
        detail: 'Runs OpenCore configuration validation as a GitHub Actions check instead of a manual last step.',
        technologies: 'GitHub Actions · CI · OpenCore',
        href: 'https://github.com/dreamwhite/ocvalidate-ci',
      },
      {
        title: 'ioreg2py',
        detail: 'A small Python utility for turning IORegistryExplorer output into something easier to inspect.',
        technologies: 'Python · macOS · diagnostics',
        href: 'https://github.com/dreamwhite/ioreg2py',
      },
      {
        title: 'Utopia Team',
        detail: 'My own platform-work organisation: public Thunderbolt resources, SSDT references and IORegistryExplorer archive/release work.',
        technologies: 'Thunderbolt · SSDT · IORegistryExplorer · macOS',
        href: 'https://github.com/utopia-team',
      },
    ],
  },
  {
    group: 'Firmware & documentation',
    icon: FileCode2,
    items: [
      {
        title: 'BIOS Extraction Guide',
        detail: 'Notes for extracting firmware payloads and inspecting settings such as CFG Lock with the right caveats.',
        technologies: 'UEFITool · IFR · BIOS · firmware',
        href: 'https://github.com/dreamwhite/bios-extraction-guide',
      },
      {
        title: 'ACPI Battery Patching Guide',
        detail: 'A reference around EC fields, battery reporting and the ACPI layer exposed to macOS.',
        technologies: 'ACPI · ASL · EC · OpenCore',
        href: 'https://github.com/dreamwhite/acpi-battery-patching-guide',
      },
      {
        title: 'OC-Little Translated',
        detail: 'Translated and collected references for understanding OpenCore ACPI hotpatches and platform behaviour.',
        technologies: 'ACPI · OpenCore · documentation',
        href: 'https://github.com/dreamwhite/OC-Little-Translated',
      },
    ],
  },
];

const workingPrinciples = [
  ['Make the boundary visible', 'A server, a firmware patch or a CI check should state what it assumes and what it does not control.'],
  ['Validate the resulting state', 'The command finishing successfully is not the same thing as the system being in the intended state.'],
  ['Keep the work shareable', 'Sensitive identifiers, fragile shortcuts and machine-specific details should not be prerequisites for understanding the approach.'],
];

export function OpenSourceSystemsProjectPage({ project }: { project: Project }) {
  return (
    <>
      <header className="open-source-hero">
        <div className="shell">
          <Link className="text-link open-source-back" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="open-source-hero-grid">
            <div className="open-source-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
              <h1>Tools and guides for the layers people usually skip.</h1>
              <p>{project.summary} This page is a curated index of public work, not a single product or a dump of every repository.</p>
            </div>
            <div className="open-source-signal" aria-label="Open-source work overview">
              <div className="open-source-signal-head"><span>PUBLIC SURFACE</span><CheckCircle2 size={18} /></div>
              <div className="open-source-signal-row"><span>01</span><strong>Infrastructure</strong><small>Provision · harden · verify</small></div>
              <div className="open-source-signal-row"><span>02</span><strong>Platform tooling</strong><small>Inspect · sanitize · automate</small></div>
              <div className="open-source-signal-row"><span>03</span><strong>Technical guides</strong><small>Explain · qualify · share</small></div>
              <Link className="open-source-signal-link" href="https://github.com/dreamwhite" target="_blank" rel="noreferrer">Browse the public profile <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </header>

      <ProjectCaseStudyLayout toc={toc} className="open-source-case-study">
        <main className="open-source-content">
          <CaseStudySection id="open-source-overview" className="open-source-section open-source-overview" headingClassName="open-source-section-heading" labelClassName="open-source-label" label="What this is" title="A public trail through practical systems work." headingLayout="split" shell intro={
                <p className="open-source-lede">I use open source to make the difficult middle layers easier to reason about: the host beneath an application, the firmware beneath an operating system, and the checks that keep a configuration honest.</p>
          }>
            <p className="open-source-copy">The repositories below are deliberately grouped by the kind of problem they solve. They include finished utilities, living documentation and focused experiments. The common thread is not a framework; it is making assumptions visible and leaving someone else with a useful starting point.</p>
          </CaseStudySection>

          <CaseStudySection id="open-source-workstreams" className="open-source-section open-source-workstreams" headingClassName="open-source-section-heading compact" labelClassName="open-source-label" label="Workstreams" title="Different surfaces, the same care for the boundary." headingLayout="split" shell intro={
                <p className="open-source-copy">These are the areas where my public work is most representative. Product projects such as PRG32, Emporion and Spotted Train have their own case studies.</p>
          }>
            <div className="open-source-work-grid">
              {workstreams.map(({ icon: Icon, label, title, text }) => (
                <article className="open-source-work-card" key={label}>
                  <div className="open-source-card-top"><span>{label}</span><Icon size={19} strokeWidth={1.8} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="open-source-repositories" className="open-source-section open-source-repositories" headingClassName="open-source-section-heading compact" labelClassName="open-source-label" label="Public repositories" title="Start with the work, then open the source." headingLayout="split" shell intro={
                <p className="open-source-copy">A short, verified selection of repositories that explain what I build and what I care about. Each entry has a job here; none is filler.</p>
          }>
            <div className="open-source-repository-groups">
              {repositories.map(({ group, icon: Icon, items }) => (
                <div className="open-source-repository-group" key={group}>
                  <div className="open-source-group-title"><Icon size={17} /><h3>{group}</h3></div>
                  <div className="open-source-repository-list">
                    {items.map((item) => (
                      <Link className="open-source-repository" href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                        <span className="open-source-repository-copy"><strong>{item.title}</strong><span>{item.detail}</span><small>{item.technologies}</small></span>
                        <ArrowUpRight size={17} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="open-source-method" className="open-source-section open-source-method" headingClassName="open-source-section-heading compact" labelClassName="open-source-label" label="How I work" title="Useful before impressive." headingLayout="split" shell intro={
                <p className="open-source-copy">The portfolio version is intentionally concise. The repositories contain the commands and implementation details; this is the perspective that connects them.</p>
          }>
            <div className="open-source-principles">
              {workingPrinciples.map(([title, text], index) => (
                <div className="open-source-principle" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></div>
              ))}
            </div>
            <Link className="text-link open-source-final-link" href="https://github.com/dreamwhite" target="_blank" rel="noreferrer">See the full public profile <ArrowUpRight size={15} /></Link>
          </CaseStudySection>
        </main>
      </ProjectCaseStudyLayout>
    </>
  );
}
