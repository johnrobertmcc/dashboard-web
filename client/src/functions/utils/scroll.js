/**
 * Function used to lock the scrollbar.
 *
 * @author John Robert McCann
 * @since 6/19/2022
 * @route GET /api/v1/budget.
 */
export function disableScroll() {
  !!document && document.body.classList.add('no-scroll');
}

/**
 * Function used to enable the scrollbar.
 * @author John Robert McCann
 * @since 6/19/2022
 * @route GET /api/v1/budget.
 */
export function enableScroll() {
  !!document && document.body.classList.remove('no-scroll');
}
