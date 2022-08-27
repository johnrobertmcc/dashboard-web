import { useSelector, useDispatch } from 'react-redux';
import CalendarData from 'context/CalendarData';
import Loading from 'components/utils/Loading';
import AddExpense from 'components/AddExpense';
import PageHeading from 'components/utils/PageHeading';
import { getBudget } from 'features/budget/budgetSlice.js';
import { useEffect } from 'react';

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

  /**
   * React.useEffect used to fetch the budget of the user on successful validation.
   */
  useEffect(() => {
    if (user) {
      dispatch(getBudget());
    }
  }, [dispatch, user]);

  return (
    <section>
      {user ? (
        <>
          <PageHeading message={`Welcome ${user?.name}`} />
          <CalendarData />
          <AddExpense />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
