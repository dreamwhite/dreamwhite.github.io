import fs from 'node:fs';
import path from 'node:path';

const outputDirectory = path.join(process.cwd(), 'out');
const errors: string[] = [];
const siteOrigin = 'https://dreamwhite.dev';

function collectHtmlFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectHtmlFiles(entryPath) : entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function outputPathForHref(href: string) {
  const cleanHref = decodeURIComponent(href.split(/[?#]/, 1)[0]);
  if (cleanHref === '/') return path.join(outputDirectory, 'index.html');
  if (path.extname(cleanHref)) return path.join(outputDirectory, cleanHref.slice(1));
  return path.join(outputDirectory, cleanHref.replace(/^\//, ''), 'index.html');
}

function collectCanonicalUrls(html: string, htmlFile: string) {
  const canonicalUrls = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
  const relativePath = path.relative(outputDirectory, htmlFile);
  const isNotFoundDocument = relativePath === '404.html' || relativePath.startsWith('404/') || relativePath.startsWith('_not-found/');

  if (isNotFoundDocument) {
    if (canonicalUrls.length > 0) errors.push(`${relativePath} → 404 must not expose a canonical URL`);
    return [];
  }

  if (canonicalUrls.length !== 1) errors.push(`${relativePath} → expected exactly one canonical URL, found ${canonicalUrls.length}`);
  for (const canonicalUrl of canonicalUrls) {
    if (!canonicalUrl.startsWith(siteOrigin) || canonicalUrl.includes(`${siteOrigin}//`)) {
      errors.push(`${relativePath} → invalid canonical URL ${canonicalUrl}`);
    }
  }
  return canonicalUrls;
}

function validateRobotsAndSitemap(canonicalUrls: string[]) {
  const robotsPath = path.join(outputDirectory, 'robots.txt');
  const sitemapPath = path.join(outputDirectory, 'sitemap.xml');
  if (!fs.existsSync(robotsPath)) errors.push('Missing out/robots.txt');
  if (!fs.existsSync(sitemapPath)) errors.push('Missing out/sitemap.xml');
  if (!fs.existsSync(robotsPath) || !fs.existsSync(sitemapPath)) return;

  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) errors.push('robots.txt → missing absolute sitemap URL');

  const sitemapUrls = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (sitemapUrls.length === 0) errors.push('sitemap.xml → no loc entries found');
  if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml → duplicate loc entries found');
  for (const sitemapUrl of sitemapUrls) {
    if (!sitemapUrl.startsWith(siteOrigin) || sitemapUrl.includes(`${siteOrigin}//`) || !sitemapUrl.endsWith('/')) {
      errors.push(`sitemap.xml → invalid URL ${sitemapUrl}`);
    }
  }
  for (const canonicalUrl of canonicalUrls) {
    if (!sitemapUrls.includes(canonicalUrl)) errors.push(`sitemap.xml → missing canonical URL ${canonicalUrl}`);
  }
}

if (!fs.existsSync(path.join(outputDirectory, 'index.html'))) {
  errors.push('Missing out/index.html. Run pnpm build first.');
} else {
  const canonicalUrls: string[] = [];
  for (const htmlFile of collectHtmlFiles(outputDirectory)) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    canonicalUrls.push(...collectCanonicalUrls(html, htmlFile));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/#')) continue;
      const target = outputPathForHref(href);
      if (!fs.existsSync(target)) errors.push(`${path.relative(outputDirectory, htmlFile)} → missing ${href}`);
    }
  }
  validateRobotsAndSitemap(canonicalUrls);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `✖ ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ Validated static output links, metadata, robots and sitemap in ${collectHtmlFiles(outputDirectory).length} HTML files.`);
}
