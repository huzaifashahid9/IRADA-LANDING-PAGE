import { cx } from '@/lib/cx';
import styles from './Container.module.css';

/** Centres content and applies the page gutter. */
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cx(styles.container, className)} {...rest}>
      {children}
    </Tag>
  );
}
