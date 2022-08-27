import PropTypes from 'prop-types';
import styles from './EditButton.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBudgetItem } from 'features/budget/budgetSlice';

/**
 * Function used to take in an object and send a PUT request to MongoDB.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 * @param  {object}  props              The component as props.
 * @param  {object}  props.updateParams The item to request to edit.
 * @return {Element}                    The EditButton component.
 */
export default function EditButton({ updateParams }) {
  const dispatch = useDispatch();

  function handleEdit(e) {
    e.preventDefault();
    dispatch(editBudgetItem(updateParams));
  }
  return <button onClick={(e) => handleEdit(e)}>edit</button>;
}
EditButton.propTypes = {
  updateParams: PropTypes.shape({
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
