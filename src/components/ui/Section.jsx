import { cx } from '@/lib/cx';
import Container from './Container';
import styles from './Section.module.css';

/**
 * A full-width page section with a colour tone. The tone also sets CSS variables
 * (--tone-eyebrow, --tone-lead, --tone-muted) that headings and cards inside read.
 *
 * @param {object} props
 * @param {string} props.id Anchor id used by the navigation.
 * @param {'light'|'soft'|'violet'|'deep'|'night'|'ink'|'lime'} [props.tone]
 * @param {string} [props.labelledBy] Id of the heading that names this section.
 * @param {boolean} [props.flush] Skip the default vertical padding.
 * @param {string} [props.containerClassName] Extra class for the inner container.
 */
export default function Section({
  id,
  tone = 'light',
  labelledBy,
  flush = false,
  className,
  containerClassName,
  children,
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(styles.section, styles[tone], flush && styles.flush, className)}
    >
      <Container className={cx(styles.inner, containerClassName)}>{children}</Container>
    </section>
  );
}
