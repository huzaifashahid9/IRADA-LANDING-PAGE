export const problem = {
  eyebrow: '01 · The problem',
  title: 'The mind is fine. The phone is out of reach.',
  lead: 'Spinal-cord injury, ALS, stroke and cerebral palsy can leave a person unable to move their hands or speak. They know exactly what they want, but they cannot call family, send a message or ask for help unless someone is in the room.',
  conditions: ['Spinal-cord injury', 'ALS', 'Stroke', 'Cerebral palsy'],
  /**
   * Verified figures from the pitch deck. `count` is the number the counter animates to;
   * `prefix`/`suffix` are drawn around it, so the final text always matches `display`.
   */
  stats: [
    {
      where: 'Worldwide · 2021',
      count: 15.4,
      decimals: 1,
      suffix: 'M',
      text: 'people were living with spinal-cord injury.',
      source: 'WHO, Spinal cord injury fact sheet (16 Apr 2024)',
    },
    {
      where: 'Worldwide · 2021',
      count: 93.8,
      decimals: 1,
      suffix: 'M',
      text: 'people were living after a stroke, with 11.9M new strokes every year.',
      source: 'World Stroke Organization, Global Stroke Fact Sheet 2025',
    },
    {
      where: 'Pakistan · 2021',
      count: 1088,
      text: 'in every 100,000 people have had a stroke. Stroke is the 2nd leading cause of death (99,759 deaths).',
      source: 'GBD 2021 study of stroke in Pakistan, Global Epidemiology (2025)',
    },
    {
      where: 'Pakistan · every year',
      count: 153,
      text: 'new strokes a year in every 100,000 people (2021 incidence).',
      source: 'GBD 2021 study of stroke in Pakistan, Global Epidemiology (2025)',
    },
  ],
  sources: [
    {
      label: 'WHO fact sheet',
      href: 'https://www.who.int/news-room/fact-sheets/detail/spinal-cord-injury',
    },
    {
      label: 'Int J Stroke 2025;20(2):132–144',
      href: 'https://doi.org/10.1177/17474930241308142',
    },
    {
      label: 'Global Epidemiology 2025',
      href: 'https://www.sciencedirect.com/science/article/pii/S259011332500029X',
    },
  ],
  audiences: [
    {
      icon: 'user',
      eyebrow: 'Users',
      title: 'Adults and young adults',
      text: 'with severe motor or speech impairment who are cognitively aware.',
    },
    {
      icon: 'heart',
      eyebrow: 'Helpers',
      title: 'Caregivers and therapists',
      text: 'set up the headset, run calibration and review the activity log.',
    },
    {
      icon: 'building',
      eyebrow: 'First buyers',
      title: 'Rehab centres and hospitals',
      text: 'Spinal-injury units first. Later, families, charities and NGOs.',
    },
  ],
};
