import Icon from './Icon';
import styles from './IconBadge.module.css';

/** A soft square tile holding an icon, used at the top of feature cards. */
export default function IconBadge({ name }) {
  return (
    <span className={styles.badge}>
      <Icon name={name} size={26} />
    </span>
  );
}
