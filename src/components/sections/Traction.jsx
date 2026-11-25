import Image from 'next/image';
import { Card, CardText, CardTitle, Grid, Icon, Pill, Section, SectionHeading } from '@/components/ui';
import { contact } from '@/content/contact';
import { traction } from '@/content/traction';
import styles from './Traction.module.css';

export default function Traction() {
  return (
    <Section id="traction" tone="night" labelledBy="traction-title">
      <SectionHeading
        id="traction-title"
        eyebrow={traction.eyebrow}
        title={traction.title}
        lead={traction.lead}
      />

      <Grid cols={4} as="ul" className={styles.list}>
        {traction.items.map((item) => (
          <Card as="li" key={item.title} tone={item.tone} className={styles.item}>
            <Pill tone={item.tone === 'lime' ? 'ink' : 'lime'} size="sm" className={styles.tag}>
              {item.tag}
            </Pill>
            <CardTitle>{item.title}</CardTitle>
            <CardText>{item.text}</CardText>
          </Card>
        ))}
      </Grid>

      <div className={styles.split}>
        <Card tone="raised" className={styles.inside}>
          <CardTitle as="h3" size="sm">
            {traction.inside.title}
          </CardTitle>
          <ul className={styles.chips}>
            {traction.inside.points.map((point) => (
              <li key={point}>
                <Pill tone="glass">
                  <Icon name="check" size={14} strokeWidth={3} />
                  {point}
                </Pill>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{traction.note}</p>
        </Card>
        <Card tone="white" className={styles.qr}>
          <Image
            src={contact.qr.src}
            alt={contact.qr.alt}
            width={160}
            height={160}
            className={styles.qrImage}
          />
          <div className={styles.qrBody}>
            <CardTitle as="p" size="sm">
              Scan to try it
            </CardTitle>
            <CardText size="small">See the headset in 3D and use the app on your phone.</CardText>
            <p className={styles.url}>irada.live</p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
