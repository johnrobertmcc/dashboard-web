import PropTypes from 'prop-types';
import styles from './Select.module.scss';
/**
 * Renders a <select /> with <option />s.
 *
 * @author  John Robert McCann
 * @since   09/20/2022
 * @version 1.0.0
 * @param   {object}  props             The component destructured as props.
 * @param   {string}  props.options     The options to map through.
 * @param   {string}  props.name        The name of the input.
 * @param   {string}  props.id          The id of the input.
 * @param   {string}  props.value       The value of the input.
 * @param   {string}  props.placeHolder The placeholder of the input.
 * @param   {string}  props.callBack    The callBack to fire on Change event.
 * @return  {Element}                   The Select component.
 */
export default function Select({
  options,
  type,
  id,
  name,
  value,
  placeHolder,
  callBack,
  className,
}) {
  return (
    <select
      type={type}
      className={className || styles.select}
      id={id}
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={(e) => callBack(e)}
    >
      {options?.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  );
}
Select.propTypes = {
  options: PropTypes.array,
};
Select.defaultProps = {
  options: [],
};
