import classNames from 'classnames';
import { FC, memo, useEffect, useMemo, useState } from 'react';

import useAppContext from '../../hooks/useAppContext';
import CirclePoint from '../CirclePoint/CirclePoint';

import { PointСoordinate, sectionsCount } from '../../types';

import styles from './Circle.module.scss';

const ANGLE_OFFSET = 60;
// Оффсет угла для того, чтобы текущая точка
// была в правом верхнем углу

interface ICircle {
  diameter: number;
  pointsCount: sectionsCount;
  modificator?: string;
}

const shortestAngleDelta = (from: number, to: number): number => {
  return ((to - from + 540) % 360) - 180;
};

const Circle: FC<ICircle> = ({ diameter, pointsCount, modificator }) => {
  if (pointsCount < 2 || pointsCount > 6) {
    throw new Error('Min points - 2, max points - 6');
  }

  const { section, config, prevSectionRef } = useAppContext();
  const [rotateAngle, setRotateAngle] = useState(0);
  const radius = diameter / 2;
  const center = radius;

  const points = useMemo(() => {
    const pointsCoordinate: PointСoordinate[] = [];
    for (let i = 0; i < pointsCount; i++) {
      const angle = (360 / pointsCount) * i;
      const radianAngle = (angle * Math.PI) / 180;
      const x = center + radius * Math.cos(radianAngle);
      const y = center + radius * Math.sin(radianAngle);
      pointsCoordinate.push({ x, y, angle });
    }
    return pointsCoordinate;
  }, [pointsCount, center, radius]);

  useEffect(() => {
    setRotateAngle((prev) => {
      const target = 0 - points[section].angle;
      const delta = shortestAngleDelta(prev, target);
      return prev + delta;
    });
  }, [section, prevSectionRef, pointsCount, points]);

  return (
    <div
      className={classNames(styles.wrapper, {
        [modificator as string]: modificator,
      })}
    >
      <div
        className={styles.circle}
        style={{
          width: diameter,
          height: diameter,
          transform: `rotate(${rotateAngle - ANGLE_OFFSET}deg)`,
        }}
      >
        {points.map((point, index) => (
          <CirclePoint
            key={config[index].id}
            index={index}
            angle={rotateAngle - ANGLE_OFFSET}
            pointData={point}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Circle);
