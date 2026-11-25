import CountUp from '@/components/motion/CountUp';
import {
  Card,
  CardText,
  CardTitle,
  Eyebrow,
  Grid,
  Icon,
  Section,
  SectionHeading,
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
        lead={market.lead}
      />

      <Grid cols={3} as="ul" className={styles.list}>
        {market.stats.map((stat) => (
          <Card as="li" key={stat.eyebrow} tone={stat.tone} className={styles.stat}>
            <Eyebrow color="var(--card-accent)">{stat.eyebrow}</Eyebrow>
            <p className={styles.value}>
              {stat.value ?? (
                <CountUp
                  value={stat.count}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              )}
            </p>
            <CardText>{stat.text}</CardText>
          </Card>
        ))}
      </Grid>

      <div className={styles.split}>
        <div className={styles.block} data-reveal="">
          <h3 className={styles.blockTitle}>{market.entry.title}</h3>
          <ol className={styles.steps}>
            {market.entry.steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <CardTitle as="p" size="sm">
                    {step.title}
                  </CardTitle>
                  <CardText size="small">{step.text}</CardText>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Card tone="ink" className={styles.model}>
          <h3 className={styles.blockTitle}>{market.model.title}</h3>
          <ul className={styles.points}>
            {market.model.points.map((point) => (
              <li key={point}>
                <span className={styles.check} aria-hidden="true">
                  <Icon name="check" size={14} strokeWidth={3} />
                </span>
                <CardText as="span">{point}</CardText>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p className={styles.source}>{market.sourceNote}</p>
    </Section>
  );
}
