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
 *
 * @param  {object}   props            The component as props.
 * @param  {object}   props.data       The title and children to render.
 * @param  {boolean}  props.open       Declares if the modal is open.
 * @param  {function} props.closeModal Function used to close the open modal.
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

Drawer.propTypes = {
  data: PropTypes.shape({
    children: PropTypes.object,
    title: PropTypes.string,
  }),
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
};

Drawer.defaultProps = {
  data: {},
  open: true,
  closeModal: () => {},
};
