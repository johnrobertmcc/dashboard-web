import styles from './Calendar.module.scss';
import SectionHeading from 'components/utils/SectionHeading';
import Loading from 'components/utils/Loading';
import PropTypes from 'prop-types';
import { Container } from 'layout';
import moment from 'moment';
import { useState, useEffect } from 'react';

/**
 * Renders a calendar view to see a User's expenses by date in a GUI.
 *
 * @return {Element}  The Calendar component.
 */
export default function Calendar({ items }) {
  console.log('jr items', items);

  return (
    <Container>
      <SectionHeading message="Day By Day" />
    </Container>
  );
}

const itemProps = PropTypes.arrayOf(
  PropTypes.shape({
    _id: PropTypes.string,
    amount: PropTypes.shape({
      $numberDecimal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    date: PropTypes.string,
    event: PropTypes.string,
    item: PropTypes.string,
    tag: PropTypes.string,
    updatedAt: PropTypes.string,
    user: PropTypes.string,
    v: PropTypes.number,
  })
);

Calendar.propTypes = {
  items: PropTypes.objectOf(itemProps),
};

Calendar.propDoc = {
  items: 'The budget items from the reducer, fulfilled in <Dashboard />.',
};
