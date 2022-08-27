import styles from './AddExpense.module.css';
import { Input } from 'components/utils';
import { publishItem } from 'features/budget/budgetSlice.js';
import { useState } from 'react';
import { defaultState } from './AddExpense.utils.js';
import { useDispatch } from 'react-redux';
import { Container } from 'layout';
import SectionHeading from 'components/utils/SectionHeading';
/**
 * Renders a form which allows a user to add a new expense.
 *
 * @return {Element}               The AddExpense component.
 */
export default function AddExpense() {
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultState);

  /**
   * Function used to update the input with user information.
   *
   * @author John Robert McCann
   * @since 6/26/2022
   * @param {Event} e  The user event.
   */
  function handleChange(e) {
    e.preventDefault();
    setData((prev) => ({
      ...prev,
      [e.target.name]: e?.target?.value,
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
    setData(defaultState);
    dispatch(publishItem(data));
  }

  return (
    <Container>
      <SectionHeading message="Add Expense" />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {Object.keys(data).map((input, i) => {
          return (
            <Input
              key={i}
              id={input}
              name={input}
              value={data[input]}
              placeHolder={input}
              callBack={(e) => handleChange(e)}
            />
          );
        })}
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </Container>
  );
}
