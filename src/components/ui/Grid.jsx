import { cx } from '@/lib/cx';
import styles from './Grid.module.css';

/**
 * Responsive equal-column grid. Five and six columns drop to three on tablets,
 * and every grid becomes one column on phones.
 *
 * @param {object} props
 * @param {2|3|4|5|6} props.cols
 * @param {'sm'|'md'|'lg'} [props.gap]
 */
export default function Grid({ cols, gap = 'lg', as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={cx(styles.grid, styles[`cols-${cols}`], styles[`gap-${gap}`], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
