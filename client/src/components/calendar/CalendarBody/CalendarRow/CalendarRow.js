import PropTypes from 'prop-types';
import styles from './CalendarRow.module.scss';
import CalendarDate from '../CalendarDate';
import { useCalendarContext } from 'context/CalendarData';
import useKeyPress from 'functions/hooks/useKeyPress';
import { useEffect, useState } from 'react';

/**
 * Renders the rows of the calendar containing specified data.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @param  {object}   props         The component as props.
 * @param  {number}   props.row     The current week of the month .
 * @returns {Element}               The CalendarRow component.
 */
export default function CalendarRow({ row, nextBtn, prevBtn }) {
  const { numDays, startOfMonth, open } = useCalendarContext();
  const [focusedDay, setFocusedDay] = useState(0);
  const upKey = useKeyPress('ArrowUp');
  const rightKey = useKeyPress('ArrowRight');
  const downKey = useKeyPress('ArrowDown');
  const leftKey = useKeyPress('ArrowLeft');
  const dKey = useKeyPress('d');
  const aKey = useKeyPress('a');

  useEffect(() => {
    if (!open) {
      if (upKey) {
        setFocusedDay((prev) => (prev -= 7));
      } else if (downKey) {
        setFocusedDay((prev) => (prev += 7));
      } else if (leftKey) {
        setFocusedDay((prev) => (prev -= 1));
      } else if (rightKey) {
        setFocusedDay((prev) => (prev += 1));
      } else if (dKey) {
        nextBtn.current.click();
      } else if (aKey) {
        prevBtn.current.click();
      }
    }
  }, [upKey, downKey, leftKey, rightKey, dKey, aKey, open]);

  useEffect(() => {
    if (focusedDay <= 0) {
      prevBtn.current.focus();
    }
    if (focusedDay > numDays) {
      nextBtn.current.focus();
    }
  }, [focusedDay]);

  return (
    <tr key={numDays} className={styles.tableRow}>
      {Array(7)
        .fill()
        .map((_, i) => {
          const dateNum =
            row === 0 ? i + 1 - startOfMonth : i + 1 - startOfMonth + 7 * row;

          let dateProps = { dateNum, key: i };
          if (dateNum > numDays) {
            dateProps.dateNum = null;
          }
          if ((row === 0 && i < startOfMonth) || dateNum > numDays) {
            dateProps.dateNum = null;
          }

          return (
            <CalendarDate
              {...dateProps}
              focusedKey={focusedDay}
              idx={dateProps.dateNum}
              setFocusedDay={setFocusedDay}
            />
          );
        })}
    </tr>
  );
}
CalendarRow.propTypes = {
  row: PropTypes.number,
};
