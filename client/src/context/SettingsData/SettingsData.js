import { useEffect, createContext, useContext, useState, useRef } from 'react';
import Modal from 'components/utils/Modal';
import { LOADING_DELAY } from 'constants';
import { useSelector } from 'react-redux';
import { DEFAULT_TAGS, DEFAULT_THEME, THEMES } from './SettingsData.utils';
import useKeyPress from 'functions/hooks/useKeyPress.js';

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
 * @param   {children} children The children of the app
 * @return  {Element}           The SettingsData component.
 */
export default function SettingsData({ children }) {
  const [openSettings, setOpenSettings] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);
  const [tags, setTags] = useState(null);
  const [openMenu, setOpenMenu] = useState({ left: false, right: false });
  const [theme, setTheme] = useState(THEMES[DEFAULT_THEME]);
  const isLoaded = useRef(null);
  const { user } = useSelector((state) => state?.auth);
  const leftMenu = useKeyPress('[');
  const rightMenu = useKeyPress(']');

  useEffect(() => {
    if (leftMenu) {
      setOpenMenu((prev) => ({ ...prev, left: !prev.left }));
    }
    if (rightMenu) {
      setOpenMenu((prev) => ({ ...prev, right: !prev.right }));
    }
  }, [leftMenu]);

  useEffect(() => {
    if (!isLoaded.current && user) {
      isLoaded.current = true;
      const { tags: userTags = DEFAULT_TAGS } = user;

      setTags(userTags);
    }
  }, [user]);

  /**
   * Function used to open the global modal with setting specific data.
   *
   * @param {Node} children  The children to render inside of the modal.
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

  /**
   * Function used to open or clsoe the drawer dependant on position.
   *
   * @author  John Robert McCann
   * @since   8/28/2022
   * @version 1.0.0
   * @param {string} direction The direction to slide, const LEFT or RIGHT.
   */
  function handleClick(direction) {
    setOpenMenu((prev) => ({ ...prev, [direction]: !prev?.[direction] }));
  }

  const value = {
    closeModal,
    openModal,
    openSettings,
    tags,
    setTags,
    theme,
    setTheme,
    openMenu,
    handleClick,
    availableThemes: Object.values(THEMES),
  };

  return (
    <SettingsProvider.Provider value={value}>
      {children}
      <Modal>{modalChildren}</Modal>
    </SettingsProvider.Provider>
  );
}
