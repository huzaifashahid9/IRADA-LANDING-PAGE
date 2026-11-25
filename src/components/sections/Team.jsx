import { Card, CardText, CardTitle, Eyebrow, Grid, Icon, Section, SectionHeading } from '@/components/ui';
import { team } from '@/content/team';
import { cx } from '@/lib/cx';
import styles from './Team.module.css';

export default function Team() {
  return (
    <Section id="team" tone="light" labelledBy="team-title">
      <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} lead={team.lead} />

      <Grid cols={2} as="ul" className={styles.list}>
        {team.members.map((member) => (
          <Card as="li" key={member.name} tone="soft" padding="lg" className={styles.member}>
            <div className={styles.memberHead}>
              <span className={cx(styles.avatar, styles[member.tone])} aria-hidden="true">
                {member.initials}
              </span>
              <div className={styles.memberName}>
                <CardTitle size="md">{member.name}</CardTitle>
                <Eyebrow>{member.role}</Eyebrow>
              </div>
            </div>
            <CardText>{member.text}</CardText>
            <p className={styles.bio}>{member.bio}</p>
          </Card>
        ))}
      </Grid>

      <div className={styles.split}>
        <Card tone="ink" className={styles.shipped}>
          <Eyebrow color="var(--lime)">{team.shipped.title}</Eyebrow>
          <ul className={styles.points}>
            {team.shipped.points.map((point) => (
              <li key={point}>
                <span className={styles.check} aria-hidden="true">
                  <Icon name="check" size={14} strokeWidth={3} />
                </span>
                <CardText as="span" strong>
                  {point}
                </CardText>
              </li>
            ))}
          </ul>
        </Card>
        <div className={styles.wanted} data-reveal="">
          <Eyebrow>{team.wanted.title}</Eyebrow>
          <ul className={styles.roles}>
            {team.wanted.roles.map((role) => (
              <li key={role.title} className={styles.role}>
                <span className={styles.plus} aria-hidden="true">
                  <Icon name="plus" size={16} strokeWidth={2.6} />
                </span>
                <div>
                  <CardTitle as="p" size="sm">
                    {role.title}
                  </CardTitle>
                  <CardText size="small" color="muted">
                    {role.text}
                  </CardText>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
