export const howItWorks = {
  eyebrow: '03 · How it works',
  title: 'From intention to action in five steps.',
  lead: 'Every step is visible to the user. The fourth one is the one that matters most: nothing happens until the user says yes.',
  steps: [
    {
      title: 'Record',
      text: 'Scalp electrodes pick up EEG. A small circuit amplifies, digitises and sends it over Bluetooth Low Energy.',
      image: '/images/step-record.png',
    },
    {
      title: 'Clean',
      text: 'The app checks contact, removes mains hum, blinks and muscle noise, and cuts the signal into short windows.',
      image: '/images/step-clean.png',
    },
    {
      title: 'Decode',
      text: 'A model trained for that user predicts which command was intended, and how confident it is.',
      image: '/images/step-decode.png',
    },
    {
      title: 'Confirm',
      text: 'The app shows the command. The user confirms or cancels with a second, simple selection. Nothing runs without this.',
      image: '/images/step-confirm.png',
      highlight: true,
    },
    {
      title: 'Act',
      text: 'The agent carries out the confirmed action: call a saved contact, send a preset message, or share location in an emergency.',
      image: '/images/step-act.png',
    },
  ],
  stateMachine: {
    caption: 'Under the hood: every interaction is a state machine, and every transition is logged',
    flow: ['Idle', 'Listening', 'Intent detected', 'Awaiting confirmation', 'Executing', 'Done'],
    highlight: 'Awaiting confirmation',
    exits: ['Cancelled', 'Error'],
  },
};
