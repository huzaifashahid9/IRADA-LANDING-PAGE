import CountUp from '@/components/motion/CountUp';
import {
  Card,
  CardText,
  CardTitle,
  Eyebrow,
  Grid,
  IconBadge,
  Pill,
  Section,
  SectionHeading,
} from '@/components/ui';
import { problem } from '@/content/problem';
import { cx } from '@/lib/cx';
import styles from './Problem.module.css';

export default function Problem() {
  return (
    <Section id="problem" tone="soft" labelledBy="problem-title" containerClassName={styles.inner}>
      <SectionHeading
        id="problem-title"
        eyebrow={problem.eyebrow}
        title={problem.title}
        lead={problem.lead}
        align="start"
      >
        <ul className={styles.conditions} aria-label="Conditions">
          {problem.conditions.map((condition) => (
            <li key={condition}>
              <Pill tone="white">{condition}</Pill>
            </li>
          ))}
        </ul>
      </SectionHeading>

      <div className={styles.statsBlock}>
        <Grid cols={4} gap="md" as="ul" className={styles.stats}>
          {problem.stats.map((stat, index) => (
            <Card
              as="li"
              key={stat.text}
              tone={index < 2 ? 'violet' : 'ink'}
              padding="md"
              className={cx(styles.statCard)}
            >
              <Eyebrow color="var(--lime)">{stat.where}</Eyebrow>
              <p className={styles.statValue}>
                <CountUp
                  value={stat.count}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <CardText size="small" strong>
                {stat.text}
              </CardText>
              <p className={styles.statSource}>{stat.source}</p>
            </Card>
          ))}
        </Grid>
        <p className={styles.sources}>
          Sources:{' '}
          {problem.sources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && ' · '}
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </span>
          ))}
        </p>
      </div>

      <Grid cols={3} as="ul" className={styles.cards}>
        {problem.audiences.map((audience) => (
          <Card as="li" key={audience.title}>
            <IconBadge name={audience.icon} />
            <Eyebrow>{audience.eyebrow}</Eyebrow>
            <CardTitle>{audience.title}</CardTitle>
            <CardText>{audience.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
