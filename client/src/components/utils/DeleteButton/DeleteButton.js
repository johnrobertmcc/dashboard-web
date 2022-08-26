import PropTypes from 'prop-types';
import styles from './DeleteButton.module.scss';
import { useDispatch } from 'react-redux';
import { deleteGoal } from 'features/budget/budgetSlice';

/**
 * Function used to take in an object and send a DELETE request to MongoDB.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props       The component as props.
 * @param  {object}  props.item  The item to request to delete.
 * @return {Element}             The DeleteButton component.
 */
export default function DeleteButton({ item }) {
  const dispatch = useDispatch();
  /**
   * Function used submit a budget item to the database.
   *
   * @author John Robert McCann
   * @since 8/26/2022
   * @version 1.0.0
   * @param {Event} e  The user event.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteGoal(item?._id));
  }

  console.log('jr item', item);
  return <button onClick={(e) => handleSubmit(e)}>delete</button>;
}
DeleteButton.propTypes = {
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
DeleteButton.defaultProps = {
  item: {},
};
