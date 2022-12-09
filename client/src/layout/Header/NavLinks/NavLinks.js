import PropTypes from 'prop-types';
import styles from './NavLinks.module.scss';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from 'constants';

/**
 * Renders the app's Links based on the authenticated state.
 *
 * @author  John Robert McCann
 * @since   08/27/2022
 * @version 1.0.0
 * @param  {object}   props              The component as props.
 * @param  {string}   props.className    Optional className for the provided <ul/>.
 * @param  {string}   props.list         The links to provide into the <ul /> element.
 * @return {Element}                     The NavLinks component.
 */
export default function NavLinks({ className, links }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pathname = null } = useLocation();

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
  return (
    <ul className={cn(className ? className : styles.list)}>
      {links?.map((link, i) => {
        if (link?.protected && !user) {
          return null;
        }

        if (!link?.protected && user) {
          return null;
        }

        if (user && link?.title === 'Log Out') {
          return (
            <li className={cn(styles.link, styles.logOut)} key={i}>
              <button onClick={() => handleLogOut()}>{link.title}</button>
            </li>
          );
        }

        return (
          <li
            className={cn(
              styles.link,
              pathname === link?.url && styles.currentPath
            )}
            key={i}
          >
            <Link to={link?.url}>{link?.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
NavLinks.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
  handleLogOut: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      protected: PropTypes.bool,
    })
  ),
};

NavLinks.defaultProps = {
  className: null,
  links: NAV_LINKS,
};
