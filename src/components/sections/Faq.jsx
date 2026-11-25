import { Icon, Section, SectionHeading } from '@/components/ui';
import { faq } from '@/content/faq';
import styles from './Faq.module.css';

/** Uses native <details> so every answer works without JavaScript and with a keyboard. */
export default function Faq() {
  return (
    <Section id="faq" tone="soft" labelledBy="faq-title">
      <div className={styles.grid}>
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} layout="stack" />
        <div className={styles.list}>
          {faq.items.map((item, index) => (
            <details
              key={item.question}
              className={styles.item}
              open={index === 0}
              data-reveal=""
            >
              <summary className={styles.summary}>
                <span>{item.question}</span>
                <span className={styles.toggle} aria-hidden="true">
                  <Icon name="plus" size={16} strokeWidth={2.6} className={styles.plus} />
                  <Icon name="minus" size={16} strokeWidth={2.6} className={styles.minus} />
                </span>
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
