import PropTypes from 'prop-types';
import styles from './Drawer.module.scss';
import cn from 'classnames';
import PageHeading from '../PageHeading';
import useKeyPress from 'functions/hooks/useKeyPress';
import { useEffect, useRef } from 'react';

/**
 * Renders a Drawer with supplied children.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @param  {object}        data         The data of the draer containing children and title.
 * @param  {boolean}       open         Whether the drawer is open.
 * @param  {Function}      closeDrawer  Function to close the drawer.
 * @param  {string|object} className    Optional className to supply the drawer.
 * @return {Element}                    The Drawer component.
 */
export default function Drawer({ data, open, closeDrawer, className }) {
  const { children = null, title = '' } = data;
  const escapePress = useKeyPress('Escape');
  const rightBracket = useKeyPress(']');
  const drawerRef = useRef(false);
  const closeBtnRef = useRef();

  useEffect(() => {
    if (open) {
      setTimeout(() => drawerRef.current.focus({ preventScroll: true }), 300);
    }
    if (open && (escapePress || rightBracket)) {
      closeBtnRef.current.click();
    }
  }, [escapePress, open, rightBracket]);

  return (
    <div
      className={cn(
        styles.backDrop,
        !open && styles.closed,
        className && className
      )}
      onClick={() => closeBtnRef.current.click()}
    >
      <aside
        tabIndex={0}
        aria-hidden={!open}
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.modal, open && styles.open)}
        ref={drawerRef}
        aria-labelledby="drawerTitle"
        role="dialog"
      >
        <button
          onClick={closeDrawer}
          ref={closeBtnRef}
          aria-label="Close Drawer"
        >
          X
        </button>
        {title && <PageHeading tag="h4" message={title} id="drawerTitle" />}
        {children}
      </aside>
    </div>
  );
}

Drawer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    children: PropTypes.element,
  }),
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Drawer.defaultProps = {
  data: {
    title: 'Drawer Title',
    children: <p>The children</p>,
  },
  open: true,
  closeDrawer: () => console.log('Add a function to close the drawer!'),
  className: null,
};
