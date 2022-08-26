import styles from './Calendar.module.scss';
import Loading from 'components/utils/Loading';
import PropTypes from 'prop-types';
import { Container } from 'layout';
import dayjs from 'dayjs';
import { useState, useEffect, useRef, useMemo } from 'react';
import CalendarHeading from 'components/Calendar/CalendarHeading';
import { CalendarData } from './CalendarData';
import CalendarBody from './CalendarBody';
import { LOADING_DELAY } from 'constants';
import SectionHeading from 'components/utils/PageHeading';
import { itemProps } from './Calendar.PropTypes';
import { useCalendarContext } from './CalendarData/CalendarData';
var localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);

/**
 * Renders a calendar view to see a User's expenses by date in a GUI.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {Array}   items  The items from the reducer.
 * @param  {Element} loader The Loader to use, defaulted to a spinner.
 * @return {Element}        The Calendar component.
 */
export default function Calendar({ items, loader }) {
  const [loading, setLoading] = useState(true);
  const months = useMemo(() => dayjs.months(), [dayjs.locale()]);
  const weeks = useMemo(() => dayjs.weekdaysShort(), [dayjs.locale()]);
  const [date, setDate] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });

  const { month, year } = date;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current && items) {
      isMounted.current = true;
      setTimeout(() => {
        setLoading(false);
      }, LOADING_DELAY);
    }
  }, []);

  /**
   * Function used to increase or decrease the year and month.
   *
   * @param {string} direction Declares 'next' or 'prev' for button handler.
   */
  function handleClick(direction = 'next') {
    let newMonth = month;
    let newYear = year;
    if (direction === 'next') {
      if (month === 11) {
        newYear += 1;
      }
      newMonth = newMonth === 11 ? 0 : (newMonth += 1);
    } else {
      if (month === 0) {
        newYear -= 1;
      }
      newMonth = newMonth === 0 ? 11 : (newMonth -= 1);
    }
    setLoading(true);
    setDate({ month: newMonth, year: newYear });

    if (year) {
      setTimeout(() => setLoading(false), LOADING_DELAY);
    }
  }

  return (
    <Container tag="section" className={styles.calendarSection}>
      <div className={styles.buttonContainer}>
        <button onClick={() => handleClick('prev')}>prev</button>
        <SectionHeading tag="h3" message={`${months[month]} ${year}`} />
        <button onClick={() => handleClick('next')}>next</button>
      </div>
      {loading || !isMounted.current ? (
        loader
      ) : (
        <CalendarData>
          <Container tag="div" className={styles.tableWrap} key={month}>
            <div>
              <table className={styles.tableCal}>
                <CalendarHeading data={weeks} />
                <CalendarBody data={items} date={date} />
              </table>
            </div>
          </Container>
        </CalendarData>
      )}
    </Container>
  );
}

Calendar.propTypes = {
  items: PropTypes.objectOf(itemProps),
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Calendar.propDoc = {
  items: 'The budget items from the reducer, fulfilled in <Dashboard />.',
  loader: 'The element or string to use during loading state.',
};

Calendar.defaultProps = {
  items: null,
  loader: <Loading />,
};
