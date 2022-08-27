import PropTypes from 'prop-types';
import styles from './Drawer.module.scss';
import cn from 'classnames';
import PageHeading from '../PageHeading';
import { useCalendarContext } from 'context/CalendarData/CalendarData';

/**
 * Renders a Drawer ith supplied children.
 *
 * @author  John Robert McCann
 * @since   8/26/2022
 * @version 1.0.0
 * @return {Element}                   The Drawer component.
 */
export default function Drawer() {
  const { dayData, open, closeDrawer } = useCalendarContext();
  const { children = null, title = '' } = dayData;
  return (
    <aside
      className={cn(styles.backDrop, !open && styles.closed)}
      onClick={() => closeDrawer()}
    >
      <div
        className={cn(styles.modal, open && styles.open)}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => closeDrawer()}>X</button>
        <PageHeading tag="h4" message={title} />
        {children}
      </div>
    </aside>
  );
}
