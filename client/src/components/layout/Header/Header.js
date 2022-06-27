import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { LINKS } from 'constants';
import Container from '../Container';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the Global Header Component.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element} The Header component.
 */
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  /**
   * Function to handle logging out the user from the browser by dispatching async Action.
   */
  function handleLogOut() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  return (
    <Container layout="nav" tag={'header'} className={styles.header}>
      <img src="./favicon.webp" alt="J.R. Inc" className={styles.logoImg} />
      <ul className={styles.list}>
        {LINKS.map((link, i) => {
          if (!!user && link?.title === 'Register') {
            return null;
          }
          if (!!user && link?.title === 'Log In') {
            return null;
          }
          if (!user && link?.title === 'Log Out') {
            return null;
          }
          if (!user && link?.title === 'Dashboard') {
            return null;
          }

          if (user && link?.title === 'Log Out') {
            return (
              <li className={styles.logout}>
                <button onClick={() => handleLogOut()}>{link.title}</button>
              </li>
            );
          }

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
