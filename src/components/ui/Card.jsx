import { cx } from '@/lib/cx';
import styles from './Card.module.css';

/**
 * Rounded surface used for almost every block on the page.
 *
 * @param {object} props
 * @param {'white'|'soft'|'lavender'|'violet'|'ink'|'raised'|'lime'|'glass'|'dashed'} [props.tone]
 * @param {'sm'|'md'|'lg'|'none'} [props.padding]
 * @param {'md'|'lg'|'xl'} [props.radius]
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export default function Card({
  tone = 'white',
  padding = 'md',
  radius = 'lg',
  as: Tag = 'div',
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cx(
        styles.card,
        styles[tone],
        styles[`pad-${padding}`],
        styles[`radius-${radius}`],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
