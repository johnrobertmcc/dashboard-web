import { useSelector, useDispatch } from 'react-redux';
import CalendarData from 'context/CalendarData';
import Loading from 'components/utils/Loading';
import { getBudget } from 'features/budget/budgetSlice.js';
import { useEffect } from 'react';
import AddRecurringExpenses from 'components/expenses/AddRecurringExpenses';
import Calendar from 'components/calendar/Calendar';
import CardList from './CardList';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the default view "/" to display the user's information.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}  The Dashboard view.
 */
export default function Dashboard() {
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * React.useEffect used to fetch the budget of the user on successful validation.
   */
  useEffect(() => {
    if (user) {
      dispatch(getBudget());
    } else {
      navigate('/login');
    }
  }, [dispatch, user]);

  return (
    <section>
      {user ? (
        <>
          <CalendarData>
            <CardList />
            <Calendar />
            <AddRecurringExpenses />
          </CalendarData>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
