import PropTypes from 'prop-types';
import styles from './PageHeading.module.css';
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
 * @return {Element}               The SectionHeading component.
 */
export default function SectionHeading({ tag, message }) {
  return createElement(tag, { className: styles.pageHead }, message);
}
SectionHeading.propTypes = {
  tag: PropTypes.string,
  message: PropTypes.string,
};
SectionHeading.defaultProps = {
  tag: 'h1',
};