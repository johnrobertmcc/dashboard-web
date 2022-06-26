import { Calendar } from '@johnrobertmcc/dashboard-library';
import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * Dashboard View for J.R. McCann.
 *
 * @returns {Element}  The Dashboard Web View and Modifier.
 */
function App() {
  function handleClick(e) {
    e.preventDefault();

    const budgetItem = {
      body: {
        amount: 5,
        item: 'Chalupa',
      },
    };

    axios.post('http://localhost:5000/api/v1/budget', budgetItem);
    console.log('jr posted');
  }
  return (
    <div>
      <h1 className={styles.calendar}>Testing</h1>
      <button onClick={(e) => handleClick(e)}>Click Here</button>
    </div>
  );
}

export default App;
