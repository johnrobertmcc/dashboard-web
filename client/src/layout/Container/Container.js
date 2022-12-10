import cn from 'classnames';
import PropTypes from 'prop-types';
import { createElement } from 'react';
import styles from './Container.module.scss';

/**
 * Renders a container to be used as an element to limit the children's width.
 *
 * @author  John Robert McCann
 * @since   6/26/2022
 * @version 1.0.0
 *
 * @param  {object}  props              Component props.
 * @param  {object}  props.children     Container children.
 * @param  {boolean} props.paddingTop   Should container render top padding.
 * @param  {boolean} props.paddingBtm   Should container render bottom padding.
 * @param  {string}  props.className    Optional classnames.
 * @param  {string}  props.layout       The layout style for the container.
 * @param  {string}  props.tag          The container tag
 * @param  {object}  props.containerRef The container ref.
 * @param  {number}  props.tabIndex     The tab index.
 * @return {Element}                    The Container component.
 */
export default function Container({
  tag,
  children,
  className,
  paddingTop,
  paddingBtm,
  layout,
  containerRef,
  tabIndex,
}) {
  return createElement(
    tag,
    {
      className: cn(
        styles.containerW,
        layout && styles[layout] ? styles[layout] : null,
        className && className,
        paddingTop && styles.paddingTop ? styles.paddingTop : null,
        paddingBtm && styles.paddingBtm ? styles.paddingBtm : null
      ),
      ref: containerRef && containerRef,
      tabIndex: tabIndex && tabIndex,
    },
    children
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  paddingTop: PropTypes.bool,
  paddingBtm: PropTypes.bool,
  layout: PropTypes.oneOf(['standard', 'nav']),
};

Container.defaultProps = {
  paddingTop: false,
  paddingBtm: false,
  layout: 'standard',
  tag: 'div',
};
