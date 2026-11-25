import { Section, SectionHeading } from '@/components/ui';
import { faq } from '@/content/faq';
import FaqItem from './FaqItem';
import styles from './Faq.module.css';

/** Uses native <details> so every answer works without JavaScript and with a keyboard. */
export default function Faq() {
  return (
    <Section id="faq" tone="soft" labelledBy="faq-title">
      <div className={styles.grid}>
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} layout="stack" />
        <div className={styles.list}>
          {faq.items.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
