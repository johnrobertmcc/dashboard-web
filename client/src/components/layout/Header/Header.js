import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { LINKS } from 'constants';
import Container from '../Container';

/**
 * Renders the Global Header Component.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element} The Header component.
 */
export default function Header() {
  return (
    <Container layout="nav" tag={'header'} className={styles.header}>
      <img src="./favicon.webp" alt="J.R. Inc" className={styles.logoImg} />
      <ul className={styles.list}>
        {LINKS.map((link, i) => {
          return (
            <li className={styles.link} key={i}>
              <Link to={link?.url}>{link?.title}</Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
