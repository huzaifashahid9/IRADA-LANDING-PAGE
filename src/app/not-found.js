import { Button, Logo } from '@/components/ui';
import styles from './not-found.module.css';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Logo variant="full" size={120} eager />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page does not exist.</h1>
      <Button href="/" arrow>
        Back to IRADA
      </Button>
    </main>
  );
}
