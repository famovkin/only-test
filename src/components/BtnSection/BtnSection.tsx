import classNames from 'classnames';
import { FC, memo } from 'react';
import { ReactComponent as Arrow } from '../../assets/images/arrow-gray.svg';

import styles from './BtnSection.module.scss';

interface IBtnSection extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: number;
  modificator?: string;
}

const BtnSwiper: FC<IBtnSection> = ({
  width = 7,
  height = 13,
  modificator,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={classNames(styles.btnSection, {
        [styles.btnSectionDisabled]: disabled,
        [modificator as string]: modificator,
      })}
      {...rest}
    >
      <Arrow width={width} height={height} />
    </button>
  );
};

export default memo(BtnSwiper);
