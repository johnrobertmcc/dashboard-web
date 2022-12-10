import styles from './Calendar.module.scss';
import { Container } from 'layout';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import CalendarHeading from 'components/calendar/CalendarHeading';
import CalendarBody from './CalendarBody';
import SectionHeading from 'components/utils/PageHeading';
import ResponsiveTable from 'components/utils/ResponsiveTable';
import { useCalendarContext } from 'context/CalendarData';
var localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);

/**
 * Renders a calendar view to see a User's expenses by date in a GUI.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @return {Element}   The Calendar component.
 */
export default function Calendar() {
  const {
    date,
    handleClick,
    months,
    setLoading,
    loading,
    LOADING_DELAY,
    loader,
  } = useCalendarContext();
  const { month, year } = date;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setTimeout(() => {
        setLoading(false);
      }, LOADING_DELAY);
    }
  }, []);

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
        <ResponsiveTable tableKey={month}>
          <table className={styles.tableCal}>
            <CalendarHeading />
            <CalendarBody />
          </table>
        </ResponsiveTable>
      )}
    </Container>
  );
}
