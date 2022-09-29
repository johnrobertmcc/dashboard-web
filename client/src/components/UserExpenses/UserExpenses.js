import styles from './UserExpenses.module.css';
import SectionHeading from 'components/utils/SectionHeading';
import Loading from 'components/utils/Loading';
import { PropTypes } from 'prop-types';
import dayjs from 'dayjs';
import { Container } from 'layout';

/**
 * Renders a component that allows the user to see their transactions.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {Array}   items  The user's expenses from the reducer.
 * @return {Element}        The UserExpenses component.
 */
export default function UserExpenses({ items }) {
  return (
    <Container>
      <SectionHeading message="Current Expenses" />
      {items?.budget ? (
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
            {items?.budget.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{dayjs(item?.date).format('YYYY-MM-DD')}</td>
                  <td>{item?.item || '-'}</td>
                  <td>{item?.amount?.$numberDecimal || '-'}</td>
                  <td>{item?.event || '-'}</td>
                  <td>{item?.tag || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

UserExpenses.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

UserExpenses.propDoc = {
  items: 'The budget items from the reducer, fulfilled in <Dashboard />.',
};
