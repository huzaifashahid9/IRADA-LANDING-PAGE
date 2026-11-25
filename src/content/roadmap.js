export const roadmap = {
  eyebrow: '12 · Roadmap',
  title: 'Eighteen months to a supervised pilot.',
  lead: 'If time and money are tight, Phases 0 and 1 come first. They cost almost nothing and prove the core.',
  phases: [
    {
      when: 'Phase 0 · wk 1–2',
      title: 'Set up',
      text: 'Tools, datasets, EEG basics, roles, an advisor.',
      status: 'first',
    },
    {
      when: 'Phase 1 · wk 2–6',
      title: 'Software proof',
      text: 'Classifier on public data, app with simulated signals and the emergency flow.',
      status: 'first',
    },
    {
      when: 'Phase 2 · wk 3–8',
      title: 'Signal chain',
      text: 'Tier 1 hardware streaming blinks, clenches and alpha to the app.',
    },
    {
      when: 'Phase 3 · wk 8–14',
      title: 'Integrate',
      text: 'Live calibration, P300 menu, switch fallback, warnings and logging.',
    },
    {
      when: 'Phase 4 · wk 14–20',
      title: 'Volunteer testing',
      text: 'Healthy adults, written protocol, accuracy per user and per command.',
    },
    {
      when: 'Phase 5 · mo 5–9',
      title: 'Pilot prep',
      text: 'Ethics application, rehab partner, consent, Urdu caregiver guide.',
    },
    {
      when: 'Phase 6 · mo 9–18',
      title: 'Supervised pilot',
      text: 'A small group, a results write-up, pricing and a first-batch plan.',
      status: 'goal',
    },
  ],
  versions: [
    {
      label: 'Version 1 · now',
      title: 'Prototype',
      text: 'Simulated and replay modes, command menu, confidence, timed confirmation, log, signal warnings.',
      current: true,
    },
    {
      label: 'Version 2',
      title: 'Usable prototype',
      text: 'Live Bluetooth headset, personal model, P300 and switch, caregiver alerts, Urdu and English.',
    },
    {
      label: 'Version 3',
      title: 'Pilot product',
      text: 'Clinician dashboard, encrypted sync, safe model updates, Urdu onboarding videos.',
    },
    {
      label: 'Version 4',
      title: 'Later ideas',
      text: 'Smart-home, reminders, a symbol board, eye tracking, multi-user for centres.',
    },
  ],
};
