import { useEffect, useRef, useState } from 'react';

const DElAY = 50;

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => {
      if (timerId.current !== null) {
        window.clearTimeout(timerId.current);
      }

      timerId.current = window.setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
        timerId.current = null;
      }, DElAY);
    };
    window.addEventListener('resize', onResize);

    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
      if (timerId.current !== null) {
        window.clearTimeout(timerId.current);
      }
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
