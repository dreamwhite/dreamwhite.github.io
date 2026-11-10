import fs from 'node:fs';
import path from 'node:path';
import { extractAttributeValues, extractCssUrlReferences, extractSrcsetCandidates, isLocalReference, outputPathForAsset, outputPathForHref } from '../src/lib/static-output';

const outputDirectory = path.join(process.cwd(), 'out');
const errors: string[] = [];
const siteOrigin = 'https://dreamwhite.dev';

function collectFiles(directory: string, predicate: (fileName: string) => boolean): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath, predicate) : predicate(entry.name) ? [entryPath] : [];
  });
}

function collectHtmlFiles(directory: string) {
  return collectFiles(directory, (fileName) => fileName.endsWith('.html'));
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
    const hrefs = extractAttributeValues(html, 'href');

    for (const href of hrefs) {
      if (!isLocalReference(href)) continue;
      const target = outputPathForHref(outputDirectory, href);
      if (!fs.existsSync(target)) errors.push(`${path.relative(outputDirectory, htmlFile)} → missing ${href}`);
    }

    for (const source of extractAttributeValues(html, 'src')) {
      if (!isLocalReference(source)) continue;
      const target = outputPathForAsset(outputDirectory, htmlFile, source);
      if (!fs.existsSync(target)) errors.push(`${path.relative(outputDirectory, htmlFile)} → missing src ${source}`);
    }

    for (const srcset of extractAttributeValues(html, 'srcset')) {
      for (const source of extractSrcsetCandidates(srcset)) {
        if (!isLocalReference(source)) continue;
        const target = outputPathForAsset(outputDirectory, htmlFile, source);
        if (!fs.existsSync(target)) errors.push(`${path.relative(outputDirectory, htmlFile)} → missing srcset ${source}`);
      }
    }
  }

  for (const cssFile of collectFiles(outputDirectory, (fileName) => fileName.endsWith('.css'))) {
    const css = fs.readFileSync(cssFile, 'utf8');
    for (const reference of extractCssUrlReferences(css)) {
      if (!isLocalReference(reference)) continue;
      const target = outputPathForAsset(outputDirectory, cssFile, reference);
      if (!fs.existsSync(target)) errors.push(`${path.relative(outputDirectory, cssFile)} → missing CSS asset ${reference}`);
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
