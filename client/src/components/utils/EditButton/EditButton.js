import PropTypes from 'prop-types';
import styles from './EditButton.module.scss';
/**
 * Function used to take in an object and send a PATCH request to MongoDB.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props       The component as props.
 * @param  {object}  props.item  The item to request to edit.
 * @return {Element}             The EditButton component.
 */
export default function EditButton({ item }) {
  return (
    <button onClick={() => console.log('jr edit item', item)}>edit</button>
  );
}
EditButton.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    item: PropTypes.string,
    event: PropTypes.string,
    amount: PropTypes.shape({
      $numberDecimal: PropTypes.string,
    }),
    date: PropTypes.string,
    tag: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    __v: PropTypes.number,
  }),
};
EditButton.defaultProps = {
  item: {},
};
