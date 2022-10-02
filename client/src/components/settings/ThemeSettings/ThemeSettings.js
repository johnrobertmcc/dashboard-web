import { Select } from 'components/utils';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import styles from './ThemeSettings.module.scss';

/**
 * Renders the switch for themes.
 *
 * @author  John Robert McCann
 * @since   09/28/2022
 * @version 1.0.0
 * @return  {Element}   The ThemeSettings component.
 */
export default function ThemeSettings() {
  const { setTheme, availableThemes = null } = useSettingsContext();

  console.log('jr availableThemes', availableThemes);

  /**
   * Function used to handle the onchange event of the ThemeSettings <select />.
   */
  function onChange(e) {
    setTheme(e.target.value);
  }

  /**
   * Function used to create the new options.
   *
   * @returns {Array} Returns an array of options for the theme.
   */
  function createOptions() {
    return availableThemes?.map((theme, i) => {
      return theme;
    });
  }

  if (!availableThemes) {
    return null;
  }

  return (
    <Select
      className={styles.themeProvider}
      options={createOptions()}
      callBack={onChange}
    />
  );
}
