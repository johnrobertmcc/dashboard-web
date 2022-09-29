import { useState } from 'react';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import styles from './UserTags.module.scss';
import { HEADING } from './UserTags.utils';
import Loading from 'components/utils/Loading';

/**
 * Gives user the ability to change their default Budget tags.
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}   The UserTags component.
 */
export default function UserTags() {
  const { tags, setTags } = useSettingsContext();
  const [newTag, setNewTag] = useState('');

  console.log('jr tags', tags);

  /**
   * Function used to add a new tag to the user's global state.
   *
   * @param {Event} e The event of the form.
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (newTag.length) {
      setTags((prev) => {
        return [...prev, newTag];
      });
    }
    setNewTag('');
  }

  /**
   * Function used to remove a tag from the user's global list.
   *
   * @param {number} idx  The index to filter out of the current user's tag list.
   */
  function deleteTag(idx) {
    setTags(tags.filter((_, i) => i !== idx));
  }

  if (!tags) {
    return <Loading />;
  }

  return (
    <section>
      <h2>{HEADING}</h2>
      <ul className={styles.list}>
        {tags.map((tag, i) => {
          return (
            <li key={i} className={styles.listItem}>
              <p>{tag}</p>
              <button onClick={() => deleteTag(i)}>Delete</button>
            </li>
          );
        })}
        <li>
          <form className={styles.listItem} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New Tag"
              value={newTag}
            />
            <button type="submit">Add</button>
          </form>
        </li>
      </ul>
    </section>
  );
}
