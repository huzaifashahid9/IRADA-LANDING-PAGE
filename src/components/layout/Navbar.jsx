'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Icon, Logo } from '@/components/ui';
import { cx } from '@/lib/cx';
import styles from './Navbar.module.css';

/** Must match the breakpoint in Navbar.module.css where the links collapse into a menu. */
const COLLAPSE_QUERY = '(max-width: 960px)';

/**
 * Floating black navigation. Highlights the section in view and collapses into a
 * menu on phones and tablets.
 *
 * @param {object} props
 * @param {{href: string, label: string}[]} props.links
 * @param {{href: string, label: string}} props.cta
 */
export default function Navbar({ links, cta }) {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  // Highlight the nav link for the section crossing the upper middle of the screen.
  // Watching every section (not only the linked ones) means the highlight clears in
  // the hero and in sections that have no nav link, instead of sticking to the last one.
  useEffect(() => {
    const hrefs = new Set(links.map((link) => link.href));
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inBand.add(entry.target);
          else inBand.delete(entry.target);
        });
        const current = sections.find((section) => inBand.has(section));
        if (!current) return;
        const href = `#${current.id}`;
        setActive(hrefs.has(href) ? href : null);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  // While the menu is open: Escape closes it and returns focus to the toggle; a tap or
  // click outside closes it; widening the window past the breakpoint closes it.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    };
    const query = window.matchMedia(COLLAPSE_QUERY);
    const onBreakpoint = () => {
      if (!query.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    query.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      query.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  // Close the menu when keyboard focus moves out of the navigation.
  const onBlur = (event) => {
    if (open && event.relatedTarget && !navRef.current?.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  const close = () => setOpen(false);

  return (
    <header className={styles.wrapper}>
      <nav ref={navRef} className={styles.bar} aria-label="Main" onBlur={onBlur}>
        <a href="#top" className={styles.brand} onClick={close}>
          <Logo variant="wordmark" size={26} eager />
          <span className="visually-hidden">, back to top</span>
        </a>

        <ul id="main-menu" className={cx(styles.links, open && styles.linksOpen)}>
          {links.map((link) => (
            <li key={link.href}>
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
          <li className={styles.menuCta}>
            <Button href={cta.href} size="sm" className={styles.menuCtaButton} onClick={close}>
              {cta.label}
            </Button>
          </li>
        </ul>

        <Button href={cta.href} size="sm" className={styles.cta} onClick={close}>
          {cta.label}
        </Button>

        <button
          ref={toggleRef}
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
