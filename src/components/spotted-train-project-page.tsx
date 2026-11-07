import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, BellRing, MapPinned, WifiOff } from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';

const contributionAreas = [
  {
    title: 'Product & client',
    detail: 'Initial product concept, product direction, SwiftUI application structure, navigation, route search, station search, and departure matching.',
  },
  {
    title: 'Data & resilience',
    detail: 'Live data retrieval, cached and offline fallbacks, local persistence, cache invalidation, connectivity handling, retries, and error states.',
  },
  {
    title: 'Maps & interaction',
    detail: 'Dynamic station and line configuration, interactive maps, route geometries, favourites, and user preferences.',
  },
  {
    title: 'Services & security',
    detail: 'Realtime service alerts, push notification subscriptions, Firebase integration, and application security in collaboration with the team.',
  },
];

export function SpottedTrainProjectPage({ project }: { project: Project }) {
  const appStoreLink = project.links[0];

  return (
    <>
      <section className="page-intro shell project-page-intro spotted-train-intro">
        <Link className="text-link" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
        <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
        <div className="spotted-train-hero">
          <div>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="app-store-actions">
              <Link className="app-store-badge-link" href={appStoreLink.href} target="_blank" rel="noreferrer" aria-label="Download Spotted Train on the App Store">
                <Image src="/images/app-store-badge.svg" alt="Download on the App Store" width={240} height={80} priority />
              </Link>
              <span>Public App Store release</span>
            </div>
          </div>
        </div>
      </section>

      <ProjectCaseStudyLayout toc={[{ id: 'spotted-overview', label: 'The constraint' }, { id: 'spotted-contribution', label: 'My part' }, { id: 'spotted-learning', label: 'What stayed with me' }]}>
      <section className="page-content shell spotted-train-content" id="spotted-overview">
        <div className="spotted-train-layout">
          <div className="spotted-train-copy">
            <p className="statement-label">The constraint</p>
            <p>Transit information is only useful if it survives the moments when the network does not. Spotted Train was shaped around live departures, changing service data, and users who still need an answer when remote services are slow or unavailable.</p>
            <p>I proposed the initial product concept and worked with the team on turning it into an iOS application. My contribution sat at the intersection of product direction, SwiftUI client architecture, data handling, maps, and service integrations.</p>
            <p>Instead of treating offline behaviour and failure states as edge cases, the app uses cached data, explicit retries, local persistence, and clear UI states as part of the product itself.</p>
          </div>

          <aside className="spotted-train-aside" aria-label="Project characteristics">
            <div><MapPinned size={18} /><span>Routes & stations</span></div>
            <div><WifiOff size={18} /><span>Offline-oriented state</span></div>
            <div><BellRing size={18} /><span>Service notifications</span></div>
          </aside>
        </div>

        <div className="spotted-train-meta">
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Technical focus</span><strong>{project.technologies.join(' · ')}</strong></div>
        </div>

        <div className="spotted-train-section" id="spotted-contribution">
          <div>
            <p className="eyebrow">My part</p>
            <h2>I shaped the client around unreliable data.</h2>
            <p className="spotted-train-scope">Spotted Train was developed collaboratively. The areas below describe the product and client work I contributed, alongside the team’s service-side work.</p>
          </div>
          <div className="spotted-train-contribution-grid">
            {contributionAreas.map((area) => <div key={area.title}><h3>{area.title}</h3><p>{area.detail}</p></div>)}
          </div>
        </div>

        <div className="spotted-train-section spotted-train-learning" id="spotted-learning">
          <div><p className="eyebrow">What stayed with me</p><h2>A transit app is a reliability problem.</h2></div>
          <div className="spotted-train-copy">
            <p>The project taught me that reliability is not a single feature. It comes from the interaction between the interface, the data layer, remote services, local state, and failure handling.</p>
            <p>It also gave me a better understanding of how to structure a growing mobile application and how to make technical decisions that remain maintainable as the product evolves.</p>
          </div>
        </div>

        <div className="spotted-train-footer-note">
          <p>Spotted Train is an independent academic project and is not affiliated with, endorsed by, or officially connected to any transport operator.</p>
          <Link className="text-link" href={appStoreLink.href} target="_blank" rel="noreferrer">Open App Store listing <ArrowUpRight size={15} /></Link>
        </div>
      </section>
      </ProjectCaseStudyLayout>
    </>
  );
}
