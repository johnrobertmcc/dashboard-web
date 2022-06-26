import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogIn, Register, Dashboard } from './components/pages';
import { Header } from './components/layout';

/**
 * Application used to display and post information about one's daily life.
 *
 * @author  John Robert McCann
 * @since   6/25/2022
 * @version 1.0.0
 * @returns {Element} The Dasboard Web App itself.
 */
export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
