import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
/**
 * Renders the Modal Component
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props       The component as props.
 * @param  {Array}   props.data  An array of data items to render.
 * @return {Element}             The Modal component.
 */
export default function Modal({ data }) {
  return (
    <dialog open className={styles.modal}>
      {data?.map((item) => (
        <li>{item?.item}</li>
      ))}
    </dialog>
  );
}
Modal.propTypes = {
  component: PropTypes.string,
};
Modal.defaultProps = {
  component: 'Modal',
};
