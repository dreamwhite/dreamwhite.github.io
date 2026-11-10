import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Cpu, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested dreamwhite.dev route could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found shell" aria-labelledby="not-found-title">
      <div className="not-found-grid">
        <div className="not-found-copy">
          <p className="not-found-kicker"><span /><span>ROUTE_NOT_FOUND / 0x194</span></p>
          <h1 id="not-found-title">There is no process listening here.</h1>
          <p className="not-found-lede">The requested path did not resolve to a page. The rest of the system is still up.</p>
          <div className="not-found-actions">
            <Link className="button" href="/"><ArrowLeft size={16} /> Back to home</Link>
            <Link className="text-link" href="/projects/">Browse projects <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <div className="not-found-console" aria-label="Route diagnostic">
          <div className="not-found-console-top"><span><Terminal size={14} /> dreamwhite.dev</span><span>diagnostic / 404</span></div>
          <div className="not-found-console-body">
            <div className="not-found-command"><span>$</span><code>resolve route</code></div>
            <div className="not-found-output"><span className="not-found-output-mark">×</span><span>no matching page found</span></div>
            <div className="not-found-output"><span className="not-found-output-mark ok">+</span><span>home and project index available</span></div>
          </div>
          <div className="not-found-console-bottom"><span><Cpu size={14} /> STATUS</span><strong>READY</strong></div>
        </div>
      </div>
    </section>
  );
}
