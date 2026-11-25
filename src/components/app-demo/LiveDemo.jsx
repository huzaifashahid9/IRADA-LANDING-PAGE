'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { Icon, Pill } from '@/components/ui';
import { cx } from '@/lib/cx';
import styles from './LiveDemo.module.css';

/** How long the simulated decoder "listens" before it names a command. */
const LISTEN_MS = 1700;
/** How long the simulated action takes to run. */
const EXECUTE_MS = 1300;
/** Most log entries kept on screen. */
const LOG_SIZE = 5;

/** Which state-machine label and which step each screen belongs to. */
const SCREEN_META = {
  home: { state: 'Idle', step: 0, tone: 'violet' },
  listening: { state: 'Listening', step: 1, tone: 'violet' },
  intent: { state: 'Intent detected', step: 2, tone: 'white' },
  unsure: { state: 'Intent detected', step: 2, tone: 'white' },
  confirm: { state: 'Awaiting confirmation', step: 3, tone: 'lime' },
  executing: { state: 'Executing', step: 4, tone: 'ink' },
  done: { state: 'Done', step: 4, tone: 'ink' },
  cancelled: { state: 'Cancelled', step: 3, tone: 'white' },
};

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addLog(log, entry) {
  return [{ ...entry, id: `${Date.now()}-${Math.random()}`, time: now() }, ...log].slice(
    0,
    LOG_SIZE,
  );
}

function initialState() {
  return {
    screen: 'home',
    actionId: null,
    seconds: 0,
    yeses: 0,
    reason: '',
    weak: false,
    log: [],
  };
}

function reducer(state, event) {
  switch (event.type) {
    case 'choose':
      return { ...state, screen: 'listening', actionId: event.actionId, yeses: 0 };
    case 'decoded':
      if (state.screen !== 'listening') return state;
      return { ...state, screen: state.weak ? 'unsure' : 'intent' };
    case 'askAgain':
      return {
        ...state,
        screen: 'home',
        actionId: null,
        log: addLog(state.log, { title: 'Not sure what was meant', outcome: 'Asked again' }),
      };
    case 'toIntentConfirm':
      return { ...state, screen: 'confirm', seconds: event.seconds };
    case 'tick':
      if (state.screen !== 'confirm') return state;
      if (state.seconds <= 1) {
        return {
          ...state,
          screen: 'cancelled',
          seconds: 0,
          reason: 'Time ran out, so nothing was sent. Silence is never treated as a yes.',
          log: addLog(state.log, { title: event.title, outcome: 'Timed out' }),
        };
      }
      return { ...state, seconds: state.seconds - 1 };
    case 'yes': {
      if (state.screen !== 'confirm') return state;
      const yeses = state.yeses + 1;
      // Emergency alerts need a stronger confirmation: two yeses in a row.
      if (event.strong && yeses < 2) {
        return { ...state, yeses, seconds: event.seconds };
      }
      return { ...state, yeses, screen: 'executing' };
    }
    case 'executed':
      if (state.screen !== 'executing') return state;
      return {
        ...state,
        screen: 'done',
        log: addLog(state.log, { title: event.title, outcome: 'Done' }),
      };
    case 'cancel':
      if (['home', 'done', 'cancelled'].includes(state.screen)) return state;
      return {
        ...state,
        screen: 'cancelled',
        reason: event.reason,
        log: addLog(state.log, { title: event.title, outcome: event.outcome }),
      };
    case 'home':
      return { ...state, screen: 'home', actionId: null, reason: '', yeses: 0 };
    case 'weak':
      return { ...state, weak: event.on };
    default:
      return state;
  }
}

const OUTCOME_TONE = {
  Done: 'lime',
  Cancelled: 'soft',
  'Stopped by button': 'soft',
  'Timed out': 'warn',
  'Asked again': 'warn',
};

/**
 * A working copy of the IRADA patient flow, on one phone. It follows the app's safety
 * rules: nothing runs without a yes, low confidence asks again, the confirmation timer
 * cancels by itself, an emergency needs two yeses, and the headset button cancels at
 * any time. Every outcome is written to the log beside the phone.
 *
 * @param {object} props
 * @param {object} props.content The `appDemo` content object.
 */
export default function LiveDemo({ content }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { actions, confirmSeconds, steps } = content;
  const action = actions.find((item) => item.id === state.actionId);
  const meta = SCREEN_META[state.screen];

  // Listening → intent detected.
  useEffect(() => {
    if (state.screen !== 'listening') return undefined;
    const timer = window.setTimeout(() => dispatch({ type: 'decoded' }), LISTEN_MS);
    return () => window.clearTimeout(timer);
  }, [state.screen]);

  // The confirmation countdown.
  useEffect(() => {
    if (state.screen !== 'confirm' || !action) return undefined;
    const timer = window.setInterval(
      () => dispatch({ type: 'tick', title: action.intent }),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [state.screen, action]);

  // Executing → done.
  useEffect(() => {
    if (state.screen !== 'executing' || !action) return undefined;
    const timer = window.setTimeout(
      () => dispatch({ type: 'executed', title: action.done }),
      EXECUTE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [state.screen, action]);

  const cancel = useCallback(
    (reason, outcome) =>
      dispatch({
        type: 'cancel',
        reason,
        outcome,
        title: action ? action.intent : 'Pending action',
      }),
    [action],
  );

  const pressHeadsetButton = () =>
    cancel('Stopped by the cancel button on the headset. It works at any moment.', 'Stopped by button');

  const busy = !['home', 'done', 'cancelled'].includes(state.screen);
  const ringProgress = state.screen === 'confirm' ? state.seconds / confirmSeconds : 0;

  return (
    <div className={styles.demo}>
      <div className={styles.side}>
        <ol className={styles.steps} aria-label="Where you are in the flow">
          {steps.map((step, index) => {
            const status =
              index < meta.step || (index === meta.step && state.screen === 'done')
                ? 'done'
                : index === meta.step
                  ? 'current'
                  : 'next';
            return (
              <li
                key={step.title}
                className={cx(styles.step, styles[`step-${status}`])}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <span className={styles.stepDot} aria-hidden="true">
                  {status === 'done' ? <Icon name="check" size={14} strokeWidth={3} /> : index + 1}
                </span>
                <span className={styles.stepBody}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepText}>{step.text}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className={styles.stateRow}>
          <span className={styles.stateLabel}>State</span>
          <Pill tone={state.screen === 'cancelled' ? 'ink' : 'lime'} size="sm">
            <span className={styles.liveDot} aria-hidden="true" />
            {meta.state}
          </Pill>
        </div>

        <label className={styles.weak}>
          <input
            type="checkbox"
            checked={state.weak}
            onChange={(event) => dispatch({ type: 'weak', on: event.target.checked })}
          />
          <span className={styles.switch} aria-hidden="true" />
          <span>
            <span className={styles.weakTitle}>Simulate a weak reading</span>
            <span className={styles.weakText}>See IRADA ask again instead of guessing.</span>
          </span>
        </label>
      </div>

      <div className={styles.phoneCol}>
        <div className={styles.phone}>
          <div
            className={cx(styles.screen, styles[`tone-${meta.tone}`])}
            aria-live="polite"
            aria-atomic="false"
            role="group"
            aria-label="Simulated IRADA app"
          >
            <div className={styles.statusBar}>
              <span className={styles.brand}>IRADA</span>
              <span className={styles.signal}>
                <span
                  className={cx(styles.signalDot, state.weak && styles.signalWeak)}
                  aria-hidden="true"
                />
                {state.weak ? 'Signal weak' : 'Signal good'}
              </span>
            </div>

            <div key={`${state.screen}-${state.yeses}`} className={styles.view}>
              {state.screen === 'home' && (
                <>
                  <p className={styles.question}>What would you like to do?</p>
                  <span className={styles.modeChip}>Selecting with motor imagery</span>
                  <div className={styles.menu}>
                    {actions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={cx(styles.tile, styles[`tile-${item.id}`])}
                        onClick={() => dispatch({ type: 'choose', actionId: item.id })}
                      >
                        <span className={styles.tileIcon}>
                          <Icon name={item.icon} size={22} strokeWidth={2.2} />
                        </span>
                        <span className={styles.tileLabel}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className={styles.tapHint}>
                    <Icon name="arrowRight" size={14} strokeWidth={2.4} />
                    Tap a tile to try it
                  </p>
                </>
              )}

              {state.screen === 'listening' && action && (
                <div className={styles.center}>
                  <div className={styles.wave} aria-hidden="true">
                    {Array.from({ length: 9 }, (_, i) => (
                      <span key={i} style={{ '--i': i }} />
                    ))}
                  </div>
                  <p className={styles.bigText}>Reading your signal…</p>
                  <p className={styles.smallText}>Cleaning and decoding on the phone</p>
                </div>
              )}

              {state.screen === 'intent' && action && (
                <>
                  <span className={styles.chipSoft}>Intent detected</span>
                  <div className={styles.center}>
                    <span className={cx(styles.intentIcon, action.strong && styles.intentAlert)}>
                      <Icon name={action.icon} size={40} strokeWidth={2.2} />
                    </span>
                    <p className={styles.bigText}>{action.intent}</p>
                    <p className={styles.smallText}>{action.detail}</p>
                    <div className={styles.confidence}>
                      <div className={styles.confidenceRow}>
                        <span>Confidence</span>
                        <strong>High</strong>
                      </div>
                      <div className={styles.bar} aria-hidden="true">
                        <span className={styles.barFill} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.choices}>
                    <button
                      type="button"
                      className={styles.choiceSoft}
                      onClick={() =>
                        cancel('You cancelled, so nothing was sent.', 'Cancelled')
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.choiceDark}
                      onClick={() =>
                        dispatch({ type: 'toIntentConfirm', seconds: confirmSeconds })
                      }
                    >
                      Confirm
                    </button>
                  </div>
                </>
              )}

              {state.screen === 'unsure' && (
                <>
                  <span className={styles.chipWarn}>Low confidence</span>
                  <div className={styles.center}>
                    <span className={styles.unsureIcon}>
                      <Icon name="rotate" size={40} strokeWidth={2.2} />
                    </span>
                    <p className={styles.bigText}>Not sure what you meant</p>
                    <p className={styles.smallText}>
                      IRADA never guesses. Let&apos;s try that again.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.choiceDarkWide}
                    onClick={() => dispatch({ type: 'askAgain' })}
                  >
                    Try again
                  </button>
                </>
              )}

              {state.screen === 'confirm' && action && (
                <>
                  <span className={styles.chipInk}>
                    {action.strong && state.yeses === 1 ? 'Confirm again' : 'Confirm'}
                  </span>
                  <div className={styles.confirm}>
                    <p className={styles.confirmTitle}>
                      {action.strong && state.yeses === 1
                        ? 'Emergency needs a second yes. Send the alert?'
                        : action.question}
                    </p>
                    <div className={styles.timer}>
                      <span className={styles.ring} style={{ '--p': ringProgress }} aria-hidden="true">
                        <span>{state.seconds}</span>
                      </span>
                      <p className={styles.timerText}>
                        Cancels by itself in {state.seconds} seconds if you do nothing.
                      </p>
                    </div>
                  </div>
                  <div className={styles.choices}>
                    <button
                      type="button"
                      className={styles.choiceFaint}
                      onClick={() => cancel('You said no, so nothing was sent.', 'Cancelled')}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className={styles.choiceDark}
                      onClick={() =>
                        dispatch({
                          type: 'yes',
                          strong: action.strong,
                          seconds: confirmSeconds,
                        })
                      }
                    >
                      {action.yes}
                    </button>
                  </div>
                </>
              )}

              {state.screen === 'executing' && action && (
                <div className={styles.center}>
                  <span className={styles.spinner} aria-hidden="true" />
                  <p className={styles.bigText}>{action.intent}…</p>
                  <p className={styles.smallText}>The agent runs only the confirmed tool.</p>
                </div>
              )}

              {state.screen === 'done' && action && (
                <>
                  <div className={styles.center}>
                    <span className={styles.doneIcon}>
                      <Icon name="check" size={44} strokeWidth={3} />
                    </span>
                    <p className={styles.bigText}>{action.done}</p>
                    <p className={styles.smallText}>Saved to the activity log at {now()}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.choiceLimeWide}
                    onClick={() => dispatch({ type: 'home' })}
                  >
                    Back to menu
                  </button>
                </>
              )}

              {state.screen === 'cancelled' && (
                <>
                  <span className={styles.chipSoft}>Cancelled</span>
                  <div className={styles.center}>
                    <span className={styles.cancelIcon}>
                      <Icon name="close" size={40} strokeWidth={2.6} />
                    </span>
                    <p className={styles.bigText}>Nothing happened</p>
                    <p className={styles.smallText}>{state.reason}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.choiceDarkWide}
                    onClick={() => dispatch({ type: 'home' })}
                  >
                    Back to menu
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.headsetButton}
          onClick={pressHeadsetButton}
          disabled={!busy}
        >
          <span className={styles.headsetLed} aria-hidden="true" />
          Press the headset&apos;s cancel button
        </button>
      </div>

      <div className={styles.logCard}>
        <p className={styles.logTitle}>Activity log</p>
        {state.log.length === 0 ? (
          <p className={styles.logEmpty}>
            Nothing yet. Every action you try, and every cancel, shows up here.
          </p>
        ) : (
          <ul className={styles.log}>
            {state.log.map((entry) => (
              <li key={entry.id} className={styles.logItem}>
                <span className={styles.logTime}>{entry.time}</span>
                <span className={styles.logText}>{entry.title}</span>
                <span className={cx(styles.outcome, styles[`out-${OUTCOME_TONE[entry.outcome]}`])}>
                  {entry.outcome}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
