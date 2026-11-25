import { Card, CardText, CardTitle, Icon, Section, SectionHeading } from '@/components/ui';
import { positioning } from '@/content/positioning';
import styles from './Positioning.module.css';

export default function Positioning() {
  const [optionLabel, needsLabel, gapLabel] = positioning.columns;
  const { irada } = positioning;

  return (
    <Section id="why" tone="soft" labelledBy="why-title">
      <SectionHeading
        id="why-title"
        eyebrow={positioning.eyebrow}
        title={positioning.title}
        lead={positioning.lead}
      />

      <div className={styles.tableWrap} data-reveal="">
        <table className={styles.table}>
          <caption className="visually-hidden">
            How IRADA compares with the options people have today
          </caption>
          <thead>
            <tr>
              {positioning.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {positioning.rows.map((row) => (
              <tr key={row.option}>
                <th scope="row" data-label={optionLabel}>
                  <span className={styles.option}>{row.option}</span>
                  {row.example && <span className={styles.example}>{row.example}</span>}
                </th>
                <td data-label={needsLabel}>{row.needs}</td>
                <td data-label={gapLabel}>{row.gap}</td>
              </tr>
            ))}
            <tr className={styles.irada}>
              <th scope="row" data-label={optionLabel}>
                <span className={styles.option}>
                  <Icon name="bolt" size={18} strokeWidth={2.4} />
                  {irada.option}
                </span>
              </th>
              <td data-label={needsLabel}>{irada.needs}</td>
              <td data-label={gapLabel}>{irada.gap}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.split}>
        <Card tone="violet" className={styles.edges}>
          <CardTitle as="h3" size="sm">
            Our edge
          </CardTitle>
          <ol className={styles.edgeList}>
            {positioning.edges.map((edge, index) => (
              <li key={edge}>
                <span className={styles.edgeNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <CardText as="span" strong>
                  {edge}
                </CardText>
              </li>
            ))}
          </ol>
        </Card>
        <Card tone="soft" className={styles.copy}>
          <CardTitle as="h3" size="sm">
            {positioning.copy.title}
          </CardTitle>
          <CardText>{positioning.copy.text}</CardText>
        </Card>
      </div>
    </Section>
  );
}
