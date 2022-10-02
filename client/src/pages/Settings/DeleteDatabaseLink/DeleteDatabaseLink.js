import { useSettingsContext } from 'context/SettingsData/SettingsData';
import styles from './DeleteDatabaseLink.module.scss';
import { DELETE_DATABASE_DESCRIPTION } from './DeleteDatabaseLink.utils';
import DeleteDatabase from 'components/settings/DeleteDatabase/DeleteDatabase';

/**
 * Renders the option to delete all transactions.
 *
 * @author  John Robert McCann
 * @since   09/16/2022
 * @version 1.0.0
 * @return  {Element}  The DeleteDatabase link.
 */
export default function DeleteDatabaseLink() {
  const { openModal } = useSettingsContext();
  return (
    <li className={styles.deleteDatabase}>
      <button
        className={styles.delete}
        onClick={() => openModal(<DeleteDatabase />)}
      >
        Delete Database
      </button>
      <p className={styles.description}>{DELETE_DATABASE_DESCRIPTION}</p>
    </li>
  );
}
