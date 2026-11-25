import Link from 'next/link';
import { cx } from '@/lib/cx';
import Icon from './Icon';
import styles from './Button.module.css';

/**
 * Pill-shaped call to action. Renders a link when `href` is given, otherwise a <button>.
 *
 * @param {object} props
 * @param {'lime'|'black'|'ghost'} [props.variant]
 * @param {'md'|'sm'} [props.size]
 * @param {string} [props.href]
 * @param {boolean} [props.arrow] Show a trailing arrow icon.
 */
export default function Button({
  variant = 'lime',
  size = 'md',
  href,
  arrow = false,
  className,
  children,
  ...rest
}) {
  const classes = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrowRight" size={20} strokeWidth={2.2} />}
    </>
  );

  if (href) {
    if (/^https?:\/\//i.test(href)) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {content}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      );
    }
    // Same-page anchors and mailto:/tel: links are plain links, not app routes.
    if (/^(#|mailto:|tel:)/i.test(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
