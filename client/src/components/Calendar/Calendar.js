import PropTypes from 'prop-types';
import styles from './Calendar.module.css';
/**
* Renders the Calendar Component
*
* @param  {object}  props       The component as props.
* @param  {string}  props.component The name of the component.
* @return {Element}             The Calendar component.
*/
export default function Calendar({component}) {
  return <p className={styles.string}>{component} component</p>;
}
Calendar.propTypes = {
component: PropTypes.string
};
Calendar.defaultProps = {
component: 'Calendar'
};
