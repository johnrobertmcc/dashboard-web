import styles from './Register.module.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import createInputRows from 'functions/utils/createInputRows';
import { register, reset } from 'features/auth/authSlice.js';
import Loading from 'components/utils/Loading';
import { PASSWORD_ERROR } from 'errors';
import { Container } from 'layout';

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  /**
   * Hook used to watch for changes in the user middleware.
   */
  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
      dispatch(reset());
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  /**
   * Function used to update the input with user information.
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
   * @since 6/26/2022
   * @param {Event} e  The user event.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (data?.password?.value !== data?.passwordVerify?.value) {
      console.error(PASSWORD_ERROR);
    } else {
      const userData = {
        name: data?.name?.value,
        email: data?.email?.value,
        password: data?.password?.value,
      };

      dispatch(register(userData));
    }
  }

  return (
    <Container tag="section" className={styles.page}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className={styles.header}>Please create an account.</h2>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            {createInputRows(data, (e) => handleChange(e))}
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </Container>
  );
}
