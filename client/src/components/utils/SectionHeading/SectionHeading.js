import PropTypes from 'prop-types';
import styles from './SectionHeading.module.css';
import { createElement } from 'react';

/**
 * Renders a heading for a section of the app.
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props         The component as props.
 * @param  {string}  props.tag     The proper html semantic tag.
 * @param  {string}  props.message The message to display.
 * @param  {string}  props.id      The id for aria-labelledby.
 * @return {Element}               The SectionHeading component.
 */
export default function SectionHeading({ tag, message, id }) {
  return createElement(
    tag,
    { className: styles.subHead, 'aria-label': message, id },
    message
  );
}
SectionHeading.propTypes = {
  tag: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.string,
};
SectionHeading.defaultProps = {
  tag: 'h2',
};
