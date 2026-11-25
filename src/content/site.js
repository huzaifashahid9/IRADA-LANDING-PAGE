/** The live domain. */
const PRODUCTION_URL = 'https://irada.live';

/**
 * The public address of the site, used for canonical and share-preview tags, the sitemap
 * and robots.txt. Defaults to the live domain, so every deploy (including previews)
 * points search engines and WhatsApp/Facebook previews at irada.live, never at localhost
 * or a temporary preview address. Set NEXT_PUBLIC_SITE_URL only to override it.
 */
function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, '');
}

/**
 * Site-wide settings. Change these before the pitch.
 * Text in [brackets] renders as a dashed placeholder until it is filled in.
 * Once the email and phone are real, they become tappable mailto: and tel: links.
 */
export const site = {
  name: 'IRADA',
  nameUrdu: 'ارادہ',
  tagline: 'Turn intention into action.',
  description:
    'IRADA is a brain-signal headset, a phone app and a careful AI agent that let people living with paralysis call family, send a message or ask for help, using commands they have practised.',
  url: resolveSiteUrl(),
  team: 'Team Hexabytes',
  versionLine: 'Team Hexabytes · Top 30 at INVENT 2026 · Healthtech',
  disclaimer: 'Assistive prototype, not a medical device',
  /** The 3D model shown in the hero and the headset section. */
  model: {
    src: '/models/headset.glb',
    explodeAnimation: 'Explode',
    assembleAnimation: 'Assemble',
  },
  /** The people to contact. Emails and phones become tappable mailto: and tel: links. */
  contacts: [
    {
      name: 'Muneeb Mustafa',
      role: 'Team lead',
      email: 'muneebmustafa321@gmail.com',
      phone: '+92 345 2750935',
    },
    {
      name: 'Huzaifa Shahid',
      role: 'Build and engineering',
      email: 'huzaifashahid288@gmail.com',
      phone: '+92 310 2239483',
    },
  ],
  city: 'Karachi, Pakistan',
  /** Credit shown in the footer. */
  author: {
    name: 'Huzaifa Shahid',
    url: 'https://github.com/huzaifashahid9',
  },
};

/** Anchor links shown in the floating navigation (and in its menu on phones and tablets). */
export const navLinks = [
  { href: '#how', label: 'How it works' },
  { href: '#headset', label: 'Headset' },
  { href: '#app', label: 'App' },
  { href: '#safety', label: 'Safety' },
  { href: '#market', label: 'Market' },
  { href: '#team', label: 'Team' },
];

export const footerLinks = [
  { href: '#how', label: 'How it works' },
  { href: '#headset', label: 'Headset' },
  { href: '#safety', label: 'Safety' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#team', label: 'Team' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];
