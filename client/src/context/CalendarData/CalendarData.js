import Drawer from 'components/utils/Drawer';
import PropTypes from 'prop-types';
import { useEffect, createContext, useContext, useState, useMemo } from 'react';
import { disableScroll, enableScroll } from 'functions/utils/scroll.js';
import CalendarDrawerContents from 'components/Calendar/CalendarDrawerContents';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Calendar from 'components/Calendar';
import { LOADING_DELAY } from 'constants';
import Loading from 'components/utils/Loading';
import { handleBudgetItems, settleDate } from './CalendarData.utils.js';

// Initialize context object.
const CalendarProvider = createContext();

/**
 * Export useContext Hook to call on any Calendar component.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @return {Function} Calendar context exported.
 */
export function useCalendarContext() {
  return useContext(CalendarProvider);
}

/**
 * Provide context for calendar components.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @param  {Element|string} loader Customizable loader, defaulted to spinner.
 * @return {Element}               The Calendar context wrapper.
 */
export default function CalendarData({ loader }) {
  const [open, setOpen] = useState(false);
  const [dayData, setDayData] = useState({});

  const {
    items = null,
    isLoading,
    isSuccess,
  } = useSelector((state) => {
    return state?.budget;
  });

  const [loading, setLoading] = useState(isLoading);
  const [date, setDate] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });

  const months = useMemo(() => dayjs.months(), [dayjs.locale()]);
  const weeks = useMemo(() => dayjs.weekdaysShort(), [dayjs.locale()]);
  const { numDays, startOfMonth } = settleDate(date?.year, date?.month);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!isLoading && isSuccess && items) {
      setData(handleBudgetItems(items));
    }
  }, [isLoading, isSuccess, items]);

  /**
   * Function used to open the drawer and set the calendar data.
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   * @param {object} dataString  The datestring of the selected date.
   */
  function openDrawer(dateString) {
    const modalStruc = {
      title: `Expenses for ${dateString}`,
      children: (
        <CalendarDrawerContents key={dateString} dateString={dateString} />
      ),
    };
    setOpen(true);
    setDayData(modalStruc);
    disableScroll();
  }

  /**
   * Function used to open the drawer and reset the calendar data.
   *
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   */
  function closeDrawer() {
    setOpen(false);
    enableScroll();
  }

  /**
   * Function used to increase or decrease the year and month.
   *
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   * @param {string} direction Declares 'next' or 'prev' for button handler.
   */
  function handleClick(direction = 'next') {
    const { month, year } = date;
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

  const value = {
    openDrawer,
    items,
    data,
    date,
    setDate,
    months,
    weeks,
    handleClick,
    loading,
    setLoading,
    LOADING_DELAY,
    numDays,
    startOfMonth,
    settleDate,
    loader,
    dayData,
    closeDrawer,
    open,
  };

  return (
    <CalendarProvider.Provider value={value}>
      <Calendar />
      {dayData && (
        <Drawer data={dayData} open={open} closeDrawer={closeDrawer} />
      )}
    </CalendarProvider.Provider>
  );
}

CalendarData.propTypes = {
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

CalendarData.defaultProps = {
  loader: <Loading />,
};
