import { useEffect, createContext, useContext, useState, useRef } from 'react';
import Modal from 'components/utils/Modal';
import { LOADING_DELAY } from 'constants';
import { useSelector } from 'react-redux';
import { DEFAULT_TAGS, DEFAULT_THEME, THEMES } from './SettingsData.utils';

// Initialize context object.
const SettingsProvider = createContext();

/**
 * Export useContext Hook to call on any Settings page.
 *
 * @author  John Robert McCann
 * @since   09/14/2022
 * @version 1.0.0
 * @return {Function} Settings context exported.
 */
export function useSettingsContext() {
  return useContext(SettingsProvider);
}

/**
 * Renders the context for the /settings components.
 *
 * @author  John Robert McCann
 * @since   09/14/2022
 * @version 1.0.0
 * @return  {Element}     The SettingsData component.
 */
export default function SettingsData({ children }) {
  const [openSettings, setOpenSettings] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [tags, setTags] = useState(null);
  const [theme, setTheme] = useState(THEMES[DEFAULT_THEME]);
  const isLoaded = useRef(null);
  const { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (!isLoaded.current && user) {
      isLoaded.current = true;
      const { tags = null } = user;

      if (!tags) {
        setTags(DEFAULT_TAGS);
      } else {
        setTags(tags);
      }
    }
  }, [user]);

  /**
   * Function used to open the global modal with setting specific data.
   *
   * @param {node} children  The children to render inside of the modal.
   */
  function openModal(children) {
    setOpenSettings(true);
    setModalChildren(children);
  }

  /**
   * Function used to close the global modal.
   */
  function closeModal() {
    setOpenSettings(false);
    setTimeout(() => setModalChildren(null), LOADING_DELAY);
  }

  console.log('jr theme', theme);

  const value = {
    closeModal,
    openModal,
    openSettings,
    tags,
    setTags,
    theme,
    setTheme,
    availableThemes: Object.values(THEMES),
  };

  return (
    <SettingsProvider.Provider value={value}>
      {children}
      <Modal>{modalChildren}</Modal>
    </SettingsProvider.Provider>
  );
}
