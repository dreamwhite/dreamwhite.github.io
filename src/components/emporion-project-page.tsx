import Link from 'next/link';
import {
  ArrowLeft,
  Boxes,
  LayoutDashboard,
  LockKeyhole,
  Network,
  ShieldCheck,
  Store,
} from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';
import { CaseStudySection } from '@/components/case-study-section';

const boundaries = [
  { label: 'Shop', detail: 'The customer-facing surface for browsing products, managing a cart, and moving through checkout.', icon: Store },
  { label: 'Admin', detail: 'A separate backoffice for catalog, content, media, orders, and the operational work around them.', icon: LayoutDashboard },
  { label: 'Gateway', detail: 'One public boundary for routing, authentication policy, security headers, and service access.', icon: Network },
  { label: 'Domain services', detail: 'Auth, catalog, orders, CMS, status, and plugin capabilities with clear ownership.', icon: Boxes },
];

const services = [
  ['00', 'API gateway', 'The single public boundary: routing, authentication policy, security headers, and access to the services behind it.'],
  ['01', 'Auth service', 'Identity, sessions, capabilities, and the separation between customer access and administration.'],
  ['02', 'Catalog service', 'Products, variants, categories, media, facets, and the product types that make the catalog extensible.'],
  ['03', 'Orders service', 'Cart and checkout state, invoices, payment transitions, and the webhooks that bring those transitions back into the platform.'],
  ['04', 'CMS service', 'Pages and content as a proper domain, so editorial data does not leak into storefront or admin code.'],
  ['05', 'Status service', 'Health and runtime signals that make the state of the platform visible during development and delivery.'],
  ['06', 'Plugin manager + runner', 'The registry, release artifacts, and controlled execution path for capabilities that extend the core platform.'],
];

const extensionModel = [
  ['01', 'Extend the catalog', 'Product types, fields, and renderers can grow without turning every new commerce idea into a storefront rewrite.'],
  ['02', 'Keep extensions explicit', 'The plugin manager owns registration and release artifacts; the runner keeps execution behind a defined capability boundary.'],
  ['03', 'Share the contracts', 'Common packages keep configuration, types, validation, and runtime conventions aligned across the monorepo.'],
];

const localRuntime = [
  ['01', 'Real hosts', 'Shop, admin, and API use separate HTTPS subdomains, so browser behavior is closer to a deployed system.'],
  ['02', 'Real sessions', 'Cookie scope, Secure flags, SameSite behavior, and separate admin/customer sessions can be tested where they actually run.'],
  ['03', 'Real edges', 'Payments, redirects, webhooks, CSP, proxy routing, health checks, and release checks are part of the same loop.'],
];

const toc = [
  { id: 'emporion-overview', label: 'Two products, one platform' },
  { id: 'emporion-boundaries', label: 'Platform surfaces' },
  { id: 'emporion-services', label: 'Services and ownership' },
  { id: 'emporion-extension-model', label: 'Extension model' },
  { id: 'emporion-local-https', label: 'Real local conditions' },
  { id: 'emporion-result', label: 'The result' },
];

export function EmporionProjectPage({ project }: { project: Project }) {
  return (
    <div className="emporion-page">
      <section className="emporion-hero">
        <div className="shell">
          <Link className="text-link emporion-back-link" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="emporion-hero-grid">
            <div className="emporion-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
              <h1>A commerce platform<br /><em>built end to end.</em></h1>
              <p className="emporion-hero-lede">{project.summary}</p>
            </div>
            <div className="emporion-architecture-card" aria-label="Emporion platform architecture">
              <div className="emporion-card-top"><span>EMPORION / PLATFORM</span><span>PLATFORM</span></div>
              <div className="emporion-architecture-stack">
                <div className="emporion-architecture-row">
                  <div className="emporion-architecture-node"><Store size={19} /><span>SHOP</span></div>
                  <div className="emporion-architecture-node"><LayoutDashboard size={19} /><span>ADMIN</span></div>
                </div>
                <div className="emporion-architecture-connector"><span /><span /><span /></div>
                <div className="emporion-architecture-node gateway"><Network size={22} /><span>API GATEWAY</span></div>
                <div className="emporion-architecture-connector"><span /><span /><span /></div>
                <div className="emporion-service-row">
                  <span>AUTH</span><span>CATALOG</span><span>ORDERS</span><span>CMS</span>
                </div>
              </div>
              <div className="emporion-card-bottom"><span>TYPE-SAFE / MODULAR</span><span>MONGO + DOCKER</span></div>
            </div>
          </div>
        </div>
      </section>

      <ProjectCaseStudyLayout toc={toc}>
      <CaseStudySection id="emporion-overview" className="emporion-section emporion-overview-section" headingClassName="emporion-section-heading" labelClassName="emporion-label" label="What it is" title="Commerce is the interface. The platform is the work." shell>
          <div className="emporion-intro-grid">
            <p className="emporion-lede">Emporion is a commerce platform I designed and built from the ground up. The customer shop and the admin backoffice are separate products, but they rely on the same set of rules, services, data, and infrastructure.</p>
            <div className="emporion-detail-stack">
              <div><span>Product</span><p>Shop and admin solve different jobs without becoming two disconnected applications.</p></div>
              <div><span>Backend</span><p>The gateway handles the edge; domain services keep the decisions and their data ownership explicit.</p></div>
              <div><span>Data</span><p>MongoDB remains the source of truth, while Redis is used only for short-lived acceleration.</p></div>
              <div><span>Runtime</span><p>Docker Compose, HTTPS ingress, health checks, release flows, and backups are part of the platform itself.</p></div>
            </div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="emporion-boundaries" className="emporion-section emporion-surface" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="Platform surfaces" title="Four surfaces, one flow." shell>
          <div className="emporion-boundaries">
            {boundaries.map(({ label, detail, icon: Icon }) => (
              <div className="emporion-boundary" key={label}>
                <Icon size={22} strokeWidth={1.65} />
                <h3>{label}</h3>
                <p>{detail}</p>
              </div>
            ))}
          </div>
      </CaseStudySection>

      <CaseStudySection id="emporion-services" className="emporion-section" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="Services and ownership" title="Each service owns a decision." shell>
          <div className="emporion-services-intro">
            <p className="emporion-lede">The gateway is the front door, not a dumping ground. Behind it, each service owns one part of the commerce domain. That keeps the boundaries practical: identity does not own orders, payment state does not leak into the catalog, and the storefront does not need to know how the backend is assembled.</p>
            <div className="emporion-service-catalog">
              {services.map(([number, title, text]) => (
                <div className="emporion-service-catalog-item" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="emporion-extension-model" className="emporion-section emporion-surface" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="Extension model" title="The platform can grow without losing its shape." shell>
          <div className="emporion-runtime">
            {extensionModel.map(([number, title, text]) => (
              <div className="emporion-runtime-item" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <Boxes size={19} />
              </div>
            ))}
          </div>
      </CaseStudySection>

      <CaseStudySection id="emporion-local-https" className="emporion-section" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="Built for real conditions" title="The hard parts are part of development." shell>
          <div className="emporion-runtime">
            {localRuntime.map(([number, title, text]) => (
              <div className="emporion-runtime-item" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                {title === 'Real edges' ? <ShieldCheck size={19} /> : <LockKeyhole size={18} />}
              </div>
            ))}
          </div>
      </CaseStudySection>

      <CaseStudySection id="emporion-result" className="emporion-section emporion-surface emporion-final-section" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="The result" title="Built by one person, across every layer." shell>
          <div className="emporion-role-grid">
            <p className="emporion-lede">Emporion started as an idea for a commerce product and became a full systems exercise. I kept the product, code, infrastructure, and quality work in the same line of sight, so every architectural decision could be tested against an actual user flow.</p>
            <div className="emporion-detail-stack">
              <div><span>One owner</span><p>Product decisions, architecture, implementation, infrastructure, security, testing, and delivery all belong to the same project.</p></div>
              <div><span>Clear seams</span><p>The shop, admin, gateway, services, and extension runtime can evolve without hiding their responsibilities from one another.</p></div>
              <div><span>Real behavior</span><p>HTTPS, cookies, payments, health checks, release flows, and failure states are part of the experience being built.</p></div>
            </div>
          </div>
      </CaseStudySection>
      </ProjectCaseStudyLayout>
    </div>
  );
}
