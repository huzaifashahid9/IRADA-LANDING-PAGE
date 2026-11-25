import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import SkipLink from '@/components/layout/SkipLink';
import {
  AppDemo,
  BuildTiers,
  Contact,
  FactsStrip,
  Faq,
  Headset,
  Hero,
  HowItWorks,
  InputMethods,
  Market,
  Measures,
  Positioning,
  Privacy,
  Problem,
  Roadmap,
  Safety,
  Solution,
  Team,
  Traction,
  UseCases,
} from '@/components/sections';
import { footerLinks, navLinks, site } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <SkipLink href="#main" />
      <Navbar links={navLinks} cta={{ href: '#app', label: 'Try the app' }} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <FactsStrip />
        <Problem />
        <Solution />
        <HowItWorks />
        <Headset />
        <InputMethods />
        <AppDemo />
        <Safety />
        <Privacy />
        <Positioning />
        <Market />
        <UseCases />
        <BuildTiers />
        <Roadmap />
        <Measures />
        <Traction />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer
        links={footerLinks}
        disclaimer={site.disclaimer}
        team={site.team}
        authors={site.authors}
      />
    </>
  );
}
