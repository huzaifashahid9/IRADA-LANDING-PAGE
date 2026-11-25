import {
  Card,
  CardText,
  CardTitle,
  Eyebrow,
  Grid,
  IconBadge,
  Pill,
  RichText,
  Section,
  SectionHeading,
} from '@/components/ui';
import { problem } from '@/content/problem';
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

      <Grid cols={4} as="ul" className={styles.cards}>
        <Card as="li" tone="violet" className={styles.statCard}>
          <Eyebrow color="var(--lime)">{problem.stat.eyebrow}</Eyebrow>
          <div className={styles.statBody}>
            <p className={styles.statValue}>
              <RichText text={problem.stat.value} />
            </p>
            <CardText size="small" strong>
              {problem.stat.text}
            </CardText>
          </div>
        </Card>
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
