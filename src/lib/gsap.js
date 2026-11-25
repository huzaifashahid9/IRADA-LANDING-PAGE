import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// One place to register plugins. Registration needs `window`, so the server skips it.
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
