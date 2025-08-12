import classNames from 'classnames';
import { FC } from 'react';

import { ReactComponent as Arrow } from '../../assets/images/arrow-gray.svg';
import useAppContext from '../../hooks/useAppContext';

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
        <button
          className={classNames(styles.prevBtn, {
            [styles.btnDisabled]: isPrevBtnDisabled,
          })}
          onClick={prevHandler}
          disabled={isPrevBtnDisabled}
        >
          <Arrow width={7} height={13} />
        </button>
        <button
          className={classNames(styles.nextBtn, {
            [styles.btnDisabled]: isNextBtnDisabled,
          })}
          onClick={nextHandler}
          disabled={isNextBtnDisabled}
        >
          <Arrow width={7} height={13} />
        </button>
      </div>
    </div>
  );
};

export default SectionNav;
