import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  Camera,
  Code2,
  Download,
  Globe,
  Mail,
  Phone,
  UserRoundPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { contactCard } from '@/content/profile';

export const metadata = {
  title: 'Contact card',
  description: 'Contact Ivan Cafiero — software developer and creator of dreamwhite.dev.',
  alternates: { canonical: 'https://dreamwhite.dev/nfc' },
};

const actions: Array<{
  label: string;
  detail: string;
  href: string;
  icon: LucideIcon;
  kind: 'primary' | 'secondary';
  download?: boolean;
  external?: boolean;
}> = [
  { label: 'Save contact', detail: 'Add Ivan to your address book', href: '/ivan-cafiero.vcf', icon: UserRoundPlus, kind: 'primary', download: true },
  { label: 'Call', detail: contactCard.phone, href: contactCard.phoneHref, icon: Phone, kind: 'secondary' },
  { label: 'Email', detail: contactCard.email, href: `mailto:${contactCard.email}`, icon: Mail, kind: 'secondary' },
  { label: 'LinkedIn', detail: 'Professional profile', href: contactCard.linkedin, icon: BriefcaseBusiness, kind: 'secondary', external: true },
  { label: 'Instagram', detail: '@_ivan_cafiero_', href: contactCard.instagram, icon: Camera, kind: 'secondary', external: true },
  { label: 'GitHub', detail: '@dreamwhite', href: contactCard.github, icon: Code2, kind: 'secondary', external: true },
] as const;

export default function NfcPage() {
  return (
    <section className="nfc-page">
      <div className="shell nfc-shell">
        <div className="nfc-card">
          <div className="nfc-card-visual">
            <div className="nfc-card-visual-top"><span>DW / 001</span><AtSign size={16} /></div>
            <div className="nfc-portrait">
              <Image src="/images/portrait.webp" alt="Portrait of Ivan Cafiero" fill priority sizes="(max-width: 680px) 72vw, 300px" />
            </div>
            <div className="nfc-card-visual-bottom"><span>SOFTWARE + SYSTEMS</span><span>NAPLES / IT</span></div>
          </div>

          <div className="nfc-card-content">
            <p className="nfc-eyebrow"><span className="nfc-eyebrow-dot" />Contact card</p>
            <h1>Ivan Cafiero</h1>
            <p className="nfc-role">Software developer <span aria-hidden="true">·</span> Computer Science student</p>
            <p className="nfc-intro">I build software across web applications, embedded systems, mobile and infrastructure.</p>

            <div className="nfc-actions" aria-label="Contact Ivan Cafiero">
              {actions.map(({ label, detail, href, icon: Icon, kind, download, external }) => {
                const className = `nfc-action nfc-action-${kind}`;
                const content = <><span className="nfc-action-icon"><Icon size={17} strokeWidth={1.8} /></span><span className="nfc-action-copy"><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight className="nfc-action-arrow" size={15} /></>;

                return external ? (
                  <a className={className} href={href} key={label} target="_blank" rel="noreferrer">{content}</a>
                ) : (
                  <a className={className} href={href} key={label} download={download ? 'ivan-cafiero.vcf' : undefined}>{content}</a>
                );
              })}
            </div>

            <div className="nfc-card-footer">
              <span><Download size={14} /> vCard for your address book</span>
              <Link href="/" aria-label="Open dreamwhite portfolio">Portfolio <Globe size={14} /></Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
