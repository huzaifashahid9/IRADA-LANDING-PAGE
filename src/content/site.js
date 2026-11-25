/**
 * Site-wide settings. Change these before the pitch.
 * Text in [brackets] renders as a dashed placeholder until it is filled in.
 */
export const site = {
  name: 'IRADA',
  nameUrdu: 'ارادہ',
  tagline: 'Turn intention into action.',
  description:
    'IRADA is a brain-signal headset, a phone app and a careful AI agent that let people living with paralysis call family, send a message or ask for help, using commands they have practised.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  team: 'Team Hexabytes',
  versionLine: 'Team Hexabytes · Version 1 · November 2026',
  disclaimer: 'Assistive prototype, not a medical device',
  /** Link to the simulated phone app. Leave null to hide the "Try the simulated app" button. */
  demoUrl: null,
  /** The 3D model shown in the hero and the headset section. */
  model: {
    src: '/models/headset.glb',
    explodeAnimation: 'Explode',
    assembleAnimation: 'Assemble',
  },
  contact: {
    email: '[team email]',
    phone: '[number]',
    city: '[city], Pakistan',
  },
  /** Credit shown in the footer. */
  author: {
    name: 'Anas',
    url: 'https://github.com/anashanif123',
  },
};

/** Anchor links shown in the floating navigation. `wide` links hide on tablets. */
export const navLinks = [
  { href: '#how', label: 'How it works' },
  { href: '#headset', label: 'Headset' },
  { href: '#app', label: 'App', wide: true },
  { href: '#safety', label: 'Safety' },
  { href: '#roadmap', label: 'Roadmap', wide: true },
  { href: '#team', label: 'Team', wide: true },
];

export const footerLinks = [
  { href: '#how', label: 'How it works' },
  { href: '#headset', label: 'Headset' },
  { href: '#safety', label: 'Safety' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#team', label: 'Team' },
  { href: '#faq', label: 'FAQ' },
];
