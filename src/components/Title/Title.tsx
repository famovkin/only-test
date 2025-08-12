import classNames from 'classnames';
import { FC } from 'react';

import styles from './Title.module.scss';

interface ITitle {
  modificator?: string;
}

const Title: FC<ITitle> = ({ modificator }) => {
  return (
    <h1
      className={classNames(styles.title, {
        [modificator as string]: modificator,
      })}
    >
      Исторические
      <br />
      даты
    </h1>
  );
};

export default Title;
