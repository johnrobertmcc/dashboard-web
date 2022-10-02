import PropTypes from 'prop-types';
import styles from './CalendarDrawerRow.module.scss';
import EditButton from 'components/utils/EditButton';
import DeleteButton from 'components/utils/DeleteButton';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editBudgetItem } from 'features/budget/budgetSlice';
import { Input } from 'components/utils';
import useKeyPress from 'functions/hooks/useKeyPress.js';
import cn from 'classnames';

/**
 * Renders the CalendarDrawerRow Component
 *
 * @param  {object}  props       The component as props.
 * @param  {string}  props.component The name of the component.
 * @return {Element}             The CalendarDrawerRow component.
 */
export default function CalendarDrawerRow({ item, fields }) {
  const [updateParams, setUpdateParams] = useState({});
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const submitPress = useKeyPress('Enter');
  const cancelPress = useKeyPress('Escape');

  useEffect(() => {
    if (updating && submitPress) {
      return handleSubmit();
    }
  }, [updating, submitPress]);

  /**
   * Function used to submit an edit through redux to MongoDB.
   *
   * @author John Robert McCann
   * @since 8/26/2022
   */
  function handleSubmit() {
    dispatch(editBudgetItem(updateParams));
    setUpdating(false);
  }

  /**
   * Function used to sitch into edit mode.
   *
   * @author John Robert McCann
   * @since 8/26/2022
   * @param {Event}  e    The HTML event.
   * @param {object} item The item as returned from MongoDb.
   */
  function handleEdit(e, item) {
    e.preventDefault();
    setUpdating(true);
    setUpdateParams({ ...item });
  }

  /**
   * Function used to handle changes to the input controls.
   *
   * @author John Robert McCann
   * @since 8/27/2022
   * @param {Event}  e    The HTML event.
   * @param {object} item The item as returned from MongoDb.
   */
  function handleChange(e) {
    setUpdateParams((prev) => {
      let value = e.target.value;
      if (e.target.name === 'amount') {
        value = { $numberDecimal: value };
      }
      return { ...prev, [e.target.name]: value };
    });
  }

  return (
    <tr
      key={item?._id}
      className={cn(styles.row, updating && styles.updating)}
      onKeyPress={(e) => e.stopPropagation()}
    >
      {updating
        ? fields?.map((field, i) => {
            return (
              <td key={i}>
                <Input
                  className={styles.editInput}
                  callBack={(e) => handleChange(e)}
                  value={
                    field === 'amount'
                      ? updateParams?.[field]?.$numberDecimal
                      : updateParams?.[field]
                  }
                  name={field}
                />
              </td>
            );
          })
        : fields?.map((field, i) => {
            if (field === 'amount') {
              return (
                <td onClick={(e, i) => handleEdit(e, item)} key={i}>
                  {parseFloat(item?.[field]?.$numberDecimal)}
                </td>
              );
            }
            return (
              <td key={i} onClick={(e, i) => handleEdit(e, item)}>
                {item?.[field]}
              </td>
            );
          })}
      <td>
        {updating ? (
          <button onClick={(e) => handleSubmit(e)} className={styles.submit}>
            Submit
          </button>
        ) : (
          <EditButton item={item} onClick={(e) => handleEdit(e, item)} />
        )}
      </td>
      <td>
        <DeleteButton item={item} />
      </td>
    </tr>
  );
}
CalendarDrawerRow.propTypes = {
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
