import classNames from 'classnames';
import { forwardRef, memo } from 'react';
import { ReactComponent as Arrow } from '../../assets/images/arrow-blue.svg';

import styles from './BtnSwiper.module.scss';

interface IBtnSwiper extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: number;
  modificator?: string;
}

const BtnSwiper = forwardRef<HTMLButtonElement, IBtnSwiper>(function BtnSwiper(
  { width = 5, height = 10, modificator, ...rest },
  ref
) {
  return (
    <button
      className={classNames(styles.btnSwiper, {
        [modificator as string]: modificator,
      })}
      ref={ref}
      {...rest}
    >
      <Arrow width={width} height={height} />
    </button>
  );
});

export default memo(BtnSwiper);
