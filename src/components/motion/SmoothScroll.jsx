'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Smooth scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger animations stay
 * in step with it. In-page links glide too, stopping below the navigation thanks to
 * `scroll-padding-top`. Touch screens keep their native scrolling, and visitors who
 * prefer reduced motion get plain scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Re-measure scroll triggers when the page height changes (fonts, images, the demo log).
    let refreshTimer;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    const stopObserving = () => {
      observer.disconnect();
      window.clearTimeout(refreshTimer);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return stopObserving;

    const lenis = new Lenis({ anchors: true, lerp: 0.1 });
    const raf = (seconds) => lenis.raf(seconds * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      stopObserving();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
