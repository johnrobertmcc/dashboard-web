import { useSettingsContext } from 'context/SettingsData/SettingsData';
import { useState } from 'react';
import styles from './UserTags.module.scss';
import { DEFAULT_TAGS, HEADING } from './UserTags.utils';
/**
 * Gives user the ability to change their default Budget tags.
 *
 * @author  John Robert McCann
 * @since   09/18/2022
 * @version 1.0.0
 * @return  {Element}   The UserTags component.
 */
export default function UserTags() {
  const { tags } = useSettingsContext();

  return (
    <section>
      <h2>{HEADING}</h2>
      <ul>
        {tags.map((tag) => {
          return (
            <li>
              <p>{tag}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
