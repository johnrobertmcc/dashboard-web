import styles from './Header.module.scss';
import Container from '../Container';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import NavMenu from './NavMenu';
import { useState } from 'react';
import { disableScroll, enableScroll } from 'functions/utils/scroll';

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
  const [openMenu, setOpenMenu] = useState(false);

  /**
   * Function to handle logging out the user from the browser by dispatching async Action.
   *
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   * */
  function handleLogOut() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  /**
   * Function used to open the drawer and set the calendar data.
   *
   * @author  John Robert McCann
   * @since   8/28/2022
   * @version 1.0.0
   */
  function openDrawer() {
    setOpenMenu(!openMenu);
    disableScroll();
  }

  /**
   * Function used to open the drawer and reset the calendar data.
   *
   * @author  John Robert McCann
   * @since   8/28/2022
   * @version 1.0.0
   */
  function closeDrawer() {
    setOpenMenu(false);
    enableScroll();
  }

  return (
    <Container layout="nav" tag={'header'} className={styles.header}>
      <img src="./favicon.webp" alt="J.R. Inc" className={styles.logoImg} />
      <NavLinks user={user} handleLogOut={handleLogOut} />
      <button onClick={() => openDrawer()} className={styles.openMenu}>
        Menu
      </button>
      <NavMenu
        user={user}
        handleLogOut={handleLogOut}
        open={openMenu}
        closeDrawer={() => closeDrawer()}
      />
    </Container>
  );
}
