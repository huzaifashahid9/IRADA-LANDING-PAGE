'use client';

import { useState } from 'react';
import { CardText, CardTitle, NumberBadge, Pill } from '@/components/ui';
import { cx } from '@/lib/cx';
import HeadsetViewer from './HeadsetViewer';
import styles from './HeadsetExplorer.module.css';

const VIEW_MODES = [
  { id: 'assembled', label: '3D view' },
  { id: 'exploded', label: 'Exploded' },
];

/**
 * The headset section's interactive area: part cards on both sides of the 3D model.
 * Choosing a card highlights its hotspot on the model, and the reverse.
 */
export default function HeadsetExplorer({ parts, poster }) {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState('assembled');
  const half = Math.ceil(parts.length / 2);

  const renderPart = (part, index) => (
    <li key={part.title}>
      <button
        type="button"
        className={cx(styles.part, selected === index && styles.partActive)}
        aria-pressed={selected === index}
        onClick={() => setSelected(index)}
      >
        <span className={styles.partHead}>
          <NumberBadge>{index + 1}</NumberBadge>
          <CardTitle as="span" size="sm" className={styles.partTitle}>
            {part.title}
          </CardTitle>
        </span>
        <CardText as="span" size="small" color="muted">
          {part.text}
        </CardText>
      </button>
    </li>
  );

  return (
    <div className={styles.explorer}>
      <ul className={styles.list} aria-label="Headset parts, first half">
        {parts.slice(0, half).map((part, i) => renderPart(part, i))}
      </ul>

      <div className={styles.stage}>
        <HeadsetViewer
          poster={poster}
          parts={parts}
          selected={selected}
          onSelect={setSelected}
          exploded={mode === 'exploded'}
          cameraOrbit="-158deg 68deg 145%"
          sizes="(max-width: 1100px) 100vw, 40vw"
          className={styles.viewer}
        />
        <Pill tone="lime" rotate={-4} className={styles.dragTag}>
          Drag to rotate
        </Pill>
        <div className={styles.controls}>
          <Pill tone="dim">360°</Pill>
          <div className={styles.segmented} role="group" aria-label="Model view">
            {VIEW_MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cx(styles.segment, mode === item.id && styles.segmentActive)}
                aria-pressed={mode === item.id}
                onClick={() => setMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className={styles.list} aria-label="Headset parts, second half">
        {parts.slice(half).map((part, i) => renderPart(part, i + half))}
      </ul>
    </div>
  );
}
