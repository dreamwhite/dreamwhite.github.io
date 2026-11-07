import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  BellRing,
  Check,
  CircleDot,
  CloudCog,
  Cpu,
  Home,
  Radio,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectCaseStudyLayout } from '@/components/project-case-study-layout';
import { CaseStudySection } from '@/components/case-study-section';

const pipeline = [
  { label: 'Device layer', detail: 'private controller', icon: Cpu },
  { label: 'Bridge', detail: 'async Python service', icon: Radio },
  { label: 'MQTT broker', detail: 'retained state + commands', icon: CloudCog },
  { label: 'Home Assistant', detail: 'discovered entities', icon: Home },
];

const capabilities = [
  { label: 'Climate', detail: 'Temperature and target values become MQTT climate entities.', icon: SlidersHorizontal },
  { label: 'Humidity', detail: 'Current readings and thresholds are published as retained state.', icon: Radio },
  { label: 'Outputs', detail: 'Momentary actions are exposed as explicit MQTT commands.', icon: BellRing },
  { label: 'Presence', detail: 'Zone state is normalized into read-only binary sensors.', icon: CircleDot },
];

const lifecycle = [
  ['01', 'Read', 'The bridge keeps a live transport session and polls a complete device snapshot on a predictable cadence.'],
  ['02', 'Normalize', 'Raw records are correlated by identifier and converted into small, typed state models before they reach MQTT.'],
  ['03', 'Publish', 'Only new or changed values are published, with retained messages so subscribers recover state after a restart.'],
  ['04', 'Confirm', 'Commands move in the opposite direction and are considered complete only when the next snapshot confirms the change.'],
];

const toc = [
  { id: 'mqtt-overview', label: 'What it does' },
  { id: 'mqtt-shape', label: 'System shape' },
  { id: 'mqtt-lifecycle', label: 'State and commands' },
  { id: 'mqtt-output', label: 'Useful output' },
];

export function EventBridgeProjectPage({ project }: { project: Project }) {
  return (
    <div className="event-bridge-page">
      <section className="event-bridge-hero">
        <div className="shell">
          <Link className="text-link event-bridge-back-link" href="/projects/"><ArrowLeft size={15} /> Back to projects</Link>
          <div className="event-bridge-hero-grid">
            <div className="event-bridge-hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />{project.eyebrow}</p>
              <h1>Built for the awkward layer<br /><em>between hardware and the home.</em></h1>
              <p className="event-bridge-hero-lede">{project.summary} The bridge turns a closed device protocol into a stable MQTT contract that the rest of a home can understand.</p>
              <div className="event-bridge-tags">
                {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectCaseStudyLayout toc={toc}>
      <CaseStudySection id="mqtt-overview" className="event-bridge-section" headingClassName="event-bridge-section-heading" labelClassName="event-bridge-label" label="What it does" title="It gives a closed system a clean, useful contract." shell>
          <div className="event-bridge-intro-grid">
            <p className="event-bridge-lede">This project is an asynchronous gateway between a private device controller and an MQTT broker. It reads state, translates it into normalized entities, and makes those entities available to Home Assistant through MQTT Discovery.</p>
            <div className="event-bridge-detail-stack">
              <div><span>Input</span><p>One persistent device connection with polling, reconnect supervision, and protocol-specific command handling.</p></div>
              <div><span>Output</span><p>Retained MQTT state, discovery metadata, and a small command surface for automations and dashboards.</p></div>
              <div><span>Runtime</span><p>Python 3.11+, async transports, Docker deployment, environment-based configuration, and structured logs.</p></div>
              <div><span>Failure</span><p>Connection loss, stale data, malformed events, and rejected commands are explicit states rather than silent gaps.</p></div>
            </div>
          </div>
      </CaseStudySection>

      <CaseStudySection id="mqtt-shape" className="event-bridge-section event-bridge-surface" headingClassName="event-bridge-section-heading compact" labelClassName="event-bridge-label" label="System shape" title="One bridge. Four clear boundaries." shell>
          <div className="event-bridge-pipeline">
            {pipeline.map(({ label, detail, icon: Icon }, index) => (
              <div className="event-bridge-pipeline-item" key={label}>
                <div className="event-bridge-pipeline-icon"><Icon size={21} strokeWidth={1.65} /></div>
                <div><strong>{label}</strong><span>{detail}</span></div>
                {index < pipeline.length - 1 && <ArrowUpRight className="event-bridge-pipeline-arrow" size={18} />}
              </div>
            ))}
          </div>
          <p className="event-bridge-pipeline-note">The device remains the source of truth. MQTT is the transport layer that makes its state composable elsewhere.</p>
      </CaseStudySection>

      <CaseStudySection id="mqtt-lifecycle" className="event-bridge-section" headingClassName="event-bridge-section-heading compact" labelClassName="event-bridge-label" label="The interesting part" title="Commands are not considered done until the system agrees." shell>
          <div className="event-bridge-lifecycle">
            {lifecycle.map(([number, title, text]) => (
              <div className="event-bridge-lifecycle-item" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                {title === 'Confirm' ? <Check size={19} /> : <RefreshCw size={18} />}
              </div>
            ))}
          </div>
      </CaseStudySection>

      <CaseStudySection id="mqtt-output" className="event-bridge-section event-bridge-capabilities-section" headingClassName="event-bridge-section-heading compact" labelClassName="event-bridge-label" label="Useful output" title="A small surface for a much larger system." shell>
          <div className="event-bridge-capabilities">
            {capabilities.map(({ label, detail, icon: Icon }) => (
              <div className="event-bridge-capability" key={label}>
                <Icon size={21} strokeWidth={1.65} />
                <h3>{label}</h3>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <div className="event-bridge-cta">
            <div><p className="event-bridge-label">Event-driven MQTT</p><h3>A small bridge with a contract the rest of the home can use.</h3></div>
            <Link className="button" href="/projects/">Back to projects <ArrowLeft size={15} /></Link>
          </div>
      </CaseStudySection>
      </ProjectCaseStudyLayout>
    </div>
  );
}
