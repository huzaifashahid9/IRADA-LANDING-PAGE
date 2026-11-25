import { Plus_Jakarta_Sans } from 'next/font/google';
import { site } from '@/content/site';
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
  authors: [{ name: site.author.name, url: site.author.url }, { name: site.team }],
  creator: site.author.name,
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
