import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ArticleToc } from '../../../components/article-toc';
import { getAllWritingPosts, getWritingPost, renderMarkdown } from '../../../lib/content';

export function generateStaticParams() { return getAllWritingPosts().map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) notFound();
  const { html, headings } = await renderMarkdown(post.content);

  return (
    <article>
      <header className="article-header shell"><Link className="article-back-link text-link" href="/writing/"><ArrowLeft size={15} /> Back to writing</Link><p className="eyebrow article-eyebrow"><span className="eyebrow-dot" />{post.category} / writing</p><h1>{post.title}</h1><div className="article-meta"><span>{post.date}</span><span>{post.readingTime}</span><span>Markdown archive</span></div></header>
      <div className="article-layout shell"><div className="article-content" dangerouslySetInnerHTML={{ __html: html }} /><aside className="article-aside">{headings.length > 0 && <ArticleToc headings={headings} />}<div className="article-aside-meta"><p>Filed under</p><span>{post.category}</span><p>Published</p><span>{post.date}</span></div></aside></div>
    </article>
  );
}
