import styles from './AddRecurringExpenses.module.scss';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'layout';
import SectionHeading from 'components/utils/SectionHeading';
import {
  CONFIRMED_RECURRING,
  DEFAULT_STATE,
  structureData,
  createRecurringExpense,
} from './AddRecurringExpense.utils';
import { createElement } from 'react';
import { TAG_MAPPING } from 'constants';
import { publishItem, uploadItems } from 'features/budget/budgetSlice.js';
/**
 * Renders the AddRecurringExpenses Component
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}     The AddRecurringExpenses component.
 */
export default function AddRecurringExpenses() {
  const [data, setData] = useState(DEFAULT_STATE);
  const { tags } = useSettingsContext();
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const { recurring = {}, months = null } = data;
    const { value = 'no' } = recurring;

    if (value === 'yes' && !months) {
      setData((prev) => ({ ...prev, months: CONFIRMED_RECURRING }));
    } else if (value === 'no' && months) {
      setData((prev) => {
        const newData = Object.assign({}, prev);
        delete newData.months;

        return newData;
      });
    }
  }, [data]);

  /**
   * Function used to update the input with user information.
   *
   * @author John Robert McCann
   * @since 6/26/2022
   * @param {Event} e  The user event.
   */
  function handleChange(e) {
    e.preventDefault();
    const { value, name } = e?.target;
    setData((prev) => ({
      ...prev,
      [name]: { ...prev?.[name], value },
    }));
  }

  /**
   * Function used submit a budget item to the database.
   *
   * @author John Robert McCann
   * @since 6/27/2022
   * @param {Event} e  The user event.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    const { months = null } = data;
    const publishableData = structureData(data);

    if (months) {
      const monthData = createRecurringExpense(months?.value, publishableData);
      dispatch(uploadItems({ id: user?._id, data: monthData }));
    } else {
      dispatch(publishItem(publishableData));
    }
    setData(DEFAULT_STATE);
  }

  return (
    <Container>
      <SectionHeading message="Add Expense" />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {Object.values(data)?.map((input, i) => {
          const { name, value, type, options = null, tag = 'input' } = input;

          return createElement(TAG_MAPPING[tag], {
            key: i,
            id: name,
            name,
            value,
            placeHolder: name,
            type: type,
            options: options || tags,
            callBack: (e) => handleChange(e),
          });
        })}
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </Container>
  );
}
