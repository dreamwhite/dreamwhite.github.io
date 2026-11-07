import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageToc } from '@/components/page-toc';
import { getAllWritingPosts } from '@/lib/content';

export const metadata = { title: 'Writing', description: 'Technical notes on software engineering, systems, macOS, and open source.' };

export default function WritingPage() {
  const posts = getAllWritingPosts();
  return (
    <>
      <section className="page-intro writing-intro shell"><p className="eyebrow"><span className="eyebrow-dot" />Writing / 05</p><h1>Technical notes, written down.</h1><p>macOS, Hackintosh, debugging, and the details that are easier to understand once they are documented.</p><span className="writing-count">{posts.length} notes in the archive</span></section>
      <section className="page-content internal-page-body shell"><aside className="internal-page-sidebar"><PageToc items={[{ id: 'writing-archive', label: 'Archive' }]} /></aside><div className="internal-page-main"><div className="writing-list" id="writing-archive">{posts.map((post) => <Link className="writing-row" href={`/writing/${post.slug}/`} key={post.slug}><span className="writing-date">{post.date}</span><div><h2>{post.title}</h2><p className="writing-excerpt">{post.excerpt}</p></div><span className="writing-category">{post.category} <ArrowUpRight size={13} /></span></Link>)}</div></div></section>
    </>
  );
}
