import styles from './LogIn.module.css';
import { useState, useEffect } from 'react';
import createInputRows from 'functions/utils/createInputRows';

/**
 * Renders the Login Page.
 *
 * @return {Element}    The LogIn component.
 */
export default function LogIn() {
  const defaultState = {
    email: { value: '', text: 'Enter your email.' },
    password: { value: '', text: 'Enter your password.' },
  };
  const [data, setData] = useState(defaultState);

  /**
   * Function used to updte the input with user information.
   *
   * @author John Robert McCann
   * @since 6/26/2022
   * @param {Event} e  The user event.
   */
  function handleChange(e) {
    e.preventDefault();
    setData((prev) => ({
      ...prev,
      [e.target.name]: { ...prev[e.target.name], value: e?.target?.value },
    }));
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Login to see your dashboard.</h1>

      <form className={styles.form}>
        {createInputRows(data, (e) => handleChange(e))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
