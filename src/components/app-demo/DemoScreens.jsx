import { Icon, Pill } from '@/components/ui';
import styles from './DemoScreens.module.css';

/** Screen 1: the patient's home menu, with "Call caregiver" selected. */
export function HomeScreen() {
  return (
    <>
      <div className={styles.topBar}>
        <span className={styles.brand}>IRADA</span>
        <Pill tone="glass" size="xs">
          <span className={styles.signalDot} aria-hidden="true" />
          Signal good
        </Pill>
      </div>
      <p className={styles.question}>What would you like to do?</p>
      <Pill tone="ink" size="sm" className={styles.mode}>
        Selecting with motor imagery
      </Pill>
      <div className={styles.menu}>
        <div className={`${styles.tile} ${styles.tileSelected}`}>
          <Icon name="phone" size={24} />
          <span>Call caregiver</span>
          <span className="visually-hidden">(selected)</span>
        </div>
        <div className={`${styles.tile} ${styles.tileWhite}`}>
          <Icon name="message" size={24} />
          <span>Send message</span>
        </div>
        <div className={`${styles.tile} ${styles.tileAlert}`}>
          <span className={styles.alertIcon}>
            <Icon name="alert" size={20} strokeWidth={2.2} />
          </span>
          <span>Emergency alert</span>
        </div>
        <div className={styles.quick}>
          <span>Yes</span>
          <span>No</span>
          <span>Cancel</span>
        </div>
      </div>
    </>
  );
}

/** Screen 2: the decoded intent with its confidence, waiting for confirm or cancel. */
export function IntentScreen() {
  return (
    <>
      <Pill tone="soft" size="xs" className={styles.mode}>
        Intent detected
      </Pill>
      <div className={styles.intent}>
        <span className={styles.intentIcon}>
          <Icon name="message" size={46} />
        </span>
        <p className={styles.intentTitle}>
          Send message:
          <br />I need help
        </p>
        <div className={styles.confidence}>
          <div className={styles.confidenceRow}>
            <span className={styles.confidenceLabel}>Confidence</span>
            <span className={styles.confidenceValue}>High</span>
          </div>
          <div className={styles.bar} aria-hidden="true">
            <div className={styles.barFill} style={{ width: '82%' }} />
          </div>
        </div>
        <p className={styles.hint}>If confidence is low, IRADA asks again instead of guessing.</p>
      </div>
      <div className={styles.choices}>
        <span className={styles.choiceSoft}>Cancel</span>
        <span className={styles.choiceDark}>Confirm</span>
      </div>
    </>
  );
}

/** Screen 3: the timed confirmation that cancels by itself. */
export function ConfirmScreen() {
  return (
    <>
      <Pill tone="ink" size="xs" className={`${styles.mode} ${styles.limeText}`}>
        Confirm
      </Pill>
      <div className={styles.confirm}>
        <p className={styles.confirmTitle}>Send “I need help” to Ahmed?</p>
        <div className={styles.timer}>
          <span className={styles.ring} aria-hidden="true">
            8
          </span>
          <p className={styles.timerText}>
            Cancels by itself in 8 seconds. Silence is never consent.
          </p>
        </div>
      </div>
      <div className={styles.choices}>
        <span className={styles.choiceFaint}>No</span>
        <span className={styles.choiceDark}>Yes, send</span>
      </div>
    </>
  );
}
