import styles from './Calendar.module.css';
import Calendar from 'react-calendar';
/**
 * Renders a calendar view to see a User's expenses by date in a GUI.
 * @see https://github.com/wojtekmaj/react-calendar
 *
 * @return {Element}  The Calendar component.
 */
export default function CalendarWrapper() {
  return <Calendar onClickDay={(e) => console.log(e)} />;
}
