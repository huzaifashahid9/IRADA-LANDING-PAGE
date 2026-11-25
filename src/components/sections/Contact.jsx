import Image from 'next/image';
import { Button, Container, Eyebrow, Pill, RichText } from '@/components/ui';
import { contact } from '@/content/contact';
import { hero } from '@/content/hero';
import { site } from '@/content/site';
import styles from './Contact.module.css';

export default function Contact() {
  const details = [
    { label: 'Email', value: site.contact.email },
    { label: 'Phone', value: site.contact.phone },
    { label: 'Based in', value: site.contact.city },
  ];

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <Eyebrow color="var(--lime)">{contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className={styles.title}>
            {contact.title}
          </h2>
          <div className={styles.actions}>
            <Button href={contact.primaryCta.href} arrow>
              {contact.primaryCta.label}
            </Button>
            <Button href={contact.secondaryCta.href} variant="black">
              {contact.secondaryCta.label}
            </Button>
          </div>
          <dl id="contact-details" className={styles.details}>
            {details.map((item) => (
              <div key={item.label} className={styles.detail}>
                <dt className={styles.detailLabel}>{item.label}</dt>
                <dd className={styles.detailValue}>
                  <RichText text={item.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.visual}>
          <Image
            src={hero.image.src}
            alt=""
            width={hero.image.width}
            height={hero.image.height}
            sizes="(max-width: 760px) 90vw, 45vw"
            className={styles.image}
          />
          <Pill tone="lime" rotate={6} className={styles.tag}>
            {contact.tag}
          </Pill>
        </div>
      </Container>
    </section>
  );
}
