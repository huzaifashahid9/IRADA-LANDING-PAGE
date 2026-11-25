'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { cx } from '@/lib/cx';
import styles from './HeadsetViewer.module.css';

/** Longest explode/assemble animation, plus a margin. Hotspots come back after this even if
 * the browser never sends the "finished" event (for example when the tab was in the background). */
const MAX_ANIMATION_MS = 4000;

/** Formats a [x, y, z] vector the way <model-viewer> hotspots expect. */
function toMeters([x, y, z]) {
  return `${x}m ${y}m ${z}m`;
}

function hotspotPosition(hotspot, exploded) {
  const k = exploded ? 1 : 0;
  const { position: p, explodedOffset: o = [0, 0, 0] } = hotspot;
  return toMeters([p[0] + o[0] * k, p[1] + o[1] * k, p[2] + o[2] * k]);
}

/** True when the browser can draw WebGL. Low-power or locked-down devices sometimes cannot. */
function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The interactive 3D headset, rendered with Google's <model-viewer> web component.
 * A static render is shown until the model has loaded, and stays if WebGL is missing,
 * the model fails to load, or the WebGL context is lost (for example on iOS when the
 * browser is sent to the background).
 *
 * The wrapper carries `data-state="loading" | "ready" | "failed"`, so surrounding UI such
 * as a "Drag to rotate" hint can show only when the model can really be rotated.
 *
 * @param {object} props
 * @param {{src: string, alt: string, width: number, height: number}} props.poster
 * @param {string} [props.cameraOrbit] Starting camera angle, e.g. "-158deg 68deg 125%".
 * @param {{title: string, hotspot: object}[]} [props.parts] Parts to mark with numbered hotspots.
 * @param {number} [props.selected] Index of the highlighted part.
 * @param {(index: number) => void} [props.onSelect]
 * @param {boolean} [props.exploded] Play the model's explode animation.
 * @param {(status: 'loading'|'ready'|'failed') => void} [props.onStatusChange]
 * @param {boolean} [props.preload] Preload the poster (only for the above-the-fold hero).
 * @param {string} [props.sizes] Poster sizes hint for next/image.
 */
export default function HeadsetViewer({
  poster,
  cameraOrbit = '30deg 75deg 105%',
  parts = [],
  selected = -1,
  onSelect,
  exploded = false,
  onStatusChange,
  preload = false,
  sizes = '(max-width: 760px) 100vw, 50vw',
  className,
  children,
}) {
  const viewerRef = useRef(null);
  const previousExploded = useRef(false);
  const previousSelected = useRef(selected);
  const [libraryReady, setLibraryReady] = useState(false);
  const [status, setStatus] = useState('loading');
  const [moving, setMoving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const modelLoaded = status === 'ready';

  // Keep the latest callback in a ref, so a new function from the parent does not
  // re-run the effects below.
  const onStatusChangeRef = useRef(onStatusChange);
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  });
  useEffect(() => {
    onStatusChangeRef.current?.(status);
  }, [status]);

  // Load the web component on the client only; it needs WebGL and `window`.
  useEffect(() => {
    let cancelled = false;
    const load = supportsWebGL()
      ? import('@google/model-viewer')
      : Promise.reject(new Error('WebGL is not available'));
    load
      .then(() => !cancelled && setLibraryReady(true))
      .catch(() => !cancelled && setStatus('failed'));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !libraryReady) return undefined;

    const handleLoad = () => setStatus('ready');
    const handleError = () => setStatus('failed');
    const handleFinished = () => setMoving(false);
    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);
    viewer.addEventListener('finished', handleFinished);
    if (viewer.loaded) setStatus('ready');

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('error', handleError);
      viewer.removeEventListener('finished', handleFinished);
    };
  }, [libraryReady]);

  // Never leave the hotspots hidden if the "finished" event does not arrive.
  useEffect(() => {
    if (!moving) return undefined;
    const timer = window.setTimeout(() => setMoving(false), MAX_ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [moving]);

  // Explode or assemble when the prop changes, then move hotspots with their parts.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded || previousExploded.current === exploded) return;
    previousExploded.current = exploded;

    parts.forEach((part, index) => {
      viewer.updateHotspot?.({
        name: `hotspot-${index}`,
        position: hotspotPosition(part.hotspot, exploded),
      });
    });

    const animation = exploded ? site.model.explodeAnimation : site.model.assembleAnimation;
    if (!viewer.availableAnimations?.includes(animation)) return;
    setMoving(true);
    viewer.animationName = animation;
    viewer.play({ repetitions: 1 });
  }, [exploded, modelLoaded, parts]);

  // Turn the camera to face a part when the user picks it, and stop the auto-rotation
  // so the part stays in view.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded || previousSelected.current === selected) return;
    previousSelected.current = selected;
    const part = parts[selected];
    if (!part) return;

    const [nx, ny, nz] = part.hotspot.normal;
    const theta = Math.atan2(nx, nz);
    const phi = Math.min(Math.max(Math.acos(ny), (35 * Math.PI) / 180), (78 * Math.PI) / 180);
    const { radius } = viewer.getCameraOrbit();
    viewer.autoRotate = false;
    viewer.cameraOrbit = `${theta}rad ${phi}rad ${radius}m`;
  }, [selected, modelLoaded, parts]);

  return (
    <div className={cx(styles.viewer, moving && styles.moving, className)} data-state={status}>
      <Image
        src={poster.src}
        alt={poster.alt}
        width={poster.width}
        height={poster.height}
        sizes={sizes}
        preload={preload}
        className={cx(styles.poster, modelLoaded && styles.posterHidden)}
      />

      {libraryReady && status !== 'failed' && (
        <model-viewer
          ref={viewerRef}
          className={cx(styles.model, modelLoaded && styles.modelVisible)}
          src={site.model.src}
          alt={poster.alt}
          aria-hidden={modelLoaded ? undefined : 'true'}
          camera-controls
          disable-zoom
          disable-pan
          disable-tap
          touch-action="pan-y"
          interaction-prompt="none"
          auto-rotate={reducedMotion ? undefined : true}
          auto-rotate-delay="1500"
          rotation-per-second="18deg"
          camera-orbit={cameraOrbit}
          min-camera-orbit="auto 25deg auto"
          max-camera-orbit="auto 105deg auto"
          shadow-intensity="1.1"
          shadow-softness="0.9"
          exposure="1.05"
          environment-image="neutral"
          animation-crossfade-duration="0"
        >
          {parts.map((part, index) => (
            <button
              key={part.title}
              type="button"
              slot={`hotspot-${index}`}
              className={cx(styles.hotspot, selected === index && styles.hotspotActive)}
              data-position={hotspotPosition(part.hotspot, false)}
              data-normal={part.hotspot.normal.join(' ')}
              data-visibility-attribute="visible"
              aria-label={`${index + 1}. ${part.title}`}
              aria-pressed={selected === index}
              onClick={() => onSelect?.(index)}
            >
              <span className={styles.hotspotLabel} aria-hidden="true">
                {part.title}
              </span>
              <span className={styles.hotspotDot} aria-hidden="true">
                {index + 1}
              </span>
            </button>
          ))}
        </model-viewer>
      )}

      {children}
    </div>
  );
}
