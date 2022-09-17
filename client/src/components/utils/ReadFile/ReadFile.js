import styles from './ReadFile.module.scss';
import Papa from 'papaparse';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import ConfirmData from 'components/ConfirmData';

/**
 * Creates the ability to drop files into a specified zone and convert csv to json.
 *
 * @author  John Robert McCann
 * @since   09/15/2022
 * @version 1.0.0
 * @return  {Element}   The ReadFile component.
 */
export default function ReadFile() {
  const { openModal } = useSettingsContext();

  /**
   * Function used to parse .csv and convert to JSON.
   *
   * @see https://www.papaparse.com/
   * @author  John Robert McCann
   * @since   09/16/2022
   * @version 1.0.0
   * @param {Event} e The event from the input.
   */
  function parseCSV(e) {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        openModal(<ConfirmData data={results.data} />);
      },
    });
  }

  return (
    <div className={styles.container}>
      <input
        type="file"
        name="file"
        accept=".csv"
        style={{ display: 'block', margin: '10px auto' }}
        onChange={(e) => parseCSV(e)}
        className={styles.upload}
      />
    </div>
  );
}
