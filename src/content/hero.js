export const hero = {
  eyebrow: 'Irada · ارادہ · means intention',
  title: 'Turn intention into action.',
  lead: 'A brain-signal headset, a phone app and a careful AI agent that let people living with paralysis call family, send a message or ask for help, using commands they have practised.',
  primaryCta: { href: '#headset', label: 'Explore in 3D' },
  secondaryCta: { href: '#app', label: 'Try the app' },
  image: {
    src: '/images/hero.png',
    alt: 'The IRADA headset: a white band with an ear-to-ear arc of motor sensors, ear clips and a cancel button',
    width: 760,
    height: 720,
  },
  tags: [
    { label: 'Non-invasive', tone: 'lime', rotate: -8, position: 'topLeft' },
    { label: 'C3 · Cz · C4', tone: 'ink', rotate: 4, position: 'topRight' },
    { label: 'You confirm every action', tone: 'white', rotate: 5, position: 'bottomRight' },
    { label: 'One button cancels', tone: 'soft', rotate: -3, position: 'midLeft' },
  ],
};

/** Strip of key facts under the hero. `value` is highlighted in lime. */
export const facts = [
  { value: '5', text: 'scalp electrodes on the 10-20 system' },
  { value: '~250', text: 'samples per second' },
  { text: 'Bluetooth Low Energy' },
  { text: 'Battery power only' },
  { value: '4–6', text: 'practised commands' },
  { text: 'Works offline' },
];
