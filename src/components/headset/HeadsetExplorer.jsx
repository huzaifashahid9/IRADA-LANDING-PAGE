'use client';

import { useRef, useState } from 'react';
import { CardText, CardTitle, NumberBadge, Pill } from '@/components/ui';
import { cx } from '@/lib/cx';
import HeadsetViewer from './HeadsetViewer';
import styles from './HeadsetExplorer.module.css';

const VIEW_MODES = [
  { id: 'assembled', label: '3D view' },
  { id: 'exploded', label: 'Exploded' },
];

/**
 * Scrolls the model back into view when it is mostly off screen. On phones and tablets
 * the part cards sit below the model, so without this a tap on a card would turn a
 * model the user cannot see.
 */
function revealStage(stage) {
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
  if (visible >= rect.height * 0.6) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  stage.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
}

/**
 * The headset section's interactive area: part cards on both sides of the 3D model.
 * Choosing a card highlights its hotspot on the model, and the reverse. If the model
 * cannot load, the cards still work and the 3D-only controls are hidden.
 */
export default function HeadsetExplorer({ parts, poster }) {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState('assembled');
  const [status, setStatus] = useState('loading');
  const stageRef = useRef(null);
  const half = Math.ceil(parts.length / 2);
  const ready = status === 'ready';

  const choosePart = (index) => {
    setSelected(index);
    if (ready) revealStage(stageRef.current);
  };

  const renderPart = (part, index) => (
    <li key={part.title}>
      <button
        type="button"
        className={cx(styles.part, selected === index && styles.partActive)}
        aria-pressed={selected === index}
        onClick={() => choosePart(index)}
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

      <div ref={stageRef} className={styles.stage}>
        <HeadsetViewer
          poster={poster}
          parts={parts}
          selected={selected}
          onSelect={setSelected}
          exploded={mode === 'exploded'}
          onStatusChange={setStatus}
          cameraOrbit="-158deg 68deg 145%"
          sizes="(max-width: 1100px) 100vw, 40vw"
          className={styles.viewer}
        />
        {ready && (
          <Pill tone="lime" rotate={-4} className={styles.dragTag}>
            <span className={styles.hintMouse}>Drag to rotate</span>
            <span className={styles.hintTouch}>Swipe sideways to rotate</span>
          </Pill>
        )}
        {status !== 'failed' && (
          <div className={styles.controls}>
            <Pill tone="dim">360°</Pill>
            <div className={styles.segmented} role="group" aria-label="Model view">
              {VIEW_MODES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={cx(styles.segment, mode === item.id && styles.segmentActive)}
                  aria-pressed={mode === item.id}
                  disabled={!ready}
                  onClick={() => setMode(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <ul className={styles.list} aria-label="Headset parts, second half">
        {parts.slice(half).map((part, i) => renderPart(part, i + half))}
      </ul>
    </div>
  );
}
