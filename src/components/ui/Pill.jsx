import { cx } from '@/lib/cx';
import styles from './Pill.module.css';

/**
 * Rounded label for tags, statuses and state names.
 *
 * @param {object} props
 * @param {'lime'|'white'|'ink'|'glass'|'soft'|'violet'|'outline'|'dim'} [props.tone]
 * @param {'md'|'sm'|'xs'} [props.size]
 * @param {number} [props.rotate] Tilt in degrees, for floating tags.
 */
export default function Pill({
  tone = 'white',
  size = 'md',
  rotate,
  as: Tag = 'span',
  className,
  style,
  children,
}) {
  return (
    <Tag
      className={cx(styles.pill, styles[tone], styles[size], className)}
      style={rotate ? { ...style, transform: `rotate(${rotate}deg)` } : style}
    >
      {children}
    </Tag>
  );
}
