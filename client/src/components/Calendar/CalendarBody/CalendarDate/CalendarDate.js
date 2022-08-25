import PropTypes from 'prop-types';
import styles from './CalendarDate.module.scss';
import { itemProps } from 'components/Calendar/Calendar.PropTypes';
import { useState, useEffect } from 'react';

/**
 * Renders a specific <td/> element for calendar days.
 *
 * @param  {object}  props          The component as props.
 * @param  {object}  props.data     The user's data by specific date.
 * @param  {number}  props.dateNum  The calendar date.
 * @return {Element}                The CalendarDate component.
 */
export default function CalendarDate({ data, dateNum }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (data) {
      applyContents();
    }
  }, [data]);

  /**
   * Function used to apply the appropriate content to each table cell.
   */
  function applyContents() {
    let children = data?.map((item) => {
      return (
        <li key={item?._id} className={styles[item?.tag]}>
          {item?.item}
        </li>
      );
    });

    setContent(children);
  }

  return (
    <td className={styles.tableDate} key={dateNum}>
      <div className={styles.tableInner} key={dateNum}>
        <h5>{dateNum}</h5>
        {content && <ul>{content}</ul>}
      </div>
    </td>
  );
}

CalendarDate.propTypes = {
  data: itemProps,
  numDays: PropTypes.string,
};
