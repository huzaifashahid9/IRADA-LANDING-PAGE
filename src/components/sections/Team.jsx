import {
  Card,
  CardText,
  CardTitle,
  Eyebrow,
  Grid,
  RichText,
  Section,
  SectionHeading,
} from '@/components/ui';
import { team } from '@/content/team';
import { cx } from '@/lib/cx';
import styles from './Team.module.css';

const PLACEHOLDER_COLOR = 'var(--violet-400)';

export default function Team() {
  return (
    <Section id="team" tone="light" labelledBy="team-title">
      <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} lead={team.lead} />

      {/* Two or three columns, so a two-person team does not leave an empty slot. */}
      <Grid
        cols={team.members.length === 2 || team.members.length === 4 ? 2 : 3}
        as="ul"
        className={styles.list}
      >
        {team.members.map((member) => (
          <Card as="li" key={member.name} tone="soft" padding="sm" className={styles.member}>
            <span className={cx(styles.avatar, styles[member.tone])} aria-hidden="true">
              {member.initials}
            </span>
            <div className={styles.memberBody}>
              <CardTitle size="md">
                <RichText text={member.name} placeholderColor={PLACEHOLDER_COLOR} />
              </CardTitle>
              <CardText size="small" color="muted" strong>
                <RichText text={member.role} placeholderColor={PLACEHOLDER_COLOR} />
              </CardText>
              <CardText size="small" color="muted">
                <RichText text={member.note} placeholderColor={PLACEHOLDER_COLOR} />
              </CardText>
            </div>
          </Card>
        ))}
      </Grid>

      <Grid cols={4} gap="md" as="ul" className={styles.list}>
        {team.openRoles.map((role) => (
          <Card
            as="li"
            key={role.title}
            tone="dashed"
            padding="sm"
            radius="md"
            className={styles.role}
          >
            <Eyebrow>{role.label}</Eyebrow>
            <CardTitle as="p" size="sm">
              {role.title}
            </CardTitle>
            <CardText size="small" color="muted">
              <RichText text={role.text} placeholderColor={PLACEHOLDER_COLOR} />
            </CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
