import { getAllWritingPosts } from '../../lib/content';
import { WritingArchive } from '../../components/writing-archive';
import { createPageMetadata } from '../../lib/metadata';

export const metadata = createPageMetadata({ title: 'Writing', description: 'Technical notes on software engineering, systems, macOS, and open source.', path: '/writing/' });

export default function WritingPage() {
  const posts = getAllWritingPosts();
  return (
    <>
      <section className="page-intro writing-intro shell"><p className="eyebrow"><span className="eyebrow-dot" />Writing / {String(posts.length).padStart(2, '0')}</p><h1>Technical notes, written down.</h1><p>macOS, Hackintosh, debugging, and the details that are easier to understand once they are documented.</p><span className="writing-count">{posts.length} notes in the archive</span></section>
      <section className="page-content writing-archive-section shell"><WritingArchive posts={posts.map(({ slug, title, date, category, excerpt, readingTime }) => ({ slug, title, date, category, excerpt, readingTime }))} /></section>
    </>
  );
}
