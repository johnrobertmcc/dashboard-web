import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import createInputRows from 'functions/utils/createInputRows';
import register, { reset } from 'features/auth/authSlice.js';
import Loading from 'components/utils/Loading';

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
    (state) => state.auth
  );

  /**
   * Hook used to watch for changes in the user middleware.
   */
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
      dispatch(reset());
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message]);

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
  function handleSubmit(e) {
    e.preventDefault();

    if (data?.password?.value !== data?.passwordVerify?.value) {
      toast.error('Passwords do not match.');
    } else {
      const userData = {
        nme: data?.name,
        email: data?.email,
        password: data?.password,
      };
      dispatch(register(userData));
    }
  }

  console.log('jr data', data);

  return (
    <div className={styles.page}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className={styles.header}>Please create an account.</h1>

          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            {createInputRows(data, (e) => handleChange(e))}
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}
