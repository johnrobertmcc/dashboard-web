import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { LINKS } from 'constants';

/**
 * Renders the Global Header Component.
 *
 * @return {Element}   The Header component.
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <img src="./favicon.webp" alt="J.R. Inc" className={styles.logoImg} />
      <ul className={styles.list}>
        {LINKS.map((link, i) => {
          return (
            <li className={styles.link}>
              <Link to={link?.url}>{link?.title}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
