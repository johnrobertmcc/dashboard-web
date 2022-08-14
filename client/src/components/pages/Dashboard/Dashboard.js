import styles from './Dashboard.module.css';
import { useEffect, useState, useRef } from 'react';
import { getBudget, publishItem } from 'features/budget/budgetSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'components/utils';
import Loading from 'components/utils/Loading';

/**
 * Renders the default view "/" to display the user's information.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}  The Dashboard view.
 */
export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { items } = useSelector((state) => {
    return state.budget;
  });
  const defaultState = {
    amount: 0,
    event: '',
    tag: '',
    item: '',
    date: new Date().toLocaleDateString(),
  };
  const [data, setData] = useState(defaultState);

  useEffect(() => {
    dispatch(getBudget());
  }, [user]);

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
    <section>
      {user && items && items?.budget ? (
        <>
          <h1>Welcome {user && user?.name}</h1>
          <h2 className={styles.subHead}>Current Expenses</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Event</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              {items.budget.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{new Date(item?.date).toLocaleDateString()}</td>
                    <td>{item?.item || '-'}</td>
                    <td>{item?.amount?.$numberDecimal || '-'}</td>
                    <td>{item?.event || '-'}</td>
                    <td>{item?.tag || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2 className={styles.subHead}>Add Expense</h2>
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
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
