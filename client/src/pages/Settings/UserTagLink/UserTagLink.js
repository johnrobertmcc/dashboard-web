import PropTypes from 'prop-types';
import styles from './UserTagLink.module.scss';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import UserTags from 'components/UserTags';
import { UPDATE_TAGS } from './UserTagLink.utils';

/**
 * Renders the UserTagLink Component
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}                 The UserTagLink component.
 */
export default function UserTagLink() {
  const { openModal } = useSettingsContext();
  return (
    <li className={styles.readFile}>
      <button className={styles.upload} onClick={() => openModal(<UserTags />)}>
        Update Budget Tags
      </button>
      <p className={styles.descrption}>{UPDATE_TAGS}</p>
    </li>
  );
}
