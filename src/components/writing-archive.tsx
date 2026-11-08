'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export type WritingArchivePost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
};

export function WritingArchive({ posts }: { posts: WritingArchivePost[] }) {
  const categories = ['all', ...Array.from(new Set(posts.map((post) => post.category)))];
  const [activeCategory, setActiveCategory] = useState('all');
  const visiblePosts = activeCategory === 'all' ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="writing-archive-layout">
      <aside className="writing-category-panel">
        <div className="writing-category-heading"><BookOpen size={18} strokeWidth={1.7} /><span>Browse by category</span></div>
        <div className="writing-category-list" role="group" aria-label="Filter writing by category">
          {categories.map((category) => {
            const count = category === 'all' ? posts.length : posts.filter((post) => post.category === category).length;
            const active = activeCategory === category;
            return <button className={`writing-category-filter${active ? ' active' : ''}`} key={category} type="button" aria-pressed={active} onClick={() => setActiveCategory(category)}><span>{category === 'all' ? 'All notes' : category}</span><small>{String(count).padStart(2, '0')}</small></button>;
          })}
        </div>
      </aside>
      <div className="writing-archive-results">
        <div className="writing-archive-results-top"><span>{activeCategory === 'all' ? 'All notes' : activeCategory}</span><span>{visiblePosts.length} {visiblePosts.length === 1 ? 'note' : 'notes'}</span></div>
        <div className="writing-list">
          {visiblePosts.map((post) => <Link className="writing-row" href={`/writing/${post.slug}/`} key={post.slug}><span className="writing-date">{post.date}</span><div><h2>{post.title}</h2><p className="writing-excerpt">{post.excerpt}</p><span className="writing-row-meta">{post.category} · {post.readingTime}</span></div><ArrowUpRight className="writing-row-arrow" size={16} /></Link>)}
        </div>
      </div>
    </div>
  );
}
