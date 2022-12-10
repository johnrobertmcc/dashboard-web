import dayjs from 'dayjs';

/**
 * Function used to return the appropriate date as a string value.
 *
 * @author  John Robert McCann
 * @since   8/25/2022
 * @version 1.0.0
 * @param {number|string} year  The year to interpret
 * @param {number|string} month The month to mod by 12 and 10.
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
 * @param   {object} obj The budget returned from MongoDB.
 * @returns {object}     Returns the budget items structured.
 */
export function handleBudgetItems(obj) {
  const { budget = [] } = obj;
  let fin = {};

  budget.forEach((item) => {
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
 *
 * @author  John Robert McCann
 * @since   8/25/2022
 * @version 1.0.0
 * @param   {string} year    The year to record.
 * @param   {string} month   The month to record.
 * @param   {string} dateNum The date 1-31.
 * @returns {object}         Returns the budget items structured.
 */
export function createDateString(year, month, dateNum) {
  return `${year}-${month < 9 ? `0${month + 1}` : `${month + 1}`}-${
    dateNum <= 9 ? '0' + dateNum : dateNum
  }`;
}

/**
 * DEPRECATED - LOGIC MOVED INTO MONGO QUERY
 * Function used to seperate the data by month and year.
 *
 * @author  John Robert McCann
 * @since   10/01/2022
 * @version 1.0.0
 * @param   {object} data The data structure from MongoDB.
 * @returns {object}      Returns an object structured: {<year>: {<month>: <num> } }
 */
export function seperateTotalsByMonth(data) {
  if (!Object.keys(data).length) {
    return null;
  }
  let totals = {};

  Object.keys(data).forEach((date) => {
    const options = date.split('-');
    const { [options?.[0]]: year = {} } = totals;
    const prevAmount = totals?.[options[0]]?.[options[1]] ?? 0.0;
    totals[options[0]] = {
      ...year,
      [options?.[1]]: prevAmount + findAllAmountsInDay(data[date]),
    };
  });

  return totals;
}

/**
 * Function used to sum up the total amounts of each day.
 *
 * @author  John Robert McCann
 * @since   10/01/2022
 * @version 1.0.0
 * @param   {Array}  array The amounts of each item from this particular day.
 * @returns {number}       Returns the sum of one particular day's expenses.
 */
function findAllAmountsInDay(array) {
  let sum = 0;
  array.forEach((item) => {
    const parsedAmount =
      typeof item?.amount === 'number'
        ? item?.amount
        : item?.amount?.$numberDecimal;
    sum += parseFloat(parsedAmount);
  });
  return sum;
}
