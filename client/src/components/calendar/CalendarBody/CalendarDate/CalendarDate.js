import PropTypes from 'prop-types';
import styles from './CalendarDate.module.scss';
import { itemProps } from 'components/calendar/Calendar.PropTypes';
import { useState, useEffect, useRef } from 'react';
import { useCalendarContext } from 'context/CalendarData';
import { createDateString } from 'context/CalendarData/CalendarData.utils';
import dayjs from 'dayjs';
import cn from 'classnames';
import useKeyPress from 'functions/hooks/useKeyPress';
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

/**
 * Renders a specific <td/> element for calendar days.
 *
 * @author  John Robert McCann
 * @since   8/2/2022
 * @version 1.0.0
 * @param  {object}   props               The component as props.
 * @param  {number}   props.dateNum       The calendar date calculated from the matrix index.
 * @param  {number}   props.focusedKey    The key focused via keyboard event listeners..
 * @param  {number}   props.idx           The acutal index inside of the row.
 * @param  {Function} props.setFocusedDay Function used to set the focusedDay on outside focus events..
 * @return {Element}                      The CalendarDate component.
 */
export default function CalendarDate({
  dateNum,
  focusedKey,
  idx,
  setFocusedDay,
}) {
  const { openDrawer, data, date = null } = useCalendarContext();
  const [content, setContent] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [total, setTotal] = useState(0);
  const [ariaHidden, setAriaHidden] = useState(true);
  const dateString = createDateString(date?.year, date?.month, dateNum);
  const keyRef = useRef();
  const enterKey = useKeyPress('Enter');

  useEffect(() => {
    if (idx === focusedKey) {
      keyRef.current.focus();
    }
  }, [idx, focusedKey]);

  useEffect(() => {
    if (!date) {
      return null;
    }
    if (data && dateString) {
      applyContents();
    }
    if (!data?.[dateString]) {
      setTotal(0);
    }
  }, [data, date]);

  useEffect(() => {
    if (isFocused && enterKey) {
      keyRef.current.click();
    }
  }, [isFocused, enterKey]);

  /**
   * Function used to control aria descriptors.
   *
   * @author  John Robert McCann
   * @since   03/04/2022
   * @version 1.0.0
   */
  function onFocus() {
    setAriaHidden(false);
    setIsFocused(true);
    setFocusedDay(idx);
  }

  /**
   * Function used to control aria descriptors.
   *
   * @author  John Robert McCann
   * @since   03/04/2022
   * @version 1.0.0
   */
  function onBlur() {
    setAriaHidden(true);
    setIsFocused(false);
  }

  /**
   * Function used to apply the appropriate content to each table cell.
   *
   * @author  John Robert McCann
   * @since   8/25/2022
   * @version 1.0.0
   */
  function applyContents() {
    let sum = 0;
    const children = data?.[dateString]?.map((item, i) => {
      const parsedAmount =
        typeof item?.amount === 'number'
          ? item?.amount
          : item?.amount?.$numberDecimal;
      sum += parseFloat(parsedAmount);
      return (
        <li
          key={item?._id || i}
          className={styles[item?.tag]}
          aria-label={`${item?.item || item?.event} costing ${parseFloat(
            parsedAmount
          )}`}
        >
          <p>{item?.item || item?.event}</p>
        </li>
      );
    });

    setTotal(sum);
    setContent(children);
  }

  return (
    <td
      className={cn(
        styles.tableDate,
        total >= 100 && styles.over,
        total >= 200 && styles['not-allowed'],
        total <= 10 && styles.success,
        total > 10 && total < 50 && styles.acceptable,
        total > 50 && total < 100 && styles.warning,
        total > 500 && styles.immediate,
        !dateNum && styles.adjoining,
        dayjs(dateString).isBefore(dayjs().format('l')) && styles.pastDate,
        !dayjs(dateString).isValid() && styles.connectingDate,
        dayjs(dateString).isToday() && styles.today
      )}
      onClick={() => dateNum && openDrawer(dateString)}
      key={dateNum}
      ref={keyRef}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={!dayjs(dateString).isValid() ? -1 : 0}
      aria-hidden={ariaHidden}
    >
      <div className={styles.tableInner} key={dateNum}>
        {dateNum && (
          <>
            <h4 aria-label={dayjs(dateString).format('LL')}>{dateNum}</h4>
            <h5
              className={cn(total <= 0 && styles.nonSpent)}
              aria-label={`Total Spent: ${total.toFixed(2)}`}
            >
              {total.toFixed(2)}
            </h5>
          </>
        )}
        {content && <ul key={dateNum}>{content}</ul>}
      </div>
    </td>
  );
}

CalendarDate.propTypes = {
  data: itemProps,
  dateNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setFocusedDay: PropTypes.func,
  idx: PropTypes.number,
  focusedkey: PropTypes.number,
};
