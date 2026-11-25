import { Plus_Jakarta_Sans } from 'next/font/google';
import RevealObserver from '@/components/motion/RevealObserver';
import ScrollProgress from '@/components/motion/ScrollProgress';
import SmoothScroll from '@/components/motion/SmoothScroll';
import { site } from '@/content/site';
import 'lenis/dist/lenis.css';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [...site.authors.map(({ name, url }) => ({ name, url })), { name: site.team }],
  creator: site.authors.map((person) => person.name).join(' and '),
  keywords: [
    'IRADA',
    'brain-computer interface',
    'EEG headset',
    'assistive technology',
    'paralysis',
    'Pakistan',
  ],
  alternates: { canonical: '/' },
  // Stop iOS Safari from turning prices and ranges such as "PKR 400,000–900,000" into
  // phone links. Real contact details are explicit mailto:/tel: links instead.
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [{ url: '/images/hero.png', width: 760, height: 720, alt: 'The IRADA headset' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ['/images/hero.png'],
  },
};

export const viewport = {
  themeColor: '#5b3df5',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

/**
 * A reload starts at the top. The browser decides whether to restore the scroll position
 * from what the page set before it was left, hence `pagehide`; any #section is also
 * dropped on reload so the browser does not jump there. Inline, so it runs before the
 * browser scrolls. Shared #section links keep working.
 */
const RELOAD_TO_TOP = `(function () {
  addEventListener('pagehide', function () {
    history.scrollRestoration = 'manual';
  });
  addEventListener('pageshow', function () {
    setTimeout(function () {
      history.scrollRestoration = 'auto';
    }, 0);
  });
  var entry = performance.getEntriesByType('navigation')[0];
  if (entry && entry.type === 'reload' && location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search);
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
