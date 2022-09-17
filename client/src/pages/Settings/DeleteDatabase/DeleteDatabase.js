import PropTypes from 'prop-types';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import styles from './DeleteDatabase.module.scss';
import { DELETE_DATABASE_DESCRIPTION } from './DeleteDatabase.utils';

/**
 * Renders the option to delete all transactions.
 *
 * @author  John Robert McCann
 * @since   09/16/2022
 * @version 1.0.0
 * @return  {Element}  The DeleteDatabase component.
 */
export default function DeleteDatabase({ component }) {
  const { openModal } = useSettingsContext();
  return (
    <li className={styles.deleteDatabase}>
      <button
        className={styles.delete}
        onClick={() => openModal(<p>delete database</p>)}
      >
        Delete Database
      </button>
      <p className={styles.description}>{DELETE_DATABASE_DESCRIPTION}</p>
    </li>
  );
}
