import Loading from 'components/utils/Loading';
import { LOADING } from 'constants';
import cn from 'classnames';
import defaultStyles from './delayedrender.module.scss';
/**
 * Function used to display loader if no value exists.
 *
 * @param   {*}             value     The value to null check.
 * @param   {string|object} className The optionable classname.
 * @returns {Element}                 Returns either a loader or the appropriate value.
 */
export default function delayedRender(value, className) {
  if (value === LOADING) {
    return (
      <Loading
        className={cn(defaultStyles.loadingWrapper, className && className)}
      />
    );
  }

  return (
    <span className={cn(defaultStyles.formattedString, className && className)}>
      {value}
    </span>
  );
}
