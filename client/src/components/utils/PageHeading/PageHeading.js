import PropTypes from 'prop-types';
import styles from './PageHeading.module.scss';
import { createElement } from 'react';

/**
 * Renders a heading for a page in the app.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props         The component as props.
 * @param  {string}  props.tag     The proper html semantic tag.
 * @param  {string}  props.message The message to display.
 * @param  {string}  props.id      The heading id for aria-labelledby..
 * @return {Element}               The SectionHeading component.
 */
export default function SectionHeading({ tag, message, id }) {
  return createElement(
    tag,
    { className: styles.pageHead, id, 'aria-label': message },
    message
  );
}
SectionHeading.propTypes = {
  tag: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
SectionHeading.defaultProps = {
  tag: 'h2',
  id: null,
};
