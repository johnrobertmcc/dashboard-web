import { useCalendarContext } from 'context/CalendarData/CalendarData';
import Loading from 'components/utils/Loading';
import InfoCard from 'components/utils/InfoCard';
import delayedRender from 'functions/utils/delayedRender';

/**
 * Renders a card for budget information.
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}    The BUdgetInfo component.
 */
export default function BUdgetInfo() {
  const { monthTotal } = useCalendarContext();

  if (!monthTotal) {
    return <Loading />;
  }

  return (
    <InfoCard>
      <h3>Total Spent This Month: {delayedRender(monthTotal?.total)}</h3>
      <h3>Total Transactions: {delayedRender(monthTotal?.items)}</h3>
    </InfoCard>
  );
}
