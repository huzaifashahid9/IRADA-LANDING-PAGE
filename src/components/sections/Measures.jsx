import { Grid, Section, SectionHeading, Stat } from '@/components/ui';
import { measures } from '@/content/measures';

export default function Measures() {
  return (
    <Section id="measures" tone="lime" labelledBy="measures-title">
      <SectionHeading
        id="measures-title"
        eyebrow={measures.eyebrow}
        title={measures.title}
        lead={measures.lead}
      />
      <Grid cols={4} gap="md">
        {measures.stats.map((stat) => (
          <Stat key={stat.label} size="xl" value={stat.value} unit={stat.unit} label={stat.label} />
        ))}
      </Grid>
    </Section>
  );
}
