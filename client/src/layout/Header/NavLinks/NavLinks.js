import PropTypes from 'prop-types';
import styles from './NavLinks.module.scss';
import { Link } from 'react-router-dom';
import { LINKS } from 'constants';
import cn from 'classnames';

/**
 * Renders the NavLinks Component
 *
 * @author  John Robert McCann
 * @since   08/27/2022
 * @version 1.0.0
 * @param  {object}   props              The component as props.
 * @param  {object}   props.user         The user information from Redux.
 * @param  {Function} props.handleLogOut Function to handle log out.
 * @param  {string}   props.className    Optional className for the provided <ul/>.
 * @return {Element}                     The NavLinks component.
 */
export default function NavLinks({ user, handleLogOut, className }) {
  return (
    <ul className={className ? className : styles.list}>
      {LINKS.map((link, i) => {
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
          <li className={styles.link} key={i}>
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
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

NavLinks.defaultProps = {
  className: null,
};
