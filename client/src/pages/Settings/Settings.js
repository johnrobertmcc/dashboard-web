import DeleteDatabaseLink from './DeleteDatabaseLink';
import ReadFileLink from './ReadFileLink';
import styles from './Settings.module.scss';
import UserTagLink from './UserTagLink';

/**
 * Displays a list of user settings.
 *
 * @author  John Robert McCann
 * @since   09/14/2022
 * @version 1.0.0
 * @return  {Element}   The Settings component.
 */
export default function Settings() {
  return (
    <section className={styles.settings}>
      <ul>
        <UserTagLink />
        <ReadFileLink />
        <DeleteDatabaseLink />
      </ul>
    </section>
  );
}
