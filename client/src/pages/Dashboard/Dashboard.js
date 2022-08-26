import { useEffect } from 'react';
import { getBudget } from 'features/budget/budgetSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'components/Calendar';
import Loading from 'components/utils/Loading';
import AddExpense from 'components/AddExpense';
import PageHeading from 'components/utils/PageHeading';

/**
 * Renders the default view "/" to display the user's information.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 * @return {Element}  The Dashboard view.
 */
export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { items = [] } = useSelector((state) => {
    return state?.budget;
  });

  useEffect(() => {
    dispatch(getBudget());
  }, [user, dispatch]);

  return (
    <section>
      {user ? (
        <>
          <PageHeading message={`Welcome ${user?.name}`} />
          <Calendar items={items?.data || {}} />
          <AddExpense />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
