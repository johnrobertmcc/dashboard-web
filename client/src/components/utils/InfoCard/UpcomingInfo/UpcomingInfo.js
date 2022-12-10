import { useCalendarContext } from 'context/CalendarData/CalendarData';
import Loading from 'components/utils/Loading';
import InfoCard from 'components/utils/InfoCard';
import styles from './UpcomingInfo.module.scss';
import dayjs from 'dayjs';
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

/**
 * Renders an InfoCard with upcoming expenses.
 *
 * @author  John Robert McCann
 * @since   12/09/2022
 * @version 1.0.0
 * @return  {Element}    The UpcomingInfo component.
 */
export default function UpcomingInfo() {
  const { upcoming } = useCalendarContext();

  if (!upcoming) {
    return <Loading />;
  }

  return (
    <InfoCard>
      <h3 className={styles.title}> Upcoming Expenses</h3>
      <ul className={styles.list}>
        {upcoming?.expenses.map((expense, i) => {
          const { amount, date, event, _id = i } = expense;

          return (
            <li key={_id}>
              <p>{dayjs(date).format('L')}</p>
              <p>${amount?.$numberDecimal}</p>
              <p>{event}</p>
            </li>
          );
        })}
      </ul>
    </InfoCard>
  );
}
