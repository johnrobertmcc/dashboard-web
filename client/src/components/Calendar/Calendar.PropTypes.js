import PropTypes from 'prop-types';

export const itemProps = PropTypes.arrayOf(
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
