import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { itemProps } from '../Calendar.PropTypes';
import CalendarRow from './CalendarRow';
import dayjs from 'dayjs';
import { useCalendarContext } from 'context/CalendarData';

/**
 * Renders the body of the calendar to both separate concerns by date and classify by item tag.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @return {Element}   The CalendarBody component.
 */
export default function CalendarBody() {
  const [cells, setCells] = useState([]);
  const { items, date, numDays, startOfMonth } = useCalendarContext();
  const { year = null, month = null } = date;

  useEffect(() => {
    setCells(() => declareRows());
  }, [year, month, date]);

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
          data={items?.data}
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
