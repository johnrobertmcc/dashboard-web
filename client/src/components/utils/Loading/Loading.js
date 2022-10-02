import cn from 'classnames';
import styles from './Loading.module.css';

/**
 * Renders a spinner for loading state.
 *
 * @author John Robert McCann
 * @since  6/26/2022
 * @param  {string}  className  Optional class stylings to apply to wrapper.
 * @return {Element}            The Loading component.
 */
export default function Loading({ className }) {
  return (
    <div className={cn(styles.wrapper, className && className)}>
      <img src="./spinner.gif" alt="loading" className={styles.loader} />
    </div>
  );
}
