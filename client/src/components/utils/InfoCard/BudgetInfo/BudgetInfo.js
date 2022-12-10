import { useCalendarContext } from 'context/CalendarData/CalendarData';
import Loading from 'components/utils/Loading';
import InfoCard from 'components/utils/InfoCard';
import delayedRender from 'functions/utils/delayedRender';
import styles from './BudgetInfo.module.scss';

/**
 * Renders a card for budget information.
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}    The BudgetInfo component.
 */
export default function BUdgetInfo() {
  const { monthTotal } = useCalendarContext();
  const { total = 'LOADING', items = 'LOADING' } = monthTotal;

  if (!monthTotal) {
    return <Loading />;
  }

  return (
    <InfoCard>
      <div className={styles.userInfoWrapper}>
        <h3 className={styles.total}>
          Total Spent This Month: {delayedRender(total)}
        </h3>
        <h3 className={styles.transactions}>
          Total Transactions: {delayedRender(items)}
        </h3>
      </div>
    </InfoCard>
  );
}
