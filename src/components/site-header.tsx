'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/skills/', label: 'Skills' },
  { href: '/writing/', label: 'Writing' },
  { href: '/resume/', label: 'Resume' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href.replace(/\/$/, '')}/`);
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)} aria-label="dreamwhite home">
          <span className="wordmark-mark"><Image src="/images/logo.png" alt="" width={34} height={34} priority /></span>
          <span>dreamwhite</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link className={isActive(link.href) ? 'nav-link active' : 'nav-link'} key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-link external-nav-link" href="https://www.linkedin.com/in/dreamwhite" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </Link>
          <ThemeToggle />
        </nav>

        <div className="mobile-actions">
          <ThemeToggle />
          <button className="icon-button menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <div className="shell mobile-nav-inner">
            {links.map((link) => (
              <Link className={isActive(link.href) ? 'mobile-nav-link active' : 'mobile-nav-link'} key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <span>{link.label}</span><ArrowUpRight size={16} />
              </Link>
            ))}
            <Link className="mobile-nav-link" href="https://www.linkedin.com/in/dreamwhite" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              <span>LinkedIn</span><ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
