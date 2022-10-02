import ThemeSettings from 'components/settings/ThemeSettings';
import styles from './ThemeSettingsLink.module.scss';
import { THEME_SETTINGS_DESCRIPTION } from './ThemeSettings.utils';

/**
 * Renders the Switch to toggle the theme settings.
 *
 * @author  John Robert McCann
 * @since   09/28/2022
 * @version 1.0.0
 * @return  {Element}      The ThemeSettingsLink component.
 */
export default function ThemeSettingsLink() {
  return (
    <li className={styles.themeSettings}>
      <ThemeSettings />
      <p className={styles.description}>{THEME_SETTINGS_DESCRIPTION}</p>
    </li>
  );
}
