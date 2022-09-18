import PropTypes from 'prop-types';
import styles from './Drawer.module.scss';
import cn from 'classnames';
import PageHeading from '../PageHeading';
import useKeyPress from 'functions/hooks/useKeyPress';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (open && escapePress) {
      closeDrawer();
    }
  }, [escapePress, open]);

  return (
    <aside
      className={cn(
        styles.backDrop,
        !open && styles.closed,
        className && className
      )}
      onClick={() => closeDrawer()}
    >
      <div
        className={cn(styles.modal, open && styles.open)}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => closeDrawer()}>X</button>
        {title && <PageHeading tag="h4" message={title} />}
        {children}
      </div>
    </aside>
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
