import PropTypes from 'prop-types';
import styles from './CalendarDate.module.scss';
import { itemProps } from 'components/Calendar/Calendar.PropTypes';
import { useState, useEffect, useRef } from 'react';
import { useCalendarContext } from 'context/CalendarData';

/**
 * Renders a specific <td/> element for calendar days.
 *
 * @author  John Robert McCann
 * @since   8/2/2022
 * @version 1.0.0
 *
 * @param  {object}  props          The component as props.
 * @param  {object}  props.data     The user's data by specific date.
 * @param  {number}  props.dateNum  The calendar date.
 * @return {Element}                The CalendarDate component.
 */
export default function CalendarDate({ data, dateNum, dateString }) {
  const [content, setContent] = useState(null);
  const [total, setTotal] = useState(0);
  const isMounted = useRef(false);

  const { openModal } = useCalendarContext();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (data) {
        applyContents();
      }
    }
  }, [data]);

  /**
   * Function used to apply the appropriate content to each table cell.
   *
   * @author  John Robert McCann
   * @since   8/25/2022
   * @version 1.0.0
   */
  function applyContents() {
    let children = data?.map((item) => {
      setTotal(
        (prev) =>
          (prev += parseFloat(
            item?.amount?.$numberDecimal > 0 ? item?.amount?.$numberDecimal : 0
          ))
      );
      return (
        <li key={item?._id} className={styles[item?.tag]}>
          {item?.event || item?.item}
        </li>
      );
    });

    setContent(children);
  }

  return (
    <td
      className={styles.tableDate}
      onClick={() => dateNum && openModal(dateString)}
      key={dateNum}
    >
      <div className={styles.tableInner}>
        {dateNum && (
          <>
            <h4>{dateNum}</h4>
            <h5>{total.toFixed(2)}</h5>
          </>
        )}
        {content && <ul>{content}</ul>}
      </div>
    </td>
  );
}

CalendarDate.propTypes = {
  data: itemProps,
  dateNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
