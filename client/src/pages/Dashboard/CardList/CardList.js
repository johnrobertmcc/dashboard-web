import styles from './CardList.module.scss';
import { AVAILABLE_CARDS } from './CardList.utils';
import { createElement } from 'react';
import { Container } from 'layout';

/**
 * Renders a semantic list to render multiple card Elements.
 *
 * @author  John Robert McCann
 * @since   10/01/2022
 * @version 1.0.0
 * @return  {Element}     The CardList component.
 */
export default function CardList() {
  return (
    <Container tag="ul" className={styles.cardList}>
      {AVAILABLE_CARDS.map((card, i) => {
        return createElement(card, { key: i });
      })}
    </Container>
  );
}
