'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Global back-to-top control shown after the reader has moved past the opening section. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > 520);
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button className={`back-to-top${visible ? ' is-visible' : ''}`} type="button" onClick={scrollToTop} aria-label="Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1}>
      <ArrowUp size={17} strokeWidth={1.8} />
    </button>
  );
}
