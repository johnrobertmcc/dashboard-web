import { disableScroll, enableScroll } from 'functions/utils/scroll.js';

/**
 * Function used to open the drawer and set the required data.
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @callback callBack Function used to set and render appropriate data.
 */
export function openDrawer(callBack) {
  disableScroll();
  callBack();
}

/**
 * Function used to open the drawer and reset the calendar data.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 */
export function closeDrawer(callBack) {
  enableScroll();
  callBack();
}
