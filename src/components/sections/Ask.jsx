import { Card, Eyebrow, Pill, RichText, Section } from '@/components/ui';
import { ask } from '@/content/ask';
import styles from './Ask.module.css';

export default function Ask() {
  return (
    <Section id="ask" tone="ink" labelledBy="ask-title">
      <div className={styles.grid}>
        <div className={styles.intro}>
          <Eyebrow>{ask.eyebrow}</Eyebrow>
          <p className={styles.amount} aria-hidden="true">
            {ask.amount}
          </p>
          <h2 id="ask-title" className={styles.title}>
            <span className="visually-hidden">{ask.amount} </span>
            {ask.title}
          </h2>
          <ul className={styles.uses} aria-label="What the money is for">
            {ask.uses.map((use) => (
              <li key={use}>
                <Pill tone="glass">{use}</Pill>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.budgets}>
          {ask.budgets.map((budget) => (
            <Card
              key={budget.label}
              tone="raised"
              padding="sm"
              radius="md"
              className={styles.budget}
            >
              <div className={styles.budgetBody}>
                <p className={styles.budgetLabel}>{budget.label}</p>
                <p className={styles.budgetValue}>{budget.value}</p>
              </div>
              {budget.tag && <Pill tone="lime">{budget.tag}</Pill>}
            </Card>
          ))}
          <div className={styles.competition}>
            <p className={styles.competitionLabel}>{ask.competition.label}</p>
            <p className={styles.competitionValue}>
              <RichText text={ask.competition.value} placeholderColor="var(--lime)" />
            </p>
          </div>
          <p className={styles.note}>{ask.note}</p>
        </div>
      </div>
    </Section>
  );
}
