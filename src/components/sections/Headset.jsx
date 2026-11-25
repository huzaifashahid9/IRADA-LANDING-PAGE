import HeadsetExplorer from '@/components/headset/HeadsetExplorer';
import { RichText, Section, SectionHeading } from '@/components/ui';
import { headset } from '@/content/headset';
import styles from './Headset.module.css';

export default function Headset() {
  return (
    <Section id="headset" tone="night" labelledBy="headset-title">
      <SectionHeading
        id="headset-title"
        eyebrow={headset.eyebrow}
        title={headset.title}
        lead={headset.lead}
        layout="center"
      />

      <HeadsetExplorer parts={headset.parts} poster={headset.poster} />

      <dl className={styles.specs}>
        {headset.specs.map((spec) => (
          <div key={spec.label} className={styles.spec}>
            <dt className={styles.label}>{spec.label}</dt>
            <dd className={styles.value}>
              <RichText text={spec.value} placeholderColor="var(--violet-400)" />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
