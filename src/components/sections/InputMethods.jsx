import { Card, CardText, CardTitle, Grid, Pill, Section, SectionHeading } from '@/components/ui';
import { inputs } from '@/content/inputs';
import styles from './InputMethods.module.css';

export default function InputMethods() {
  const { fallback } = inputs;

  return (
    <Section id="inputs" tone="soft" labelledBy="inputs-title">
      <SectionHeading
        id="inputs-title"
        eyebrow={inputs.eyebrow}
        title={inputs.title}
        lead={inputs.lead}
      />

      <Grid cols={4} as="ul" className={styles.list}>
        {inputs.methods.map((method) => (
          <Card as="li" key={method.title} className={styles.card}>
            <Pill tone={method.tagTone} className={styles.tag}>
              {method.tag}
            </Pill>
            <CardTitle>{method.title}</CardTitle>
            <CardText>{method.text}</CardText>
            <div className={styles.notes}>
              <p className={styles.good}>{method.good}</p>
              <p className={styles.watch}>{method.watch}</p>
            </div>
          </Card>
        ))}
        <Card as="li" tone="ink" className={styles.card}>
          <Pill tone="glass" className={styles.tag}>
            {fallback.tag}
          </Pill>
          <CardTitle>{fallback.title}</CardTitle>
          <CardText>{fallback.text}</CardText>
          <div className={styles.notes}>
            <p className={styles.always}>{fallback.note}</p>
          </div>
        </Card>
      </Grid>
    </Section>
  );
}
