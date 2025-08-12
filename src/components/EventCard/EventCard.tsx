import { FC } from 'react';
import { EventItem } from '../../types';

import { truncateText } from '../../utils';

import styles from './EventCards.module.scss';

const EventCard: FC<EventItem> = ({ year, description }) => {
  return (
    <div className={styles.card}>
      <p className={styles.year}>{year}</p>
      <p className={styles.description}>{truncateText(description, 120)}</p>
    </div>
  );
};

export default EventCard;
