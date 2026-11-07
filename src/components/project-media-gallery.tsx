import Image from 'next/image';
import type { ProjectMediaItem } from '@/content/project-media';

export type { ProjectMediaItem } from '@/content/project-media';

type ProjectMediaGalleryProps = {
  items: ProjectMediaItem[];
  className?: string;
};

/** Renders a captioned, responsive gallery shared by project case studies. */
export function ProjectMediaGallery({ items, className = '' }: ProjectMediaGalleryProps) {
  return (
    <div className={`project-media-gallery ${className}`.trim()}>
      {items.map((item) => (
        <figure className={item.featured ? 'project-media-gallery-featured' : undefined} key={item.src}>
          <Image src={item.src} alt={item.alt} width={item.width} height={item.height} unoptimized />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
