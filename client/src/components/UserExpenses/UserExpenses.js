import PropTypes from 'prop-types';
import styles from './UserExpenses.module.css';
import { Fragment } from 'react';
import SectionHeading from 'components/utils/SectionHeading';
import { useSelector } from 'react-redux';
/**
 * Renders a component that allows the user to see their transactions.
 *
 * @return {Element} The UserExpenses component.
 */
export default function UserExpenses({ component }) {
  const { items } = useSelector((state) => {
    return state.budget;
  });

  return (
    <Fragment>
      <SectionHeading message="Current Expenses" />
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
    </Fragment>
  );
}
UserExpenses.propTypes = {
  component: PropTypes.string,
};
UserExpenses.defaultProps = {
  component: 'UserExpenses',
};
