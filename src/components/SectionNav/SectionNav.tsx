import classNames from 'classnames';
import { FC } from 'react';

import useAppContext from '../../hooks/useAppContext';
import BtnSection from '../BtnSection/BtnSection';

import styles from './SectionNav.module.scss';

interface ISectionNav {
  nextHandler: () => void;
  prevHandler: () => void;
  modificator?: string;
}

const SectionNav: FC<ISectionNav> = ({
  nextHandler,
  prevHandler,
  modificator,
}) => {
  const { section, config } = useAppContext();

  const isNextBtnDisabled = section === config.length - 1;
  const isPrevBtnDisabled = section === 0;

  return (
    <div
      className={classNames({
        [modificator as string]: modificator,
      })}
    >
      <p className={styles.sectionNumber}>
        0{section + 1}/0{config.length}
      </p>
      <div>
        <BtnSection
          onClick={prevHandler}
          disabled={isPrevBtnDisabled}
          modificator={styles.prevBtn}
        />
        <BtnSection
          onClick={nextHandler}
          disabled={isNextBtnDisabled}
          modificator={styles.nextBtn}
        />
      </div>
    </div>
  );
};

export default SectionNav;
