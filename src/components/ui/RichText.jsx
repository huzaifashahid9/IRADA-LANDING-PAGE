import { Fragment } from 'react';
import Placeholder from './Placeholder';

const SPLIT = /(\[[^\]]+\])/;
const IS_PLACEHOLDER = /^\[[^\]]+\]$/;

/**
 * Renders a content string, turning every [bracketed] part into a <Placeholder>.
 * Content files can then mark missing facts as "[market size]" in plain text.
 */
export default function RichText({ text, placeholderColor }) {
  if (typeof text !== 'string') return text ?? null;

  return text.split(SPLIT).map((part, index) =>
    IS_PLACEHOLDER.test(part) ? (
      <Placeholder key={index} color={placeholderColor}>
        {part}
      </Placeholder>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
