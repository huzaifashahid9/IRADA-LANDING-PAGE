'use client';

import Image from 'next/image';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { site } from '@/content/site';
import { cx } from '@/lib/cx';
import styles from './HeadsetViewer.module.css';

/** Longest explode/assemble animation, plus a margin. Hotspots come back after this even if
 * the browser never sends the "finished" event (for example when the tab was in the background). */
const MAX_ANIMATION_MS = 4000;

/** Closest and farthest the camera may get, as a share of the model's framed distance. */
const MIN_RADIUS = '80%';
const MAX_RADIUS = '200%';

/** Formats a [x, y, z] vector the way <model-viewer> hotspots expect. */
function toMeters([x, y, z]) {
  return `${x}m ${y}m ${z}m`;
}

function hotspotPosition(hotspot, exploded) {
  const k = exploded ? 1 : 0;
  const { position: p, explodedOffset: o = [0, 0, 0] } = hotspot;
  return toMeters([p[0] + o[0] * k, p[1] + o[1] * k, p[2] + o[2] * k]);
}

/**
 * Camera angles that look straight at a hotspot, kept between a high and a low view.
 * The headset model faces model-viewer's -Z axis, so the camera angle around the model is
 * the hotspot normal's angle turned half a circle (checked against the rendered model).
 */
function orbitFacing(normal, radius) {
  const [nx, ny, nz] = normal;
  const theta = Math.atan2(-nx, -nz);
  const phi = Math.min(Math.max(Math.acos(ny), (38 * Math.PI) / 180), (76 * Math.PI) / 180);
  return `${theta}rad ${phi}rad ${radius}`;
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

/** Resolves once the loading screen has lifted (it adds `is-loaded` to <html>). */
function whenPageShown(callback) {
  const root = document.documentElement;
  if (root.classList.contains('is-loaded')) {
    callback();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (!root.classList.contains('is-loaded')) return;
    observer.disconnect();
    callback();
  });
  observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
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
 * Parents can drive the camera through `apiRef`: `zoom(step)`, `reset()` and
 * `setAutoRotate(on)`.
 *
 * @param {object} props
 * @param {{src: string, alt: string, width: number, height: number}} props.poster
 * @param {string} [props.cameraOrbit] Resting camera angle, e.g. "-158deg 68deg 125%".
 * @param {string} [props.introOrbit] Where the camera starts; it sweeps to `cameraOrbit`
 *   once the model is ready and the loading screen has lifted.
 * @param {{title: string, hotspot: object}[]} [props.parts] Parts to mark with numbered hotspots.
 * @param {number} [props.selected] Index of the highlighted part.
 * @param {number} [props.focusKey] Change it to turn the camera to the selected part
 *   (a new number each time a part is picked, so picking the same part again works too).
 * @param {(index: number) => void} [props.onSelect]
 * @param {boolean} [props.exploded] Play the model's explode animation.
 * @param {boolean} [props.autoRotate] Spin slowly when nobody is touching it.
 * @param {(status: 'loading'|'ready'|'failed') => void} [props.onStatusChange]
 * @param {(event: {interacting: boolean}) => void} [props.onInteract]
 * @param {import('react').Ref} [props.apiRef]
 * @param {boolean} [props.preload] Preload the poster (only for the above-the-fold hero).
 * @param {string} [props.sizes] Poster sizes hint for next/image.
 */
export default function HeadsetViewer({
  poster,
  cameraOrbit = '30deg 75deg 105%',
  introOrbit,
  parts = [],
  selected = -1,
  focusKey = 0,
  onSelect,
  exploded = false,
  autoRotate = true,
  onStatusChange,
  onInteract,
  apiRef,
  preload = false,
  sizes = '(max-width: 760px) 100vw, 50vw',
  className,
  children,
}) {
  const viewerRef = useRef(null);
  const previousExploded = useRef(false);
  const previousFocus = useRef(0);
  const [libraryReady, setLibraryReady] = useState(false);
  const [status, setStatus] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [moving, setMoving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const modelLoaded = status === 'ready';

  // Keep the latest callbacks in refs, so a new function from the parent does not
  // re-run the effects below.
  const onStatusChangeRef = useRef(onStatusChange);
  const onInteractRef = useRef(onInteract);
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
    onInteractRef.current = onInteract;
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

    const handleLoad = () => {
      setProgress(1);
      setStatus('ready');
    };
    const handleError = () => setStatus('failed');
    const handleProgress = (event) => setProgress(event.detail?.totalProgress ?? 0);
    const handleFinished = () => setMoving(false);
    const handleCamera = (event) => {
      if (event.detail?.source === 'user-interaction') onInteractRef.current?.({ interacting: true });
    };
    // A lost WebGL context (common on iOS when the tab is backgrounded) leaves a blank
    // canvas; fall back to the render so the section never shows an empty box.
    const handleContextLost = () => setStatus('failed');
    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);
    viewer.addEventListener('progress', handleProgress);
    viewer.addEventListener('finished', handleFinished);
    viewer.addEventListener('camera-change', handleCamera);
    viewer.addEventListener('webglcontextlost', handleContextLost);
    if (viewer.loaded) setStatus('ready');

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('error', handleError);
      viewer.removeEventListener('progress', handleProgress);
      viewer.removeEventListener('finished', handleFinished);
      viewer.removeEventListener('camera-change', handleCamera);
      viewer.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, [libraryReady]);

  // Intro: once the model is ready and the page is on screen, sweep the camera from
  // `introOrbit` to its resting angle. model-viewer eases between the two.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded || !introOrbit) return undefined;
    if (reducedMotion) {
      viewer.cameraOrbit = cameraOrbit;
      viewer.jumpCameraToGoal?.();
      return undefined;
    }
    let timer;
    const stop = whenPageShown(() => {
      timer = window.setTimeout(() => {
        viewer.cameraOrbit = cameraOrbit;
      }, 250);
    });
    return () => {
      stop();
      window.clearTimeout(timer);
    };
    // Only on first load; later camera moves come from the user or the part picker.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelLoaded]);

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
    viewer.currentTime = 0;
    viewer.play({ repetitions: 1 });
  }, [exploded, modelLoaded, parts]);

  // Turn the camera to face a part when it is picked, and pause the spin so the part
  // stays in view.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded || !focusKey || previousFocus.current === focusKey) return;
    previousFocus.current = focusKey;
    const part = parts[selected];
    if (!part) return;
    viewer.autoRotate = false;
    viewer.cameraOrbit = orbitFacing(part.hotspot.normal, exploded ? '150%' : '125%');
  }, [focusKey, selected, modelLoaded, parts, exploded]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded) return;
    viewer.autoRotate = autoRotate && !reducedMotion;
  }, [autoRotate, reducedMotion, modelLoaded]);

  useImperativeHandle(
    apiRef,
    () => ({
      zoom(step) {
        const viewer = viewerRef.current;
        if (!viewer?.getCameraOrbit) return;
        const { theta, phi, radius } = viewer.getCameraOrbit();
        viewer.cameraOrbit = `${theta}rad ${phi}rad ${radius * (step > 0 ? 0.82 : 1.22)}m`;
      },
      reset() {
        const viewer = viewerRef.current;
        if (!viewer) return;
        viewer.cameraOrbit = cameraOrbit;
        viewer.autoRotate = autoRotate && !reducedMotion;
      },
    }),
    [cameraOrbit, autoRotate, reducedMotion],
  );

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

      {status === 'loading' && (
        <span
          className={styles.loader}
          role="progressbar"
          aria-label="Loading the 3D headset"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          style={{ '--progress': progress }}
        >
          <span className={styles.loaderText}>3D</span>
        </span>
      )}

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
          auto-rotate={autoRotate && !reducedMotion ? true : undefined}
          auto-rotate-delay="2500"
          rotation-per-second="22deg"
          camera-orbit={introOrbit && !reducedMotion ? introOrbit : cameraOrbit}
          min-camera-orbit={`auto 25deg ${MIN_RADIUS}`}
          max-camera-orbit={`auto 105deg ${MAX_RADIUS}`}
          interpolation-decay="110"
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
