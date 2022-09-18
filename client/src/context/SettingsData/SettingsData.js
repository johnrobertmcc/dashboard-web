import { useEffect, createContext, useContext, useState, useMemo } from 'react';
import Settings from 'pages/Settings';
import Modal from 'components/utils/Modal';
import { LOADING_DELAY } from 'constants';

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
export default function SettingsData() {
  const [openSettings, setOpenSettings] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);

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

  const value = { closeModal, openModal, openSettings };
  return (
    <SettingsProvider.Provider value={value}>
      <Settings />
      <Modal>{modalChildren}</Modal>
    </SettingsProvider.Provider>
  );
}
