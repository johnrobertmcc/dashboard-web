import dayjs from 'dayjs';

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
export function settleDate(year, month) {
  const dateString = `${year}-${
    month < 9 ? `0${month + 1}` : `${month + 1}`
  }-01`;
  const numDays = dayjs(dateString).daysInMonth();
  const startOfMonth = dayjs(dateString).startOf('month').day();
  return { numDays, startOfMonth };
}

/**
 * Function used to structure the budget data as an object and by date.
 *
 * @author  John Robert McCann
 * @since   8/25/2022
 * @version 1.0.0
 *
 * @param {object} obj The budget returned from MongoDB.
 */
export function handleBudgetItems(obj) {
  const { budget = [] } = obj;
  let fin = {};

  budget.map((item) => {
    const formattedDate = dayjs(item?.date).format('YYYY-MM-DD');

    if (fin[formattedDate]) {
      fin[formattedDate].push(item);
    } else {
      fin[formattedDate] = [item];
    }
  });

  return fin;
}

/**
 * Function used to create the correct date string based on the current date.
 */
export function createDateString(year, month, dateNum) {
  return `${year}-${month < 9 ? `0${month + 1}` : `${month + 1}`}-${
    dateNum <= 9 ? '0' + dateNum : dateNum
  }`;
}
