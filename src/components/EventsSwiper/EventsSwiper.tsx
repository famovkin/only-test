import classNames from 'classnames';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import useAppContext from '../../hooks/useAppContext';
import { Animations, AnimationType, EventItem } from '../../types';
import EventCard from '../EventCard/EventCard';
import SectionNav from '../SectionNav/SectionNav';
import BtnSwiper from '../BtnSwiper/BtnSwiper';

import {
  breakpointsConfig,
  FADE_IN_MS,
  FADE_OUT_MS,
  navigationConfig,
  onBeforeInitHandler,
  onSwiperHandler,
  renderPagination,
} from './config';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './EventsSwiper.module.scss';

interface IEventsSwiper {
  events: EventItem[] | undefined;
  title: string | undefined;
  nextHandler: () => void;
  prevHandler: () => void;
}

const EventsSwiper: FC<IEventsSwiper> = ({
  events,
  title,
  nextHandler,
  prevHandler,
}) => {
  const { section, prevSectionRef } = useAppContext();
  const [displayedEvents, setDisplayedEvents] = useState(events || []);
  const [displayedTitle, setDisplayedTitle] = useState(title || '');
  const [animation, setAnimation] = useState<AnimationType>(Animations.IDLE);

  const swiperRef = useRef<SwiperRef>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const timers = useRef<number[]>([]);

  const paginationId = useMemo(
    () => `pagination-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  // Анимация
  useEffect(() => {
    if (prevSectionRef === section || prevSectionRef == null) return;

    setAnimation(Animations.FADE_OUT);

    const timerFadeOutId = window.setTimeout(() => {
      setDisplayedEvents(events || []);
      setDisplayedTitle(title || '');

      requestAnimationFrame(() => {
        const swiper = swiperRef.current?.swiper;
        if (swiper) {
          swiper.update();
          swiper.slideTo(0);
        }

        setAnimation(Animations.FADE_IN);

        const timerFadeInId = window.setTimeout(
          () => setAnimation(Animations.IDLE),
          FADE_IN_MS
        );

        timers.current.push(timerFadeInId);
      });
    }, FADE_OUT_MS);

    timers.current.push(timerFadeOutId);

    return () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, [section, prevSectionRef, events, title]);

  return (
    <section>
      <div
        className={classNames(styles.animationWrapper, {
          [styles.fadeOut]: animation === Animations.FADE_OUT,
          [styles.fadeIn]: animation === Animations.FADE_IN,
        })}
      >
        <h2 className={styles.sectionTitle}>{displayedTitle}</h2>
        <BtnSwiper
          ref={prevRef}
          modificator={styles.swiperButtonPrev}
          area-label="Предыдущий слайд"
        />
        <BtnSwiper
          ref={nextRef}
          modificator={styles.swiperButtonNext}
          area-label="Следующий слайд"
        />
        <Swiper
          className={styles.swiper}
          ref={swiperRef}
          modules={[FreeMode, Pagination, Navigation]}
          freeMode={true}
          pagination={{
            el: `#${paginationId}`,
            clickable: true,
            type: 'custom',
            renderCustom: renderPagination,
          }}
          navigation={navigationConfig}
          spaceBetween={50}
          breakpoints={breakpointsConfig}
          onSwiper={onSwiperHandler}
          onBeforeInit={(swiper: SwiperType) => {
            onBeforeInitHandler(swiper, prevRef, nextRef);
          }}
        >
          {displayedEvents?.map((event, index) => {
            return (
              <SwiperSlide key={index}>
                <EventCard year={event.year} description={event.description} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.navigation}>
        <SectionNav
          nextHandler={nextHandler}
          prevHandler={prevHandler}
          modificator={styles.sectionNavMod}
        />
        <div id={paginationId} className={styles.pagination} />
      </div>
    </section>
  );
};

export default EventsSwiper;
