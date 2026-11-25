import { cx } from '@/lib/cx';
import styles from './PhoneFrame.module.css';

/**
 * A phone outline with a caption. The screen is a static mock-up, so it is
 * described to screen readers by the caption and its text, not as a live app.
 *
 * @param {object} props
 * @param {string} props.caption
 * @param {'violet'|'white'|'lime'} [props.screen] Screen background.
 * @param {boolean} [props.raised] Lift the phone slightly, for the middle one.
 */
export default function PhoneFrame({ caption, screen = 'white', raised = false, children }) {
  return (
    <figure className={styles.figure}>
      <div className={cx(styles.phone, raised && styles.raised)}>
        <div className={cx(styles.screen, styles[screen])}>{children}</div>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
