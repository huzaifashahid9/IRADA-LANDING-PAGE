'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@/components/ui';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './Faq.module.css';

/**
 * One native <details> question, with its height animated on open and close. Without
 * JavaScript, or with reduced motion, it opens and closes the native way.
 */
export default function FaqItem({ question, answer, defaultOpen }) {
  const itemRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    return () => gsap.killTweensOf(panel);
  }, []);

  const toggle = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    const item = itemRef.current;
    const panel = panelRef.current;
    // A click while it is closing turns it back around from wherever it is.
    const opening = !item.open || item.hasAttribute('data-closing');
    const from = item.open ? panel.offsetHeight : 0;

    gsap.killTweensOf(panel);
    item.toggleAttribute('data-closing', !opening);
    item.open = true;
    gsap.fromTo(
      panel,
      { height: from, opacity: from ? gsap.getProperty(panel, 'opacity') : 0 },
      {
        height: opening ? 'auto' : 0,
        opacity: opening ? 1 : 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          if (!opening) {
            item.open = false;
            item.removeAttribute('data-closing');
          }
          gsap.set(panel, { clearProps: 'height,opacity' });
          ScrollTrigger.refresh();
        },
      },
    );
  };

  return (
    <details ref={itemRef} className={styles.item} open={defaultOpen} data-reveal="">
      <summary className={styles.summary} onClick={toggle}>
        <span>{question}</span>
        <span className={styles.toggle} aria-hidden="true">
          <Icon name="plus" size={16} strokeWidth={2.6} className={styles.plus} />
          <Icon name="minus" size={16} strokeWidth={2.6} className={styles.minus} />
        </span>
      </summary>
      <div ref={panelRef} className={styles.panel}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </details>
  );
}
