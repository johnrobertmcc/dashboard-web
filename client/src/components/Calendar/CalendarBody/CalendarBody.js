import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { itemProps } from '../Calendar.PropTypes';
import CalendarRow from './CalendarRow';
import styles from './CalendarBody.module.css';
import dayjs from 'dayjs';
import { useCalendarContext } from '../CalendarData';

/**
 * Renders the body of the calendar to both separate concerns by date and classify by item tag.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props       The component as props.
 * @param  {string}  props.data  The data to render on each cell.
 * @param  {object}  props.date  The date of which to lookup data.
 * @return {Element}             The CalendarBody component.
 */
export default function CalendarBody({ data, date }) {
  const { year, month } = date;
  const { numDays, startOfMonth } = settleDate(year, month);
  const [cells, setCells] = useState([]);

  const { test } = useCalendarContext();

  console.log('jr test', test);

  useEffect(() => {
    setCells(() => declareRows());
  }, [year, month, data, date]);

  /**
   * Function used to determine how many weeks per month and render the appropriate number of CalendarRow elements.
   *
   * @returns {Array} Returns a matrix of <tr/> elements based on length of month.
   */
  function declareRows() {
    const full = numDays + startOfMonth;
    return Array(Math.ceil(full / 7))
      .fill()
      .map((_, i) => (
        <CalendarRow
          key={i}
          start={startOfMonth}
          data={data}
          row={i}
          numDays={numDays}
          date={date}
        />
      ));
  }

  return <tbody>{cells}</tbody>;
}

CalendarBody.propTypes = {
  data: PropTypes.oneOfType([itemProps, PropTypes.object]),
  date: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
  }),
};

CalendarBody.defaultProps = {
  data: {},
  date: {},
};

/**
 * Function used to return the appropriate date as a string value.
 *
 * @param {number|string} year  The year to interpret
 * @param {number|string} month The month to mod by 12 and 10.
 *
 * @returns {string}  Returns the string of which the data will be queued under.
 */
function settleDate(year, month) {
  const dateString = `${year}-${
    month < 9 ? `0${month + 1}` : `${month + 1}`
  }-01`;
  const numDays = dayjs(dateString).daysInMonth();
  const startOfMonth = dayjs(dateString).startOf('month').day();
  return { numDays, startOfMonth };
}
