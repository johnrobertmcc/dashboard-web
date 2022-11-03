import PropTypes from 'prop-types';
import styles from './BodyAside.module.scss';
import NavLinks from 'layout/Header/NavLinks';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { LINKS } from 'constants';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import cn from 'classnames';

/**
 * Renders the aside for the user's navigation based on logged in state.
 *
 * @author  John Robert McCann
 * @since   10/02/2022
 * @version 1.0.0
 * @return  {Element}     The BodyAside component.
 */
export default function BodyAside() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { openMenu } = useSettingsContext();

  /**
   * Function to handle logging out the user from the browser by dispatching async Action.
   *
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   */
  function handleLogOut() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  if (!user) {
    return null;
  }
  return (
    <aside className={cn(styles.aside, openMenu['left'] && styles.open)}>
      <NavLinks
        user={user}
        handleLogOut={handleLogOut}
        className={styles.menuDrawer}
        links={LINKS}
      />
    </aside>
  );
}
BodyAside.propTypes = {
  component: PropTypes.string,
};
BodyAside.defaultProps = {
  component: 'BodyAside',
};
