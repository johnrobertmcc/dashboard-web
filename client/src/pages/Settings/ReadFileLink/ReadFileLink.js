import ReadFile from 'components/utils/ReadFile';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import styles from './ReadFileLink.module.scss';
import { READ_FILE_DESCRIPTION } from './ReadFileLink.utils';

/**
 * Renders the "ReadFileLink" setting as a semantic <li />.
 *
 * @author  John Robert McCann
 * @since   09/14/2022
 * @version 1.0.0
 * @return  {Element}    The ReadFileLink component.
 */
export default function ReadFileLink() {
  const { openModal } = useSettingsContext();
  return (
    <li className={styles.readFile}>
      <button className={styles.upload} onClick={() => openModal(<ReadFile />)}>
        Upload
      </button>
      <p className={styles.descrption}>{READ_FILE_DESCRIPTION}</p>
    </li>
  );
}
