'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1600;

function format(value, decimals) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts a number up from zero the first time it scrolls into view. The server renders
 * the final value, so search engines, screen readers and no-JS visitors see the real
 * number; the animation only plays in the browser.
 *
 * @param {object} props
 * @param {number} props.value
 * @param {number} [props.decimals]
 * @param {string} [props.prefix]
 * @param {string} [props.suffix]
 */
export default function CountUp({ value, decimals = 0, prefix = '', suffix = '', className }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {format(shown, decimals)}
        {suffix}
      </span>
      <span className="visually-hidden">
        {prefix}
        {format(value, decimals)}
        {suffix}
      </span>
    </span>
  );
}
