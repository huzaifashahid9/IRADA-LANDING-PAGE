import LiveDemo from '@/components/app-demo/LiveDemo';
import { Card, CardText, Eyebrow, Grid, Section, SectionHeading } from '@/components/ui';
import { appDemo } from '@/content/appDemo';
import styles from './AppDemo.module.css';

export default function AppDemo() {
  return (
    <Section id="app" tone="deep" labelledBy="app-title" containerClassName={styles.inner}>
      <SectionHeading
        id="app-title"
        eyebrow={appDemo.eyebrow}
        title={appDemo.title}
        lead={appDemo.lead}
        layout="center"
      />

      <div data-reveal="">
        <LiveDemo content={appDemo} />
      </div>

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
    </Section>
  );
}
