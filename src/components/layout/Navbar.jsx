'use client';

import { useEffect, useState } from 'react';
import { Button, Icon, Logo } from '@/components/ui';
import { cx } from '@/lib/cx';
import styles from './Navbar.module.css';

/**
 * Floating black navigation. Highlights the section in view and collapses into a
 * menu on small screens.
 *
 * @param {object} props
 * @param {{href: string, label: string, wide?: boolean}[]} props.links
 * @param {{href: string, label: string}} props.cta
 */
export default function Navbar({ links, cta }) {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.wrapper}>
      <nav className={styles.bar} aria-label="Main">
        <a href="#top" className={styles.brand} onClick={close}>
          <Logo size={40} />
          <span className="visually-hidden">, back to top</span>
        </a>

        <ul id="main-menu" className={cx(styles.links, open && styles.linksOpen)}>
          {links.map((link) => (
            <li key={link.href} className={cx(link.wide && styles.wide)}>
              <a
                href={link.href}
                className={cx(styles.link, active === link.href && styles.linkActive)}
                aria-current={active === link.href ? 'location' : undefined}
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href={cta.href} size="sm" className={styles.cta} onClick={close}>
          {cta.label}
        </Button>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>
    </header>
  );
}
