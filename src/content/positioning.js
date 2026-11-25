export const positioning = {
  eyebrow: '09 · Why IRADA',
  title: 'The gap between implants and eye-trackers.',
  lead: 'Every option today asks for something our users may not have: surgery, steady eyes, some movement or technical skill.',
  columns: ['Option today', 'What it needs', 'Where it falls short for our users'],
  rows: [
    {
      option: 'Brain implants',
      example: 'e.g. Neuralink, Synchron',
      needs: 'Brain surgery',
      gap: 'Trial-only, surgical and out of reach for most families',
    },
    {
      option: 'Eye-tracking devices',
      needs: 'Steady, reliable eye control',
      gap: 'Hard when eyes tire or eye control is weak',
    },
    {
      option: 'Switches and a caregiver',
      needs: 'Some reliable movement, or a person in the room',
      gap: 'No independence when the person is alone',
    },
    {
      option: 'Research EEG kits',
      example: 'e.g. OpenBCI',
      needs: 'Technical skill to set up and code',
      gap: 'A tool for researchers, not a product for patients',
    },
  ],
  irada: {
    option: 'IRADA',
    needs: 'A non-invasive headset and a phone',
    gap: 'Confirm-first, offline, Urdu and English, and it keeps eye tracking and switches as fallbacks',
  },
  edges: [
    'A personal model per user, and a local Urdu-speaking dataset over time.',
    'Safety built in (confirm, cancel, log), so clinicians can trust it.',
    'One product that serves more people, because fallbacks are built in.',
    'Target headset cost under USD 500 with our own board.',
  ],
  copy: {
    title: 'Can it be copied?',
    text: 'The hardware uses known parts, so yes in part. What is hard to copy is the per-user data, the clinical partnerships and the trust that the safety design earns.',
  },
};
