import PropTypes from 'prop-types';
import styles from './CalendarDate.module.scss';
import { itemProps } from 'components/Calendar/Calendar.PropTypes';
import { useState, useEffect } from 'react';
import { useCalendarContext } from 'context/CalendarData';
import { createDateString } from 'context/CalendarData/CalendarData.utils';

/**
 * Renders a specific <td/> element for calendar days.
 *
 * @author  John Robert McCann
 * @since   8/2/2022
 * @version 1.0.0
 * @param  {object}  props          The component as props.
 * @param  {number}  props.dateNum  The calendar date calculated from the matrix index.
 * @return {Element}                The CalendarDate component.
 */
export default function CalendarDate({ dateNum }) {
  const { openDrawer, data, date } = useCalendarContext();
  const [content, setContent] = useState(null);
  const [total, setTotal] = useState(0);
  const dateString = createDateString(date?.year, date?.month, dateNum);

  useEffect(() => {
    if (data && dateString) {
      applyContents();
    }
    if (!data?.[dateString]) {
      setTotal(0);
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
    let sum = 0;
    let children = data?.[dateString]?.map((item) => {
      sum += parseFloat(
        item?.amount?.$numberDecimal > 0 ? item?.amount?.$numberDecimal : 0
      );
      return (
        <li key={item?._id} className={styles[item?.tag]}>
          <p>{item?.event || item?.item}</p>
        </li>
      );
    });

    setTotal(sum);

    setContent(children);
  }

  return (
    <td
      className={styles.tableDate}
      onClick={() => dateNum && openDrawer(dateString)}
      key={dateNum}
    >
      <div className={styles.tableInner} key={dateNum}>
        {dateNum && (
          <>
            <h4>{dateNum}</h4>
            <h5>{total.toFixed(2)}</h5>
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
};
