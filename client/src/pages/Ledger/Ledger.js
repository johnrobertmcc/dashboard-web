import { useEffect } from 'react';
import { getBudget } from 'features/budget/budgetSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import Loading from 'components/utils/Loading';
import UserExpenses from 'components/UserExpenses';
import PageHeading from 'components/utils/PageHeading';

import styles from './Ledger.module.css';
/**
 * Renders the Ledger Component
 *
 * @param  {object}  props       The component as props.
 * @param  {string}  props.component The name of the component.
 * @return {Element}             The Ledger component.
 */
export default function Ledger() {
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
          <PageHeading message="Daily Ledger" />
          <UserExpenses items={items || {}} />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
