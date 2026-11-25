'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CardText, CardTitle, Icon, NumberBadge, Pill } from '@/components/ui';
import { cx } from '@/lib/cx';
import HeadsetViewer from './HeadsetViewer';
import styles from './HeadsetExplorer.module.css';

const VIEW_MODES = [
  { id: 'assembled', label: '3D view' },
  { id: 'exploded', label: 'Exploded' },
];

/** How long the guided tour stays on each part. */
const TOUR_STEP_MS = 3200;

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
 * Choosing a card turns the model to that part and highlights its numbered hotspot,
 * and tapping a hotspot highlights its card. The toolbar zooms, resets the view,
 * pauses the spin, runs a guided tour of all six parts and explodes the model.
 * If the model cannot load, the cards still work and the 3D-only controls are hidden.
 */
export default function HeadsetExplorer({ parts, poster }) {
  const [selected, setSelected] = useState(0);
  const [focusKey, setFocusKey] = useState(0);
  const [mode, setMode] = useState('assembled');
  const [spin, setSpin] = useState(true);
  const [touring, setTouring] = useState(false);
  const [status, setStatus] = useState('loading');
  const stageRef = useRef(null);
  const viewerApi = useRef(null);
  const half = Math.ceil(parts.length / 2);
  const ready = status === 'ready';

  const focusPart = useCallback((index) => {
    setSelected(index);
    setFocusKey((key) => key + 1);
    setSpin(false);
  }, []);

  const choosePart = (index) => {
    setTouring(false);
    focusPart(index);
    if (ready) revealStage(stageRef.current);
  };

  // Guided tour: visit every part in turn, then settle back into a slow spin.
  useEffect(() => {
    if (!touring) return undefined;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      if (step >= parts.length) {
        setTouring(false);
        viewerApi.current?.reset();
        setSpin(true);
        return;
      }
      focusPart(step);
    }, TOUR_STEP_MS);
    return () => window.clearInterval(timer);
  }, [touring, parts.length, focusPart]);

  const resetView = () => {
    setTouring(false);
    setSpin(true);
    viewerApi.current?.reset();
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
          <span className={styles.partArrow} aria-hidden="true">
            <Icon name="arrowRight" size={16} strokeWidth={2.4} />
          </span>
        </span>
        <CardText as="span" size="small" color="muted">
          {part.text}
        </CardText>
      </button>
    </li>
  );

  return (
    <div className={styles.explorer}>
      <ul className={styles.list} aria-label="Headset parts 1 to 3">
        {parts.slice(0, half).map((part, i) => renderPart(part, i))}
      </ul>

      <div ref={stageRef} className={styles.stage} data-reveal="">
        <span className={styles.stageGlow} aria-hidden="true" />
        <HeadsetViewer
          poster={poster}
          parts={parts}
          selected={selected}
          focusKey={focusKey}
          onSelect={choosePart}
          onInteract={() => setTouring(false)}
          exploded={mode === 'exploded'}
          autoRotate={spin}
          onStatusChange={setStatus}
          apiRef={viewerApi}
          cameraOrbit="-150deg 68deg 135%"
          introOrbit="-330deg 82deg 190%"
          sizes="(max-width: 1100px) 100vw, 40vw"
          className={styles.viewer}
        />

        {ready && (
          <Pill tone="lime" rotate={-4} className={styles.dragTag}>
            <Icon name="rotate" size={15} strokeWidth={2.4} />
            <span className={styles.hintMouse}>Drag to rotate</span>
            <span className={styles.hintTouch}>Swipe sideways to rotate</span>
          </Pill>
        )}

        {ready && (
          <button
            type="button"
            className={cx(styles.tour, touring && styles.tourOn)}
            aria-pressed={touring}
            onClick={() => {
              if (touring) {
                setTouring(false);
                return;
              }
              // The tour starts on part 1, then the effect below steps through the rest.
              focusPart(0);
              setTouring(true);
            }}
          >
            <Icon name={touring ? 'pause' : 'play'} size={16} strokeWidth={2.4} />
            {touring ? `Part ${selected + 1} of ${parts.length}` : 'Tour all 6 parts'}
          </button>
        )}

        {status !== 'failed' && (
          <div className={styles.controls}>
            <div className={styles.tools} role="group" aria-label="Camera">
              <button
                type="button"
                className={styles.tool}
                aria-label="Zoom out"
                disabled={!ready}
                onClick={() => viewerApi.current?.zoom(-1)}
              >
                <Icon name="minus" size={18} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                className={styles.tool}
                aria-label="Zoom in"
                disabled={!ready}
                onClick={() => viewerApi.current?.zoom(1)}
              >
                <Icon name="plus" size={18} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                className={cx(styles.tool, spin && styles.toolOn)}
                aria-label={spin ? 'Stop spinning' : 'Spin the headset'}
                aria-pressed={spin}
                disabled={!ready}
                onClick={() => {
                  setTouring(false);
                  setSpin((on) => !on);
                }}
              >
                <Icon name="rotate" size={18} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                className={styles.tool}
                aria-label="Reset the view"
                disabled={!ready}
                onClick={resetView}
              >
                <Icon name="reset" size={18} strokeWidth={2.4} />
              </button>
            </div>
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

        <p className={styles.caption} aria-live="polite">
          <span className={styles.captionNumber}>{selected + 1}</span>
          {parts[selected].title}
        </p>
      </div>

      <ul className={styles.list} aria-label="Headset parts 4 to 6">
        {parts.slice(half).map((part, i) => renderPart(part, i + half))}
      </ul>
    </div>
  );
}
