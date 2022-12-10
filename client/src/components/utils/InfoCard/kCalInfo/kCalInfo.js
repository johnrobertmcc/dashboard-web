import { useState } from 'react';
import InfoCard from '../InfoCard';
import delayedRender from 'functions/utils/delayedRender';
import { LOADING } from 'constants';

/**
 * Renders the user's daily kCal goals.
 *
 * @author  John Robert McCann
 * @since   10/01/2022
 * @version 1.0.0
 * @return  {Element}    The KCalInfo component.
 */
export default function KCalInfo() {
  const [calories, setCalories] = useState(LOADING);
  return (
    <InfoCard>
      <h3>Available kCal: {delayedRender(calories)}</h3>
    </InfoCard>
  );
}
