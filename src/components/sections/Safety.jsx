import { Card, Eyebrow, Grid, Section } from '@/components/ui';
import { safety } from '@/content/safety';
import styles from './Safety.module.css';

export default function Safety() {
  return (
    <Section id="safety" tone="ink" labelledBy="safety-title" containerClassName={styles.inner}>
      <div className={styles.top}>
        <header className={styles.intro}>
          <Eyebrow>{safety.eyebrow}</Eyebrow>
          <h2 id="safety-title" className={styles.title}>
            You confirm <span className={styles.accent}>every</span> action.
          </h2>
          <p className={styles.lead}>{safety.lead}</p>
        </header>

        <ol className={styles.rules}>
          {safety.rules.map((rule, index) => (
            <li key={rule.title} className={styles.rule} data-reveal="">
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.ruleBody}>
                <p className={styles.ruleTitle}>{rule.title}</p>
                <p className={styles.ruleText}>{rule.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Grid cols={2}>
        <Card padding="lg" className={styles.limitCard}>
          <Eyebrow color="var(--good)">What it can do</Eyebrow>
          <p className={styles.limitText}>{safety.can}</p>
        </Card>
        <Card tone="raised" padding="lg" className={styles.limitCard}>
          <Eyebrow color="var(--danger-soft)">What it cannot do</Eyebrow>
          <p className={styles.limitText}>{safety.cannot}</p>
        </Card>
      </Grid>

      <aside className={styles.disclaimer} aria-label="Disclaimer">
        <p className={styles.disclaimerTitle}>{safety.disclaimer.title}</p>
        <p className={styles.disclaimerText}>{safety.disclaimer.text}</p>
      </aside>
    </Section>
  );
}
