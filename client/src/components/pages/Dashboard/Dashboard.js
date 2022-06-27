import styles from './Dashboard.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Renders the default view "/" to display the user's information.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}  The Dashboard view.
 */
export default function Dashboard() {
  const navigate = useNavigate();

  const { user = null } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <section>
      <h1>Welcome {user && user?.name}</h1>
      <h3>Expenditures</h3>
    </section>
  );
}
