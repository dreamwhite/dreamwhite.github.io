import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  iconSize?: number;
};

/** Consistent external-link behaviour and affordance for project case studies. */
export function ExternalLink({ href, children, className = 'text-link inline-flex items-center gap-1.5', iconSize = 15 }: ExternalLinkProps) {
  return (
    <Link className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={iconSize} aria-hidden="true" />
    </Link>
  );
}
