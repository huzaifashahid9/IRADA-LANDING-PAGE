export const safety = {
  eyebrow: '07 · Safety',
  lead: 'There is no free-running autonomy. The decoded command picks a tool, the user confirms, and only then does the tool run.',
  rules: [
    {
      title: 'No action without confirmation.',
      text: 'Emergency and unknown-number actions need a stronger confirmation, like two selections in a row or a caregiver tap.',
    },
    { title: 'Low confidence means ask again.', text: 'IRADA never guesses.' },
    { title: 'Weak signal pauses the system.', text: 'The user and caregiver are told why.' },
    { title: 'Timeout cancels.', text: 'Silence is never treated as consent.' },
    {
      title: 'A button or a caregiver can always cancel.',
      text: "From the caregiver's phone or the physical button on the headset.",
    },
    {
      title: 'Every action is logged and reviewable.',
      text: 'What was done, when, to whom, and how confident the model was.',
    },
  ],
  can: 'With calibration and practice: recognise a handful of distinct commands, show its confidence, ask for confirmation, trigger simple phone actions and log everything.',
  cannot:
    'Read free thoughts, turn imagined speech into text, work equally well for everyone, work without calibration, or replace caregivers.',
  disclaimer: {
    title: 'Assistive prototype, not a medical device.',
    text: 'We never claim that IRADA diagnoses or treats anything, that it is clinically proven, or that it is certified. Ethics approval, testing and regulatory steps come first.',
  },
};
