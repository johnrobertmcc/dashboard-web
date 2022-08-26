export const defaultState = {
  amount: 0,
  event: '',
  tag: '',
  item: '',
  date: new Date().toLocaleDateString(),
};

/**
 * Manually add data with an array. Eventually to be parse bank statements.
 *
 * @param {Array} items An array of JSON structured as:
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
