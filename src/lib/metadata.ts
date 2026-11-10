import type { Metadata } from 'next';

export const siteUrl = 'https://dreamwhite.dev';
export const siteName = 'dreamwhite';
export const defaultTitle = 'dreamwhite — software, systems, and engineering notes';
export const defaultDescription = 'Ivan Cafiero — software developer and Computer Science student working across web applications, embedded systems, and infrastructure.';
export const socialDescription = 'Software, systems, and the reasoning between them.';
export const socialImage = '/og-image.svg';

export function absoluteUrl(path: string) {
  const normalizedPath = !path || path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${siteUrl}${normalizedPath}`;
}

export function normalizeDescription(value: string) {
  const plainText = value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[`*_#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= 160) return plainText;
  return `${plainText.slice(0, 157).replace(/\s+\S*$/, '').trim()}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = title ? `${title} — ${siteName}` : defaultTitle;
  const resolvedDescription = normalizeDescription(description);

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [socialImage],
    },
  };
}
