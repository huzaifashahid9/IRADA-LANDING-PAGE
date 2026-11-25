import styles from './Placeholder.module.css';

/**
 * A dashed box marking content that still has to be filled in before the pitch,
 * for example a market size that needs a verified source.
 */
export default function Placeholder({ children, color }) {
  return (
    <span className={styles.placeholder} style={color ? { color } : undefined}>
      {children}
    </span>
  );
}
