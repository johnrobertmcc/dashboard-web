import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogIn, Register, Dashboard, Ledger } from 'pages';
import { Header, Container } from 'layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ledger" element={<Ledger />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
}
