import type { Swiper as SwiperType } from 'swiper';

import styles from './EventsSwiper.module.scss';

const FADE_OUT_MS = 600;
const FADE_IN_MS = 600;

const onSwiperHandler = (swiper: SwiperType) => {
  swiper.pagination?.init();
  swiper.pagination?.render();
  swiper.pagination?.update();
  const paginationEl = swiper.pagination.el;
  if (paginationEl) {
    paginationEl.addEventListener('click', (e: any) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains(`${styles.bullet}`)) {
        const slideIndex = parseInt(target.dataset.slideIndex || '0', 10);
        swiper.slideTo(slideIndex);
      }
    });
  }
};

const onBeforeInitHandler = (
  swiper: SwiperType,
  prevElem: React.RefObject<HTMLButtonElement | null>,
  nextElem: React.RefObject<HTMLButtonElement | null>
) => {
  const nav = swiper.params.navigation;

  if (!nav || typeof nav === 'boolean') {
    swiper.params.navigation = {
      prevEl: prevElem.current,
      nextEl: nextElem.current,
      disabledClass: styles.navDisabled,
    };
  } else {
    (nav as any).prevEl = prevElem.current;
    (nav as any).nextEl = nextElem.current;
    nav.disabledClass = styles.navDisabled;
  }
};

const renderPagination = (
  swiper: SwiperType,
  current: number,
  total: number
) => {
  let customPaginationHtml = '';
  for (let i = 1; i <= total; i++) {
    const isActive = i === current;
    customPaginationHtml += `<span class="${styles.bullet} ${
      isActive ? styles.bulletActive : ''
    }"
      data-slide-index="${i - 1}"></span>`;
  }
  return customPaginationHtml;
};

const breakpointsConfig = {
  0: {
    slidesPerView: 1.3,
    pagination: { enabled: true },
  },
  600: {
    slidesPerView: 3,
    pagination: { enabled: false },
  },
};

const navigationConfig = {
  prevEl: `.${styles.swiperButtonPrev}`,
  nextEl: `.${styles.swiperButtonNext}`,
  disabledClass: `${styles.navDisabled}`,
};

export {
  onSwiperHandler,
  renderPagination,
  breakpointsConfig,
  navigationConfig,
  FADE_OUT_MS,
  FADE_IN_MS,
  onBeforeInitHandler,
};
