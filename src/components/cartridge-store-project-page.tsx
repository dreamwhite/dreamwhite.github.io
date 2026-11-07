import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Database,
  Gamepad2,
  Globe2,
  LockKeyhole,
  Network,
  Server,
  Upload,
  Users,
} from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';
import { CaseStudySection } from '@/components/case-study-section';

const toc = [
  { id: 'cartridge-overview', label: 'What it is' },
  { id: 'cartridge-map', label: 'System map' },
  { id: 'cartridge-flow', label: 'The workflow' },
  { id: 'cartridge-links', label: 'Try the system' },
];

const flow = [
  { title: 'Package', text: 'A `.zip` bundle enters through the typed API with a manifest, icon, optional splash screen and architecture-specific `.prg32` artifacts.', icon: Upload },
  { title: 'Review', text: 'The submission becomes a pending record. Editors can verify or reject it before anything enters the public catalog.', icon: CheckCircle2 },
  { title: 'Publish', text: 'The service indexes the version, keeps its metadata and exposes downloads through the catalog and discovery contract.', icon: Box },
  { title: 'Play', text: 'The cartridge moves to an ESP32-C6 board or QEMU, while scores, runs and metrics return through the same service surface.', icon: Gamepad2 },
];

export function CartridgeStoreProjectPage({ project }: { project: Project }) {
  return (
    <div className="cartridge-store-page">
      <section className="cartridge-store-hero">
        <div className="shell">
          <Link className="text-link cartridge-store-back-link" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="cartridge-store-hero-grid">
            <div className="cartridge-store-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
              <h1>The service around the cartridge.<br /><em>Not just a store.</em></h1>
              <p>A full rewrite of the service around PRG32: a Fastify/TypeScript API, Next.js PWA, dedicated Fumadocs site, authentication, publication workflows and Docker Compose boundaries that connect software to the board.</p>
              <div className="cartridge-store-hero-actions">
                {project.links.slice(0, 2).map((link, index) => <Link className={`button ${index > 0 ? 'secondary' : ''}`} href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={15} /></Link>)}
              </div>
            </div>
            <div className="cartridge-store-hero-card" aria-label="Cartridge Store system summary">
              <div className="cartridge-store-card-top"><span>PRG32 / CARTRIDGE STORE</span><span>RUNNING</span></div>
              <div className="cartridge-store-card-core"><div className="cartridge-store-card-icon"><Server size={25} /></div><strong>Fastify + Next.js</strong><span>catalog · auth · publish · docs</span></div>
              <div className="cartridge-store-card-bottom"><span>API / WS</span><span>ESP32-C6</span><span>SQLITE / FILESTORE</span></div>
            </div>
          </div>
        </div>
      </section>

      <ProjectCaseStudyLayout toc={toc}>
      <CaseStudySection id="cartridge-overview" className="cartridge-store-section" headingClassName="cartridge-store-section-heading" labelClassName="cartridge-store-label" label="What it is" title="A distribution and service layer for the complete cartridge lifecycle." shell>
          <div className="cartridge-store-intro-grid">
            <p className="cartridge-store-lede">The development branch turns the Cartridge Store into the service around PRG32 cartridges. It sits between authors, editors, the browser, the API, documentation, physical boards and desktop emulation.</p>
            <div className="cartridge-store-detail-stack">
              <div><span>Rewrite</span><p>The development branch replaces the old Flask path with a Fastify/TypeScript service and a Next.js PWA, while keeping the firmware-facing contracts stable.</p></div>
              <div><span>Runtime</span><p>Fastify owns the API, authentication, catalog, publication, telemetry, statistics, discovery and WebSocket relay. Next.js owns the storefront and dashboard.</p></div>
              <div><span>Contracts</span><p>Catalog, downloads, publishing, scores, metrics, multiplayer, discovery and firmware-facing formats remain explicit compatibility boundaries.</p></div>
              <div><span>Persistence</span><p>Cartridge binaries stay in the filesystem store. SQLite keeps metadata, identity, publication state, scores, metrics and service records.</p></div>
              <div><span>Compose</span><p>Docker Compose coordinates the backend, storefront, dedicated docs service and local edge. The Dream Platform override attaches the application to shared Traefik, Mailpit and Docker networks.</p></div>
              <div><span>Edge</span><p>The local stack can use the repository Traefik overlay or Nginx. Dream Platform is supported as an optional integration, not a runtime dependency.</p></div>
            </div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="cartridge-map" className="cartridge-store-section cartridge-store-surface" headingClassName="cartridge-store-section-heading compact" labelClassName="cartridge-store-label" label="System map" title="One service connecting people, contracts and the machine that runs the cartridge." shell>
          <div className="cartridge-store-map" aria-label="PRG32 Cartridge Store system map">
            <div className="cartridge-store-map-top"><span>SYSTEM MAP / PRG32</span><span>PACKAGE → STATE → DEVICE</span></div>
            <div className="cartridge-store-map-grid">
              <div className="cartridge-store-map-column">
                <div className="cartridge-store-map-node"><Users size={19} /><strong>Authors & editors</strong><span>publish bundles · review submissions</span></div>
                <div className="cartridge-store-map-node"><Globe2 size={19} /><strong>Store & docs</strong><span>Next.js · Fumadocs · dashboard</span></div>
              </div>
              <div className="cartridge-store-map-center"><div className="cartridge-store-map-node primary"><Network size={25} /><strong>Fastify API</strong><span>catalog · publish · auth · WebSocket</span></div><div className="cartridge-store-map-connector"><i /><i /><i /></div><div className="cartridge-store-map-node secondary"><LockKeyhole size={19} /><strong>Identity & publication</strong><span>sessions · roles · CSRF · review queue</span></div></div>
              <div className="cartridge-store-map-column">
                <div className="cartridge-store-map-node"><Gamepad2 size={19} /><strong>PRG32 hardware</strong><span>ESP32-C6 downloads · discovery</span></div>
                <div className="cartridge-store-map-node"><Server size={19} /><strong>QEMU & API clients</strong><span>emulation · scores · metrics</span></div>
              </div>
            </div>
            <div className="cartridge-store-map-data"><Database size={18} /><span><strong>Persistent service data</strong> filesystem artifacts · SQLite state · identities · scores · metrics · backups</span></div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="cartridge-flow" className="cartridge-store-section" headingClassName="cartridge-store-section-heading compact" labelClassName="cartridge-store-label" label="The workflow" title="From a bundle to a verified cartridge." shell>
          <div className="cartridge-store-flow-grid">{flow.map(({ title, text, icon: Icon }, index) => <div className="cartridge-store-flow-card" key={title}><div className="cartridge-store-flow-top"><span>0{index + 1}</span><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></div>)}</div>
      </CaseStudySection>

      <CaseStudySection id="cartridge-links" className="cartridge-store-section cartridge-store-final" headingClassName="cartridge-store-section-heading compact" labelClassName="cartridge-store-label" label="Try the system" title="The public surface is only one part of the system." shell>
          <div className="cartridge-store-link-grid">{project.links.map((link) => <Link className="cartridge-store-link-card" href={link.href} key={link.href} target="_blank" rel="noreferrer"><span>{link.label}</span><ArrowUpRight size={18} /></Link>)}</div>
      </CaseStudySection>
      </ProjectCaseStudyLayout>
    </div>
  );
}
