import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageToc } from '@/components/page-toc';
import { socials } from '@/content/profile';

export const metadata = { title: 'Contact', description: 'Contact Ivan Cafiero / dreamwhite.' };

export default function ContactPage() {
  return (
    <>
      <section className="page-intro shell"><p className="eyebrow"><span className="eyebrow-dot" />Contact / 06</p><h1>Let’s talk about the interesting part.</h1><p>Thoughtful technical work, open-source collaboration, or a problem that deserves a closer look.</p></section>
      <section className="page-content internal-page-body shell"><aside className="internal-page-sidebar"><PageToc items={[{ id: 'contact-links', label: 'Ways to reach me' }]} /></aside><div className="internal-page-main"><div className="contact-grid" id="contact-links"><div className="contact-copy"><h2>Open line.</h2><p>The fastest way to reach me is email. LinkedIn and GitHub are useful if you want context before starting a conversation.</p></div><div className="contact-links">{socials.map((social) => <Link className="contact-link" href={social.href} key={social.label} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined}><span>{social.label}</span><span>{social.value}<ArrowUpRight size={15} /></span></Link>)}</div></div></div></section>
    </>
  );
}
