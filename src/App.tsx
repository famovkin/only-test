import {
  createContext,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import Circle from './components/Circle/Circle';
import EventsSwiper from './components/EventsSwiper/EventsSwiper';
import SectionNav from './components/SectionNav/SectionNav';
import Title from './components/Title/Title';
import YearsStartEnd from './components/YearsStartEnd/YearsStartEnd';
import useIsMobile from './hooks/useIsMobile';

import { SectionConfig, sectionsCount } from './types';

import styles from './App.module.scss';

export type AppContextType = {
  section: number;
  changeSection: (nextValue: number) => void;
  config: SectionConfig[];
  prevSectionRef: number | null;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface IApp {
  config: SectionConfig[];
}

const App: FC<IApp> = ({ config }) => {
  const [section, setSection] = useState<number>(0);
  const prevSectionRef = useRef<null | number>(null);
  const isMobile = useIsMobile();

  const events = config[section].eventList;
  const startYear = events[0].year;
  const endYear = events[events.length - 1].year;

  const changeSection = useCallback(
    (nextValue: number) => {
      setSection((prev) => {
        prevSectionRef.current = Math.abs(prev);
        if (nextValue || nextValue === 0) {
          return nextValue;
        } else {
          const nextValueByPagination = prev + 1 < config.length ? prev + 1 : 0;
          return nextValueByPagination;
        }
      });
    },
    [config.length]
  );

  const value = useMemo(
    () => ({
      section,
      changeSection,
      config,
      prevSectionRef: prevSectionRef.current,
    }),
    [section, config, changeSection]
  );

  const onPrevClick = useCallback(() => {
    setSection((prev) => {
      prevSectionRef.current = Math.abs(prev);
      const nextValue = prev === 0 ? config.length - 1 : prev - 1;
      return nextValue;
    });
  }, [config.length]);

  const onNextClick = useCallback(() => {
    setSection((prev) => {
      prevSectionRef.current = Math.abs(prev);
      const nextValue = prev + 1 < config.length ? prev + 1 : 0;
      return nextValue;
    });
  }, [config.length]);

  return (
    <AppContext.Provider value={value}>
      <main className={styles.app}>
        <Title modificator={styles.titleMod} />
        <section className={styles.circleWrapper}>
          {!isMobile && (
            <Circle
              diameter={530}
              pointsCount={config.length as sectionsCount}
            />
          )}
          {!isMobile && (
            <SectionNav
              nextHandler={onNextClick}
              prevHandler={onPrevClick}
              modificator={styles.sectionNavMod}
            />
          )}
          <YearsStartEnd startYear={startYear} endYear={endYear} />
        </section>
        <EventsSwiper
          // Не стал добавлять из-за анимации
          // key={section}
          events={config[section]?.eventList}
          title={config[section]?.title}
          nextHandler={onNextClick}
          prevHandler={onPrevClick}
        />
      </main>
    </AppContext.Provider>
  );
};

export default App;
