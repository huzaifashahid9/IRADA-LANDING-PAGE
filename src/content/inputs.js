export const inputs = {
  eyebrow: '05 · Ways to choose',
  title: "Not everyone's brain works the same way. So there are four ways in.",
  lead: 'We start with motor imagery, add a flashing P300 menu for selection and confirmation, and keep a switch fallback from day one.',
  methods: [
    {
      tag: 'Start here',
      tagTone: 'lime',
      title: 'Motor imagery',
      text: 'The user imagines moving the left hand, right hand, feet or tongue. Activity over C3, Cz and C4 changes in a measurable way.',
      good: 'Good for: no screen needed',
      watch: 'Watch: some people cannot do it reliably',
    },
    {
      tag: 'Menus',
      tagTone: 'soft',
      title: 'P300 selection',
      text: 'Options flash on screen. When the flash matches what the user wants, the brain responds about 300 ms later.',
      good: 'Good for: people who cannot do motor imagery',
      watch: 'Watch: slower',
    },
    {
      tag: 'Opt-in',
      tagTone: 'soft',
      title: 'SSVEP',
      text: 'Targets flicker at different rates. Looking at one produces a matching rhythm in the visual cortex.',
      good: 'Good for: speed and accuracy',
      watch: 'Watch: flicker can tire the eyes, so we warn first',
    },
  ],
  fallback: {
    tag: 'Always on',
    title: 'Fallbacks',
    text: 'Eye tracking, a single switch, or caregiver-assisted selection for anyone who cannot use a brain-based method.',
    note: 'No one is left without a way to choose',
  },
};
