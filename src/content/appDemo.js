/**
 * The interactive phone demo. It runs the same rules as the IRADA app prototype:
 * nothing happens without a yes, low confidence asks again, the timer cancels by
 * itself, emergency needs two yeses, and the headset button cancels at any time.
 * Names and messages are sample content, not real users.
 */
export const appDemo = {
  eyebrow: '06 · Try the app',
  title: 'Big buttons. Few choices. Always a way out.',
  lead: 'This is the simulated IRADA app. Pick an action and watch it go from brain signal to a confirmed action, or let the timer run out and see nothing happen.',
  confirmSeconds: 10,
  actions: [
    {
      id: 'call',
      icon: 'phone',
      label: 'Call caregiver',
      intent: 'Call caregiver',
      detail: 'Ahmed · Caregiver',
      question: 'Call Ahmed now?',
      done: 'Calling Ahmed',
      yes: 'Yes, call',
    },
    {
      id: 'message',
      icon: 'message',
      label: 'Send message',
      intent: 'Send message',
      detail: '“I need help” → Ahmed',
      question: 'Send “I need help” to Ahmed?',
      done: 'Message sent to Ahmed',
      yes: 'Yes, send',
    },
    {
      id: 'emergency',
      icon: 'alert',
      label: 'Emergency alert',
      intent: 'Emergency alert',
      detail: 'Alert + location → emergency contacts',
      question: 'Send an emergency alert with your location?',
      done: 'Emergency alert sent with your location',
      yes: 'Yes, send alert',
      strong: true,
    },
  ],
  states: ['Idle', 'Listening', 'Intent detected', 'Awaiting confirmation', 'Executing', 'Done'],
  steps: [
    { state: 'Idle', title: 'Choose', text: 'Big tiles for the few actions that matter.' },
    {
      state: 'Listening',
      title: 'Decode',
      text: 'The headset signal is cleaned and decoded on the phone.',
    },
    {
      state: 'Intent detected',
      title: 'Check',
      text: 'IRADA shows what it understood and how sure it is.',
    },
    {
      state: 'Awaiting confirmation',
      title: 'Confirm',
      text: 'A timed yes. Silence cancels by itself.',
    },
    { state: 'Done', title: 'Act and log', text: 'The action runs and goes in the log.' },
  ],
  views: [
    {
      eyebrow: 'Patient view',
      text: 'Large buttons, few choices on screen, high contrast and optional voice prompts. Urdu and English.',
    },
    {
      eyebrow: 'Caregiver view',
      text: 'Set-up, calibration help, contacts, preset messages, alerts, the activity log and battery status, on their own phone.',
    },
    {
      eyebrow: 'Therapist view · later',
      text: 'Progress over time, accuracy per command, session length, notes and reports for the rehabilitation team.',
    },
  ],
};
