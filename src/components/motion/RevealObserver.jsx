'use client';

import { useEffect } from 'react';

/**
 * Fades and lifts every `[data-reveal]` element into place as it scrolls into view.
 * Siblings get a small stagger. The hidden starting state only applies once this has
 * run (it sets `motion-ready` on <html>), so without JavaScript nothing is hidden.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));

    if (reduce || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }

    // Stagger siblings that reveal together, such as cards in a grid.
    elements.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.children).filter((child) =>
        child.hasAttribute('data-reveal'),
      );
      const index = siblings.indexOf(el);
      el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    // Anything already on screen shows at once; the rest waits for the observer.
    const viewport = window.innerHeight;
    elements.forEach((el) => {
      const { top } = el.getBoundingClientRect();
      if (top < viewport * 0.9 && top > -el.offsetHeight) el.classList.add('is-revealed');
      else observer.observe(el);
    });
    root.classList.add('motion-ready');

    return () => observer.disconnect();
  }, []);

  return null;
}
