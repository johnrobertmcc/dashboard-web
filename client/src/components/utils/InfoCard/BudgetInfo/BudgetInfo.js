import { useCalendarContext } from 'context/CalendarData/CalendarData';
import Loading from 'components/utils/Loading';
import InfoCard from 'components/utils/InfoCard';
import delayedRender from 'functions/utils/delayedRender';
import styles from './BudgetInfo.module.scss';
import {
  TOTAL_SPENT,
  TOTAL_TRANSACTIONS,
  ACCESSIBLE_ID,
  ACCESSIBLE_TITLE,
} from './BudgetInfo.utils';

/**
 * Renders a card for budget information.
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}    The BudgetInfo component.
 */
export default function BUdgetInfo() {
  const { monthTotal = null } = useCalendarContext();
  const { total = 'LOADING', items = 'LOADING' } = monthTotal;

  if (!monthTotal) {
    return <Loading />;
  }

  return (
    <InfoCard>
      <h2 className={styles.title} id={ACCESSIBLE_ID}>
        {ACCESSIBLE_TITLE}
      </h2>
      <div
        className={styles.userInfoWrapper}
        role="list"
        aria-labelledby={ACCESSIBLE_ID}
      >
        <h3 className={styles.total} aria-label={TOTAL_SPENT}>
          {TOTAL_SPENT} {delayedRender(total)}
        </h3>
        <h3 className={styles.transactions} aria-label={TOTAL_TRANSACTIONS}>
          {TOTAL_TRANSACTIONS} {delayedRender(items)}
        </h3>
      </div>
    </InfoCard>
  );
}
