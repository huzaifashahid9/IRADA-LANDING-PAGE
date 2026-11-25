import Image from 'next/image';
import { Button, Container, Eyebrow, Icon, Pill } from '@/components/ui';
import { contact } from '@/content/contact';
import { hero } from '@/content/hero';
import { site } from '@/content/site';
import { contactHref } from '@/lib/placeholder';
import styles from './Contact.module.css';

export default function Contact() {
  // One tap emails both founders (Gmail on Android, Mail on iOS and desktop).
  const emails = site.contacts.map((person) => person.email).join(',');
  const subject = encodeURIComponent('IRADA: hello from irada.live');

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <Container className={styles.grid}>
        <div className={styles.copy} data-reveal="">
          <Eyebrow color="var(--lime)">{contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className={styles.title}>
            {contact.title}
          </h2>
          <p className={styles.lead}>{contact.lead}</p>
          <div className={styles.actions}>
            <Button href={`mailto:${emails}?subject=${subject}`} arrow>
              {contact.primaryCta.label}
            </Button>
            <Button href={contact.secondaryCta.href} variant="black">
              {contact.secondaryCta.label}
            </Button>
          </div>

          <ul className={styles.people}>
            {site.contacts.map((person) => (
              <li key={person.email} className={styles.person}>
                <p className={styles.personName}>
                  {person.name}
                  <span className={styles.personRole}>{person.role}</span>
                </p>
                <a href={contactHref('email', person.email)} className={styles.link}>
                  <Icon name="mail" size={18} />
                  {/* If the address must wrap, it breaks at the @, never mid-word. */}
                  <span className={styles.email}>
                    {person.email.split('@')[0]}
                    <wbr />@{person.email.split('@')[1]}
                  </span>
                </a>
                <a href={contactHref('phone', person.phone)} className={styles.link}>
                  <Icon name="phone" size={18} />
                  {person.phone}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.city}>
            <Icon name="pin" size={18} />
            {site.city}
          </p>
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
          <figure className={styles.qr}>
            <Image src={contact.qr.src} alt={contact.qr.alt} width={112} height={112} />
            <figcaption>{contact.qr.caption}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
