import { Container, Icon, Logo } from '@/components/ui';
import styles from './Footer.module.css';

/**
 * @param {object} props
 * @param {{href: string, label: string}[]} props.links
 * @param {string} props.disclaimer
 * @param {string} props.team
 * @param {{name: string, url: string}} props.author
 */
export default function Footer({ links, disclaimer, team, author }) {
  const year = 2026;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.top}>
          <Logo size={44} showUrdu />
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
          <p className={styles.meta}>
            Designed and built by{' '}
            <a
              href={author.url}
              className={styles.author}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size={14} />
              {author.name}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
