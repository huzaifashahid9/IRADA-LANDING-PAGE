import { Container, Icon, Logo } from '@/components/ui';
import styles from './Footer.module.css';

/**
 * @param {object} props
 * @param {{href: string, label: string}[]} props.links
 * @param {string} props.disclaimer
 * @param {string} props.team
 * @param {{name: string, url: string, linkedin?: string}[]} [props.authors]
 */
export default function Footer({ links, disclaimer, team, authors }) {
  const year = 2026;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.top}>
          <Logo variant="full" size={96} showUrdu />
          <nav aria-label="Footer">
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p className={styles.disclaimer}>IRADA is an {disclaimer.toLowerCase()}.</p>
          <p className={styles.meta}>
            © {year} {team} · Prices are rough estimates in PKR
          </p>
          {authors?.length > 0 && (
            <p className={styles.meta}>
              Designed and built by{' '}
              {authors.map((person, index) => (
                <span key={person.name} className={styles.person}>
                  {index > 0 && <span className={styles.and}>and</span>}
                  <a
                    href={person.url}
                    className={styles.author}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="github" size={14} />
                    {person.name}
                    <span className="visually-hidden"> on GitHub (opens in a new tab)</span>
                  </a>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      className={styles.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn (opens in a new tab)`}
                    >
                      <Icon name="linkedin" size={15} />
                    </a>
                  )}
                </span>
              ))}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
