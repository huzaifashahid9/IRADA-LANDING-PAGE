import { cx } from '@/lib/cx';
import RichText from './RichText';
import styles from './Stat.module.css';

/**
 * A big number with a caption under a top rule.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.value
 * @param {string} props.label
 * @param {string} [props.unit] Smaller suffix after the value, such as "min" or "%".
 * @param {'md'|'xl'} [props.size]
 */
export default function Stat({ value, unit, label, size = 'md', className }) {
  return (
    <div className={cx(styles.stat, styles[size], className)} data-reveal="">
      <p className={styles.value}>
        <RichText text={value} />
        {unit && <span className={styles.unit}>{unit}</span>}
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
