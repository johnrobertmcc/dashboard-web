import EditButton from 'components/utils/EditButton';
import ResponsiveTable from 'components/utils/ResponsiveTable';
import PropTypes from 'prop-types';
import styles from './CalendarDrawerContents.module.scss';
import DeleteButton from 'components/utils/DeleteButton';
import { useSelector } from 'react-redux';
import { useCalendarContext } from 'context/CalendarData/CalendarData';

/**
 * Renders the contents of the CalendarDrawer to display inside of <Drawer />.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props       The component as props.
 * @param  {Array}   props.items The itemized list of the day to sort.
 * @return {Element}             The CalendarDrawerContents component.
 */
export default function CalendarDrawerContents({ dateString }) {
  const { data } = useCalendarContext();

  if (!data?.[dateString]) {
    return <p>No expenses yet!</p>;
  }

  return (
    <ResponsiveTable key={dateString}>
      <table className={styles.calendarDrawer} key={dateString}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Tag</th>
            <th>Item</th>
            <th>Event</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.[dateString]?.map((item, i) => {
            return (
              <tr key={i}>
                <td>{parseFloat(item?.amount?.$numberDecimal).toFixed(2)}</td>
                <td>{item?.tag}</td>
                <td>{item?.item}</td>
                <td>{item?.event}</td>
                <td>
                  <EditButton item={item} />
                </td>
                <td>
                  <DeleteButton item={item} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ResponsiveTable>
  );
}
CalendarDrawerContents.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};
