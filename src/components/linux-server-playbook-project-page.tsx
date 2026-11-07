import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';
import { CaseStudySection } from '@/components/case-study-section';

const toc = [
  { id: 'playbook-overview', label: 'What it is' },
  { id: 'playbook-sequence', label: 'The sequence' },
  { id: 'playbook-discipline', label: 'Operational discipline' },
  { id: 'playbook-scope', label: 'Scope and source' },
];

const chapters = [
  ['01', 'Server preparation', 'Start from a known Ubuntu LTS image and record the initial state.'],
  ['02', 'Provider notes', 'Keep provider controls and recovery access in the plan from the beginning.'],
  ['03', 'User management', 'Create the named administrator and establish key-only access.'],
  ['04', 'SSH hardening', 'Change the remote-access posture while keeping a verified path open.'],
  ['05', 'UFW firewall', 'Use deny-by-default ingress and expose only the services that are intentional.'],
  ['06', 'Docker', 'Install Docker through a reviewable path and verify the resulting runtime.'],
  ['07', 'Fail2Ban', 'Add a second layer of protection for services that remain reachable.'],
  ['08', 'DNS', 'Connect the host to its forward and reverse naming expectations.'],
  ['09', 'Validation', 'Collect evidence for the effective state, not just successful commands.'],
  ['10', 'Troubleshooting', 'Keep recovery paths and inspection steps available when access is uncertain.'],
];

const discipline = [
  {
    icon: ShieldCheck,
    title: 'Access changes are staged',
    text: 'Before changing SSH or firewall rules, the playbook asks for provider console access, a second terminal and a still-open current session. The new path is tested before the old one is removed.',
  },
  {
    icon: CheckCircle2,
    title: 'Evidence proves the state',
    text: 'The final checklist retains the effective SSH configuration, listening sockets, firewall rules, Docker test result, Fail2Ban state and DNS answers. A command exiting successfully is not enough.',
  },
  {
    icon: Terminal,
    title: 'Manual by design',
    text: 'This is an explicit operational standard, not a one-click installer. Once the behaviour is stable, the same decisions can be encoded in cloud-init, Ansible or an image pipeline.',
  },
];

export function LinuxServerPlaybookProjectPage({ project }: { project: Project }) {
  return (
    <>
      <header className="server-playbook-hero">
        <div className="shell">
          <Link className="text-link server-playbook-back" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="server-playbook-hero-grid">
            <div className="server-playbook-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
              <h1>A server baseline you can reason about.</h1>
              <p>{project.summary}</p>
            </div>
            <div className="server-playbook-signal" aria-label="Golden Server characteristics">
              <div className="server-playbook-signal-head"><span>GOLDEN SERVER</span><Server size={18} /></div>
              <div className="server-playbook-signal-row"><span>01</span><strong>Updated</strong><small>Known package and reboot state</small></div>
              <div className="server-playbook-signal-row"><span>02</span><strong>Hardened</strong><small>Named access and explicit exposure</small></div>
              <div className="server-playbook-signal-row"><span>03</span><strong>Docker-ready</strong><small>Validated before applications arrive</small></div>
            </div>
          </div>
        </div>
      </header>

      <ProjectCaseStudyLayout toc={toc} className="server-playbook-case-study">
        <main className="server-playbook-content">
          <CaseStudySection id="playbook-overview" className="server-playbook-section" headingClassName="server-playbook-section-heading" labelClassName="server-playbook-label" label="What it is" title="From a fresh host to a known state." headingLayout="split" shell>
                <p className="server-playbook-lede">The Linux Server Playbook records my personal engineering standard for preparing a new Ubuntu LTS server before any application is deployed on it.</p>
                <p className="server-playbook-copy">It keeps the decisions, safe execution order, validation evidence and recovery paths together. The goal is not to hide server operations behind a script; it is to make the system reviewable enough that a future automation still preserves the reasoning behind it.</p>
                <div className="server-playbook-tags" aria-label="Playbook outcomes">
                  <span>Updated</span><span>Hardened</span><span>Reproducible</span><span>Production-ready</span>
                </div>
          </CaseStudySection>

          <CaseStudySection id="playbook-sequence" className="server-playbook-section" headingClassName="server-playbook-section-heading compact" labelClassName="server-playbook-label" label="The sequence" title="Security is also an order of operations." headingLayout="split" shell>
                <p className="server-playbook-copy">An SSH port change affects the host firewall, the provider firewall, Fail2Ban, the client configuration and the validation plan. The chapters are arranged as one controlled build rather than a list of unrelated commands.</p>
            <div className="server-playbook-chapters">
              {chapters.map(([number, title, text]) => (
                <div className="server-playbook-chapter" key={number}>
                  <span>{number}</span><strong>{title}</strong><p>{text}</p>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="playbook-discipline" className="server-playbook-section" headingClassName="server-playbook-section-heading compact" labelClassName="server-playbook-label" label="Operational discipline" title="Useful when the server is still empty." headingLayout="split" shell>
                <p className="server-playbook-copy">The value is in the decisions around the commands: what must remain reachable, what needs evidence and where recovery lives if a remote change goes wrong.</p>
            <div className="server-playbook-discipline-grid">
              {discipline.map(({ icon: Icon, title, text }) => (
                <article className="server-playbook-discipline-card" key={title}>
                  <div className="server-playbook-card-icon"><Icon size={18} strokeWidth={1.8} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="playbook-scope" className="server-playbook-section" headingClassName="server-playbook-section-heading compact" labelClassName="server-playbook-label" label="Scope and source" title="A baseline, not an application deployment guide." headingLayout="split" shell>
                <p className="server-playbook-copy">The playbook intentionally stops before reverse proxies, databases, observability stacks, project secrets and application-specific configuration. Those belong to the project deployed on top of the server.</p>
                <div className="server-playbook-source">
                  <BookOpen size={17} />
                  <span><strong>Read the full operational runbook</strong><small>Commands, checklists, troubleshooting and references live in the repository.</small></span>
                  <Link href={project.links[0]?.href ?? 'https://github.com/dreamwhite/linux-server-playbook'} target="_blank" rel="noreferrer" aria-label="Open Linux Server Playbook repository"><ArrowUpRight size={17} /></Link>
                </div>
          </CaseStudySection>
        </main>
      </ProjectCaseStudyLayout>
    </>
  );
}
