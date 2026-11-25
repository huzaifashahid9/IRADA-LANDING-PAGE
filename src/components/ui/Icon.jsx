/**
 * Stroke icons used across the page. Each entry is the inner SVG markup on a 24×24 grid.
 * Icons are decorative by default; pass `label` to expose one to screen readers.
 */
const PATHS = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  rotate: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  building: <path d="M3 21h18M5 21V8l7-5 7 5v13M10 21v-5h4v5M9 11h6" />,
  heart: <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  message: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  alert: (
    <>
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 10v4M12 17.5v.01" />
    </>
  ),
  plus: <path d="M5 12h14M12 5v14" />,
  minus: <path d="M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  zoomIn: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M8 11h6M11 8v6" />
    </>
  ),
  reset: (
    <>
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 4v5h5" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.6-3S17 11.6 17 13.3V17" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
};

/**
 * @param {object} props
 * @param {keyof typeof PATHS} props.name
 * @param {number} [props.size]
 * @param {number} [props.strokeWidth]
 * @param {string} [props.label] Accessible name. Omit for decorative icons.
 */
export default function Icon({ name, size = 20, strokeWidth = 2, label, className, style }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={className}
      style={style}
      {...a11y}
    >
      {PATHS[name]}
    </svg>
  );
}
