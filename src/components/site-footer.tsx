import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { socials } from '@/content/profile';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="footer-wordmark" href="/" aria-label="dreamwhite home">
              <span className="footer-wordmark-mark"><Image src="/images/logo.png" alt="" width={32} height={32} /></span>
              <span>dreamwhite.dev</span>
            </Link>
            <p className="footer-note">Software and systems, from Naples.</p>
          </div>
          <div className="footer-connect">
            <p className="footer-label">Connect</p>
            <nav className="footer-links" aria-label="Contact links">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined}>
                  <span><small>{social.label}</small><strong>{social.value}</strong></span><ArrowUpRight size={14} />
                </a>
              ))}
            </nav>
          </div>
          <div className="footer-meta">
            <p className="footer-label">Based in</p>
            <strong>Naples, Italy</strong>
            <span>© {new Date().getFullYear()} Ivan Cafiero</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Selected work, writing, and systems.</span>
          <Link href="#top">Back to top <ArrowUpRight size={13} /></Link>
        </div>
      </div>
    </footer>
  );
}
