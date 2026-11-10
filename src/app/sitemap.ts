import type { MetadataRoute } from 'next';
import { projects } from '../content/projects';
import { getAllWritingPosts } from '../lib/content';
import { absoluteUrl } from '../lib/metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/projects', '/experience', '/resume', '/skills', '/hackintosh', '/writing', '/contact', '/nfc'];
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route) })),
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}/`) })),
    ...getAllWritingPosts().map((post) => ({ url: absoluteUrl(`/writing/${post.slug}/`), lastModified: new Date(post.date) })),
  ];
}
