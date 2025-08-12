import classNames from 'classnames';
import { FC, useEffect, useMemo, useState, memo } from 'react';

import useAppContext from '../../hooks/useAppContext';
import CirclePoint from '../CirclePoint/CirclePoint';
import YearCounter from '../YearCounter/YearCounter';

import { PointСoordinate, sectionsCount } from '../../types';
import { calcMinStep } from './utils';

import styles from './Circle.module.scss';

const ANGLE_OFFSET = 50;
// Оффсет угла для того, чтобы текущая точка
// была в правом верхнем углу

interface ICircle {
  diameter: number;
  pointsCount: sectionsCount;
  modificator?: string;
}

const Circle: FC<ICircle> = ({ diameter, pointsCount, modificator }) => {
  if (pointsCount < 2 || pointsCount > 6) {
    throw new Error('Min points - 2, max points - 6');
  }

  const [rotateAngle, setRotateAngle] = useState(0);
  const { section, config, prevSectionRef } = useAppContext();
  const radius = diameter / 2;
  const center = radius;
  const events = config[section].eventList;
  const startYear = events[0].year;
  const endYear = events[events.length - 1].year;

  const points = useMemo(() => {
    const pointsCoordinate: PointСoordinate[] = [];
    for (let i = 0; i < pointsCount; i++) {
      const angle = (360 / pointsCount) * i - ANGLE_OFFSET;
      const radianAngle = (angle * Math.PI) / 180;
      const x = center + radius * Math.cos(radianAngle);
      const y = center + radius * Math.sin(radianAngle);
      pointsCoordinate.push({ x, y });
    }
    return pointsCoordinate;
  }, [pointsCount, center, radius]);

  useEffect(() => {
    const step = calcMinStep(prevSectionRef, pointsCount, section);
    console.log('step', step);
    if (step === 0) return;
    const angleStep = 360 / pointsCount;
    setRotateAngle((prev) => prev + step * angleStep);
  }, [section, prevSectionRef, pointsCount]);

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
          transform: `rotate(${rotateAngle}deg)`,
        }}
      >
        {points.map((point, index) => (
          <CirclePoint
            key={config[index].id}
            index={index}
            angle={rotateAngle}
            pointData={point}
          />
        ))}
      </div>
      <div className={styles.yearsWrapper}>
        <YearCounter year={startYear} />
        <YearCounter year={endYear} />
      </div>
    </div>
  );
};

export default memo(Circle);
