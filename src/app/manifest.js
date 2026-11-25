import { site } from '@/content/site';

/** Web app manifest: the name and icon Android uses for "Add to Home screen". */
export default function manifest() {
  return {
    name: `${site.name} · ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0e0b1a',
    theme_color: '#5b3df5',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
