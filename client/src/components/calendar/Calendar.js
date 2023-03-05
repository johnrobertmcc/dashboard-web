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
    tableRef,
  } = useCalendarContext();
  const { month, year } = date;
  const isMounted = useRef(false);
  const prevBtn = useRef();
  const nextBtn = useRef();
  const accessibleHeading = `${months[month]} ${year}`;

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setTimeout(() => {
        setLoading(false);
      }, LOADING_DELAY);
    }
  }, [LOADING_DELAY, setLoading]);

  return (
    <Container tag="section" className={styles.calendarSection}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleClick('prev')}
          ref={prevBtn}
          aria-label="Previous Month"
        >
          {months[month - 1 >= 0 ? month - 1 : 11]}
        </button>
        <SectionHeading
          tag="h3"
          message={accessibleHeading}
          id="tableHeading"
        />
        <button
          onClick={() => handleClick('next')}
          ref={nextBtn}
          aria-label="Next Month"
        >
          {months[(month + 1) % 12]}
        </button>
      </div>
      {loading || !isMounted.current ? (
        loader
      ) : (
        <ResponsiveTable tableKey={month}>
          <table
            className={styles.tableCal}
            ref={tableRef}
            tabIndex={0}
            aria-labelledby="tableHeading"
          >
            <CalendarHeading />
            <CalendarBody prevBtn={prevBtn} nextBtn={nextBtn} />
          </table>
        </ResponsiveTable>
      )}
    </Container>
  );
}
