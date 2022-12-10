import PropTypes from 'prop-types';

/**
 * Function used to take in an object and send a PUT request to MongoDB.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 * @param  {object}   props         The component as props.
 * @param  {Function} props.onClick Function to handle the click event.
 * @return {Element}                The EditButton component.
 */
export default function EditButton({ onClick }) {
  return <button onClick={(e) => onClick(e)}>edit</button>;
}
EditButton.propTypes = {
  updateParams: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    item: PropTypes.string,
    event: PropTypes.string,
    amount: PropTypes.shape({
      $numberDecimal: PropTypes.string,
    }),
    date: PropTypes.string,
    tag: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    __v: PropTypes.number,
  }),
};
