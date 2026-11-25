import styles from './SkipLink.module.css';

/** Lets keyboard users jump past the navigation. */
export default function SkipLink({ href = '#main' }) {
  return (
    <a href={href} className={styles.skip}>
      Skip to content
    </a>
  );
}
