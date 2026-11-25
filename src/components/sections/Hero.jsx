import HeadsetViewer from '@/components/headset/HeadsetViewer';
import { Button, Container, Eyebrow, Icon, Pill } from '@/components/ui';
import { hero } from '@/content/hero';
import { site } from '@/content/site';
import { cx } from '@/lib/cx';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <Eyebrow color="var(--lime)">{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <Button href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="black">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.glow} aria-hidden="true" />
          <HeadsetViewer
            poster={hero.image}
            priority
            cameraOrbit="25deg 75deg 105%"
            className={styles.viewer}
          />
          {hero.tags.map((tag) => (
            <Pill
              key={tag.label}
              tone={tag.tone}
              rotate={tag.rotate}
              className={cx(styles.tag, styles[tag.position])}
            >
              {tag.label}
            </Pill>
          ))}
          <Pill tone="outline" className={cx(styles.tag, styles.bottomLeft)}>
            <Icon name="rotate" size={16} strokeWidth={2.2} />
            Drag to rotate
          </Pill>
        </div>
      </Container>

      <div className={styles.meta}>
        <Container className={styles.metaInner}>
          <p>{site.versionLine}</p>
          <p className={styles.disclaimer}>{site.disclaimer}</p>
        </Container>
      </div>
    </section>
  );
}
