import Drawer from 'components/utils/Drawer';
import PropTypes from 'prop-types';
import NavLinks from '../NavLinks';
import styles from './NavMenu.module.scss';

/**
 * Renders the NavMenu Component
 *
 * @author  John Robert McCann
 * @since   08/27/2022
 * @version 1.0.0
 * @param   {object}   props              The component as props.
 * @param   {object}   props.user         The user information from Redux.
 * @param   {Function} props.handleLogOut Function to handle log out.
 * @param   {boolean}  props.open         Boolean to declare open or not.
 * @return  {Element}                     The NavMenu component.
 */
export default function NavMenu({ user, handleLogOut, open, closeDrawer }) {
  return (
    <Drawer
      data={{
        title: null,
        children: (
          <NavLinks
            user={user}
            handleLogOut={handleLogOut}
            className={styles.menuDrawer}
          />
        ),
      }}
      open={open}
      closeDrawer={closeDrawer}
      className={styles.drawer}
    />
  );
}
NavMenu.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
  handleLogOut: PropTypes.func,
};
