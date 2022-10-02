import { useState } from 'react';
import InfoCard from '../InfoCard';
import styles from './EventInfo.module.scss';
import { LOADING } from 'constants';
import delayedRender from 'functions/utils/delayedRender';

/**
 * Renders the user's events in a digestible card.
 *
 * @author  John Robert McCann
 * @since   10/01/2022
 * @version 1.0.0
 * @return  {Element}     The EventInfo component.
 */
export default function EventInfo({ component }) {
  const [event, setEvent] = useState(LOADING);
  return (
    <InfoCard>
      <h3>Upcoming Events: {delayedRender(event)}</h3>
    </InfoCard>
  );
}
