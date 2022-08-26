import PropTypes from 'prop-types';
import styles from './CalendarHeading.module.css';

/**
 * Renders a heading for a calendar of localized days of the week.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props       The component as props.
 * @param  {Array}   props.data  The days of the week.
 * @return {Element}             The Calendar table header.
 */
export default function CalendarHeading({ data }) {
  return (
    <thead className={styles.tableHeader}>
      <tr>
        {data?.map((weekday, key) => {
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
CalendarHeading.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

CalendarHeading.defaultProps = {
  data: ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
};

CalendarHeading.propDocs = {
  data: 'Localized days of the week to display in the heading.',
};
