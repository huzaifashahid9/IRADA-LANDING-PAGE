export const faq = {
  eyebrow: '16 · Questions',
  title: 'The questions judges ask us.',
  items: [
    {
      question: 'Does IRADA read thoughts?',
      answer:
        'No. It recognises a small set of commands the user has practised, like a keyboard recognising key presses. It cannot read free thoughts or turn imagined speech into text.',
    },
    {
      question: 'Is it a medical device?',
      answer:
        'No. It is an assistive prototype until ethics approval, testing and regulatory steps, including DRAP medical-device advice, are done.',
    },
    {
      question: 'What if it picks the wrong command?',
      answer:
        'Nothing happens until the user confirms. Low confidence makes the app ask again, the confirmation times out to cancel, and a button or caregiver can stop anything.',
    },
    {
      question: "What if someone can't do motor imagery?",
      answer:
        'They can use a P300 flashing menu, eye tracking, a single switch or caregiver-assisted selection.',
    },
    {
      question: 'Where does the brain data go?',
      answer:
        'Raw EEG stays on the phone. It is encrypted, never sold, and the user can export or delete it.',
    },
    {
      question: 'Has it been tested on patients?',
      answer:
        'Not yet, on purpose. We test only on consenting adults on the team until ethics approval and clinical oversight are in place. The supervised pilot is Phase 6.',
    },
  ],
};
