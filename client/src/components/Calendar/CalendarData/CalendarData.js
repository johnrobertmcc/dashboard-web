import Modal from 'components/utils/Modal';
import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

// Initialize context object.
const CalendarModal = createContext({
  setModal: () => {},
});

/**
 * Export useContext Hook.
 *
 * @return {Function} Calendar context exported.
 */
export function useCalendarContext() {
  return useContext(CalendarModal);
}

/**
 * Provide context for calendar components.
 *
 * @param  {object}  props          The component attributes as props.
 * @param  {object}  props.children The components children.
 * @return {Element}                The Calendar context component.
 */
export function CalendarData({ children }) {
  const [modal, setModal] = useState(null);
  const value = { setModal };

  return (
    <CalendarModal.Provider value={value}>
      {children}
      {modal && <Modal data={modal} />}
    </CalendarModal.Provider>
  );
}

CalendarData.propTypes = {
  children: PropTypes.object,
};
