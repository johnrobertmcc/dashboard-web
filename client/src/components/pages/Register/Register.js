import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import createInputRows from 'functions/utils/createInputRows';

/**
 * Renders the Register Page to register a new user.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}    The Register component.
 */
export default function Register() {
  const defaultState = {
    name: { value: '', text: 'Enter your name.' },
    email: { value: '', text: 'Enter your email.' },
    password: { value: '', text: 'Enter your password.' },
    passwordVerify: { value: '', text: 'Confirm your password.' },
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
      <h1 className={styles.header}>Please create an account.</h1>

      <form className={styles.form}>
        {createInputRows(data, (e) => handleChange(e))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
