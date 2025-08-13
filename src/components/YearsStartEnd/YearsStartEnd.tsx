import { FC } from 'react';

import YearCounter from '../YearCounter/YearCounter';

import styles from './YearsStartEnd.module.scss';

interface IYearsStartEnd {
  startYear: number;
  endYear: number;
}

const YearsStartEnd: FC<IYearsStartEnd> = ({ startYear, endYear }) => {
  return (
    <div className={styles.yearsWrapper}>
      <YearCounter year={startYear} />
      <YearCounter year={endYear} />
    </div>
  );
};

export default YearsStartEnd;
