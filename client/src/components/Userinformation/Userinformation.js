import PropTypes from 'prop-types';
import styles from './Userinformation.module.scss';
/**
* Renders the Userinformation Component
*
* @author  John Robert McCann
* @since   09/18/2022
* @version 1.0.0
* @param   {object}  props           The component destructured as props.
* @param   {string}  props.component The name of the component.
* @return  {Element}                 The Userinformation component.
*/
export default function Userinformation({component}) {
  return <p className={styles.string}>{component} component</p>;
}
Userinformation.propTypes = {
component: PropTypes.string
};
Userinformation.defaultProps = {
component: 'Userinformation'
};
