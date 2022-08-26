import PropTypes from 'prop-types';
import styles from './CalendarRow.module.scss';
import CalendarDate from '../CalendarDate';
import { useCalendarContext } from 'context/CalendarData';

/**
 * Renders the rows of the calendar containing specified data.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @param  {object}   props         The component as props.
 * @param  {number}   props.row     The current week of the month .
 * @returns {Element}               The CalendarRow component.
 */
export default function CalendarRow({ row }) {
  const { numDays, startOfMonth } = useCalendarContext();
  return (
    <tr key={numDays} className={styles.tableRow}>
      {Array(7)
        .fill()
        .map((_, i) => {
          const dateNum =
            row === 0 ? i + 1 - startOfMonth : i + 1 - startOfMonth + 7 * row;

          let dateProps = { dateNum, key: i };
          if (dateNum > numDays) {
            dateProps.dateNum = null;
          }
          if ((row === 0 && i < startOfMonth) || dateNum > numDays) {
            dateProps.dateNum = null;
          }

          return <CalendarDate {...dateProps} />;
        })}
    </tr>
  );
}
CalendarRow.propTypes = {
  row: PropTypes.number,
};
