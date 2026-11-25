'use client';

import { useEffect, useRef } from 'react';
import { cx } from '@/lib/cx';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import styles from './Roadmap.module.css';

/** How far down the screen a phase has to reach to light up. */
const MARK = '65%';

/**
 * The roadmap phases as a vertical timeline. A lime line fills as the page scrolls and
 * each phase lights up when the line reaches it. Without JavaScript, or with reduced
 * motion, every phase shows at full strength.
 */
export default function RoadmapTimeline({ phases }) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const items = Array.from(root.querySelectorAll('li'));
    root.classList.add(styles.animated);

    const context = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: `top ${MARK}`,
            end: `bottom ${MARK}`,
            scrub: 0.4,
          },
        },
      );
      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: `top+=36 ${MARK}`,
          onEnter: () => item.classList.add(styles.reached),
          onLeaveBack: () => item.classList.remove(styles.reached),
        });
      });
    });

    return () => {
      context.revert();
      root.classList.remove(styles.animated);
      items.forEach((item) => item.classList.remove(styles.reached));
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.timeline}>
      <div className={styles.track} aria-hidden="true">
        <div ref={fillRef} className={styles.trackFill} />
      </div>
      <ol className={styles.phases}>
        {phases.map((phase) => (
          <li key={phase.when} className={styles.phase}>
            <span
              className={cx(styles.dot, phase.status && styles[phase.status])}
              aria-hidden="true"
            />
            <div className={styles.phaseCard}>
              <p className={cx(styles.when, phase.status === 'first' && styles.whenFirst)}>
                {phase.when}
              </p>
              <p className={styles.phaseTitle}>{phase.title}</p>
              <p className={styles.phaseText}>{phase.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
