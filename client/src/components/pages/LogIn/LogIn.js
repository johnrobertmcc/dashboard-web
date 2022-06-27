import styles from './LogIn.module.css';
import { useState, useEffect } from 'react';
import { login } from 'features/auth/authSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import createInputRows from 'functions/utils/createInputRows';
import { register, reset } from 'features/auth/authSlice.js';
import Loading from 'components/utils/Loading';

/**
 * Renders the Login Page to log into one's own dashbord.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}    The LogIn component.
 */
export default function LogIn() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );
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

  /**
   * Function used submit the user's validated information for further validation.
   *
   * @author John Robert McCann
   * @since 6/27/2022
   * @param {Event} e  The user event.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userData = {
        email: data?.email?.value,
        password: data?.password?.value,
      };

      dispatch(login(userData));
      dispatch(reset());
      navigate('/');
    } catch (e) {
      toast.error('Invalid Login.');
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Login to see your dashboard.</h1>

      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {createInputRows(data, (e) => handleChange(e))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
