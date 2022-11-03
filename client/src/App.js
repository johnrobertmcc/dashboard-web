import React, { createElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Container } from 'layout';
import SettingsData from 'context/SettingsData';
import styles from './App.module.scss';
import Main from 'layout/Main';
import MainAside from 'layout/BodyAside';
import { ROUTES } from 'constants';

/**
 * The default Layout of the application.
 *
 * @author  John Robert McCann
 * @since   6/25/2022
 * @version 1.0.0
 * @returns {Element} The Dashboard Web App itself.
 */
export default function App() {
  return (
    <SettingsData>
      <Router>
        <Header />
        <Container tag="article" layout="nav" className={styles.article}>
          <MainAside />
          <Main>
            <Routes>
              {ROUTES?.map((route, i) => {
                const { path, element } = route;
                return (
                  <Route path={path} element={createElement(element)} key={i} />
                );
              })}
            </Routes>
          </Main>
        </Container>
      </Router>
    </SettingsData>
  );
}
