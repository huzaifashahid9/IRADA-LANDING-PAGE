import { Card, CardText, CardTitle, Grid, Section, SectionHeading } from '@/components/ui';
import { privacy } from '@/content/privacy';
import styles from './Privacy.module.css';

export default function Privacy() {
  return (
    <Section id="privacy" tone="light" labelledBy="privacy-title">
      <SectionHeading
        id="privacy-title"
        eyebrow={privacy.eyebrow}
        title={privacy.title}
        lead={privacy.lead}
      />
      <Grid cols={3} as="ul" className={styles.list}>
        {privacy.points.map((point) => (
          <Card
            as="li"
            key={point.title}
            tone="soft"
            padding="md"
            radius="md"
            className={styles.card}
          >
            <CardTitle size="md">{point.title}</CardTitle>
            <CardText>{point.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
