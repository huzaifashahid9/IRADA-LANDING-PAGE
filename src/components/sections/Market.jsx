import {
  Card,
  CardText,
  CardTitle,
  Eyebrow,
  Grid,
  Section,
  SectionHeading,
  Stat,
} from '@/components/ui';
import { market } from '@/content/market';
import styles from './Market.module.css';

export default function Market() {
  return (
    <Section id="market" tone="violet" labelledBy="market-title">
      <SectionHeading
        id="market-title"
        eyebrow={market.eyebrow}
        title={market.title}
        layout="stack"
      />

      <Grid cols={3} as="ul" className={styles.list}>
        {market.segments.map((segment) => (
          <Card as="li" key={segment.title} tone={segment.tone}>
            <Eyebrow color="var(--card-accent)">{segment.eyebrow}</Eyebrow>
            <CardTitle>{segment.title}</CardTitle>
            <CardText>{segment.text}</CardText>
          </Card>
        ))}
      </Grid>

      <Grid cols={4} gap="md">
        {market.stats.map((stat) => (
          <Stat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </Grid>
    </Section>
  );
}
