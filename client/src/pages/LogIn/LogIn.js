import styles from './LogIn.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import createInputRows from 'functions/utils/createInputRows';
import { reset, login } from 'features/auth/authSlice.js';
import { INVALID_LOGIN } from 'errors';
import Loading from 'components/utils/Loading';
import { Container } from 'layout';
import { enableScroll } from 'functions/utils/scroll';

/**
 * Renders the Login Page to log into one's own dashbord.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}    The LogIn component.
 */
export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultState = {
    email: { value: '', text: 'Enter your email.' },
    password: { value: '', text: 'Enter your password.' },
  };
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const { user = null } = useSelector((state) => state?.auth);

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
    setLoading(true);
    try {
      const userData = {
        email: data?.email?.value,
        password: data?.password?.value,
      };

      dispatch(login(userData));
      dispatch(reset());
    } catch (e) {
      console.error(INVALID_LOGIN);
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/');
      enableScroll();
    }
  }, [user, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container tag="section" className={styles.page}>
      <h2 className={styles.header}>Login to see your dashboard.</h2>

      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {createInputRows(data, (e) => handleChange(e))}
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}
