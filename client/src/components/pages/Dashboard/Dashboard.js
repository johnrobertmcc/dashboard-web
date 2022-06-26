import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
/**
* Renders the Dashboard Component
*
* @param  {object}  props       The component as props.
* @param  {string}  props.component The name of the component.
* @return {Element}             The Dashboard component.
*/
export default function Dashboard({component}) {
  return <p className={styles.string}>{component} component</p>;
}
Dashboard.propTypes = {
component: PropTypes.string
};
Dashboard.defaultProps = {
component: 'Dashboard'
};
