import PropTypes from 'prop-types';
import styles from './CalendarHeading.module.scss';
import { useCalendarContext } from 'context/CalendarData';

/**
 * Renders a heading for a calendar of localized days of the week.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @return {Element}             The Calendar table header.
 */
export default function CalendarHeading() {
  const { weeks } = useCalendarContext();

  return (
    <thead className={styles.tableHeader}>
      <tr>
        {weeks?.map((weekday, key) => {
          return (
            <th className={styles.weekDay} key={key}>
              {weekday}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
