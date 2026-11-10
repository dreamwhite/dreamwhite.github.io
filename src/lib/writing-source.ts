import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const writingDirectory = path.join(process.cwd(), 'content', 'writing');

export type WritingSourceDocument = {
  fileName: string;
  slug: string;
  data: Record<string, unknown>;
  content: string;
};

export type WritingValidationOptions = {
  publicDirectory: string;
  writingSlugs?: ReadonlySet<string>;
  projectSlugs?: ReadonlySet<string>;
};

export function readWritingSourceDocuments(directory = writingDirectory): WritingSourceDocument[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort()
    .map((fileName) => {
      const source = fs.readFileSync(path.join(directory, fileName), 'utf8');
      const parsed = matter(source);

      return {
        fileName,
        slug: fileName.replace(/\.md$/, ''),
        data: parsed.data,
        content: parsed.content,
      };
    });
}

function isValidDate(value: unknown) {
  if (value instanceof Date) return !Number.isNaN(value.getTime());
  if (typeof value !== 'string' && typeof value !== 'number') return false;
  return !Number.isNaN(new Date(value).getTime());
}

function localPath(publicDirectory: string, reference: string) {
  const root = path.resolve(publicDirectory);
  const candidate = path.resolve(root, `.${reference}`);
  return candidate === root || candidate.startsWith(`${root}${path.sep}`) ? candidate : null;
}

function localReferences(content: string) {
  return [...content.matchAll(/\]\((\/[^)\s#?]+)(?:[?#][^)]*)?\)/g)].map((match) => match[1]);
}

export function validateWritingSourceDocuments(documents: readonly WritingSourceDocument[], options: WritingValidationOptions) {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const writingSlugs = options.writingSlugs ?? new Set(documents.map((document) => document.slug));

  for (const document of documents) {
    const prefix = `${document.fileName}:`;

    if (slugs.has(document.slug)) errors.push(`${prefix} duplicate slug ${document.slug}.`);
    slugs.add(document.slug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(document.slug)) errors.push(`${prefix} slug must contain lowercase letters, numbers and single hyphens only.`);
    if (typeof document.data.title !== 'string' || !document.data.title.trim()) errors.push(`${prefix} frontmatter title is required.`);
    if (!isValidDate(document.data.date)) errors.push(`${prefix} frontmatter date must be a valid date.`);

    const categories = Array.isArray(document.data.categories) ? document.data.categories : [document.data.categories];
    if (!categories.some((category) => typeof category === 'string' && category.trim())) errors.push(`${prefix} frontmatter categories must contain at least one value.`);

    for (const reference of localReferences(document.content)) {
      if (reference.startsWith('/images/')) {
        const resolved = localPath(options.publicDirectory, reference);
        if (!resolved || !fs.existsSync(resolved)) errors.push(`${prefix} missing local media ${reference}.`);
      }

      if (reference.startsWith('/writing/')) {
        const slug = reference.slice('/writing/'.length).replace(/\/$/, '');
        if (!writingSlugs.has(slug)) errors.push(`${prefix} references missing writing route ${reference}.`);
      }

      if (reference.startsWith('/projects/')) {
        const slug = reference.slice('/projects/'.length).replace(/\/$/, '');
        if (options.projectSlugs && !options.projectSlugs.has(slug)) errors.push(`${prefix} references missing project route ${reference}.`);
      }
    }
  }

  return errors;
}
