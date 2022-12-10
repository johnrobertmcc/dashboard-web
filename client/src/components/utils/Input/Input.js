import PropTypes from 'prop-types';
import styles from './Input.module.scss';
/**
 * Renders a default stylized input component.
 *
 * @author John Robert McCann
 * @since 6/26/2022
 * @param  {object}  props       The component as props.
 * @param  {string}  props.name  The name of the input.
 * @param  {string}  props.id    The id of the input.
 * @param  {string}  props.value  The value of the input.
 * @param  {string}  props.placeHolder  The placeholder of the input.
 * @param  {string}  props.callBack  The callBack to fire on Change event.
 * @return {Element}             The Input component.
 */
export default function Input({
  type,
  id,
  name,
  value,
  placeHolder,
  callBack,
  className,
}) {
  return (
    <>
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <input
        type={type}
        className={className || styles.input}
        id={id}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => callBack(e)}
      />
    </>
  );
}
Input.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeHolder: PropTypes.string,
  callBack: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
Input.defaultProps = {
  type: 'text',
  id: 'id',
  name: 'name',
  value: 'value',
  placeHolder: 'Enter Input Details Here.',
  callBack: () =>
    console.log('Please remember to add a function as a declaration.'),
  className: null,
};
