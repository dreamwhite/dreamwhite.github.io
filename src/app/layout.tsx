import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { BackToTop } from '../components/back-to-top';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamwhite.dev'),
  title: {
    default: 'dreamwhite — software, systems, and engineering notes',
    template: '%s — dreamwhite',
  },
  description: 'Ivan Cafiero — software developer and Computer Science student working across web applications, embedded systems, and infrastructure.',
  alternates: { canonical: 'https://dreamwhite.dev' },
  openGraph: {
    type: 'website',
    url: 'https://dreamwhite.dev',
    siteName: 'dreamwhite',
    title: 'dreamwhite — software, systems, and engineering notes',
    description: 'Software, systems, and the reasoning between them.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'dreamwhite — software, systems, and engineering notes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dreamwhite — software, systems, and engineering notes',
    description: 'Software, systems, and the reasoning between them.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/images/logo.png', shortcut: '/images/logo.png', apple: '/images/logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const stored = localStorage.getItem('theme'); const light = stored === 'light' || (!stored && window.matchMedia('(prefers-color-scheme: light)').matches); document.documentElement.dataset.theme = light ? 'light' : 'dark'; } catch {} })();`,
          }}
        />
      </head>
      <body>
        <div className="site-frame" id="top">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
