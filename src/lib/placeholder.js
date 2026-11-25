/** Matches any [bracketed] part of a content string. */
export const PLACEHOLDER_SPLIT = /(\[[^\]]+\])/;

const HAS_PLACEHOLDER = /\[[^\]]+\]/;

/**
 * True when a content value is missing or still contains a [bracketed] placeholder,
 * so callers can avoid turning unfinished text into links.
 * @param {unknown} value
 */
export function isUnfinished(value) {
  return typeof value !== 'string' || value.trim() === '' || HAS_PLACEHOLDER.test(value);
}

/**
 * Builds a mailto: or tel: link for a finished contact value, or null while it is a placeholder.
 * @param {'email'|'phone'} kind
 * @param {string} value
 */
export function contactHref(kind, value) {
  if (isUnfinished(value)) return null;
  if (kind === 'email') return `mailto:${value.trim()}`;
  // Keep a leading + and digits only, so "+92 300 123 4567" dials on Android and iOS.
  const digits = value.trim().replace(/(?!^\+)[^\d]/g, '');
  return digits.replace('+', '').length >= 7 ? `tel:${digits}` : null;
}
