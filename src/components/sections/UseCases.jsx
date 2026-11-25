import { CardText, CardTitle, Pill, Section, SectionHeading } from '@/components/ui';
import { useCases } from '@/content/useCases';
import styles from './UseCases.module.css';

export default function UseCases() {
  return (
    <Section id="uses" tone="soft" labelledBy="uses-title" containerClassName={styles.inner}>
      <SectionHeading
        id="uses-title"
        eyebrow={useCases.eyebrow}
        title={useCases.title}
        lead={useCases.lead}
      />
      <ol className={styles.list}>
        {useCases.items.map((item, index) => (
          <li key={item.title} className={styles.item} data-reveal="">
            <span className={styles.number} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.body}>
              <CardTitle size="md" className={styles.title}>
                {item.title}
              </CardTitle>
              <CardText>{item.text}</CardText>
            </div>
            <Pill tone={item.tone}>{item.status}</Pill>
          </li>
        ))}
      </ol>
    </Section>
  );
}
