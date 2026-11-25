import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import SkipLink from '@/components/layout/SkipLink';
import {
  AppDemo,
  Ask,
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
  Privacy,
  Problem,
  Roadmap,
  Safety,
  Solution,
  Team,
  UseCases,
} from '@/components/sections';
import { footerLinks, navLinks, site } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <SkipLink href="#main" />
      <Navbar links={navLinks} cta={{ href: '#ask', label: 'Back the pilot' }} />
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
        <UseCases />
        <Market />
        <BuildTiers />
        <Roadmap />
        <Measures />
        <Team />
        <Ask />
        <Faq />
        <Contact />
      </main>
      <Footer
        links={footerLinks}
        disclaimer={site.disclaimer}
        team={site.team}
        author={site.author}
      />
    </>
  );
}
