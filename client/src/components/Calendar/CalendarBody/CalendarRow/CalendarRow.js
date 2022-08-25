import PropTypes from 'prop-types';
import styles from './CalendarRow.module.css';
import CalendarDate from '../CalendarDate';
import { itemProps } from 'components/Calendar/Calendar.PropTypes';

/**
 * Renders the rows of the calendar containing specified data.
 *
 * @param  {object}   props         The component as props.
 * @param  {number}   props.start   Number [0-6] declaring the start of the month.
 * @param  {object}   props.data    The data fetched from MongoDB through Redux.
 * @param  {number}   props.row     The current week of the month.
 * @param  {number}   props.numDays The number of days in the month.
 *
 * @returns {Element}               The CalendarRow component.
 */
export default function CalendarRow({ start, data, row, numDays, date }) {
  const { year, month } = date;
  return (
    <tr key={numDays} className={styles.tableRow}>
      {Array(7)
        .fill()
        .map((_, i) => {
          const dateNum = row === 0 ? i + 1 - start : i + 1 - start + 7 * row;
          const dateString = `${year}-${
            month < 9 ? `0${month + 1}` : `${month + 1}`
          }-${dateNum}`;

          let dateProps = { data: null, dateNum, key: i };
          if (dateNum > numDays) {
            dateProps.dateNum = null;
          }
          if (row === 0 && i < start) {
            dateProps.dateNum = null;
          }

          if (data?.[dateString]) {
            dateProps.data = data?.[dateString];
          }

          return <CalendarDate {...dateProps} />;
        })}
    </tr>
  );
}
CalendarRow.propTypes = {
  start: PropTypes.number,
  data: PropTypes.oneOfType([itemProps, PropTypes.object]),
  row: PropTypes.number,
  numDays: PropTypes.number,
};
