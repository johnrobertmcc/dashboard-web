import { useEffect, useState } from 'react';
import styles from './BudgetInfo.module.scss';
import { useCalendarContext } from 'context/CalendarData/CalendarData';
import Loading from 'components/utils/Loading';
import { LOADING } from 'constants';
import dayjs from 'dayjs';
import InfoCard from 'components/utils/InfoCard';
import delayedRender from 'functions/utils/delayedRender';
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

/**
 * Renders a card for budget information.
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}    The BUdgetInfo component.
 */
export default function BUdgetInfo() {
  const [total, setTotal] = useState(LOADING);
  const [nextExpense, setNextExpense] = useState(LOADING);
  const [nextDay, setNextDay] = useState(LOADING);
  const {
    data = null,
    date = null,
    monthTotal,
    numDays,
  } = useCalendarContext();

  /**
   * React.useEffect used to set the total of the month based on the currently selected month number.
   */
  useEffect(() => {
    /**
     * Function used to take the data and find the current month's total.
     */
    function parseByMonth() {
      const { month = 0, year = null } = date;
      const currentMonth = month + 1;
      const interpolatedMonth =
        currentMonth < 10 ? `0${currentMonth}` : currentMonth;
      const currentTotal = monthTotal?.[year]?.[interpolatedMonth] ?? 0;
      setTotal(currentTotal);
    }

    /**
     * Function used to find the next upcoming expense.
     */
    function getUpcomingExpense() {
      const today = dayjs().format('l');
      const split = today.split('/');

      for (let i = parseInt(split[1]) + 1; i < numDays; i++) {
        const year = split[2];
        const month = split[0] < 10 ? `0${split[0]}` : split[0];
        const day = i < 10 ? `0${i}` : i;
        const upcomingDays = data[`${year}-${month}-${day}`];
        if (upcomingDays) {
          const nextAmount =
            typeof upcomingDays[0].amount === 'number'
              ? upcomingDays[0].amount
              : upcomingDays[0].amount?.$numberDecimal;
          setNextExpense(nextAmount);
          setNextDay(dayjs(upcomingDays[0].date).format('l'));
          return null;
        }
      }
    }

    if (data && date) {
      parseByMonth();
      getUpcomingExpense();
    }
  }, [data, date]);

  if (!data || !date) {
    return <Loading />;
  }

  return (
    <InfoCard>
      <h3>Total Spent This Month: {delayedRender(total)}</h3>
      <h3>
        Upcoming Expense: {delayedRender(nextExpense)} on{' '}
        {delayedRender(nextDay)}
      </h3>
    </InfoCard>
  );
}
