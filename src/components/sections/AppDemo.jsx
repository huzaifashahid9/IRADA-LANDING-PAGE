import { ConfirmScreen, HomeScreen, IntentScreen } from '@/components/app-demo/DemoScreens';
import PhoneFrame from '@/components/app-demo/PhoneFrame';
import { Button, Card, CardText, Eyebrow, Grid, Section, SectionHeading } from '@/components/ui';
import { appDemo } from '@/content/appDemo';
import { site } from '@/content/site';
import styles from './AppDemo.module.css';

export default function AppDemo() {
  const [home, intent, confirm] = appDemo.screens;

  return (
    <Section id="app" tone="deep" labelledBy="app-title" containerClassName={styles.inner}>
      <SectionHeading
        id="app-title"
        eyebrow={appDemo.eyebrow}
        title={appDemo.title}
        lead={appDemo.lead}
        layout="center"
      />

      {/* On phones this row scrolls sideways and snaps to each screen. */}
      <div className={styles.phones} role="region" aria-label="Demo screens" tabIndex={0}>
        <PhoneFrame caption={home} screen="violet">
          <HomeScreen />
        </PhoneFrame>
        <PhoneFrame caption={intent} screen="white" raised>
          <IntentScreen />
        </PhoneFrame>
        <PhoneFrame caption={confirm} screen="lime">
          <ConfirmScreen />
        </PhoneFrame>
      </div>
      <p className={styles.swipeHint} aria-hidden="true">
        Swipe to see all three screens
      </p>

      <Grid cols={3} as="ul" className={styles.views}>
        {appDemo.views.map((view) => (
          <Card
            as="li"
            key={view.eyebrow}
            tone="glass"
            padding="md"
            radius="md"
            className={styles.view}
          >
            <Eyebrow>{view.eyebrow}</Eyebrow>
            <CardText>{view.text}</CardText>
          </Card>
        ))}
      </Grid>

      {site.demoUrl && (
        <div className={styles.cta}>
          <Button href={site.demoUrl} arrow>
            Try the simulated app
          </Button>
        </div>
      )}
    </Section>
  );
}
