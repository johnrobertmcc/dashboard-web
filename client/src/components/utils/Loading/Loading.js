import styles from './Loading.module.css';

/**
 * Renders a spinner for loading state.
 *
 * @author John Robert McCann
 * @since  6/26/2022
 * @return {Element} The Loading component.
 */
export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <img src="./spinner.gif" alt="loading" />
    </div>
  );
}
