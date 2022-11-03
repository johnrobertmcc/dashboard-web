import styles from './Header.module.scss';
import Container from '../Container';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import NavMenu from './NavMenu';
import { useState } from 'react';
import { disableScroll, enableScroll } from 'functions/utils/scroll';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import cn from 'classnames';
import { NAV_LINKS } from 'constants';
import { ACCESSIBLE_HEADER } from 'constants';
import { RIGHT, LEFT } from './Header.utils';

/**
 * Renders the Global Header Component.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element} The Header component.
 */
export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { theme, openMenu, handleClick } = useSettingsContext();

  return (
    <Container
      layout="nav"
      tag={'header'}
      className={cn(styles.header, styles[theme])}
    >
      <h1 className="sr-only">{ACCESSIBLE_HEADER}</h1>
      <button onClick={() => handleClick(LEFT)}>
        <img src="./favicon.webp" alt="J.R. Inc" className={styles.logoImg} />
      </button>
      <NavLinks user={user} className={!user && styles.unauthenticated} />
      {!user && (
        <>
          <button
            onClick={() => handleClick(RIGHT)}
            className={styles.openMenu}
          >
            Menu
          </button>
          <NavMenu
            user={user}
            open={openMenu}
            closeDrawer={() => handleClick(RIGHT)}
          />
        </>
      )}
    </Container>
  );
}
