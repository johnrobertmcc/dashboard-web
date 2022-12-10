import styles from './Modal.module.scss';
import { useSettingsContext } from 'context/SettingsData/SettingsData';
import useKeyPress from 'functions/hooks/useKeyPress';
import { useEffect } from 'react';
import cn from 'classnames';

/**
 * Renders a global modal component with dynamic children.
 *
 * @author  John Robert McCann
 * @since   09/14/2022
 * @version 1.0.0
 * @param   {object}  children The children of the modal to render.
 * @return  {Element}          The Modal component.
 */
export default function Modal({ children }) {
  const { closeModal, openSettings } = useSettingsContext();
  const escapePress = useKeyPress('Escape');

  useEffect(() => {
    if (openSettings && escapePress) {
      closeModal();
    }
  }, [escapePress, openSettings, closeModal]);
  return (
    <dialog
      open={true}
      className={cn(styles.backDrop, !openSettings && styles.closed)}
    >
      <div className={cn(styles.modal, openSettings && styles.open)}>
        <button className={styles.closeBtn} onClick={() => closeModal()}>
          close
        </button>
        {children}
      </div>
    </dialog>
  );
}
