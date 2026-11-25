import { cx } from '@/lib/cx';
import styles from './Eyebrow.module.css';

/** Small uppercase label above a heading. Colour follows the section tone unless set. */
export default function Eyebrow({ as: Tag = 'p', color, className, children }) {
  return (
    <Tag className={cx(styles.eyebrow, className)} style={color ? { color } : undefined}>
      {children}
    </Tag>
  );
}
