import ResponsiveTable from 'components/utils/ResponsiveTable';
import PropTypes from 'prop-types';
import styles from './CalendarDrawerContents.module.scss';
import { useCalendarContext } from 'context/CalendarData/CalendarData';
import CalendarDrawerRow from './CalendarDrawerRow';

/**
 * Renders the contents of the CalendarDrawer to display inside of <Drawer />.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 * @param  {object}  props            The component as props.
 * @param  {string}  props.dateString The string of the current date to display.
 * @return {Element}                  The CalendarDrawerContents component.
 */
export default function CalendarDrawerContents({ dateString }) {
  const { data } = useCalendarContext();
  const fields = ['tag', 'item', 'event', 'amount'];

  if (!data?.[dateString]) {
    return <p className={styles.empty}>No expenses yet!</p>;
  }

  return (
    <ResponsiveTable key={dateString}>
      <table className={styles.calendarDrawer} key={dateString}>
        <thead>
          <tr>
            {[...fields, 'edit', 'delete'].map((field, i) => {
              return <th key={i}>{field}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.[dateString]?.map((item, i) => {
            return (
              <CalendarDrawerRow
                item={item}
                key={i}
                dateString={dateString}
                fields={fields}
              />
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
