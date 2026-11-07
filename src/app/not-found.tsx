import Link from 'next/link';

export default function NotFound() {
  return <section className="not-found shell"><p className="eyebrow" style={{ justifyContent: 'center' }}>404 / Not found</p><h1>Not here.</h1><p className="section-description" style={{ margin: '25px auto 0' }}>The page may have moved, or it may still be in the notebook.</p><Link className="button" href="/" style={{ marginTop: 30 }}>Back home</Link></section>;
}
