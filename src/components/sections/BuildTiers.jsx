import { Card, CardText, CardTitle, Eyebrow, Grid, Section, SectionHeading } from '@/components/ui';
import { buildTiers } from '@/content/buildTiers';
import styles from './BuildTiers.module.css';

export default function BuildTiers() {
  return (
    <Section id="build" tone="light" labelledBy="build-title">
      <SectionHeading
        id="build-title"
        eyebrow={buildTiers.eyebrow}
        title={buildTiers.title}
        lead={buildTiers.lead}
      />
      <Grid cols={5} gap="sm" as="ol" className={styles.list}>
        {buildTiers.tiers.map((tier) => (
          <Card
            as="li"
            key={tier.label}
            tone={tier.tone}
            padding="sm"
            radius="md"
            className={styles.tier}
          >
            <Eyebrow color="var(--card-accent)">{tier.label}</Eyebrow>
            <CardTitle size="md">{tier.title}</CardTitle>
            <p className={styles.price}>{tier.price}</p>
            <CardText size="small">{tier.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
