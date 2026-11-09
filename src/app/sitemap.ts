import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { getAllWritingPosts } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/projects', '/experience', '/resume', '/skills', '/hackintosh', '/writing', '/contact', '/nfc'];
  return [
    ...staticRoutes.map((route) => ({ url: `https://dreamwhite.dev${route}/` })),
    ...projects.map((project) => ({ url: `https://dreamwhite.dev/projects/${project.slug}/` })),
    ...getAllWritingPosts().map((post) => ({ url: `https://dreamwhite.dev/writing/${post.slug}/`, lastModified: new Date(post.date) })),
  ];
}
