import Drawer from 'components/utils/Drawer';
import PropTypes from 'prop-types';
import { createContext, useContext, useState, useMemo } from 'react';
import { disableScroll, enableScroll } from 'functions/utils/scroll.js';
import CalendarDrawerContents from 'components/Calendar/CalendarDrawerContents';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import Calendar from 'components/Calendar';
import { LOADING_DELAY } from 'constants';
import Loading from 'components/utils/Loading';
import { useEffect } from 'react';
import { getBudget, reset } from 'features/budget/budgetSlice.js';

// Initialize context object.
const CalendarModal = createContext();

/**
 * Export useContext Hook to call on any Calendar component.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @return {Function} Calendar context exported.
 */
export function useCalendarContext() {
  return useContext(CalendarModal);
}

/**
 * Provide context for calendar components.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {Element|string} loader Customizable loader, defaulted to spinner.
 * @return {Element}               The Calendar context wrapper.
 */
export default function CalendarData({ loader }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => {
    return state?.budget;
  });

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const months = useMemo(() => dayjs.months(), [dayjs.locale()]);
  const weeks = useMemo(() => dayjs.weekdaysShort(), [dayjs.locale()]);
  const { numDays, startOfMonth } = settleDate(date?.year, date?.month);

  useEffect(() => {
    dispatch(getBudget());
  }, [dispatch]);

  /**
   * Function used to open the modal and set the modal data.
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   *
   * @param {object} dataString  The datestring of the selected date.
   */
  function openModal(dateString) {
    const modalStruc = {
      title: `Expenses for ${dateString}`,
      children: (
        <CalendarDrawerContents items={items?.data?.[dateString] || null} />
      ),
    };
    setOpen(true);
    setModalData(modalStruc);
    disableScroll();
  }

  /**
   * Function used to open the modal and set the modal data.
   * @author  John Robert McCann
   * @since   8/26/2022
   * @version 1.0.0
   */
  function closeModal() {
    setOpen(false);
    enableScroll();
  }

  /**
   * Function used to increase or decrease the year and month.
   *
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

  /**
   * Function used to return the appropriate date as a string value.
   *
   * @author  John Robert McCann
   * @since   8/25/2022
   * @version 1.0.0
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

  const value = {
    openModal,
    dispatch,
    items,
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
  };

  return (
    <CalendarModal.Provider value={value}>
      <Calendar />
      {modalData && (
        <Drawer data={modalData} open={open} closeModal={closeModal} />
      )}
    </CalendarModal.Provider>
  );
}

CalendarData.propTypes = {
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

CalendarData.defaultProps = {
  loader: <Loading />,
};
