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
 * @return  {Element}                 The InfoCard component.
 */
export default function InfoCard({ children }) {
  return (
    <Container tag="li" className={styles.userInfoWrapper}>
      {children}
    </Container>
  );
}
InfoCard.propTypes = {
  children: PropTypes.object,
};
