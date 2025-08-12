import classNames from 'classnames';
import { FC } from 'react';
import useAppContext from '../../hooks/useAppContext';
import { PointСoordinate } from '../../types';

import styles from './CirclePoint.module.scss';

interface ICirclePoint {
  angle: number;
  pointData: PointСoordinate;
  index: number;
}

const CirclePoint: FC<ICirclePoint> = ({ angle, pointData, index }) => {
  const { section, changeSection, config } = useAppContext();

  return (
    <button
    className={classNames(styles.point, {
      [styles.pointActive]: section === index,
    })}
      area-label={config[index].title}
      key={index}
      style={{
        top: pointData.y,
        left: pointData.x,
      }}
      onClick={() => changeSection(index)}
    >
      <p
        className={styles.pointNumber}
        style={{ transform: `rotate(${-angle}deg)` }}
      >
        {index + 1}
      </p>
      <h2
        className={classNames(styles.pointTitle, {
          [styles.pointTitleActive]: section === index,
        })}
        style={{
          transform: `rotate(${-angle}deg) translateX(100px)`,
        }}
      >
        {config[index].title}
      </h2>
    </button>
  );
};

export default CirclePoint;
