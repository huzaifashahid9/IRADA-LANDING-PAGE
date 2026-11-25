import Image from 'next/image';
import { CardText, CardTitle, Eyebrow, Grid, Pill, Section, SectionHeading } from '@/components/ui';
import { howItWorks } from '@/content/howItWorks';
import { cx } from '@/lib/cx';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const { stateMachine } = howItWorks;

  return (
    <Section id="how" tone="violet" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        lead={howItWorks.lead}
      />

      <Grid cols={5} gap="sm" as="ol" className={styles.steps}>
        {howItWorks.steps.map((step, index) => (
          <li key={step.title} className={styles.step} data-reveal="">
            <div className={styles.media}>
              <Image src={step.image} alt="" width={360} height={360} className={styles.image} />
            </div>
            <p className={styles.number}>{String(index + 1).padStart(2, '0')}</p>
            <CardTitle className={styles.pad}>{step.title}</CardTitle>
            <CardText size="small" className={cx(styles.pad, styles.text)}>
              {step.text}
            </CardText>
          </li>
        ))}
      </Grid>

      <div className={styles.machine} data-reveal="">
        <Eyebrow color="var(--lavender-300)">{stateMachine.caption}</Eyebrow>
        <ol className={styles.flow} aria-label="Interaction states">
          {stateMachine.flow.map((state, index) => (
            <li key={state} className={styles.flowItem}>
              {index > 0 && (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              )}
              <Pill tone={state === stateMachine.highlight ? 'lime' : 'glass'}>{state}</Pill>
            </li>
          ))}
          <li className={styles.divider} aria-hidden="true" />
          {stateMachine.exits.map((state) => (
            <li key={state}>
              <Pill tone="ink" className={state === 'Error' ? styles.error : undefined}>
                {state}
              </Pill>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
