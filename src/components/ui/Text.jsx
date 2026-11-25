import { cx } from '@/lib/cx';
import RichText from './RichText';
import styles from './Text.module.css';

/**
 * Card-level heading. Section titles use <SectionHeading> instead.
 *
 * @param {object} props
 * @param {'h3'|'h4'|'p'} [props.as]
 * @param {'lg'|'md'|'sm'} [props.size] 26px, 21–22px or 18–20px.
 */
export function CardTitle({ as: Tag = 'h3', size = 'lg', className, children }) {
  return <Tag className={cx(styles.title, styles[`title-${size}`], className)}>{children}</Tag>;
}

/**
 * Body copy inside a card. Text in [brackets] becomes a placeholder.
 *
 * @param {object} props
 * @param {'body'|'small'} [props.size]
 * @param {'text'|'muted'|'accent'|'inherit'} [props.color]
 * @param {boolean} [props.strong] Use the heavier 600–700 weight.
 */
export function CardText({
  as: Tag = 'p',
  size = 'body',
  color = 'text',
  strong = false,
  className,
  text,
  children,
}) {
  return (
    <Tag className={cx(styles[size], styles[`color-${color}`], strong && styles.strong, className)}>
      {text !== undefined ? <RichText text={text} /> : children}
    </Tag>
  );
}
