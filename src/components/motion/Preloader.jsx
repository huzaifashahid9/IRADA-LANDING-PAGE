'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

/** Shortest time the loading screen stays up, so it never flashes. */
const MIN_MS = 900;
/** Longest time it can stay up, even on a very slow connection. */
const MAX_MS = 3200;

/**
 * Branded loading screen. It is rendered on the server, so it covers the page from the
 * first paint, and lifts once the page has loaded (or after MAX_MS at the latest).
 * Without JavaScript a CSS fallback in the module lifts it after a few seconds.
 * When it lifts it adds `is-loaded` to <html>, which starts the hero entrance.
 */
export default function Preloader() {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    let done = false;
    let leaveTimer;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = reduce ? 0 : Math.max(0, MIN_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => {
        root.classList.add('is-loaded');
        setPhase('leaving');
        window.setTimeout(() => setPhase('gone'), reduce ? 0 : 900);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const safety = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(safety);
      window.clearTimeout(leaveTimer);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      className={styles.preloader}
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label={phase === 'loading' ? 'Loading IRADA' : 'IRADA has loaded'}
    >
      <div className={styles.center}>
        <div className={styles.mark}>
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.pulse} aria-hidden="true" />
          {/* A plain img so the mark shows on the very first paint, before React loads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/irada-mark.svg" alt="" width="72" height="72" className={styles.logo} />
        </div>
        <p className={styles.word} aria-hidden="true">
          <span>I</span>
          <span>R</span>
          <span>A</span>
          <span>D</span>
          <span>A</span>
        </p>
        <p className={styles.tagline} aria-hidden="true">
          Turn intention into action
        </p>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.barFill} />
        </div>
      </div>
    </div>
  );
}
