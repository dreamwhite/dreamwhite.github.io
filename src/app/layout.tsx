import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { BackToTop } from '../components/back-to-top';
import { socialProfileUrls } from '../content/profile';
import { defaultDescription, defaultTitle, siteName, siteUrl, socialDescription, socialImage } from '../lib/metadata';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ivan Cafiero',
  url: siteUrl,
  sameAs: socialProfileUrls,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: socialDescription,
    images: [{ url: socialImage, width: 1200, height: 630, alt: defaultTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: socialDescription,
    images: [socialImage],
  },
  icons: { icon: '/images/logo.png', shortcut: '/images/logo.png', apple: '/images/logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
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
