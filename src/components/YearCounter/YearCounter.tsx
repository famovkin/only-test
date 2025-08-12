import { FC, useEffect, useRef, useState } from 'react';

import styles from './YearCounter.module.scss';

interface ICounter {
  year: number;
}

const INTERVAL_ANIMATION_MS = 100;

const YearCounter: FC<ICounter> = ({ year }) => {
  const [yearValue, setYearValue] = useState(year);
  const timeoutRef = useRef<number | null>(null);

  const cleanUp = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    cleanUp();

    const tick = () => {
      setYearValue((prev) => {
        if (prev === year) return prev;
        const next = prev < year ? prev + 1 : prev - 1;
        timeoutRef.current = window.setTimeout(tick, INTERVAL_ANIMATION_MS);
        return next;
      });
    };

    if (yearValue !== year) {
      timeoutRef.current = window.setTimeout(tick, INTERVAL_ANIMATION_MS);
    }

    return cleanUp;
  }, [year]);

  return <p className={styles.year}>{yearValue}</p>;
};

export default YearCounter;
