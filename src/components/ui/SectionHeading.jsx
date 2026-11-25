import { cx } from '@/lib/cx';
import Eyebrow from './Eyebrow';
import RichText from './RichText';
import styles from './SectionHeading.module.css';

/**
 * Eyebrow, title and optional lead paragraph for a section.
 *
 * @param {object} props
 * @param {string} props.id Id for the h2, so the section can point aria-labelledby at it.
 * @param {string} props.eyebrow
 * @param {import('react').ReactNode} props.title
 * @param {string} [props.lead]
 * @param {'split'|'center'|'stack'} [props.layout] split puts the lead beside the title.
 * @param {'end'|'start'} [props.align] Vertical alignment for the split layout.
 * @param {string} [props.titleClassName]
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  layout = 'split',
  align = 'end',
  titleClassName,
  children,
}) {
  const heading = (
    <div className={styles.titleBlock}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className={cx(styles.title, titleClassName)}>
        {title}
      </h2>
    </div>
  );

  const leadBlock = lead ? (
    <p className={styles.lead}>
      <RichText text={lead} />
    </p>
  ) : null;

  return (
    <header
      data-reveal=""
      className={cx(
        styles.heading,
        styles[layout],
        layout === 'split' && align === 'start' && styles.alignStart,
      )}
    >
      {heading}
      {(leadBlock || children) && (
        <div className={styles.aside}>
          {leadBlock}
          {children}
        </div>
      )}
    </header>
  );
}
