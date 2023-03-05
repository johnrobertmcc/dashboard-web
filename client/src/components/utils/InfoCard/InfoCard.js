import PropTypes from 'prop-types';
import styles from './InfoCard.module.scss';
import { Container } from 'layout';

/**
 * Renders an agnostic card component to handle static styling among seperate children.
 *
 * @author  John Robert McCann
 * @since   10/01/2022
 * @version 1.0.0
 * @param   {object}  props           The component destructured as props.
 * @param   {object}  props.children  The individual cards.
 * @param   {string}  props.role       The supplied aria role.
 * @return  {Element}                 The InfoCard component.
 */
export default function InfoCard({ children, role }) {
  return (
    <Container tag="li" className={styles.userInfoWrapper} options={{ role }}>
      {children}
    </Container>
  );
}
InfoCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  role: PropTypes.string,
};

InfoCard.defaultProps = {
  role: 'dialog',
};
