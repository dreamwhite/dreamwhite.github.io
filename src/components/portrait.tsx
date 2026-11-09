import Image from 'next/image';

export function Portrait({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'portrait portrait-compact' : 'portrait'}>
      <Image
        src="/images/portrait.webp"
        alt="Portrait of Ivan Cafiero"
        fill
        priority={!compact}
        sizes={compact ? '(max-width: 860px) 100vw, 420px' : '(max-width: 860px) 100vw, 420px'}
      />
      <div className="portrait-overlay" />
      <div className="portrait-caption"><span>IVAN CAFIERO</span><span>DW / 001</span></div>
    </div>
  );
}
