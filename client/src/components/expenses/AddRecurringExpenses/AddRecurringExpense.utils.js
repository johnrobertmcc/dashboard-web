import dayjs from 'dayjs';
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

export const DEFAULT_STATE = {
  item: { name: 'item', value: '', type: 'text' },
  amount: { name: 'amount', value: 0.0, type: 'text' },
  date: { name: 'date', value: dayjs().format('YYYY-MM-DD'), type: 'date' },
  event: { name: 'event', value: '', type: 'text' },
  tag: { name: 'tag', value: '', type: 'select', options: null, tag: 'select' },
  recurring: {
    name: 'recurring',
    value: '',
    type: 'select',
    options: ['---Recurring expense?---', 'yes', 'no'],
    tag: 'select',
  },
};

export const CONFIRMED_RECURRING = {
  name: 'months',
  value: '',
  type: 'select',
  options: [
    '--How Many Months?--',
    ...Array.from({ length: 12 }, (_, i) => i + 1),
  ],
  tag: 'select',
};

/**
 * Manually add individual or recurring data.
 * @param {object} items An array of JSON structured as:
 *  {
 *    amount: number|string
 *    date: string,
 *    item: string,
 *    tag: string,
 *    event: string
 * }
 * @callback callBack Most apt to use dispatch(publishItem())
 */
export async function handleStaticData(items, callBack) {
  return items.map((item) => {
    callBack(item);
  });
}

const PUBLISHABLE_ITEMS = {
  amount: true,
  item: true,
  date: true,
  tag: true,
  event: true,
};

const ITEM_FORMAT = {
  amount: (amount) => parseFloat(amount),
  item: null,
  date: (date) => dayjs(date).format('l'),
  tag: null,
  event: null,
};

/**
 * Function used to structure data to publish.
 *
 * @param   {object} data The data from state values.
 * @returns {object}      The data as a publishable item.
 */
export function structureData(data) {
  if (!data) {
    return null;
  }

  let fin = {};
  Object.values(data).forEach((datum) => {
    const { name, value = '' } = datum;

    if (PUBLISHABLE_ITEMS[name]) {
      const parsedValue = ITEM_FORMAT?.[name]
        ? ITEM_FORMAT[name](value)
        : value;
      fin[name] = parsedValue;
    }
  });

  return fin;
}

/**
 * Function used to publish multiple items x amount of months.
 *
 * @param   {number} months The amount of months to publish.
 * @param   {object} data The data from state values.
 * @returns {Array}         Returns an array of publishable data.
 */
export function createRecurringExpense(months, data) {
  let fin = [data];
  const month = dayjs(data?.date);

  for (let i = 1; i < months; i++) {
    const newMonth = month.add(i, 'month');
    const newData = Object.assign({}, data);
    newData.date = newMonth.format('l');
    fin.push(newData);
  }

  return fin;
}
