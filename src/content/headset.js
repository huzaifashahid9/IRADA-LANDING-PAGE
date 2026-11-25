/**
 * The six parts of the headset. `hotspot` places the numbered marker on the 3D model,
 * in the model's own coordinates (same as the pitch app). `explodedOffset` is how far
 * the part moves in the model's "Explode" animation, so the marker can follow it.
 */
export const headset = {
  eyebrow: '04 · The headset',
  title: 'Six parts. Nothing invasive.',
  lead: 'Electrode positions follow the international 10-20 system. Drag the live 3D model, tap a number, or explode it to see every part.',
  parts: [
    {
      title: 'Motor sensors',
      text: 'C3, Cz and C4 on an ear-to-ear arc over the motor area. They see the change when the user imagines a practised movement.',
      hotspot: { position: [0, 1.15, 0], normal: [0, 1, 0], explodedOffset: [0, 0.5, 0] },
    },
    {
      title: 'Helper sensors',
      text: 'Fp1 on the forehead catches blinks so they can be cleaned out. Oz at the back tracks the alpha rhythm.',
      hotspot: { position: [0, 0, -1.32], normal: [0, 0, -1], explodedOffset: [0, 0, 0] },
    },
    {
      title: 'Ear clips',
      text: 'Ground and reference on the mastoid bone behind each ear: a steady zero for every other sensor.',
      hotspot: {
        position: [1.078, -0.48, -0.506],
        normal: [0.948, 0, -0.319],
        explodedOffset: [0, 0, 0],
      },
    },
    {
      title: 'Signal core',
      text: 'An amplifier and converter turn microvolt signals into data. An ESP32 streams it over Bluetooth Low Energy.',
      hotspot: {
        position: [0.658, 0, -1.288],
        normal: [0.569, 0, -0.822],
        explodedOffset: [0.353, 0, -0.51],
      },
    },
    {
      title: 'Battery',
      text: 'A rechargeable cell with protection and charging. It only ever runs on battery, never on mains power.',
      hotspot: {
        position: [-0.658, 0, -1.288],
        normal: [-0.569, 0, -0.822],
        explodedOffset: [-0.353, 0, -0.51],
      },
    },
    {
      title: 'Cancel button',
      text: 'A physical button and an LED. Pressing it cancels any pending action, at any time.',
      hotspot: {
        position: [-1.082, 0, 0.664],
        normal: [-0.914, 0, 0.405],
        explodedOffset: [-0.366, 0, 0.162],
      },
    },
  ],
  specs: [
    { label: 'Electrodes', value: 'C3 · Cz · C4 · Fp1 · Oz' },
    { label: 'Ground + reference', value: 'Mastoids' },
    { label: 'Sampling', value: '~250 per second' },
    { label: 'Link', value: 'Bluetooth LE' },
    { label: 'Battery', value: '3.7 V LiPo, 1,000–2,000 mAh' },
    { label: 'Cancel', value: 'Physical button + light' },
  ],
  poster: {
    src: '/images/viewer-poster.png',
    alt: 'The IRADA headset seen from behind, showing the signal core, battery and ear clips',
    width: 680,
    height: 640,
  },
};
