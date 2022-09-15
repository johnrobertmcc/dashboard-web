/**
 * Function to watch for keypress event and fire a callback.
 *
 * @author  John Robert McCann
 * @since   08/27/2022
 * @version 1.0.0
 * @param  {Event}    e            The keyboard event.
 * @param  {string}   key          The key to check.
 * @param  {Function} dataCallback Callback to perform on acceptance criteria.
 * @return {Function}              Returns a callback prodecure.
 */
export function accessibleKey(e, key, dataCallback) {
  if (e.key === key) {
    return () => dataCallback();
  }
}
