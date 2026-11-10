import path from 'node:path';

function attributePattern(attribute: string) {
  return new RegExp(`<[^>]+\\s${attribute}=["']([^"']+)["'][^>]*>`, 'gi');
}

export function extractAttributeValues(html: string, attribute: string) {
  return [...html.matchAll(attributePattern(attribute))].map((match) => match[1]);
}

export function extractSrcsetCandidates(value: string) {
  return value.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]).filter(Boolean);
}

export function extractCssUrlReferences(css: string) {
  return [...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map((match) => match[1]);
}

export function isLocalReference(reference: string) {
  const value = reference.trim();
  return value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/#');
}

export function outputPathForHref(outputDirectory: string, href: string) {
  const cleanHref = decodeURIComponent(href.split(/[?#]/, 1)[0]);
  if (cleanHref === '/') return path.join(outputDirectory, 'index.html');
  if (path.extname(cleanHref)) return path.join(outputDirectory, cleanHref.slice(1));
  return path.join(outputDirectory, cleanHref.replace(/^\//, ''), 'index.html');
}

export function outputPathForAsset(outputDirectory: string, sourceFile: string, reference: string) {
  const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (cleanReference.startsWith('/')) return path.join(outputDirectory, cleanReference.slice(1));
  return path.resolve(path.dirname(sourceFile), cleanReference);
}
