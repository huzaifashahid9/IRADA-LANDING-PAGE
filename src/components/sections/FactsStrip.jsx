import { Container } from '@/components/ui';
import { facts } from '@/content/hero';
import styles from './FactsStrip.module.css';

export default function FactsStrip() {
  return (
    <div className={styles.strip}>
      <Container>
        <ul className={styles.list} aria-label="Key facts">
          {facts.map((fact) => (
            <li key={fact.text}>
              {fact.value && <span className={styles.value}>{fact.value} </span>}
              {fact.text}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
