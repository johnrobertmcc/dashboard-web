import { useCalendarContext } from 'context/CalendarData/CalendarData';
import Loading from 'components/utils/Loading';
import InfoCard from 'components/utils/InfoCard';
import styles from './UpcomingInfo.module.scss';
import dayjs from 'dayjs';
import { ACCESSIBLE_HEADER } from 'constants';
import { ACCESSIBLE_ID, ACCESSIBLE_TITLE } from './UpcomingInfo.utils';
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
      <h3 className={styles.title} id={ACCESSIBLE_ID}>
        {ACCESSIBLE_TITLE}
      </h3>
      <ul className={styles.list} aria-labelledby={ACCESSIBLE_ID}>
        {upcoming?.expenses.map((expense, i) => {
          const { amount, date, item, _id = i } = expense;

          return (
            <li key={_id}>
              <p>{dayjs(date).format('L')}</p>
              <p>${amount?.$numberDecimal}</p>
              <p>{item}</p>
            </li>
          );
        })}
      </ul>
    </InfoCard>
  );
}
