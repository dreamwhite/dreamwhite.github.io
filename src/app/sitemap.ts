import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { getAllWritingPosts } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/projects', '/experience', '/resume', '/writing', '/contact'];
  return [
    ...staticRoutes.map((route) => ({ url: `https://dreamwhite.dev${route}/`, lastModified: new Date() })),
    ...projects.map((project) => ({ url: `https://dreamwhite.dev/projects/${project.slug}/`, lastModified: new Date() })),
    ...getAllWritingPosts().map((post) => ({ url: `https://dreamwhite.dev/writing/${post.slug}/`, lastModified: new Date(post.date) })),
  ];
}
