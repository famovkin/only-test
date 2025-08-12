import { FC, useEffect, useRef, useState } from 'react';

import styles from './YearCounter.module.scss';

interface ICounter {
  year: number;
}

const INTERVAL_ANIMATION_MS = 100;
const YEAR_STEP = 1;

const YearCounter: FC<ICounter> = ({ year }) => {
  const [yearValue, setYearValue] = useState(year);
  const currentRef = useRef(year);
  const intervalRef = useRef<number | null>(null);

  const cleanUp = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    currentRef.current = yearValue;
  }, [yearValue]);

  useEffect(() => {
    if (currentRef.current === year) return;

    intervalRef.current = window.setInterval(() => {
      setYearValue((prev) => {
        if (prev === year) {
          cleanUp();
          return prev;
        }

        return prev < year ? prev + YEAR_STEP : prev - YEAR_STEP;
      });
    }, INTERVAL_ANIMATION_MS);

    return cleanUp;
  }, [year]);

  return (
    <p className={styles.year} aria-live="polite">
      {yearValue}
    </p>
  );
};

export default YearCounter;
