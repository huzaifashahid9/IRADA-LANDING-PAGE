import { cx } from '@/lib/cx';
import styles from './Logo.module.css';

/** The IRADA mark: a lime tile with a headset outline. */
export function LogoMark({ size = 40 }) {
  return (
    <span className={styles.mark} style={{ width: size, height: size }} aria-hidden="true">
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <ellipse cx="12" cy="16" rx="9" ry="3.4" />
        <path d="M3.5 15C4 5 20 5 20.5 15" />
        <circle cx="12" cy="6.6" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

/** Mark plus wordmark. */
export default function Logo({ size = 40, showUrdu = false, className }) {
  return (
    <span className={cx(styles.logo, className)}>
      <LogoMark size={size} />
      <span className={styles.word} style={{ fontSize: size * 0.48 }}>
        IRADA
      </span>
      {showUrdu && (
        <span className={styles.urdu} lang="ur" dir="rtl">
          ارادہ
        </span>
      )}
    </span>
  );
}
