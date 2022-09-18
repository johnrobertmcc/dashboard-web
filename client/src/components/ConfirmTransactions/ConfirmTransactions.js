import React, { useState } from 'react';
import ResponsiveTable from 'components/utils/ResponsiveTable';
import PropTypes from 'prop-types';
import styles from './ConfirmTransactions.module.scss';
import { useDispatch } from 'react-redux';
import { publishItem } from 'features/budget/budgetSlice.js';

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
  const [confirmedData, setConfirmedData] = useState(data);
  const dispatch = useDispatch();

  /**
   * Function used to remove a data item from the state before committing to MongoDB.
   */
  function deleteItem(idx) {
    setConfirmedData((prev) => prev.filter((_, j) => j !== idx));
  }

  /**
   * Function used to commit all confirmed data objects to the database.
   */
  function commitToDB() {
    return confirmedData.map((data) => dispatch(publishItem(data)));
  }

  return (
    <ResponsiveTable>
      <button onClick={() => commitToDB()}>Commit</button>
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
              <td key={row?.[structure?.date]}>{row[structure.date]}</td>
              <td key={row?.[structure?.item]}>{row[structure.item]}</td>
              <td key={row?.[structure?.amount]}>{row[structure.amount]}</td>
              <td key={row?.[structure?.tag]}>{row[structure.tag]}</td>
              <td key={row?.[structure?.event]}>{row[structure.event]}</td>
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
