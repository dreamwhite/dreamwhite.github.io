import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const writingDirectory = path.join(process.cwd(), 'content', 'writing');

export type WritingPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  content: string;
};

export type WritingHeading = {
  id: string;
  label: string;
  level: number;
};

function toDateString(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').slice(0, 10);
}

function getExcerpt(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/[#>*`_\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return plainText.length > 180 ? `${plainText.slice(0, 177)}…` : plainText;
}

export function getAllWritingPosts(): WritingPost[] {
  return fs
    .readdirSync(writingDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const source = fs.readFileSync(path.join(writingDirectory, fileName), 'utf8');
      const { data, content } = matter(source);
      const category = Array.isArray(data.categories) ? data.categories[0] : data.categories ?? 'notes';

      return {
        slug,
        title: String(data.title ?? slug),
        date: toDateString(data.date),
        category: String(category),
        excerpt: getExcerpt(content),
        readingTime: readingTime(content).text.replace(' read', ''),
        content,
      } satisfies WritingPost;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingPost(slug: string) {
  return getAllWritingPosts().find((post) => post.slug === slug);
}

function headingLabel(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+#+\s*$/, '')
    .trim();
}

function headingId(value: string, usedIds: Set<string>) {
  const base = headingLabel(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'section';

  let id = base;
  let suffix = 2;
  while (usedIds.has(id)) id = `${base}-${suffix++}`;
  usedIds.add(id);
  return id;
}

function getWritingHeadings(content: string): WritingHeading[] {
  const headings: WritingHeading[] = [];
  const usedIds = new Set<string>();
  let inFence = false;

  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const label = headingLabel(match[2]);
    if (!label) continue;
    headings.push({ id: headingId(label, usedIds), label, level: match[1].length });
  }

  return headings;
}

export async function renderMarkdown(content: string) {
  const rendered = await remark().use(remarkGfm).use(remarkHtml, { allowDangerousHtml: true }).process(content);
  const headings = getWritingHeadings(content);
  let headingIndex = 0;
  const html = rendered.toString().replace(/<h([1-3])>(.*?)<\/h\1>/g, (fullMatch, level: string, inner: string) => {
    const heading = headings[headingIndex++];
    return heading ? `<h${level} id="${heading.id}">${inner}</h${level}>` : fullMatch;
  });

  return { html, headings };
}
