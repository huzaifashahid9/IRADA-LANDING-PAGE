import Image from 'next/image';
import { cx } from '@/lib/cx';
import styles from './Logo.module.css';

/**
 * The IRADA artwork, cropped from public/logos/irada-logo-transparent.svg.
 * White and lime on transparent, so every variant is meant for dark backgrounds.
 * `ratio` is width ÷ height, from each file's viewBox.
 */
const ARTWORK = {
  /** Lightning-bolt "I" + RADA. Fits a single line, for the navigation. */
  wordmark: { src: '/logos/irada-wordmark.svg', ratio: 3263 / 760, alt: 'IRADA' },
  /** Symbol, wordmark and "by Hexabytes", stacked. */
  full: { src: '/logos/irada-logo.svg', ratio: 3263 / 2439, alt: 'IRADA by Hexabytes' },
  /** Power ring and bolt on their own. */
  mark: { src: '/logos/irada-mark.svg', ratio: 1, alt: 'IRADA' },
};

function Artwork({ variant, height, eager, decorative, className }) {
  const art = ARTWORK[variant];
  return (
    <Image
      src={art.src}
      alt={decorative ? '' : art.alt}
      width={Math.round(height * art.ratio)}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
      className={cx(styles.image, className)}
    />
  );
}

/** The symbol alone (power ring and bolt). */
export function LogoMark({ size = 40, decorative = false, className }) {
  return <Artwork variant="mark" height={size} decorative={decorative} className={className} />;
}

/**
 * The IRADA logo.
 *
 * @param {object} props
 * @param {'wordmark'|'full'|'mark'} [props.variant] wordmark for one line, full for the stacked lockup.
 * @param {number} [props.size] Height in pixels.
 * @param {boolean} [props.showUrdu] Add ارادہ beside the logo.
 * @param {boolean} [props.eager] Load immediately (for the navigation, which is always on screen).
 */
export default function Logo({
  variant = 'wordmark',
  size = 26,
  showUrdu = false,
  eager = false,
  className,
}) {
  return (
    <span className={cx(styles.logo, className)}>
      <Artwork variant={variant} height={size} eager={eager} />
      {showUrdu && (
        <span className={styles.urdu} lang="ur" dir="rtl">
          ارادہ
        </span>
      )}
    </span>
  );
}
