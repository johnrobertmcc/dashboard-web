import PropTypes from 'prop-types';
import styles from './ResponsiveTable.module.scss';
import { Container } from 'layout';

/**
 * Renders a rapper for table that becomes responive below 700px.
 *
 * @author John Robert McCann
 * @since 8/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props          The component as props.
 * @param  {object}  props.children The table to wrap.
 * @param  {object}  props.tableKey      The tableKey to help ith re-rendering.
 * @return {Element}                The ResponsiveTable component.
 */
export default function ResponsiveTable({ children, tableKey }) {
  return (
    <Container tag="div" className={styles.tableWrap} key={tableKey}>
      <div> {children} </div>
    </Container>
  );
}
ResponsiveTable.propTypes = {
  tableKey: PropTypes.any,
};
ResponsiveTable.defaultProps = {
  tableKey: new Date(),
};
