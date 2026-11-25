import { Card, CardText, Eyebrow, Grid, Section, SectionHeading } from '@/components/ui';
import { roadmap } from '@/content/roadmap';
import RoadmapTimeline from './RoadmapTimeline';
import styles from './Roadmap.module.css';

export default function Roadmap() {
  return (
    <Section id="roadmap" tone="night" labelledBy="roadmap-title">
      <SectionHeading
        id="roadmap-title"
        eyebrow={roadmap.eyebrow}
        title={roadmap.title}
        lead={roadmap.lead}
      />

      <RoadmapTimeline phases={roadmap.phases} />

      <Grid cols={4} gap="md" as="ul" className={styles.versions}>
        {roadmap.versions.map((version) => (
          <Card
            as="li"
            key={version.label}
            tone={version.current ? 'lime' : 'glass'}
            padding="sm"
            radius="md"
            className={styles.version}
          >
            <Eyebrow color={version.current ? 'var(--olive-700)' : 'var(--lime)'}>
              {version.label}
            </Eyebrow>
            <p className={styles.versionTitle}>{version.title}</p>
            <CardText size="small">{version.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
