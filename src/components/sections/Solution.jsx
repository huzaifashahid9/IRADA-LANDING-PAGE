import Image from 'next/image';
import { Card, CardText, CardTitle, Grid, Pill, Section, SectionHeading } from '@/components/ui';
import { solution } from '@/content/solution';
import { cx } from '@/lib/cx';
import styles from './Solution.module.css';

export default function Solution() {
  const { quote } = solution;

  return (
    <Section
      id="solution"
      tone="light"
      labelledBy="solution-title"
      containerClassName={styles.inner}
    >
      <SectionHeading
        id="solution-title"
        eyebrow={solution.eyebrow}
        title={solution.title}
        layout="stack"
      />

      <Grid cols={3} as="ul" className={styles.pillars}>
        {solution.pillars.map((pillar) => (
          <Card
            as="li"
            key={pillar.title}
            tone="lavender"
            padding="none"
            radius="xl"
            className={styles.pillar}
          >
            <div className={cx(styles.media, styles[pillar.tone])}>
              <Image src={pillar.image} alt="" width={360} height={360} className={styles.image} />
            </div>
            <div className={styles.body}>
              <CardTitle>{pillar.title}</CardTitle>
              <CardText>{pillar.text}</CardText>
            </div>
          </Card>
        ))}
      </Grid>

      <div className={styles.newBlock} data-reveal="">
        <p className={styles.newTitle}>{solution.newPoints.title}</p>
        <ul className={styles.newList}>
          {solution.newPoints.items.map((item) => (
            <li key={item}>
              <Pill tone="lime">{item}</Pill>
            </li>
          ))}
        </ul>
      </div>

      <figure className={styles.quote} data-reveal="">
        <blockquote className={styles.quoteText}>
          {quote.lead} <span className={styles.highlight}>{quote.highlight}</span> {quote.rest}
        </blockquote>
        <figcaption className={styles.caption}>{quote.caption}</figcaption>
      </figure>
    </Section>
  );
}
