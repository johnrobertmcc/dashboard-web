import styles from './Main.module.scss';
import React from 'react';
import { Container } from 'layout';
import 'react-toastify/dist/ReactToastify.css';
import cn from 'classnames';
import { useSettingsContext } from 'context/SettingsData/SettingsData';

/**
 * Renders the Main layout with dynamic children.
 *
 * @author  John Robert McCann
 * @since   09/30/2022
 * @version 1.0.0
 * @return  {Element}   The Main component.
 */
export default function Main({ children }) {
  const { theme } = useSettingsContext();

  return (
    <Container tag="main" className={cn(styles.main, styles[theme])}>
      {children}
    </Container>
  );
}
