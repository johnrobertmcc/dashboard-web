import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styles from './ConfirmData.module.scss';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import {
  MESSAGES,
  CONFIRM_DATE_STATE,
  DATA_STRUC,
  STATE_KEYS,
  CONFIRM_TABLE_STATE,
  CONFIRM_EVENT_STATE,
  CONFIRM_ITEM_STATE,
} from './ConfirmData.utils';
import ConfirmTransactions from 'components/ConfirmTransactions';
import cn from 'classnames';
import ResponsiveTable from 'components/utils/ResponsiveTable';

/**
 * Renders an interactive selection to choose table headers for <ConfirmTransactions />.
 *
 * @author  John Robert McCann
 * @since   09/15/2022
 * @version 1.0.0
 * @param   {object}  props         The component destructured as props.
 * @param   {object}  props.data    The data from the uploaded .csv.
 * @return  {Element}               The ConfirmData component.
 */
export default function ConfirmData({ data }) {
  const [modalState, setModalState] = useState(CONFIRM_DATE_STATE);
  const [message, setModalMessage] = useState(MESSAGES[modalState]);
  const [dataStruc, setDataStruc] = useState(DATA_STRUC);
  const { openModal } = useSettingsContext();

  /**
   * Function used to change the modal state and declare to state the next selection.
   *
   * @author  John Robert McCann
   * @since   09/16/2022
   * @version 1.0.0
   * @param {string} val       The value of the selected header via <button />.
   * @param {string} direction The direction 'next' or 'prev'.
   */
  function clickNext(val) {
    setModalState((prev) => ++prev);

    setDataStruc((prev) => ({
      ...prev,
      [STATE_KEYS[modalState]]: val,
    }));
  }

  /**
   * Function used to change the modal state and declare to state the previous selection.
   *
   * @author  John Robert McCann
   * @since   09/16/2022
   * @version 1.0.0
   * @param {string} val       The value of the selected header via <button />.
   * @param {string} direction The direction 'next' or 'prev'.
   */
  function clickPrev() {
    setModalState((prev) => --prev);

    setDataStruc((prev) => ({ ...prev, [STATE_KEYS[modalState]]: '' }));
  }

  /**
   * Function used to confirm the table and change to <ConfirmTransaction /> modal.
   *
   * @author  John Robert McCann
   * @since   09/16/2022
   * @version 1.0.0
   */
  function clickConfirm() {
    setModalState(6);
  }

  useEffect(() => {
    if (modalState <= CONFIRM_TABLE_STATE) {
      setModalMessage(MESSAGES[modalState]);
    } else {
      openModal(<ConfirmTransactions data={data} structure={dataStruc} />);
    }
  }, [modalState]);

  return (
    <section>
      {modalState > CONFIRM_DATE_STATE && (
        <button onClick={() => clickPrev()}>Prev</button>
      )}
      <p className={styles.message}>{message}</p>
      {modalState > CONFIRM_ITEM_STATE && modalState !== CONFIRM_TABLE_STATE && (
        <button onClick={() => clickNext(null)} className={styles.invalid}>
          None
        </button>
      )}
      {modalState === CONFIRM_TABLE_STATE && (
        <button onClick={() => clickConfirm()}>CONFIRM</button>
      )}
      <ResponsiveTable>
        {modalState <= CONFIRM_EVENT_STATE ? (
          <table className={styles.confirmTable}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((heading, i) => (
                  <td key={i} className={styles[data?.[0]?.[heading]]}>
                    {heading}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(data[0]).map((value, i) => (
                  <td key={i} className={styles[value]}>
                    <button onClick={() => clickNext(Object.keys(data[0])[i])}>
                      {value}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ) : (
          <table className={styles.proposedTable}>
            <thead>
              <tr>
                {Object.keys(dataStruc).map((heading, i) => (
                  <th key={i}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(dataStruc).map((val, i) => {
                  return <td key={i}>{data[0]?.[val]}</td>;
                })}
              </tr>
            </tbody>
          </table>
        )}
      </ResponsiveTable>
    </section>
  );
}
ConfirmData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
