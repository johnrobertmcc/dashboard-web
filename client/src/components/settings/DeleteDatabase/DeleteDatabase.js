import { createElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRMATION, TOP_WARNING, BTN_TEXT } from './DeleteDatabase.utils';
import { deleteUserBudget } from 'features/budget/budgetSlice';
import Loading from 'components/utils/Loading';
import { LOADING_DELAY } from 'constants';
import { useSettingsContext } from 'context/SettingsData/SettingsData';

/**
 * Renders the DeleteDatabase Component
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}                 The DeleteDatabase component.
 */
export default function DeleteDatabase() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const { closeModal } = useSettingsContext();

  /**
   * Function used to delete _every_ single item of the current user's database.
   */
  function deleteAllItems() {
    setLoading(true);
    try {
      dispatch(deleteUserBudget(user?._id));
      setTimeout(() => {
        closeModal();
        setLoading(false);
      }, LOADING_DELAY * 2);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section>
      <h2>{TOP_WARNING}</h2>
      {createElement('p', {
        dangerouslySetInnerHTML: {
          __html: CONFIRMATION,
        },
      })}
      {loading || !user ? (
        <Loading />
      ) : (
        <button onClick={() => deleteAllItems()}>{BTN_TEXT}</button>
      )}
    </section>
  );
}
