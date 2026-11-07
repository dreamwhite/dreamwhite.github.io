import Link from 'next/link';
import {
  ArrowLeft,
  Boxes,
  Code2,
  Database,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Network,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Store,
  Workflow,
} from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';
import { CaseStudySection } from '@/components/case-study-section';

const boundaries = [
  { label: 'Catalog', detail: 'Products, variants, categories, product types, facets, and media.', icon: ShoppingBag },
  { label: 'Orders', detail: 'Cart, checkout, invoices, Stripe webhooks, and payment state.', icon: PackageCheck },
  { label: 'Identity', detail: 'Separate admin and customer sessions, capabilities, and privacy flows.', icon: KeyRound },
  { label: 'Plugins', detail: 'Registry, release artifacts, and isolated renderer execution.', icon: Boxes },
];

const localRuntime = [
  ['01', 'Real hosts', 'The shop, admin, and API run on separate HTTPS subdomains instead of pretending localhost is production.'],
  ['02', 'Real sessions', 'Cookie scope, Secure flags, SameSite behavior, and admin/customer boundaries are testable in the browser.'],
  ['03', 'Real edges', 'Stripe redirects, webhooks, CSP, proxy routing, and service health are exercised through the same ingress model.'],
];

const toc = [
  { id: 'emporion-overview', label: 'What it is' },
  { id: 'emporion-boundaries', label: 'Platform boundaries' },
  { id: 'emporion-local-https', label: 'Local HTTPS' },
  { id: 'emporion-principles', label: 'Engineering idea' },
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
              <h1>Commerce software<br /><em>with boundaries.</em></h1>
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
      <CaseStudySection id="emporion-overview" className="emporion-section" headingClassName="emporion-section-heading" labelClassName="emporion-label" label="What it is" title="A storefront is the visible part. Emporion is the system underneath." shell>
          <div className="emporion-intro-grid">
            <p className="emporion-lede">Emporion is a production-adjacent commerce platform built as a TypeScript monorepo. The customer shop, admin backoffice, API gateway, domain services, plugin platform, and local deployment stack are separate pieces with explicit contracts between them.</p>
            <div className="emporion-detail-stack">
              <div><span>Frontend</span><p>Next.js storefront for customers and a separate React/Vite admin surface for operations.</p></div>
              <div><span>Backend</span><p>A single gateway routes public and privileged requests to services that own their domain behavior.</p></div>
              <div><span>Persistence</span><p>MongoDB remains the source of truth, with Redis used where short-lived acceleration is useful without taking ownership of the domain state.</p></div>
              <div><span>Services</span><p>Auth, catalog, orders, CMS, status, and plugin capabilities stay independently understandable behind the gateway.</p></div>
              <div><span>Operations</span><p>Compose, shared ingress, generated environments, release checks, and backup verification are part of the platform rather than afterthoughts.</p></div>
            </div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="emporion-boundaries" className="emporion-section emporion-surface" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="Platform boundaries" title="Each domain has a job. The gateway keeps the edges legible." shell>
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

      <CaseStudySection id="emporion-local-https" className="emporion-section" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="Why local HTTPS matters" title="Development that tests the seams, not just the screens." shell>
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

      <CaseStudySection id="emporion-principles" className="emporion-section emporion-surface emporion-final-section" headingClassName="emporion-section-heading compact" labelClassName="emporion-label" label="The engineering idea" title="Keep the product flexible without making the runtime vague." shell>
          <div className="emporion-principles">
            <div><Workflow size={21} /><h3>Contract-led</h3><p>Shared config, typed service boundaries, and gateway policies keep the platform understandable as it grows.</p></div>
            <div><GitBranch size={21} /><h3>Plugin-ready</h3><p>Product types and renderer capabilities can extend the catalog without rewriting the storefront around every new field.</p></div>
            <div><Code2 size={21} /><h3>Testable locally</h3><p>Compose, HTTPS, health checks, release flows, and quality gates make infrastructure part of the development loop.</p></div>
            <div><Database size={21} /><h3>Data ownership</h3><p>Orders, inventory, users, and payment state have an explicit source of truth instead of being scattered across caches.</p></div>
          </div>
      </CaseStudySection>
      </ProjectCaseStudyLayout>
    </div>
  );
}
