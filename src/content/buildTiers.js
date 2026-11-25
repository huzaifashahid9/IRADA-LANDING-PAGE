export const buildTiers = {
  eyebrow: '12 · The build path',
  title: 'Software first. Then cheap hardware. Then the real thing.',
  lead: 'Four hardware tiers, each proving one more link in the chain before we spend on the next. Prices are rough PKR estimates.',
  tiers: [
    {
      label: 'Tier 0',
      title: 'Software only',
      price: 'PKR 0–5,000',
      text: 'Laptop, free notebooks, public datasets. Proves decoding and the app.',
      tone: 'lime',
    },
    {
      label: 'Tier 1',
      title: 'Home-built signal chain',
      price: 'PKR 15,000–30,000',
      text: 'ESP32, ADC, biopotential board. Real blinks, clenches and alpha reach the phone.',
      tone: 'soft',
    },
    {
      label: 'Tier 2',
      title: 'Hobby-grade EEG',
      price: 'PKR 70,000–130,000',
      text: 'OpenBCI Ganglion, 4 channels. Enough for P300 and SSVEP.',
      tone: 'soft',
    },
    {
      label: 'Tier 3 · V1 target',
      title: 'Research-grade',
      price: 'PKR 300,000–800,000',
      text: 'OpenBCI Cyton or an ADS1299 board. The realistic route to motor imagery.',
      tone: 'violet',
    },
    {
      label: 'Tier 4 · later',
      title: 'Our own board',
      price: 'Under USD 500',
      text: 'Custom ADS1299 PCB with microcontroller and Bluetooth, after safety review.',
      tone: 'ink',
    },
  ],
};
