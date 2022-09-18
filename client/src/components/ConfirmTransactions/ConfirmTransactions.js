import React, { useState, useEffect, useRef } from 'react';
import ResponsiveTable from 'components/utils/ResponsiveTable';
import PropTypes from 'prop-types';
import styles from './ConfirmTransactions.module.scss';
import { useDispatch } from 'react-redux';
import { publishItem } from 'features/budget/budgetSlice.js';
import Loading from 'components/utils/Loading';
import { LOADING_DELAY } from 'constants';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import {
  CONFIRMATION_MESSAGE,
  ERROR_MESSAGE,
} from './ConfirmTransactions.utils';

/**
 * Renders a list of transactions to confirm before submition to MongoDB.
 *
 * @author  John Robert McCann
 * @since   09/15/2022
 * @version 1.0.0
 * @param   {object}  props           The component destructured as props.
 * @param   {object}  props.data      The data uploaded from .csv format.
 * @param   {object}  props.structure The data keys confirmed from <ConfirmData />.
 * @return  {Element}                 The ConfirmTransactions component.
 */
export default function ConfirmTransactions({ data, structure }) {
  const [confirmedData, setConfirmedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(null);
  const dispatch = useDispatch();
  const { closeModal } = useSettingsContext();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    /**
     * Function used to parse string values into appropriate data fields for MongoDB.
     */
    function parseData() {
      return data
        .map((row) => {
          const {
            amount = null,
            date = '',
            event = '',
            item = '',
            tag = '',
          } = structure;

          return {
            amount: parseFloat(row?.[amount]),
            date: row?.[date] || null,
            event: row?.[event] || null,
            item: row?.[item] || null,
            tag: row?.[tag] || null,
          };
        })
        .filter((row) => row?.amount);
    }
    if (!isMounted.current) {
      isMounted.current = true;
      setConfirmedData(parseData());
      setTimeout(() => setLoading(false), LOADING_DELAY * 2);
    }
  }, []);

  /**
   * Function used to remove a data item from the state before committing to MongoDB.
   */
  function deleteItem(idx) {
    setConfirmedData((prev) => prev.filter((_, j) => j !== idx));
  }

  /**
   * Function used to commit all confirmed data objects to the database.
   */
  async function commitToDB() {
    return await Promise.all(
      confirmedData.map((data) => {
        dispatch(publishItem(data));
      })
    );
  }

  /**
   * Function used to await result of commitToDB() and set the appropriate message.
   *
   * TODO: This function will require a _lot_ of cleanup, including using insertMany()
   *       and proper usage of Promise.all().
   */
  async function cleanUp() {
    setLoading(true);
    try {
      await commitToDB().then(() =>
        setTimeout(() => {
          setMessage(CONFIRMATION_MESSAGE);
          setLoading(false);
        }, LOADING_DELAY * 2)
      );
    } catch (e) {
      setMessage(ERROR_MESSAGE);
      console.error(e);
    }
    setConfirmedData(null);
    setTimeout(() => closeModal(), LOADING_DELAY * 4);
  }

  if (loading) {
    return <Loading />;
  }

  if (message) {
    return <h3>{message}</h3>;
  }

  return (
    <ResponsiveTable>
      <button onClick={() => cleanUp()}>Commit</button>
      <table className={styles.confirmTransactions}>
        <thead>
          <tr>
            {Object.keys(structure).map((heading, i) => {
              return <th key={`heading-${heading}-${i}`}>{heading}</th>;
            })}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {confirmedData.map((row, i) => (
            <tr key={`row-${i}`}>
              <td key={`row-date-${i}`}>{row?.date}</td>
              <td key={`row-item-${i}`}>{row?.item}</td>
              <td key={`row-amount-${i}`}>{row?.amount}</td>
              <td key={`row-tag-${i}`}>{row?.tag}</td>
              <td key={`row-event-${i}`}>{row?.event}</td>
              <td key={`delete-${i}`}>
                <button onClick={() => deleteItem(i)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
}
ConfirmTransactions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  structure: PropTypes.shape({
    date: PropTypes.string,
    item: PropTypes.string,
    amount: PropTypes.string,
    tag: PropTypes.oneOf([PropTypes.string, PropTypes.instanceOf(null)]),
    event: PropTypes.oneOf([PropTypes.string, PropTypes.instanceOf(null)]),
  }),
};
