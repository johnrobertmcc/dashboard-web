import PropTypes from 'prop-types';
import { itemProps } from '../Calendar.PropTypes';
import CalendarRow from './CalendarRow';
import { useCalendarContext } from 'context/CalendarData';

/**
 * Renders the body of the calendar to both separate concerns by date and classify by item tag.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @return {Element}   The CalendarBody component.
 */
export default function CalendarBody() {
  const { numDays, startOfMonth } = useCalendarContext();
  const full = numDays + startOfMonth;

  return (
    <tbody>
      {Array(Math.ceil(full / 7))
        .fill()
        .map((_, i) => (
          <CalendarRow key={i} row={i} />
        ))}
    </tbody>
  );
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
