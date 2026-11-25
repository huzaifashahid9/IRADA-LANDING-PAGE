import { cx } from '@/lib/cx';
import styles from './NumberBadge.module.css';

/** A small numbered circle, matching the hotspots on the 3D headset. */
export default function NumberBadge({ children, tone = 'lime', size = 30, className }) {
  return (
    <span
      className={cx(styles.badge, styles[tone], className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
