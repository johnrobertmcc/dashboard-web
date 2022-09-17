import ResponsiveTable from 'components/utils/ResponsiveTable';
import PropTypes from 'prop-types';
import styles from './ConfirmTransactions.module.scss';

/**
 * Renders a list of transactions to confirm before submition to MongoDB.
 *
 * @author  John Robert McCann
 * @since   09/15/2022
 * @version 1.0.0
 * @param   {object}  props        The component destructured as props.
 * @param   {object}  props.data   The data uploaded from .csv format.
 * @param   {object}  props.data   The data keys confirmed from <ConfirmData />.
 * @return  {Element}              The ConfirmTransactions component.
 */
export default function ConfirmTransactions({ data, structure }) {
  console.log('jr ConfirmTransactions', { data, structure });
  return (
    <ResponsiveTable>
      <table>
        <thead>
          <tr>
            {Object.keys(structure).map((heading, i) => {
              return <th key={i}>{heading}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((row, i) => (
            <tr>
              <td key={row.amount}>{row[structure.date]}</td>
              <td key={row.amount}>{row[structure.item]}</td>
              <td key={row.amount}>{row[structure.amount]}</td>
              <td key={row.amount}>{row[structure.tag]}</td>
              <td key={row.amount}>{row[structure.event]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
}
ConfirmTransactions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  structure: PropTypes.shape({
    date: PropTypes.string,
    item: PropTypes.string,
    amount: PropTypes.string,
    tag: PropTypes.oneOf([PropTypes.string, null]),
    event: PropTypes.oneOf([PropTypes.string, null]),
  }),
};
